import * as React from "react";
import TodoList from "./TodoList";

class RootPromise extends React.Component<IRootProps,IRootState> {
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
        const prom = new Promise((resolve,reject)=>{
            const req = new XMLHttpRequest();
            // 동기로 실행.
            req.open("GET",this.props.dataUrl,false);

            this.setState({...this.state,fetching:true,succeed:false})
            setTimeout(()=>{  
                req.send(null);
                // 보내고 나서 기다림. 동기화된 요청을 보냄.
                if (req.readyState == 4) {
                    if(req.status == 200) {
                        // Success
                        resolve(JSON.parse(req.responseText));
                    } else {
                        reject();
                    }
                 }
            },1000);
        });
        prom.then(this.onRequestSucceed,this.onRequestFailed);
        
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