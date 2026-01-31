# 상세기능내역 4. 신주인수권증권시세 상세기능명세

## a) 상세기능정보
- **상세기능 번호**: 4
- **상세기능 유형**: 조회 (목록)
- **상세기능명(국문)**: 신주인수권증권시세
- **상세기능 설명**: KRX에 상장된 신주인수권증권시세 정보를 제공
- **Call Back URL**: https://apis.data.go.kr/1160100/service/GetStockSecuritiesInfoService/getPreemptiveRightSecuritiesPriceInfo
- **최대 메시지 사이즈**: 4000 byte
- **평균 응답 시간**: 500 ms
- **초당 최대 트랙잭션**: 30 tps

## b) 요청 메시지 명세
| 항목명(영문) | 항목명(국문) | 항목크기 | 항목구분 | 샘플데이터 | 항목설명 |
|-------------|-------------|----------|----------|------------|----------|
| serviceKey | 서비스키 | 400 | 1(필수) | - | 공공데이터포털에서 받은 인증키 |
| numOfRows | 한 페이지 결과 수 | 4 | 1(필수) | 1 | 한 페이지 결과 수 |
| pageNo | 페이지 번호 | 4 | 1(필수) | 1 | 페이지 번호 |
| resultType | 결과 형식 | 4 | 1(필수) | xml | 구분(xml, json) Default: xml |
| basDt | 기준일자 | 8 | 0(옵션) | 20220919 | 검색값과 기준일자가 일치하는 데이터를 검색 |
| beginBasDt | 기준일자 | 8 | 0(옵션) | 20220919 | 기준일자가 검색값보다 크거나 같은 데이터를 검색 |
| endBasDt | 기준일자 | 8 | 0(옵션) | 20220919 | 기준일자가 검색값보다 작은 데이터를 검색 |
| likeBasDt | 기준일자 | 8 | 0(옵션) | 20220919 | 기준일자값이 검색값을 포함하는 데이터를 검색 |
| likeSrtnCd | 단축코드 | 9 | 0(옵션) | 0003021C | 단축코드가 검색값을 포함하는 데이터를 검색 |
| isinCd | ISIN코드 | 12 | 0(옵션) | KRA0003021C1 | 검색값과 ISIN코드이 일치하는 데이터를 검색 |
| likeIsinCd | ISIN코드 | 12 | 0(옵션) | KRA0003021C2 | ISIN코드가 검색값을 포함하는 데이터를 검색 |
| itmsNm | 종목명 | 120 | 0(옵션) | 대유플러스 12WR | 검색값과 종목명이 일치하는 데이터를 검색 |
| likeItmsNm | 종목명 | 120 | 0(옵션) | 대유플러스 13WR | 종목명이 검색값을 포함하는 데이터를 검색 |
| mrktCtg | 시장구분 | 40 | 0(옵션) | KOSPI | 검색값과 시장구분이 일치하는 데이터를 검색 |
| beginVs | 대비 | 12 | 0(옵션) | 5 | 대비가 검색값보다 크거나 같은 데이터를 검색 |
| endVs | 대비 | 12 | 0(옵션) | 5 | 대비가 검색값보다 작은 데이터를 검색 |
| beginFltRt | 등락률 | 11 | 0(옵션) | 1.61 | 등락률이 검색값보다 크거나 같은 데이터를 검색 |
| endFltRt | 등락률 | 11 | 0(옵션) | 1.61 | 등락률이 검색값보다 작은 데이터를 검색 |
| beginTrqu | 거래량 | 12 | 0(옵션) | 148845 | 거래량이 검색값보다 크거나 같은 데이터를 검색 |
| endTrqu | 거래량 | 12 | 0(옵션) | 148845 | 거래량이 검색값보다 작은 데이터를 검색 |
| beginTrPrc | 거래대금 | 21 | 0(옵션) | 46881711 | 거래대금이 검색값보다 크거나 같은 데이터를 검색 |
| endTrPrc | 거래대금 | 21 | 0(옵션) | 46881711 | 거래대금이 검색값보다 작은 데이터를 검색 |
| beginMrktTotAmt | 시가총액 | 21 | 0(옵션) | 7499437470 | 시가총액이 검색값보다 크거나 같은 데이터를 검색 |
| endMrktTotAmt | 시가총액 | 21 | 0(옵션) | 7499437470 | 시가총액이 검색값보다 작은 데이터를 검색 |
| beginLstgScrtCnt | 상장증권수 | 15 | 0(옵션) | 23807738 | 상장증권수가 검색값보다 크거나 같은 데이터를 검색 |
| endLstgScrtCnt | 상장증권수 | 15 | 0(옵션) | 23807738 | 상장증권수가 검색값보다 작은 데이터를 검색 |
| likePurRgtScrtItmsCd | 목적주권_종목코드 | 12 | 0(옵션) | KR7000300004 | 목적주권_종목코드가 검색값을 포함하는 데이터를 검색 |
| purRgtScrtItmsNm | 목적주권_종목명 | 120 | 0(옵션) | 대유플러스 | 검색값과 목적주권_종목명이 일치하는 데이터를 검색 |
| likePurRgtScrtItmsNm | 목적주권_종목명 | 120 | 0(옵션) | 대유플러스 | 목적주권_종목명이 검색값을 포함하는 데이터를 검색 |

