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
  const stats = fs.statSync(rutaCompleta);
  console.log(`[CAPTURA] Guardada: ${nombreArchivo} (${stats.size} bytes)`);
}

async function cerrarModalVersiculoRiguroso(page) {
  console.log('[MODAL] Verificando modal de versículo bíblico...');
  await esperar(1200);

  // Intentar presionar el botón 'Comenzar Jornada'
  const resultadoBoton = await page.evaluate(() => {
    const botones = Array.from(document.querySelectorAll('button'));
    const btn = botones.find(b => b.innerText && b.innerText.includes('Comenzar Jornada'));
    if (btn) {
      btn.click();
      return true;
    }
    return false;
  });

  if (resultadoBoton) {
    console.log('[MODAL] Botón "Comenzar Jornada" pulsado exitosamente.');
    await esperar(800);
  } else {
    console.log('[MODAL] Botón "Comenzar Jornada" no encontrado en primera instancia.');
  }

  // Verificar y remover cualquier diálogo o portal Radix remanente para garantizar capturas limpias
  await page.evaluate(() => {
    // Remover portales Radix y diálogos
    const dialogs = document.querySelectorAll('[role="dialog"], [data-radix-portal], [data-radix-focus-guard]');
    dialogs.forEach(d => d.remove());

    // Limpiar backdrops
    const backdrops = document.querySelectorAll('div[data-state="open"], .fixed.inset-0.bg-black\\/80, .fixed.inset-0.bg-black\\/50');
    backdrops.forEach(b => b.remove());

    // Restaurar scroll y eventos del body
    document.body.style.pointerEvents = 'auto';
    document.body.style.overflow = 'auto';
    document.documentElement.style.pointerEvents = 'auto';
    document.documentElement.style.overflow = 'auto';
  });

  await esperar(500);
  console.log('[MODAL] Limpieza de portales/diálogos completada.');
}

async function seleccionarPestaña(page, tabId, textoEtiqueta) {
  console.log(`[NAV] Navegando a pestaña: ${tabId} (${textoEtiqueta})`);
  const clickeado = await page.evaluate((id, texto) => {
    // 1. Buscar en botones del menú lateral
    const botones = Array.from(document.querySelectorAll('button'));
    const boton = botones.find(b => {
      const t = b.innerText ? b.innerText.trim().toLowerCase() : '';
      const title = b.getAttribute('title') ? b.getAttribute('title').trim().toLowerCase() : '';
      const aria = b.getAttribute('aria-label') ? b.getAttribute('aria-label').trim().toLowerCase() : '';
      return t.includes(texto.toLowerCase()) || title.includes(texto.toLowerCase()) || aria.includes(texto.toLowerCase());
    });

    if (boton) {
      boton.click();
      return { exito: true, metodo: 'boton-texto', etiqueta: boton.innerText };
    }

    // 2. Si es notificaciones, buscar el botón campana y luego el link
    if (id === 'notificaciones' || texto.toLowerCase().includes('notificaci')) {
      const campana = document.querySelector('button[aria-label="Abrir centro de notificaciones"], button[title*="Notificaciones"]');
      if (campana) {
        campana.click();
        return { exito: true, metodo: 'campana-notificaciones' };
      }
    }

    // 3. Buscar TabsTrigger de radix con value=id
    const trigger = document.querySelector(`[data-state][value="${id}"], [role="tab"][value="${id}"]`);
    if (trigger) {
      trigger.click();
      return { exito: true, metodo: 'tab-trigger' };
    }

    return { exito: false };
  }, tabId, textoEtiqueta);

  console.log(`[NAV] Resultado navegación para ${tabId}:`, JSON.stringify(clickeado));

  // Si abrimos la campana de notificaciones, ahora debemos hacer clic en 'Ver historial completo de alertas'
  if (tabId === 'notificaciones' && clickeado.metodo === 'campana-notificaciones') {
    await esperar(600);
    const verTodo = await page.evaluate(() => {
      const botones = Array.from(document.querySelectorAll('button'));
      const btn = botones.find(b => b.innerText && (b.innerText.includes('Ver historial completo') || b.innerText.includes('historial completo')));
      if (btn) {
        btn.click();
        return true;
      }
      return false;
    });
    console.log('[NAV] Clic en "Ver historial completo de alertas":', verTodo);
  }

  await esperar(2000);
}

