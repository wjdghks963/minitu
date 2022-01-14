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

npm run dev:server
npm run dev:asset

## babel

최신 js를 컴파일 = nodejs가 js를 문제 없이 사용할 수 있게 컴파일 해줌
babel.config.json >> @babel/preset-env

## server

express를 사용해 서버를 만든다.

```javascript
import express from "express";

const app = express();
const handleListening = ()=>{console.log(`${PORT}에서 서버를 구동중입니다.`)}
app.listen(PORT,handleListening)
```

#### 서버란 

항상 켜져 있는 온라인에 연결된 컴퓨터, request를 listen하고 있음 == 브라우저가 request하고 respond함 ex) 카카오톡, 유튜브 영상 클릭 후 시청 

PORT의 존재 이유 
내가 req을 보낼때 내 PORT를 이용해서 보내고 res를 받는다. ex) 인터넷 세계의 창문
높은 port번호는 비어있는 확률이 높기 때문에 이 프로젝트에선 높은 번호를 사용한다.

GET = 웹에 접속할때 브라우저가 홈페이지를 가져와라 명령함
POST = 
DELETE = 
PUT = 

```javascript
// req,res는 express에서 나온것
const handleHome = (req, res) => {
return res.end();
// res.end(); = res를 종료 시킴, res.send("~~"); // ()안에 있는 것을 보냄
};


get("route", handler) use listen
```

## MiddleWare

req <> middleware <> res

```javascript
const middleWare = (req,res,next)=>{
res.send("I'm middleware");
next();
}

const handleHome = (req,res)=>{
return res.end("I'm home");
}

app.get("/",middleWare,handleHome);

```

```
app.use(middleware)
app.get....
```

app.use는 앱 전체적인 미들웨어로 get위치 보다 위에 있어야 적용된다.

미들웨어 안에 있는 next가 없는 return은 미들웨어를 중단 시킴
== 다음 것을 실행시키지 않음 따라서 마지막 controller은 next를 안씀
res.send는 마지막에 하나만 == use나 get안에 많은 middleware가 있어도 처음 send만 실행함

get 위에 use안에 미들웨어를 순서대로 넣어서 사용하면 get안에 미들웨어로서 안넣어도 됨

morgan 패키지는 node.js 서버로 구성된 웹 환경에서 HTTP request 로그를 관리하기 위한 미들웨어이다.
morgan(option)에서 option은 여러가지가 있다. 이 프로젝트에서 쓰이는
morgan("dev")은 middleware(res,req,next를 가진 function)을 색깔을 포함해 이쁘게 return해주며 method, route, status code, 응답시간을 console log에 나타낸다.

```javascript
import logger from "morgan";

const logger = logger("dev");
app.use(logger);

console
GET / 304 2.321ms - -
```


---

<br/>

## Router

Express 애플리케이션에는 앱 라우터가 내장되어 있다.

라우터는 미들웨어 자체처럼 작동하므로 app.use()에 대한 인수로 또는 다른 라우터의 use() 메서드에 대한 인수로 사용할 수 있다.
최상위 익스프레스 객체에는 새로운 라우터 객체를 생성하는 Router() 메서드가 있다.

일반적으로 router는 기능에 맞게 나눈다.

```javascript
Gobal Router

const globalRouter = express.Router();

/ -> HOME
/join -> JOIN
/search -> SEARCH

User Router

const userRouter = express.Router();

/user/edit -> user정보 edit

Video Router

const videoRouter = express.Router();

/videos/deit -> video정보 edit
```


router과  router를 컨트롤 하는  controller는 다른 파일로 저장해서 사용하는게 복잡해지지 않는다.


```javascript
한개의 Router당 하나씩 라우터에서 컨트롤한다.
ex) app.use("/",globalRouter)이라면 globalRouter파일 안에서 하나씩 설정해 나간다.

globalRouter.js

const globalRouter = express.Router();
globalRouter.get("/",handleHome);


export controller >> controller를 하나 씩 export

```

id같은 고유번호가 필요한땐 :를 앞에 붙혀야만 express가 변수라고 인식한다.
이런 변수를 사용할때는 일반적인 문자 url을 변수로 파악할 수 있기때문에 변수를 사용한 url를 다른 일반적인 문자 url보다 위에 둬야한다.
만약 이런 변수를 문자들이 아닌 숫자들만 허용할 수 있게 하려면 변수명 뒤에 (\\d+)를 붙히면 된다.

그외 optional한 사항은 https://www.regexpal.com 에서 볼 수 있다.

