import React from 'react'
import { HomeWrapper } from './style';
import RecommendBlock from '../../components/recommend_block';
import Card_list from '../../components/card_list';
import Axios from '../../utils/axios';
import { Pagination } from 'antd';
import { INDEX_PAGE_SIZE } from '../../config/config';

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            pages: 0
        }
    }

    componentDidMount() {
        Axios.get()
            .then(res => {
                this.setState({ data: res.data.content.records })
                this.setState({ total: res.data.content.total })
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        return (
            <HomeWrapper>
                <div className='main'>
                    <RecommendBlock />
                    <Card_list data={this.state.data} />
                    <div className='pagination'>
                        <Pagination showQuickJumper defaultCurrent={1} total={this.state.total} onChange={(pageNumber) => {
                            Axios.get('/article/index',{
                                params:{
                                    pageNo: pageNumber
                                }
                            })
                                .then(res => {
                                    this.setState({ data: res.data.content.records })
                                    this.setState({ total: res.data.content.total })
                                })
                                .catch(error => {
                                    console.log(error);
                                });
                        }} justify="center" pageSize={INDEX_PAGE_SIZE} />
                    </div>
                </div>
            </HomeWrapper>
        );
    }
}
export default Home;