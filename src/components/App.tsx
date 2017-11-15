import * as React from "react";
import TodoList from "./TodoList";
import TodoInput from "./TodoInput";


const todosSourceUrl = "https://raw.githubusercontent.com/JuanPionero/react-init-01/master5/server/todos.json";

class App extends React.Component<{},{}> {
   
    render() {      
        return (   
            <div>
            <TodoInput  />
            <TodoList dataUrl={todosSourceUrl} />
            </div>
        )
    }
}

const AppFn = () => (<div>
    <TodoInput  />
    <TodoList dataUrl={todosSourceUrl} />
    </div>);

export default App;