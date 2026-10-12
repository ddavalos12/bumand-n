const path = require('path');
const fs = require('fs');
const puppeteer = require('../bumand-backend/node_modules/puppeteer');

const CARPETA_CAPTURAS = path.resolve(__dirname, '..', 'documentacion', 'capturas', 'implementacion');
if (!fs.existsSync(CARPETA_CAPTURAS)) {
  fs.mkdirSync(CARPETA_CAPTURAS, { recursive: true });
}

const RUTA_PROTOTIPO_HTML = 'file:///' + path.resolve(__dirname, '..', 'AudiosyDocumentosBumands', 'bumand_prototipo_asistencia_semanal.html').replace(/\\/g, '/');

async function esperar(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function capturarElemento(page, selector, nombreArchivo) {
  const rutaCompleta = path.join(CARPETA_CAPTURAS, nombreArchivo);
  const elemento = await page.$(selector);
  if (elemento) {
    await elemento.screenshot({ path: rutaCompleta });
    console.log(`[CAPTURA] Guardada: ${nombreArchivo}`);
  } else {
    console.warn(`[AVISO] No se encontró elemento: ${selector}`);
  }
}

async function capturarPantallaCompleta(page, nombreArchivo) {
  const rutaCompleta = path.join(CARPETA_CAPTURAS, nombreArchivo);
  await page.screenshot({ path: rutaCompleta, fullPage: false });
  console.log(`[CAPTURA VIEWPORT] Guardada: ${nombreArchivo}`);
}

async function ejecutar() {
  console.log('--- INICIANDO CAPTURA DE PANTALLAS Y DIÁLOGOS DE IMPLEMENTACIÓN ---');
  console.log('Cargando prototipo desde:', RUTA_PROTOTIPO_HTML);

  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    headless: true,
    defaultViewport: { width: 1400, height: 980, deviceScaleFactor: 1.5 },
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.goto(RUTA_PROTOTIPO_HTML, { waitUntil: 'networkidle2' });
  await esperar(1200);

  try {
    // ==========================================
    // 1. MÓVIL: LOGIN Y VERIFICACIÓN POST-LOGIN
    // ==========================================
    console.log('\n[1] Capturando Login e Ingreso Móvil...');
    await capturarElemento(page, '#phone-device', '01_login_ingreso.png');

    // Click Login -> Ir a Verificación
    await page.click('#login-btn');
    await esperar(600);
    console.log('[2] Capturando Verificación Post-Login (Paso 1: Confirmar Correo)...');
    await capturarElemento(page, '#phone-device', '02_verificacion_correo.png');

    // Llenar correos y guardar -> Paso 2
    await page.type('#vf-correo-1', 'maria.catunta@bumand.bo');
    await page.type('#vf-correo-2', 'maria.catunta@bumand.bo');
    await page.click('#vf-guardar-correo-btn');
    await esperar(600);
    console.log('[3] Capturando Verificación Post-Login (Paso 2: Confirmar Datos)...');
    await capturarElemento(page, '#phone-device', '03_verificacion_datos.png');

    // Confirmar datos -> Pasa a Asistencia
    await page.click('#vf-confirmar-datos-btn');
    await esperar(800);

    // ==========================================
    // 2. MÓVIL: ASISTENCIA (3 PILARES Y RADAR)
    // ==========================================
    console.log('\n[4] Capturando Asistencia - Registro de Prácticas (Radar GPS)...');
    await capturarElemento(page, '#phone-device', '04_asistencia_radar_geocerca.png');

    // Tab Escuela de Líderes
    await page.evaluate(() => {
      document.querySelector('#asistencia-subtabs span[data-sub="escuela"]').click();
    });
    await esperar(500);
    console.log('[5] Capturando Asistencia - Escuela de Líderes (Hora 14:30)...');
    await capturarElemento(page, '#phone-device', '05_asistencia_escuela_lideres.png');

    // Tab Acciones de Servicio
    await page.evaluate(() => {
      document.querySelector('#asistencia-subtabs span[data-sub="servicio"]').click();
    });
    await esperar(500);
    console.log('[6] Capturando Asistencia - Acciones de Servicio...');
    await capturarElemento(page, '#phone-device', '06_asistencia_acciones_servicio.png');

    // ==========================================
    // 3. MÓVIL: PASAJES (IDA, VUELTA Y DÍA 24)
    // ==========================================
    console.log('\n[7] Capturando Pasajes - Paso 1 (Ida)...');
    await page.evaluate(() => {
      document.querySelector('#mobile-tabs button[data-screen="pasajes"]').click();
    });
    await esperar(600);
    await capturarElemento(page, '#phone-device', '07_pasajes_ida.png');

    // Ir a Paso 2 (Vuelta)
    await page.click('#ir-a-vuelta-btn');
    await esperar(600);
    console.log('[8] Capturando Pasajes - Paso 2 (Vuelta con botón Reversa y Mapa)...');
    await capturarElemento(page, '#phone-device', '08_pasajes_vuelta_reversa.png');

    // Scroll para ver cálculo del 80% y restricción del día 24
    await page.evaluate(() => {
      const screen = document.querySelector('.screen[data-screen="pasajes"]');
      screen.scrollTop = screen.scrollHeight;
    });
    await esperar(500);
    console.log('[9] Capturando Pasajes - Cálculo 80% y Restricción Día 24...');
    await capturarElemento(page, '#phone-device', '09_pasajes_restriccion_dia24.png');

    // ==========================================
    // 4. MÓVIL: EVALUACIONES (PERIODOS Y DIALOGS)
    // ==========================================
    console.log('\n[10] Capturando Evaluaciones - Semestre II (Habilitado)...');
    await page.evaluate(() => {
      document.querySelector('#mobile-tabs button[data-screen="evaluacion"]').click();
    });
    await esperar(600);
    await capturarElemento(page, '#phone-device', '10_evaluaciones_semestre_habilitado.png');

    // Alternar a Semestre I (Inhabilitado)
    await page.evaluate(() => {
      document.querySelector('#semester-list .semester-row[data-semester="s1"]').click();
    });
    await esperar(600);
    console.log('[11] Capturando Evaluaciones - Semestre I (Inhabilitado / Solo Lectura)...');
    await capturarElemento(page, '#phone-device', '11_evaluaciones_semestre_cerrado.png');

    // Regresar a Semestre II
    await page.evaluate(() => {
      document.querySelector('#semester-list .semester-row[data-semester="s2"]').click();
    });
    await esperar(400);

    // Abrir Modal Formulario F-03 del Pastor
    console.log('\n[12] Capturando Diálogo / Modal: Formulario Pastoral F-03...');
    await page.click('#f03-trigger-btn');
    await esperar(600);
    await capturarElemento(page, '#f03-modal .modal-sheet', '12_dialog_formulario_f03.png');
    await page.click('#f03-close');
    await esperar(400);

    // Abrir Modal Autoevaluación Académica (Subida Múltiple)
    console.log('[13] Capturando Diálogo / Modal: Subida Multiarchivo Autoevaluación...');
    await page.evaluate(() => {
      const card = Array.from(document.querySelectorAll('.eval-mcard')).find(c => c.innerText.includes('Autoevaluación Académica'));
      if (card) card.querySelector('.upload-box').click();
    });
    await esperar(600);
    await capturarElemento(page, '#eval-modal .modal-sheet', '13_dialog_subida_multiarchivo.png');
    await page.click('#modal-close');
    await esperar(400);

    // Ir a Historial -> Detalle Asistencia
    console.log('\n[14] Capturando Diálogo / Modal: Detalle de Asistencia...');
    await page.evaluate(() => {
      document.querySelector('#mobile-tabs button[data-screen="historial"]').click();
    });
    await esperar(600);
    await page.evaluate(() => {
      document.querySelector('.day-item[data-key="lun11"]').click();
    });
    await esperar(600);
    await capturarElemento(page, '#asistencia-detail-modal .modal-sheet', '14_dialog_detalle_asistencia.png');
    await page.click('#asistencia-detail-close');
    await esperar(400);

    // Historial -> Pasajes
    console.log('[15] Capturando Diálogo / Modal: Detalle de Pasajes...');
    await page.evaluate(() => {
      document.querySelector('#historial-subtabs span[data-hist="pasajes"]').click();
    });
    await esperar(500);
    await page.evaluate(() => {
      document.querySelector('.hist-item[data-key="marzo"]').click();
    });
    await esperar(600);
    await capturarElemento(page, '#pasaje-detail-modal .modal-sheet', '15_dialog_detalle_pasajes.png');
    await page.click('#pasaje-detail-close');
    await esperar(400);

    // ==========================================
    // 5. WEB: DASHBOARD, MATRIZ, ANALÍTICA Y REVISION
    // ==========================================
    console.log('\n[16] Cambiando a vista Web / Supervisor...');
    await page.evaluate(() => {
      document.querySelector('.switch button[data-device="web"]').click();
    });
    await esperar(800);

    // Dashboard con Seguimiento Semanal
    console.log('[16] Capturando Dashboard Web - Seguimiento Semanal...');
    await capturarElemento(page, '#web-device', '16_web_dashboard_seguimiento_semanal.png');

    // Asistencia Web - Matriz de Horarios 2do Semestre 2026
    console.log('[17] Capturando Asistencia Web - Matriz de Horarios 2do Semestre 2026...');
    await page.evaluate(() => {
      document.querySelector('#sidebar-nav a[data-nav="asistencia-web"]').click();
    });
    await esperar(800);
    await capturarElemento(page, '#web-device', '17_web_matriz_horarios_apoyo.png');

    // Evaluaciones Web - Analítica y Kardex de Becarios
    console.log('[18] Capturando Evaluaciones Web - Analítica y Kardex...');
    await page.evaluate(() => {
      document.querySelector('#sidebar-nav a[data-nav="evaluaciones"]').click();
    });
    await esperar(800);
    await capturarElemento(page, '#web-device', '18_web_analitica_kardex_becarios.png');

    // Pasajes Web - Aprobación con Firma Digital
    console.log('[19] Capturando Pasajes Web - Detalle y Firma Digital del Supervisor...');
    await page.evaluate(() => {
      document.querySelector('#sidebar-nav a[data-nav="pasajes"]').click();
    });
    await esperar(800);
    await capturarElemento(page, '#web-device', '19_web_aprobacion_pasajes_firma.png');

    // Evaluaciones Web - Control de Periodos Semestrales
    console.log('[20] Capturando Evaluaciones Web - Control de Periodos Semestrales...');
    await page.evaluate(() => {
      document.querySelector('#sidebar-nav a[data-nav="evaluaciones"]').click();
    });
    await esperar(500);
    await capturarElemento(page, '.period-row.viewing', '20_web_periodos_evaluacion_control.png');

    console.log('\n=== ¡TODAS LAS 20 CAPTURAS COMPLETADAS EXITOSAMENTE! ===\n');

  } catch (error) {
    console.error('Error durante la captura:', error);
  } finally {
    await browser.close();
  }
}

ejecutar();
