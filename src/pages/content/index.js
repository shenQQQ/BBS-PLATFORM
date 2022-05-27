import React from 'react'
import Axios from "../../utils/axios"
import { Image, Input, message } from 'antd';
import { ContentWrapper } from './style';
import { Avatar } from 'antd';
import { StarFilled } from '@ant-design/icons';
import { Button } from 'antd';
import { Comment, List } from 'antd';
import getDateDiff from "../../utils/getDateDiff"
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { store } from '../../const/store';
import Contribution from '../../components/contribution';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const { TextArea } = Input;



class Content extends React.Component {

    constructor() {
        super();
        //console.log(props.location.state.id);
        this.state = {
            username: '',
            avatar: '',
            userAvatar: '',
            comment: [],
            isAuth: false,
            isAuthor: false,
            isCollect: false,
            isLoading: false,
            isCommentSendLoading: false,
            stage: true,
            tagList: [],
            platform_address:""
        }


    }

    isUserCollect = () => {
        if (!this.state.isAuth) {
            return;
        }
        Axios.get("/collect/" + this.state.id).then(
            res => {
                if (res.data.code === 200) {
                    this.setState({ isCollect: res.data.content })
                } else {
                    message.error(res.data.message);
                }
            }
        )
    }

    collect = () => {
        this.setState({ isLoading: true });
        let cc = this.state.collectCount + 1
        Axios.post("/collect/" + this.state.id).then(
            res => {
                if (res.data.code === 200) {
                    message.success("收藏成功")
                    this.setState({ isCollect: true })
                    this.setState({ collectCount: cc })
                } else {
                    message.error(res.data.message);
                }
                this.setState({ isLoading: false });
            }

        )

    }

    unCollect = () => {
        this.setState({ isLoading: true });
        let cc = this.state.collectCount - 1
        Axios.delete("/collect/" + this.state.id).then(
            res => {
                if (res.data.code === 200) {
                    message.success("取消收藏成功")
                    this.setState({ isCollect: false })
                    this.setState({ collectCount: cc })
                } else {
                    message.error(res.data.message);
                }
                this.setState({ isLoading: false });
            }
        )
        this.setState({ isLoading: false });
    }

    renderTag = (data) => {
        return data.map(
            (item) => {
                return <Button shape="round" key={item.name} style={{ marginRight: "5px" }} onClick={
                    () => {
                        window.location.href = this.state.platform_address + "/tag/" + item.id
                    }
                }>{"#" + item.name}</Button>
            }
        )
    }

