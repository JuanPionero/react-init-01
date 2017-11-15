import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from 'react-redux'
import { createStore } from 'redux';
import App from "./components/App";
import todosReducer from "./reducers/todosReducer";


// Root에 작성되었고 이름도 Root지만 App에 담음.
const store  = createStore(todosReducer); // (IRootState, TodosActions.Action)

console.log("State Observer Report: ", store.getState());
store.subscribe(()=>{ console.log("State Observer Report: ", store.getState())});

ReactDOM.render(
(
<Provider store={store} >
    <App  />
</Provider>
)
, document.querySelector("#app"));