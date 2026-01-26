Jspreadsheet v5 공식 문서를 기반으로 주요 기능(Features)과 관련된 명령어(Methods)를 카테고리별로 정리해 드립니다.

v5의 가장 큰 특징은 **Spreadsheet(전체 틀)**와 **Worksheet(개별 시트)**의 분리입니다. 대부분의 데이터 조작 명령어는 특정 **Worksheet 인스턴스**에서 실행됩니다.

> **기본 설정 예시 (명령어 사용 전제)**
> ```javascript
> // Jspreadsheet 생성 및 인스턴스 저장
> const spreadsheet = jspreadsheet(document.getElementById('spreadsheet'), {
>     worksheets: [{
>         data: [ ['A1', 'B1'], ['A2', 'B2'] ],
>         columns: [ { title: 'Name', width: 300 }, { title: 'Age', width: 100 } ]
>     }]
> });
>
> // 첫 번째 워크시트 인스턴스 가져오기 (이 객체로 명령어를 실행합니다)
> const ws = spreadsheet[0];
> ```

---

### 1. 데이터 관리 (Data Management)
데이터를 가져오거나 설정하는 가장 기본적인 명령어들입니다.

| 명령어 | 설명 | 예제 코드 |
| :--- | :--- | :--- |
| **`getData([bool])`** | 전체 데이터를 배열로 가져옵니다. (옵션: `true`면 하이라이트된 셀만) | `let data = ws.getData();`<br>`let selectedData = ws.getData(true);` |
| **`setData(json\|array)`** | 시트의 전체 데이터를 교체합니다. | `ws.setData([['New', 'Data']]);` |
| **`getValue(cell)`** | 특정 셀의 값을 가져옵니다. (셀 좌표 문자열) | `let val = ws.getValue('A1');` |
| **`setValue(cell, val, [force])`** | 특정 셀의 값을 변경합니다. (`force=true`는 읽기 전용 무시) | `ws.setValue('A1', 'Hello World');` |
| **`getRowData(rowNum)`** | 특정 행(Row)의 데이터를 배열로 가져옵니다. | `let row0 = ws.getRowData(0);` |
| **`setRowData(rowNum, array)`** | 특정 행의 데이터를 설정합니다. | `ws.setRowData(0, ['Tom', 30]);` |
| **`getColumnData(colNum)`** | 특정 열(Column)의 데이터를 배열로 가져옵니다. | `let col0 = ws.getColumnData(0);` |
| **`setColumnData(colNum, array)`** | 특정 열의 데이터를 설정합니다. | `ws.setColumnData(0, ['A', 'B', 'C']);` |

### 2. 행/열 구조 변경 (Rows & Columns Structure)
행이나 열을 추가, 삭제, 이동하거나 크기를 조절하는 기능입니다.

| 명령어 | 설명 | 예제 코드 |
| :--- | :--- | :--- |
| **`insertRow([mixed], [index], [insertBefore])`** | 새로운 행을 추가합니다. (개수 또는 데이터 배열, 위치 인덱스) | `ws.insertRow();` // 맨 끝에 1행 추가<br>`ws.insertRow(2, 0, true);` // 0번 인덱스 앞에 2행 추가 |
| **`deleteRow(rowNum, [count])`** | 행을 삭제합니다. | `ws.deleteRow(0);` // 첫 번째 행 삭제<br>`ws.deleteRow(0, 2);` // 첫 번째 행부터 2개 삭제 |
| **`insertColumn([mixed], [index], [insertBefore])`** | 새로운 열을 추가합니다. | `ws.insertColumn();`<br>`ws.insertColumn(['Title'], 0, true);` |
| **`deleteColumn(colNum, [count])`** | 열을 삭제합니다. | `ws.deleteColumn(0);` |
| **`moveRow(from, to)`** | 행의 위치를 이동시킵니다. | `ws.moveRow(0, 2);` // 0번 행을 2번 위치로 이동 |
| **`moveColumn(from, to)`** | 열의 위치를 이동시킵니다. | `ws.moveColumn(0, 2);` |
| **`setWidth(col, width)`** | 열 너비를 설정합니다. | `ws.setWidth(0, 200);` // 0번 열 너비 200px |
| **`setHeight(row, height)`** | 행 높이를 설정합니다. | `ws.setHeight(0, 50);` // 0번 행 높이 50px |
| **`showColumn(colNum)`** | 숨겨진 열을 보이게 합니다. | `ws.showColumn(2);` |
| **`hideColumn(colNum)`** | 특정 열을 숨깁니다. | `ws.hideColumn(2);` |

### 3. 스타일 및 서식 (Formatting & Style)
셀의 CSS 스타일이나 테두리를 제어합니다.

| 명령어 | 설명 | 예제 코드 |
| :--- | :--- | :--- |
| **`getStyle(cell)`** | 특정 셀(또는 전체)의 스타일 정보를 가져옵니다. | `let style = ws.getStyle('A1');` |
| **`setStyle(cell, property, value)`** | 셀에 CSS 스타일을 적용합니다. (JSON 형태 가능) | `ws.setStyle('A1', 'background-color', 'red');`<br>`ws.setStyle({ 'A1': { color: 'blue' } });` |
| **`resetStyle(cell)`** | 셀의 스타일을 초기화합니다. | `ws.resetStyle('A1');` |
| **`setBorder(x1, y1, x2, y2, type)`** | 지정된 범위에 테두리를 설정합니다. | `ws.setBorder(0, 0, 1, 1, 'thick');` |

