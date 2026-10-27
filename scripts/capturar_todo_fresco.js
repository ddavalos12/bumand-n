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

/**
 * Cierre estricto y riguroso del Modal de Versículo Bíblico Diario.
 * Desactiva banderas en storage y desmantela portales que contengan citas bíblicas,
 * pero NUNCA toca modales legítimos del sistema (asistencia manual, confirmaciones, etc.).
 */
async function asegurarModalVersiculoCerrado(page) {
  try {
    await page.evaluate(() => {
      sessionStorage.removeItem('bumand_mostrar_versiculo_inicio');
      sessionStorage.setItem('bumand_versiculo_visto', 'true');
      localStorage.setItem('bumand_versiculo_visto', 'true');

      // Si existe el botón "Comenzar Jornada", clickearlo
      const botones = Array.from(document.querySelectorAll('button'));
      const btn = botones.find(b => b.innerText && b.innerText.includes('Comenzar Jornada'));
      if (btn) btn.click();

      // Si existe algún portal Radix con el versículo bíblico, remover únicamente ese portal
      const portales = Array.from(document.querySelectorAll('[data-radix-portal]'));
      portales.forEach(p => {
        const txt = (p.innerText || '').toLowerCase();
        if (
          txt.includes('versículo del día') ||
          txt.includes('filipenses') ||
          txt.includes('colosenses') ||
          txt.includes('comenzar jornada')
        ) {
          p.remove();
        }
      });

      // Restaurar eventos y scroll del body
      document.body.style.pointerEvents = 'auto';
      document.body.style.overflow = 'auto';
      if (document.documentElement) {
        document.documentElement.style.pointerEvents = 'auto';
        document.documentElement.style.overflow = 'auto';
      }
    });
  } catch (_e) {
    // Continuar
  }
}

/**
 * Inicia sesión en la plataforma Next.js limpiando el almacenamiento y
 * desactivando el versículo diario antes y después del login.
 */
async function iniciarSesionWeb(page, correo, contrasena) {
  console.log(`\n[AUTH] Iniciando sesión: ${correo}`);
  await page.goto('http://localhost:3000/inicio-sesion', { waitUntil: 'networkidle2' });
  await esperar(800);

  await page.evaluate(() => {
    localStorage.clear();
    sessionStorage.clear();
    sessionStorage.removeItem('bumand_mostrar_versiculo_inicio');
    sessionStorage.setItem('bumand_versiculo_visto', 'true');
    localStorage.setItem('bumand_versiculo_visto', 'true');
  });

  await page.waitForSelector('#correo');
  await page.$eval('#correo', el => el.value = '');
  await page.type('#correo', correo, { delay: 25 });
  await page.$eval('#contrasena', el => el.value = '');
  await page.type('#contrasena', contrasena, { delay: 25 });

  await page.click('button[type="submit"]');
  await esperar(2500);

  await asegurarModalVersiculoCerrado(page);
  await esperar(500);
}

const MAPA_PESTAÑAS = {
  administracion: ['dashboard general', 'panel supervisor', 'administracion'],
  becarios: ['directorio becarios', 'becarios asignados', 'becarios'],
  sedes: ['sedes y geocercas', 'mi sede', 'sedes'],
  asistencia: ['control de asistencia', 'control asistencia', 'mis horas y asistencia', 'mis horas', 'asistencia'],
  pasajes: ['aprobación pasajes', 'aprobacion pasajes', 'mis pasajes', 'pasajes'],
  evaluacion_360: ['evaluación 360°', 'evaluacion 360', 'mis evaluaciones', 'evaluacion'],
  refrigerios: ['refrigerios institucionales', 'refrigerios'],
  reportes: ['reportes pdf', 'reportes'],
  notificaciones: ['notificaciones', 'centro corporativo'],
  eventos: ['acciones de servicio', 'eventos'],
  justificaciones: ['bandeja justificaciones', 'mis justificaciones', 'justificaciones'],
  resumen: ['mi panel', 'resumen']
};

/**
 * Selecciona una pestaña del menú lateral institucional y cierra el versículo si aparece.
 */
