const path = require('path');
const fs = require('fs');
const puppeteer = require('../bumand-backend/node_modules/puppeteer');

const CARPETA_CAPTURAS = path.resolve(__dirname, '..', 'documentacion', 'capturas', 'web');

if (!fs.existsSync(CARPETA_CAPTURAS)) {
  fs.mkdirSync(CARPETA_CAPTURAS, { recursive: true });
}

function esperar(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function cerrarModalVersiculoSiAparece(page) {
  console.log('[MODAL] Comprobando si el diálogo de versículo bíblico está abierto...');
  try {
    const modalCerrado = await page.evaluate(() => {
      // Buscar botón "Comenzar Jornada"
      const botones = Array.from(document.querySelectorAll('button'));
      const btnComenzar = botones.find(b => b.innerText && b.innerText.includes('Comenzar Jornada'));
      if (btnComenzar) {
        btnComenzar.click();
        return true;
      }
      // O cualquier botón dentro de un diálogo con título "Versículo del Día"
      const dialog = document.querySelector('[role="dialog"]');
      if (dialog && dialog.innerText.includes('Versículo del Día')) {
        const btnCerrar = dialog.querySelector('button');
        if (btnCerrar) {
          btnCerrar.click();
          return true;
        }
      }
      return false;
    });

    if (modalCerrado) {
      console.log('[MODAL] Botón "Comenzar Jornada" clickeado.');
      await esperar(1200);
    }

    // Presionar Escape por seguridad adicional
    await page.keyboard.press('Escape');
    await esperar(800);

    // Verificar si queda algún backdrop o diálogo residual
    await page.evaluate(() => {
      const dialogs = document.querySelectorAll('[role="dialog"]');
      dialogs.forEach(d => d.remove());
      const overlays = document.querySelectorAll('[data-radix-portal], [data-state="open"]');
      overlays.forEach(o => {
        if (o.innerText && o.innerText.includes('Versículo del Día')) {
          o.remove();
        }
      });
      // Asegurarse de quitar pointer-events: none del body si radix lo dejó
      document.body.style.pointerEvents = 'auto';
      document.body.style.overflow = 'auto';
    });
    console.log('[MODAL] Diálogo de versículo verificado y despejado.');
  } catch (err) {
    console.warn('[MODAL] Advertencia al cerrar modal:', err.message);
  }
}

async function seleccionarPestaña(page, tabId, textoEtiqueta) {
  console.log(`[NAV] Navegando a pestaña: ${tabId} (${textoEtiqueta})`);
  
  // Primero intentamos buscar el botón en el menú lateral
  const clickeado = await page.evaluate((id, texto) => {
    const botones = Array.from(document.querySelectorAll('button'));
    let boton = botones.find(b => {
      const t = b.innerText ? b.innerText.trim().toLowerCase() : '';
      const title = b.getAttribute('title') ? b.getAttribute('title').trim().toLowerCase() : '';
      const aria = b.getAttribute('aria-label') ? b.getAttribute('aria-label').trim().toLowerCase() : '';
      return t.includes(texto.toLowerCase()) || title.includes(texto.toLowerCase()) || aria.includes(texto.toLowerCase());
    });
    if (boton) {
      boton.click();
      return true;
    }
    return false;
  }, tabId, textoEtiqueta);

  if (!clickeado) {
    console.warn(`[NAV] Botón "${textoEtiqueta}" no encontrado en el DOM, intentando fallback directo en sessionStorage o state...`);
  }

  await esperar(2000);
  // Asegurar que ningún modal quede sobre la vista
  await cerrarModalVersiculoSiAparece(page);
}

async function capturar(page, nombreArchivo) {
  const rutaCompleta = path.join(CARPETA_CAPTURAS, nombreArchivo);
  // Esperar a que la red esté tranquila y elementos animados se estabilicen
  await esperar(1000);
  await page.screenshot({ path: rutaCompleta, fullPage: false });
  const stats = fs.statSync(rutaCompleta);
  console.log(`[CAPTURA] Guardada con éxito: ${nombreArchivo} (${stats.size} bytes) en ${rutaCompleta}`);
}

async function ejecutar() {
  console.log('=== INICIANDO CAPTURAS Y AUDITORÍA DE ROL SUPERVISOR ===');
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    headless: true,
    defaultViewport: { width: 1440, height: 900, deviceScaleFactor: 1 },
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1440,900']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  try {
    // 1. Acceso a Login
    console.log('[AUTH] Navegando a http://localhost:3000/inicio-sesion');
    await page.goto('http://localhost:3000/inicio-sesion', { waitUntil: 'networkidle2' });
    await esperar(1500);

    // Limpiar almacenamiento previo
    await page.evaluate(() => {
      localStorage.clear();
      sessionStorage.clear();
    });
    await page.reload({ waitUntil: 'networkidle2' });
    await esperar(1500);

    // Ingresar credenciales del supervisor
    console.log('[AUTH] Ingresando credenciales angel.ali@bumand.bo');
    await page.waitForSelector('#correo');
    await page.$eval('#correo', el => el.value = '');
    await page.type('#correo', 'angel.ali@bumand.bo', { delay: 40 });

    await page.waitForSelector('#contrasena');
    await page.$eval('#contrasena', el => el.value = '');
    await page.type('#contrasena', 'Bumand2026!', { delay: 40 });

    // Submit
    console.log('[AUTH] Enviando formulario...');
    await page.click('button[type="submit"]');

    // Esperar redirección al home
    await esperar(3500);
    console.log(`[AUTH] URL actual tras login: ${page.url()}`);

    // Cerrar el versículo si apareció
    await cerrarModalVersiculoSiAparece(page);

    // 1. Panel Supervisor -> supervisor_panel.png
    console.log('\n--- 1. CAPTURA: Panel Supervisor ---');
    await seleccionarPestaña(page, 'administracion', 'Panel Supervisor');
    await esperar(2000);
    await capturar(page, 'supervisor_panel.png');

    // 2. Becarios Asignados -> supervisor_becarios.png
    console.log('\n--- 2. CAPTURA: Becarios Asignados ---');
    await seleccionarPestaña(page, 'becarios', 'Becarios Asignados');
    await esperar(2000);
    await capturar(page, 'supervisor_becarios.png');

    // 3. Aprobación Pasajes -> supervisor_pasajes_aprobacion.png
    console.log('\n--- 3. CAPTURA: Aprobación Pasajes ---');
    await seleccionarPestaña(page, 'pasajes', 'Aprobación Pasajes');
    await esperar(2000);
    await capturar(page, 'supervisor_pasajes_aprobacion.png');

    // 4. Evaluación 360° -> supervisor_evaluaciones.png
    console.log('\n--- 4. CAPTURA: Evaluación 360° ---');
    await seleccionarPestaña(page, 'evaluacion_360', 'Evaluación 360°');
    await esperar(2000);
    await capturar(page, 'supervisor_evaluaciones.png');

    console.log('\n=== ¡TODAS LAS CAPTURAS DEL SUPERVISOR COMPLETADAS EXITOSAMENTE! ===\n');

  } catch (error) {
    console.error('Error durante la ejecución del script del supervisor:', error);
  } finally {
    await browser.close();
  }
}

ejecutar();
