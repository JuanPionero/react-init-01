export const COMMAND = {
    REQ_TODOS: "REQ_TODOS",
    RET_TODOS: "RET_TODOS", // Retreive Todos
    RET_ERROR: "RET_ERROR", // Retreive Error
    ADD_TODO : "ADD_TODO",
    DEL_TODO : "DEL_TODO",
    MOD_TODO : "MOD_TODO",
    STATE_TOGGLE : "STATE_TOGGLE"
}
export interface Action {
    type:string;
}

export interface RetTodos extends Action {
    todos:ITodo[];
}

export interface ReqTodos extends Action {
    url:string;
}

export interface AddTodo extends Action {
    title:string;
}
export interface DelTodo extends Action {
    index:number;
}
export interface ModTodo extends Action {
    index:number;
    title:string;
}
export interface TodoStateToggle extends Action {
    index:number;
}

export type ActionType = RetTodos & ReqTodos & AddTodo & DelTodo & ModTodo & TodoStateToggle

export function isRetTodos(action:Action): action is RetTodos {
    return action.type == COMMAND.RET_TODOS;
}

export function isReqTodos(action:Action): action is ReqTodos {
    return action.type == COMMAND.REQ_TODOS;
}

export function isAddTodo(action:Action): action is AddTodo {
    return action.type == COMMAND.ADD_TODO;
}

export function isDelTodo(action:Action): action is DelTodo {
    return action.type == COMMAND.DEL_TODO;
}

export function isModTodo(action:Action): action is ModTodo {
    return action.type == COMMAND.MOD_TODO;
}

export function isTodoStateToggle(action:Action): action is TodoStateToggle {
    return action.type == COMMAND.STATE_TOGGLE;
}

// Action creators
export function reqTodos(url:string) : ReqTodos {
    return {
        type:COMMAND.REQ_TODOS,
        url:url
    }
}

export function retTodos(todos:ITodo[]) : RetTodos {
    return {
        type:COMMAND.RET_TODOS,
        todos:todos
    }
}

export function retError() : Action {
    return {
        type:COMMAND.RET_ERROR // error message 추가 가능.
    }
}

export function addTodo(title:string) : AddTodo {
    return {
        type:COMMAND.ADD_TODO,
        title:title
    }
}

export function delTodo(index:number) : DelTodo {
    return {
        type:COMMAND.DEL_TODO,
        index:index
    }
}

export function modTodo(index:number, title:string) : ModTodo {
    return {
        type:COMMAND.MOD_TODO,
        index:index,
        title:title
    }
}

export function todoStateToggle(index:number) : TodoStateToggle {
    return {
        type:COMMAND.STATE_TOGGLE,
        index:index
    }
}

