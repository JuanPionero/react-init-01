import * as React from "react";
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from "react-redux";
import axios , {AxiosResponse} from "axios";
import * as TodosActions from "../actions/todosActions";
import TodoItem from "./TodoItem";


interface IOwnProps   {
    dataUrl: string;
}
interface IDispatchProps {
    reqTodos:typeof TodosActions.reqTodos, 
    retTodos:typeof TodosActions.retTodos,
    retError:typeof TodosActions.retError
}
interface IStateProps extends IRootState {
    nothing?:string
}

type Props = IStateProps & IDispatchProps & IOwnProps;

const mapStateToProps = (state:IStateProps) => {
    return { ...state }
}

const mapDispatchToProps = (dispatch:Dispatch<IDispatchProps>) => 
    bindActionCreators({
        reqTodos:TodosActions.reqTodos, 
        retTodos:TodosActions.retTodos,
        retError:TodosActions.retError}, dispatch)

class TodoList extends React.Component<Props,{}> {

    componentDidMount() {              
        this.axiosRequest();
    }
    
    // 기성 모듈 axois 의 적용.
    axiosRequest() {        
        this.props.reqTodos( this.props.dataUrl );
        axios
          .get(this.props.dataUrl)
          .then(this.onAxiosRequestSuccess, this.onAxiosRequestError);
          
    }

    onAxiosRequestSuccess = (response: AxiosResponse): void => {
        this.props.retTodos( response.data as ITodo[] )
    };

    onAxiosRequestError = (reason: any): void => {
        this.props.retError();
    };

    stateText() {
        if(!this.props.initialized) {
            return (<span>Loding...</span>);
        }
        if(this.props.fetching ) {
            
        } else if(!this.props.succeed) {
            return (<span>Request Fail</span>);
        } else {
            return (
            <ul>
                {this.props.todos.map((todo,index) => 
                    <TodoItem {...todo} key={index} index={index} />
                )}
            </ul>
            );
        }
    }
    render() {
        return (
            <div>
                {this.stateText()}
            </div>
        )
    }
}


const TodoListFn = (props:Props) => {
    
    const onAxiosRequestSuccess = (response: AxiosResponse): void => {
        // debugger;
        props.retTodos( response.data as ITodo[] )
    };

    const onAxiosRequestError = (reason: any): void => {
        props.retError();
    };

    const axiosRequest = ()=> {        
        props.reqTodos( props.dataUrl );
        
        axios
          .get(props.dataUrl)
          .then(onAxiosRequestSuccess, onAxiosRequestError);
        
    }

    /*const initialize = () => {
        axiosRequest();
    }*/

    /*if(!props.initialized) {
        axiosRequest();
    }*/
    
    function stateText() {
        // 
        console.log("TodoList Props: ", props);
        if(!props.initialized) {
            axiosRequest();
            return (<span>불러오기</span>);
        } else if(props.fetching) {
            return (<span>Loding...</span>);
        } else if(!props.succeed) {
            return (<span>Request Fail</span>);
        } else {
            return (<ul>
                {props.todos.map((todo,index) => 
                    <TodoItem {...todo} key={index} index={index} />
                )}
            </ul>);
        }
    }

    return (   
        // 변경될 사항. <TodoList todos={this.props.todos} />         
        <div>
        {stateText()}
        </div>
    )
}
const wrapedComponent = {};
export default connect<IStateProps, IDispatchProps, IOwnProps>(mapStateToProps, mapDispatchToProps)(TodoListFn);
    