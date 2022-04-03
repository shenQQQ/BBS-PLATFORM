import { Upload, message, Button, Modal, Icon, uploading, Input } from 'antd';
import React from "react";
import E from 'wangeditor';
import Axios from "../../utils/axios"
import { ContentWrapper } from "../content/style";
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import UploadPicture from '../../components/uploadPicture';

const { Dragger } = Upload;

function uploadImageWithProgress(files, cb) {
    var fd = new FormData();
    var type = "topic";
    for (var i = 0; i < files.length; i++) {
        fd.append("file", files[i]);
        console.log(files[i]);
    }
    fd.append("type", type);
    Axios.post("/upload/", fd).then(
        res => {
            console.log(res.data);
            if (res.data.code === 200) {
                message.success("上传成功");
                cb(res.data);
            } else {
                // if (!data.detail) {
                //     err(data.description)
                // } else {
                //     var error = "";
                //     for (var k = 0; k < data.detail.errors.length; k++) {
                //         error += data.detail.errors[k] + "<br/>";
                //     }
                //     err(error);
                // }
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
            isLoading: false
        };
    }



    componentDidMount() {
        const elemMenu = this.refs.editorElemMenu;
        const elemBody = this.refs.editorElemBody;
        const editor = new E(elemMenu, elemBody)
        // 使用 onchange 函数监听内容的变化，并实时更新到 state 中
        editor.config.onchange = html => {
            console.log(editor.txt.html())
            this.setState({
                editorContent: editor.txt.html()
            })
            console.log(this.state.editorContent);
        }
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
        editor.config.uploadImgServer = 'http://localhost:8080/upload';  // 上传图片到服务器
        // 3M
        editor.config.uploadImgMaxSize = 3 * 1024 * 1024;
        // 限制一次最多上传 5 张图片
        editor.config.uploadImgMaxLength = 5;
        // 将 timeout 时间改为 3s
        editor.config.uploadImgTimeout = 3000;
        editor.config.customUploadImg = function (resultFiles, insertImgFn) {
            // resultFiles 是 input 中选中的文件列表
            // insertImgFn 是获取图片 url 后，插入到编辑器的方法
            uploadImageWithProgress(resultFiles, function (data) {
                for (var j = 0; j < data.content.urls.length; j++) {
                    var url = data.content.urls[j];
                    // 上传图片，返回结果，将图片插入到编辑器中
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
                        <UploadPicture getUrl={this.getUrl.bind(this)} />
                    </div>
                    <div style={{ marginTop: "20px", marginBottom: "20px" }}>
                        <Input placeholder="请输入标题" bordered={false} onChange={(e) => {
                            this.setState({ title: e.target.value })
                        }} size="large" />
                    </div>
                    <div ref="editorElemMenu"
                        style={{ backgroundColor: '#f1f1f1', border: "1px solid #ccc" }}
                        className="editorElem-menu">

                    </div>
                    <div
                        style={{
                            padding: "0 10px",
                            border: "0px solid #ccc",
                            borderTop: "none"
                        }}
                        ref="editorElemBody" className="editorElem-body">

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
                            Axios.post("/article/save/", {
                                title: this.state.title,
                                content: this.state.editorContent,
                                headImg: this.state.headImg
                            }).then(
                                res => {
                                    console.log(res.data);
                                    if (res.data.code === 200) {
                                        message.success("上传成功");
                                        this.props.history.replace("/");
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
                                    this.setState({isLoading: false })
                                }
                            ).catch(error => { console.log("axios error ", error); })
                        }}> 上传文章 </Button>
                </div>
            </ContentWrapper>
        );
    }

    getUrl(url) {
        this.setState({ headImg: url });
        console.log(this.state.headImg)
    }
}
export default Contribution;