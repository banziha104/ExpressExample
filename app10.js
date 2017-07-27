var express = require('express')
    ,http = require('http')
    ,path = require('path');
var app = express();
var static = require('serve-static');
var bodyParser = require('body-parser');

//오류 핸들러사용
var expressErrorHandler = require('express-error-handler');

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
//모든 라우터 처리 끝난 후 404 오류 페이지 처리
var errorHandler = expressErrorHandler({
    static : {
        '404' : './public/404.html'
    }
});
app.use(expressErrorHandler.httpError(404));
app.use(errorHandler);

//라우터 객체를 app 객체에 등록
app.use('/',router);

http.createServer(app).listen(app.get('port'),function(){
    console.log('익스프레스 서버를 시작했습니다 : ' + app.get('port'));
});

