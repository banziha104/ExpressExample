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
