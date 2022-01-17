1. npm init -> package.json파일 생성
2. git init -> 깃 레포지토리 생성
3. npm i nodemon -D -> 자동재실행 해주는 nodemon을 개발자의존으로 설치
4. babel.config.json, nodemon.json 파일 생성
5. npm i @babel/core @babel/cli @babel/node @babel/preset-env -D -> 코드를 구형으로 컴파일 해주는 babel 설치(express의 코드가 구형이기 때문)
6. npm i express -> Node.js의 사실상의 표준 서버 프레임워크
7. npm i pug -> html을 조금 더 세련되게 쓸 수 있는 템플릿 언어, express 뷰 엔진

@babel/node는 웬일인지 실행이 되지 않는다. 해결방법은 -g를 사용하여 전역으로 설치를 하던지 package.json 최상단에 "type": "module"을 추가하여 최신코드로 인식시키는 방법뿐.
