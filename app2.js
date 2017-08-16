var express = require('express');
var http = require('http');
//익스프레스 객체 생성
var app = express();
//서버설정
app.set('port',process.env.PORT || 3000);
//첫 번째 미들웨어
app.use(function (req,res,next) {
   req.user = 'mike';
   next();f
});
//두 번째 미들웨어
app.use('/',function (req,res,next) {
   console.log('두 번째 미들웨어에서 요청을 처리함');
    res.writeHead('200',{'Content-Type':'text/html;charset=utf8'});
    res.end('<h1>Express 서버에서' + req.user + '응답한 결과</h1>');
});
//서버 설정
http.createServer(app).listen(app.get('port'),function(){
    console.log('익스프레스 서버를 시작했습니다 : ' + app.get('port'));
});
