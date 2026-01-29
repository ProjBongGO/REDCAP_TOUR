// SQL 생성 로직을 담당하는 모듈
// 이 파일은 get_table_info.js에서 SQL 생성 부분을 분리한 것입니다

/**
 * Handsontable 데이터를 기반으로 Oracle CREATE TABLE SQL을 생성합니다.
 * @param {Array} data - Handsontable에서 추출한 데이터 배열
 * @param {string} requestNumber - 요청 번호 (선택 사항)
 * @returns {string} 생성된 SQL 문자열
 */
function generateOracleSQL(data, requestNumber) {
    // 입력값 검증
    if (!Array.isArray(data)) {
        throw new Error('데이터 형식이 올바르지 않습니다.');
    }

    // 테이블 이름 추출 (첫 번째 유효한 행에서)
    const extractedTableName = data.find(row => row[1]) ? data.find(row => row[1])[1] : '';
    const tableName = (requestNumber || extractedTableName || 'NEW_TABLE').toUpperCase();

    // 테이블 이름 유효성 검사
    if (!/^[A-Za-z0-9_]+$/.test(tableName)) {
        throw new Error('테이블 이름에 특수문자가 포함되어 있습니다.');
    }

    // 테이블 주석 추출 (첫 번째 유효한 행에서)
    const tableComment = data.find(row => row[2]) ? data.find(row => row[2])[2] : '';

    // 스키마 이름 추출 (첫 번째 유효한 행에서)
    const extractedSchemaName = data.find(row => row[0]) ? data.find(row => row[0])[0] : '';
    const schemaName = extractedSchemaName ? extractedSchemaName.toUpperCase() : ''; // 스키마는 대문자로, 없으면 빈 문자열

    let sql = `CREATE TABLE ${schemaName ? `"${schemaName}".` : ''}"${tableName}" (\n`;
    let comments = []; // Oracle COMMENT 문을 저장할 배열
    let pkColumns = []; // PK 정보를 저장할 배열 [{name, order}]

    // 유효한 컬럼만 추출 (COLUMN_NAME이 비어 있지 않은 행)
    const validColumns = data.filter(row => {
        // 빈 행이 아니고, COLUMN_NAME (index 4)이 있는 경우
        return row.every(cell => cell === '' || cell === null) === false && row[4];
    });

    validColumns.forEach((row, index) => {
        const pkOrder = row[3];                                    // PK순번 (index 3)
        const columnName = row[4] ? row[4].toUpperCase() : '';     // COLUMN_NAME (index 4)
        const columnComment = row[5] || '';                        // COLUMN_COMMENT (index 5)
        const dataType = row[6] ? row[6].toUpperCase() : '';       // DATA_TYPE (index 6)
        const dataLength = row[7] || '';                           // DATA_LENGTH (index 7)
        const nullable = row[8] === 'Y' ? 'NULL' : 'NOT NULL';     // NULL (index 8)
        const defaultValue = row[9] || '';                         // DEFAULT (index 9)

        // PK 정보 수집
        if (pkOrder !== null && pkOrder !== '' && !isNaN(pkOrder) && !isNaN(parseInt(pkOrder))) {
            pkColumns.push({ name: columnName, order: parseInt(pkOrder) });
        }

        let columnDef = `    "${columnName}" ${dataType}`; // Oracle에서는 대소문자 구분을 위해 컬럼명에 쌍따옴표 권장
        if (dataLength) {
            columnDef += `(${dataLength})`;
        }
        columnDef += ` ${nullable}`;
        if (defaultValue) {
            // DEFAULT 값이 숫자가 아닌 경우 따옴표 처리
            if (!/^(\d+(\.\d+)?|TO_DATE\\(.+\\))$/.test(defaultValue.trim())) { // 숫자나 TO_DATE 함수가 아니면 따옴표
                columnDef += ` DEFAULT '${defaultValue}'`;
            } else {
                columnDef += ` DEFAULT ${defaultValue}`;
            }
        }

        sql += columnDef;

        // Oracle COLUMN COMMENT 문 생성
        if (columnComment) {
            comments.push(`COMMENT ON COLUMN ${schemaName ? `"${schemaName}".` : ''}"${tableName}"."${columnName}" IS '${columnComment}';`);
        }

        // 마지막 유효한 컬럼이 아닌 경우에만 콤마 추가
        if (index < validColumns.length - 1) {
            sql += ',\n';
        }
    });

    // PK 제약 조건 추가
    if (pkColumns.length > 0) {
        // order 순서대로 정렬
        pkColumns.sort((a, b) => a.order - b.order);
        const pkNames = pkColumns.map(col => `"${col.name}"`).join(', ');
        sql += `,\n    CONSTRAINT "PK_${tableName}" PRIMARY KEY (${pkNames})`;
    }

    sql += '\n);';

    // Oracle TABLE COMMENT 문 추가 (테이블 주석이 있는 경우에만)
    if (tableComment) {
        sql += `\n\nCOMMENT ON TABLE ${schemaName ? `"${schemaName}".` : ''}"${tableName}" IS '${tableComment}';`;
    }

    // Oracle COLUMN COMMENT 문 추가
    if (comments.length > 0) {
        sql += '\n\n' + comments.join('\n');
    }

    return sql;
}

// 모듈로 내보내기 (Node.js 환경) 또는 전역 객체에 등록 (브라우저 환경)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { generateOracleSQL };
} else {
    window.generateOracleSQL = generateOracleSQL;
}