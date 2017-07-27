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
use()메소드를 활용하여 접근

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

## 익스프레스에서 요청 객체에 추가한 헤더와 파라미터 알아보기
<li> query : 클라이언트에서 GET 방식으로 전송한 요청 파라미터를 확인한다
<li> body : 클라이언트에서 POST 방식으로 전송한 요청 파라미터를 확인
<li> header : 헤더를 확인

```javascript
var express = require('express');
var http = require('http');
//익스프레스 객체 생성
var app = express();
//서버설정
app.set('port',process.env.PORT || 3000);
//강제로 경로로 넘기기
app.use('/',function (req,res,next) {
    var userAgent = req.header('User-Agent');
    var paramName = req.query.name;

    res.writeHead('200',{'Content-Type':'text/html;charset=utf8'});
    res.write('<h1> Express 서버에서 응답한 결과입니다. </h1>');
    res.write('<div><p>User-Agent : '+ userAgent+'</p></div>');
    res.write('<div><p>Param name :' + paramName+'</p></div>');
    res.end();
});

//서버 설정
http.createServer(app).listen(app.get('port'),function(){
    console.log('익스프레스 서버를 시작했습니다 : ' + app.get('port'));
});
```

## 미들웨어 사용하기
<li>static : 특정 폴더의 파일들을 특정 패스로 접근 할 수 있도록 만들어줌

static 외장 모듈 설치
```
npm install serve-static --save
```



```javascript
var static = require('serve-static');
app.use(static(path.join(__dirname,'public')));

/*
public 폴더 안에 있는 파일들을 클라이언트에서 바로 접근 가능
http://localhost:3000/index.html
http://localhost:3000/images/house.png
http://localhost:3000/js/main.js
*/
```

<li> body-parse 미들웨어 : POST 방식으로 요청할 때 본문 영역에 들어 있는
요청 파라미터를 파싱하여 body 속성에 넣어줌

```javascript
var express = require('express')
    ,http = require('http')
    ,path = require('path');

var bodyParser = require('body-parser');
var static = require('serve-static');

var app = express();
//속성 설정
app.set('port',process.env.PORT || 3000);

//body-parser 를 사용해  application/x-www-form-urlencoded 파싱
app.use(bodyParser.urlencoded({extended : false}));

//body-parser를 사용해 application/json 파싱
app.use(bodyParser.json());

app.use(static(path.join(__dirname,'public')));

app.use(function (req,res,next) {
    console.log('첫번째 미들웨어에서 요청을 처리함');

    var paramID = req.body.id || req.query.name ;
    var paramPassword = req.body.password || req.query.password;

    res.writeHead('200',{'Content-Type':'text/html;charset=utf8'});
    res.write('<h1> Express 서버에서 응답한 결과입니다. </h1>');
    res.write('<div><p>Param id : '+ paramID+'</p></div>');
    res.write('<div><p>Param password :' + paramPassword+'</p></div>');
    res.end();
});

http.createServer(app).listen(app.get('port'),function(){
    console.log('익스프레스 서버를 시작했습니다 : ' + app.get('port'));
});

```

## 요청 라우팅하기
요청 url을 일일이 확인해야 하는 번거로운 문제를 해결해줌
<li> get(callback) : GET 방식으로 특정 패스 요청이 발생했을 때 사용할 콜백함수 지정
<li> post(callback) : POST 방식으로 특정 패스 요청이 발생했을 때 사용할 콜백함수 지정
<li> put(callback) : PUT 방식으로 특정 패스 요청이 발생했을 때 사용할 콜백함수 지정
<li> delete(callback) : DELETE 방식으로 특정 패스 요청이 발생했을 때 사용할 콜백함수 지정
<li> all(callback) : 모든 방식을 처리, 특정 패스 요청이 발생했을 때 사용할 콜백함수 지정

```javascript
var express = require('express')
    ,http = require('http')
    ,path = require('path');
var app = express();
//라우터 객체 참조
var router = express.Router();
//속성 설정
app.set('port',process.env.PORT || 3000);

//라우팅 함수 등록

router.route('/process/login').post(function (req,res) {
    var paramID = req.body.id || req.query.name ;
    var paramPassword = req.body.password || req.query.password;

    res.writeHead('200',{'Content-Type':'text/html;charset=utf8'});
    res.write('<h1> Express 서버에서 응답한 결과입니다. </h1>');
    res.write('<div><p>Param id : '+ paramID+'</p></div>');
    res.write('<div><p>Param password :' + paramPassword+'</p></div>');
    res.end();
});
//라우터 객체를 app 객체에 등록
app.use('/',router);

http.createServer(app).listen(app.get('port'),function(){
    console.log('익스프레스 서버를 시작했습니다 : ' + app.get('port'));
});

```

## URL 파라미터 사용하기

URL 뒤에 오는 값을 파라미터로 처리
이렇게 처리 지정한 파라미터는 req.papams 객체 안에 들어감

