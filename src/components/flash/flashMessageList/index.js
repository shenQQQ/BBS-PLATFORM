import { Alert } from "antd";
import React from "react";
import { FlashMessageListWrapper } from "./style";
import { connect } from "react-redux";

class FlashMessageList extends React.Component {
    render() {
        return (
            <FlashMessageListWrapper>
                <div className="container">
                    {
                        this.props.messages.map((message, index) => {
                            return <Alert message={message.text} type={message.type} key={index} showIcon closable />
                        })
                    }
                </div>
            </FlashMessageListWrapper>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        messages: state.flashMessage
    }
}


export default connect(mapStateToProps)(FlashMessageList)