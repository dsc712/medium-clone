import react, { Component } from 'react';
import { Form, Button, Card, Input, notification, message, Table, Divider, Tooltip, Popconfirm, Icon } from 'antd';
import Link from 'next/link';
import axios from 'axios';
const Item = Form.Item;

import { connect } from 'react-redux';
import * as authAction from '../../actions/auth';

import App from '../../components/layouts/App';


class Account extends Component {
    state = {
        isUpdating: false,
        tableLoading: true,
        user: null
    };

    columns = [
    {
        title: 'Story title',
        dataIndex: 'title',
        key: 'title',
        render: (title, record) => this.renderTitle(title, record)
    }, {
        title: 'Claps',
        dataIndex: 'claps',
        key: 'claps'
    },{
        title: 'Action',
        key: 'action',
        render: (a,record) => this.renderAction(record),
    }];

    renderAction(record) {
        const text = "Are you sure, you want to delete this story?";
        return (
            <div>
                <Link prefetch as={`/stories/${ record.id }`} href={`/story/new?story=${ record.id }`}><a><Tooltip title="Edit Story"><Icon type="edit" /></Tooltip></a></Link>
                <Divider type="vertical" />
                <a><Popconfirm title={text} onConfirm={this.confirm.bind(this, record.id)} okText="Yes" cancelText="No">
                    <Icon type="close" />
                </Popconfirm></a>
            </div>
        )
    }
    renderTitle = ( title, record ) => {
        if(title){
            if( title.length > 60 ){
                title = title.substring(0,60);
                return <Link href={`/show?id=${record.id}`}><a>{ title }...</a></Link>
            }
            return <Link href={`/show?id=${record.id}`}><a>{ title }</a></Link>
        }

        return '-'
    };

    confirm = async (params) => {
        const data = await axios.delete(`/users/${ this.state.user.id }/stories/${ params }`);
        this.fetchUserStories();
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
            message.success(  data.message );
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

    async fetchUserStories() {
        const  { data }  = await axios.get(`/users/${this.state.user.id}/stories`);
        this.setState({ stories: data.stories });
    }

    componentDidMount() {
        this.fetchProfile();
        this.setState({ tableLoading: true });
        setTimeout(() => {
            this.fetchUserStories();
        }, 1000);
        this.setState({ tableLoading: false });
    }

    render() {
        const decorator = this.props.form.getFieldDecorator;
        return (
            <App>
                <Card title="Edit your profile" style={{ width: '85vw'}}>
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
                <Card style={{ marginTop: "20px"}}>
                    <Table loading={ this.state.tableLoading }
                           dataSource={ this.state.stories }
                           title={() => 'Your Stories'}
                           columns={this.columns} />
                </Card>
            </App>
        )
    }
}

const mapDispatchToProps = dispatch => ({ dispatch });
export default connect(null, mapDispatchToProps)(Form.create()(Account));