```javascript
var express = require('express')
    ,http = require('http')
    ,path = require('path');
var app = express();
var static = require('serve-static');
var bodyParser = require('body-parser');
app.use(static(path.join(__dirname,'public')));
//라우터 객체 참조
var router = express.Router();
//속성 설정
app.set('port',process.env.PORT || 3000);

//body-parser 를 사용해  application/x-www-form-urlencoded 파싱
app.use(bodyParser.urlencoded({extended : false}));

//body-parser를 사용해 application/json 파싱
app.use(bodyParser.json());

//라우팅 함수 등록
router.route('/process/login/:name').post(function (req,res) {

    console.log('/login 처리함');
    var paramID = req.body.id || req.query.name ;
    var paramPassword = req.body.password || req.query.password;
    var paramName = req.params.name;
    res.writeHead('200',{'Content-Type':'text/html;charset=utf8'});
    res.write('<h1> Express 서버에서 응답한 결과입니다. </h1>');
    res.write('<div><p>Param name : '+ paramName+'</p></div>');
    res.write('<div><p>Param id : '+ paramID+'</p></div>');
    res.write('<div><p>Param password :' + paramPassword+'</p></div>');
    res.end();
});
//라우터 객체를 app 객체에 등록
app.use('/',router);

http.createServer(app).listen(app.get('port'),function(){
    console.log('익스프레스 서버를 시작했습니다 : ' + app.get('port'));
});
```

## 오류 페이지 보여주기

<li>지정한 패스 이외의 모든 패스로 요청이 들어 왔을 때, 오류 페이지가 보이도록 처리

```javascript
app.all('*',function(req,res){
    res.status(404).send('<h1>ERROR- 페이지를 찾을 수 없다<h1>');
});
```

<li>미들웨어로 오류 페이지 보내기

 ```javascript

var expressErrorHandler = require('express-error-handler');

 var errorHandler = expressErrorHandler({
     static : {
         '404' : './public/404.html'
     }
 });

 app.use(expressErrorHandler.httpError(404));
 app.use(errorHandler);

 ```

## 쿠키 사용하기
쿠키 : 클라이언트 웹 브라우저에 저장되는 정보

```
npm install cookie-parser
```

```javascript
//쿠키 객체 참조
var cookieParser = require('cookie-parser');
app.use(cookieParser());

//쿠키 보여주기
router.route('/process/showCookie').get(function (req,res) {
    console.log('/process/showCookie 호출됨');
    res.send(req.cookies);
});
//요청이 들어오면 쿠키를 생성하고전달
router.route('/process/setUserCookie').get(function (req, res) {
    console.log('/processs/setUserCookie 호출됌');
   res.cookie('user',{
      id : 'mike',
      name : '소녀시대',
      authorized : true
   });
   res.redirect('/process/showCookie');
});

```

## 세션 사용하기
세션 : 서버에 저장되는 정보.

```javascript
var express = require('express')
    ,http = require('http')
    ,path = require('path');
var app = express();
var bodyParser = require('body-parser');
var static = require('serve-static');
//오류 핸들러사용
var expressErrorHandler = require('express-error-handler');
//쿠키 객체 참조
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');

//라우터 객체 참조
var router = express.Router();
//속성 설정
app.set('port',process.env.PORT || 3000);
//스테틱 설정
app.use(static(path.join(__dirname,'public')));

app.use(cookieParser());
//세션 등록
app.use(expressSession({
    secret : 'my key',
    resave : true,
    saveUninitialized : true
}));
//상품정보 라우팅 함수
router.route('/process/product').get(function (req,res) {
   console.log('/process/product 호출됨');

   if(req.session.user){
       res.redirect('/product.html');
   }else{
       res.redirect('/login2.html');
   }
});
//로그인 라우팅 함수 - 로그인 후 세션 저장함
router.route('/process/login').post(function (req,res) {
   console.log('/process/login 호출됨.');

   var paramID = req.body.id || req.query.id;
   var paramPassword = req.body.password || req.query.password;

   //로그인이 되어있다면
   if(req.session.user){
       console.log('이미 로그인되어 상품 페이지로 이동');
       res.redirect('/product.html');
   }else{
       //세션 저장
       req.session.user = {
           id : paramID,
           name : '소녀시대',
           authorized : true
       };
       res.writeHead('200',{'Content-Type':'text/html;charset=utf8'});
       res.write('<h1>로그인 성공</h1>');
       res.write('<div><p>Param id : '+ paramID+'</p></div>');
       res.write('<div><p>Param password :' + paramPassword+'</p></div>');
       res.write('<br><br><a href="/processs/product">상품 페이지로 이동하기</a> ')
   }
});
//로그아웃 라우팅 함수 - 로그아웃 후 세션삭제
router.route('/process/logout').get(function (req,res) {
    console.log('process/logout 호출됨');
    //로그인이 된 상태
    if(req.session.user){
        console.log('로그아웃함')
        req.session.destroy(function (err) {
           if(err){throw err;}
           console.log('세션을 삭제하고 로그아웃 되었습니다');
           res.redirect('/login2.html');
        });
    }else{
        //로그인이 안된상태
        console.log('아직 로그인되어 있지 않습니다');
        res.redirect('/public/login2.html');
    }
});
router.route('/process/login').post(function (req,res) {

    console.log('/login 처리함');
    var paramID = req.body.id || req.query.name ;
    var paramPassword = req.body.password || req.query.password;
    var paramName = req.params.name;
    res.writeHead('200',{'Content-Type':'text/html;charset=utf8'});
    res.write('<h1> Express 서버에서 응답한 결과입니다. </h1>');
    res.write('<div><p>Param name : '+ paramName+'</p></div>');
    res.write('<div><p>Param id : '+ paramID+'</p></div>');
    res.write('<div><p>Param password :' + paramPassword+'</p></div>');
    res.end();
});
//라우터 객체를 app 객체에 등록
app.use('/',router);

//모든 라우터 처리 끝난 후 404 오류 페이지 처리
var errorHandler = expressErrorHandler({
    static : {
        '404' : './public/404.html'
    }
});

app.use(expressErrorHandler.httpError(404));
app.use(errorHandler);

http.createServer(app).listen(app.get('port'),function(){
    console.log('익스프레스 서버를 시작했습니다 : ' + app.get('port'));
});

```