async function seleccionarPestañaWeb(page, tabId, etiqueta) {
  await asegurarModalVersiculoCerrado(page);
  console.log(`[NAV] Navegando a pestaña: ${tabId} (${etiqueta})`);

  const clickeado = await page.evaluate((id, texto, mapa) => {
    const terminos = mapa[id] || [texto.toLowerCase(), id.toLowerCase()];
    const botones = Array.from(document.querySelectorAll('button'));

    let boton = botones.find(b => {
      const t = b.innerText ? b.innerText.trim().toLowerCase() : '';
      const title = b.getAttribute('title') ? b.getAttribute('title').trim().toLowerCase() : '';
      const aria = b.getAttribute('aria-label') ? b.getAttribute('aria-label').trim().toLowerCase() : '';

      return terminos.some(term => title.includes(term) || t.includes(term) || aria.includes(term));
    });

    if (boton) {
      boton.click();
      return { ok: true, metodo: 'boton' };
    }

    // Si es notificaciones, buscar botón de campana
    if (id === 'notificaciones') {
      const campana = document.querySelector('button[aria-label*="notificaciones" i], button[title*="notificaciones" i]');
      if (campana) {
        campana.click();
        return { ok: true, metodo: 'campana' };
      }
    }

    // Trigger tabs radix
    const trigger = document.querySelector(`[data-state][value="${id}"], [role="tab"][value="${id}"]`);
    if (trigger) {
      trigger.click();
      return { ok: true, metodo: 'tab' };
    }

    return { ok: false };
  }, tabId, etiqueta, MAPA_PESTAÑAS);

  if (!clickeado.ok) {
    console.warn(`   [AVISO] No se pudo encontrar el botón de pestaña para ${tabId}`);
  }

  await esperar(2000);
  await asegurarModalVersiculoCerrado(page);
}

/**
 * Captura de pantalla asegurando que no haya versículo tapando la vista.
 */
async function capturar(page, rutaDestino) {
  await asegurarModalVersiculoCerrado(page);
  await esperar(200);
  await page.screenshot({ path: rutaDestino, fullPage: false });
  const stats = fs.statSync(rutaDestino);
  console.log(`   [OK] Guardada: ${path.basename(rutaDestino)} (${stats.size} bytes)`);
}

