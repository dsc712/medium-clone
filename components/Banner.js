import React from "react";
import BannerAnim, { Element } from "rc-banner-anim";
import TweenOne from "rc-tween-one";
import { Button, Icon } from "antd";
import "rc-banner-anim/assets/index.css";
const BgElement = Element.BgElement;

class Banner extends React.Component {
  render() {
    return (
      <BannerAnim prefixCls="banner-user" autoPlay>
        <Element prefixCls="banner-user-elem" key="0">
          <BgElement key="bg" className="bg first" />
          <TweenOne
            className="banner-user-title"
            animation={{ y: 30, opacity: 0, type: "from", delay: 100 }}
          >
            Express Yourself With No Limit.
          </TweenOne>
          <TweenOne
            className="banner-user-text"
            animation={{ y: 30, opacity: 0, type: "from", delay: 500 }}
          >
            Write Your Story
            <br />
            <Button type="danger " href="/story/new" shape="round" size="large">
              <Icon type="form" />
              Write
            </Button>
          </TweenOne>
        </Element>
        <Element prefixCls="banner-user-elem" key="1">
          <BgElement key="bg" className="bg second" />
          <TweenOne
            className="banner-user-title"
            animation={{ y: 30, opacity: 0, type: "from", delay: 100 }}
          >
            Read The Valuable Experiences.
          </TweenOne>
          <TweenOne
            className="banner-user-text"
            animation={{ y: 30, opacity: 0, type: "from", delay: 500 }}
          >
            <Button type="danger " href="#read" shape="round" size="large">
              <Icon type="read" />
              Read
            </Button>
          </TweenOne>
        </Element>
        <Element prefixCls="banner-user-elem" key="2">
          <BgElement key="bg" className="bg third" />
          <TweenOne
            className="banner-user-title"
            animation={{ y: 30, opacity: 0, type: "from", delay: 100 }}
          >
            "THERE IS NO GREATER AGONY THAN
          </TweenOne>
          <TweenOne
            className="banner-user-text"
            animation={{ y: 30, opacity: 0, type: "from", delay: 500 }}
          >
            BEARING AN UNLOAD STORY INSIDE YOU.
            <span style={{ fontSize: "32px" }}>"</span>
          </TweenOne>
        </Element>
      </BannerAnim>
    );
  }
}

export default Banner;
