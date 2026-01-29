SELECT
    s.FORCE_MATCHING_SIGNATURE AS force_matching_signature,   -- FORCE_MATCHING_SIGNATURE
    TO_CHAR(TRUNC(s.LAST_ACTIVE_TIME, 'MI'), 'YYYY-MM-DD HH24:MI') AS exec_time, -- 실행 시각 (분 단위)
    COUNT(*) OVER (PARTITION BY TO_CHAR(TRUNC(s.LAST_ACTIVE_TIME, 'MI'), 'YYYY-MM-DD HH24:MI')) AS exec_cnt,    -- 같은 시그니처가 오늘 몇 번 실행됐는지
    MAX(s.SQL_TEXT) OVER (PARTITION BY TO_CHAR(TRUNC(s.LAST_ACTIVE_TIME, 'MI'), 'YYYY-MM-DD HH24:MI')) AS sql_text,    -- 전체 SQL 텍스트 중 하나 (최대값)
    MAX(p.OBJECT_NAME) OVER (PARTITION BY TO_CHAR(TRUNC(s.LAST_ACTIVE_TIME, 'MI'), 'YYYY-MM-DD HH24:MI')) AS object_name -- 대상 테이블명 (IB_GKSNET_CARD_BUY)
FROM
    GV$SQL            s
    /*--- 실행 계획에 나타나는 객체(테이블) 확인 -------------------*/
    JOIN GV$SQL_PLAN p
          ON p.SQL_ID        = s.SQL_ID
         AND p.CHILD_NUMBER = s.CHILD_NUMBER
          AND p.INST_ID = s.INST_ID
         AND p.OPERATION    = 'UPDATE'               -- UPDATE 연산만
WHERE
    /* 1) 오늘 실행된 것만 */
    s.LAST_ACTIVE_TIME >= TRUNC(SYSDATE)
    /* 2) UPDATE 문이어야 함 */
    AND s.SQL_TEXT LIKE '%UPDATE%'
    /* 3) 실행 계획에 대상 테이블이 IB_GKSNET_CARD_BUY 인 경우 */
    AND p.OBJECT_NAME = 'IB_GKSNET_CARD_BUY'
ORDER BY
    exec_time, exec_cnt DESC;

SELECT
    TRUNC(first_time, 'HH') AS hour,
    SUM(blocks * 8192) / (1024 * 1024) AS size_mb
FROM
    v$archived_log
WHERE
    first_time >= TRUNC(SYSDATE)
GROUP BY
    TRUNC(first_time, 'HH')
ORDER BY
    hour;