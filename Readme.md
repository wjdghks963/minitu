# Wetube Reloaded

## Router

/ -> Home
/join -> Join
/login -> Login
/search -> Search

/users/:id -> See User
/users/logout -> Log Out
/users/edit -> Edit My Profile
/users/delete -> Delete My Profile

/videos/:id -> See Video
/videos/:id/edit ->Edit Video
/videos/:id/delete -> Delete Video
/videos/upload -> Upload Video
/videos/comment -> Comment on a video
/videos/comments/delete -> Delete A Comment of a Video

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
res.send는 마지막에 하나만 == use나 get안에 많은 middleware가 있어도 처음 send만 실행함

get 위에 use안에 미들웨어를 순서대로 넣어서 사용하면 get안에 미들웨어로서 안넣어도 됨

morgan("dev")은 middleware(res,req,next를 가진 function)을 return해줌

method, route, status code, 응답시간을 console log에 나타냄

## Router

app.use("/",global) >> global.get("/home",~~)
export controller >> controller를 하나 씩 export

videoRouter.route("/:id(\\d+)").get(getEdit).post(postEdit);
은 밑 두줄과 같다.
videoRouter.get("/:id(\\d+)/edit", getEdit);
videoRouter.post("/:id(\\d+)/edit", postEdit);

## Pug

app.set("view engine", pug) == pug를 템플릿으로 사용
! pug파일이 view dir안에 있어야함 view dir은 현재 작업중인 폴더(cwd) 안에 있어야함
!! cwd는 노드를 시작하는 dir이다
함수 = (req,res) => {res.render("pug파일 이름")} ==> pug를 렌더링함

extends base.pug => base.pug로 부터 뼈대를 가져옴
block content => 이 블록 안에 넣고 싶은 것을 넣는다.

h1 #{var}은 h1=var와 같다
mixin의 이름(받게될 객체)

### Mixin

## mongodb, mongoose

DB, mongoose는 몽고디비와 node.js를 연결 시켜주는 역
db를 mongoose와 연결시켜 video model을 인식시킴
models/Video.js => 데이터가 어떻게 생겼는지 정의

새롭게 생성하는 object 내에 id를 랜덤으로 부여해줌

Video.findByIdAndUpdate(id, update할 것)
Video.findById(id) // id를 찾음
Video.exists() // 결과 true or false ()안엔 filter
Video.findByIdAndDelete & findOneAndRemove ==> 특별한 이유 없는 이상 대부분 delete

## Model

Video = model
video = DB 안에 있는 object

## CRUD

Create, Read, Update, Delete

ex) www.ee.com/post/23/jug?title=hello

req.params = route에서 예정되어 있는 value ex) { id:"23",name:"jug"}
req.body = request body에 key-value의 데이터가 담긴 객체 프로퍼티, JSON 객체에 접근 가능
req.query = url 뒤 query문 => {title:"hello"}

## Regular Expression

## DB

### Query

## Session, Cookies

브라우저와 벡엔드 사이의 memory, history 같은 것
브라우저와 벡엔드 사이에 관계가 존재해야함
session id가 있으면 session object에 정보 추가 가능
브라우저마다 다른 session id를 가지고 있고 쿠키 안엔 session id를 가지고 있다.

브라우저가 요청을 보낼때마다 쿠키에서 session id를 가져오면 서버가 그 session id를 읽고 어떤 브라우저인지 알 수 있다.
