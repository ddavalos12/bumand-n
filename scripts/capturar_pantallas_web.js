const path = require('path');
const fs = require('fs');
const puppeteer = require('../bumand-backend/node_modules/puppeteer');

const CARPETA_CAPTURAS = path.resolve(__dirname, '..', 'documentacion', 'capturas', 'web');

if (!fs.existsSync(CARPETA_CAPTURAS)) {
  fs.mkdirSync(CARPETA_CAPTURAS, { recursive: true });
}

async function esperar(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function iniciarSesion(page, correo, contrasena) {
  console.log(`[AUTH] Iniciando sesión con: ${correo}`);
  await page.goto('http://localhost:3000/inicio-sesion', { waitUntil: 'networkidle2' });
  await esperar(1000);

  // Limpiar campos e ingresar credenciales
  await page.evaluate(() => {
    localStorage.clear();
    sessionStorage.clear();
  });
  await page.reload({ waitUntil: 'networkidle2' });
  await esperar(1000);

  // Llenar inputs
  await page.waitForSelector('#correo');
  await page.$eval('#correo', el => el.value = '');
  await page.type('#correo', correo, { delay: 30 });
  await page.$eval('#contrasena', el => el.value = '');
  await page.type('#contrasena', contrasena, { delay: 30 });

  // Hacer click en el botón de submit
  await page.click('button[type="submit"]');

  // Esperar navegación o cambio de URL al home
  await esperar(2500);
  console.log(`[AUTH] URL actual tras login: ${page.url()}`);
}

async function seleccionarPestaña(page, tabId, etiqueta) {
  console.log(`[NAV] Seleccionando pestaña: ${tabId} (${etiqueta})`);
  const seleccionada = await page.evaluate((id, texto) => {
    // Buscar por texto en los botones del menú lateral
    const botones = Array.from(document.querySelectorAll('button'));
    // Primero intentar buscar botón con texto exacto o que contenga
    let boton = botones.find(b => {
      const t = b.innerText ? b.innerText.trim().toLowerCase() : '';
      return t.includes(texto.toLowerCase());
    });
    if (boton) {
      boton.click();
      return true;
    }
    return false;
  }, tabId, etiqueta);

  if (!seleccionada) {
    console.warn(`[NAV] No se pudo encontrar el botón con etiqueta: "${etiqueta}", intentando vía React tabs fallback`);
  }
  await esperar(1800);
}

async function capturar(page, nombreArchivo) {
  const rutaCompleta = path.join(CARPETA_CAPTURAS, nombreArchivo);
  await page.screenshot({ path: rutaCompleta, fullPage: false });
  console.log(`[CAPTURA] Guardada: ${nombreArchivo} (${rutaCompleta})`);
}

async function ejecutar() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    headless: true,
    defaultViewport: { width: 1440, height: 900, deviceScaleFactor: 1 },
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  try {
    // 1. Captura de la pantalla de Login
    console.log('\n--- 1. CAPTURA DE PANTALLA DE INICIO DE SESIÓN ---');
    await page.goto('http://localhost:3000/inicio-sesion', { waitUntil: 'networkidle2' });
    await esperar(1500);
    await capturar(page, 'web_login.png');

    // 2. Rol Administrador: admin@wscrt.com / admin
    console.log('\n--- 2. SESIÓN ADMINISTRADOR ---');
    await iniciarSesion(page, 'admin@wscrt.com', 'admin');

    // admin_dashboard.png
    await seleccionarPestaña(page, 'administracion', 'Dashboard General');
    await capturar(page, 'admin_dashboard.png');

    // admin_becarios.png
    await seleccionarPestaña(page, 'becarios', 'Directorio Becarios');
    await capturar(page, 'admin_becarios.png');

    // admin_sedes.png
    await seleccionarPestaña(page, 'sedes', 'Sedes y Geocercas');
    await capturar(page, 'admin_sedes.png');

    // admin_asistencia.png
    await seleccionarPestaña(page, 'asistencia', 'Control Asistencia');
    await capturar(page, 'admin_asistencia.png');

    // admin_pasajes.png
    await seleccionarPestaña(page, 'pasajes', 'Aprobación Pasajes');
    await capturar(page, 'admin_pasajes.png');

    // admin_evaluaciones.png
    await seleccionarPestaña(page, 'evaluacion_360', 'Evaluación 360°');
    await capturar(page, 'admin_evaluaciones.png');

    // admin_reportes.png
    await seleccionarPestaña(page, 'reportes', 'Reportes PDF');
    await capturar(page, 'admin_reportes.png');

    // admin_notificaciones.png
    await seleccionarPestaña(page, 'notificaciones', 'Notificaciones');
    await capturar(page, 'admin_notificaciones.png');

    // 3. Rol Supervisor: angel.ali@bumand.bo / Bumand2026!
    console.log('\n--- 3. SESIÓN SUPERVISOR ---');
    await iniciarSesion(page, 'angel.ali@bumand.bo', 'Bumand2026!');

    // supervisor_panel.png
    await seleccionarPestaña(page, 'administracion', 'Panel Supervisor');
    await capturar(page, 'supervisor_panel.png');

    // supervisor_becarios.png
    await seleccionarPestaña(page, 'becarios', 'Becarios Asignados');
    await capturar(page, 'supervisor_becarios.png');

    // supervisor_pasajes_aprobacion.png
    await seleccionarPestaña(page, 'pasajes', 'Aprobación Pasajes');
    await capturar(page, 'supervisor_pasajes_aprobacion.png');

    // supervisor_evaluaciones.png
    await seleccionarPestaña(page, 'evaluacion_360', 'Evaluación 360°');
    await capturar(page, 'supervisor_evaluaciones.png');

    // 4. Rol Becaria: nilda.churata@bumand.bo / Bumand2026!
    console.log('\n--- 4. SESIÓN BECARIA ---');
    await iniciarSesion(page, 'nilda.churata@bumand.bo', 'Bumand2026!');

    // becario_radar_geocerca.png (en Mi Panel / resumen)
    await seleccionarPestaña(page, 'resumen', 'Mi Panel');
    await esperar(1000);
    await capturar(page, 'becario_radar_geocerca.png');

    // becario_declaracion_pasajes.png (abrir modal Declarar Recorrido)
    console.log('[MODAL] Abriendo diálogo Declarar Recorrido...');
    const modalPasajesAbierto = await page.evaluate(() => {
      const botones = Array.from(document.querySelectorAll('button'));
      const btn = botones.find(b => b.innerText && b.innerText.includes('Declarar Recorrido'));
      if (btn) {
        btn.click();
        return true;
      }
      return false;
    });
    if (modalPasajesAbierto) {
      await esperar(1500);
      await capturar(page, 'becario_declaracion_pasajes.png');
      // Cerrar modal presionando Escape o click en backdrop
      await page.keyboard.press('Escape');
      await esperar(800);
    } else {
      console.warn('[MODAL] No se encontró el botón para declarar recorrido');
    }

    // becario_formulario_f03.png (abrir modal Formulario Pastoral F-03)
    console.log('[MODAL] Abriendo diálogo Formulario Pastoral F-03...');
    const modalF03Abierto = await page.evaluate(() => {
      const botones = Array.from(document.querySelectorAll('button'));
      const btn = botones.find(b => b.innerText && b.innerText.includes('Llenar Formulario Pastoral F-03'));
      if (btn) {
        btn.click();
        return true;
      }
      return false;
    });
    if (modalF03Abierto) {
      await esperar(1500);
      await capturar(page, 'becario_formulario_f03.png');
      await page.keyboard.press('Escape');
      await esperar(800);
    } else {
      console.warn('[MODAL] No se encontró el botón para Formulario F-03');
    }

    // becario_marcacion_asistencia.png (en Marcación de Horas / asistencia)
    await seleccionarPestaña(page, 'asistencia', 'Marcación de Horas');
    await capturar(page, 'becario_marcacion_asistencia.png');

    console.log('\n=== ¡TODAS LAS CAPTURAS COMPLETADAS CON ÉXITO! ===\n');

  } catch (error) {
    console.error('Error durante la ejecución del script:', error);
  } finally {
    await browser.close();
  }
}

ejecutar();
