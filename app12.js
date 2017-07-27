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
    reSave : true,
    saveUninitialized : true
}));
//상품정보 라우팅 함수
router.route('/process/product').get(function (req,res) {
   console.log('/process/product 호출됨');

   if(req.session.user){
       res.redirect('/public/product.html');
   }else{
       res.redirect('/public/login2.html');
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
       res.redirect('/public/product.html');
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
    if(req.session.user){
        console.log('로그아웃함')
        req.session.destroy(function (err) {
           con
        });
    }
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

