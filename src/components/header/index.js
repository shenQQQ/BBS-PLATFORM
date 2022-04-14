import React from "react";
import { HeaderWrapper } from "./style";
import { Input, message } from "antd";
import { Menu, Avatar, Image } from 'antd';
import { BookOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../actions/authActions";
import { withRouter } from "react-router-dom";
import { PlatformUrl } from "../../config/config";
import { Button, notification } from 'antd';
import { Badge } from "antd";
import { store } from '../../const/store';
import { SmileOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;

const { Search } = Input;

const onSearch = value => {
    if (value === '') {
        message.error("搜索词不能为空");
        return;
    }
    window.location.href = PlatformUrl + "/searchPage?keywords=" + value;
};

class Header extends React.Component {

    state = {
        current: '',
        not_read: 0
    };

    onLogout = () => {
        this.props.logout();
        window.location.reload();
        //this.props.history.replace("/")
    }

    handleClick = e => {
        //console.log('click ', e);
        this.setState({ current: e.key });
    };

    componentDidMount = () => {
        store.subscribe(() => {
            if (this.props.userState.isAuth) {
                this.initWebSocket("ws://localhost:8080/websocket")
            }
        })
    }

    initWebSocket = (url) => {
        const ws = new WebSocket(url);
        ws.onopen = () => {
            console.log("连接建立")
            var user = {
                username: this.props.userState.user.username,
                userId: this.props.userState.user.id
            }
            sendMessage("bind",user);
        }
        ws.onclose = () => {
            console.log("连接关闭")
        }
        ws.onerror = (e) => {
            console.log("出现异常", e);
        }
        ws.onmessage = (data) => {
            console.log("收到信息", data.data);
            var data = JSON.parse(data.data);
            if (data.type === "notification_notread") {
                this.setState({ not_read: data.payload })
            }
            if (data.payload && data.type !== "notification_notread") {
                notification.open({
                    message: data.payload,
                    icon: <SmileOutlined style={{ color: '#108ee9' }} />
                });
            }
        }
        function sendMessage(type,payload){
            ws.send(JSON.stringify({ type: type, payload: payload }));
        }
    }


    render() {
        const { current } = this.state;
        const login = (
            <Menu className="before-login" onClick={this.handleClick} selectedKeys={[current]} mode="horizontal" style={{ height: 60 }}>
                <Menu.Item key="signup">
                    <Link to="/signup">注册</Link>
                </Menu.Item>
                <Menu.Item key="login">
                    <Link to="/login">登录</Link>
                </Menu.Item>
            </Menu>
        )

        const logined = (
            <Menu className="after-login" onClick={this.handleClick} selectedKeys={[current]} mode="horizontal" style={{ height: 60, width: 174 }}>
                <Menu.Item key="contribution" icon={<BookOutlined />}>
                    <Link to="/create">投稿</Link>
                </Menu.Item>
                <SubMenu key="user" icon={<Badge count={this.state.not_read}><Avatar src={<Image src={this.props.userState.isAuth ? this.props.userState.user.avatar : null} size="small" />} /></Badge>}>
                    <Menu.Item key="myArticle"><Link to="/myArticle">文章</Link></Menu.Item>
                    <Menu.Item key="myCollect"><Link to="/myCollect">收藏</Link></Menu.Item>
                    <Menu.Item key="myMessage"><Link to="/myMessage">消息</Link></Menu.Item>
                    <Menu.Item key="edit"><Link to="/edit">编辑资料</Link></Menu.Item>
                    <Menu.Item key="logout" onClick={this.onLogout}>注销</Menu.Item>
                </SubMenu>
            </Menu>
        )
        //console.log("props ", this.props.userState.isAuth)
        return (
            <HeaderWrapper>
                <div className="header">
                    <div className="search">
                        <Search placeholder="input search text" allowClear onSearch={onSearch} style={{ width: 400 }} />
                    </div>

                    <div className="menu">
                        {
                            this.props.userState.isAuth ? logined : login
                        }
                    </div>
                </div>
            </HeaderWrapper>
        );
    }

}

const mapStateToProps = (state) => {
    //console.log("state ", state);
    return {
        userState: state.login
    }
}


export default withRouter(connect(mapStateToProps, { logout })(Header))