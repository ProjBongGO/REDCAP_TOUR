// Handsontable 스프레드시트 구현
document.addEventListener('DOMContentLoaded', function() {
    // DOM 요소 존재 여부 확인
    const tableGrid = document.getElementById('table-grid');
    const addColumnBtn = document.getElementById('add-column-btn');

    if (!tableGrid || !addColumnBtn) {
        console.error('필수 DOM 요소를 찾을 수 없습니다.');
        return;
    }

    // Handsontable 데이터 초기화
    const data = [
        ['', '', '', '', '', '', '', '', ''] // 초기 빈 행
    ];

    // Handsontable 인스턴스 생성
    const hot = new Handsontable(tableGrid, {
        data: data,
        colHeaders: [
            'SCHEMA',        // index 0
            'TABLE_NAME',    // index 1
            'TABLE_COMMENT', // index 2 - 새로 추가
            'COLUMN_NAME',   // index 3
            'DATA_TYPE',     // index 4
            'DATA_LENGTH',   // index 5
            'NULL',          // index 6
            'DEFAULT',       // index 7
            'COLUMN_COMMENT' // index 8
        ],
        columns: [
            { // SCHEMA
                type: 'autocomplete',
                source: ['RTIS', 'OBT', 'ERPAPP'],
                strict: true,
                allowInvalid: false
            },
            { type: 'text' }, // TABLE_NAME
            { type: 'text' }, // TABLE_COMMENT - 추가된 컬럼
            { type: 'text' }, // COLUMN_NAME
            { // DATA_TYPE
                type: 'autocomplete',
                source: ['VARCHAR2', 'NUMBER', 'DATE', 'CHAR', 'TIMESTAMP', 'CLOB', 'BLOB'],
                strict: true,
                allowInvalid: false
            },
            { // DATA_LENGTH
                type: 'text',
                validator: function(value, callback) {
                    if (!value || /^[0-9]+$/.test(value)) { // 숫자만 허용
                        callback(true);
                    } else {
                        callback(false);
                    }
                }
            },
            { // NULL
                type: 'autocomplete',
                source: ['Y', 'N'],
                strict: true,
                allowInvalid: false
            },
            { type: 'text' }, // DEFAULT
            { type: 'text' }  // COLUMN_COMMENT
        ],
        minSpareRows: 1,
        contextMenu: true,
        manualColumnResize: true,
        manualRowResize: true,
        rowHeaders: true,
        // colWidths: [120, 180, 180, 150, 100, 80, 120, 250, 100],
        stretchH: 'all',
        autoWrapRow: true,
        height: 400,
        width: '100%',
        licenseKey: 'non-commercial-and-evaluation' // 비상업용 라이선스
    });

    // 행 추가 버튼 이벤트 리스너
    addColumnBtn.addEventListener('click', function() {
        const columnCountInput = document.getElementById('column-count');
        let columnCount = parseInt(columnCountInput.value) || 1;
        if (columnCount < 1) {
            columnCount = 1;
        }
        for (let i = 0; i < columnCount; i++) {
            hot.alter('insert_row');
        }
    });

    // GENERATE 버튼 이벤트 리스너
    const generateBtn = document.getElementById('generate-btn');
    const sqlOutput = document.getElementById('sql-output');
    const sqlContent = document.getElementById('sql-content');

    generateBtn.addEventListener('click', function() {
        const data = hot.getData();
        const requestNumber = document.getElementById('request_number').value;

        // ...existing code for initial checks...

        // 테이블 이름 추출 (첫 번째 유효한 행에서)
        // RequestNumber가 존재하면 RequestNumber를 사용, 아니면 Handsontable의 첫 번째 유효한 행에서 TABLE_NAME을 가져옴
        // 둘 다 없으면 'NEW_TABLE'
        const extractedTableName = data.find(row => row[1]) ? data.find(row => row[1])[1] : '';
        const tableName = (requestNumber || extractedTableName || 'NEW_TABLE').toUpperCase();

        // 테이블 주석 추출 (첫 번째 유효한 행에서)
        const tableComment = data.find(row => row[2]) ? data.find(row => row[2])[2] : '';

        let sql = `CREATE TABLE ${tableName} (\n`;
        let comments = []; // Oracle COMMENT 문을 저장할 배열

        // 유효한 컬럼만 추출 (COLUMN_NAME이 비어 있지 않은 행)
        const validColumns = data.filter(row => {
            // 빈 행이 아니고, COLUMN_NAME (index 3)이 있는 경우
            return row.every(cell => cell === '') === false && row[3];
        });

        validColumns.forEach((row, index) => {
            // 스키마는 첫 번째 유효한 행에서 가져오거나, 모든 행의 스키마가 동일하다고 가정 (여기서는 첫 번째 행 기준)
            const schema = row[0] || ''; // 스키마는 각 컬럼 정의에 사용되지 않으므로, 이 시점에서 불필요할 수 있음
            // const currentTableName = row[1] ? row[1].toUpperCase() : ''; // 이 변수는 이제 사용하지 않음
            // const currentTableComment = row[2] || ''; // 이 변수도 이제 사용하지 않음

            const columnName = row[3] ? row[3].toUpperCase() : ''; // COLUMN_NAME (index 3)
            const dataType = row[4] ? row[4].toUpperCase() : '';    // DATA_TYPE (index 4)
            const dataLength = row[5] || '';                        // DATA_LENGTH (index 5)
            const nullable = row[6] === 'Y' ? 'NULL' : 'NOT NULL';  // NULL (index 6)
            const defaultValue = row[7] || '';                      // DEFAULT (index 7)
            const columnComment = row[8] || '';                     // COLUMN_COMMENT (index 8)

            // 컬럼 이름이 비어 있는 경우 건너뛰기 (validColumns 필터링에서 이미 처리됨)
            // if (!columnName) return;

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
                comments.push(`COMMENT ON COLUMN "${tableName}"."${columnName}" IS '${columnComment}';`);
            }

            // 마지막 유효한 컬럼이 아닌 경우에만 콤마 추가
            if (index < validColumns.length - 1) {
                sql += ',\n';
            }
        });

        sql += '\n);';

        // Oracle TABLE COMMENT 문 추가 (테이블 주석이 있는 경우에만)
        if (tableComment) {
            sql += `\n\nCOMMENT ON TABLE "${tableName}" IS '${tableComment}';`;
        }

        // Oracle COLUMN COMMENT 문 추가
        if (comments.length > 0) {
            sql += '\n\n' + comments.join('\n');
        }

        sqlContent.textContent = sql;
        sqlOutput.style.display = 'block';
    });

});