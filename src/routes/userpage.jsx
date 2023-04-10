import React from "react";

class Userpage extends React.Component{
    constructor(props){
        super(props);
        this.state={
            myform:""
        }
    }

    render(){
        return(
            <div>
                <input type="button" value="getinfo" onClick={()=>{
                    this.state.myform = new FormData();
                    this.state.myform.append("page",1);
                    fetch("http://localhost:3000/user/url/get",{
                        method:"POST",
                        // headers:{"Authorization":"Bearer "+ this.props.responjwt},
                        headers:{"Authorization":"Bearer "+ this.props.responjwt},
                        body:this.state.myform
                    })
                    .then(response=>response.json())
                    .then(data=>{console.log(data);
                            this.setState({
                            });
                        })
                }}>

                </input>
            </div>
        );
    }
}

export default Userpage
