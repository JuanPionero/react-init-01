import * as React from "react";
import TodoList from "./TodoList";

class Root extends React.Component<IProps,{}> {
    render() {
        return (
            <div>
                <TodoList todos={this.props.todos} />
            </div>
        )
    }
}

export default Root;