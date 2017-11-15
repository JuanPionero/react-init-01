import * as React from "react";
import {Dispatch} from "redux";
import {connect} from "react-redux";
import * as TodosActions from "../actions/todosActions";

interface IDispatchProps {
    addTodo : (title:string)=>void
}

type Props = IDispatchProps & {todosLength:number};

const mapStateToProps = (state:{todos:ITodo[]})=>{
    return {
        todosLength: state.todos.length
    }
}
const mapDispatchToProps = (dispatch:Dispatch<IDispatchProps>)=>{
    return {
        addTodo: (title:string)=>{
            dispatch(TodosActions.addTodo(title))
        }
    }
}

const TodoInput = (props:Props) => {
    let textInputElement:HTMLInputElement|null; 
    const handleEvent = (ev: React.MouseEvent<HTMLButtonElement>|React.FormEvent<HTMLFormElement>):void => {
        ev.preventDefault(); // form이 submit 되는 것은 방지해야 함.
        if(textInputElement!=null) {
            if(textInputElement.value.trim()==="") {
                
            } else {
                props.addTodo(textInputElement.value);
            }
            textInputElement.value = "";
        }
    }
    return (
    <div>
        <form onSubmit={handleEvent}>
            <input type="text" ref={input=>textInputElement=input} />
            <button type="button" onClick={handleEvent} className="invalid" >등록</button>
            <div>Todos Count: {props.todosLength}</div>
        </form>
    </div>
    );
}

export default connect<{todosLength:number},IDispatchProps,{}>(mapStateToProps, mapDispatchToProps)( TodoInput );