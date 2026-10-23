const puppeteer = require('../bumand-backend/node_modules/puppeteer');
const path = require('path');

async function capturarTodo() {
  console.log('Iniciando Puppeteer...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const pageW = await browser.newPage();
  await pageW.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1.5 });

  try {
    console.log('Cargando inicio de sesión...');
    await pageW.goto('http://localhost:3000/inicio-sesion', { waitUntil: 'networkidle2', timeout: 25000 });
    await pageW.screenshot({ path: path.join(__dirname, 'captura-web-login.png') });
    console.log('1. Guardada captura-web-login.png');

    // Llenar formulario
    await pageW.waitForSelector('input', { timeout: 5000 });
    const inputs = await pageW.$$('input');
    if (inputs.length >= 2) {
      await inputs[0].click({ clickCount: 3 });
      await inputs[0].type('coordinacion@bumand.bo');
      await inputs[1].click({ clickCount: 3 });
      await inputs[1].type('Bumand2026!');
      
      const submitBtn = await pageW.$('button[type="submit"]');
      if (submitBtn) {
        await submitBtn.click();
        console.log('Login enviado. Esperando navegación...');
        await pageW.waitForNavigation({ waitUntil: 'networkidle2', timeout: 15000 }).catch(() => {});
      }
    }

    await new Promise(r => setTimeout(r, 2500));
    console.log('URL actual:', pageW.url());

    // CERRAR EL MODAL DEL VERSÍCULO DEL DÍA
    console.log('Cerrando modal versículo del día...');
    await pageW.evaluate(() => {
      const botones = Array.from(document.querySelectorAll('button'));
      for (const b of botones) {
        const txt = b.innerText || '';
        if (txt.includes('Comenzar') || txt.includes('Entendido') || txt.includes('Amén')) {
          b.click();
          return;
        }
      }
    });

    await new Promise(r => setTimeout(r, 1500));

    // 2. CAPTURAR DASHBOARD LIMPIO
    await pageW.screenshot({ path: path.join(__dirname, 'captura-web-dashboard.png') });
    console.log('2. Guardada captura-web-dashboard.png');

    // Función para hacer click en items del menú por title o texto
    async function clickMenu(etiqueta, nombreArchivo) {
      console.log(`Buscando pestaña: "${etiqueta}"...`);
      const clickResult = await pageW.evaluate((tituloBuscado) => {
        const botones = Array.from(document.querySelectorAll('button'));
        // 1. Buscar por atributo title exacto o parcial
        for (const b of botones) {
          const t = b.getAttribute('title') || '';
          if (t.toLowerCase().includes(tituloBuscado.toLowerCase())) {
            b.click();
            return `Encontrado por title: ${t}`;
          }
        }
        // 2. Buscar por innerText
        for (const b of botones) {
          const txt = b.innerText || '';
          if (txt.toLowerCase().includes(tituloBuscado.toLowerCase())) {
            b.click();
            return `Encontrado por text: ${txt}`;
          }
        }
        return null;
      }, etiqueta);

      console.log(`Resultado click "${etiqueta}":`, clickResult);
      if (clickResult) {
        await new Promise(r => setTimeout(r, 2000));
        await pageW.screenshot({ path: path.join(__dirname, nombreArchivo) });
        console.log(`Guardada captura: ${nombreArchivo}`);
      }
    }

    // Capturar las secciones clave
    await clickMenu('Control de Asistencia', 'captura-web-asistencias.png');
    await clickMenu('Aprobación Pasajes', 'captura-web-pasajes.png');
    await clickMenu('Matriz de Evaluación', 'captura-web-evaluaciones.png');
    await clickMenu('Refrigerios', 'captura-web-refrigerios.png');
    await clickMenu('Directorio Becarios', 'captura-web-becarios.png');

    // 3. CAPTURAR MÓVIL EN PORT 54912
    console.log('Capturando pantalla móvil en http://localhost:54912/ ...');
    const pageM = await browser.newPage();
    await pageM.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
    await pageM.goto('http://localhost:54912/', { waitUntil: 'networkidle2', timeout: 30000 });
    // Esperar a que el motor CanvasKit de Flutter cargue y dibuje la interfaz
    await new Promise(r => setTimeout(r, 6000));
    await pageM.screenshot({ path: path.join(__dirname, 'captura-movil-app.png') });
    console.log('3. Guardada captura-movil-app.png');

  } catch (error) {
    console.error('Error durante la captura:', error);
  } finally {
    await browser.close();
    console.log('Proceso de captura finalizado.');
  }
}

capturarTodo();
