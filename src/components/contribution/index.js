import { message, Button, Input } from 'antd';
import React from "react";
import E from 'wangeditor';
import Axios from "../../utils/axios"
import { ContentWrapper } from "../../pages/content/style";
import UploadPicture from '../uploadPicture';
import { ServerUrl, MAX_UPLOAD_FILE_NUM, MAX_UPLOAD_IMAGE_FILE_SIZE, UPLOAD_TIMEOUT } from '../../config/config';
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min';
import { connect } from "react-redux";
import { store } from '../../const/store';

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
function ReplaceDot(obj) {
    var oldValue = obj.valueOf();
    while (oldValue.indexOf("，") != -1)//寻找每一个中文逗号，并替换
    {
        obj = oldValue.replace("，", ",").valueOf();
        oldValue = obj.valueOf();
    }
    obj = oldValue.valueOf();
    return obj;
}
class Contribution extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            editorContent: '',
            headImg: "",
            title: "",
            tag: "",
            isLoading: false,
            operation: "/save/",
            type: "headImg",
            width: (document.documentElement.clientWidth - 250) * 0.5,
            height: (document.documentElement.clientWidth - 250) * 0.5 * 9 / 16,
            uploadTitle: "选择文章头图",
            uploadContent: "",
            max_upload_image_size: 3,
            max_upload_file_num: 3,
            file_upload_timeout: 3
        };
    }

    componentDidMount() {
        if (this.props.globalConfig) {
            this.setState({ max_upload_image_size: this.props.globalConfig.menu.max_upload_image_size })
            this.setState({ max_upload_file_num: this.props.globalConfig.menu.max_upload_file_num })
            this.setState({ file_upload_timeout: this.props.globalConfig.file_upload_timeout })
            this.setState({ uploadContent: "请插入文件小于" + this.props.globalConfig.menu.max_upload_image_size + "M，格式为png,jpg,jpeg,gif的16:9图片" })
        }
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
        editor.config.uploadImgMaxSize = this.state.max_upload_image_size * 1024 * 1024;
        editor.config.uploadImgMaxLength = this.state.max_upload_file_num;
        editor.config.uploadImgTimeout = this.state.file_upload_timeout;
        editor.config.customUploadImg = function (resultFiles, insertImgFn) {
            uploadImageWithProgress(resultFiles, function (data) {
                for (var j = 0; j < data.content.urls.length; j++) {
                    var url = data.content.urls[j];
                    insertImgFn(url);
                }
            });
        }
        if (this.props.operation) {
            this.setState({ operation: "/update/" + this.props.operation.replace("/article/", "") })
            Axios.get(this.props.operation)
                .then(res => {
                    if (res.data.code === 200) {
                        this.setState({ editorContent: res.data.content.content })
                        this.setState({ headImg: res.data.content.headImg })
                        this.setState({ title: res.data.content.title })
                        this.setState({
                            tag:
                                res.data.content.list.map((obj) => {
                                    return obj.name
                                }).join(",")
                        })
                        editor.create()
                        editor.txt.html(this.state.editorContent)
                    } else {
                        message.error(res.data.message);
                        window.location.href = "/";
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        } else {
            editor.create()
            editor.txt.html(this.state.editorContent)
        }
    };

    render() {
        return (
            <ContentWrapper>
                <div className="content" >
                    <div className="head-img">
                        <UploadPicture getUrl={this.getUrl.bind(this)} type={this.state.type} width={this.state.width} height={this.state.height} uploadTitle={this.state.uploadTitle} uploadContent={this.state.uploadContent} url={this.state.headImg} />
                    </div>
                    <div style={{ marginTop: "20px", marginBottom: "20px" }}>
                        <Input placeholder="请输入标题" value={this.state.title} bordered={false} onChange={(e) => { this.setState({ title: e.target.value }) }} size="large" />
                    </div>
                    <hr />
                    <div style={{ marginTop: "20px", marginBottom: "20px" }}>
                        <Input placeholder="请输入标签,不必输入#，标签之间请使用逗号分割" value={this.state.tag} bordered={false} onChange={(e) => { this.setState({ tag: e.target.value }) }} size="large" />
                    </div>
                    <div ref="editorElemMenu" style={{ backgroundColor: '#f1f1f1', border: "1px solid #ccc" }} className="editorElem-menu"></div>
                    <div style={{ padding: "0 10px", border: "0px solid #ccc", borderTop: "none" }} ref="editorElemBody" className="editorElem-body">

                    </div>
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
                            Axios.post("/article" + this.state.operation, {
                                title: this.state.title,
                                content: this.state.editorContent,
                                headImg: this.state.headImg,
                                tag: ReplaceDot(this.state.tag)
                            }).then(
                                res => {
                                    //console.log(res.data);
                                    if (res.data.code === 200) {
                                        message.success("上传成功");
                                        window.location.href = "/"
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
const mapStateToProps = (state) => {
    return {
        userState: state.login,
        globalConfig: state.globalConfig.globalConfig
    }
}
export default withRouter(connect(mapStateToProps)(Contribution))