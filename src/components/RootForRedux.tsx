import * as React from "react";
import TodoList from "./TodoList";
import TodoInput from "./TodoInput";
import { Store } from 'redux';
import appState from "../states/appState";
import axios , {AxiosResponse} from "axios";
import * as TodosActions from "../actions/todosActions";
/**
 * In Redux, this is a presentational component
 * state를 가지지 않고, container component에서 받는 props 만으로 작동.
 * 이후 이것을 functional component로 바꿀 것이다.
 * 
 * 기존 프로젝트의 자료구조를 그대로 사용하기 위해 P 자리에 IRootState를 
 * 사용. 
 */
interface ILocalProps {
    dataUrl:string ,
    store:Store<IRootState|undefined>
}

class RootForRedux extends React.Component<ILocalProps,{}> {

    constructor(props:ILocalProps) {
        super(props);
        this.props.store.subscribe(()=>{
            this.forceUpdate();
        });
    }

    componentDidMount() {      
        // 실 행동과 상태 변화가 분리 되어 있다.
        this.props.store.dispatch(TodosActions.reqTodos( this.props.dataUrl ));
        this.axiosRequest();
    }
    
    // 기성 모듈 axois 의 적용.
    axiosRequest() {
        axios
          .get(this.props.dataUrl)
          .then(this.onAxiosRequestSuccess, this.onAxiosRequestError);
    }

    // axios에서 callback 의 arguments shape가 특화되어 있다. (AxiosResponse)
    onAxiosRequestSuccess = (response: AxiosResponse): void => {
        this.props.store.dispatch(
            TodosActions.retTodos( response.data as ITodo[] )
        );
    
    };

    onAxiosRequestError = (reason: any): void => {
        this.props.store.dispatch(
            TodosActions.retError()
        );
    };
    
    stateText() {
        let state= this.props.store.getState();
        if(state) {
            if(state.fetching) {
                return (<span>Loding...</span>);
            } else if(!state.succeed) {
                return (<span>Request Fail</span>);
            } else {
                return (<TodoList todos={state.todos} store={this.props.store} />);
            }
        } else {
            return (<span>Internal Error</span>);
        }
    }

    render() {
        
        return (   
            // 변경될 사항. <TodoList todos={this.props.todos} />         
            <div>
            <TodoInput store={this.props.store} />
            {this.stateText()}  
            </div>
        )
    }
}

export default RootForRedux;