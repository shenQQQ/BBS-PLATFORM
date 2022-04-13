import React from 'react'
import Card_list from '../../components/card_list';
import Axios from "../../utils/axios";
import { message, Pagination } from 'antd';
import { HomeWrapper } from '../home/style';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { PageHeader } from 'antd';
import { MY_COLLECT_PAGE_SIZE, PlatformUrl } from '../../config/config';

class MyCollect extends React.Component {

    constructor() {
        super();
        this.state = {
            data: [],
            pages: 0,
        }
    }

    componentDidMount() {
        Axios.get("/article/collect/" + this.props.userState.user.id)
            .then(res => {
                //console.log("res ", res.data)
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

    render() {
        if (!this.props.userState.isAuth) {
            message.error("请先登录!")
            window.location.href = PlatformUrl
        }
        return (
            <HomeWrapper>
                <div className='main'>
                    <PageHeader
                        className="site-page-header"
                        onBack={() => { window.history.back(-1) }}
                        title={this.props.userState.user.username + "收藏的文章"}
                    />
                    <Card_list data={this.state.data} />
                    <div className='pagination'>
                        <Pagination showQuickJumper defaultCurrent={1} total={this.state.total} onChange={(pageNumber) => {
                            Axios.get("/article/collect/" + this.props.userState.user.id, {
                                pageNo: pageNumber
                            })
                                .then(res => {
                                    this.setState({ data: res.data.content.records })
                                    this.setState({ total: res.data.content.total })
                                })
                                .catch(error => {
                                    console.log(error);
                                });
                        }} justify="center" pageSize={MY_COLLECT_PAGE_SIZE} />
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
export default withRouter(connect(mapStateToProps)(MyCollect));