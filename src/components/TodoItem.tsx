import * as React from "react";

class TodoItem extends React.Component<ITodo,{}> {
    render() {
        return (
            <li>{this.props.title}</li>
        )
    }
}

export default TodoItem;