# Peterpan Blog

## 🎈 사용 목적 및 소개

- 제가 준 링크를 타고온 지인들만이 회원가입, 로그인하여 댓글을 작성하고, 제 글을 볼 수 있는 나만의 블로그를 만들고 싶었어요 :)

<br />

## 👉 개발 기간

- 2022.08.18 ~ 2022.08.31
  <br /><br />

## 🎈개발 도구

- React
  - useState, useReducer, useContext, useNavigate, localStorage 활용
  - 메모이징 함수(useMemo, useCallback) 일부 활용
    </br>

## 🚀 기능

- 회원 기능
  - 회원가입, 로그인, 로그아웃
    - Firebase-Auth REST API
    - 로그인 상태 ; context
- 게시판 구현 기능
  - 게시글 작성, 수정, 삭제
    - Firebase-Database
- 페이지별 주소 다르게 구현
  - React-router-dom 이용

## 시연 영상

### 회원가입

<img src="https://user-images.githubusercontent.com/62178788/206333905-733e9e4d-413b-432e-b214-e21afdecb388.gif" width="600px" />

### 게시판

<img src="https://user-images.githubusercontent.com/62178788/206333916-0fe6922a-65c9-4084-893e-5c23605b745a.gif" width="600px" />

### 프로필

<img src="https://user-images.githubusercontent.com/62178788/206335130-683479e0-74ec-434a-ae46-ffc53d5a4809.gif" width="600px" />

## 파일 구성

- src

  - App.js, App.css, index.js, index.js
  - assets ; 사진들
  - components

    - UI
      - Layout.js
      - Header.js
      - Footer.js
    - ## main
    - board
      - BoardList.js
        - BoardItem.js \* 4
          - PostList.js
            - PostItem.js \* n

  - pages - Main.js - /main - Board.js - /board - Board1.js - /board1 - /board1/id - Board2.js - /board2 - /board2/id - Board3.js - /board3 - /board3/id - Board4.js - /board4 - /board4/id - Login.js - Search.js
    <br /> <br />

## 📚 Project Settings

#### 📢 Install npm dependencies

```bash
> npm install
```

#### 📢 Start dev-server

```bash
> npm run start
```

#### 📢 Run tests

- Run unit test and e2e test

```bash
> npm test
```

- unit test

```bash
> npm run test:unit
```

- Run e2e test

```bash
> npm run test:e2e
```

#### 📢 Run build project

```bash
> npm build
```

#### 📢 Run Lint

```bash
> npm run lint
```

#### 📢 Run Coverage

```bash
> npm run coverage
```

- 자세한 사항은 `package.json`의 `scripts` 참고

## 📚 Getting start with firebase

- [Firebase](https://firebase.google.com/)
- [Docs](https://firebase.google.com/docs/cli?hl=ko)

#### 📢 firebase API키 관리

- [Firebase API 키 관리에 대한 참고 사항](https://github.com/CodeSoom/project-react-2-saseungmin/issues/133)
- [Firebase API 키에 대해서 작성한 블로그 글](https://haranglog.tistory.com/25)

#### 📢 Initial firebase setup

- Install firebase-tools

```bash
> npm install -g firebase-tools
```

- Login to firebase

```bash
> firebase login
```

- Deploy with firebase hosting

```bash
> firebase deploy
```

## 🔥 기술 스택 및 사용 라이브러리

- React