async function ejecutar() {
  console.log('\n========================================================================');
  console.log('  GENERANDO TODAS LAS CAPTURAS DESDE CERO (WEB & MÓVIL) CON PUPPETEER  ');
  console.log('========================================================================\n');

  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--window-size=1440,900'
    ]
  });

  try {
    // =========================================================================
    // SECCIÓN 1: CAPTURAS WEB (DESKTOP: 1440x900)
    // =========================================================================
    const pageWeb = await browser.newPage();
    await pageWeb.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });

    // 1. web_login.png
    console.log('\n--- 1. WEB: LOGIN ---');
    await pageWeb.goto('http://localhost:3000/inicio-sesion', { waitUntil: 'networkidle2' });
    await esperar(1500);
    await capturar(pageWeb, path.join(CARPETA_WEB, 'web_login.png'));

    // -------------------------------------------------------------------------
    // 2. WEB: ROL ADMINISTRADOR (coordinacion@bumand.bo)
    // -------------------------------------------------------------------------
    console.log('\n--- 2. WEB: ROL ADMINISTRADOR ---');
    await iniciarSesionWeb(pageWeb, 'coordinacion@bumand.bo', 'Bumand2026!');

    // 2.1 admin_dashboard.png
    await seleccionarPestañaWeb(pageWeb, 'administracion', 'Dashboard General');
    await capturar(pageWeb, path.join(CARPETA_WEB, 'admin_dashboard.png'));

    // 2.2 admin_becarios.png
    await seleccionarPestañaWeb(pageWeb, 'becarios', 'Directorio Becarios');
    await capturar(pageWeb, path.join(CARPETA_WEB, 'admin_becarios.png'));

    // 2.3 admin_sedes.png (Dar 3s para carga de azulejos OpenStreetMap Leaflet)
    await seleccionarPestañaWeb(pageWeb, 'sedes', 'Sedes y Geocercas');
    await esperar(2000);
    await capturar(pageWeb, path.join(CARPETA_WEB, 'admin_sedes.png'));

    // 2.4 admin_asistencia.png (Vista base de Control de Asistencia)
    await seleccionarPestañaWeb(pageWeb, 'asistencia', 'Control de Asistencia');
    await capturar(pageWeb, path.join(CARPETA_WEB, 'admin_asistencia.png'));

    // 2.5 NUEVA: admin_asistencia_manual_modal.png
    console.log('\n   [NUEVA] Capturando admin_asistencia_manual_modal.png...');
    const abrioAsistenciaManual = await pageWeb.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const btn = btns.find(b => {
        const t = b.innerText ? b.innerText.trim() : '';
        const title = b.getAttribute('title') || '';
        return t.includes('Añadir Asistencia Manual') || title.includes('Registrar Asistencia Manual');
      });
      if (btn) {
        btn.click();
        return true;
      }
      return false;
    });

    if (abrioAsistenciaManual) {
      await esperar(1400);
      await capturar(pageWeb, path.join(CARPETA_WEB, 'admin_asistencia_manual_modal.png'));

      // 2.6 NUEVA: admin_dialogo_confirmacion_cierre.png
      console.log('\n   [NUEVA] Capturando admin_dialogo_confirmacion_cierre.png...');
      // Modificar un dato dentro del modal para activar estado sucio
      await pageWeb.evaluate(() => {
        const btns = Array.from(document.querySelectorAll('button'));
        const btnLideres = btns.find(b => b.innerText && b.innerText.includes('Escuela de'));
        if (btnLideres) btnLideres.click();
      });
      await esperar(500);

      // Hacer click en "Cancelar" para disparar AlertDialog de useConfirmacionDialogo
      await pageWeb.evaluate(() => {
        const btns = Array.from(document.querySelectorAll('button'));
        const btnCancelar = btns.find(b => b.innerText && b.innerText.trim() === 'Cancelar');
        if (btnCancelar) btnCancelar.click();
      });
      await esperar(1000);
      await capturar(pageWeb, path.join(CARPETA_WEB, 'admin_dialogo_confirmacion_cierre.png'));

      // Cerrar AlertDialog haciendo click en "Descartar Cambios"
      await pageWeb.evaluate(() => {
        const btns = Array.from(document.querySelectorAll('button'));
        const btnDescartar = btns.find(b => b.innerText && b.innerText.includes('Descartar'));
        if (btnDescartar) btnDescartar.click();
      });
      await esperar(600);
    } else {
      console.warn('   [AVISO] No se encontró el botón de Añadir Asistencia Manual');
    }

    // 2.7 admin_pasajes.png (Vista base de Aprobación de Pasajes)
    await seleccionarPestañaWeb(pageWeb, 'pasajes', 'Aprobación Pasajes');
    await capturar(pageWeb, path.join(CARPETA_WEB, 'admin_pasajes.png'));

    // 2.8 NUEVA: admin_pasajes_detalle_calles.png
    console.log('\n   [NUEVA] Capturando admin_pasajes_detalle_calles.png...');
    const abrioDetalleCalles = await pageWeb.evaluate(() => {
      const btnOjo = document.querySelector('button[title*="Ver detalles y trazabilidad"]');
      if (btnOjo) {
        btnOjo.click();
        return true;
      }
      const btns = Array.from(document.querySelectorAll('button'));
      const btnVer = btns.find(b => b.innerText && b.innerText.trim() === 'Ver');
      if (btnVer) {
        btnVer.click();
        return true;
      }
      return false;
    });

    if (abrioDetalleCalles) {
      await esperar(1200);
      await capturar(pageWeb, path.join(CARPETA_WEB, 'admin_pasajes_detalle_calles.png'));
      await pageWeb.keyboard.press('Escape');
      await esperar(600);
    }

    // 2.9 admin_evaluaciones.png (Vista base de Evaluación 360°)
    await seleccionarPestañaWeb(pageWeb, 'evaluacion_360', 'Evaluación 360°');
    await capturar(pageWeb, path.join(CARPETA_WEB, 'admin_evaluaciones.png'));

    // 2.10 NUEVA: admin_cuestionario_bienestar_modal.png
    console.log('\n   [NUEVA] Capturando admin_cuestionario_bienestar_modal.png...');
    const abrioBienestar = await pageWeb.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const btnSemaforo = btns.find(b => b.innerText && b.innerText.includes('Semáforo (4B)'));
      if (btnSemaforo) {
        btnSemaforo.click();
        return true;
      }
      return false;
    });

    if (abrioBienestar) {
      await esperar(1200);
      await capturar(pageWeb, path.join(CARPETA_WEB, 'admin_cuestionario_bienestar_modal.png'));
      await pageWeb.keyboard.press('Escape');
      await esperar(600);
    }

    // 2.11 NUEVA: admin_formulario_mentor_modal.png
    console.log('\n   [NUEVA] Capturando admin_formulario_mentor_modal.png...');
    const abrioMentor = await pageWeb.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const btnQR = btns.find(b => b.innerText && b.innerText.includes('Código QR'));
      if (btnQR) {
        btnQR.click();
        return true;
      }
      return false;
    });

    if (abrioMentor) {
      await esperar(1200);
      await capturar(pageWeb, path.join(CARPETA_WEB, 'admin_formulario_mentor_modal.png'));
      await pageWeb.keyboard.press('Escape');
      await esperar(600);
    }

    // 2.12 NUEVA: admin_sabana_consolidado_semestral.png
    console.log('\n   [NUEVA] Capturando admin_sabana_consolidado_semestral.png...');
    await pageWeb.evaluate(() => {
      const titulos = Array.from(document.querySelectorAll('*'));
      const el = titulos.find(e => e.innerText && e.innerText.trim() === 'Sábana Consolidada Semestral y Registro Central de Notas');
      if (el) {
        el.scrollIntoView({ behavior: 'instant', block: 'start' });
      } else {
        window.scrollTo(0, 1600);
      }
    });
    await esperar(1400);
    await capturar(pageWeb, path.join(CARPETA_WEB, 'admin_sabana_consolidado_semestral.png'));
    await pageWeb.evaluate(() => window.scrollTo(0, 0));
    await esperar(500);

    // 2.13 admin_refrigerios.png (Vista base de Refrigerios Institucionales)
    await seleccionarPestañaWeb(pageWeb, 'refrigerios', 'Refrigerios Institucionales');
    await capturar(pageWeb, path.join(CARPETA_WEB, 'admin_refrigerios.png'));

    // 2.14 NUEVA: admin_dialogo_confirmacion_eliminar.png
    console.log('\n   [NUEVA] Capturando admin_dialogo_confirmacion_eliminar.png...');
    const abrioConfirmEliminar = await pageWeb.evaluate(() => {
      const btnTrash = document.querySelector('button[title*="Eliminar Registro de Raciones"]');
      if (btnTrash) {
        btnTrash.click();
        return true;
      }
      return false;
    });

    if (abrioConfirmEliminar) {
      await esperar(900);
      await capturar(pageWeb, path.join(CARPETA_WEB, 'admin_dialogo_confirmacion_eliminar.png'));
      await pageWeb.keyboard.press('Escape');
      await esperar(600);
    }

    // 2.15 admin_reportes.png
    await seleccionarPestañaWeb(pageWeb, 'reportes', 'Reportes PDF');
    await capturar(pageWeb, path.join(CARPETA_WEB, 'admin_reportes.png'));

    // 2.16 admin_notificaciones.png
    await seleccionarPestañaWeb(pageWeb, 'notificaciones', 'Notificaciones');
    await capturar(pageWeb, path.join(CARPETA_WEB, 'admin_notificaciones.png'));

    // -------------------------------------------------------------------------
    // 3. WEB: ROL SUPERVISOR (angel.ali@bumand.bo)
    // -------------------------------------------------------------------------
    console.log('\n--- 3. WEB: ROL SUPERVISOR ---');
    await iniciarSesionWeb(pageWeb, 'angel.ali@bumand.bo', 'Bumand2026!');

    // 3.1 supervisor_panel.png
    await seleccionarPestañaWeb(pageWeb, 'administracion', 'Panel Supervisor');
    await capturar(pageWeb, path.join(CARPETA_WEB, 'supervisor_panel.png'));

    // 3.2 supervisor_becarios.png
    await seleccionarPestañaWeb(pageWeb, 'becarios', 'Becarios Asignados');
    await capturar(pageWeb, path.join(CARPETA_WEB, 'supervisor_becarios.png'));

    // 3.3 supervisor_pasajes_aprobacion.png
    await seleccionarPestañaWeb(pageWeb, 'pasajes', 'Aprobación Pasajes');
    await capturar(pageWeb, path.join(CARPETA_WEB, 'supervisor_pasajes_aprobacion.png'));

    // 3.4 supervisor_evaluaciones.png
    await seleccionarPestañaWeb(pageWeb, 'evaluacion_360', 'Evaluación 360°');
    await capturar(pageWeb, path.join(CARPETA_WEB, 'supervisor_evaluaciones.png'));

    // -------------------------------------------------------------------------
    // 4. WEB: ROL BECARIA (nilda.churata@bumand.bo)
    // -------------------------------------------------------------------------
    console.log('\n--- 4. WEB: ROL BECARIA ---');
    await iniciarSesionWeb(pageWeb, 'nilda.churata@bumand.bo', 'Bumand2026!');

    // 4.1 becario_radar_geocerca.png
    await seleccionarPestañaWeb(pageWeb, 'resumen', 'Mi Panel');
    await esperar(1500);
    await capturar(pageWeb, path.join(CARPETA_WEB, 'becario_radar_geocerca.png'));

    // 4.2 becario_declaracion_pasajes.png
    console.log('\n   [MODAL] Abriendo modal Declarar Recorrido (Becaria)...');
    const abrioPasajesWeb = await pageWeb.evaluate(() => {
      const btn = Array.from(document.querySelectorAll('button')).find(b => b.innerText && b.innerText.includes('Declarar Recorrido'));
      if (btn) { btn.click(); return true; }
      return false;
    });
    if (abrioPasajesWeb) {
      await esperar(1400);
      await capturar(pageWeb, path.join(CARPETA_WEB, 'becario_declaracion_pasajes.png'));
      await pageWeb.keyboard.press('Escape');
      await esperar(600);
    }

    // 4.3 becario_formulario_f03.png
    console.log('\n   [MODAL] Abriendo modal Formulario F-03 (Becaria)...');
    const abrioF03Web = await pageWeb.evaluate(() => {
      const btn = Array.from(document.querySelectorAll('button')).find(b => b.innerText && b.innerText.includes('Llenar Formulario Pastoral F-03'));
      if (btn) { btn.click(); return true; }
      return false;
    });
    if (abrioF03Web) {
      await esperar(1400);
      await capturar(pageWeb, path.join(CARPETA_WEB, 'becario_formulario_f03.png'));
      await pageWeb.keyboard.press('Escape');
      await esperar(600);
    }

    // 4.4 becario_marcacion_asistencia.png
    await seleccionarPestañaWeb(pageWeb, 'asistencia', 'Mis Horas y Asistencia');
    await capturar(pageWeb, path.join(CARPETA_WEB, 'becario_marcacion_asistencia.png'));

    await pageWeb.close();

    // =========================================================================
    // SECCIÓN 2: CAPTURAS MÓVIL (FLUTTER WEB EN PUERTO 55248)
    // =========================================================================
    console.log('\n--- 5. MÓVIL: VISTAS Y PANTALLAS FLUTTER NATIVAS (412x860, DPR 2) ---');
    const pageMovil = await browser.newPage();
    await pageMovil.setViewport({ width: 412, height: 860, deviceScaleFactor: 2, isMobile: true, hasTouch: true });

    // 5.1 01-inicio-sesion.png
    console.log('[MOVIL 1/9] Capturando 01-inicio-sesion.png...');
    await pageMovil.goto('http://localhost:55248', { waitUntil: 'networkidle2' });
    await esperar(3500);
    await pageMovil.screenshot({ path: path.join(CARPETA_MOVIL, '01-inicio-sesion.png') });
    console.log('   [OK] Guardada: 01-inicio-sesion.png');

    // 5.2 02-registro.png (Navegar a Crear mi cuenta tocando el enlace inferior)
    console.log('[MOVIL 2/9] Navegando y capturando 02-registro.png...');
    await pageMovil.touchscreen.tap(240, 675); // Tap en "Regístrate"
    await esperar(2500);
    await pageMovil.screenshot({ path: path.join(CARPETA_MOVIL, '02-registro.png') });
    console.log('   [OK] Guardada: 02-registro.png');

    // Volver a inicio de sesión tocando la flecha atrás
    await pageMovil.touchscreen.tap(25, 40);
    await esperar(1500);

    // Iniciar Sesión con becario
    console.log('   [MOVIL] Ingresando credenciales en Flutter...');
    await pageMovil.touchscreen.tap(206, 400); // Email
    await esperar(200);
    await pageMovil.keyboard.type('nilda.churata@bumand.bo', { delay: 15 });
    await esperar(200);
    await pageMovil.touchscreen.tap(206, 465); // Password
    await esperar(200);
    await pageMovil.keyboard.type('Bumand2026!', { delay: 15 });
    await esperar(200);
    await pageMovil.touchscreen.tap(206, 540); // Botón Ingresar
    await esperar(3500);

    // 5.3 05-confirmar-datos.png
    console.log('[MOVIL 3/9] Capturando 05-confirmar-datos.png...');
    await pageMovil.screenshot({ path: path.join(CARPETA_MOVIL, '05-confirmar-datos.png') });
    console.log('   [OK] Guardada: 05-confirmar-datos.png');

    // Scroll para confirmar datos y entrar al Dashboard
    console.log('   [MOVIL] Confirmando datos para entrar a Inicio...');
    await pageMovil.touchscreen.touchStart(206, 600);
    await pageMovil.touchscreen.touchMove(206, 100);
    await pageMovil.touchscreen.touchEnd();
    await esperar(800);
    await pageMovil.touchscreen.tap(206, 814); // Botón Confirmar datos e ingresar
    await esperar(3500);

    // 5.4 03-pantalla-inicio.png
    console.log('[MOVIL 4/9] Capturando 03-pantalla-inicio.png...');
    await pageMovil.screenshot({ path: path.join(CARPETA_MOVIL, '03-pantalla-inicio.png') });
    console.log('   [OK] Guardada: 03-pantalla-inicio.png');

    // 5.5 04-asistencia.png (Radar y Asistencia con botones centrados)
    console.log('[MOVIL 5/9] Capturando 04-asistencia.png...');
    await pageMovil.touchscreen.touchStart(206, 500);
    await pageMovil.touchscreen.touchMove(206, 420);
    await pageMovil.touchscreen.touchEnd();
    await esperar(1000);
    await pageMovil.screenshot({ path: path.join(CARPETA_MOVIL, '04-asistencia.png') });
    console.log('   [OK] Guardada: 04-asistencia.png');

    // 5.6 09-historial-asistencia.png
    console.log('[MOVIL 6/9] Navegando y capturando 09-historial-asistencia.png...');
    await pageMovil.touchscreen.touchStart(206, 700);
    await pageMovil.touchscreen.touchMove(206, 200);
    await pageMovil.touchscreen.touchEnd();
    await esperar(1000);
    await pageMovil.screenshot({ path: path.join(CARPETA_MOVIL, '09-historial-asistencia.png') });
    console.log('   [OK] Guardada: 09-historial-asistencia.png');

    // 5.7 06-pasajes.png (Pestaña 1 del bottom nav)
    console.log('[MOVIL 7/9] Navegando y capturando 06-pasajes.png...');
    await pageMovil.touchscreen.tap(206, 830);
    await esperar(2500);
    await pageMovil.screenshot({ path: path.join(CARPETA_MOVIL, '06-pasajes.png') });
    console.log('   [OK] Guardada: 06-pasajes.png');

    // 5.8 07-declarar-recorrido.png (Tocar FAB)
    console.log('[MOVIL 8/9] Abriendo y capturando 07-declarar-recorrido.png...');
    await pageMovil.touchscreen.tap(290, 740);
    await esperar(2500);
    await pageMovil.screenshot({ path: path.join(CARPETA_MOVIL, '07-declarar-recorrido.png') });
    console.log('   [OK] Guardada: 07-declarar-recorrido.png');

    // Volver a Pasajes tocando flecha atrás
    await pageMovil.touchscreen.tap(25, 40);
    await esperar(1500);

    // 5.9 08-notificaciones.png (Pestaña 2 del bottom nav)
    console.log('[MOVIL 9/9] Navegando y capturando 08-notificaciones.png...');
    await pageMovil.touchscreen.tap(343, 830);
    await esperar(2500);
    await pageMovil.screenshot({ path: path.join(CARPETA_MOVIL, '08-notificaciones.png') });
    console.log('   [OK] Guardada: 08-notificaciones.png');

    await pageMovil.close();

    console.log('\n========================================================================');
    console.log('🎉 ¡TODAS LAS 34 CAPTURAS (25 WEB + 9 MÓVIL) GENERADAS EXITOSAMENTE!');
    console.log('========================================================================\n');

  } catch (err) {
    console.error('Error durante la captura:', err);
  } finally {
    await browser.close();
  }
}

ejecutar();
