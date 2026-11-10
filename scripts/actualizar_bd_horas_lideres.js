const { Client } = require('../bumand-backend/node_modules/pg');

async function actualizar() {
  const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: '4a74ab3f9c4d1cbfc7309c945094afc3',
    database: 'bumand-db',
  });

  await client.connect();
  console.log('Conectado a PostgreSQL bumand-db');

  await client.query('BEGIN');

  // 1. Poner horas_trabajadas = 0 para todos los registros de escuela_lideres
  const resLideres = await client.query(`
    UPDATE registros_asistencia 
    SET horas_trabajadas = 0 
    WHERE tipo = 'escuela_lideres'
  `);
  console.log(`[1] Registros de escuela_lideres actualizados a 0 horas: ${resLideres.rowCount}`);

  // 2. Para los meses cerrados (2026-03 a 2026-10), ajustar horas_trabajadas de practicas
  // Meses con 9 registros de prácticas (03, 04, 06, 07, 08, 09): cada registro pasa a 4.10 hrs -> 9 * 4.10 = 36.90 hrs
  const res9 = await client.query(`
    UPDATE registros_asistencia
    SET horas_trabajadas = 4.10
    WHERE tipo = 'practicas'
      AND TO_CHAR(fecha, 'YYYY-MM') IN ('2026-03', '2026-04', '2026-06', '2026-07', '2026-08', '2026-09')
  `);
  console.log(`[2] Registros de prácticas (meses de 9 jornadas) actualizados a 4.10 hrs: ${res9.rowCount}`);

  // Meses con 8 registros de prácticas (05, 10): cada registro pasa a 4.60 hrs -> 8 * 4.60 = 36.80 hrs
  const res8 = await client.query(`
    UPDATE registros_asistencia
    SET horas_trabajadas = 4.60
    WHERE tipo = 'practicas'
      AND TO_CHAR(fecha, 'YYYY-MM') IN ('2026-05', '2026-10')
  `);
  console.log(`[3] Registros de prácticas (meses de 8 jornadas) actualizados a 4.60 hrs: ${res8.rowCount}`);

  // 2026-11 (mes actual en curso): asegurar que practicas quede en 3.50 hrs (2 jornadas = 7.00 hrs)
  const resNov = await client.query(`
    UPDATE registros_asistencia
    SET horas_trabajadas = 3.50
    WHERE tipo = 'practicas'
      AND TO_CHAR(fecha, 'YYYY-MM') = '2026-11'
  `);
  console.log(`[4] Registros de prácticas Noviembre 2026 en 3.50 hrs: ${resNov.rowCount}`);

  await client.query('COMMIT');

  console.log('\n--- VERIFICACIÓN POST-ACTUALIZACIÓN ---');
  const resCheck = await client.query(`
    SELECT TO_CHAR(r.fecha, 'YYYY-MM') as mes,
           r.tipo,
           COUNT(*) as cant_registros,
           ROUND(AVG(r.horas_trabajadas)::numeric, 2) as media_horas,
           ROUND(SUM(r.horas_trabajadas)::numeric, 2) as suma_total,
           ROUND((SUM(r.horas_trabajadas) / 25)::numeric, 2) as horas_por_becario
    FROM registros_asistencia r
    GROUP BY TO_CHAR(r.fecha, 'YYYY-MM'), r.tipo
    ORDER BY mes, r.tipo
  `);
  console.table(resCheck.rows);

  const resBecarioAdai = await client.query(`
    SELECT TO_CHAR(r.fecha, 'YYYY-MM') as mes,
           SUM(CASE WHEN r.tipo = 'practicas' THEN r.horas_trabajadas ELSE 0 END) as horas_practicas,
           SUM(CASE WHEN r.tipo = 'escuela_lideres' THEN r.horas_trabajadas ELSE 0 END) as horas_lideres,
           SUM(r.horas_trabajadas) as horas_totales
    FROM registros_asistencia r
    WHERE r.becario_id = (SELECT id FROM becarios WHERE ci = '13696496' LIMIT 1)
    GROUP BY TO_CHAR(r.fecha, 'YYYY-MM')
    ORDER BY mes
  `);
  console.log('--- Horas de Adai Belen Huayta Cardozo ---');
  console.table(resBecarioAdai.rows);

  await client.end();
}

actualizar().catch(console.error);
