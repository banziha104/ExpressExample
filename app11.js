var express = require('express')
    ,http = require('http')
    ,path = require('path');
var app = express();
var bodyParser = require('body-parser');

//오류 핸들러사용
var expressErrorHandler = require('express-error-handler');
//쿠키 객체 참조
var cookieParser = require('cookie-parser');
app.use(cookieParser());

//라우터 객체 참조
var router = express.Router();


//속성 설정
app.set('port',process.env.PORT || 3000);

//body-parser 를 사용해  application/x-www-form-urlencoded 파싱
app.use(bodyParser.urlencoded({extended : false}));

//body-parser를 사용해 application/json 파싱
app.use(bodyParser.json());
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