## c) 응답 메시지 명세
| 항목명(영문) | 항목명(국문) | 항목크기 | 항목구분 | 샘플데이터 | 항목설명 |
|-------------|-------------|----------|----------|------------|----------|
| resultCode | 결과코드 | 2 | 1(필수) | 00 | API 호출 결과의 상태 코드 |
| resultMsg | 결과메시지 | 50 | 1(필수) | NORMAL SERVICE. | API 호출 결과의 상태 |
| numOfRows | 한 페이지 결과 수 | 4 | 1(필수) | 1 | 한 페이지 결과 수 |
| pageNo | 페이지 번호 | 4 | 1(필수) | 1 | 페이지 번호 |
| totalCount | 전체 결과 수 | 10 | 1(필수) | 20449 | 전체 결과 수 |
| basDt | 기준일자 | 8 | 0(옵션) | 20220919 | 기준 일자 |
| srtnCd | 단축코드 | 9 | 0(옵션) | 0003021C | 종목 코드보다 짧으면서 유일성이 보장되는 코드(6자리) |
| isinCd | ISIN코드 | 12 | 0(옵션) | KRA0003021C1 | 국제 채권 식별 번호. 유가증권(채권)의 국제인증 고유번호 |
| itmsNm | 종목명 | 120 | 0(옵션) | 대유플러스 12WR | 유가증권 국제인증 고유번호 코드 이름 |
| mrktCtg | 시장구분 | 40 | 0(옵션) | KOSPI | 시장 구분 (KOSPI/KOSDAQ/KONEX 중 1) |
| clpr | 종가 | 12 | 0(옵션) | 315 | 정규시장의 매매시간종료시까지 형성되는 최종가격 |
| vs | 대비 | 12 | 0(옵션) | 5 | 전일 대비 등락 |
| fltRt | 등락률 | 11 | 0(옵션) | 1.61 | 전일 대비 등락에 따른 비율 |
| mkp | 시가 | 12 | 0(옵션) | 319 | 정규시장의 매매시간개시후 형성되는 최초가격 |
| hipr | 고가 | 12 | 0(옵션) | 320 | 하루 중 가격의 최고치 |
| lopr | 저가 | 12 | 0(옵션) | 308 | 하루 중 가격의 최저치 |
| trqu | 거래량 | 12 | 0(옵션) | 148845 | 체결수량의 누적 합계 |
| trPrc | 거래대금 | 21 | 0(옵션) | 46881711 | 거래건 별 체결가격 * 체결수량의 누적 합계 |
| mrktTotAmt | 시가총액 | 21 | 0(옵션) | 7499437470 | 종가 * 상장증권수 |
| lstgScrtCnt | 상장증권수 | 15 | 0(옵션) | 23807738 | 신주인수권증권의 상장증권수 |
| exertPric | 행사가격 | 17 | 0(옵션) | 882 | 권리를 행사할 때 적용되는 가격 |
| subtPdSttgDt | 존속기간_시작일 | 8 | 0(옵션) | 20220624 | 신주인수권증권의 존속기간 시작일 |
| subtPdEdDt | 존속기간_종료일 | 8 | 0(옵션) | 20250224 | 신주인수권증권의 존속기간 종료일 |
| purRgtScrtItmsCd | 목적주권_종목코드 | 12 | 0(옵션) | KR7000300004 | 신주인수권증서의 목적주권 종목코드 |
| purRgtScrtItmsNm | 목적주권_종목명 | 120 | 0(옵션) | 대유플러스 | 신주인수권증서의 목적주권 종목명 |
| purRgtScrtItmsClpr | 목적주권_종가 | 12 | 0(옵션) | 1005 | 신주인수권증서의 목적주권 종가 |

## d) 요청/응답 메시지 예제
### 요청메시지
```
https://apis.data.go.kr/1160100/service/GetStockSecuritiesInfoService/getPreemptiveRightSecuritiesPriceInfo?serviceKey=인증키&numOfRows=1&pageNo=1
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
        <totalCount>20449</totalCount>
        <items>
            <item>
                <basDt>20220919</basDt>
                <srtnCd>0003021C</srtnCd>
                <isinCd>KRA0003021C1</isinCd>
                <itmsNm>대유플러스 12WR</itmsNm>
                <mrktCtg>KOSPI</mrktCtg>
                <clpr>315</clpr>
                <vs>5</vs>
                <fltRt>1.61</fltRt>
                <mkp>319</mkp>
                <hipr>320</hipr>
                <lopr>308</lopr>
                <trqu>148845</trqu>
                <trPrc>46881711</trPrc>
                <mrktTotAmt>7499437470</mrktTotAmt>
                <lstgScrtCnt>23807738</lstgScrtCnt>
                <exertPric>882</exertPric>
                <subtPdSttgDt>20220624</subtPdSttgDt>
                <subtPdEdDt>20250224</subtPdEdDt>
                <purRgtScrtItmsCd>KR7000300004</purRgtScrtItmsCd>
                <purRgtScrtItmsNm>대유플러스</purRgtScrtItmsNm>
                <purRgtScrtItmsClpr>1005</purRgtScrtItmsClpr>
            </item>
        </items>
    </body>
</response>