    componentDidMount() {
        store.subscribe(() => {
            if (store.getState().globalConfig.globalConfig) {
                let menu = store.getState().globalConfig.globalConfig.menu;
                this.setState({ project_name: menu.project_name })
            }
            let userState = store.getState().login
            this.setState({ isAuth: userState.isAuth })
            this.setState({ userAvatar: userState.user.avatar })
            if (userState.user.username === this.state.username) {
                this.setState({ isAuthor: true })
            } else {
                this.setState({ isAuthor: false })
            }
            this.isUserCollect();
        })
        Axios.get(this.props.location.pathname)
            .then(res => {
                if (res.data.code === 200) {
                    console.log(res.data.content)
                    this.setState({ id: res.data.content.id })
                    this.setState({ userId: res.data.content.userId })
                    this.setState({ content: res.data.content.content })
                    this.setState({ head_img: res.data.content.headImg })
                    this.setState({ title: res.data.content.title })
                    this.setState({ avatar: res.data.content.avatar })
                    this.setState({ inTime: res.data.content.inTime })
                    this.setState({ commentCount: res.data.content.commentCount })
                    this.setState({ collectCount: res.data.content.collectCount })
                    this.setState({ view: res.data.content.view })
                    this.setState({ username: res.data.content.username })
                    this.setState({ comment: res.data.content.comments })
                    this.setState({ tagList: this.renderTag(res.data.content.list) })

                    this.setState({ userAvatar: this.props.userState.user.avatar })
                    this.setState({ isAuth: this.props.userState.isAuth })

                    if (this.props.userState.user.username === this.state.username) {
                        this.setState({ isAuthor: true })
                    } else {
                        this.setState({ isAuthor: false })
                    }
                    this.isUserCollect()
                } else {
                    message.error(res.data.message);
                    window.location.href = this.state.platform_address;
                }
            })
            .catch(error => {
                console.log(error);
            });
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit = () => {
        this.setState({ isCommentSendLoading: true });
        Axios.post("/comment/" + this.state.id, { "comment": this.state.commentContent }).then(
            res => {
                if (res.data.code === 200) {
                    message.success("评论发布成功");
                    window.location.reload();
                }
                else {
                    message.error(res.data.message);
                }
                this.setState({ isCommentSendLoading: false });
            }
        )
    }

    render() {
        return (
            <ContentWrapper>
                <div style={{ display: !this.state.stage ? 'block' : 'none', }}>
                    <Contribution operation={this.props.location.pathname} />
                </div>
                <div style={{ display: this.state.stage ? 'block' : 'none', }}>
                    <div className='article_head'>
                        <div className='article_title'>
                            <h1>{this.state.title}</h1>
                            <div className='description'>
                                <Link to={{ pathname: `/user/` + this.state.userId }}>
                                    <Avatar src={this.state.avatar} />
                                </Link>
                                <div className='text'>
                                    <span>{this.state.username}</span>
                                    <br />
                                    <small>{getDateDiff(this.state.inTime)}</small>
                                </div>

                            </div>
                            <div className='modify' style={{ display: this.state.isAuthor ? 'block' : 'none' }}>
                                <a onClick={() => {
                                    Axios.delete(this.props.location.pathname)
                                        .then(res => {
                                            if (res.data.code === 200) {
                                                message.success("删除成功")
                                                window.location.href = "/";
                                            } else {
                                                message.error(res.data.message);
                                            }
                                        })
                                        .catch(error => {
                                            console.log(error);
                                        });
                                }}>删除</a>
                                &nbsp;&nbsp;&nbsp;&nbsp;
                                <a onClick={() => {
                                    this.setState({ stage: false });
                                }}>修改</a>
                            </div>
                        </div>
                        <div >
                            <Image className="title_img" src={this.state.head_img} />
                        </div>
                    </div>

                    <div className='content'>
                        <div className='statement'>
                            <p><small>本文系发布者投稿，文章内容不代表本站观点</small></p>
                        </div>
                        {/* <ReactMarkdown children={this.state.content} remarkPlugins={[remarkGfm]} /> */}
                        <div dangerouslySetInnerHTML={{ __html: this.state.content }} />
                        {this.state.tagList}
                        <br />
                        <Button icon={<StarFilled style={{ color: this.state.isCollect ? "#1890ff" : "#969faf" }} />} disabled={this.state.isLoading || !this.state.isAuth} onClick={this.state.isCollect ? this.unCollect : this.collect}>&nbsp;&nbsp;{this.state.collectCount}&nbsp;&nbsp;</Button>
                        <br />
                        <hr />
                    </div>

                    <div className='comment'>
                        <div className='addComment' style={{ display: this.state.isAuth ? 'flex' : 'none', marginBottom: "24px" }}>
                            <Avatar src={this.state.userAvatar} style={{ float: "left", alignSelf: "center" }} />
                            <TextArea rows={2} style={{ width: "80%", marginLeft: "20px", marginRight: "10px" }} name="commentContent" onChange={this.onChange} />
                            <Button style={{ float: "right", alignSelf: "center" }} onClick={this.onSubmit} disabled={this.state.isCommentSendLoading}>发送</Button>
                        </div>
                        <List
                            className="comment-list"
                            header={`${this.state.comment.length} 条回复`}
                            itemLayout="horizontal"
                            dataSource={this.state.comment}
                            renderItem={item => (
                                <li>
                                    <Comment
                                        author={item.username}
                                        avatar={item.avatar}
                                        content={item.content}
                                        datetime={getDateDiff(item.inTime)}
                                    />
                                </li>
                            )}
                        />
                    </div>
                </div>
            </ContentWrapper>
        );
    }
}
const mapStateToProps = (state) => {
    //console.log("state ", state);
    return {
        userState: state.login,
        globalConfig: state.globalConfig.globalConfig
    }
}
export default withRouter(connect(mapStateToProps)(Content));