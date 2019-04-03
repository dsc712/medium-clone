import React, {Component} from "react";
import axios from "axios";
import App from "../../components/layouts/App";
import { withRouter } from "next/router";
import ReactHtmlParser from "react-html-parser";
import Link from "next/link";
import {Icon, Menu, Layout, notification, Card, Avatar, PageHeader} from "antd";

const {Meta} = Card;

const {SubMenu} = Menu;
const {Header, Content, Footer, Sider} = Layout;


export class Article extends Component {
    state = {
        title: "my story title set in state",
        content: '',
        img_url: "",
        created_date: "today",
        writer_id: "",
        username: "",

    };

    async fetchUserData(writer_id) {
        try {
            const {data} = await axios.get(`/users/` + writer_id);

            const username = data.data[0].name;
            console.log("response user data");
            console.log(data);

            if (username) {
                this.setState({
                    username: username,
                });
            }
        } catch (err) {
            if (err.response) {
                notification.error({message: err.response.data.message});
            } else {
                notification.error({message: err.message});
                throw err;
            }
        }
    }

    async fetchArticle() {
        try {
            let id = this.props.router.query.id;
            // axios.get("/stories/" + id).then(res => {
            //     this.setState({
            //         data: res.data.story
            //     });
            // });
            const {data} = await axios.get(`/stories/`+id);

            console.log("response data");
            console.log(data.story);
            const articleData = data.story;

            const title = articleData.title;
            const body = articleData.body;
            const imgurl = articleData.featured_image;
            const writer_id = articleData.writer_id;
            const dated = articleData.created_at;
            this.setState({
                title: title,
                content: body,
                img_url: imgurl,
                writer_id: writer_id,
                created_date: dated,
            });
            this.fetchUserData(writer_id);
        } catch (err) {
            if (err.response) {
                notification.error({message: err.response.data.message});
            } else {
                notification.error({message: err.message});
                throw err;
            }
        }

    }

    showImg() {
        if (this.state.img_url)
            return <img src={this.state.img_url} style={{  width: "85vw"}}/>
    }

    componentDidMount() {
        this.fetchArticle();
    }

