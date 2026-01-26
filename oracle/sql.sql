-- ASM 디스크 그룹 사용량 조회 쿼리
SELECT name
     , total_mb
     , free_mb
     , (total_mb - free_mb) AS used_mb
     , ROUND((total_mb - free_mb) / total_mb * 100, 2) AS used_percent
  FROM v$asm_diskgroup
 ORDER BY name;

-- RTIS 스키마에서 LOG, HST, HIST로 끝나는 테이블 조회
SELECT t.table_name
     , c.comments AS table_comment
     , s.timestamp AS last_ddl_time
     , m.timestamp
     , m.inserts
     , m.updates
     , m.deletes
  FROM all_tables t
       LEFT JOIN all_tab_comments c ON t.owner = c.owner AND t.table_name = c.table_name
       LEFT JOIN all_objects s ON t.owner = s.owner AND t.table_name = s.object_name
       LEFT JOIN dba_tab_modifications m ON t.owner = m.table_owner AND t.table_name = m.table_name
 WHERE t.owner = 'RTIS'
   AND (t.table_name LIKE '%LOG'
    OR  t.table_name LIKE '%HST'
    OR  t.table_name LIKE '%HIST')
 ORDER BY t.table_name;