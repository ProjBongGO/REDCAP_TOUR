# HTML 기본 문법 정리

## 1. HTML 문서 기본 구조

```html
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>문서 제목</title>
</head>
<body>
    <!-- 내용이 여기에 들어갑니다 -->
</body>
</html>
```

### 설명:
- `<!DOCTYPE html>`: HTML5 문서임을 선언
- `<html>`: HTML 문서의 최상위 요소
- `<head>`: 문서의 메타 정보 (제목, 인코딩, 스타일시트 등)
- `<body>`: 실제 화면에 표시될 내용

## 2. 주요 태그

### 2.1 제목 태그
```html
<h1>제목 1</h1>
<h2>제목 2</h2>
<h3>제목 3</h3>
<h4>제목 4</h4>
<h5>제목 5</h5>
<h6>제목 6</h6>
```

### 2.2 단락 및 텍스트
```html
<p>단락 태그입니다.</p>
<br>  <!-- 줄바꿈 -->
<hr>  <!-- 수평선 -->
<strong>굵은 텍스트</strong>
<em>기울임 텍스트</em>
<span>인라인 그룹</span>
```

### 2.3 링크 및 이미지
```html
<a href="https://example.com">링크 텍스트</a>
<img src="image.jpg" alt="이미지 설명">
```

## 3. 테이블 구조

### 3.1 기본 테이블
```html
<table>
    <thead>
        <tr>
            <th>헤더1</th>
            <th>헤더2</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>데이터1</td>
            <td>데이터2</td>
        </tr>
    </tbody>
</table>
```

### 3.2 테이블 태그 설명
- `<table>`: 테이블 전체를 감싸는 태그
- `<thead>`: 테이블 헤더 영역
- `<tbody>`: 테이블 본문 영역
- `<tfoot>`: 테이블 푸터 영역 (선택적)
- `<tr>`: 테이블 행 (가로 줄)
- `<th>`: 테이블 헤더 셀 (굵은 텍스트, 기본적으로 중앙 정렬)
- `<td>`: 테이블 데이터 셀

### 3.3 테이블 주의사항
1. `<td>`는 `<tr>` 안에만 위치할 수 있습니다.
2. `<tr>`는 `<thead>`, `<tbody>`, `<tfoot>` 안에 위치합니다.
3. `<th>`도 `<tr>` 안에 위치합니다.
4. 테이블 구조를 지키지 않으면 브라우저가 예상치 못한 방식으로 렌더링할 수 있습니다.

## 4. 폼 요소

### 4.1 입력 필드
```html
<input type="text" placeholder="텍스트 입력">
<input type="password" placeholder="비밀번호">
<input type="email" placeholder="이메일">
<input type="number" placeholder="숫자">
<input type="date" placeholder="날짜">
```

### 4.2 텍스트 영역
```html
<textarea placeholder="여러 줄 입력"></textarea>
```

### 4.3 선택 상자
```html
<select>
    <option value="1">옵션 1</option>
    <option value="2">옵션 2</option>
</select>
```

### 4.4 버튼
```html
<button type="submit">제출</button>
<button type="button">일반 버튼</button>
```

## 5. 리스트

### 5.1 순서 없는 리스트
```html
<ul>
    <li>항목 1</li>
    <li>항목 2</li>
</ul>
```

### 5.2 순서 있는 리스트
```html
<ol>
    <li>첫 번째</li>
    <li>두 번째</li>
</ol>
```

## 6. 그룹화 태그

### 6.1 블록 요소
```html
<div>블록 수준의 그룹</div>
```

### 6.2 인라인 요소
```html
<span>인라인 그룹</span>
```

## 7. 속성 (Attributes)

### 7.1 공통 속성
```html
<div id="unique-id" class="class-name" style="color: red;">내용</div>
```

### 7.2 폼 속성
```html
<input type="text" name="username" required>
<input type="text" placeholder="플레이스홀더">
<input type="text" value="기본값">
```

## 8. 주석
```html
<!-- 이 주석은 화면에 표시되지 않습니다 -->
```

## 9. 특수 문자
```html
&lt;  <!-- < -->
&gt;  <!-- > -->
&amp;  <!-- & -->
&quot;  <!-- " -->
&nbsp;  <!-- 공백 -->
```

## 10. HTML5 새로운 태그

### 10.1 시맨틱 태그
```html
<header>헤더</header>
<nav>네비게이션</nav>
<main>메인 콘텐츠</main>
<footer>푸터</footer>
<section>섹션</section>
<article>아티클</article>
<aside>사이드바</aside>
```

## 11. HTML 작성 시 주의사항

1. **태그는 반드시 닫혀야 합니다.**
   - `<p>내용</p>` (O)
   - `<p>내용` (X)

2. **태그는 중첩될 때 외부 태그가 먼저 닫혀야 합니다.**
   - `<p><strong>강조</strong></p>` (O)
   - `<p><strong>강조</p></strong>` (X)

3. **속성 값은 따옴표로 감싸야 합니다.**
   - `<input type="text" name="username">` (O)
   - `<input type=text name=username>` (X)

4. **HTML은 대소문자를 구분하지 않지만, 권장사항은 소문자를 사용합니다.**

5. **자바스크립트와 CSS는 별도 파일에 작성하는 것이 좋습니다.**

## 12. 참고 자료
- [MDN Web Docs - HTML](https://developer.mozilla.org/ko/docs/Web/HTML)
- [W3Schools - HTML Tutorial](https://www.w3schools.com/html/)
- [HTML Living Standard](https://html.spec.whatwg.org/)