async function main() {
  console.log('=== INICIANDO CAPTURA Y AUDITORÍA ADMINISTRADOR BUMAND ===');
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    headless: true,
    defaultViewport: { width: 1440, height: 900, deviceScaleFactor: 1 },
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--window-size=1440,900'
    ]
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  try {
    // 1. web_login.png
    console.log('\n--- 1. CAPTURA DE PANTALLA: LOGIN (web_login.png) ---');
    await page.goto('http://localhost:3000/inicio-sesion', { waitUntil: 'networkidle2' });
    await esperar(1500);
    await capturar(page, 'web_login.png');

    // 2. Iniciar sesión con coordinacion@bumand.bo / Bumand2026!
    console.log('\n--- 2. INICIO DE SESIÓN ADMINISTRADOR ---');
    await page.evaluate(() => {
      localStorage.clear();
      sessionStorage.clear();
    });
    await page.reload({ waitUntil: 'networkidle2' });
    await esperar(1000);

    await page.waitForSelector('#correo');
    await page.$eval('#correo', el => el.value = '');
    await page.type('#correo', 'coordinacion@bumand.bo', { delay: 30 });
    await page.$eval('#contrasena', el => el.value = '');
    await page.type('#contrasena', 'Bumand2026!', { delay: 30 });
    await esperar(500);

    await page.click('button[type="submit"]');
    await page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 10000 }).catch(() => {});
    await esperar(2000);
    console.log(`[AUTH] URL actual tras login: ${page.url()}`);

    // Cierre riguroso del versículo bíblico
    await cerrarModalVersiculoRiguroso(page);

    // 3. admin_dashboard.png
    console.log('\n--- 3. CAPTURA: DASHBOARD GENERAL (admin_dashboard.png) ---');
    await seleccionarPestaña(page, 'administracion', 'Dashboard General');
    await esperar(1500);
    await capturar(page, 'admin_dashboard.png');

    // 4. admin_becarios.png
    console.log('\n--- 4. CAPTURA: DIRECTORIO BECARIOS (admin_becarios.png) ---');
    await seleccionarPestaña(page, 'becarios', 'Directorio Becarios');
    await esperar(1500);
    await capturar(page, 'admin_becarios.png');

    // 5. admin_sedes.png
    console.log('\n--- 5. CAPTURA: SEDES Y GEOCERCAS (admin_sedes.png) ---');
    await seleccionarPestaña(page, 'sedes', 'Sedes y Geocercas');
    await esperar(2500); // Dar tiempo a que cargue el mapa Leaflet
    await capturar(page, 'admin_sedes.png');

    // 6. admin_asistencia.png
    console.log('\n--- 6. CAPTURA: CONTROL DE ASISTENCIA (admin_asistencia.png) ---');
    await seleccionarPestaña(page, 'asistencia', 'Control de Asistencia');
    await esperar(1500);
    await capturar(page, 'admin_asistencia.png');

    // 7. admin_pasajes.png
    console.log('\n--- 7. CAPTURA: APROBACIÓN DE PASAJES (admin_pasajes.png) ---');
    await seleccionarPestaña(page, 'pasajes', 'Aprobación Pasajes');
    await esperar(1500);
    await capturar(page, 'admin_pasajes.png');

    // 8. admin_evaluaciones.png
    console.log('\n--- 8. CAPTURA: EVALUACIÓN 360° (admin_evaluaciones.png) ---');
    await seleccionarPestaña(page, 'evaluacion_360', 'Evaluación 360°');
    await esperar(1500);
    await capturar(page, 'admin_evaluaciones.png');

    // 9. admin_refrigerios.png
    console.log('\n--- 9. CAPTURA: REFRIGERIOS (admin_refrigerios.png) ---');
    await seleccionarPestaña(page, 'refrigerios', 'Refrigerios Institucionales');
    await esperar(1500);
    await capturar(page, 'admin_refrigerios.png');

    // 10. admin_reportes.png
    console.log('\n--- 10. CAPTURA: REPORTES PDF (admin_reportes.png) ---');
    await seleccionarPestaña(page, 'reportes', 'Reportes PDF');
    await esperar(1500);
    await capturar(page, 'admin_reportes.png');

    // 11. admin_notificaciones.png
    console.log('\n--- 11. CAPTURA: NOTIFICACIONES (admin_notificaciones.png) ---');
    await seleccionarPestaña(page, 'notificaciones', 'Notificaciones');
    await esperar(1500);
    await capturar(page, 'admin_notificaciones.png');

    console.log('\n=== ¡CAPTURA ADMINISTRADOR COMPLETADA EXITOSAMENTE! ===\n');
  } catch (err) {
    console.error('Error durante la ejecución del script:', err);
  } finally {
    await browser.close();
  }
}

main();
