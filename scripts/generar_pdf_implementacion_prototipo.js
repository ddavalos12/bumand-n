const fs = require('fs');
const path = require('path');
const puppeteer = require('../bumand-backend/node_modules/puppeteer');
const { marked } = require('../bumand-backend/node_modules/marked');

const RUTA_RAIZ = path.resolve(__dirname, '..');
const RUTA_DOC = path.join(RUTA_RAIZ, 'documentacion');
const RUTA_MD = path.join(RUTA_DOC, 'DOCUMENTO_IMPLEMENTACION_PROTOTIPO_BUMAND.md');
const RUTA_PDF_DOC = path.join(RUTA_DOC, 'DOCUMENTO_IMPLEMENTACION_PROTOTIPO_BUMAND.pdf');
const RUTA_PDF_RAIZ = path.join(RUTA_RAIZ, 'DOCUMENTO_IMPLEMENTACION_PROTOTIPO_BUMAND.pdf');

function reemplazarImagenesBase64(contenidoMd, directorioBase) {
  return contenidoMd.replace(/!\[(.*?)\]\((.*?)\)/g, (match, alt, rutaRelativa) => {
    try {
      const rutaAbsoluta = path.resolve(directorioBase, rutaRelativa);
      if (fs.existsSync(rutaAbsoluta)) {
        const extension = path.extname(rutaAbsoluta).replace('.', '') || 'png';
        const imagenBase64 = fs.readFileSync(rutaAbsoluta).toString('base64');
        return `<div class="contenedor-captura"><img class="imagen-captura" src="data:image/${extension};base64,${imagenBase64}" alt="${alt}" /><p class="leyenda-captura">${alt}</p></div>`;
      } else {
        console.warn(`[AVISO] Imagen no encontrada en: ${rutaAbsoluta}`);
      }
    } catch (e) {
      console.warn(`Error al procesar imagen: ${rutaRelativa}`, e.message);
    }
    return match;
  });
}

const ESTILOS_CSS = `
  @page {
    size: A4 portrait;
    margin: 22mm 15mm 22mm 15mm;
  }
  
  * { box-sizing: border-box; }

  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    color: #1E293B;
    background-color: #FFFFFF;
    line-height: 1.6;
    font-size: 10pt;
    margin: 0;
    padding: 0;
  }

  .portada {
    page-break-after: always;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 850px;
    text-align: center;
    padding: 40px 20px;
    border: 3px double #063A6B;
    border-radius: 12px;
    background: linear-gradient(180deg, #F0F9FF 0%, #FFFFFF 60%, #FFF7ED 100%);
  }

  .portada-institucion {
    font-size: 15pt;
    font-weight: 700;
    letter-spacing: 2px;
    color: #063A6B;
    text-transform: uppercase;
    margin-bottom: 8px;
  }

  .portada-subinstitucion {
    font-size: 11pt;
    color: #0A5CA0;
    margin-bottom: 35px;
    letter-spacing: 1px;
    font-weight: 600;
  }

  .portada-titulo {
    font-size: 24pt;
    font-weight: 800;
    color: #0F172A;
    line-height: 1.25;
    margin-bottom: 16px;
    padding: 0 20px;
  }

  .portada-subtitulo {
    font-size: 13pt;
    color: #E8951F;
    font-weight: 600;
    margin-bottom: 45px;
  }

  .portada-meta {
    margin-top: 50px;
    font-size: 9.5pt;
    color: #475569;
    border-top: 1px solid #CBD5E1;
    padding-top: 20px;
    text-align: left;
    width: 80%;
  }

  .portada-meta p { margin: 6px 0; }

  h1, h2, h3, h4 {
    color: #063A6B;
    font-weight: 700;
  }

  h1 {
    font-size: 18pt;
    border-bottom: 2.5px solid #063A6B;
    padding-bottom: 6px;
    margin-top: 26px;
    page-break-before: auto;
  }

  h2 {
    font-size: 14pt;
    border-bottom: 1.5px solid #CBD5E1;
    padding-bottom: 4px;
    margin-top: 22px;
  }

  h3 {
    font-size: 12pt;
    margin-top: 18px;
    color: #0A5CA0;
  }

  p {
    margin: 8px 0;
    text-align: justify;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin: 16px 0;
    font-size: 8.5pt;
    page-break-inside: auto;
  }

  tr {
    page-break-inside: avoid;
    page-break-after: auto;
  }

  th {
    background-color: #063A6B;
    color: #FFFFFF;
    font-weight: 600;
    padding: 7px 8px;
    text-align: left;
    border: 1px solid #0A5CA0;
  }

  td {
    padding: 6px 8px;
    border: 1px solid #E2E8F0;
    vertical-align: top;
  }

  tr:nth-child(even) td {
    background-color: #F8FAFC;
  }

  .contenedor-captura {
    margin: 18px 0;
    text-align: center;
    page-break-inside: avoid;
    border: 1px solid #E2E8F0;
    border-radius: 8px;
    padding: 10px;
    background: #F8FAFC;
  }

  .imagen-captura {
    max-width: 95%;
    max-height: 480px;
    height: auto;
    border-radius: 6px;
    box-shadow: 0 4px 8px rgba(0,0,0,0.08);
  }

  .leyenda-captura {
    font-size: 8.5pt;
    color: #64748B;
    font-style: italic;
    margin-top: 6px;
    margin-bottom: 0;
  }

  ul, ol {
    padding-left: 20px;
    margin: 8px 0;
  }

  li { margin-bottom: 4px; }

  strong { color: #0F172A; }

  code {
    background: #F1F5F9;
    padding: 1px 4px;
    border-radius: 4px;
    font-size: 8.5pt;
    color: #0A5CA0;
  }
`;

