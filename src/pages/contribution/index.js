import { message, Button, Input } from 'antd';
import React from "react";
import E from 'wangeditor';
import Axios from "../../utils/axios"
import { ContentWrapper } from "../content/style";
import UploadPicture from '../../components/uploadPicture';
import { ServerUrl, MAX_UPLOAD_FILE_NUM, MAX_UPLOAD_IMAGE_FILE_SIZE, UPLOAD_TIMEOUT } from '../../config/config';

function uploadImageWithProgress(files, cb) {
    var fd = new FormData();
    var type = "article";
    for (var i = 0; i < files.length; i++) { fd.append("file", files[i]); }
    fd.append("type", type);
    Axios.post("/upload/", fd).then(
        res => {
            if (res.data.code === 200) {
                message.success("上传成功");
                cb(res.data);
            } else {
                message.error(res.data.message);
            }
        }
    ).catch(error => { console.log("axios error ", error); })
}
class Contribution extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            editorContent: '',
            headImg: "",
            title: "",
            isLoading: false,
            type: "headImg",
            width: (document.documentElement.clientWidth - 250) * 0.5,
            height: (document.documentElement.clientWidth - 250) * 0.5 * 9 / 16,
            uploadTitle: "选择文章头图",
            uploadContent: "请插入文件小于5M，格式为png,jpg,jpeg,gif的16:9图片",
        };
    }

    componentDidMount() {
        const elemMenu = this.refs.editorElemMenu;
        const elemBody = this.refs.editorElemBody;
        const editor = new E(elemMenu, elemBody)
        editor.config.onchange = html => { this.setState({ editorContent: editor.txt.html() }) }
        editor.config.menus = [
            'head',  // 标题
            'bold',  // 粗体
            'italic',  // 斜体
            'strikeThrough',  // 删除线
            'link',  // 插入链接
            'list',  // 列表
            'justify',  // 对齐方式
            'quote',  // 引用
            'emoticon',  // 表情
            'image',  // 插入图片
            'table',  // 表格
            'video',  // 插入视频
            'code',  // 插入代码
            'undo',  // 撤销
            'redo'  // 重复
        ]
        //editor.config.uploadImgShowBase64 = true
        editor.config.uploadImgServer = ServerUrl + '/upload';  // 上传图片到服务器
        editor.config.uploadImgMaxSize = MAX_UPLOAD_IMAGE_FILE_SIZE * 1024 * 1024;
        editor.config.uploadImgMaxLength = MAX_UPLOAD_FILE_NUM;
        editor.config.uploadImgTimeout = UPLOAD_TIMEOUT;
        editor.config.customUploadImg = function (resultFiles, insertImgFn) {
            uploadImageWithProgress(resultFiles, function (data) {
                for (var j = 0; j < data.content.urls.length; j++) {
                    var url = data.content.urls[j];
                    insertImgFn(url);
                }
            });
        }
        editor.create()

    };

    render() {

        return (
            <ContentWrapper>
                <div className="content" >
                    <div className="head-img">
                        <UploadPicture getUrl={this.getUrl.bind(this)} type={this.state.type} width={this.state.width} height={this.state.height} uploadTitle={this.state.uploadTitle} uploadContent={this.state.uploadContent} />
                    </div>
                    <div style={{ marginTop: "20px", marginBottom: "20px" }}>
                        <Input placeholder="请输入标题" bordered={false} onChange={(e) => { this.setState({ title: e.target.value }) }} size="large" />
                    </div>
                    <div ref="editorElemMenu" style={{ backgroundColor: '#f1f1f1', border: "1px solid #ccc" }} className="editorElem-menu"></div>
                    <div style={{ padding: "0 10px", border: "0px solid #ccc", borderTop: "none" }} ref="editorElemBody" className="editorElem-body"></div>
                    <Button disabled={this.state.isLoading}
                        onClick={() => {
                            if (this.state.title === '') {
                                message.error("请输入标题");
                                return;
                            }
                            if (this.state.headImg === '') {
                                message.error("请上传头图");
                                return;
                            }
                            if (this.state.editorContent === '') {
                                message.error("请输入正文");
                                return;
                            }
                            this.setState({
                                isLoading: true
                            });
                            Axios.post("/article/save/", {
                                title: this.state.title,
                                content: this.state.editorContent,
                                headImg: this.state.headImg
                            }).then(
                                res => {
                                    //console.log(res.data);
                                    if (res.data.code === 200) {
                                        message.success("上传成功");
                                        this.props.history.replace("/");
                                    } else {
                                        message.error(res.data.message);
                                    }
                                    this.setState({ isLoading: false })
                                }
                            ).catch(error => { console.log("axios error ", error); })
                        }}> 上传文章 </Button>
                </div>
            </ContentWrapper>
        );
    }

    getUrl(url) {
        this.setState({ headImg: url });
    }
}
export default Contribution;