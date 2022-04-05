import React from "react";
import { withRouter } from "react-router-dom";
import { message } from 'antd';

class SignupForm extends React.Component {

    constructor() {
        super();
        this.state = {
            username: "",
            email: "",
            password: "",
            repeat_password: "",
            errors: {},
            isLoading: false //节流防抖
        }
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit = (e) => {
        e.preventDefault();
        if (this.state.password !== this.state.repeat_password) {
            message.error("两次密码不一致");
            return;
        }
        this.setState({
            isLoading: true
        });
        this.props.signupActions.userSignupRequest(this.state).then(res => {
            if (res.data.code !== 200) {
                this.props.flashActions.addFlashMessage(
                    {
                        type: "error",
                        text: res.data.message
                    }
                )
                this.setState({ errors: res.data.message, isLoading: false })
            } else {
                //console.log(res.data.content);
                this.props.flashActions.addFlashMessage(
                    {
                        type: "success",
                        text: "注册成功！"
                    }
                )
                this.props.history.replace("/");
            }

        }).catch(error => {
            console.log(error);
        });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <h1>注册</h1>
                    <div>
                        <label>username</label>
                        <input name="username" value={this.state.username} onChange={this.onChange} type="text" />
                    </div>
                    <div >
                        <label>password</label>
                        <input name="password" value={this.state.password} onChange={this.onChange} type="password" />
                    </div>
                    <div >
                        <label>repeat_password</label>
                        <input name="repeat_password" value={this.state.repeat_password} onChange={this.onChange} type="password" />
                    </div>
                    <div >
                        <label>email</label>
                        <input name="email" value={this.state.email} onChange={this.onChange} type="email" />
                    </div>
                    <div>
                        <button disabled={this.state.isLoading}>注册</button>
                    </div>
                </form>
            </div>
        )
    }
}
export default withRouter(SignupForm);