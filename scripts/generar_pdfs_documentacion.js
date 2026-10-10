const fs = require('fs');
const path = require('path');
const puppeteer = require('../bumand-backend/node_modules/puppeteer');
const { marked } = require('../bumand-backend/node_modules/marked');

const RUTA_RAIZ = path.resolve(__dirname, '..');
const RUTA_DOC = path.join(RUTA_RAIZ, 'documentacion');

// Función para transformar rutas relativas de imagen en base64
function reemplazarImagenesBase64(contenidoMd, directorioBase) {
  return contenidoMd.replace(/!\[(.*?)\]\((.*?)\)/g, (match, alt, rutaRelativa) => {
    try {
      const rutaAbsoluta = path.resolve(directorioBase, rutaRelativa);
      if (fs.existsSync(rutaAbsoluta)) {
        const extension = path.extname(rutaAbsoluta).replace('.', '') || 'png';
        const imagenBase64 = fs.readFileSync(rutaAbsoluta).toString('base64');
        const esMovil = rutaRelativa.includes('movil') || rutaRelativa.includes('0');
        const claseImagen = esMovil ? 'imagen-movil' : 'imagen-web';
        return `<div class="contenedor-captura"><img class="${claseImagen}" src="data:image/${extension};base64,${imagenBase64}" alt="${alt}" /><p class="leyenda-captura">${alt}</p></div>`;
      }
    } catch (e) {
      console.warn(`No se pudo procesar la imagen: ${rutaRelativa}`, e.message);
    }
    return match;
  });
}

const ESTILOS_CSS = `
  @page {
    size: A4 portrait;
    margin: 20mm 15mm 20mm 15mm;
  }
  
  * {
    box-sizing: border-box;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    color: #1E293B;
    background-color: #FFFFFF;
    line-height: 1.6;
    font-size: 11pt;
    margin: 0;
    padding: 0;
  }

  /* Portada */
  .portada {
    page-break-after: always;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 850px;
    text-align: center;
    padding: 40px 20px;
    border: 3px double #067CC1;
    border-radius: 12px;
    background: linear-gradient(180deg, #F0F9FF 0%, #FFFFFF 60%, #FFF7ED 100%);
  }

  .portada-institucion {
    font-size: 14pt;
    font-weight: 700;
    letter-spacing: 2px;
    color: #067CC1;
    text-transform: uppercase;
    margin-bottom: 8px;
  }

  .portada-subinstitucion {
    font-size: 11pt;
    color: #64748B;
    margin-bottom: 40px;
    letter-spacing: 1px;
  }

  .portada-titulo {
    font-size: 26pt;
    font-weight: 800;
    color: #0F172A;
    line-height: 1.25;
    margin-bottom: 16px;
    padding: 0 20px;
  }

  .portada-subtitulo {
    font-size: 14pt;
    color: #E8951F;
    font-weight: 600;
    margin-bottom: 50px;
  }

  .portada-meta {
    margin-top: 60px;
    font-size: 10pt;
    color: #475569;
    border-top: 1px solid #CBD5E1;
    padding-top: 20px;
    width: 80%;
  }

  .portada-meta p {
    margin: 4px 0;
  }

  /* Encabezados */
  h1 {
    color: #067CC1;
    font-size: 20pt;
    font-weight: 800;
    border-bottom: 2.5px solid #067CC1;
    padding-bottom: 8px;
    margin-top: 35px;
    margin-bottom: 18px;
    page-break-before: always;
  }

  h1:first-of-type {
    page-break-before: avoid;
  }

  h2 {
    color: #0F172A;
    font-size: 15pt;
    font-weight: 700;
    border-bottom: 1.5px solid #E2E8F0;
    padding-bottom: 6px;
    margin-top: 26px;
    margin-bottom: 14px;
    page-break-after: avoid;
  }

  h3 {
    color: #1E293B;
    font-size: 12.5pt;
    font-weight: 600;
    margin-top: 20px;
    margin-bottom: 10px;
    page-break-after: avoid;
  }

  h4 {
    color: #E8951F;
    font-size: 11pt;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-top: 16px;
    margin-bottom: 8px;
    page-break-after: avoid;
  }

  p {
    margin-top: 0;
    margin-bottom: 12px;
    text-align: justify;
  }

  /* Tablas */
  table {
    width: 100%;
    border-collapse: collapse;
    margin: 18px 0;
    font-size: 9.5pt;
    page-break-inside: avoid;
    box-shadow: 0 1px 3px rgba(0,0,0,0.05);
    border-radius: 6px;
    overflow: hidden;
  }

  thead {
    background-color: #067CC1;
    color: #FFFFFF;
  }

  th {
    padding: 10px 12px;
    font-weight: 700;
    text-align: left;
    border: 1px solid #067CC1;
    letter-spacing: 0.5px;
  }

  td {
    padding: 8px 12px;
    border: 1px solid #E2E8F0;
    vertical-align: top;
  }

  tbody tr:nth-child(even) {
    background-color: #F8FAFC;
  }

  tbody tr:hover {
    background-color: #F1F5F9;
  }

  /* Capturas de pantalla e imágenes */
  .contenedor-captura {
    margin: 20px auto;
    text-align: center;
    page-break-inside: avoid;
  }

  .imagen-web {
    max-width: 95%;
    max-height: 480px;
    border: 1px solid #CBD5E1;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    display: block;
    margin: 0 auto;
  }

  .imagen-movil {
    max-width: 320px;
    max-height: 600px;
    border: 2px solid #067CC1;
    border-radius: 20px;
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.12);
    display: block;
    margin: 0 auto;
  }

  .leyenda-captura {
    font-size: 8.5pt;
    color: #64748B;
    margin-top: 6px;
    font-style: italic;
    text-align: center;
  }

  /* Listas */
  ul, ol {
    margin-top: 0;
    margin-bottom: 14px;
    padding-left: 24px;
  }

  li {
    margin-bottom: 6px;
  }

  /* Código y bloques */
  code {
    background-color: #F1F5F9;
    color: #0F172A;
    padding: 2px 6px;
    border-radius: 4px;
    font-family: Consolas, Monaco, "Courier New", monospace;
    font-size: 9pt;
  }

  pre {
    background-color: #0F172A;
    color: #F8FAFC;
    padding: 14px;
    border-radius: 8px;
    overflow-x: auto;
    font-size: 9pt;
    line-height: 1.45;
    page-break-inside: avoid;
    margin: 16px 0;
  }

  pre code {
    background-color: transparent;
    color: inherit;
    padding: 0;
  }

  /* Citas / Callouts */
  blockquote {
    border-left: 4px solid #1EB5C4;
    background-color: #F0FDFA;
    margin: 16px 0;
    padding: 10px 18px;
    color: #0F766E;
    border-radius: 0 8px 8px 0;
    page-break-inside: avoid;
  }

  hr {
    border: none;
    border-top: 1px solid #E2E8F0;
    margin: 28px 0;
  }
`;