### 4. 선택 및 하이라이트 (Selection & Selection)
사용자의 선택 영역을 제어하거나 정보를 가져옵니다.

| 명령어 | 설명 | 예제 코드 |
| :--- | :--- | :--- |
| **`selectAll()`** | 전체 셀을 선택합니다. | `ws.selectAll();` |
| **`resetSelection()`** | 선택 영역을 해제합니다. | `ws.resetSelection();` |
| **`updateSelectionFromCoords(x1,y1,x2,y2)`** | 좌표를 기준으로 선택 영역을 지정합니다. | `ws.updateSelectionFromCoords(0,0,2,2);` |
| **`getHighlighted()`** | 현재 선택된 영역의 좌표를 반환합니다. | `let coords = ws.getHighlighted();` |
| **`getSelectedRows([bool])`** | 선택된 행의 인덱스(또는 요소)를 가져옵니다. | `let rows = ws.getSelectedRows(true);` // 인덱스 배열 반환 |

### 5. 메타 데이터 및 주석 (Meta & Comments)
셀에 데이터 외의 정보(메타데이터)나 주석을 답니다.

| 명령어 | 설명 | 예제 코드 |
| :--- | :--- | :--- |
| **`getMeta(cell)`** | 셀의 메타 정보를 가져옵니다. | `let meta = ws.getMeta('A1');` |
| **`setMeta(cell, key, value)`** | 셀에 메타 정보를 저장합니다. (숨겨진 데이터 저장 용도) | `ws.setMeta('A1', 'id', '12345');` |
| **`getComments(cell)`** | 셀의 주석(코멘트)을 가져옵니다. | `let comment = ws.getComments('A1');` |
| **`setComments(cell, text)`** | 셀에 주석을 설정합니다. (마우스 오버 시 표시) | `ws.setComments('A1', 'This is a comment');` |

### 6. 병합 및 헤더 (Merges & Headers)
셀 병합 및 헤더 관련 기능입니다.

| 명령어 | 설명 | 예제 코드 |
| :--- | :--- | :--- |
| **`setMerge(cell, colspan, rowspan)`** | 셀을 병합합니다. | `ws.setMerge('A1', 2, 2);` // A1부터 2x2 병합 |
| **`getMerge(cell)`** | 병합된 정보를 가져옵니다. | `let mergeInfo = ws.getMerge('A1');` |
| **`removeMerge(cell)`** | 병합을 해제합니다. | `ws.removeMerge('A1');` |
| **`setHeader(colNum, title)`** | 헤더 텍스트를 변경합니다. | `ws.setHeader(0, 'New Title');` |
| **`getHeaders()`** | 모든 헤더 타이틀을 문자열로 가져옵니다. | `let headers = ws.getHeaders();` |

### 7. 유틸리티 및 기타 기능 (Utilities & Others)
정렬, 검색, 페이지네이션, 실행 취소 등 부가 기능입니다.

| 명령어 | 설명 | 예제 코드 |
| :--- | :--- | :--- |
| **`orderBy(colNum, [direction])`** | 특정 열을 기준으로 정렬합니다. (0: Asc, 1: Desc) | `ws.orderBy(0, 0);` // 0번 열 오름차순 정렬 |
| **`search(query)`** | 테이블 내 텍스트를 검색합니다. | `ws.search('keyword');` |
| **`resetSearch()`** | 검색 결과를 초기화하고 전체를 보여줍니다. | `ws.resetSearch();` |
| **`undo()`** | 마지막 작업을 실행 취소합니다. | `ws.undo();` |
| **`redo()`** | 실행 취소한 작업을 다시 실행합니다. | `ws.redo();` |
| **`download([includeHeaders])`** | 데이터를 CSV 파일로 다운로드합니다. | `ws.download();` |
| **`fullscreen(bool)`** | 전체 화면 모드를 켜거나 끕니다. | `ws.fullscreen(true);` |
| **`page(pageNumber)`** | (페이지네이션 활성 시) 특정 페이지로 이동합니다. | `ws.page(1);` |

### 8. 글로벌 헬퍼 (Global Helpers - `jspreadsheet` 객체)
특정 시트가 아니라 전체 라이브러리 차원에서 사용되는 명령어입니다.

| 명령어 | 설명 | 예제 코드 |
| :--- | :--- | :--- |
| **`jspreadsheet.destroy(el)`** | 해당 요소의 스프레드시트를 제거합니다. | `jspreadsheet.destroy(document.getElementById('spreadsheet'));` |
| **`jspreadsheet.helpers.parseCSV(str)`** | CSV 문자열을 배열로 변환합니다. | `let data = jspreadsheet.helpers.parseCSV("1,2\n3,4");` |
| **`jspreadsheet.helpers.getColumnName(i)`** | 숫자 인덱스를 엑셀 컬럼명(A, B..)으로 변환합니다. | `jspreadsheet.helpers.getColumnName(0);` // "A" |