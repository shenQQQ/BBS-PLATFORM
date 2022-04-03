import React from 'react'
import Card_list from '../../components/card_list';
import Axios from "../../utils/axios";
import { Pagination } from 'antd';
import { HomeWrapper } from '../home/style';
import { SEARCH_PAGE_SIZE } from '../../config/config';

function getUrlParam(name) {
    var url = window.location.search; //获取url中"?"符后的字串   
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        var strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1]);
        }
    }
    return theRequest[name];
}
class SearchPage extends React.Component {

    constructor() {
        super();
        this.state = {
            data: [],
            pages: 0
        }
    }

    componentDidMount() {
        console.log(getUrlParam("keywords"));
        Axios.post('/article/search', {
            keyword: getUrlParam("keywords")
        })
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
                    <Card_list data={this.state.data} />
                    <div className='pagination'>
                        <Pagination showQuickJumper defaultCurrent={1} total={this.state.total} onChange={(pageNumber) => {
                            Axios.post('/article/search', {
                                keyword: getUrlParam("keywords"),
                                pageNo: pageNumber
                            })
                                .then(res => {
                                    this.setState({ data: res.data.content.records })
                                    this.setState({ total: res.data.content.total })
                                })
                                .catch(error => {
                                    console.log(error);
                                });
                        }} justify="center" pageSize={SEARCH_PAGE_SIZE} />
                    </div>
                </div>
            </HomeWrapper>
        );
    }
}
export default SearchPage;