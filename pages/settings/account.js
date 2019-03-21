import react, { Component } from 'react';
import { Form, Button, Card, Input, notification } from 'antd'
import axios from 'axios';
const Item = Form.Item;

import { connect } from 'react-redux';
import * as authAction from '../../actions/auth';

import App from '../../components/layouts/App';


class Account extends Component {
    state = {
        isUpdating: false,
        user: null
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if(err) {
                return;
            }
            this.sendRequest(values);
        });
    };

    async sendRequest( values ) {
        this.setState({ isUpdating: true });
        try {
            const { data } = await axios.put(`/me/${ this.state.user.id }`, values);
            this.props.dispatch(authAction.update({ user: values }));
            console.log( this.props );
            notification.open({ message: data.message });
        } catch(err) {
            if(err.response) {
                notification.error({ message: err.response.data.message });
            } else {
                notification.error({ message: err.message });
                throw err;
            }
        }
        this.setState({ isUpdating: false });
    }

    async fetchProfile() {
        const { data } = await axios.get(`/me`);
        this.setState({ user: data });
        console.log( this.state );
        this.props.form.setFieldsValue({
            name: data.name,
            email: data.email
        });
    }

    componentDidMount() {
        this.fetchProfile();
    }

    render() {
        const decorator = this.props.form.getFieldDecorator;
        return (
            <App>
                <Card title="Edit your profile" style={{ width: 1000}}>
                    <Form onSubmit={ this.handleSubmit }>
                        <Item label={"Name"}>
                            {
                                decorator('name', {})(
                                    <Input placeholder={"Name"} />
                                )
                            }
                        </Item>
                        <Item label={"Email"}>
                            {
                                decorator('email', {
                                    rules: [{ required: true }]
                                })(
                                    <Input placeholder={"Email"}/>
                                )
                            }
                        </Item>
                        <Button loading={this.state.isUpdating } htmlType={"submit"}>Save</Button>
                    </Form>
                </Card>
            </App>
        )
    }
}

const mapDispatchToProps = dispatch => ({ dispatch });
export default connect(null, mapDispatchToProps)(Form.create()(Account));