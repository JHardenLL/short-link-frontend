import React from "react";
import Infopage from "./infopage/infoindex";
import User from "./userpage/user";
import '../style/shortlink.css'

class Shortlink extends React.Component{

    constructor(props){
        super(props);
        this.state={
            getedorigin:"",
            getedorigin2:"",
            getedorigin3:"",
            getedshort:"",
            getedshort2:"",
            getedshort3:"",
            getedcomment:"",
            getedcomment2:"",
            getedcomment3:"",
            myform:"",
            linkid:"",
            shorted:"",
            deleteid:"",
            gotoinfo:0,
            msg_create:""
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

    getShort2=(event)=>{
        this.setState({
            getedshort2:event.target.value
        })
    }

    getShort3=(event)=>{
        this.setState({
            getedshort3:event.target.value
        })
    }

    getComment=(event)=>{
        this.setState({
            getedcomment:event.target.value
        })
    }

    getComment3=(event)=>{
        this.setState({
            getedcomment:event.target.value
        })
    }

    getDeleteid=(event)=>{
        this.setState({
            deleteid:event.target.value
        })
    }

    //modify
    getFormattedUTC(date = new Date()) {
        const year = date.getUTCFullYear();
        const month = String(date.getUTCMonth() + 1).padStart(2, '0');
        const day = String(date.getUTCDate()).padStart(2, '0');
        const hours = String(date.getUTCHours()).padStart(2, '0');
        const minutes = String(date.getUTCMinutes()).padStart(2, '0');
        const seconds = String(date.getUTCSeconds()).padStart(2, '0');
      
        return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`;
      }
      //modified

    quitInfopage(){
        this.setState({
            gotoinfo:0
        })
    }

    render(){
        if(0==this.state.gotoinfo)
        return(
            <div className="mainbody">
                <div className="text">
                    <div style={{paddingLeft:190,paddingBottom:15}}><h2 style={{marginBottom:5}}>Shorten and personalize any link.</h2></div>
                    <div style={{paddingLeft:190}}><h3>Get real-time traffic statistics for your links.</h3></div>
                    <div style={{paddingLeft:190,paddingBottom:15}}><h3>Free service.</h3></div>
                    <div className="contain">
                    {/* <ol> */}
                        {/* <li> */}
                        <div className="case">
                            <div className="caseinside">
                            <p>Link to shorten</p>
                            <input type="text" className="input-txt" id="linktoshort" onChange={this.getOrigin}></input>
                            <p>Customize your short link(optional):</p>
                            http://localhost:8080/<input type="text" id="diy" className="input-txt_" onChange={this.getShort}></input>
                            <p>optional comment</p>
                            <input type="text" className="input-txt" id="commit" onChange={this.getComment}></input>
                            <br />
                            <input type="button" className="input-btn" value="Shorten" onClick={()=>{
                                    //modify
                                    const currentUTC = new Date();
                                    const formattedUTC1 = this.getFormattedUTC(currentUTC);
                                    console.log(formattedUTC1);
                                    // 将获取到的 UTC 时间加上 24 小时
                                    currentUTC.setUTCHours(currentUTC.getUTCHours() + 24);
                                    const formattedUTC2 = this.getFormattedUTC(currentUTC);
                                    console.log(formattedUTC2);

                                    fetch("http://localhost:8080/api/link/create",{
                                        credentials: 'include',
                                        method:"POST",
                                        headers:{
                                            'Content-Type': 'application/json',
                                        },
                                        body:JSON.stringify({
                                            "short": this.state.getedshort,
                                            "origin": this.state.getedorigin,
                                            "comment": this.state.getedcomment,
                                            "start_time": formattedUTC1,
                                            "end_time": formattedUTC2
                                        })
                                    })
                                    .then(response=>response.json())
                                    .then(data=>{
                                        console.log(data);
                                        if(data.data)
                                            this.setState({
                                                msg_create:data.msg,
                                                shorted:data.data.short
                                            });
                                        else{
                                            this.setState({
                                                msg_create:data.msg
                                            });
                                        }
                                        // document.getElementById('shortenmsg').innerText=data.msg
                                        document.getElementById('generated').value=data.data.short;
                                    });
                                    document.getElementById("linktoshort").value="";
                                    document.getElementById("diy").value="";
                                    document.getElementById("commit").value="";
                                    //modified
                                    }
                                }>
                            </input>
                            </div>
                        </div>
                        {/* </li>
                        <li> */}
                        <div className="case">
                        <div>
                            <p>Generated Link</p><br />
                            <p>ID:{this.state.linkid}</p><br/>
                            <p>Generated Link:(valid for 24h)</p>
                            <input type="text" className="input-txt" id="generated"></input>
                            <br />
                            <p id="shortenmsg" style={{fontSize:20, color:'red'}}>{this.state.msg_create}</p>
                        </div>
                        </div>

                        <div className="case">
                        <div>
                            input id to PAUSE certain short link:<br/>
                            <input type="text" className="input-txt" id="pause"></input><br/>
                            <input type="button" className="input-btn" value="pause" onClick={()=>{
                                    this.state.myform = new FormData();
                                    this.state.myform.append("id",document.getElementById('pause').value);
                                    fetch("http://localhost:3000/url/pause",{
                                        method:"POST",
                                        headers:{"Authorization":"Bearer "+ this.props.responjwt},
                                        body:this.state.myform
                                    })
                                    .then(response=>response.json())
                                    .then(data=>{console.log(data);
                                        document.getElementById('pausemsg').innerText=data.msg
                                    });
                                    }
                                }>
                            </input>
                            <p id="pausemsg" style={{fontSize:20, color:'red'}}></p>
                        </div>
                        </div>

                        <div className="case">
                        <div>
                            input the short link you want to DELETE:<br/>
                            <input type="text" className="input-txt" id="delete" onChange={this.getDeleteid}></input><br/>
                            <input type="button" className="input-btn" value="delete" onClick={()=>{
                                    //modify
                                    fetch("http://localhost:8080/api/link/delete",{
                                        method:"POST",
                                        credentials: 'include', // 开启凭据支持
                                        headers:{
                                            'Content-Type': 'application/json',
                                        },
                                        body:JSON.stringify({
                                            "short":this.state.deleteid
                                        })
                                    })
                                    .then(response=>response.json())
                                    .then(data=>{console.log(data);
                                        document.getElementById('deletemsg').innerText=data.msg//可能还要修改
                                    });
                                    //modified
                                    }
                                }>
                            </input>
                            <p id="deletemsg" style={{fontSize:20, color:'red'}}></p>
                        </div>
                        </div>
                        <div className="case">
                        <div>
                            <br />
                            <p>UPDATE certain shortlink for 24h</p>
                            {/* <input type="text" className="input-txt" id="update" placeholder="please input the link ID"></input><br/> */}
                            <input type="text" className="input-txt" id="newshort" onChange={this.getShort3} placeholder="please input the shorted"></input><br/>
                            <input type="text" className="input-txt"  onChange={this.getOrigin3} placeholder="please input the shorted"></input><br/>
                            <input type="text" className="input-txt" id="comment" onChange={this.getComment3} placeholder="whatever you want to say(optional)"></input><br/>                           
                            <input type="button" className="input-btn" value="update"onClick={()=>{
                                    var ret_ori="";
                                    var ret_com="";
                                    var ret_act=0;
                                    fetch(`http://localhost:8080/api/link/info?short=${this.state.getedshort3}`,{
                                        method:"GET",
                                        credentials: 'include',
                                    })
                                    .then(response=>{
                                        console.log("response");
                                        console.log(response);
                                        return response.json();
                                    })
                                    .then(
                                        data=>{
                                            console.log(data);
                                            ret_ori=data.data.origin;
                                            ret_com=data.data.comment;
                                            ret_act=data.data.active;
                                    });
                                    //modify
                                    const currentUTC = new Date();
                                    const formattedUTC1 = this.getFormattedUTC(currentUTC);
                                    console.log(formattedUTC1);
                                    // 将获取到的 UTC 时间加上 24 小时
                                    currentUTC.setUTCHours(currentUTC.getUTCHours() + 24);
                                    const formattedUTC2 = this.getFormattedUTC(currentUTC);
                                    console.log(formattedUTC2);
                                    fetch("http://localhost:8080/api/link/info",{                                       
                                        method:"POST",
                                        credentials: 'include', // 开启凭据支持
                                        headers:{
                                            'Content-Type': 'application/json',
                                        },
                                        body:JSON.stringify({
                                            "short": this.state.getedshort3,
                                            "origin": ret_ori,
                                            "comment": ret_com,
                                            "start_time": formattedUTC1,
                                            "end_time": formattedUTC2,
                                            "active":ret_act
                                        })
                                    })
                                    .then(response=>{
                                        console.log("response")
                                        console.log(response);
                                        return response.json();
                                        // return response
                                    })
                                    .then(data=>{
                                        console.log("data");
                                        console.log(data);
                                    });
                                    }
                                }>
                            </input>
                        </div>
                        </div>

                        <div className="case">
                        <div>
                            <p>QUERY certain shortlink</p>
                            <input type="text" className="input-txt" id="query" onChange={this.getShort2} placeholder="use the short to search" id="query"></input>
                            <input type="button" className="input-btn__" value="query"onClick={()=>{
                                    fetch(`http://localhost:8080/api/link/info?short=${this.state.getedshort2}`,{
                                        method:"GET",
                                        credentials: 'include',
                                    })
                                    .then(response=>response.json())
                                    .then(
                                        data=>{console.log(data);
                                        document.getElementById("querymsg").innerText=data.msg
                                        document.getElementById("queryorigin").value=data.data.origin
                                        document.getElementById("queryshort").value=data.data.short
                                    });
                                    }
                                }>
                            </input>
                            <p id="querymsg" style={{fontSize:20, color:'red',marginTop:-5}}></p>
                            Link infomation
                            <input id="queryorigin" className="input-txt" placeholder="queried origin link"></input>
                            <input id="queryshort" className="input-txt" placeholder="queried short link"></input>
                        </div>
                        </div>
                    </div>
                    <input type="button" className="input-btn_" value="more" onClick={()=>{
                            this.setState({
                                gotoinfo:1
                            });
                        }
                    }></input>
                    <input type="button" className="input-btn_" value="user" onClick={()=>{
                            this.setState({
                                gotoinfo:2
                            });
                        }
                    }></input>
                    <input type="button" className="input-btn_" value="logout" onClick={()=>this.props.onClick()}></input>
                </div>
            </div>
        );
        else if(1==this.state.gotoinfo)
        return(<Infopage onClick={()=>this.quitInfopage()}/>);
        else if(2==this.state.gotoinfo)
        return(<User onClick={()=>this.quitInfopage()}/>);
    }
}

export default Shortlink