```javascript
videoRouter.route("/:id(\\d+)").get(getEdit).post(postEdit);
은 밑 두줄과 같다.
videoRouter.get("/:id(\\d+)/edit", getEdit);
videoRouter.post("/:id(\\d+)/edit", postEdit);
```


제일앞에 /가있으면 절대경로
```
index.js

const app = express();
app.use("/video", movieRouter);

movieRouter.js

const movieRouter = express.Router();
movieRouter.get("/", home);


a(href="/video/edit")--->localhost:4000/video/edit
a(href="video/edit")--->localhost:4000/videos/video/edit
a(href=`${video.id}/edit`)--->localhost:4000/videos/1/edit
```


--- 

## Pug

```javascript
npm i pug
```

Pug는 Node.js 및 브라우저용 __JavaScript로 구현된 고성능 템플릿 엔진__
html파일을 바로 렌더링 가능하지만 request를 통해 각종 변수를 전달하지 못해 정해진 화면 밖에 보여주지 못하고 중복되는 부분들을 하나하나 다 넣어야하기 때문에 사용한다.

react와 같은 FE framework를 사용하면 템플릿 엔진 없이 view부분 만들 수 있다.

```javascript
server.js file

app.set("view engine", pug) // pug를 view engine으로 사용
```
조건
1. pug파일이 view dir안에 있어야함 view dir은 현재 작업중인 폴더(cwd) 안에 있어야함 따라서 view라는 폴더를 만들고 그 안에 pug파일들을 넣는다.

express에게 뷰엔진으로 쓴다는것과 views dir에 있는 view(pug)를 찾도록 설정되어있기 떄문에 따로 import하지 않아도 된다.
```javascript
(req,res) => {res.render("pug파일 이름")} //  pug를 렌더링함
```
2. cwd는 노드를 시작하는 dir이다
```javascript
console.log(process.cwd()) // 현재 작업중인 dir을 알려줌

express의 현재 작업중인 dir을 설정하는 방법
app.set("views", process.cwd() + "/src/views");
```

### partials

반복되는 코드가 있다면 사용하며 include를 사용한다.

```
file

html
  include (파일 위치.pug)
```

### extends

pug는 템플릿 상속을 지원하기때문에 block과 extends를 통해 상속이 가능하다.
base file을 만든 후 파일에 따라 수정한다.

1. extends base.pug => base.pug로 부터 뼈대를 가져옴

2. block content => 이 블록 안에 넣고 싶은 것을 넣는다. 변수와 같은 공간
사용하려면 extends를 받아 block 안에 넣고 싶은 content를 넣는다.
block은 block 변수 형식으로 block 여러개 만들 수 있다.
```javasript
doctype html
html(lang="ko")
    head
        block head
    body
        block content
```

```javascript 
상속받는 파일
extends base.pug

block content
  ~~~~~
block head
  ~~~
```

### 템플릿에서 변수

```
vi.pug
extens index.pug
  h1={변수}

res.render("vi",{변수:"변수에 적용할 content"})
```

h1 #{var}은 h1=var와 같지만 만약 text를 같이 사용하고 싶다면 ex) h1 blabal #{var}  와 같이 사용해야한다. 

#### conditional

pug에서 js문법으로 조건문을 사용할 수 있지만 이것은 js가 아니라 pug의 문법이다.

```javascript
if user.loggedin
  li Hi #{user.username}
else 
  li please join 
```
#### Iteration

```javascript
controller.js

const home = (req,res) => {
let db = [1,2,3,4]
return res.render("home", {db})
}


home.pug

extends index.pug
  block content
    ul
      each video in db
        li video

```
### Mixins

mixins은 데이터를 받을 수 있는 partial이다.
Mixin을 사용하면 재사용 가능한 Pug 블록을 만들 수 있으며 또한 함수로 컴파일되며 인수를 사용할 수 있음.

```javascript
mixins/video.pug

mixin video(info)
  ul 
    li=info.name
    li=info.rate
    li=info.char
    

home.pug

include mixins/video

  each info in videos
    +video(potato)
```

mixin의 이름(받게될 객체)

주석 : // >> 모든 사람들에게 볼수있음
//- >> 프론트에서 안보임



## DB  GET/POST

form을 이용해 input value를 서버에 post할때 method="POST"를 사용한다.
form 태그에서 action="URL"은 form에서 생성된 query같은 form-data를 서버로 보낼 때 해당 데이터가 도착할 URL이다. 
HTML5에서부턴 반드시 필요한 속성은 아니다.

