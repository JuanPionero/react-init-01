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
            req.onreadystatechange = () => {
                console.log("onreadystatechange: [req]" + req);
                if (req.readyState == 4) {
                    if(req.status == 200) {
                        // Success
                        resolve(JSON.parse(req.responseText));
                    } else {
                        reject();
                    }
                }
            }
            req.onload = () => {
                console.log("onload: [req]" + req);
            };
            req.onerror = () => {
                console.log("onerror: [req]" + req);
            }

            this.setState({...this.state,fetching:true,succeed:false})
            setTimeout(()=>{  
                req.send(null); // 보내고 나서 기다림. 동기화된 요청을 보냄.
            },1000);
        });

        // bind의 필요성을 잊지 말자.
        // prom.then(this.onRequestSucceed.bind(this),this.onRequestFailed.bind(this));
        
        // this.onRequestSucceed is arrow function
        // this.onRequestFailed is normal function, then it needs .bind(this)
        prom.then(this.onRequestSucceed,this.onRequestFailed.bind(this));
        
    }

    /*
    // 일반 형태의 함수
    onRequestSucceed(response:ITodo[]) {
        this.setState({todos:response,fetching:false,succeed:true});
    }*/
    onRequestSucceed = (response:ITodo[]) => this.setState({todos:response,fetching:false,succeed:true});
    
    // Arrow Function
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

export default RootPromise;