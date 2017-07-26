# Express
http 모듈만 사용하여 웹 서버를 구성할 때는 많은 소스와 시간이 필요
express 모듈을 사용하면 간단한 코드로 웹 서버의 기능을 구현 할 수 있음

## express 서버 만들기

```javascript
var express = require('express');
var http = require('http');
//익스프레스 객체 생성
var app = express();
//기본 포트를 app 객체에 속성으로 설정
app.set('port',process.env.PORT || 3000);

//express 서버 시작
http.createServer(app).listen(app.get('port'),function(){
    console.log('익스프레스 서버를 시작했습니다 : ' + app.get('port'));
});
```
### 익스프레스 서버 객체의 메소드
<li> set(name,value) : 서버 설정을 위한 속성을 지정함. get()메소드를 활용하여
메소드를 사용하여 꺼냄
<li> get(name) : 서버 설정을 위해 지정한 속성을 꺼냄
<li>use([path,]function[,function..]) : 미들웨어 함수를 사용함
<li>get([path,]function) : 특정 패스로 요청된 정보를 처리

## set 메소드의 환경 설정을 하는 데 필요한 메소드

<li> env : 서버 모드를 설정
<li> views : 뷰들이 들어 있는 폴더 또는 폴더 배열을 설정합니다
<li> view engine : 디폴트로 사용할 뷰 엔진을 설정함

## 미들웨어로 클라이언트에 응답 보내기
use()메소드를 활용하
```javascript
var express = require('express');
var http = require('http');
//익스프레스 객체 생성
var app = express();
//기본 포트를 app 객체에 속성으로 설정
app.set('port',process.env.PORT || 3000);
app.use(function (req,res,next) {
   console.log('첫 번째 미들웨어에서 요청을 처리함');
   res.writeHead('200',{'Content-Type':'text/html;charset=utf8'});
   res.end('<h1>Express 서버에서 응답한 결과</h1>');
});
//express 서버 시작
http.createServer(app).listen(app.get('port'),function(){
    console.log('익스프레스 서버를 시작했습니다 : ' + app.get('port'));
});
```

## 익스프레스의 요청 객체와 응답 객체
<li>send([body]) : 클라이언트에 응답 데이터를 보냅니다 전달할 수 있는 데이터는 HTML 문자열
Buffer 객체, JSON 객체, JSON 배열
<li>status(code) : HTTP 상태 코드를 반환합니다 상태 코드는 end()나 send() 같은 전송 메소드를 추가로 호출해야 전송가능
<li>sendStatus(status) : HTTP 상태 코드를 반환합니다. 상태 코드는 상태 메세지와 함께 전송됨
<li>redirect([status,]path) : 웹 페이지 경로를 강제로 이동시킴
<li>render(view,[,local][,callback]) : 뷰 엔진을 사용해 문서를 만든 후 전송
<li>send 사용

```javascript
var express = require('express');
var http = require('http');
//익스프레스 객체 생성
var app = express();
//서버설정
app.set('port',process.env.PORT || 3000);
//첫 번째 미들웨어
app.use(function (req,res,next) {
    req.user = 'mike';
    next();
});
//두 번째 미들웨어
app.use('/',function (req,res,next) {
   res.send({name:'소녀시대',age:20});
});
//서버 설정
http.createServer(app).listen(app.get('port'),function(){
    console.log('익스프레스 서버를 시작했습니다 : ' + app.get('port'));
});

```

<li>redirect 사용

```javascript
var express = require('express');
var http = require('http');
//익스프레스 객체 생성
var app = express();
//서버설정
app.set('port',process.env.PORT || 3000);
//강제로 경로로 넘기기
app.use('/',function (req,res,next) {
    res.redirect('http://google.co.kr');
});
//서버 설정
http.createServer(app).listen(app.get('port'),function(){
    console.log('익스프레스 서버를 시작했습니다 : ' + app.get('port'));
});

```


