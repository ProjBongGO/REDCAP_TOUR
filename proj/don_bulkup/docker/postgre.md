```console
docker run --name some-postgres -e POSTGRES_PASSWORD=mysecretpassword -d postgres
```

# PostgreSQL Docker 명령어 설명

## 기본 명령어
```console
docker run --name some-postgres -e POSTGRES_PASSWORD=mysecretpassword -d postgres
```

### 명령어 구성 요소
- `docker run`: Docker 컨테이너를 실행하는 기본 명령어
- `--name some-postgres`: 컨테이너 이름을 "some-postgres"로 지정
- `-e POSTGRES_PASSWORD=mysecretpassword`: 환경 변수로 데이터베이스 비밀번호 설정
- `-d postgres`: postgres 이미지를 사용하여 백그라운드에서 실행

### 실행 결과
PostgreSQL 데이터베이스가 백그라운드에서 실행되며, 접속할 때 "mysecretpassword"를 비밀번호로 사용합니다.
