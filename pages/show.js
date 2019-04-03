import React, {Component} from "react";
import axios from "axios";
import { withRouter } from "next/router";
import App from "../components/layouts/App";
import {Card, Icon } from "antd";
import moment from "moment";
import ReactHTMLParser from "react-html-parser";

class Show extends Component {
    state = {
        data: ""
    };

    componentDidMount() {
        let id = this.props.router.query.id;
        axios.get("/stories/" + id).then(res => {
            this.setState({
                data: res.data.story
            });
        });
    }

    render() {
        const {id, title, body, featured_image, reading_time, created_at} = this.state.data;
        return (
            <App style={{display: "flex", flexDirection: "row", backgroundColor: "#fff"}}>
                <img style={{"width": "100vw", "marginTop": "-40px", overflowX: "hidden"}} alt="example"
                     src={featured_image}/>
                <Card style={{}}>
                    <Card style={{"width": "85vw", "margin": "0 auto"}}>
                        <h1 style={{"fontSize": "3em"}}>{title}</h1>
                        <h4 style={{"color": "#333333", "textAlign": "justify"}}>
                            <span style={{"marginRight": "20px"}}><Icon type="clock-circle"
                                                                        style={{"marginRight": "3px"}}/>{reading_time}</span>
                            <span><Icon type="calendar"
                                        style={{"marginRight": "3px"}}/>{moment(created_at).fromNow()}</span>
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
                </Card>
                <Card>
                    <Icon type="edit"/>
                </Card>
            </App>
        );
    }
}

export default withRouter(Show);
