import React, {Component} from "react";
import {withRouter} from "next/router";
import axios from "axios";
import App from "../components/layouts/App";
import {Card, Icon, notification, Layout, Button, Radio, BackTop} from "antd";

const {Header, Content, Footer, Sider} = Layout;

const {Meta} = Card;
import ReactHTMLParser from "react-html-parser";

class show extends Component {
    state = {
        data: "", writer_id: "",
        username: "",
        isBoookmarked:"",
    };

    addBookmark=()=>{i
        this.setState({isBookmarked:"filled"});
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

    componentDidMount() {
        let id = this.props.router.query.id;
        axios.get("/stories/" + id).then(res => {
            this.setState({
                data: res.data.story
            });
            this.fetchUserData(this.state.writer_id);
        });
    }

    render() {
        const {id, title, body, featured_image} = this.state.data;
        return (
            <App style={{display: "flex", flexDirection: "row"}}>
                <div>
                    <img style={{"width": "100vw", "marginTop": "-40px", overflowX: "hidden"}} alt="example"
                         src={featured_image}/>
                </div>
                <div style={{
                    display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly',
                    alignItems: 'stretch',
                }}>
                    {/*side bar for clapls*/}
                    <div style={{
                        width: "5vw",
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center'
                    }}>
                        <div>
                            <svg className="svgIcon-use" width="33" height="33">
                                <path
                                    d="M28.86 17.342l-3.64-6.402c-.292-.433-.712-.729-1.163-.8a1.124 1.124 0 0 0-.889.213c-.63.488-.742 1.181-.33 2.061l1.222 2.587 1.4 2.46c2.234 4.085 1.511 8.007-2.145 11.663-.26.26-.526.49-.797.707 1.42-.084 2.881-.683 4.292-2.094 3.822-3.823 3.565-7.876 2.05-10.395zm-6.252 11.075c3.352-3.35 3.998-6.775 1.978-10.469l-3.378-5.945c-.292-.432-.712-.728-1.163-.8a1.122 1.122 0 0 0-.89.213c-.63.49-.742 1.182-.33 2.061l1.72 3.638a.502.502 0 0 1-.806.568l-8.91-8.91a1.335 1.335 0 0 0-1.887 1.886l5.292 5.292a.5.5 0 0 1-.707.707l-5.292-5.292-1.492-1.492c-.503-.503-1.382-.505-1.887 0a1.337 1.337 0 0 0 0 1.886l1.493 1.492 5.292 5.292a.499.499 0 0 1-.353.854.5.5 0 0 1-.354-.147L5.642 13.96a1.338 1.338 0 0 0-1.887 0 1.338 1.338 0 0 0 0 1.887l2.23 2.228 3.322 3.324a.499.499 0 0 1-.353.853.502.502 0 0 1-.354-.146l-3.323-3.324a1.333 1.333 0 0 0-1.886 0 1.325 1.325 0 0 0-.39.943c0 .356.138.691.39.943l6.396 6.397c3.528 3.53 8.86 5.313 12.821 1.353zM12.73 9.26l5.68 5.68-.49-1.037c-.518-1.107-.426-2.13.224-2.89l-3.303-3.304a1.337 1.337 0 0 0-1.886 0 1.326 1.326 0 0 0-.39.944c0 .217.067.42.165.607zm14.787 19.184c-1.599 1.6-3.417 2.392-5.353 2.392-.349 0-.7-.03-1.058-.082a7.922 7.922 0 0 1-3.667.887c-3.049 0-6.115-1.626-8.359-3.87l-6.396-6.397A2.315 2.315 0 0 1 2 19.724a2.327 2.327 0 0 1 1.923-2.296l-.875-.875a2.339 2.339 0 0 1 0-3.3 2.33 2.33 0 0 1 1.24-.647l-.139-.139c-.91-.91-.91-2.39 0-3.3.884-.884 2.421-.882 3.301 0l.138.14a2.335 2.335 0 0 1 3.948-1.24l.093.092c.091-.423.291-.828.62-1.157a2.336 2.336 0 0 1 3.3 0l3.384 3.386a2.167 2.167 0 0 1 1.271-.173c.534.086 1.03.354 1.441.765.11-.549.415-1.034.911-1.418a2.12 2.12 0 0 1 1.661-.41c.727.117 1.385.565 1.853 1.262l3.652 6.423c1.704 2.832 2.025 7.377-2.205 11.607zM13.217.484l-1.917.882 2.37 2.837-.454-3.719zm8.487.877l-1.928-.86-.44 3.697 2.368-2.837zM16.5 3.293L15.478-.005h2.044L16.5 3.293z"
                                    fillRule="evenodd"></path>
                            </svg>
                        </div>

                        <div>
                            <Button   size="large"
                                      // type="primary"
                                onClick={this.addBookmark}
                                      shape="circle" >
                                <Icon type="book" size="large"  theme={this.state.isBookmarked}/>
                            </Button>
                        </div>
                    </div>
                    {/*heading, author and article body*/}
                    <div style={{width: "90vw"}}>
                        <Card style={{textAlign: "left"}}>
                            <h1 style={{"fontSize": "3em"}}>{title}</h1>
                            <div className="wrap">

                                <p>
                                    Published By:
                                    <br/>
                                    <Icon type="user"/> <b>{this.state.username} </b>
                                    on {Date(this.state.created_date)}
                                </p>
                            </div>

                        </Card>

                        <Card>
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
                    </div>

                </div>
                <Card>
                    <Icon type="edit"/>
                </Card>
            </App>
        );
    }
}

export default withRouter(show);
