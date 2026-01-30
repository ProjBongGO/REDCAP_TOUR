-- 기존 쿼리: 월별 건수 집계
SELECT
    to_char(to_date(substr(CRT_DT, 1, 8), 'YYYYMMDD'), 'MM') AS MONTH,
    COUNT(*)
FROM erphr.hr_tna_cald
WHERE 1=1
--   AND to_char(to_date(substr(CRT_DT, 1, 8), 'YYYYMMDD'), 'MM') = '09'
GROUP BY to_char(to_date(substr(CRT_DT, 1, 8), 'YYYYMMDD'), 'MM');

-- ==============================
-- 아카이브 파일 사용량 조회 쿼리
-- ==============================

-- 1. 아카이브 로그 파일별 사용량 (최근 7일)
SELECT
    SEQUENCE#               AS 로그_시퀀스,
    TO_CHAR(COMPLETION_TIME, 'YYYY-MM-DD HH24:MI:SS') AS 완료_시간,
    DEST_ID                 AS 목적지_ID,
    ARCHIVED                AS 아카이브_여부,
    BLOCKS * BLOCK_SIZE / 1024 / 1024 AS 파일_크기_MB,
    NAME                    AS 파일_경로
FROM
    V$ARCHIVED_LOG
WHERE
    ARCHIVED = 'YES'
    AND COMPLETION_TIME >= SYSDATE - 7
ORDER BY
    COMPLETION_TIME DESC;

-- 2. 전체 아카이브 로그 사용량 요약
SELECT
    SUM(BLOCKS * BLOCK_SIZE) / 1024 / 1024 AS 전체_사용량_MB,
    COUNT(*)                               AS 로그_파일_수
FROM
    V$ARCHIVED_LOG
WHERE
    ARCHIVED = 'YES';