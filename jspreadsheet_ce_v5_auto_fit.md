Jspreadsheet v5에는 "자동 너비 맞춤(Auto-fit)"을 수행하는 단일 명령어(예: `autoFit()`)가 기본적으로 내장되어 있지 않습니다. 하지만 **캔버스(Canvas)의 텍스트 측정 기능**을 활용하여 **해당 열의 데이터 중 가장 긴 텍스트의 너비를 계산하고, `setWidth()` 명령어를 사용**하는 방식으로 구현할 수 있습니다.

아래에 바로 사용할 수 있는 커스텀 함수와 예제 코드를 정리해 드립니다.

### 💡 해결 로직
1.  **`getColumnData(colIndex)`**로 해당 열의 모든 데이터를 가져옵니다.
2.  데이터와 헤더(Title) 중 **가장 긴 문자열**을 찾습니다.
3.  브라우저의 캔버스 기능을 이용해 해당 문자열의 **픽셀 너비**를 계산합니다.
4.  **`setWidth(colIndex, width)`**로 너비를 적용합니다. (이때 셀 패딩 값을 고려해 여유 공간을 더합니다.)

---

### 🚀 구현 코드 (JavaScript)

이 코드를 프로젝트에 복사하여 사용하세요.

```javascript
// 1. 텍스트 너비 측정 헬퍼 함수
function getTextWidth(text, font) {
    // 캔버스 요소를 메모리 상에 생성하여 텍스트 너비 측정
    const canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement("canvas"));
    const context = canvas.getContext("2d");
    context.font = font;
    const metrics = context.measureText(text);
    return metrics.width;
}

// 2. 특정 열을 자동 조절하는 함수
function autoFitColumn(worksheet, colIndex) {
    // A. 해당 열의 데이터 가져오기
    let data = worksheet.getColumnData(colIndex);

    // B. 해당 열의 헤더(Title) 텍스트 가져오기 (헤더가 데이터보다 길 경우 대비)
    let headers = worksheet.getHeaders();
    // getHeaders()가 콤마로 구분된 문자열을 반환하는 경우와 배열을 반환하는 경우 처리
    let headerText = '';
    if (typeof headers === 'string') {
        headerText = headers.split(',')[colIndex];
    } else {
        // 객체나 배열 형태일 경우 타이틀 추출 로직 (버전에 따라 상이할 수 있음)
        // v5의 경우 보통 타이틀 문자열을 가져옴
         headerText = worksheet.headers ? worksheet.headers[colIndex].title : '';
    }

    // 비교 대상 배열 생성 (데이터 + 헤더)
    let allValues = [...data, headerText];

    // C. Jspreadsheet 기본 폰트 설정 (CSS와 일치시켜야 정확함)
    const font = "14px sans-serif"; // Jspreadsheet 기본 폰트
    const padding = 30; // 셀 좌우 패딩 및 여유 공간 (px)

    // D. 최대 너비 계산
    let maxWidth = 0;
    allValues.forEach(value => {
        if (value !== null && value !== undefined) {
            let w = getTextWidth(value.toString(), font);
            if (w > maxWidth) {
                maxWidth = w;
            }
        }
    });

    // E. 너비 적용 (최소 50px은 유지)
    let finalWidth = Math.max(maxWidth + padding, 50);
    worksheet.setWidth(colIndex, finalWidth);

    console.log(`Column ${colIndex} resized to ${finalWidth}px`);
}
```

### 💻 사용 예제

위의 함수를 선언해 둔 상태에서, 데이터를 로드한 후 버튼을 클릭하거나 특정 시점에 호출하면 됩니다.

```javascript
// Jspreadsheet 초기화
const spreadsheet = jspreadsheet(document.getElementById('spreadsheet'), {
    worksheets: [{
        data: [
            ['Short', 'This is a very long text example'],
            ['A', 'B'],
            ['Hello', 'World']
        ],
        columns: [
            { title: 'Column A', width: 100 },
            { title: 'Column B', width: 100 }
        ]
    }]
});

const ws = spreadsheet[0]; // 첫 번째 워크시트 인스턴스

// --- 사용 예시 ---

// 1. 특정 열(예: 1번 인덱스, Column B) 자동 맞춤 실행
autoFitColumn(ws, 1);

// 2. 모든 열을 한 번에 자동 맞춤하고 싶을 때
function autoFitAllColumns(worksheet) {
    // 데이터의 열 개수만큼 반복
    let colCount = worksheet.options.columns.length || worksheet.getData()[0].length;
    for (let i = 0; i < colCreount; i++) {
        autoFitColumn(worksheet, i);
    }
}

// 버튼 클릭 시 모든 열 맞춤 실행
document.getElementById('myButton').onclick = function() {
    autoFitAllColumns(ws);
};
```

### ⚠️ 주의사항 및 팁
1.  **폰트 매칭:** `getTextWidth` 함수 내부의 `font` 변수(`"14px sans-serif"`)는 실제 CSS에 적용된 폰트와 같아야 정확하게 계산됩니다. 만약 CSS를 커스터마이징 했다면 이 부분도 맞춰주세요.
2.  **데이터 양:** 데이터가 수천 건 이상일 때 `measureText`를 모든 셀에 대해 수행하면 약간의 성능 저하가 있을 수 있습니다. 데이터가 매우 많다면, 글자 수(length)가 긴 상위 100개만 추려서 계산하는 방식으로 최적화할 수 있습니다.
3.  **이벤트:** 사용자가 데이터를 입력할 때마다 바뀌게 하려면 `onchange` 이벤트 내부에서 `autoFitColumn`을 호출하면 됩니다. (단, 너무 자주 바뀌면 사용자 경험에 좋지 않을 수 있습니다.)