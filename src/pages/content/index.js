import React from 'react'
import Axios from "../../utils/axios"
import { Image, message } from 'antd';
import { ContentWrapper } from './style';
import { Avatar } from 'antd';
import { StarOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { Comment, List } from 'antd';
import getDateDiff from "../../utils/getDateDiff"
import { PlatformUrl } from '../../config/config';
import { withRouter } from 'react-router-dom';

class Content extends React.Component {

    constructor(props) {
        super(props);
        //console.log(props.location.state.id);
        this.state = {
            comment: []
        }
    }

    componentDidMount() {
        Axios.get(this.props.location.pathname)
            .then(res => {
                if (res.data.code === 200) {
                    //console.log(res.data.content.comments)
                    this.setState({ id: res.data.content.id })
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
                }else{
                    message.error(res.data.message);
                    window.location.href = PlatformUrl;
                }
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        return (
            <ContentWrapper>
                <div className='article_head'>
                    <div className='article_title'>
                        <h1>{this.state.title}</h1>
                        <div className='description'>
                            <Avatar src={this.state.avatar} />

                            <div className='text'>
                                <span>{this.state.username}</span>
                                <br />
                                <small>{getDateDiff(this.state.inTime)}</small>
                            </div>
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
                    <Button icon={<StarOutlined />} >&nbsp;&nbsp;{this.state.collectCount}&nbsp;&nbsp;</Button>
                    <br />
                    <hr />
                </div>

                <div className='comment'>
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
            </ContentWrapper>
        );
    }
}
export default withRouter(Content);