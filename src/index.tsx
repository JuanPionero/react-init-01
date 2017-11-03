import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from 'react-redux'
import { createStore } from 'redux';
// import App from "./components/Root";
// import App from "./components/RootPromise";
// import App from "./components/RootWithAjax";
// import App from "./components/RootWithAxios";
import App from "./components/RootForRedux";
import todosReducer from "./reducers/todosReducer";


// const todos: ITodo[] = [{title:"Start React with Typescript",completed:false},{title:"Asynchronous Communication", completed:false}];
const todosSourceUrl = "https://raw.githubusercontent.com/JuanPionero/react-init-01/master/server/todos.json";
// Root에 작성되었고 이름도 Root지만 App에 담음.
let store = createStore(todosReducer); // (IRootState, TodosActions.Action)
ReactDOM.render(
(
    <App store={store} dataUrl={todosSourceUrl} />
)
, document.querySelector("#app"));