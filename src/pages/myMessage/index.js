import React from 'react'
import Axios from "../../utils/axios";
import { message, Pagination, List, Avatar } from 'antd';
import { HomeWrapper } from '../home/style';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { PageHeader } from 'antd';
import { MY_ARTICLE_PAGE_SIZE, PlatformUrl } from '../../config/config';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

class MyMessage extends React.Component {

    constructor() {
        super();
        this.state = {
            data: [],
            pages: 0,
        }
    }

    componentDidMount() {
        Axios.get("/notification/list")
            .then(res => {
                if (res.data.code === 200) {
                    this.setState({ data: res.data.content.records })
                    this.setState({ total: res.data.content.total })
                } else {
                    message.error(res.data.messgae)
                    window.location.href = PlatformUrl
                }
            })
            .catch(error => { console.log(error); })
    }

    generateNotificationContent(content, article_id, type, username, title) {
        let action = "";
        switch (type) {
            case "COMMENT":
                action = "评论";
                break;
            case "COLLECT":
                action = "收藏";
                break;
            default:
                break;
        }
        return <p>{username}  {action}了你的文章  <Link to={"/article/" + article_id}>{title}</Link>  {content ? <span>说：{content}</span> : null}</p>
    }

    render() {
        if (!this.props.userState.isAuth) {
            message.error("请先登录!")
            window.location.href = PlatformUrl
        }
        console.log(this.state.data);
        return (
            <HomeWrapper>
                <div className='main'>
                    <PageHeader
                        className="site-page-header"
                        onBack={() => { window.history.back(-1) }}
                        title="我的消息"
                    />,
                    <List
                        style={{ width: "50%", margin: "0 auto" }}
                        itemLayout="horizontal"
                        dataSource={this.state.data}
                        renderItem={item => (
                            <List.Item onMouseDown={() => {
                                Axios.get("/notification/mark")
                                    .catch(error => { console.log(error); })
                            }}>
                                <List.Item.Meta
                                    avatar={<Link to={{ pathname: `/user/` + item.user_id }}><Avatar src={item.avatar} /></Link>}
                                    title={<Link to={{ pathname: `/user/` + item.user_id }}>{item.username}</Link>}
                                    description={this.generateNotificationContent(item.content, item.article_id, item.ACTION, item.username, item.title)}
                                />
                            </List.Item>
                        )}
                    />
                    <div className='pagination'>
                        <Pagination showQuickJumper defaultCurrent={1} total={this.state.total} onChange={(pageNumber) => {
                            Axios.get("/notification/list/" + this.props.userState.user.id, {
                                pageNo: pageNumber
                            })
                                .then(res => {
                                    this.setState({ data: res.data.content.records })
                                    this.setState({ total: res.data.content.total })
                                })
                                .catch(error => {
                                    console.log(error);
                                });
                        }} justify="center" pageSize={MY_ARTICLE_PAGE_SIZE} />
                    </div>
                </div>
            </HomeWrapper>
        );
    }
}
const mapStateToProps = (state) => {
    //console.log("state ", state);
    return {
        userState: state.login
    }
}
export default withRouter(connect(mapStateToProps)(MyMessage));