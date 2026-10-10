import os
import base64
import markdown
import subprocess

def encode_image(image_path):
    if os.path.exists(image_path):
        with open(image_path, "rb") as f:
            return "data:image/jpeg;base64," + base64.b64encode(f.read()).decode("utf-8")
    return ""

def main():
    base_dir = r"c:\Users\yang_\Desktop\ZBumands\Bumands-Proyecto\new-bumand"
    md_path = os.path.join(base_dir, "AudiosyDocumentosBumands", "documentacion-integral-proyecto-bumand.md")
    pdf_out = os.path.join(base_dir, "AudiosyDocumentosBumands", "documentacion-integral-proyecto-bumand.pdf")
    
    logo_bumand_path = os.path.join(base_dir, "AudiosyDocumentosBumands", "ArchivosImportantes", "logo-oficial-bumand-al-servicio.jpeg")
    logo_diaconia_path = os.path.join(base_dir, "AudiosyDocumentosBumands", "ArchivosImportantes", "logo-oficial-diaconia-ifd.jpeg")
    
    logo_bumand_b64 = encode_image(logo_bumand_path)
    logo_diaconia_b64 = encode_image(logo_diaconia_path)
    
    with open(md_path, "r", encoding="utf-8") as f:
        md_content = f.read()
        
    html_body = markdown.markdown(md_content, extensions=["tables", "fenced_code", "nl2br", "sane_lists"])
    
    full_html = f"""<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Documentación Integral BUMAND</title>
    <style>
        @page {{
            size: A4;
            margin: 20mm 15mm 20mm 15mm;
            @bottom-right {{
                content: counter(page);
            }}
        }}
        
        body {{
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            font-size: 10pt;
            line-height: 1.5;
            color: #1e293b;
            background-color: #ffffff;
            margin: 0;
            padding: 0;
        }}
        
        /* Portada */
        .portada {{
            page-break-after: always;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 90vh;
            text-align: center;
            border: 2px solid #0284c7;
            padding: 30px;
            box-sizing: border-box;
            background: linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%);
            border-radius: 8px;
        }}
        
        .logos-container {{
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 40px;
            margin-bottom: 40px;
        }}
        
        .logo-img {{
            max-height: 85px;
            max-width: 200px;
            object-fit: contain;
        }}
        
        .titulo-portada {{
            font-size: 24pt;
            font-weight: 800;
            color: #0f172a;
            margin-bottom: 12px;
            line-height: 1.2;
        }}
        
        .subtitulo-portada {{
            font-size: 13pt;
            color: #0284c7;
            font-weight: 600;
            margin-bottom: 30px;
        }}
        
        .meta-box {{
            background: #ffffff;
            border: 1px solid #cbd5e1;
            border-radius: 6px;
            padding: 20px 30px;
            font-size: 10pt;
            text-align: left;
            width: 80%;
            margin-bottom: 30px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.05);
        }}
        
        .meta-box p {{
            margin: 6px 0;
        }}
        
        .meta-box strong {{
            color: #0f172a;
        }}
        
        .fecha-portada {{
            font-size: 9pt;
            color: #64748b;
            margin-top: 15px;
        }}

        /* Encabezados y jerarquía */
        h1 {{
            color: #0f172a;
            font-size: 16pt;
            border-bottom: 2px solid #0284c7;
            padding-bottom: 6px;
            margin-top: 24pt;
            margin-bottom: 12pt;
            page-break-after: avoid;
        }}
        
        h2 {{
            color: #1e3a8a;
            font-size: 13pt;
            border-bottom: 1px solid #e2e8f0;
            padding-bottom: 4px;
            margin-top: 18pt;
            margin-bottom: 10pt;
            page-break-after: avoid;
        }}
        
        h3 {{
            color: #0369a1;
            font-size: 11pt;
            margin-top: 14pt;
            margin-bottom: 6pt;
            page-break-after: avoid;
        }}
        
        h4 {{
            color: #334155;
            font-size: 10pt;
            margin-top: 10pt;
            margin-bottom: 4pt;
            page-break-after: avoid;
        }}

        p {{
            margin-top: 0;
            margin-bottom: 8pt;
            text-align: justify;
        }}
        
        /* Tablas ejecutivas */
        table {{
            width: 100%;
            border-collapse: collapse;
            margin: 12pt 0;
            font-size: 8.5pt;
            page-break-inside: avoid;
        }}
        
        th {{
            background-color: #0f172a;
            color: #ffffff;
            font-weight: 600;
            text-align: left;
            padding: 7px 9px;
            border: 1px solid #334155;
        }}
        
        td {{
            padding: 6px 9px;
            border: 1px solid #cbd5e1;
            vertical-align: top;
        }}
        
        tr:nth-child(even) {{
            background-color: #f8fafc;
        }}
        
        /* Citas y badges */
        blockquote {{
            border-left: 4px solid #0284c7;
            background-color: #f0f9ff;
            margin: 10pt 0;
            padding: 8pt 12pt;
            font-style: italic;
            color: #0369a1;
        }}
        
        code {{
            background-color: #f1f5f9;
            color: #0f172a;
            padding: 2px 4px;
            border-radius: 4px;
            font-family: Consolas, "Courier New", monospace;
            font-size: 8.5pt;
        }}
        
        pre {{
            background-color: #0f172a;
            color: #f8fafc;
            padding: 10pt;
            border-radius: 6px;
            overflow-x: auto;
            font-size: 8pt;
            page-break-inside: avoid;
        }}
        
        pre code {{
            background-color: transparent;
            color: #f8fafc;
            padding: 0;
        }}
        
        ul, ol {{
            margin-top: 0;
            margin-bottom: 8pt;
            padding-left: 20px;
        }}
        
        li {{
            margin-bottom: 3pt;
        }}
        
        hr {{
            border: none;
            border-top: 1px solid #cbd5e1;
            margin: 16pt 0;
        }}
    </style>
</head>
<body>
    <div class="portada">
        <div class="logos-container">
            {'<img src="' + logo_bumand_b64 + '" class="logo-img" alt="Logo BUMAND">' if logo_bumand_b64 else ''}
            {'<img src="' + logo_diaconia_b64 + '" class="logo-img" alt="Logo Diaconía IFD">' if logo_diaconia_b64 else ''}
        </div>
        <div class="titulo-portada">DOCUMENTACIÓN INTEGRAL DEL PROYECTO BUMAND</div>
        <div class="subtitulo-portada">Sistema de Control de Asistencia y Seguimiento del Desempeño de Becarios</div>
        
        <div class="meta-box">
            <p><strong>Institución Patrocinadora:</strong> Diaconía FRIF-IFD (Institución Financiera de Desarrollo)</p>
            <p><strong>Programa Social:</strong> BUMAND (Becas Universitarias con Misión y Acción Diaconal)</p>
            <p><strong>Proyecto de Grado:</strong> Carrera de Informática, Universidad Mayor de San Andrés (UMSA)</p>
            <p><strong>Postulante / Desarrollador:</strong> Daniel Davalos Quiñonez</p>
            <p><strong>Tutor Académico:</strong> M.Sc. Reynaldo Zeballos Daza</p>
            <p><strong>Alcance Tecnológico:</strong> NestJS + PostgreSQL + Next.js 14+ + Flutter 3</p>
        </div>
        
        <div class="fecha-portada">La Paz / El Alto, Bolivia &bull; Octubre 2026</div>
    </div>
    
    <div class="contenido">
        {html_body}
    </div>
</body>
</html>
"""
    temp_html = os.path.join(base_dir, "temp_doc_bumand.html")
    with open(temp_html, "w", encoding="utf-8") as f:
        f.write(full_html)
        
    print(f"HTML generado temporalmente en {temp_html}")
    
    clean_backend_path = os.path.join(base_dir, "bumand-backend", "node_modules", "puppeteer").replace("\\", "/")
    clean_html_path = temp_html.replace("\\", "/")
    clean_pdf_out = pdf_out.replace("\\", "/")
    
    # Script Node para ejecutar Puppeteer
    node_script = f"""
    const puppeteer = require('{clean_backend_path}');
    const path = require('path');

    (async () => {{
        const browser = await puppeteer.launch({{
            headless: 'new',
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        }});
        const page = await browser.newPage();
        await page.goto('file:///{clean_html_path}', {{ waitUntil: 'networkidle0' }});
        
        await page.pdf({{
            path: '{clean_pdf_out}',
            format: 'A4',
            printBackground: true,
            margin: {{
                top: '20mm',
                right: '15mm',
                bottom: '20mm',
                left: '15mm'
            }},
            displayHeaderFooter: true,
            headerTemplate: '<div style="font-size: 8pt; color: #94a3b8; width: 100%; text-align: right; padding-right: 15mm;">BUMAND - Diaconía IFD &bull; Documentación Oficial</div>',
            footerTemplate: '<div style="font-size: 8pt; color: #94a3b8; width: 100%; display: flex; justify-content: space-between; padding-left: 15mm; padding-right: 15mm;"><span>Sistema de Control y Seguimiento</span><span>Página <span class="pageNumber"></span> de <span class="totalPages"></span></span></div>'
        }});
        
        await browser.close();
        console.log('PDF generado exitosamente en: {clean_pdf_out}');
    }})();
    """
    
    temp_js = os.path.join(base_dir, "temp_render_pdf.js")
    with open(temp_js, "w", encoding="utf-8") as f:
        f.write(node_script)
        
    subprocess.run(["node", temp_js], check=True)
    
    # Limpieza residual
    if os.path.exists(temp_html):
        os.remove(temp_html)
    if os.path.exists(temp_js):
        os.remove(temp_js)
    print("Archivos temporales eliminados.")

if __name__ == "__main__":
    main()
