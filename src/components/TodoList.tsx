import * as React from "react";
import TodoItem from "./TodoItem";
import {Store} from "redux";
import * as TodosActions from "../actions/todosActions";

interface ILocalProps extends IProps {
    store:Store<IRootState|undefined>
}
class TodoList extends React.Component<ILocalProps,{}> {
    
    render() {
        return (
            <ul>
                {this.props.todos.map((todo,index) => 
                    <TodoItem {...todo} key={index} index={index} store={this.props.store} />
                )}
            </ul>
        )
    }
}

export default TodoList;