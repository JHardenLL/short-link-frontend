import React from "react";
import { json } from "react-router-dom";

class Register extends React.Component{
    state={
        getedname:"",
        getedemail:"",
        getedpwd:""
    };

    getName=(event)=>{
        this.setState({
            getedname:event.target.value
        })
    }

    getEmail=(event)=>{
        this.setState({
            getedemail:event.target.value
        })
    }

    getPwd=(event)=>{
        this.setState({
            getedpwd:event.target.value
        })
    }

    render(){
        // const name=document.getElementsByName('name');
        // const email=document.getElementsByName('email');
        // const pwd=document.getElementsByName('pwd');
        return(
            <form method="post">
                name<input type="text" name="name" onChange={this.getName}></input><br />
                email<input type="text" name="email" onChange={this.getEmail}></input><br />
                password<input type="text" name="password" onChange={this.getPwd}></input><br />
                <input type="button" value="注册" onClick={()=>{
                    console.log(this.state.getedname);
                    console.log(this.state.getedemail);
                    console.log(this.state.getedpwd);
                    fetch("http://localhost:3000/user/register",{
                        method:"POST",
                        //mode:'no-cors',
                        //headers:"Access-Control-Allow-Methods",
                        headers:{'Content-Type':'application/json'},
                        body:JSON.stringify({
                            "name": this.state.getedname,
                            "email": this.state.getedemail,
                            "pwd": this.state.getedpwd
                        })
                    })
                    .then(response=>{console.log(response);console.log(response.json())})
                    .then(data=>console.log(data));
                }}>
                </input>
            </form>
        );
    }
}

export default Register