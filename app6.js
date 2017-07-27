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

