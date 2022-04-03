import React from "react";
import SignupForm from "../../components/signUpForm";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as signupActions from "../../actions/signupActions";
import * as flashActions from "../../actions/flashMessageActions";

class SignupPage extends React.Component {
    render() {
        return (
            <div>
                <SignupForm flashActions={this.props.flashActions} signupActions={this.props.signupActions} />
            </div>
        );
    }
}
const mapDispatch = (dispatch) => {
    return {
        signupActions: bindActionCreators(signupActions, dispatch),
        flashActions: bindActionCreators(flashActions, dispatch)
    }
}

export default connect(null, mapDispatch)(SignupPage)