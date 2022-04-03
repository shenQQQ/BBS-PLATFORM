import React from "react";
import Axios from "../../utils/axios";
import { message } from "antd";

class ImageClip extends React.Component {
    constructor(props) {
        super(props);

        let W = this.props.width,
            H = this.props.height,
            MW = W * 0.9,
            MH = MW * this.props.height / this.props.width,
            ML = (W - MW) / 2,
            MT = (H - MH) / 2;

        this.state = {
            W, H, MW, MH, ML, MT,
            S: false,
            MouseDown: false,
            url: "",
        }
    }
    render() {
        let { W, H, MW, MH, MT, ML, S } = this.state
        //console.log(this.props)
        return (
            <div className='clipImageBox' style={{ position: "relative" }}>
                <div className='canvasBoxDiv'
                    onMouseDown={
                        ev => {
                            //let point = ev.changedTouches[0];
                            this.startX = ev.clientX;
                            this.startY = ev.clientY;
                            this.setState({ MouseDown: true });
                        }
                    }
                    onMouseMove={
                        ev => {
                            if (this.state.MouseDown) {
                                let changeX = ev.clientX - this.startX;
                                let changeY = ev.clientY - this.startY;
                                //console.log(changeX, changeY)
                                this.IL += changeX;
                                this.IT += changeY;
                                this.drawImage();
                                this.startX = ev.clientX;
                                this.startY = ev.clientY;
                            }
                        }
                    }
                    onMouseUp={
                        ev => {
                            this.setState({ MouseDown: false });
                        }
                    }
                    style={{ borderStyle: "solid" }}>
                    <canvas className='canvasBox'
                        ref={x => this._canvas = x}
                        width={W}
                        height={H}
                    ></canvas>
                    <div className='mark'
                        style={{
                            width: MW + "px",
                            height: MH + "px",
                            left: ML + "px",
                            top: MT + "px",
                            display: S ? "block" : "none",
                            backgroundColor: "#123123",
                            opacity: 0.3,
                            position: "absolute",
                            zIndex: 20
                        }}
                    ></div>
                </div>
                <div>
                    <input type="file" accept='image/*' className='file' ref={x => { this._file = x }} style={{ display: "none" }} onChange={this.fileChange} />
                    <button className='choose' onClick={() => { this._file.click() }}>选择图片</button>
                    <button onClick={
                        ev => {
                            if (!this.img) return;
                            this.IW += 10;
                            this.IH += 10 * (this.img.height / this.img.width);
                            this.drawImage();
                        }}>放大</button>
                    <button onClick={ev => {
                        if (!this.img) return;
                        this.IW -= 10;
                        this.IH -= 10 * (this.img.height / this.img.width);
                        this.drawImage();
                    }}>缩小</button>
                    <button className="submit" onClick={
                        ev => {
                            if (!this.img) return;
                            let imagedata = this.ctx.getImageData(ML, MT, MW, MH),
                                canvas2 = document.createElement("canvas"),
                                ctx2 = canvas2.getContext("2d");
                            canvas2.width = MW;
                            canvas2.height = MH;
                            ctx2.putImageData(imagedata, 0, 0, 0, 0, MW, MH);
                            //console.log(this.canvasToFile(canvas2));
                            const formData = new FormData()
                            formData.append("file", this.canvasToFile(canvas2));
                            formData.append('type', this.props.type)
                            this.setState({
                                uploading: true
                            })
                            Axios.post("/upload/", formData).then(
                                res => {
                                    //console.log(res.data);
                                    if (res.data.code === 200) {
                                        this.setState({ url: res.data.content.urls[0] })
                                        //this.props.change(canvas2.toDataURL(),this.state.url);
                                        this.props.change(this.state.url);
                                        message.success("图片上传成功");
                                    } else {
                                        if (!res.data.content) {
                                            message.error(res.data.message)
                                        } else {
                                            var error = "";
                                            for (var k = 0; k < res.data.content.errors.length; k++) {
                                                error += res.data.content.errors[k] + "<br/>";
                                            }
                                            message.error(error);
                                        }
                                    }
                                }
                            ).catch(error => { console.log("axios error ", error); })

                        }
                    }>保存图片</button>
                    <button onClick={() => {
                        this.props.back()
                    }}>放弃上传</button>
                </div>
            </div >
        );
    }

    fileChange = () => {
        this.setState({ S: true })
        let picOM = this._file.files[0];
        if (!picOM) return;
        let fileReader = new FileReader();
        fileReader.readAsDataURL(picOM);
        fileReader.onload = (ev) => {
            this.img = new Image();
            this.img.src = ev.target.result;
            this.img.onload = () => {
                let n = 1,
                    { W, H } = this.state;
                this.IW = this.img.width;
                this.IH = this.img.height;
                if (this.IW > this.IH) {
                    n = this.IW / W;
                    this.IW = W;
                    this.IH = this.IH / n;
                } else {
                    n = this.IH / H;
                    this.IH = H;
                    this.IW = this.IW / n;
                }
                this.IL = (W - this.IW) / 2;
                this.IT = (H - this.IH) / 2;
                this.drawImage();
            }
        }
    }

    drawImage = () => {
        let { W, H } = this.state;
        this.ctx = this._canvas.getContext("2d");
        this.ctx.clearRect(0, 0, W, H);
        this.ctx.drawImage(this.img, this.IL, this.IT, this.IW, this.IH);
    }

    canvasToFile = (canvas) => {
        var fileName = "generate.jpg";
        var dataurl = canvas.toDataURL("image/jpg");
        var arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]),
            n = bstr.length,
            u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        var file = new File([u8arr], fileName, { type: mime });
        //file.lastModifiedDate = new Date();
        return file
    }
}
export default ImageClip;