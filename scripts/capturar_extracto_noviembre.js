const fs = require('fs');
const path = require('path');
const puppeteer = require('../bumand-backend/node_modules/puppeteer');

const PUERTO = 55243;
const esperar = (ms) => new Promise((r) => setTimeout(r, ms));

async function capturar() {
  console.log('=== CAPTURANDO EXTRACTO MENSUAL NOVIEMBRE 2026 (390x844, DPR 2) ===');
  const browser = await puppeteer.launch({
    channel: 'chrome',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({
      width: 390,
      height: 844,
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
    });

    console.log('[1] Navegando a http://localhost:55243/ ...');
    await page.goto(`http://localhost:${PUERTO}/`, { waitUntil: 'networkidle2' });
    await esperar(5000);

    // Login con adaibelen017@gmail.com
    console.log('[2] Login con adaibelen017@gmail.com...');
    await page.mouse.click(195, 410);
    await esperar(300);
    await page.keyboard.type('adaibelen017@gmail.com', { delay: 15 });
    await esperar(300);
    await page.mouse.click(195, 475);
    await esperar(300);
    await page.keyboard.type('Bumand2026!', { delay: 15 });
    await esperar(300);
    await page.mouse.click(195, 545);
    await esperar(5000);

    // Confirmar si hay pantalla de verificación o bienvenida
    try {
      await page.mouse.move(195, 400);
      await page.mouse.wheel({ deltaY: 800 });
      await esperar(1000);
      await page.mouse.click(195, 800);
      await esperar(2500);
    } catch (_) {}

    // Navegar a Pestaña 3 (Historial): x=342, y=815
    console.log('[3] Navegando a Pestaña Historial (x=342, y=815)...');
    await page.mouse.click(342, 815);
    await esperar(3500);

    // En Historial de Asistencias, hacer clic en el chip de Noviembre si no está activo, o verificar
    // Vamos a mover el mouse a la esquina superior izquierda para no dejar hovers
    await page.mouse.move(2, 2);
    await esperar(1000);

    // Rutas de guardado
    const dirHistorial = path.resolve(__dirname, '..', 'documentacion', 'capturas', 'movil', '06-historial');
    const dirHistorialGeneral = path.resolve(__dirname, '..', 'documentacion', 'capturas', 'movil', '06-historial-general');
    if (!fs.existsSync(dirHistorial)) fs.mkdirSync(dirHistorial, { recursive: true });
    if (!fs.existsSync(dirHistorialGeneral)) fs.mkdirSync(dirHistorialGeneral, { recursive: true });

    const ruta01 = path.join(dirHistorial, '01_historial_tab_asistencias_extracto_bancario.png');
    const ruta09 = path.resolve(__dirname, '..', 'documentacion', 'capturas', 'movil', '09-historial-asistencia.png');
    const rutaGeneral = path.join(dirHistorialGeneral, '01_historial_pestana_asistencias_extracto.png');

    console.log('[4] Guardando captura en la pestaña Historial...');
    await page.screenshot({ path: ruta01 });
    console.log(`[OK] Guardado: ${ruta01}`);

    fs.copyFileSync(ruta01, ruta09);
    console.log(`[OK] Guardado: ${ruta09}`);

    fs.copyFileSync(ruta01, rutaGeneral);
    console.log(`[OK] Guardado: ${rutaGeneral}`);

    // Intentar abrir el botón "Pantalla completa" (x=315, y=575 aproximadamente según el layout del extracto)
    // o clic en la tarjeta bancaria para navegar a DetalleExtractoAsistenciaPantalla
    console.log('[5] Intentando navegar a DetalleExtractoAsistenciaPantalla...');
    try {
      await page.mouse.click(315, 575);
      await esperar(2500);
      const rutaDetalle = path.join(dirHistorial, '01_extracto_mensual_pantalla_completa.png');
      await page.screenshot({ path: rutaDetalle });
      console.log(`[OK] Guardado: ${rutaDetalle}`);
    } catch (e) {
      console.log('Detalle pantalla completa opcional:', e.message);
    }

    console.log('=== CAPTURAS DEL EXTRACTO COMPLETADAS EXITOSAMENTE ===');
  } finally {
    await browser.close();
  }
}

capturar().catch((err) => {
  console.error('Error durante la captura:', err);
  process.exit(1);
});
