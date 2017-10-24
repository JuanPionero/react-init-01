import * as React from "react";
import TodoList from "./TodoList";

class Root extends React.Component<IRootProps,IRootState> {
    constructor(props:IRootProps) {
        super(props);
        this.state = {
            todos:[],
            fetching:false,
            succeed:false
        }
    }

    componentDidMount() {
        this.sendRequest();
    }

    sendRequest() {
        const req = new XMLHttpRequest();
        req.open("GET",this.props.dataUrl,true);
        req.onreadystatechange = ()=> {
            if (req.readyState == 4) {
                if(req.status == 200) {
                    // Success
                    this.onRequestSucceed(JSON.parse(req.responseText));
                } else {
                    this.onRequestFailed();
                }
             }
        }
        this.setState({...this.state,fetching:true,succeed:false})
        setTimeout(()=>{  req.send(null); },1000);
        
    }

    onRequestSucceed(response:ITodo[]) {
        this.setState({todos:response,fetching:false,succeed:true});
    }

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

export default Root;