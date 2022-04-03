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
        let { stage, pic ,url} = this.state;

        return (
            <div>
                <div className="baseInfo" style={{
                    display: stage === 0 ? 'block' : 'none',
                }}>
                    <div className="imgBox" onClick={() => {
                        this.setState({ stage: 1 })
                    }} style={{
                        display: this.state.url === '' ? 'none' : 'block'
                    }}>
                        <img src={url} alt="" />
                    </div>
                    <div className="messageBox" onClick={() => {
                        this.setState({ stage: 1 })
                    }} style={{
                        display: this.state.url === '' ? 'block' : 'none',
                        backgroundColor : "#ccc"
                    }}>
                        <br/>
                        <p style={{ textAlign: "center"}}>选择文章头图</p>
                        <p style={{ textAlign: "center"}}>请插入文件小于5M，格式为png,jpg,jpeg,gif的16:9图片</p>
                        <br/>
                    </div>
                </div>
                <div className="ImageClip" style={{
                    display: stage === 0 ? 'none' : 'block',
                }}>
                    
                    <ImageClip change={this.change} back={this.back}/>
                </div>
            </div>
        );
    }
    change = (url) => {
        this.setState({ stage: 0 })
        //this.setState({ pic: imagedata })
        this.setState({ url: url })
        this.props.getUrl(url);
        
    }
    back = () =>{
        this.setState({ stage: 0 })
    }
}
export default UploadPicture;