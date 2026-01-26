// 칼럼정테이블 스크립트 - DOMContentLoaded 이벤트 사용으로 안정성 향상
document.addEventListener('DOMContentLoaded', function() {
    // DOM 요소 존재 여부 확인
    const tableGrid = document.getElementById('table-grid');
    const addColumnBtn = document.getElementById('add-column');

    if (!tableGrid || !addColumnBtn) {
        console.error('필수 DOM 요소를 찾을 수 없습니다.');
        return;
    }

    // 스프레드시트 인스턴스 생성 (로컬 변수로 선언하여 전역 오염 방지)
    const spreadsheet = jspreadsheet(tableGrid, {
        worksheets: [{
            minDimensions: [9, 1], // 삭제 컬럼 포함 9개
            columns: [
                {
                    type: 'dropdown',
                    title: 'SCHEMA',
                    width: '100px',
                    source: ['RTIS', 'OBT', 'ERPAPP']
                },
                { type: 'text', title: 'TABLE_NAME', width: '150px' },
                { type: 'text', title: 'COLUMN_NAME', width: '150px' },
                {
                    type: 'dropdown',
                    title: 'DATA_TYPE',
                    width: '120px',
                    source: ['VARCHAR2', 'NUMBER', 'DATE', 'CHAR', 'TIMESTAMP', 'CLOB', 'BLOB']
                },
                { type: 'text', title: 'DATA_LENGTH', width: '80px' },
                {
                    type: 'dropdown',
                    title: 'NULL',
                    width: '60px',
                    source: ['Y', 'N']
                },
                { type: 'text', title: 'DEFAULT', width: '100px' },
                { type: 'text', title: 'COMMENT', width: '200px' },
                {
                    type: 'text',
                    title: '삭제',
                    width: '80px',
                    readOnly: true, // 버튼이 있는 셀은 직접 수정 불가
                    render: function(cell, value, x, y, worksheet) {
                        cell.innerHTML = '<button type="button" class="delete-row-btn">삭제</button>';
                    }
                }
            ]
        }]
    });

    // 행 추가 버튼 이벤트 리스너
    addColumnBtn.addEventListener('click', function() {
        if (spreadsheet && spreadsheet[0]) {
            spreadsheet[0].insertRow();
        }
    });

    // 행 삭제 버튼 이벤트 리스너 (수정된 로직)
    tableGrid.addEventListener('click', function(event) {
        if (event.target.classList.contains('delete-row-btn')) {
            // 클릭된 버튼에서 가장 가까운 TD 요소를 찾습니다.
            const td = event.target.closest('td');
            if (!td) return;

            // Jspreadsheet v5의 행 인덱스는 부모 TR의 attribute에 저장되어 있습니다.
            const tr = td.parentElement;
            if (!tr) return;

            // 실제 데이터 상의 인덱스(y좌표)를 가져옵니다.
            const rowIndex = parseInt(tr.getAttribute('data-y'));

            if (!isNaN(rowIndex) && spreadsheet && spreadsheet[0]) {
                if (confirm((rowIndex + 1) + "번 행을 삭제하시겠습니까?")) {
                    spreadsheet[0].deleteRow(rowIndex, 1);
                }
            }

            event.preventDefault();
            event.stopPropagation();
        }
    });
});