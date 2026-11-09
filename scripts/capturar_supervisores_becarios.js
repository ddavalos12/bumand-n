const path = require('path');
const fs = require('fs');
const puppeteer = require('../bumand-backend/node_modules/puppeteer');

const DIR_02 = path.resolve(__dirname, '..', 'documentacion', 'capturas', 'web', 'admin', '02-becarios');
const DIR_04 = path.resolve(__dirname, '..', 'documentacion', 'capturas', 'web', 'admin', '04-becarios');

if (!fs.existsSync(DIR_02)) fs.mkdirSync(DIR_02, { recursive: true });
if (!fs.existsSync(DIR_04)) fs.mkdirSync(DIR_04, { recursive: true });

function esperar(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function cerrarModalVersiculoRiguroso(page) {
  await esperar(1200);
  try {
    const clickComenzar = await page.evaluate(() => {
      const botones = Array.from(document.querySelectorAll('button'));
      const btn = botones.find((b) => b.innerText && b.innerText.includes('Comenzar Jornada'));
      if (btn) {
        btn.click();
        return true;
      }
      return false;
    });
    if (clickComenzar) {
      console.log('[MODAL] Comenzar Jornada pulsado.');
      await esperar(800);
    }
  } catch (e) {}

  await page.evaluate(() => {
    const dialogs = document.querySelectorAll('[role="dialog"]');
    dialogs.forEach((d) => {
      if (d.innerText && d.innerText.includes('Versículo')) d.remove();
    });
    const backdrops = document.querySelectorAll('div[data-state="open"].fixed.inset-0');
    backdrops.forEach((b) => b.remove());
    document.body.style.pointerEvents = 'auto';
    document.body.style.overflow = 'auto';
  });
  await esperar(500);
}

async function main() {
  console.log('=== INICIANDO CAPTURAS REALES: GESTIÓN DE SUPERVISORES Y BECARIOS ===');

  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    headless: true,
    defaultViewport: { width: 1440, height: 900, deviceScaleFactor: 1 },
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--window-size=1440,900',
    ],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  try {
    // 1. Iniciar sesión como administrador
    console.log('[LOGIN] Iniciando sesión...');
    await page.goto('http://localhost:3000/inicio-sesion', { waitUntil: 'networkidle2' });
    await esperar(800);

    await page.waitForSelector('#correo');
    await page.$eval('#correo', (el) => (el.value = ''));
    await page.type('#correo', 'coordinacion@bumand.bo', { delay: 15 });
    await page.$eval('#contrasena', (el) => (el.value = ''));
    await page.type('#contrasena', 'Bumand2026!', { delay: 15 });
    await esperar(300);

    await page.click('button[type="submit"]');
    await page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 10000 }).catch(() => {});
    await esperar(2000);

    await cerrarModalVersiculoRiguroso(page);

    // 2. Navegar a Becarios
    console.log('[NAV] Navegando a Directorio de Becarios...');
    const clicBecarios = await page.evaluate(() => {
      const items = Array.from(document.querySelectorAll('button, a'));
      const b = items.find((el) => {
        const txt = el.innerText || el.getAttribute('title') || '';
        return txt.toLowerCase().includes('becarios') || txt.toLowerCase().includes('directorio');
      });
      if (b) {
        b.click();
        return true;
      }
      return false;
    });

    if (!clicBecarios) {
      await page.goto('http://localhost:3000/inicio', { waitUntil: 'networkidle2' });
      await esperar(1000);
    }
    await esperar(2000);

    // Captura 1: Vista "Supervisores con Becarios Designados"
    console.log('[VISTA] Cambiando a pestaña "Supervisores con Becarios Designados"...');
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const btnSupervisores = btns.find((b) => b.innerText && b.innerText.includes('Supervisores con Becarios'));
      if (btnSupervisores) btnSupervisores.click();
    });
    await esperar(1500);

    const ruta08_2 = path.join(DIR_02, '08_vista_supervisores_con_becarios_designados.png');
    const ruta08_4 = path.join(DIR_04, '08_vista_supervisores_con_becarios_designados.png');
    await page.screenshot({ path: ruta08_2, fullPage: false });
    fs.copyFileSync(ruta08_2, ruta08_4);
    console.log(`[CAPTURA 08] Guardada en ${ruta08_2} (${fs.statSync(ruta08_2).size} bytes)`);

    // Captura 2: Modal "Cambiar Supervisor Institucional"
    console.log('[MODAL] Volviendo a Directorio y abriendo modal Cambiar Supervisor...');
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const btnDirectorio = btns.find((b) => b.innerText && b.innerText.includes('Directorio General de Becarios'));
      if (btnDirectorio) btnDirectorio.click();
    });
    await esperar(1000);

    // Clic en el botón Cambiar de la columna de supervisor
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const btnCambiar = btns.find((b) => {
        const title = b.getAttribute('title') || '';
        const txt = b.innerText || '';
        return (title.includes('Supervisor') || txt.includes('Cambiar')) && b.querySelector('svg');
      });
      if (btnCambiar) btnCambiar.click();
    });
    await esperar(1000);

    // Abrir el selector de supervisores dentro del modal
    console.log('[MODAL] Abriendo selector de supervisores...');
    await page.evaluate(() => {
      const trigger = document.querySelector('#sel-supervisor, [id="sel-supervisor"]');
      if (trigger) trigger.click();
    });
    await esperar(1000);

    const ruta07_2 = path.join(DIR_02, '07_modal_cambiar_supervisor_institucional.png');
    const ruta07_4 = path.join(DIR_04, '07_modal_cambiar_supervisor_institucional.png');
    await page.screenshot({ path: ruta07_2, fullPage: false });
    fs.copyFileSync(ruta07_2, ruta07_4);
    console.log(`[CAPTURA 07] Guardada en ${ruta07_2} (${fs.statSync(ruta07_2).size} bytes)`);

    // Cerrar modal actual pulsando Escape o click en backdrop
    await page.keyboard.press('Escape');
    await esperar(500);
    await page.keyboard.press('Escape');
    await esperar(800);

    // Captura 3: Modal "Editar Expediente de Becario" con desplegable abierto
    console.log('[MODAL] Abriendo modal Editar Expediente de Becario...');
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const btnEditar = btns.find((b) => {
        const title = b.getAttribute('title') || '';
        return title.includes('Editar datos del becario');
      });
      if (btnEditar) btnEditar.click();
    });
    await esperar(1200);

    // Hacer scroll en el modal hacia la sección 4 de asignación y hacer clic en el selector
    await page.evaluate(() => {
      const selTrigger = document.querySelector('#sel-supervisor-edicion') || document.querySelector('button[id="sel-supervisor-edicion"]');
      if (selTrigger) {
        selTrigger.scrollIntoView({ behavior: 'instant', block: 'center' });
      } else {
        const dialogBody = document.querySelector('[role="dialog"] [class*="overflow-y-auto"]') || document.querySelector('[role="dialog"]');
        if (dialogBody) dialogBody.scrollTop = 520;
      }
    });
    await esperar(800);

    // Abrir el select de supervisor en el modal de edición
    await page.evaluate(() => {
      const selTrigger = document.querySelector('#sel-supervisor-edicion') || document.querySelector('button[id="sel-supervisor-edicion"]');
      if (selTrigger) {
        selTrigger.click();
      }
    });
    await esperar(1200);

    const ruta06_2 = path.join(DIR_02, '06_modal_editar_expediente_29_supervisores.png');
    const ruta06_4 = path.join(DIR_04, '06_modal_editar_expediente_29_supervisores.png');
    await page.screenshot({ path: ruta06_2, fullPage: false });
    fs.copyFileSync(ruta06_2, ruta06_4);
    console.log(`[CAPTURA 06] Guardada en ${ruta06_2} (${fs.statSync(ruta06_2).size} bytes)`);

    console.log('=== TODAS LAS CAPTURAS COMPLETADAS SATISFACTORIAMENTE ===');
  } catch (err) {
    console.error('[ERROR]', err);
  } finally {
    await browser.close();
  }
}

main();