ex)
```
form(method="GET" action="/filter")
  input( type="text" name="name")
  
controller.js

const getFilter = (req,res) =>{
const {name} = req.query;
name을 이용해 filter하는 함수 결과값은 movie
return res.render("filter",movie)
}
```
이 URL도 절대,상대주소로 나뉜다.

```
form.pug

form(method="POST")
  input(type="text", value=title)
  input(type="submit" value="add")

videoController.js

const add = (req,res) =>{
const {title} = req.query

return res.render
}


videoRouter.js

videoRouter.post("/:id/add",add)
  
```

### req.body

req.body에는 form을 통해 submit된 데이터의 키-값 쌍을 포함
기본적으로는 undefined이며 express.json() 또는 express.urlencoded()와 같은 바디 파싱 미들웨어를 사용할 때 값을 받아옴

express.urlencoded([options])
express app가 form의 value들을 이해할 수 있는 js형식으로 바꿔줌 
optional엔 {extended:true}가 들어간다.

Express에 내장된 미들웨어 기능 urlencoded 페이로드로 들어오는 요청을 구문 분석하고 바디 파서가 기반

get과 post를 할때 중복되는 url 을 가지고 있을때

```
Router.route("url").get(getF).post(postF)
```



---

## mongodb, mongoose

mongo의 db형식은 jons과 유사하다.
mongoose는 몽고디비와 node.js를 연결 시켜주는 역할

**WSL에서 mongo실행**
1. WSL 터미널을 연다
2. 'sudo apt update' 을 입력하고 apt 업데이트
3. 'sudo apt-get install mongodb' 을 입력하고 설치한다
4. 'mongod --version' 을 입력하고 설치가 잘 되었는지 확인한다
5. 'sudo service mongodb start' 을 입력하고 mongo 를 사용할 수 있게 서비스 시작
6. 'mongo' 를 입력하면 mongo shell로 이동한다
7. 다 사용했으면 'sudo service mongodb stop' 을 입력하고 서비스를 종료한다

'sudo service mongodb status'를 입력하면 지금 mongodb 서비스가 실행중인지 알 수 있다
실행중이면 오른쪽에 [OK] 아니면 [Fail]

show db 명령어를 통해 사용중인 db들을 용량과 함께 볼 수 있다.

npm에 mongoose 다운

```
npm i mongoose
```

쉘에서 mongo가 실행되었는지 확인됐다면 connection 된 mongodb주소(url)를 찾는다.

mongoose와 mongodb연결
```javascript
db.js
import mongoose from "mongoose";

mongoose.connect("mongodb:mongodb주소",{useNewUrlParser:true,useUnifiedTopology: true,});
const db = mongoose.connection;
db.on("error",(error)=>console.log("DB Error", error)); // error가 발생하면 console.log
db.once("opne",()=>console.log("connected DB")) // db와 연결이 된다면 한번만 console.log 


app.js
import "./db";  //app에 import함으로서 자동적으로  db에 있는 코드들이 실행되어 mongodb와 연결된다.

```

### Model

데이터가 어떻게 생겼는지 정의
object 구조를 설계하고 강제화 시켜서 data를 CRUD할때 db가 이 모델을 참고해서 시행한다. 

모델은 스키마 정의에서 컴파일된 생성자며 모델의 인스턴스를 document라고 함. 
모델은 기본 MongoDB 데이터베이스에서 document라고를 만들고 읽음.

### Schemas
몽구스의 모든 것은 스키마로 시작하며 각 스키마는 MongoDB 컬렉션에 매핑되고 해당 컬렉션 내 document의 모양을 정의한다.


db를 mongoose와 연결시켜 video model을 인식시킴

```javascript
mongoose.model(modelName, schema);
```

models/Video.js
```javascript
import mongoose from "mongoose";

// Schema에 required나 lowercase등 옵션이 필요하다면 title:{type:Sting, required:true, lowercase:true}와 같이 사용한다.
const videoSchema = new mongoose.Schema({
  title:String,
  description:String,
  createdAt: Date,
  hashtags:[{type:String}]
});

const Video = mongoose.model("Video",videoSchema);
export default Video;
```
app.js
```
import "./models/Video"
```

새롭게 생성하는 object 내에 id를 랜덤으로 부여해줌

Video.findByIdAndUpdate(id, update할 것)
Video.findById(id) // id를 찾음
Video.exists() // 결과 true or false ()안엔 filter
Video.findByIdAndDelete & findOneAndRemove ==> 특별한 이유 없는 이상 대부분 delete

