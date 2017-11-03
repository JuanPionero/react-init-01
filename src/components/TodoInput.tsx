import * as React from "react";
import {Store} from "redux";
import * as TodosActions from "../actions/todosActions";

interface ILocalProps  {
    store:Store<IRootState|undefined>
}
/**
 * 수행할 작업: 등록 버튼을 누르면, 
 * input에 텍스트가 있는지 검사. 있으면, Redux Store에 내용과 함께 등록명령.
 * 일단 등록 한 후에는 input에 등록된 내용(값: value)을 지운다.
 * 
 * 제기되는 문제점: click event는 button에서 이루어진다.
 * 검사해야 할 값은 input에 있다. 
 * 다른 독립 element에 있는 값을 어떻게 참조할 수 있는가?
 * .. 여기서 ref 개념이 필요하다.
 */
class TodoInput extends React.Component<ILocalProps,{}> {
    textInputElement:HTMLInputElement|null; 
    buttonElement:HTMLButtonElement|null;

    // wrong function type : (ev:MouseEvent):void=>{} !!!! important
    checkAndRegisterInputValue = ():void => {
        if(this.textInputElement!.value.trim()==="") {
            
        } else {
            this.props.store.dispatch(TodosActions.addTodo(this.textInputElement!.value));

        }
        this.textInputElement!.value = "";
    }

    // 이벤트를 따로따로 처리
    handleMouseClick = (ev: React.MouseEvent<HTMLButtonElement>):void => {
        ev.preventDefault();
        this.checkAndRegisterInputValue();
    }
    handleFormSubmit = (ev: React.FormEvent<HTMLFormElement>):void => {
        ev.preventDefault(); // form이 submit 되는 것은 방지해야 함.
        this.checkAndRegisterInputValue();
    }

    // 두 가지 이벤트를 조합!!!
    handleEvent = (ev: React.MouseEvent<HTMLButtonElement>|React.FormEvent<HTMLFormElement>)=>{
        this.checkAndRegisterInputValue();
    }

    // 
    render() {
        return (
            <div>
                <form onSubmit={this.handleFormSubmit}>
                    <input type="text" ref={input=>this.textInputElement=input} />
                    <button type="button" onClick={this.handleMouseClick} className="invalid" >등록</button>
                </form>
            </div>
        )
    }
}

export default TodoInput;