    render() {
        return (
            <App style={{display: "flex", flexDirection: "column"}}>
                {this.showImg()}
                <div style={{display:'flex'}}>

                <Layout className="article" style={{width: 1200}}>

                    <Sider width={100} style={{
                        background: 'rgba(255,255,255,0)',
                        overflow: 'auto', height: '100%',
                        display: "flex",
                        justifyContent: "center",
                        position: 'fixed', left: 0, top: 64
                    }}>
                        <div>
                            <ul style={{
                                'listStyle': 'none',
                                margin: 32,
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                            }}>
                                <li style={{margin: 42}}>
                                    <svg className="svgIcon-use" width="33" height="33">
                                        <path
                                            d="M28.86 17.342l-3.64-6.402c-.292-.433-.712-.729-1.163-.8a1.124 1.124 0 0 0-.889.213c-.63.488-.742 1.181-.33 2.061l1.222 2.587 1.4 2.46c2.234 4.085 1.511 8.007-2.145 11.663-.26.26-.526.49-.797.707 1.42-.084 2.881-.683 4.292-2.094 3.822-3.823 3.565-7.876 2.05-10.395zm-6.252 11.075c3.352-3.35 3.998-6.775 1.978-10.469l-3.378-5.945c-.292-.432-.712-.728-1.163-.8a1.122 1.122 0 0 0-.89.213c-.63.49-.742 1.182-.33 2.061l1.72 3.638a.502.502 0 0 1-.806.568l-8.91-8.91a1.335 1.335 0 0 0-1.887 1.886l5.292 5.292a.5.5 0 0 1-.707.707l-5.292-5.292-1.492-1.492c-.503-.503-1.382-.505-1.887 0a1.337 1.337 0 0 0 0 1.886l1.493 1.492 5.292 5.292a.499.499 0 0 1-.353.854.5.5 0 0 1-.354-.147L5.642 13.96a1.338 1.338 0 0 0-1.887 0 1.338 1.338 0 0 0 0 1.887l2.23 2.228 3.322 3.324a.499.499 0 0 1-.353.853.502.502 0 0 1-.354-.146l-3.323-3.324a1.333 1.333 0 0 0-1.886 0 1.325 1.325 0 0 0-.39.943c0 .356.138.691.39.943l6.396 6.397c3.528 3.53 8.86 5.313 12.821 1.353zM12.73 9.26l5.68 5.68-.49-1.037c-.518-1.107-.426-2.13.224-2.89l-3.303-3.304a1.337 1.337 0 0 0-1.886 0 1.326 1.326 0 0 0-.39.944c0 .217.067.42.165.607zm14.787 19.184c-1.599 1.6-3.417 2.392-5.353 2.392-.349 0-.7-.03-1.058-.082a7.922 7.922 0 0 1-3.667.887c-3.049 0-6.115-1.626-8.359-3.87l-6.396-6.397A2.315 2.315 0 0 1 2 19.724a2.327 2.327 0 0 1 1.923-2.296l-.875-.875a2.339 2.339 0 0 1 0-3.3 2.33 2.33 0 0 1 1.24-.647l-.139-.139c-.91-.91-.91-2.39 0-3.3.884-.884 2.421-.882 3.301 0l.138.14a2.335 2.335 0 0 1 3.948-1.24l.093.092c.091-.423.291-.828.62-1.157a2.336 2.336 0 0 1 3.3 0l3.384 3.386a2.167 2.167 0 0 1 1.271-.173c.534.086 1.03.354 1.441.765.11-.549.415-1.034.911-1.418a2.12 2.12 0 0 1 1.661-.41c.727.117 1.385.565 1.853 1.262l3.652 6.423c1.704 2.832 2.025 7.377-2.205 11.607zM13.217.484l-1.917.882 2.37 2.837-.454-3.719zm8.487.877l-1.928-.86-.44 3.697 2.368-2.837zM16.5 3.293L15.478-.005h2.044L16.5 3.293z"
                                            fillRule="evenodd"></path>
                                    </svg>
                                </li>

                                <li style={{margin: 42}}>
                                    <Icon type="book" style={{fontSize: '32px', color: '#08c'}}/>
                                </li>
                                <li style={{margin: 42}}>
                                    <svg className="svgIcon-use" width="29" height="29">
                                        <path
                                            d="M22.053 7.54a4.474 4.474 0 0 0-3.31-1.455 4.526 4.526 0 0 0-4.526 4.524c0 .35.04.7.082 1.05a12.9 12.9 0 0 1-9.3-4.77c-.39.69-.61 1.46-.65 2.26.03 1.6.83 2.99 2.02 3.79-.72-.02-1.41-.22-2.02-.57-.01.02-.01.04 0 .08-.01 2.17 1.55 4 3.63 4.44-.39.08-.79.13-1.21.16-.28-.03-.57-.05-.81-.08.54 1.77 2.21 3.08 4.2 3.15a9.564 9.564 0 0 1-5.66 1.94c-.34-.03-.7-.06-1.05-.08 2 1.27 4.38 2.02 6.94 2.02 8.31 0 12.86-6.9 12.84-12.85.02-.24.01-.43 0-.65.89-.62 1.65-1.42 2.26-2.34-.82.38-1.69.62-2.59.72a4.37 4.37 0 0 0 1.94-2.51c-.84.53-1.81.9-2.83 1.13z"></path>
                                    </svg>
                                </li>
                            </ul>
                        </div>
                    </Sider>
                    <Layout style={{marginLeft: 100}}>
                        <PageHeader style={{background: '#fff', margin: '8px 4px 0'}}
                                    title={this.state.title}
                                    subTitle="">
                            <div className="wrap">

                                <p>
                                    Published By:
                                    <br/>
                                    <Icon type="user"/> <b>{this.state.username} </b>
                                    on { Date(this.state.created_date)}
                                </p>
                            </div>
                        </PageHeader>
                        <Content style={{margin: '24px 16px 0', overflow: 'initial'}}>
                            <div style={{padding: 24, background: '#fff', textAlign: 'left'}}>

                                {ReactHtmlParser(this.state.content)}

                            </div>
                        </Content>
                    </Layout>
                </Layout>
                </div>
            </App>
        );

    }
}

export default  withRouter(Article);