- 문제
  npm run dev:server 후
  DB Error MongooseServerSelectionError: connect ECONNREFUSED 127.0.0.1:27017
  에러 발생

= 해결
제어판 > 관리도구 > 서비
MongoDB Server를 시작

#### populate

Model.findById(id).populate("props")
// ex) props:fasddf454fds65 >> props: props's all object\

#### double populate

const user = await User.findById(id).populate({
path: "videos",
populate: {
path: "owner",
model: "User",
},
});
// path : 먼저 populate하고 싶은 것 >>> videos를 먼저 populate하고 owner

## Model

Video = model
video = DB 안에 있는 object

## CRUD

Create, Read, Update, Delete

ex) www.ee.com/post/23/jug?title=hello

req.params = route에서 예정되어 있는 value ex) { id:"23",name:"jug"}
req.body = request body에 key-value의 데이터가 담긴 객체 프로퍼티, JSON 객체에 접근 가능
req.query = url 뒤 query문 => {title:"hello"}

form에 action을 입력하지 않으면 브라우저가 같은 url에 post req를 보내려는 것을 안다.

staus() : render()하기 전에 상태 코드를 정함
sendStatus() : 상태 코드를 보내고 끝냄

## Regular Expression

## bcrypt

password를 해쉬로 변환해줌

## Session, Cookies

**브라우저와 벡엔드 사이의 memory, history 같은 것
브라우저와 벡엔드 사이에 관계가 존재해야함**

express-session은 브라우저가 백엔드와 상호 작용할 때마다 session이라는 middleware라는 곳에 cookie를 보내줌, cookie는 백엔드가 브라우저에 주는 정보인데 cookie에는 정해진 규칙이 존재해 매번 벡엔드에 req를 할 때 브라우저는 알아서 그 req에 cookie를 붙인다.

cookie에는 어떤 정보든 넣을 수 있으며 여기선 session id를 넣는다.
session id가 있으면 session object에 정보 추가 가능
브라우저마다 다른 session id를 가지고 있고 쿠키 안엔 session id를 가지고 있다.

브라우저가 요청을 보낼때마다 쿠키에서 session id를 가져오면 서버가 그 session id를 읽고 어떤 브라우저인지 알 수 있다.
브라우저는 도메인에 따라 쿠키를 저장하며 쿠키는 도메인에 있는 벡엔드로만 전송된다.

Session store는 session을 저장하는 곳이지만 , 매번 코드를 저장하면 서버가 재시작되면서 이것이 사라짐 테스트를 하는 곳이기 때문

## .env

변수는 대문자로

사용시엔 process.env.변수이름
변수이름(키)는 사용하는 곳과 .env파일 안에 있는 것과 똑같아야함

dotenv 패키지가 .env 파일을 읽고 접근시켜줌 // require("dotenv").config();

## fetch

javascript fetch함수는 브라우저에서 사용할 수 있는것이기 때문에 node-fetch 패키지를 다운해 node-js에서 사용가능하게 한다.

JS를 통해서 URL 변경 없이 request를 보낼 수 있게 만들어줌

## Webpack

신 js css .. 를 구 js css ..로 바꿔줌

entry >> 변경,처리하고 싶은 파일
output >> 변경, 처리 후 해당 파일을 path에 설정된 경로 안에 저장, 절대경로로 만들시 해당 dir를 생성하고 그 안에 파일이 만들어진다.

path.resolve(\_\_dirname, "assets", "js") >> 절대경로로 만들어줌

use :[loader] 안에 있는 loader들은 오른쪽에서 왼쪽 순으로 실행된다

## nodemon.json

ignore를 사용하여 벡엔드나 프론트엔드 재시작시 무시할 것을 설정

## FFmpeg

어떤 종류의 미디어 파일이든 다룰 수 있음
비디오 압축, 비디오에서 오디오 추출, 비디오 스크린샷 ...
WA를 사용해서 실행비용이 큰 FFmpeg를 브라우저에서 실행 시킴

- WebAssembly

프론트엔드에서 매우 빠른 속도로 코드를 실행 가능함
실행 비용이 큰 프로그램들을 웹 브라우저에서 실행 가능

## Heroku

heroku git : git reposi의 commit 기록을 본다

> > 코드를 바꾸면 무조건 commit 해야 한다. & gitignore에 있어도 안됌

#### urls

mongoDB Atals : https://cloud.mongodb.com/v2/61151af9f0fbff04a56e4fe3#clusters

heroku : https://dashboard.heroku.com/apps/minitu/settings
