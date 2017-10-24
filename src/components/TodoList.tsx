import * as React from "react";
import TodoItem from "./TodoItem";

class TodoList extends React.Component<IProps,{}> {
    render() {
        return (
            <ul>
                {this.props.todos.map((todo,index) => 
                    <TodoItem {...todo} key={index} />
                )}
            </ul>
        )
    }
}

export default TodoList;