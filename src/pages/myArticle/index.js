import React from 'react'
import Card_list from '../../components/card_list';
import Axios from "../../utils/axios";
import { message, Pagination } from 'antd';
import { HomeWrapper } from '../home/style';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { PageHeader } from 'antd';
import { MY_ARTICLE_PAGE_SIZE} from '../../config/config';
import { store } from '../../const/store';

class MyArticle extends React.Component {

    constructor() {
        super();
        this.state = {
            data: [],
            pages: 0,
        }
    }

    componentDidMount() {
        Axios.get("/article/user/" + this.props.userState.user.id)
            .then(res => {
                //console.log("res ", res.data)
                if (res.data.code === 200) {
                    this.setState({ data: res.data.content.records })
                    this.setState({ total: res.data.content.total })
                } else {
                    message.error(res.data.messgae)
                    window.location.href = "/"
                }
            })
            .catch(error => { console.log(error); })
    }

    render() {
        if (!this.props.userState.isAuth) {
            message.error("请先登录!")
            window.location.href = "/"
        }
        return (
            <HomeWrapper>
                <div className='main'>
                    <PageHeader
                        className="site-page-header"
                        onBack={() => {window.history.back(-1)}}
                        title="发表的文章"
                    />,
                    <Card_list data={this.state.data} />
                    <div className='pagination'>
                        <Pagination showQuickJumper defaultCurrent={1} total={this.state.total} onChange={(pageNumber) => {
                            Axios.get("/article/user/" + this.props.userState.user.id, {
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
        userState: state.login,
        globalConfig: state.globalConfig.globalConfig
    }
}
export default withRouter(connect(mapStateToProps)(MyArticle));