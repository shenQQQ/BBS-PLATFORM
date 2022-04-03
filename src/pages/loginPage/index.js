import React from "react";
import LoginForm from "../../components/loginForm";
class LoginPage extends React.Component {
    render() {
        return (
            <div>
                <LoginForm flashActions={this.props.flashActions}/>
            </div>
        );
    }
}
export default LoginPage