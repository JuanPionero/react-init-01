import * as React from "react";
import {Unsubscribe,Store} from "redux";
import * as TodosActions from "../actions/todosActions";


interface ILocalProps extends ITodo {
    index:number;
    store:Store<IRootState|undefined>
}
class TodoItem extends React.Component<ILocalProps,{}> {
    
    unsubscribe:Unsubscribe;

    constructor(props:ILocalProps) {
        super(props);
        this.unsubscribe = this.props.store.subscribe(():void=>this.forceUpdate());
        
        // ? 삭제와 상관 없을까?
        // 변화는 store의 상태 변화를 의미. 
        // 삭제된 상태에서도 store.subscribe 는 계속 살아 있음.
        // 그럼으로 없애주어야 함. ==> componentWillUnmount
    }
    componentWillUnmount() {
        this.unsubscribe();
    }
    removeThis = (ev:React.MouseEvent<HTMLAnchorElement>)=>{
        ev.preventDefault();
        this.props.store.dispatch(TodosActions.delTodo(this.props.index));
    }
    toggleThis = (ev:React.MouseEvent<HTMLAnchorElement>)=>{
        ev.preventDefault();
        this.props.store.dispatch(TodosActions.todoStateToggle(this.props.index));
    }    
    render() {

        return (
            <li>{this.props.title}
            <a className="button" onClick={this.toggleThis}>{this.props.completed?"완료":"진행"}</a>
            <a className="button" onClick={this.removeThis}>삭제</a>
            </li>
        )
    }
}

export default TodoItem;