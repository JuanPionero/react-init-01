# react-init-01
React initial setting w/o create-react-app 

node와 tsc 설치는 생략. (node를 설치하면서, npm도 같이 설치됨을 전제로 함.)
자동화된 도구 (예:  create-react-app )도 있지만, 수기로 작성하는 것으로 하고, 자동화된 도구와 비교.


	1. 작업 공간 폴더 생성(ws) :
md ws
cd ws
	2. 프로젝트 공간 생성 (my-app) :
md my-app
cd my-app
	3. 프로젝트 폴더로 이동하고 npm 프로젝트 환경과  typescript 환경 구축
npm init     ==> package.json 파일 생성.
tsc --init     ==> tsconfig.json 파일 생성.
	4. React, React-dom 모듈 설치 (개발용이며, 최종 deploy 에 사용된다.)
npm install react --save   ==> 모듈 설치 및 package.json에 dependency 기록.
npm install react-dom --save
	5. typescript 를 위한 타입 정의 모듈 설치 
npm install @types/react --save-dev
npm install @types/react-dom --save



│  index.html
│  package.json
│  tree.txt
│  tsconfig.json
│          
└─src
    │  index.tsx
    │  typings.d.ts
    │  
    └─components
            Root.tsx
            TodoItem.tsx
            TodoList.tsx
