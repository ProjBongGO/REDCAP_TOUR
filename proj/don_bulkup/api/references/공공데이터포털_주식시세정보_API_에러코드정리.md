# OpenAPI 에러 코드정리

| 에러코드 | 에러메시지 | 설명 |
|---------|-----------|------|
| 1 | APPLICATION_ERROR | 어플리케이션 에러 |
| 10 | INVALID_REQUEST_PARAMETER_ERROR | 잘못된 요청 파라메터 에러 |
| 12 | NO_OPENAPI_SERVICE_ERROR | 해당 오픈API서비스가 없거나 폐기됨 |
| 20 | SERVICE_ACCESS_DENIED_ERROR | 서비스 접근거부 |
| 22 | LIMITED_NUMBER_OF_SERVICE_REQUESTS_EXCEEDS_ERROR | 서비스 요청제한횟수 초과 에러 |
| 30 | SERVICE_KEY_IS_NOT_REGISTERED_ERROR | 등록되지 않은 서비스키 |
| 31 | DEADLINE_HAS_EXPIRED_ERROR | 기한 만료된 서비스키 |
| 32 | UNREGISTERED_IP_ERROR | 등록되지 않은 IP |
| 99 | UNKNOWN_ERROR | 기타 에러 |