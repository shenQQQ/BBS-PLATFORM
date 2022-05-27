import React from "react";
import Axios from "../../utils/axios";
import { message } from "antd";
import Card_list from "../../components/card_list";
import { Pagination } from "antd";
import { INDEX_PAGE_SIZE } from "../../config/config";
import { HomeWrapper } from "../home/style";
import { TagWrapper } from "./style";
import { PageHeader } from "antd";
import { connect } from "react-redux";
import { store } from "../../const/store";

function getRandomColor() {
    let r = Math.floor(Math.random() * 192);
    let g = Math.floor(Math.random() * 192);
    let b = Math.floor(Math.random() * 192);
    let r16 = r.toString(16).length === 1 && r.toString(16) <= "f" ? 0 + r.toString(16) : r.toString(16);
    let g16 = g.toString(16).length === 1 && g.toString(16) <= "f" ? 0 + g.toString(16) : g.toString(16);
    let b16 = b.toString(16).length === 1 && b.toString(16) <= "f" ? 0 + b.toString(16) : b.toString(16);
    let color = '#' + r16 + g16 + b16;
    return color;
}

class TagPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tagName: "",
            data: [],
            pages: 0,
            platform_address:""
        }
    }

    componentDidMount() {
        store.subscribe(() => {
            if (store.getState().globalConfig.globalConfig) {
                let menu = store.getState().globalConfig.globalConfig.menu;
                this.setState({ platform_address: menu.platform_address })
            }
        })
        Axios.get(this.props.location.pathname)
            .then(res => {
                if (res.data.code === 200) {
                    console.log(res.data.content);
                    this.setState({ tagName: res.data.content.tag.name })
                    this.setState({ data: res.data.content.page.records })
                    this.setState({ total: res.data.content.page.total })
                } else {
                    message.error(res.data.message);
                    window.location.href = this.state.platform_address;
                }
            })
            .catch(error => {
                console.log(error);
            });
    }
    render() {
        return (
            <div>
                <TagWrapper>
                    <div>
                        <div className="circle" style={{backgroundColor:getRandomColor()}}>
                            <p className="container">
                                {this.state.tagName}
                            </p>
                            <div className="circle-shadow" style={{borderColor:getRandomColor(),backgroundColor:getRandomColor()}}></div>
                        </div>
                    </div>
                </TagWrapper>
                <PageHeader
                        className="site-page-header"
                        onBack={() => {window.history.back(-1)}}
                        title= {this.state.tagName}
                    />
                <Card_list data={this.state.data} />
                <HomeWrapper>
                    <div className='pagination'>
                        <Pagination showQuickJumper defaultCurrent={1} total={this.state.total} onChange={(pageNumber) => {
                            Axios.get(this.props.location.pathname, {
                                params: {
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
                </HomeWrapper>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    //console.log("state ", state);
    return {
        globalConfig: state.globalConfig.globalConfig
    }
}
export default connect(mapStateToProps)(TagPage);