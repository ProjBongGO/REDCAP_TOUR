# Oracle 테이블 생성 요청 시스템

## 개요

이 프로젝트는 Oracle 데이터베이스 테이블 생성을 위한 웹 기반 요청 시스템입니다. 사용자는 직관적인 UI를 통해 테이블 구조를 정의하고, 자동으로 생성된 SQL 문을 확인할 수 있습니다.

## 기능

- **테이블 정보 입력**: 스키마, 테이블명, 컬럼 정보 등을 입력
- **실시간 SQL 생성**: 입력한 정보를 기반으로 Oracle CREATE TABLE SQL 자동 생성
- **컬럼 주석 지원**: 테이블 및 컬럼에 대한 주석 추가
- **데이터 타입 선택**: 다양한 Oracle 데이터 타입 지원
- **NULL 제약 조건**: NOT NULL 여부 지정
- **기본값 설정**: 컬럼 기본값 지정

## 파일 구조

```
proj/mng_obj_4_oracle/
├── README.md           # 이 파일
├── index.html          # 메인 HTML 파일
├── styles.css          # 스타일 시트
├── get_table_info.js   # UI 및 Handsontable 관리
└── create_sql.js       # SQL 생성 전담 모듈
```

## 주요 파일 설명

### create_sql.js
SQL 생성 로직을 전담하는 모듈입니다.

**주요 기능:**
- `generateOracleSQL(data, requestNumber)`: Oracle CREATE TABLE SQL 생성
- 테이블 이름, 스키마, 주석 처리
- 컬럼 정의 및 제약 조건 적용
- COMMENT 문 자동 생성

**특징:**
- 모듈로 분리되어 재사용 가능
- Node.js 환경에서도 사용 가능
- 코드 가독성 및 유지보수성 향상

### get_table_info.js
UI 및 Handsontable 스프레드시트를 관리하는 파일입니다.

**주요 기능:**
- Handsontable 인스턴스 생성 및 설정
- 데이터 입력 UI 제공
- SQL 생성 버튼 이벤트 처리
- create_sql.js 모듈 호출

**특징:**
- SQL 생성 로직 완전히 제거
- UI 전담으로 역할 명확화
- 코드 간소화

### index.html
메인 HTML 파일로, 전체 페이지 구조를 정의합니다.

**주요 요소:**
- Handsontable 스프레드시트 컨테이너
- SQL 생성 버튼
- 생성된 SQL 출력 영역
- create_sql.js 스크립트 로드

### styles.css
페이지 스타일을 정의하는 CSS 파일입니다.

## 사용 방법

1. `index.html` 파일을 웹 브라우저에서 엽니다.
2. 테이블 정보를 입력합니다:
   - 스키마 선택 (RTIS, OBT, ERPAPP)
   - 테이블명 입력
   - 테이블 주석 입력 (선택)
   - 컬럼 정보 입력 (컬럼명, 데이터 타입, 길이, NULL 여부 등)
3. "칼럼정보추가" 버튼으로 추가 컬럼을 입력할 수 있습니다.
4. "SQL GENERATE" 버튼을 클릭하면 SQL이 생성됩니다.
5. 하단에 생성된 SQL을 확인할 수 있습니다.

## SQL 생성 예시

```sql
CREATE TABLE "RTIS"."SAMPLE_TABLE" (
    "ID" NUMBER(10) NOT NULL,
    "NAME" VARCHAR2(100) NULL DEFAULT 'UNKNOWN',
    "CREATED_DATE" DATE NULL DEFAULT SYSDATE
);

COMMENT ON TABLE "RTIS"."SAMPLE_TABLE" IS '샘플 테이블';
COMMENT ON COLUMN "RTIS"."SAMPLE_TABLE"."ID" IS '고유 식별자';
COMMENT ON COLUMN "RTIS"."SAMPLE_TABLE"."NAME" IS '이름';
COMMENT ON COLUMN "RTIS"."SAMPLE_TABLE"."CREATED_DATE" IS '생성일';
```

## 기술 스택

- **HTML5**: 구조 정의
- **CSS3**: 스타일링
- **JavaScript (ES6+)**: 로직 구현
- **Handsontable**: 스프레드시트 UI
- **Oracle SQL**: 데이터베이스 쿼리

## 라이선스

비상업용 라이선스 (Handsontable)

## 개발 환경

- 웹 브라우저 (Chrome, Firefox, Safari 등)
- Handsontable CDN 사용
- 별도의 서버 없이 정적 파일로 실행 가능