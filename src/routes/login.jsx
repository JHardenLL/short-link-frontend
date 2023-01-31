import React from "react";
import Register from "./register";
import Shortlink from "./shortlink";

class Login extends React.Component{
    constructor(props){
        super(props);
        this.state={
            getedname:"",
            getedpwd:"",
            responcode:0,
            responjwt:""
        };
    }
    

    getName=(event)=>{
        this.setState({
            getedname:event.target.value
        })
    }

    getPwd=(event)=>{
        this.setState({
            getedpwd:event.target.value
        })
    }

    handleClick(){
        console.log(this.state.responcode)
        console.log(this.state.responjwt)
        fetch("http://localhost:3000/user/logout",{
            method:"POST",
            headers:{"Authorization":"Bearer "+ this.state.responjwt}
        })
        .then(response=>response.json())
        .then(data=>console.log(data))
        this.setState({
            responcode:0
        })
    }

    render(){
        if(0===this.state.responcode)
        return(
            <div>
                <Register/>
                name<input type="text" name="name" onChange={this.getName}></input><br />
                password<input type="text" name="password" onChange={this.getPwd}></input><br />
                <input type="button" value="登录" onClick={()=>{
                    console.log(this.state.getedname);
                    console.log(this.state.getedpwd);
                    fetch("http://localhost:3000/user/login",{
                        method:"POST",
                        headers:{'Content-Type':'application/json'},
                        body:JSON.stringify({
                            "name": this.state.getedname,
                            "pwd": this.state.getedpwd
                        })
                    })
                    .then(response=>response.json())
                    .then(data=>{console.log(data);
                            console.log(data.code);
                            this.setState({
                                responcode:data.code,
                                responjwt:data.jwt
                            });
                            // console.log(this.state.responcode)这里会显示0，要整个onClick结束以后responcode才会变
                        })
                }}>
                </input>
            </div>
        );
        else if(200===this.state.responcode){
            return (
                <Shortlink onClick={()=>this.handleClick()} responjwt={this.state.responjwt}/>
            );
        }
        else{
            return(
                <div>
                    <Register/>
                    <h2>请输入正确的用户名和密码</h2>
                    name<input type="text" name="name" onChange={this.getName}></input><br />
                    password<input type="text" name="password" onChange={this.getPwd}></input><br />
                    <input type="button" value="登录" onClick={()=>{
                        console.log(this.state.getedname);
                        console.log(this.state.getedpwd);
                        fetch("http://localhost:3000/user/login",{
                            method:"POST",
                            headers:{'Content-Type':'application/json'},
                            body:JSON.stringify({
                                "name": this.state.getedname,
                                "pwd": this.state.getedpwd
                            })
                        })
                        .then(response=>response.json())
                        .then(data=>{console.log(data);
                                console.log(data.code);
                                this.setState({
                                    responcode:data.code,
                                    responjwt:data.jwt
                                });
                                // console.log(this.state.responcode)这里会显示0，要整个onClick结束以后responcode才会变
                            })
                    }}>
                    </input>
                </div>
            );
        }
    }
}

export default Login