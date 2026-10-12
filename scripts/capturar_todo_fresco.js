const path = require('path');
const fs = require('fs');
const puppeteer = require('../bumand-backend/node_modules/puppeteer');

const CARPETA_WEB = path.resolve(__dirname, '..', 'documentacion', 'capturas', 'web');
const CARPETA_MOVIL = path.resolve(__dirname, '..', 'documentacion', 'capturas', 'movil');

if (!fs.existsSync(CARPETA_WEB)) fs.mkdirSync(CARPETA_WEB, { recursive: true });
if (!fs.existsSync(CARPETA_MOVIL)) fs.mkdirSync(CARPETA_MOVIL, { recursive: true });

async function esperar(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function iniciarSesion(page, correo, contrasena) {
  console.log(`[AUTH] Iniciando sesión: ${correo}`);
  await page.goto('http://localhost:3000/inicio-sesion', { waitUntil: 'networkidle2' });
  await esperar(800);

  await page.evaluate(() => {
    localStorage.clear();
    sessionStorage.clear();
  });
  await page.reload({ waitUntil: 'networkidle2' });
  await esperar(800);

  await page.waitForSelector('#correo');
  await page.$eval('#correo', el => el.value = '');
  await page.type('#correo', correo, { delay: 25 });
  await page.$eval('#contrasena', el => el.value = '');
  await page.type('#contrasena', contrasena, { delay: 25 });

  await page.click('button[type="submit"]');
  await esperar(2000);
  await cerrarModalVersiculoSiExiste(page);
}

async function cerrarModalVersiculoSiExiste(page) {
  try {
    await esperar(300);
    const cerro = await page.evaluate(() => {
      // 1. Buscar botón "Comenzar Jornada"
      const botones = Array.from(document.querySelectorAll('button'));
      const btn = botones.find(b => b.innerText && b.innerText.includes('Comenzar Jornada'));
      if (btn) {
        btn.click();
        return true;
      }
      return false;
    });

    if (cerro) {
      console.log('   [MODAL] Modal del versículo cerrado con botón "Comenzar Jornada".');
      await esperar(600);
    }

    // 2. Si todavía persiste algún portal de Radix con el versículo, desmontarlo
    await page.evaluate(() => {
      sessionStorage.removeItem("bumand_mostrar_versiculo_inicio");
      const portales = Array.from(document.querySelectorAll('[data-radix-portal]'));
      portales.forEach(p => {
        if (p.innerText && (p.innerText.includes('Versículo del Día') || p.innerText.includes('Filipenses'))) {
          p.remove();
        }
      });
      document.body.style.pointerEvents = 'auto';
      document.body.style.overflow = 'auto';
    });
    await page.keyboard.press('Escape');
    await esperar(200);
  } catch (e) {
    // Continuar
  }
}

async function seleccionarPestaña(page, tabId, etiqueta) {
  await cerrarModalVersiculoSiExiste(page);
  console.log(`[NAV] Pestaña: ${tabId} (${etiqueta})`);
  await page.evaluate((id, texto) => {
    const botones = Array.from(document.querySelectorAll('button'));
    let boton = botones.find(b => {
      const t = b.innerText ? b.innerText.trim().toLowerCase() : '';
      const title = b.getAttribute('title') ? b.getAttribute('title').trim().toLowerCase() : '';
      const aria = b.getAttribute('aria-label') ? b.getAttribute('aria-label').trim().toLowerCase() : '';
      return t.includes(texto.toLowerCase()) || title.includes(texto.toLowerCase()) || aria.includes(texto.toLowerCase());
    });
    if (boton) boton.click();
  }, tabId, etiqueta);
  await esperar(1500);
  await cerrarModalVersiculoSiExiste(page);
}

async function capturar(page, rutaDestino) {
  // Asegurarse de que el modal de versículo no esté presente
  await page.evaluate(() => {
    const portales = Array.from(document.querySelectorAll('[data-radix-portal]'));
    portales.forEach(p => {
      if (p.innerText && (p.innerText.includes('Versículo del Día') || p.innerText.includes('Filipenses'))) {
        p.remove();
      }
    });
    document.body.style.pointerEvents = 'auto';
    document.body.style.overflow = 'auto';
  });
  await esperar(200);
  await page.screenshot({ path: rutaDestino, fullPage: false });
  console.log(`[OK] Guardada: ${path.basename(rutaDestino)}`);
}

async function ejecutar() {
  console.log('\n======================================================');
  console.log('  GENERANDO NUEVAS CAPTURAS DESDE CERO (WEB & MÓVIL)  ');
  console.log('======================================================\n');

  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    // -------------------------------------------------------------------------
    // 1. CAPTURAS WEB (DESKTOP: 1440x900)
    // -------------------------------------------------------------------------
    const pageWeb = await browser.newPage();
    await pageWeb.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });

    console.log('\n--- 1. WEB: LOGIN ---');
    await pageWeb.goto('http://localhost:3000/inicio-sesion', { waitUntil: 'networkidle2' });
    await esperar(1200);
    await capturar(pageWeb, path.join(CARPETA_WEB, 'web_login.png'));

    console.log('\n--- 2. WEB: ROL ADMINISTRADOR ---');
    await iniciarSesion(pageWeb, 'admin@wscrt.com', 'admin');

    await seleccionarPestaña(pageWeb, 'administracion', 'Dashboard General');
    await capturar(pageWeb, path.join(CARPETA_WEB, 'admin_dashboard.png'));

    await seleccionarPestaña(pageWeb, 'becarios', 'Directorio Becarios');
    await capturar(pageWeb, path.join(CARPETA_WEB, 'admin_becarios.png'));

    await seleccionarPestaña(pageWeb, 'sedes', 'Sedes y Geocercas');
    await capturar(pageWeb, path.join(CARPETA_WEB, 'admin_sedes.png'));

    await seleccionarPestaña(pageWeb, 'asistencia', 'Control Asistencia');
    await capturar(pageWeb, path.join(CARPETA_WEB, 'admin_asistencia.png'));

    await seleccionarPestaña(pageWeb, 'pasajes', 'Aprobación Pasajes');
    await capturar(pageWeb, path.join(CARPETA_WEB, 'admin_pasajes.png'));

    await seleccionarPestaña(pageWeb, 'evaluacion_360', 'Evaluación 360°');
    await capturar(pageWeb, path.join(CARPETA_WEB, 'admin_evaluaciones.png'));

    await seleccionarPestaña(pageWeb, 'refrigerios', 'Refrigerios');
    await capturar(pageWeb, path.join(CARPETA_WEB, 'admin_refrigerios.png'));

    await seleccionarPestaña(pageWeb, 'reportes', 'Reportes PDF');
    await capturar(pageWeb, path.join(CARPETA_WEB, 'admin_reportes.png'));

    await seleccionarPestaña(pageWeb, 'notificaciones', 'Notificaciones');
    await capturar(pageWeb, path.join(CARPETA_WEB, 'admin_notificaciones.png'));

    console.log('\n--- 3. WEB: ROL SUPERVISOR ---');
    await iniciarSesion(pageWeb, 'angel.ali@bumand.bo', 'Bumand2026!');

    await seleccionarPestaña(pageWeb, 'administracion', 'Panel Supervisor');
    await capturar(pageWeb, path.join(CARPETA_WEB, 'supervisor_panel.png'));

    await seleccionarPestaña(pageWeb, 'becarios', 'Becarios Asignados');
    await capturar(pageWeb, path.join(CARPETA_WEB, 'supervisor_becarios.png'));

    await seleccionarPestaña(pageWeb, 'pasajes', 'Aprobación Pasajes');
    await capturar(pageWeb, path.join(CARPETA_WEB, 'supervisor_pasajes_aprobacion.png'));

    await seleccionarPestaña(pageWeb, 'evaluacion_360', 'Evaluación 360°');
    await capturar(pageWeb, path.join(CARPETA_WEB, 'supervisor_evaluaciones.png'));

    console.log('\n--- 4. WEB: ROL BECARIA ---');
    await iniciarSesion(pageWeb, 'nilda.churata@bumand.bo', 'Bumand2026!');

    await seleccionarPestaña(pageWeb, 'resumen', 'Mi Panel');
    await capturar(pageWeb, path.join(CARPETA_WEB, 'becario_radar_geocerca.png'));

    // Modal Declarar Recorrido
    const abrioPasajes = await pageWeb.evaluate(() => {
      const btn = Array.from(document.querySelectorAll('button')).find(b => b.innerText && b.innerText.includes('Declarar Recorrido'));
      if (btn) { btn.click(); return true; }
      return false;
    });
    if (abrioPasajes) {
      await esperar(1200);
      await capturar(pageWeb, path.join(CARPETA_WEB, 'becario_declaracion_pasajes.png'));
      await pageWeb.keyboard.press('Escape');
      await esperar(600);
    }

    // Modal Formulario F-03
    const abrioF03 = await pageWeb.evaluate(() => {
      const btn = Array.from(document.querySelectorAll('button')).find(b => b.innerText && b.innerText.includes('Llenar Formulario Pastoral F-03'));
      if (btn) { btn.click(); return true; }
      return false;
    });
    if (abrioF03) {
      await esperar(1200);
      await capturar(pageWeb, path.join(CARPETA_WEB, 'becario_formulario_f03.png'));
      await pageWeb.keyboard.press('Escape');
      await esperar(600);
    }

    await seleccionarPestaña(pageWeb, 'asistencia', 'Mis Horas y Asistencia');
    await capturar(pageWeb, path.join(CARPETA_WEB, 'becario_marcacion_asistencia.png'));

    await pageWeb.close();

    // -------------------------------------------------------------------------
    // 2. CAPTURAS MÓVIL (VIEWPORT RESPONSIVO 390x844 @ 2x DPR)
    // -------------------------------------------------------------------------
    console.log('\n--- 5. MÓVIL: VISTAS Y PANTALLAS MÓVILES INTEGRADAS ---');
    const pageMovil = await browser.newPage();
    await pageMovil.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true });

    // 01-inicio-sesion.png
    await pageMovil.goto('http://localhost:3000/inicio-sesion', { waitUntil: 'networkidle2' });
    await esperar(1000);
    await capturar(pageMovil, path.join(CARPETA_MOVIL, '01-inicio-sesion.png'));

    // Login móvil
    await pageMovil.waitForSelector('#correo');
    await pageMovil.type('#correo', 'nilda.churata@bumand.bo');
    await pageMovil.type('#contrasena', 'Bumand2026!');
    await pageMovil.click('button[type="submit"]');
    await esperar(2000);
    await cerrarModalVersiculoSiExiste(pageMovil);

    // 03-pantalla-inicio.png
    await capturar(pageMovil, path.join(CARPETA_MOVIL, '03-pantalla-inicio.png'));

    // 04-asistencia.png (Radar y Asistencia Móvil)
    await seleccionarPestaña(pageMovil, 'asistencia', 'Mis Horas');
    await capturar(pageMovil, path.join(CARPETA_MOVIL, '04-asistencia.png'));

    // 06-pasajes.png
    await seleccionarPestaña(pageMovil, 'pasajes', 'Mis Pasajes');
    await capturar(pageMovil, path.join(CARPETA_MOVIL, '06-pasajes.png'));

    // 07-declarar-recorrido.png
    const abrioPasajesM = await pageMovil.evaluate(() => {
      const btn = Array.from(document.querySelectorAll('button')).find(b => b.innerText && b.innerText.includes('Declarar Recorrido'));
      if (btn) { btn.click(); return true; }
      return false;
    });
    if (abrioPasajesM) {
      await esperar(1000);
      await capturar(pageMovil, path.join(CARPETA_MOVIL, '07-declarar-recorrido.png'));
      await pageMovil.keyboard.press('Escape');
      await esperar(600);
    }

    // 08-notificaciones.png
    await seleccionarPestaña(pageMovil, 'justificaciones', 'Mis Justificaciones');
    await capturar(pageMovil, path.join(CARPETA_MOVIL, '08-notificaciones.png'));

    // 09-historial-asistencia.png
    await seleccionarPestaña(pageMovil, 'asistencia', 'Mis Horas');
    await capturar(pageMovil, path.join(CARPETA_MOVIL, '09-historial-asistencia.png'));

    // 05-confirmar-datos.png
    await seleccionarPestaña(pageMovil, 'sedes', 'Mi Sede');
    await capturar(pageMovil, path.join(CARPETA_MOVIL, '05-confirmar-datos.png'));

    await pageMovil.close();

    console.log('\n🎉 ¡TODAS LAS CAPTURAS NUEVAS FUERON GENERADAS CON ÉXITO!\n');

  } catch (err) {
    console.error('Error durante la captura:', err);
  } finally {
    await browser.close();
  }
}

ejecutar();
