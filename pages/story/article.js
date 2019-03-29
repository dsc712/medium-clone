import React, {Component} from "react";
import axios from "axios";
import App from "../../components/layouts/App";
import Link from "next/link";
import {Icon,Layout,Card} from "antd";


const {Header, Content, Footer} = Layout;


export class Article extends Component {
    state={
        title:"my story title",
        content:[],
        img_url:"",
    };
    async fetchArticle() {
        const res = await axios.get(`/stories`);
        // this.setState({title: (results[0]).title });
        console.log("ashwani============================================="+res);


    }

    componentDidMount() {
        this.fetchArticle();
    }

    render() {
        return (
            <App style={{display: "flex", flexDirection: "column"}}>
                <div className="article">
                   <Card title={this.state.title} >


                   </Card>

                </div>
            </App>
        );
    }
}

export default Article;