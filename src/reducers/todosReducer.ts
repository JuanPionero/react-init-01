import appState from "../states/appState";
import * as TodosActions from "../actions/todosActions";

function todosReducer(state:IRootState = appState, action:TodosActions.ActionType):IRootState {
    // 이론: 여기서는 setState 를 사용하는 것이 아니다.
    // console.log("currentState[", action.type, "]:", state);
    
    switch(action.type) {
        case TodosActions.COMMAND.REQ_TODOS :
            state.todos = [];
            state.fetching = true;
            state.succeed = false;
            state.initialized = true;
            break;
        case TodosActions.COMMAND.RET_TODOS :
            state.todos = action.todos; //[...action.todos ]; // [...(<TodosActions.RetTodos>action).todos];
            state.fetching = false;
            state.succeed = true;
            break;  
        case TodosActions.COMMAND.RET_ERROR :
            state.todos = [];
            state.fetching = false;
            state.succeed = false;
            break;      
        case TodosActions.COMMAND.ADD_TODO :
            let element : ITodo = {
                title : action.title, //(<TodosActions.AddTodo>action).title,
                completed : false
            }
            // state.todos.push(element);     
            state.todos=[...state.todos,element]; 
            // return state;      
            break;
        case TodosActions.COMMAND.DEL_TODO :
            // state.todos.splice((<TodosActions.DelTodo>action).index,1);
            state.todos.splice(action.index,1);
            state.todos=[...state.todos];
            // state.todos=[...state.todos.splice(0,action.index-1),...state.todos.splice(action.index+1)];
            break;
        case TodosActions.COMMAND.MOD_TODO :
            state.todos[action.index].title = action.title;
            //[(<TodosActions.ModTodo>action).index].title = (<TodosActions.ModTodo>action).title;
            break;
        case TodosActions.COMMAND.STATE_TOGGLE :
            //state.todos[(<TodosActions.TodoStateToggle>action).index].completed 
            //    = !state.todos[(<TodosActions.TodoStateToggle>action).index].completed;
            state.todos[action.index].completed = !state.todos[action.index].completed;
            break;
        default:
            // 기본 action으로 state가 변경되는 경우는 없다.
            return state;
            
    }
    // console.log("nextState[", action.type,"]: ", state);
    // state : ref  https://redux.js.org/docs/faq/ReactRedux.html#why-isnt-my-component-re-rendering-or-my-mapstatetoprops-running
    // return state;
    // state.todos = [...state.todos];
    return {...state};
    
}

export default todosReducer;