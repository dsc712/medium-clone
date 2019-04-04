import React, {Component} from "react";
import axios from "axios";
import { withRouter } from "next/router";
import App from "../components/layouts/App";
import {Card, Icon, Affix, Row, Col, Avatar } from "antd";
import moment from "moment";
import ReactHTMLParser from "react-html-parser";

class Show extends Component {
    state = {
        data: "",
        isBookmarked: false,
    };

    componentDidMount() {
        let id = this.props.router.query.id;
        axios.get("/stories/" + id).then(res => {
            console.log(res.data);
            this.setState({
                data: res.data.story,
            });
        });
    }

    changeBookmark = () => {
        this.setState(state => {
            return {
                isBookmarked: !state.isBookmarked,
            }
        });
        console.log("book hai?"+this.state.isBookmarked);
        if (this.state.isBookmarked == true) {
            this.addBookmark
        }
    };
    isBookmarked = () => {
        if (this.state.isBookmarked == false) {
            return "outlined";
        }
        return "filled";
    };

    addBookmark = async () => {
        const {data} = await axios.put("/book/add/" + this.state.data.id).then(res=>{
            notification.success({message:"ho gaya bhai"});
        });
    };

    render() {
        const {id, title, body, featured_image, reading_time, created_at, user } = this.state.data;
        console.log("writer", user);
        return (
            <App style={{display: "flex", flexDirection: "row", backgroundColor: "#fff"}}>
                <img style={{"width": "100vw", "marginTop": "-40px", overflowX: "hidden"}} alt="example"
                     src={featured_image}/>
                <Card>
                    <Row>
                        <Col span={1}>
                            <Affix offsetTop={200}>
                                <div style={{
                                    height: "30vh",
                                    fontSize: "24px",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "space-between"
                                }}>
                                    <Icon type="book" size="large" theme={this.isBookmarked()}
                                          onClick={this.changeBookmark}
                                          style={{color: '#000'}}/>
                                    <Icon size="large" type="share-alt"/>
                                    <Icon size="large" type="facebook"/>
                                    <Icon size="large" type="twitter" theme="outlined"/>
                                </div>
                            </Affix>
                        </Col>

                        <Col span={23}>
                            <Card style={{"width": "85vw", "margin": "0 auto"}}>
                                <h1 style={{"fontSize": "3em"}}>{title}</h1>
                                <h4 style={{"color": "#333333", "textAlign": "justify"}}>
                                <span style={{"marginRight": "20px"}}>
                                    <Icon type="clock-circle" style={{"marginRight": "3px"}}/>{reading_time}
                                </span>
                                        <span>
                                    <Icon type="calendar" style={{"marginRight": "3px"}}/>{moment(created_at).fromNow()}
                                </span>
                                </h4>
                                <h4 style={{ "marginTop": "25px"}}>
                                    { user && user.photo ? <Avatar src={ user.photo } />  : <Avatar style={{ backgroundColor: "#f56a00"}} icon="user" />}
                                   <span> { user && user.name } ( {user && user.email}  ) </span>
                                </h4>
                            </Card>

                            <div
                                style={{
                                    textAlign: "justify",
                                    margin: "auto",
                                    padding: "100px",
                                    fontSize: "1.5em"
                                }}
                            >
                                {ReactHTMLParser(body)}
                            </div>
                        </Col>
                    </Row>
                </Card>

                <Card>
                    <Icon type="edit"/>
                </Card>


            </App>
        );
    }
}

export default withRouter(Show);
