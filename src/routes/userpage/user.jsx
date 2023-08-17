import React,{ useState, useEffect } from "react";
import { Avatar, List, Col, Divider, Row, Input, Form} from 'antd';
import '../../style/user.css'


export default function User(props) {
    const [id, setId] = useState(-1);
    const [name, setName] = useState("");
    const [email, setMail] = useState("");
    // const [pwd,setPwd] = useState(0);
    const [tomodify, setTomodify] = useState(0);

    const fetchInfo = () => {
        fetch(`http://localhost:8080/api/user/info`, {
            method: "GET",
            credentials: 'include',
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            setId(data.data.id);
            setName(data.data.name)
            setMail(data.data.email)
        })
        .catch(error => console.error('Error fetching data:', error));
    };

    useEffect(() => {
        fetchInfo();
    }, []);

    if(0===tomodify)
    return (
        <>
            <Row>
                <Col className="arrowbase" flex={2}>
                    <input className="arrow" type="button" value="user-info" />
                    <br />
                    <input className="arrow" type="button" value="modify-info" onClick={()=>
                        setTomodify(1)
                    }/>
                    <br />
                    <input className="arrow" type="button" value="modify-password" onClick={()=>
                        setTomodify(2)
                    }/>
                    <br />
                    <input type="button" className="quit-btn" value="quit" onClick={props.onClick}></input>
                </Col>
                <Col flex={3}>
                    <div className="info-container">
                        <div className="info">
                            <a className="label">Email</a>
                            <p className="value">{email}</p>
                        </div>
                        <div className="info">
                            <a className="label">Name</a>
                            <p className="value">{name}</p>
                        </div>
                        <div className="info">
                            <a className="label">ID</a>
                            <p className="value">{id}</p>
                        </div>
                    </div>
                </Col>
            </Row>
        </>
    );
    else if (2===tomodify)
    return(
        <>
            <Row>
                <Col className="arrowbase" flex={2}>
                    <input className="arrow" type="button" value="user-info" onClick={()=>{
                        setTomodify(0);
                    }} />
                    <br />
                    <input className="arrow" type="button" value="modify-info" onClick={()=>{
                        setTomodify(1);
                    }} />
                    <br />
                    <input type="button" className="quit-btn" value="quit" onClick={props.onClick}></input>
                </Col>
                <Col className="contentbox" flex={3}>
                    <div className="box">
                        <p>旧密码</p>
                        <input type="password" />
                    </div>
                    <div className="box">
                        <p>新密码</p>
                        <input type="password" />
                    </div>
                    <div className="box">
                        <p>确认新密码</p>
                        <input type="password" />
                    </div>
                    
                </Col>
            </Row>
        </>
        );
        else if (2===tomodify){
            return(
                <>
                    <Row>
                        <Col className="arrowbase" flex={2}>
                            <input className="arrow" type="button" value="user-info" onClick={()=>{
                                setTomodify(0);
                            }} />
                            <br />
                            <input className="arrow" type="button" value="modify-info" onClick={()=>{
                                setTomodify(1);
                            }} />
                            <br />
                            <input type="button" className="quit-btn" value="quit" onClick={props.onClick}></input>
                        </Col>
                        <Col className="contentbox" flex={3}>
                            <div className="box">
                                <p>旧密码</p>
                                <input type="password" />
                            </div>
                            <div className="box">
                                <p>新密码</p>
                                <input type="password" />
                            </div>
                            <div className="box">
                                <p>确认新密码</p>
                                <input type="password" />
                            </div>
                            
                        </Col>
                    </Row>
                </>
                );
        }
}
