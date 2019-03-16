import * as React from 'react';
import App, { Container } from 'next/app';
import Head from 'next/head';
import axios from 'axios';
import '../libs/cookie';
import cookie from 'js-cookie';
import NProgress from 'nprogress'
import Router from 'next/router'
import { message } from 'antd';

import '../components/layouts/app.css'
import 'nprogress/nprogress.css';


console.log(process.env.API_HOST);
axios.defaults.baseURL = 'http://127.0.0.1:3001/api/';

axios.interceptors.request.use(
    function (config) {
        if(typeof document !== 'undefined') {
            NProgress.start();
        }
        const session = cookie.session();
        if(session) {
            config.headers.authorization = session;
        }
        config.headers.Accept = 'application/json';
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

axios.interceptors.response.use(function (response) {
    if(typeof document !== 'undefined') {
        NProgress.done();
    }
    window.response = response;
    const warning = response.headers['x-warning'];
    if(warning) {
        message.warning(warning);
    }
    return response;
}, function (error) {

    if(typeof document !== 'undefined') {
        NProgress.done();
    }

    if(error.response && error.response.status === 500) {
        console.error(error.response.data);
        const response = { ...error.response, data: { message: 'Something went wrong.' } };
        return Promise.reject({ ...error, response });
    }

    return Promise.reject(error);
});


Router.onRouteChangeStart = (url) => {
    NProgress.start()
};
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();


class MyApp extends App {
    state = {};
    static async getInitialProps ({ Component, router, ctx }) {
        let pageProps = {};
        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx)
        }
        return { pageProps }
    }

    render() {
        const { Component, pageProps } = this.props;
        return (
                <Container>
                    <Head>
                        <link rel="icon" href="https://cdn-images-1.medium.com/max/1600/1*emiGsBgJu2KHWyjluhKXQw.png" type="image/png" sizes="256x256" />
                        <meta name="viewport" content="width=device-width, initial-scale=1" />
                        {/* <link rel="stylesheet" href="/_next/static/style.css" /> */}
                    </Head>
                    <Component {...pageProps} />
                </Container>
        );
    }
}

export default MyApp;
