import * as React from "react";
import { Store, Dispatch, bindActionCreators } from 'redux';
import { connect } from "react-redux";
import * as TodosActions from "../actions/todosActions";

interface IEventHandler {
    (ev:React.MouseEvent<HTMLAnchorElement>):void;
}

interface IOwnProps extends ITodo  {
    key:number,
    index:number
}
interface IDispatchProps {
    toggleThis:IEventHandler,
    removeThis:IEventHandler
}
interface IStateProps  {
    
}

type Props = IStateProps & IDispatchProps & IOwnProps;

const mapDispatchToProps = (dispatch:Dispatch<IDispatchProps>, ownProps:IOwnProps) => 
{ return {
    removeThis: (ev:React.MouseEvent<HTMLAnchorElement>)=>{
        ev.preventDefault();
        dispatch(TodosActions.delTodo(ownProps.index));
    },
    toggleThis: (ev:React.MouseEvent<HTMLAnchorElement>)=>{
        ev.preventDefault();
        dispatch(TodosActions.todoStateToggle(ownProps.index));
    },
    
}}

/*  Strore를 명기할 필요 없게 됨.
interface ILocalProps extends ITodo {
    index:number;
    store:Store<IRootState|undefined>
}
*/
class TodoItem extends React.Component<Props,{}> {
    

    constructor(props:Props) {
        super(props);
        // this.unsubscribe = this.props.store.subscribe(():void=>this.forceUpdate());
        
        // ? 삭제와 상관 없을까?
        // 변화는 store의 상태 변화를 의미. 
        // 삭제된 상태에서도 store.subscribe 는 계속 살아 있음.
        // 그럼으로 없애주어야 함. ==> componentWillUnmount
    }
    /* 필요 없게 됨.
    componentWillUnmount() {
        this.unsubscribe();
    }*/
      
    render() {

        return (
            <li>{this.props.title}
            <a className="button" onClick={this.props.toggleThis}>{this.props.completed?"완료":"진행"}</a>
            <a className="button" onClick={this.props.removeThis}>삭제</a>
            </li>
        )
    }
}



export default connect(undefined, mapDispatchToProps)(TodoItem);