SELECT to_char(to_date(substr(CRT_DT, 1, 8), 'YYYYMMDD'), 'MM') AS MONTH, COUNT(*)
FROM erphr.hr_tna_cald
WHERE 1=1
--   AND to_char(to_date(substr(CRT_DT, 1, 8), 'YYYYMMDD'), 'MM') = '09'
GROUP BY to_char(to_date(substr(CRT_DT, 1, 8), 'YYYYMMDD'), 'MM')

