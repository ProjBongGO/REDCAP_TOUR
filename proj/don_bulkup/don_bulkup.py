import pandas as pd
from pykiwoom.kiwoom import *
import time

# --- Kiwoom API 연결 ---
kiwoom = Kiwoom()
kiwoom.comm_connect()
print("API 연결 완료.")

def get_all_stock_codes():
    """코스피와 코스닥의 모든 종목 코드를 리스트로 반환"""
    kospi = kiwoom.get_codelist_by_market('0')
    kosdaq = kiwoom.get_codelist_by_market('10')
    return kospi + kosdaq

def analyze_stock(code):
    """개별 종목을 분석하여 조건에 맞으면 상세 데이터를 반환"""

    # 1. 1시간봉 데이터 요청 (최근 100개 봉)
    df = kiwoom.block_request("opt10080",
                              종목코드=code,
                              틱범위=60,  # 60분봉
                              수정주가구분=1,
                              output="주식분봉차트조회",
                              next=0)

    if df is None or len(df) < 2:
        return None

    # 데이터 타입 변환
    df['고가'] = pd.to_numeric(df['고가'])
    df['저가'] = pd.to_numeric(df['저가'])
    df['현재가'] = pd.to_numeric(df['현재가'])
    df['거래량'] = pd.to_numeric(df['거래량'])

    # 2. 필요한 데이터 추출
    current_price = df.iloc[0]['현재가']
    prev_candle = df.iloc[1]  # 1봉 전 캔들
    prev_high = prev_candle['고가']
    prev_low = prev_candle['저가']

    # 3. 1차 조건 필터링: 횡보 조건 확인
    if not (prev_low < current_price < prev_high):
        return None

    # 4. 데이터 가공 및 분석 (조건을 통과한 종목만)
    stock_name = kiwoom.get_master_code_name(code)
    channel_height = prev_high - prev_low
    current_position_ratio = ((current_price - prev_low) / channel_height) * 100 if channel_height > 0 else 0

    # ⭐⭐⭐ 사용자만의 상승 확률 계산식 (여기에 로직을 추가) ⭐⭐⭐
    # 예시: 거래량이 이전 5개 봉 평균보다 2배 이상이고, 현재 위치가 채널의 50% 이상일 때 높은 점수 부여
    avg_volume = df.iloc[2:7]['거래량'].mean()
    current_volume = df.iloc[0]['거래량']

    probability_score = 0
    if current_volume > avg_volume * 2:
        probability_score += 50
    if current_position_ratio > 50:
        probability_score += 50

    # 5. 결과 데이터 정리
    result = {
        '종목명': stock_name,
        '종목코드': code,
        '현재가': current_price,
        '1봉전_고가': prev_high,
        '1봉전_저가': prev_low,
        '채널내_위치(%)': f"{current_position_ratio:.2f}",
        '상승확률(예시)': probability_score
    }
    return result

# --- 메인 실행 루프 ---
if __name__ == "__main__":
    all_codes = get_all_stock_codes()
    print(f"전체 분석 대상 종목 수: {len(all_codes)}")

    while True:
        try:
            results_list = []
            print("\n" + "="*50)
            print(f"[{time.strftime('%Y-%m-%d %H:%M:%S')}] 실시간 종목 분석 시작...")

            # 모든 종목을 순회하며 분석
            for i, code in enumerate(all_codes):
                # API 과부하를 막기 위한 딜레이
                time.sleep(0.25)

                # 진행 상황 표시
                print(f"분석 중... ({i+1}/{len(all_codes)}) - {kiwoom.get_master_code_name(code)}", end='\r')

                analysis_result = analyze_stock(code)
                if analysis_result:
                    results_list.append(analysis_result)

            # 최종 결과를 테이블 형태로 출력
            if results_list:
                result_df = pd.DataFrame(results_list)
                print("\n\n--- 실시간 횡보 종목 리스트 ---")
                print(result_df.to_string())
                print("--------------------------------")
            else:
                print("\n조건에 부합하는 종목이 없습니다.")

            print(f"다음 분석까지 60초 대기...")
            time.sleep(60)

        except Exception as e:
            print(f"오류 발생: {e}")
            time.sleep(10)