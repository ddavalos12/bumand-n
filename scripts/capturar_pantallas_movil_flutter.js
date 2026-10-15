const path = require('path');
const fs = require('fs');
const puppeteer = require('../bumand-backend/node_modules/puppeteer');

const CARPETA_MOVIL = path.resolve(__dirname, '..', 'documentacion', 'capturas', 'movil');
if (!fs.existsSync(CARPETA_MOVIL)) fs.mkdirSync(CARPETA_MOVIL, { recursive: true });

async function esperar(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function ejecutar() {
  console.log('=== INICIANDO CAPTURA DE PANTALLAS FLUTTER WEB (412x860, DPR 2) ===');

  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 412, height: 860, deviceScaleFactor: 2, isMobile: true, hasTouch: true });

  try {
    // -------------------------------------------------------------
    // PANTALLA 1: LOGIN (01-inicio-sesion.png)
    // -------------------------------------------------------------
    console.log('[1/8] Capturando 01-inicio-sesion.png...');
    await page.goto('http://localhost:55248', { waitUntil: 'networkidle2' });
    await esperar(3500);
    await page.screenshot({ path: path.join(CARPETA_MOVIL, '01-inicio-sesion.png') });
    console.log(' -> OK: 01-inicio-sesion.png');

    // Iniciar Sesión con becario
    console.log('Ingresando credenciales...');
    await page.touchscreen.tap(206, 400);
    await esperar(200);
    await page.keyboard.type('nilda.churata@bumand.bo', { delay: 15 });
    await esperar(200);
    await page.touchscreen.tap(206, 465);
    await esperar(200);
    await page.keyboard.type('Bumand2026!', { delay: 15 });
    await esperar(200);
    await page.touchscreen.tap(206, 540);
    await esperar(3000);

    // -------------------------------------------------------------
    // PANTALLA 2: CONFIRMAR DATOS / SEDE (05-confirmar-datos.png)
    // -------------------------------------------------------------
    console.log('[2/8] Capturando 05-confirmar-datos.png...');
    await page.screenshot({ path: path.join(CARPETA_MOVIL, '05-confirmar-datos.png') });
    console.log(' -> OK: 05-confirmar-datos.png');

    // Scroll para confirmar datos
    console.log('Navegando a Dashboard confirmando datos...');
    await page.touchscreen.touchStart(206, 600);
    await page.touchscreen.touchMove(206, 100);
    await page.touchscreen.touchEnd();
    await esperar(800);
    await page.touchscreen.tap(206, 814); // Botón Confirmar datos e ingresar
    await esperar(3500);

    // -------------------------------------------------------------
    // PANTALLA 3: INICIO / DASHBOARD (03-pantalla-inicio.png)
    // -------------------------------------------------------------
    console.log('[3/8] Capturando 03-pantalla-inicio.png...');
    await page.screenshot({ path: path.join(CARPETA_MOVIL, '03-pantalla-inicio.png') });
    console.log(' -> OK: 03-pantalla-inicio.png');

    // -------------------------------------------------------------
    // PANTALLA 4: RADAR DE ASISTENCIA (04-asistencia.png)
    // Scroll leve para centrar el Radar y sus botones de marcación
    // -------------------------------------------------------------
    console.log('[4/8] Capturando 04-asistencia.png (Radar Asistencia)...');
    await page.touchscreen.touchStart(206, 500);
    await page.touchscreen.touchMove(206, 420); // scroll sutil
    await page.touchscreen.touchEnd();
    await esperar(1000);
    await page.screenshot({ path: path.join(CARPETA_MOVIL, '04-asistencia.png') });
    console.log(' -> OK: 04-asistencia.png');

    // -------------------------------------------------------------
    // PANTALLA 5: HISTORIAL DE ASISTENCIAS (09-historial-asistencia.png)
    // Scroll abajo para ver el botón 'Ver completo' de Historial y Registros
    // -------------------------------------------------------------
    console.log('[5/8] Navegando a Historial de Asistencias...');
    await page.touchscreen.touchStart(206, 700);
    await page.touchscreen.touchMove(206, 150);
    await page.touchscreen.touchEnd();
    await esperar(600);
    await page.touchscreen.touchStart(206, 700);
    await page.touchscreen.touchMove(206, 250);
    await page.touchscreen.touchEnd();
    await esperar(1000);

    // Captura de depuración para ver dónde quedó "Ver completo"
    await page.screenshot({ path: path.join(__dirname, 'debug_scroll_asistencia.png') });

    // -------------------------------------------------------------
    // PANTALLA 6: MIS PASAJES (06-pasajes.png)
    // Tocar pestaña Pasajes en bottom nav (centro X=206, Y=830)
    // -------------------------------------------------------------
    console.log('[6/8] Navegando a Mis Pasajes (Tab 1)...');
    await page.touchscreen.tap(206, 830);
    await esperar(2500);
    await page.screenshot({ path: path.join(CARPETA_MOVIL, '06-pasajes.png') });
    console.log(' -> OK: 06-pasajes.png');

    // -------------------------------------------------------------
    // PANTALLA 7: DECLARAR RECORRIDO (07-declarar-recorrido.png)
    // Tocar FAB 'Declarar recorrido' (X=290, Y=740)
    // -------------------------------------------------------------
    console.log('[7/8] Abriendo Declarar Recorrido (FAB)...');
    await page.touchscreen.tap(290, 740);
    await esperar(2500);
    await page.screenshot({ path: path.join(CARPETA_MOVIL, '07-declarar-recorrido.png') });
    console.log(' -> OK: 07-declarar-recorrido.png');

    // Volver atrás desde Declarar Recorrido (flecha atrás X=25, Y=40)
    console.log('Volviendo a Pasajes...');
    await page.touchscreen.tap(25, 40);
    await esperar(1500);

    // -------------------------------------------------------------
    // PANTALLA 8: NOTIFICACIONES (08-notificaciones.png)
    // Tocar pestaña Notificaciones (derecha X=343, Y=830)
    // -------------------------------------------------------------
    console.log('[8/8] Navegando a Notificaciones (Tab 2)...');
    await page.touchscreen.tap(343, 830);
    await esperar(2500);
    await page.screenshot({ path: path.join(CARPETA_MOVIL, '08-notificaciones.png') });
    console.log(' -> OK: 08-notificaciones.png');

    console.log('\n=== CAPTURA DE PANTALLAS FINALIZADA CON ÉXITO ===');
  } catch (error) {
    console.error('Error durante la ejecución:', error);
  } finally {
    await browser.close();
  }
}

ejecutar();
