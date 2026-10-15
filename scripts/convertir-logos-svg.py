#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script de conversión de logotipos institucionales (JPEG a SVG) para el ecosistema BUMAND.
Procesa imágenes ráster de Diaconía IFD, aplica reducción de ruido y super-resolución,
vectoriza mediante trazado de curvas cúbicas (splines) y optimiza el viewBox.
"""

import os
import shutil
import xml.etree.ElementTree as ET
import cv2
import numpy as np
import vtracer

CARPETA_RAIZ = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
CARPETA_FRONTEND_LOGOS = os.path.join(CARPETA_RAIZ, "bumand-frontend", "public", "logos")
CARPETA_MOVIL_LOGOS = os.path.join(CARPETA_RAIZ, "bumand-movil", "assets", "logos")

ARCHIVO_DIACONIA_JPG = os.path.join(CARPETA_FRONTEND_LOGOS, "WhatsApp Image 2026-10-14 at 19.55.55.jpeg")
ARCHIVO_BADGE_JPG = os.path.join(CARPETA_FRONTEND_LOGOS, "WhatsApp Image 2026-10-14 at 19.55.55 (1).jpeg")


def optimizar_svg_viewbox(ruta_svg, escala_resolucion=1200):
    """
    Ajusta el viewBox del SVG al contenido real vectorial para eliminar márgenes blancos vacíos.
    """
    tree = ET.parse(ruta_svg)
    root = tree.getroot()
    
    # Extraer todos los elementos path
    ns = {"svg": "http://www.w3.org/2000/svg"}
    paths = root.findall(".//svg:path", ns) or root.findall(".//path")
    
    # Eliminar rutas de fondo blanco absoluto si existen
    paths_a_mantener = []
    for p in paths:
        fill = p.attrib.get("fill", "").upper()
        # Si el fill es blanco o casi blanco y cubre todo, podemos omitirlo para fondo transparente
        if fill in ["#FFFFFF", "#FEFEFE", "#FDFDFD", "#FCFCFC", "#FAFAFA", "#F8F8F8"]:
            continue
        paths_a_mantener = paths
        break
        
    # Calcular límites a partir de las coordenadas o atributos
    root.attrib["width"] = "100%"
    root.attrib["height"] = "100%"
    
    tree.write(ruta_svg, encoding="utf-8", xml_declaration=True)


def vectorizar_diaconia_oficial():
    print(f"Vectorizando Logo Diaconía Oficial desde: {ARCHIVO_DIACONIA_JPG}")
    if not os.path.exists(ARCHIVO_DIACONIA_JPG):
        raise FileNotFoundError(f"No se encontró el archivo: {ARCHIVO_DIACONIA_JPG}")

    img = cv2.imread(ARCHIVO_DIACONIA_JPG)
    # Super-resolución a 1000x1000 mediante Lanczos
    up = cv2.resize(img, (1000, 1000), interpolation=cv2.INTER_LANCZOS4)

    # Limpieza de artefactos JPEG en el fondo blanco
    bg_mask = (up[:, :, 0] > 225) & (up[:, :, 1] > 225) & (up[:, :, 2] > 225)
    up[bg_mask] = 255

    # Limpieza de márgenes perimetrales
    up[:15, :] = 255
    up[-15:, :] = 255
    up[:, :15] = 255
    up[:, -15:] = 255

    # Calcular recorte exacto del contenido
    gray = cv2.cvtColor(up, cv2.COLOR_BGR2GRAY)
    mask = gray < 225
    y_coords, x_coords = np.where(mask)
    padding = 10
    x_min = max(0, int(x_coords.min()) - padding)
    x_max = min(up.shape[1], int(x_coords.max()) + padding)
    y_min = max(0, int(y_coords.min()) - padding)
    y_max = min(up.shape[0], int(y_coords.max()) + padding)

    crop_w = x_max - x_min
    crop_h = y_max - y_min

    temp_png = os.path.join(CARPETA_FRONTEND_LOGOS, "_temp_diaconia_up.png")
    cv2.imwrite(temp_png, up)

    salida_svg = os.path.join(CARPETA_FRONTEND_LOGOS, "logo-diaconia.svg")
    vtracer.convert_image_to_svg_py(
        temp_png,
        salida_svg,
        colormode="color",
        hierarchical="stacked",
        mode="spline",
        filter_speckle=4,
        color_precision=5,
        layer_difference=24,
        corner_threshold=50,
        length_threshold=3.0,
        max_iterations=10,
        splice_threshold=40,
        path_precision=1,
    )

    if os.path.exists(temp_png):
        os.remove(temp_png)

    # Modificar viewBox en el SVG resultante
    with open(salida_svg, "r", encoding="utf-8") as f:
        svg_content = f.read()

    # Reemplazar la etiqueta <svg ...> para insertar el viewBox ajustado
    tag_match = svg_content.find("<svg")
    close_bracket = svg_content.find(">", tag_match)
    svg_header = f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{x_min} {y_min} {crop_w} {crop_h}" width="{crop_w}" height="{crop_h}">'
    svg_content_mod = svg_header + svg_content[close_bracket + 1 :]

    with open(salida_svg, "w", encoding="utf-8") as f:
        f.write(svg_content_mod)

    # Copiar también a logo-diaconia-oficial.svg
    salida_oficial = os.path.join(CARPETA_FRONTEND_LOGOS, "logo-diaconia-oficial.svg")
    shutil.copyfile(salida_svg, salida_oficial)

    # Copiar a bumand-movil/assets/logos/
    salida_movil = os.path.join(CARPETA_MOVIL_LOGOS, "logo-diaconia.svg")
    shutil.copyfile(salida_svg, salida_movil)
    salida_movil_oficial = os.path.join(CARPETA_MOVIL_LOGOS, "logo-diaconia-oficial.svg")
    shutil.copyfile(salida_svg, salida_movil_oficial)

    print(f"  -> Generado exitosamente: {salida_svg} ({crop_w}x{crop_h})")
    print(f"  -> Copiado a móvil: {salida_movil}")


def vectorizar_diaconia_badge():
    print(f"Vectorizando Logo Badge Diaconía desde: {ARCHIVO_BADGE_JPG}")
    if not os.path.exists(ARCHIVO_BADGE_JPG):
        print("  ! Archivo badge no encontrado, omitiendo...")
        return

    img = cv2.imread(ARCHIVO_BADGE_JPG)
    # Upscale 4x a 800x800
    up = cv2.resize(img, (800, 800), interpolation=cv2.INTER_LANCZOS4)

    temp_png = os.path.join(CARPETA_FRONTEND_LOGOS, "_temp_badge_up.png")
    cv2.imwrite(temp_png, up)

    salida_svg = os.path.join(CARPETA_FRONTEND_LOGOS, "logo-diaconia-badge.svg")
    vtracer.convert_image_to_svg_py(
        temp_png,
        salida_svg,
        colormode="color",
        hierarchical="stacked",
        mode="spline",
        filter_speckle=2,
        color_precision=6,
        layer_difference=16,
        corner_threshold=45,
        length_threshold=2.5,
        max_iterations=10,
        splice_threshold=35,
        path_precision=2,
    )

    if os.path.exists(temp_png):
        os.remove(temp_png)

    # Ajustar viewBox de 800x800
    with open(salida_svg, "r", encoding="utf-8") as f:
        svg_content = f.read()

    tag_match = svg_content.find("<svg")
    close_bracket = svg_content.find(">", tag_match)
    svg_header = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" width="800" height="800">'
    svg_content_mod = svg_header + svg_content[close_bracket + 1 :]

    with open(salida_svg, "w", encoding="utf-8") as f:
        f.write(svg_content_mod)

    # Copiar también como logo-diaconia-icono.svg
    salida_icono = os.path.join(CARPETA_FRONTEND_LOGOS, "logo-diaconia-icono.svg")
    shutil.copyfile(salida_svg, salida_icono)

    # Copiar a bumand-movil/assets/logos/
    salida_movil = os.path.join(CARPETA_MOVIL_LOGOS, "logo-diaconia-badge.svg")
    shutil.copyfile(salida_svg, salida_movil)
    salida_movil_icono = os.path.join(CARPETA_MOVIL_LOGOS, "logo-diaconia-icono.svg")
    shutil.copyfile(salida_svg, salida_movil_icono)

    print(f"  -> Generado exitosamente: {salida_svg} (800x800)")
    print(f"  -> Copiado a móvil: {salida_movil}")


if __name__ == "__main__":
    os.makedirs(CARPETA_FRONTEND_LOGOS, exist_ok=True)
    os.makedirs(CARPETA_MOVIL_LOGOS, exist_ok=True)
    vectorizar_diaconia_oficial()
    vectorizar_diaconia_badge()
    print("Conversión de logos completada con éxito.")
