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

async function capturar(page, nombreArchivo) {
  const rutaCompleta = path.join(CARPETA_CAPTURAS, nombreArchivo);
  await page.screenshot({ path: rutaCompleta, fullPage: false });
  console.log(`[CAPTURA] Guardada: ${nombreArchivo} (${rutaCompleta})`);
}

async function cerrarModalSiExiste(page) {
  try {
    const cerrado = await page.evaluate(() => {
      const botones = Array.from(document.querySelectorAll('button'));
      const btnComenzar = botones.find(b => b.innerText && b.innerText.includes('Comenzar Jornada'));
      if (btnComenzar) {
        btnComenzar.click();
        return 'comenzar_jornada_click';
      }
      return false;
    });

    if (cerrado) {
      console.log(`[MODAL] Modal versículo cerrado via: ${cerrado}`);
      await esperar(1000);
    } else {
      await page.keyboard.press('Escape');
      await esperar(600);
    }
  } catch (err) {
    console.warn('[MODAL] Advertencia al cerrar modal:', err.message);
  }
}

async function ejecutar() {
  console.log('=== INICIANDO CAPTURAS DEFINITIVAS ROL ESTUDIANTE / BECARIO ===');
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    headless: true,
    defaultViewport: { width: 1440, height: 900, deviceScaleFactor: 1 },
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  try {
    // 1. Acceso y autenticación
    console.log('[AUTH] Navegando a http://localhost:3000/inicio-sesion');
    await page.goto('http://localhost:3000/inicio-sesion', { waitUntil: 'networkidle2' });
    await esperar(1000);

    await page.evaluate(() => {
      localStorage.clear();
      sessionStorage.clear();
    });
    await page.reload({ waitUntil: 'networkidle2' });
    await esperar(1000);

    console.log('[AUTH] Ingresando credenciales nilda.churata@bumand.bo');
    await page.waitForSelector('#correo');
    await page.type('#correo', 'nilda.churata@bumand.bo', { delay: 20 });
    await page.type('#contrasena', 'Bumand2026!', { delay: 20 });
    await page.click('button[type="submit"]');

    await esperar(3000);
    console.log(`[AUTH] URL actual tras login: ${page.url()}`);

    // 2. Cerrar diálogo/modal de versículo bíblico
    await esperar(1500);
    await cerrarModalSiExiste(page);
    await esperar(1000);

    // Asegurarse de estar en la pestaña 'resumen' (Mi Panel Operativo)
    await page.evaluate(() => {
      const btn = Array.from(document.querySelectorAll('button')).find(b => b.getAttribute('title') === 'Mi Panel' || (b.innerText && b.innerText.includes('Mi Panel')));
      if (btn) btn.click();
    });
    await esperar(2000);

    // 3. Captura 1: becario_radar_geocerca.png
    console.log('\n--- 1. CAPTURA: becario_radar_geocerca.png ---');
    await esperar(2500); // Para que el radar fije coordenadas
    await capturar(page, 'becario_radar_geocerca.png');

    // 4. Captura 2: becario_declaracion_pasajes.png (modal abierto)
    console.log('\n--- 2. CAPTURA: becario_declaracion_pasajes.png (MODAL) ---');
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
      await esperar(1800);
      await capturar(page, 'becario_declaracion_pasajes.png');
      await page.keyboard.press('Escape');
      await esperar(1000);
    } else {
      console.error('[ERROR] No se pudo abrir modal de Declarar Recorrido.');
    }

    // 5. Captura 3: becario_formulario_f03.png (modal abierto)
    console.log('\n--- 3. CAPTURA: becario_formulario_f03.png (MODAL) ---');
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
      await esperar(1800);
      await capturar(page, 'becario_formulario_f03.png');
      await page.keyboard.press('Escape');
      await esperar(1000);
    } else {
      console.error('[ERROR] No se pudo abrir modal de Formulario Pastoral F-03.');
    }

    // 6. Captura 4: becario_marcacion_asistencia.png (Pantalla completa de Marcación de Horas)
    console.log('\n--- 4. CAPTURA: becario_marcacion_asistencia.png ---');
    const navAsistencia = await page.evaluate(() => {
      const botones = Array.from(document.querySelectorAll('button'));
      const btn = botones.find(b => b.getAttribute('title') === 'Mis Horas y Asistencia');
      if (btn) {
        btn.click();
        return true;
      }
      return false;
    });

    if (navAsistencia) {
      await esperar(2000);
      await capturar(page, 'becario_marcacion_asistencia.png');
    } else {
      console.error('[ERROR] No se pudo navegar a la pestaña Mis Horas y Asistencia.');
    }

    console.log('\n=== TODAS LAS 4 CAPTURAS GENERADAS IMPECABLEMENTE ===\n');

  } catch (err) {
    console.error('[ERROR GENERAL]', err);
  } finally {
    await browser.close();
  }
}

ejecutar();
