# Hearts(문구 공유 사이트 프론트 서버)

## ◾ Sample Image
![sample image](/example.PNG)

<br>


## ◾ Getting Start
### 0. default 설정
이 프로젝트는 `localhost`라는 이름으로 `nginx`를 이용해서 `/`는 localhost:3000으로, `/api/`는 localhost:8000번으로 연결하도록 설정이 되어있어 nginx의 `conf`파일에서 프록시 설정을 해주어야 한다. Heats프로젝트도 실행해주어야 정상적인 실행이 가능하다.

```
# 다른 설정 ...

server {
        listen       80;
        server_name localhost;

        location /api/ {
	proxy_pass  http://localhost:8000/;
        }

        location / {
            proxy_pass http://localhost:3000/;
        }
    }
```
### 1. clone
```sh
$ git clone https://github.com/gowoonsori/hearts-front
```

### 2. package install

```sh
$ npm install
```

### 3. run
```sh
$ npm run start
```
