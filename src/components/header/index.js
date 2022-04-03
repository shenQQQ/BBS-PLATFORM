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

const { SubMenu } = Menu;

const { Search } = Input;

const onSearch = value => {
    if(value === ''){
        message.error("搜索词不能为空");
        return;
    }
    window.location.href = PlatformUrl + "/searchPage?keywords=" + value;
};

class Header extends React.Component {

    state = {
        current: '',
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
                    <Link to="/contribution">投稿</Link>
                </Menu.Item>
                <SubMenu key="user" icon={<Avatar src={<Image src={this.props.userState.isAuth ? this.props.userState.user.avatar : null} size="small" />} />}>
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