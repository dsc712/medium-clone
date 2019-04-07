import React, { Component } from "react";
import axios from "axios";
import { withRouter } from "next/router";
import App from "../components/layouts/App";
const { Meta } = Card;
import Response from "../components/Response";
import Showcomments from "../components/ShowComments";
import {Card, Icon, Affix, Row, Col, Avatar, Divider } from "antd";
import moment from "moment";
import ReactHTMLParser from "react-html-parser";
import dynamic from 'next/dynamic';
import AwesomeDebouncePromise from 'awesome-debounce-promise';

const Clap = dynamic(
    () => import('react-clap-button'),
    {
        ssr: false
    }
);


class Show extends Component {
    count = 0;
    state = {
        data: "",
        isBookmarked: false,
        count: 0,
        totalCount: 100,
        isClicked: false,
        comments: [],
        LoggedUser: "",
        gotComments: []
    };

    async getLoggedUser() {
        try {
            const usr = await axios.get("/me");
            this.setState({
                LoggedUser: usr.data
            });
        } catch (err) {
            throw err;
        }
    }

    componentDidMount() {
        this.count = this.state.count;
        let id = this.props.router.query.id;
        axios.get("/stories/" + id).then(res => {
            console.log(res.data);
            this.setState({
                data: res.data.story,
                ok: true,
                totalCount: res.data.story.claps
            });
        });

        axios.get(`/stories/${id}/clap`).then((res) => {
            this.setState({ count: res.data.claps && res.data.claps.count });
        });

        this.findBookmark();
        this.getResponse(id);
    }


  async getResponse(id) {
    console.log("id", id);
    const res = await axios.get("/response/" + id);
    this.setState({
      gotComments: res.data.comments
    });
  }


  changeBookmark = () => {
    if (!this.state.isBookmarked === false) {
      this.removeBookmark();
    } else {
      this.addBookmark();
    }

    this.setState(state => {
      return {
        isBookmarked: !state.isBookmarked
      };
    });
  };

  getBookTheme = () => {
    if (this.state.isBookmarked === false) {
      console.log("outlined--theme");
      return "outlined";
    } else {
      console.log("filled--theme");
      return "filled";
    }
  };

  addBookmark = async () => {
    console.log("adding post book!!");

    const data = await axios
      .post("/book/add/" + this.state.data.id)
      .then(res => {
        notification.success({ message: "Bookmark added successfully!!" });
      });
    console.log(data);
  };

  findBookmark = async () => {
    try {
      await axios.get("/book/" + this.state.data.id).then(res => {
        console.log(res);

        if (res.data.total > 0) {
          this.setState({ isBookmarked: true });
        }
      });
    } catch (err) {
      if (err.response) {
        this.setState({ error: err.response.data.message });
      } else {
        this.setState({ error: err.message });
      }
    }
  };

  removeBookmark = async () => {
      console.log("removing bookmark");
      try {
          const data = await axios
              .delete("/book/delete/" + this.state.data.id)
              .then(res => {
                  console.log(res);
                  notification.success({message: "Removing the bookmark!!"});
              });
      } catch (err) {
          if (err.response) {
              this.setState({error: err.response.data.message});
          } else {
              this.setState({error: err.message});
          }
      }
  };

    sendClapRequest = async (count) => {
        let id = this.props.router.query.id;
        const claps = await axios.put(`/stories/${ id }/clap`, {count, totalCount: this.state.totalCount + count } );
    };

    clapAPIDebounced = AwesomeDebouncePromise( this.sendClapRequest, 500);

    render() {
          const {id, title, body, featured_image, reading_time, created_at, user} = this.state.data;
          return (
              <App style={{display: "flex", flexDirection: "row", backgroundColor: "#fff !important"}}>
                  <img style={{"width": "100%", "marginTop": "-40px", overflowX: "hidden"}} alt="example"
                       src={featured_image}/>
                  <Card>
                      <Row>
                          <Col span={1}>
                              <Affix offsetTop={150}>
                                  <div style={{
                                      height: "70vh",
                                      fontSize: "24px",
                                      display: "flex",
                                      flexDirection: "column",
                                      justifyContent: "space-between",
                                      marginLeft: "80px"
                                  }}>
                                      <div onClick={async () => {
                                          ++this.count;
                                          await this.clapAPIDebounced(this.count);
                                      }}>
                                          <Clap
                                              count={this.state.count}
                                              countTotal={this.state.totalCount}
                                              isClicked={this.state.isClicked}
                                              maxCount={50}
                                              theme={{
                                                  secondaryColor: '#123456'
                                              }}
                                          />
                                      </div>
                                      <Divider/>
                                      <Icon type="book" size="large"
                                            theme={this.isBookmarked }
                                            onClick={this.changeBookmark}
                                            style={{color: '#000'}}/>
                                      <Icon size="large" type="share-alt"/>
                                      <Icon size="large" type="facebook"/>
                                      <Icon size="large" type="twitter" theme="outlined"/>
                                  </div>
                              </Affix>
                          </Col>

                          <Col span={23}>
                              <Card style={{"width": "70vw", "margin": "0 auto"}}>
                                  <h1 style={{"fontSize": "3em"}}>{title}</h1>
                                  <h4 style={{"color": "#333333", "textAlign": "justify"}}>
                                <span style={{"marginRight": "20px"}}>
                                    <Icon type="clock-circle" style={{"marginRight": "3px"}}/>{reading_time}
                                </span>
                                      <span>
                                    <Icon type="calendar" style={{"marginRight": "3px"}}/>{moment(created_at).fromNow()}
                                </span>
                                  </h4>
                                  <h4 style={{"marginTop": "25px"}}>
                                      {user && user.photo ? <Avatar src={user.photo}/> :
                                          <Avatar style={{backgroundColor: "#f56a00"}} icon="user"/>}
                                      <span> {user && user.name} ( {user && user.email} ) </span>
                                  </h4>
                              </Card>

                              <div
                                  style={{
                                      textAlign: "justify",
                                      margin: "auto",
                                      padding: "100px",
                                      width: "70vw",
                                      fontSize: "1.5em"
                                  }}
                              >
                                  {ReactHTMLParser(body)}
                              </div>
                          </Col>
                      </Row>
                  </Card>
                  <Card
                      style={{width: "75%", margin: "10px auto", borderRadius: "10px"}}
                  >
                      <h1>Comments</h1>
                      <Divider/>
                      <Meta
                          avatar={<Avatar src={featured_image}/>}
                          title={this.state.LoggedUser.name}
                      />

                      <Response info={this.state}/>
                  </Card>
                  <p>
                      {this.state.gotComments.map(comment => (
                          <Showcomments key={comment.id} comment={comment}/>
                      ))}
                  </p>
              </App>
          );

  }
}

export default withRouter(Show);
