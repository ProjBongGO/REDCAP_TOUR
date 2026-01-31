# 상세기능내역 2. 신주인수권증서시세 상세기능명세

## a) 상세기능정보
- **상세기능 번호**: 2
- **상세기능 유형**: 조회 (목록)
- **상세기능명(국문)**: 신주인수권증서시세
- **상세기능 설명**: KRX에 상장된 신주인수권증서시세 정보를 제공
- **Call Back URL**: https://apis.data.go.kr/1160100/service/GetStockSecuritiesInfoService/getPreemptiveRightCertificatePriceInfo
- **최대 메시지 사이즈**: 4000 byte
- **평균 응답 시간**: 500 ms
- **초당 최대 트랙잭션**: 30 tps

## b) 요청 메시지 명세
| 항목명(영문) | 항목명(국문) | 항목크기 | 항목구분 | 샘플데이터 | 항목설명 |
|-------------|-------------|----------|----------|------------|----------|
| serviceKey | 서비스키 | 400 | 1(필수) | - | 공공데이터포털에서 받은 인증키 |
| numOfRows | 한 페이지 결과 수 | 4 | 1(필수) | 1 | 한 페이지 결과 수 |
| pageNo | 페이지 번호 | 4 | 1(필수) | 1 | 페이지 번호 |
| resultType | 결과형식 | 4 | 1(필수) | xml | 구분(xml, json) Default: xml |
| basDt | 기준일자 | 8 | 0(옵션) | 20220906 | 검색값과 기준일자가 일치하는 데이터를 검색 |
| beginBasDt | 기준일자 | 8 | 0(옵션) | 20220906 | 기준일자가 검색값보다 크거나 같은 데이터를 검색 |
| endBasDt | 기준일자 | 8 | 0(옵션) | 20220906 | 기준일자가 검색값보다 작은 데이터를 검색 |
| likeBasDt | 기준일자 | 8 | 0(옵션) | 20220906 | 기준일자값이 검색값을 포함하는 데이터를 검색 |
| likeSrtnCd | 단축코드 | 9 | 0(옵션) | 2986901C | 단축코드가 검색값을 포함하는 데이터를 검색 |
| isinCd | ISIN코드 | 12 | 0(옵션) | KRA2986901C1 | 검색값과 ISIN코드이 일치하는 데이터를 검색 |
| likeIsinCd | ISIN코드 | 12 | 0(옵션) | KRA2986901C2 | ISIN코드가 검색값을 포함하는 데이터를 검색 |
| itmsNm | 종목명 | 120 | 0(옵션) | 에어부산 7R | 검색값과 종목명이 일치하는 데이터를 검색 |
| likeItmsNm | 종목명 | 120 | 0(옵션) | 에어부산 8R | 종목명이 검색값을 포함하는 데이터를 검색 |
| mrktCtg | 시장구분 | 40 | 0(옵션) | KOSPI | 검색값과 시장구분이 일치하는 데이터를 검색 |
| beginVs | 대비 | 12 | 0(옵션) | 24 | 대비가 검색값보다 크거나 같은 데이터를 검색 |
| endVs | 대비 | 12 | 0(옵션) | 24 | 대비가 검색값보다 작은 데이터를 검색 |
| beginFltRt | 등락률 | 11 | 0(옵션) | 11.65 | 등락률이 검색값보다 크거나 같은 데이터를 검색 |
| endFltRt | 등락률 | 11 | 0(옵션) | 11.65 | 등락률이 검색값보다 작은 데이터를 검색 |
| beginTrqu | 거래량 | 12 | 0(옵션) | 2645748 | 거래량이 검색값보다 크거나 같은 데이터를 검색 |
| endTrqu | 거래량 | 12 | 0(옵션) | 2645748 | 거래량이 검색값보다 작은 데이터를 검색 |
| beginTrPrc | 거래대금 | 21 | 0(옵션) | 573046752 | 거래대금이 검색값보다 크거나 같은 데이터를 검색 |
| endTrPrc | 거래대금 | 21 | 0(옵션) | 573046752 | 거래대금이 검색값보다 작은 데이터를 검색 |
| beginMrktTotAmt | 시가총액 | 21 | 0(옵션) | 11355102760 | 시가총액이 검색값보다 크거나 같은 데이터를 검색 |
| endMrktTotAmt | 시가총액 | 21 | 0(옵션) | 11355102760 | 시가총액이 검색값보다 작은 데이터를 검색 |
| likePurRgtScrtItmsCd | 목적주권_종목코드 | 12 | 0(옵션) | KR7298690009 | 목적주권_종목코드가 검색값을 포함하는 데이터를 검색 |
| purRgtScrtItmsNm | 목적주권_종목명 | 120 | 0(옵션) | 에어부산 | 검색값과 목적주권_종목명이 일치하는 데이터를 검색 |
| likePurRgtScrtItmsNm | 목적주권_종목명 | 120 | 0(옵션) | 에어부산 | 목적주권_종목명이 검색값을 포함하는 데이터를 검색 |

