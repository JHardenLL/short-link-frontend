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
            <div>
                <input type="text" name="name" id="rgname" className="input-text" placeholder="username" onChange={this.getName}></input><br />
                <input type="text" name="email" id="rgemail" className="input-text" placeholder="email" onChange={this.getEmail}></input><br />
                <input type="text" name="password" id="rgpwd" className="input-text" placeholder="password" onChange={this.getPwd}></input><br />
                <input type="button" className="input-button" value="REGISTER" onClick={()=>{
                    document.getElementById("rgname").value="";
                    document.getElementById("rgemail").value="";
                    document.getElementById("rgpwd").value="";
                    console.log(this.state.getedname);
                    console.log(this.state.getedemail);
                    console.log(this.state.getedpwd);
                    fetch("http://localhost:3000/user/register",{
                        method:"POST",
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
            </div>
        );
    }
}

export default Register