async function convertirMdAPdf(rutaMd, rutaPdfSalida, opcionesPortada) {
  console.log(`\nIniciando conversión de: ${path.basename(rutaMd)} -> ${path.basename(rutaPdfSalida)}...`);
  
  if (!fs.existsSync(rutaMd)) {
    throw new Error(`El archivo markdown no existe: ${rutaMd}`);
  }

  const directorioBase = path.dirname(rutaMd);
  let contenidoMd = fs.readFileSync(rutaMd, 'utf8');

  // Reemplazar imágenes con base64 para renderizado perfecto
  const contenidoConImagenes = reemplazarImagenesBase64(contenidoMd, directorioBase);

  // Convertir a HTML
  const contenidoHtml = marked.parse(contenidoConImagenes);

  // Generar portada HTML
  const portadaHtml = `
    <div class="portada">
      <div class="portada-institucion">Fundación Diaconía FRIF-IFD</div>
      <div class="portada-subinstitucion">Programa Corporativo de Becarios Universitarios</div>
      <div class="portada-titulo">${opcionesPortada.titulo}</div>
      <div class="portada-subtitulo">${opcionesPortada.subtitulo}</div>
      <div class="portada-meta">
        <p><strong>Ecosistema Tecnológico:</strong> ${opcionesPortada.tecnologia}</p>
        <p><strong>Versión del Documento:</strong> 1.0 (Oficial Institucional)</p>
        <p><strong>Fecha de Emisión:</strong> Octubre 2026</p>
        <p><strong>Clasificación:</strong> Documentación Técnica y Auditoría Operativa</p>
      </div>
    </div>
  `;

  const documentoCompletoHtml = `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <title>${opcionesPortada.titulo}</title>
      <style>${ESTILOS_CSS}</style>
    </head>
    <body>
      ${portadaHtml}
      <div class="contenido-documento">
        ${contenidoHtml}
      </div>
    </body>
    </html>
  `;

  // Inicializar Puppeteer con Edge o Chrome
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setContent(documentoCompletoHtml, { waitUntil: 'networkidle0' });

  // Generar el PDF oficial con márgenes y numeración
  await page.pdf({
    path: rutaPdfSalida,
    format: 'A4',
    printBackground: true,
    displayHeaderFooter: true,
    headerTemplate: `
      <div style="font-size: 8pt; color: #94A3B8; width: 100%; padding: 0 15mm; display: flex; justify-content: space-between; border-bottom: 0.5px solid #E2E8F0; margin-bottom: 5mm;">
        <span>BUMAND — Fundación Diaconía FRIF-IFD</span>
        <span>${opcionesPortada.tituloCorto}</span>
      </div>
    `,
    footerTemplate: `
      <div style="font-size: 8pt; color: #94A3B8; width: 100%; padding: 0 15mm; display: flex; justify-content: space-between; border-top: 0.5px solid #E2E8F0; margin-top: 5mm;">
        <span>Gestión Institucional 2026</span>
        <span>Página <span class="pageNumber"></span> de <span class="totalPages"></span></span>
      </div>
    `,
    margin: {
      top: '25mm',
      bottom: '22mm',
      left: '15mm',
      right: '15mm',
    },
  });

  await browser.close();
  const tamanoKb = (fs.statSync(rutaPdfSalida).size / 1024).toFixed(1);
  console.log(`✅ PDF generado exitosamente: ${rutaPdfSalida} (${tamanoKb} KB)`);
}

