import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../../actions/authActions"
import setHeaderToken from "../../utils/setHeaderToken";

import { addFlashMessage } from "../../actions/flashMessageActions";
import { setCurrentUser } from "../../actions/authActions";
import { store } from "../../const/store";

//todo: 替换掉flashMessage
class LoginForm extends React.Component {

    constructor() {
        super();
        this.state = {
            username: "",
            password: "",
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
        this.setState({
            isLoading: true

        });
        this.props.login(this.state).then((res) => {    
            if (res.data.code !== 200) {
                this.props.addFlashMessage(
                    {
                        type: "error",
                        text: res.data.message
                    }
                )
                this.setState({ errors: res.data.message, isLoading: false })
            } else {
                const token = res.data.content.token;
                localStorage.setItem("BBSToken", token);
                setHeaderToken(token);
                //console.log("res " , res.data.content);
                this.props.addFlashMessage(
                    {
                        type: "success",
                        text: "登录成功！"
                    }
                )
                let user = {
                    id : res.data.content.user.id,
                    username : res.data.content.user.username,
                    avatar : res.data.content.user.avatar
                }
                store.dispatch(setCurrentUser(user))
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
                    <h1>登录</h1>
                    <div className="form-group">
                        <label className="control-label">username</label>
                        <input name="username" value={this.state.username} onChange={this.onChange} type="text" className="form-control" />
                    </div>
                    <div className="form_group">
                        <label className="control_label">password</label>
                        <input name="password" value={this.state.password} onChange={this.onChange} type="password" className="form_control" />
                    </div>
                    <div className="form_group">
                        <button disabled={this.state.isLoading}>登录</button>
                    </div>
                </form>
            </div>
        )
    }
}
export default withRouter(connect(null, { login, addFlashMessage })(LoginForm));