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
            'TABLE_COMMENT', // index 2
            'PK순번',        // index 3 - 새로 추가
            'COLUMN_NAME',   // index 4
            'COLUMN_COMMENT',// index 5
            'DATA_TYPE',     // index 6
            'DATA_LENGTH',   // index 7
            'NULL',          // index 8
            'DEFAULT'        // index 9
        ],
        columns: [
            { // SCHEMA (index 0)
                type: 'autocomplete',
                source: ['RTIS', 'OBT', 'ERPAPP'],
                strict: true,
                allowInvalid: false,
                validator: function(value, callback) {
                    // 스키마 유효성 검증
                    const validSchemas = ['RTIS', 'OBT', 'ERPAPP'];
                    const isValid = !value || validSchemas.includes(value.toUpperCase());
                    callback(isValid);
                }
            },
            { // TABLE_NAME (index 1)
                type: 'text',
                validator: function(value, callback) {
                    // 테이블 이름 유효성 검증
                    if (!value || value.trim() === '') {
                        callback(false);
                        return;
                    }
                    const isValid = /^[A-Za-z0-9_]{1,30}$/.test(value);
                    callback(isValid);
                }
            },
            { // TABLE_COMMENT (index 2)
                type: 'text',
                validator: function(value, callback) {
                    // 테이블 주석 유효성 검증
                    const isValid = !value || value.length <= 4000;
                    callback(isValid);
                }
            },
            { // PK순번 (index 3)
                type: 'numeric',
                validator: function(value, callback) {
                    if (value === null || value === '') {
                        callback(true);
                        return;
                    }

                    // 숫자 여부 확인
                    if (isNaN(value) || value <= 0 || value > 32) {
                        callback(false);
                        return;
                    }

                    // 중복 확인
                    const hotInstance = this.instance;
                    const data = hotInstance.getDataAtCol(3); // PK순번 열(index 3)
                    const currentRow = this.row;

                    const isDuplicate = data.some((val, index) => {
                        return index !== currentRow && val !== null && val !== '' && String(val) === String(value);
                    });

                    callback(!isDuplicate);
                }
            },
            { // COLUMN_NAME (index 4)
                type: 'text',
                validator: function(value, callback) {
                    // 컬럼 이름 유효성 검증
                    if (!value || value.trim() === '') {
                        callback(false);
                        return;
                    }
                    const isValid = /^[A-Za-z][A-Za-z0-9_]{0,29}$/.test(value);
                    callback(isValid);
                }
            },
            { // COLUMN_COMMENT (index 5)
                type: 'text',
                validator: function(value, callback) {
                    // 컬럼 주석 유효성 검증
                    const isValid = !value || value.length <= 4000;
                    callback(isValid);
                }
            },
            { // DATA_TYPE (index 6)
                type: 'autocomplete',
                source: ['VARCHAR2', 'NUMBER', 'DATE', 'CHAR', 'TIMESTAMP', 'CLOB', 'BLOB'],
                strict: true,
                allowInvalid: false,
                validator: function(value, callback) {
                    // 데이터 타입 유효성 검증
                    const validTypes = ['VARCHAR2', 'NUMBER', 'DATE', 'CHAR', 'TIMESTAMP', 'CLOB', 'BLOB'];
                    const isValid = value && validTypes.includes(value.toUpperCase());
                    callback(isValid);
                }
            },
            { // DATA_LENGTH (index 7)
                type: 'text',
                validator: function(value, callback) {
                    // 데이터 길이 유효성 검증
                    if (!value || value.trim() === '') {
                        callback(true);
                        return;
                    }

                    const num = parseInt(value);
                    if (isNaN(num) || num <= 0) {
                        callback(false);
                        return;
                    }

                    // 현재 행의 데이터 타입 확인
                    const hotInstance = this.instance;
                    const dataType = hotInstance.getDataAtCell(this.row, 6); // DATA_TYPE 열(index 6)

                    // 데이터 타입에 따른 길이 제한
                    if (dataType) {
                        const dataTypeUpper = dataType.toUpperCase();
                        switch (dataTypeUpper) {
                            case 'VARCHAR2':
                                callback(num <= 4000);
                                return;
                            case 'CHAR':
                                callback(num <= 2000);
                                return;
                            case 'NUMBER':
                                callback(num <= 38);
                                return;
                            default:
                                callback(true); // DATE, TIMESTAMP 등은 길이 무시
                                return;
                        }
                    }

                    callback(true);
                }
            },
            { // NULL (index 8)
                type: 'autocomplete',
                source: ['Y', 'N'],
                strict: true,
                allowInvalid: false,
                validator: function(value, callback) {
                    // NULL 허용 여부 유효성 검증
                    const isValid = value && ['Y', 'N'].includes(value.toUpperCase());
                    callback(isValid);
                }
            },
            { // DEFAULT (index 9)
                type: 'text',
                validator: function(value, callback) {
                    // 기본값 유효성 검증
                    if (!value || value.trim() === '') {
                        callback(true);
                        return;
                    }

                    // 현재 행의 데이터 타입 확인
                    const hotInstance = this.instance;
                    const dataType = hotInstance.getDataAtCell(this.row, 6); // DATA_TYPE 열(index 6)

                    if (dataType) {
                        const dataTypeUpper = dataType.toUpperCase();
                        if (dataTypeUpper === 'NUMBER') {
                            // NUMBER 타입은 숫자만 허용
                            const isValid = /^-?\d+(\.\d+)?$/.test(value.trim()) || value.trim().toUpperCase() === 'NULL';
                            callback(isValid);
                            return;
                        } else if (dataTypeUpper === 'DATE') {
                            // DATE 타입은 따옴표로 감싸거나 TO_DATE 함수만 허용
                            const isValid = /^'.*'$/.test(value) || /TO_DATE\(/i.test(value);
                            callback(isValid);
                            return;
                        }
                    }

                    // 문자열 타입은 따옴표로 감싸면 유효
                    const isValid = /^'.*'$/.test(value);
                    callback(isValid);
                }
            }
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

        // 모든 행이 비어 있는지 확인
        const isAllRowsEmpty = data.every(row => row.every(cell => cell === '' || cell === null));
        if (isAllRowsEmpty) {
            alert('테이블 정보가 비어 있습니다. 최소한 하나의 컬럼을 정의해주세요.');
            sqlOutput.style.display = 'none';
            return;
        }

        // 최소한 하나의 COLUMN_NAME이 있는지 확인 (index 4)
        const hasColumnName = data.some(row => row[4] && row[4].trim() !== '');
        if (!hasColumnName) {
            alert('컬럼명이 비어있는 행이 있습니다. 최소한 하나의 유효한 컬럼명을 입력해주세요.');
            sqlOutput.style.display = 'none';
            return;
        }

        try {
            // create_sql.js의 generateOracleSQL 함수를 사용하여 SQL 생성
            const sql = generateOracleSQL(data, requestNumber);

            // SQL 출력 영역 초기화 및 새로 고침
            sqlContent.textContent = ''; // 기존 SQL 내용 완전히 초기화
            sqlContent.textContent = sql; // 새로운 SQL로 교체
            sqlOutput.style.display = 'block'; // 출력 영역 표시 (수정됨)
        } catch (error) {
            console.error('SQL 생성 중 오류 발생:', error);
            alert('SQL 생성 중 오류가 발생했습니다. 콘솔을 확인해주세요.');
        }
    });
});