async function ejecutar() {
  try {
    // 1. PDF Plataforma Web por Roles
    await convertirMdAPdf(
      path.join(RUTA_DOC, 'DOCUMENTACION_WEB_ROLES.md'),
      path.join(RUTA_DOC, 'DOCUMENTACION_WEB_ROLES.pdf'),
      {
        titulo: 'Manual Técnico de la Plataforma Web BUMAND por Roles',
        subtitulo: 'Catálogo Exhaustivo de Funcionalidades, Roles RBAC y Qué Hace vs. Qué NO Hace',
        tituloCorto: 'Manual Web RBAC',
        tecnologia: 'Next.js 14+ (App Router), React 18, Tailwind CSS, Radix UI & Recharts'
      }
    );

    // 2. PDF Aplicación Móvil por Pantallas
    await convertirMdAPdf(
      path.join(RUTA_DOC, 'DOCUMENTACION_MOVIL_PAGINAS.md'),
      path.join(RUTA_DOC, 'DOCUMENTACION_MOVIL_PAGINAS.pdf'),
      {
        titulo: 'Manual Técnico de la Aplicación Móvil BUMAND por Pantallas',
        subtitulo: 'Catálogo de Pantallas, Riverpod State, Geocerca 60 fps y Qué Hace vs. Qué NO Hace',
        tituloCorto: 'Manual Móvil Flutter',
        tecnologia: 'Flutter 3.x, Dart 3.x, Riverpod 3.x, Geolocator & Material 3'
      }
    );

    // 3. PDF Consolidado Integral (Web + Móvil)
    const contenidoWeb = fs.readFileSync(path.join(RUTA_DOC, 'DOCUMENTACION_WEB_ROLES.md'), 'utf8');
    const contenidoMovil = fs.readFileSync(path.join(RUTA_DOC, 'DOCUMENTACION_MOVIL_PAGINAS.md'), 'utf8');
    
    const contenidoUnificado = `# PARTE I: PLATAFORMA WEB POR ROLES\n\n` + 
      contenidoWeb.replace(/^# .*\n/, '') + 
      `\n\n\\pagebreak\n\n# PARTE II: APLICACIÓN MÓVIL POR PANTALLAS\n\n` + 
      contenidoMovil.replace(/^# .*\n/, '');

    const rutaMdUnificado = path.join(RUTA_DOC, 'DOCUMENTACION_INTEGRAL_BUMAND.md');
    fs.writeFileSync(rutaMdUnificado, contenidoUnificado, 'utf8');

    await convertirMdAPdf(
      rutaMdUnificado,
      path.join(RUTA_DOC, 'DOCUMENTACION_INTEGRAL_BUMAND.pdf'),
      {
        titulo: 'Documentación Integral del Ecosistema BUMAND',
        subtitulo: 'Manual Completo: Plataforma Web por Roles & Aplicación Móvil por Pantallas con Capturas de Interfaz',
        tituloCorto: 'Documentación Integral BUMAND',
        tecnologia: 'Next.js 14+ / React 18 / Flutter 3.x / Dart 3.x / NestJS'
      }
    );

    // Copias en la raíz del proyecto para máxima accesibilidad
    fs.copyFileSync(
      path.join(RUTA_DOC, 'DOCUMENTACION_WEB_ROLES.pdf'),
      path.join(RUTA_RAIZ, 'DOCUMENTACION_WEB_ROLES.pdf')
    );
    fs.copyFileSync(
      path.join(RUTA_DOC, 'DOCUMENTACION_MOVIL_PAGINAS.pdf'),
      path.join(RUTA_RAIZ, 'DOCUMENTACION_MOVIL_PAGINAS.pdf')
    );
    fs.copyFileSync(
      path.join(RUTA_DOC, 'DOCUMENTACION_INTEGRAL_BUMAND.pdf'),
      path.join(RUTA_RAIZ, 'DOCUMENTACION_INTEGRAL_BUMAND.pdf')
    );
    console.log(`✅ Copias de acceso directo creadas en la raíz de new-bumand.`);

    console.log('\n🎉 ¡Todos los documentos PDF fueron compilados exitosamente!');
  } catch (error) {
    console.error('Error durante la generación de PDFs:', error);
    process.exit(1);
  }
}

ejecutar();