async function compilarPdf() {
  console.log('--- GENERANDO PDF OFICIAL DE IMPLEMENTACIÓN DEL PROTOTIPO ---');
  if (!fs.existsSync(RUTA_MD)) {
    console.error('No existe el archivo Markdown origen:', RUTA_MD);
    process.exit(1);
  }

  const contenidoMd = fs.readFileSync(RUTA_MD, 'utf8');
  const contenidoConImagenes = reemplazarImagenesBase64(contenidoMd, RUTA_DOC);
  const contenidoHtml = marked.parse(contenidoConImagenes);

  const portadaHtml = `
    <div class="portada">
      <div class="portada-institucion">Fundación Diaconía FRIF-IFD</div>
      <div class="portada-subinstitucion">Programa Corporativo de Becarios Universitarios BUMAND</div>
      <div class="portada-titulo">Informe Técnico de Implementación: Prototipo de Asistencia Semanal y Pasajes</div>
      <div class="portada-subtitulo">Auditoría Exhaustiva: Qué se Implementó vs. Qué NO se Implementó, Diálogos y Puntos de Atención</div>
      <div class="portada-meta">
        <p><strong>Ecosistema de Software:</strong> NestJS (Backend) · Next.js 14+/16 (Web) · Flutter 3.x (Móvil) · PostgreSQL</p>
        <p><strong>Documento de Referencia:</strong> Prototipo Interactivo v27 (Asistencia Semanal, Pasajes, F-03)</p>
        <p><strong>Fecha de Certificación:</strong> Octubre 2026</p>
        <p><strong>Estado de Calidad:</strong> 54/54 Pruebas Aprobadas (100%) · 0 Errores de Compilación</p>
      </div>
    </div>
  `;

  const htmlCompleto = `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <title>Informe de Implementación BUMAND</title>
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

  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setContent(htmlCompleto, { waitUntil: 'networkidle0' });

  await page.pdf({
    path: RUTA_PDF_DOC,
    format: 'A4',
    printBackground: true,
    displayHeaderFooter: true,
    headerTemplate: `
      <div style="font-size: 8pt; color: #94A3B8; width: 100%; padding: 0 15mm; display: flex; justify-content: space-between; border-bottom: 0.5px solid #E2E8F0; margin-bottom: 5mm;">
        <span>BUMAND — Fundación Diaconía FRIF-IFD</span>
        <span>Informe Técnico de Implementación</span>
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

  // Copiar a la raíz del repositorio
  fs.copyFileSync(RUTA_PDF_DOC, RUTA_PDF_RAIZ);

  const tamanoKb = (fs.statSync(RUTA_PDF_DOC).size / 1024).toFixed(1);
  console.log(`✅ PDF generado exitosamente: ${RUTA_PDF_DOC} (${tamanoKb} KB)`);
  console.log(`✅ Copia generada en la raíz del proyecto: ${RUTA_PDF_RAIZ}`);
}

compilarPdf();
