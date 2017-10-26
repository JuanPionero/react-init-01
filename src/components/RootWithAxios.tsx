import * as React from "react";
import TodoList from "./TodoList";
import HttpRequest, {IXhrSuccess,IXhrError,IXhrConfig} from "../modules/HttpRequest"
import axios , {AxiosResponse} from "axios";

class RootWithAxios extends React.Component<IRootProps,IRootState> {
    constructor(props:IRootProps) {
        super(props);
        this.state = {
            todos:[],
            fetching:false,
            succeed:false
        }
    }

    componentDidMount() {
       // this.sendRequest();
       // 대신 간단하게 만든 ajax 모듈을 사용한다.
       // this.ajaxRequest();
       this.axiosRequest();
    }

    // 기성 모듈 axois 의 적용.
    axiosRequest() {
        axios
            .get(this.props.dataUrl)
            .then(this.onAxiosRequestSuccess, this.onRequestSucceed.bind(this));
    }

    // 본인이 만든 ajax 통신 적용.
    ajaxRequest() {
        const ajax = new HttpRequest();
        this.setState({...this.state,fetching:true,succeed:false});
        ajax
            .exec(this.props.dataUrl)
            .then(this.onRequestSucceed, this.onRequestSucceed.bind(this));
    }

    /*
    // 일반 형태의 함수
    onRequestSucceed(response:ITodo[]) {
        this.setState({todos:response,fetching:false,succeed:true});
    }*/
    // Arrow Function
    // onRequestSucceed = (response:ITodo[]) => this.setState({todos:response,fetching:false,succeed:true});
    onRequestSucceed : IXhrSuccess = (response:any) : void => { 
        this.setState({todos:JSON.parse(response) as ITodo[],fetching:false,succeed:true}); 
    };

    // axios에서 callback 의 arguments shape가 특화되어 있다. (AxiosResponse)
    onAxiosRequestSuccess = (response:AxiosResponse) : void => {        
        this.setState({todos:response.data as ITodo[],fetching:false,succeed:true}); 
    }
    
    // Normal Function
    onRequestFailed() {
        this.setState({todos:[],fetching:false,succeed:false});
    }

    stateText() {
        if(this.state.fetching) {
            return (<span>Loding...</span>);
        } else if(!this.state.succeed) {
            return (<span>Request Fail</span>);
        } else {
            return (<TodoList todos={this.state.todos} />);
        }
    }

    render() {
        
        return (   
            // 변경될 사항. <TodoList todos={this.props.todos} />         
            <div>{this.stateText()}  
            </div>
        )
    }
}

export default RootWithAxios;