## c) 응답 메시지 명세
| 항목명(영문) | 항목명(국문) | 항목크기 | 항목구분 | 샘플데이터 | 항목설명 |
|-------------|-------------|----------|----------|------------|----------|
| resultCode | 결과코드 | 2 | 1(필수) | 00 | API 호출 결과의 상태 코드 |
| resultMsg | 결과메시지 | 50 | 1(필수) | NORMAL SERVICE. | API 호출 결과의 상태 |
| numOfRows | 한 페이지 결과 수 | 4 | 1(필수) | 1 | 한 페이지 결과 수 |
| pageNo | 페이지 번호 | 4 | 1(필수) | 1 | 페이지 번호 |
| totalCount | 전체 결과 수 | 10 | 1(필수) | 886 | 전체 결과 수 |
| basDt | 기준일자 | 8 | 0(옵션) | 20220906 | 기준일자 |
| srtnCd | 단축코드 | 9 | 0(옵션) | 2986901C | 종목 코드보다 짧으면서 유일성이 보장되는 코드(6자리) |
| isinCd | ISIN코드 | 12 | 0(옵션) | KRA2986901C1 | 국제 채권 식별 번호. 유가증권(채권)의 국제인증 고유번호 |
| itmsNm | 종목명 | 120 | 0(옵션) | 에어부산 7R | 유가증권 국제인증 고유번호 코드 이름 |
| mrktCtg | 시장구분 | 40 | 0(옵션) | KOSPI | 시장 구분 (KOSPI/KOSDAQ/KONEX 중 1) |
| clpr | 종가 | 12 | 0(옵션) | 230 | 정규시장의 매매시간종료시까지 형성되는 최종가격 |
| vs | 대비 | 12 | 0(옵션) | 24 | 전일 대비 등락 |
| fltRt | 등락률 | 11 | 0(옵션) | 11.65 | 전일 대비 등락에 따른 비율 |
| mkp | 시가 | 12 | 0(옵션) | 207 | 정규시장의 매매시간개시후 형성되는 최초가격 |
| hipr | 고가 | 12 | 0(옵션) | 243 | 하루 중 가격의 최고치 |
| lopr | 저가 | 12 | 0(옵션) | 200 | 하루 중 가격의 최저치 |
| trqu | 거래량 | 12 | 0(옵션) | 2645748 | 체결수량의 누적 합계 |
| trPrc | 거래대금 | 21 | 0(옵션) | 573046752 | 거래건 별 체결가격 * 체결수량의 누적 합계 |
| mrktTotAmt | 시가총액 | 21 | 0(옵션) | 11355102760 | 종가 * 상장증서수 |
| lstgCtfCnt | 상장증서수 | 15 | 0(옵션) | 49370012 | 신주인수권증서의 상장증서수 |
| nstIssPrc | 신주발행가 | 12 | 0(옵션) | 2865 | 신주인수권증서의 신주발행가 |
| dltDt | 상장폐지일 | 8 | 0(옵션) | 20220907 | 신주인수권증서의 상장폐지일 |
| purRgtScrtItmsCd | 목적주권_종목코드 | 12 | 0(옵션) | KR7298690009 | 신주인수권증서의 목적주권 종목코드 |
| purRgtScrtItmsNm | 목적주권_종목명 | 120 | 0(옵션) | 에어부산 | 신주인수권증서의 목적주권 종목명 |
| purRgtScrtItmsClpr | 목적주권_종가 | 12 | 0(옵션) | 3130 | 신주인수권증서의 목적주권 종가 |

## d) 요청/응답 메시지 예제
### 요청메시지
```
https://apis.data.go.kr/1160100/service/GetStockSecuritiesInfoService/getPreemptiveRightCertificatePriceInfo?serviceKey=인증키&numOfRows=1&pageNo=1
```

### 응답메시지
```xml
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<response>
    <header>
        <resultCode>00</resultCode>
        <resultMsg>NORMAL SERVICE.</resultMsg>
    </header>
    <body>
        <numOfRows>1</numOfRows>
        <pageNo>1</pageNo>
        <totalCount>886</totalCount>
        <items>
            <item>
                <basDt>20220906</basDt>
                <srtnCd>2986901C</srtnCd>
                <isinCd>KRA2986901C1</isinCd>
                <itmsNm>에어부산 7R</itmsNm>
                <mrktCtg>KOSPI</mrktCtg>
                <clpr>230</clpr>
                <vs>24</vs>
                <fltRt>11.65</fltRt>
                <mkp>207</mkp>
                <hipr>243</hipr>
                <lopr>200</lopr>
                <trqu>2645748</trqu>
                <trPrc>573046752</trPrc>
                <mrktTotAmt>11355102760</mrktTotAmt>
                <lstgCtfCnt>49370012</lstgCtfCnt>
                <nstIssPrc>2865</nstIssPrc>
                <dltDt>20220907</dltDt>
                <purRgtScrtItmsCd>KR7298690009</purRgtScrtItmsCd>
                <purRgtScrtItmsNm>에어부산</purRgtScrtItmsNm>
                <purRgtScrtItmsClpr>3130</purRgtScrtItmsClpr>
            </item>
        </items>
    </body>
</response>