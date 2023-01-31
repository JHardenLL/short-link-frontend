import React from "react";
import '../style/shortlink.css'

class Shortlink extends React.Component{

    constructor(props){
        super(props);
        this.state={
            getedorigin:"",
            getedshort:"",
            myform:"",
            shorted:""
        }
    }

    getOrigin=(event)=>{
        this.setState({
            getedorigin:event.target.value
        })
    }

    getShort=(event)=>{
        this.setState({
            getedshort:event.target.value
        })
    }

    render(){
        return(
            <div className="mainbody">
                <div className="text">
                    <p>Shorten and personalize any link.</p>
                    <p>Get real-time traffic statistics for your links.Free service.</p>
                    <ol>
                        <li>
                            <p>Link to shorten</p>
                            <input type="text" onChange={this.getOrigin}></input>
                            <p>Customize your short link(optional):</p>
                            http://bit.do/<input type="text" onChange={this.getShort}></input>
                        </li>
                        <li>
                            Shorten your URL:
                            <input type="button" value="Shorten" onClick={()=>{
                                    this.state.myform = new FormData();
                                    this.state.myform.append("origin",this.state.getedorigin);
                                    this.state.myform.append("short",this.state.getedshort);
                                    fetch("http://localhost:3000/url/create",{
                                        method:"POST",
                                        headers:{"Authorization":"Bearer "+ this.props.responjwt},
                                        body:this.state.myform
                                    })
                                    .then(response=>response.json())
                                    .then(data=>{console.log(data);
                                        this.setState({
                                            shorted:data.urlinfo.short
                                        });
                                    })
                                    }
                                }>
                            </input>
                        </li>
                        <li>
                            <p>Generated Link:localhost:3000/{this.state.shorted}</p>     
                        </li>
                    </ol>
                    <input type="button" value="登出" onClick={()=>this.props.onClick()}></input>
                </div>
            </div>
        );
    }
}

export default Shortlink