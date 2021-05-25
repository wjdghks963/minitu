## json

scripts는 실행하고 싶은 것
dependencies에 해당하는 모듈 다 설치, 프로젝트가 작동하기 위해 필요한 것
devDependencies 개발자에게 필요한 dependencies

## babel

최신 js를 컴파일 = nodejs가 js를 문제 없이 사용할 수 있게 컴파일 해줌
babel.config.json >> @babel/preset-env

## server

항상 켜져 있는 온라인에 연결된 컴퓨터, request를 listen하고 있음
브라우저가 request하고 반응함
GET = 홈페이지를 가져와라
// req,res는 express에서 나온것
const handleHome = (req, res) => {
return res.end();
// res.end(); = res를 종료 시킴, res.send("~~"); = ()안에 있는 것을 보냄

};
get("route", handler) use listen

## MiddleWare

req <> middleware <> res

미들웨어 안에 있는 next가 없는 return은 미들웨어를 중단 시킴
== 다음 것을 실행시키지 않음 따라서 마지막 controller은 next를 안씀

get 위에 use안에 미들웨어를 순서대로 넣어서 사용하면 get안에 미들웨어로서 안넣어도 됨
