import React from "react";
import UploadPicture from "../../components/uploadPicture";
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";
import { connect } from "react-redux";
import { Button, Input, message } from "antd";
import { PageHeader } from "antd";
import Axios from "../../utils/axios";
import { PlatformUrl } from "../../config/config";
import { store } from "../../const/store";
import { setCurrentUser } from "../../actions/authActions";

class Edit extends React.Component {
    constructor() {
        super();
        this.state = {
            id: '',
            username: '',
            bio: '',
            avatar: "",
            type: "avatar",
            width: 150,
            height: 150,
            uploadTitle: "选择用户头像",
            uploadContent: "请插入小于3M的图片",
            isUserMessageLoading: false,
            isPasswordLoading: false,
            password: '',
            old_password: '',
            repeat_password: ''
        }
    }

    onChange = (e) => {

        this.setState({
            [e.target.name]: e.target.value
        })
    }

    componentDidMount() {
        Axios.get("/user/token").then(
            res => {
                if (res.data.code === 200) {
                    //console.log(res);
                    if (res.data.content.id !== this.props.userState.user.id) {
                        message.error("请使用自己的账号");
                        return;
                    }
                    this.setState({ id: res.data.content.id });
                    this.setState({ username: res.data.content.username });
                    this.setState({ email: res.data.content.email });
                    this.setState({ bio: res.data.content.bio });
                    this.setState({ avatar: res.data.content.avatar });
                } else {
                    message.error(res.data.message);
                    window.location.href = PlatformUrl
                }
            }
        ).catch(error => {
            console.log(error);
        });
    }

    getUrl(url) {
        const user = {
            username: "",
            id: "",
            avatar: "",
        }
        user.username = this.props.userState.user.username
        user.id = this.props.userState.user.id
        user.avatar = url
        store.dispatch(setCurrentUser(user))
        this.setState({ avatar: url });
    }

    userMessageClick = (e) => {
        e.preventDefault();
        this.setState({
            isUserMessageLoading: true
        });
        Axios.post("/user/update", {
            username: this.state.username,
            bio: this.state.bio,
            email: this.state.email
        }).then(res => {
            if (res.data.code !== 200) {
                message.error(res.data.message)
            } else {
                message.success("更新成功！");
                const user = {
                    username: "",
                    id: "",
                    avatar: "",
                }
                user.username = this.state.username
                user.id = this.state.id
                user.avatar = this.state.avatar
                store.dispatch(setCurrentUser(user))
            }
            this.setState({ isUserMessageLoading: false })
        }).catch(error => {
            console.log(error);
        });
    }

    passwordClick = (e) =>{
        e.preventDefault();
        if(this.state.password !== this.state.repeat_password){
            message.error("两次输入的密码不一致")
            return
        }
        this.setState({
            isPasswordLoading: true
        });
        Axios.post("/user/updatepwd", {
            password: this.state.password,
            old_password: this.state.old_password
        }).then(res => {
            if (res.data.code !== 200) {
                message.error(res.data.message)
            } else {
                message.success("更新成功！");
            }
            this.setState({ isPasswordLoading: false })
        }).catch(error => {
            console.log(error);
        });
    }

    render() {
        return (
            <div>
                <PageHeader
                    className="site-page-header"
                    onBack={() => { window.history.back(-1) }}
                    title="编辑个人信息"
                />,
                <div className="content" style={{ width: "50%", lineHeight: "30px", margin: "0 auto", padding: "24px" }}>
                    <div style={{ backgroundColor: "#EEEEF2", padding: "24px" }}>
                        <h1 style={{ marginBottom: "24px" }}>个人信息</h1>
                        <hr></hr>
                        <div style={{ marginTop: "15px" }}>
                            <h3><b>用户名</b></h3>
                            <Input placeholder="请输入用户名" value={this.state.username} name="username" onChange={this.onChange} />
                        </div>
                        <div style={{ marginTop: "24px" }}>
                            <h3><b>自我简介</b></h3>
                            <Input placeholder="请输入自我简介" value={this.state.bio} name="bio" onChange={this.onChange} />
                        </div>
                        <div style={{ marginTop: "24px" }}>
                            <h3><b>邮箱地址</b></h3>
                            <Input placeholder="请输入邮箱" value={this.state.email} name="email" onChange={this.onChange} />
                        </div>
                        <Button style={{ marginTop: "24px" }} onClick={this.userMessageClick} disabled={this.state.isUserMessageLoading}>提交</Button>
                    </div>

                    <div style={{ marginTop: "24px", backgroundColor: "#EEEEF2", padding: "24px" }}>
                        <h1 style={{ marginBottom: "24px" }}>修改个人头像</h1>
                        <hr></hr>
                        <div style={{ marginTop: "24px" }}>
                            <h3><b>用户头像</b></h3>
                            <div style={{ width: "330px" }}>
                                <UploadPicture getUrl={this.getUrl.bind(this)} type={this.state.type} width={this.state.width} height={this.state.height} uploadTitle={this.state.uploadTitle} uploadContent={this.state.uploadContent} url={this.state.avatar}/>
                            </div>
                        </div>
                    </div>

                    <div style={{ marginTop: "24px", backgroundColor: "#EEEEF2", padding: "24px" }}>
                        <h1 style={{ marginBottom: "24px" }}>修改密码</h1>
                        <hr></hr>
                        <div style={{ marginTop: "15px" }}>
                            <h3><b>原密码</b></h3>
                            <Input.Password placeholder="" value={this.state.old_password} name="old_password" onChange={this.onChange} />
                        </div>
                        <div style={{ marginTop: "24px" }}>
                            <h3><b>新密码</b></h3>
                            <Input.Password placeholder="" value={this.state.password} name="password" onChange={this.onChange} />
                        </div>
                        <div style={{ marginTop: "24px" }}>
                            <h3><b>重复新密码</b></h3>
                            <Input.Password placeholder="" value={this.state.repeat_password} name="repeat_password" onChange={this.onChange} />
                        </div>
                        <Button style={{ marginTop: "24px" }} onClick={this.passwordClick} disabled={this.state.isPasswordLoading}>提交</Button>
                    </div>
                </div>
            </div>
        )
    }

}
const mapStateToProps = (state) => {
    return {
        userState: state.login
    }
}
export default withRouter(connect(mapStateToProps)(Edit))