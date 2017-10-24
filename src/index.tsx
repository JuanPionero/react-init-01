import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./components/Root";

const todos: ITodo[] = [{title:"Start React with Typescript",completed:false},{title:"Asynchronous Communication", completed:false}];

// Root에 작성되었고 이름도 Root지만 App에 담음.
ReactDOM.render(<App todos={todos} />, document.querySelector("#app"));