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
