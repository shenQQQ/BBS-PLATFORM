import React from "react";
import ImageClip from "./ImageClip";

class UploadPicture extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            stage: 0,
            //pic: '',
            url: '',
        }
    }
    render() {
        let { stage } = this.state;
        let imgurl = "";
        if (this.props.url) {
            imgurl = this.state.url === '' ? this.props.url : this.state.url
        }else{
            imgurl = this.state.url
        }
        return (
            <div>
                <div className="baseInfo" style={{ display: stage === 0 ? 'block' : 'none', }}>
                    <div className="imgBox" onClick={() => { this.setState({ stage: 1 }) }} style={{ display: imgurl === '' ? 'none' : 'block' }}>
                        <img src={imgurl} alt="" />
                    </div>
                    <div className="messageBox" onClick={() => { this.setState({ stage: 1 }) }} style={{ display: imgurl === '' ? 'block' : 'none', backgroundColor: "#ccc" }}>
                        <br />
                        <p style={{ textAlign: "center" }}>{this.props.uploadTitle}</p>
                        <p style={{ textAlign: "center" }}>{this.props.uploadContent}</p>
                        <br />
                    </div>
                </div>
                <div className="ImageClip" style={{ display: stage === 0 ? 'none' : 'block', }}>
                    <ImageClip change={this.change} back={this.back} type={this.props.type} width={this.props.width} height={this.props.height} />
                </div>
            </div>
        );
    }
    change = (url) => {
        this.setState({ stage: 0 })
        this.setState({ url: url })
        this.props.getUrl(url)
    }
    back = () => {
        this.setState({ stage: 0 })
    }
}
export default UploadPicture;