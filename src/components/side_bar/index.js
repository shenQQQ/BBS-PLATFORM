import React from "react";

import { Menu } from 'antd'
import { AppstoreFilled, HomeFilled, RocketFilled, ThunderboltFilled } from '@ant-design/icons';
import { SideBarWrapper } from "./style";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { store } from '../../const/store';
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";

const { SubMenu } = Menu;
class Side_bar extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            menuList: [],
            project_name: "",
            platform_address:""
        }
    }

    renderMenuData = (data) => {
        return data.map(
            (item) => {
                return <Menu.Item key={item.key} onClick={
                    () => {
                        window.location.href = this.state.platform_address + item.key
                    }
                }>{item.title}</Menu.Item>
            }
        )
    }

    componentDidMount() {
        store.subscribe(() => {
            if (store.getState().config.config) {
                let config = store.getState().config.config.menu;
                const menuList = this.renderMenuData(config)
                this.setState({ menuList: menuList })
            }
            if (store.getState().globalConfig.globalConfig) {
                let menu = store.getState().globalConfig.globalConfig.menu;
                this.setState({ project_name: menu.project_name })
            }
        })
    }

    render() {

        return (
            <div>
                <SideBarWrapper>
                    <div className="side_bar">
                        <Link to="/home">
                            <span className="side_bar_logo">
                                {this.state.project_name}
                            </span>
                        </Link>
                        <Menu
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1']}
                            mode="inline"
                        >
                            <Menu.Item key="home" icon={<HomeFilled />}><Link to="/home">首页</Link></Menu.Item>
                            <Menu.Item key="article" icon={<RocketFilled />}><Link to="/articleList">文章</Link></Menu.Item>
                            <Menu.Item key="news" icon={<ThunderboltFilled />}>新闻</Menu.Item>

                            <SubMenu key="block" icon={<AppstoreFilled />} title="热门板块">
                                {this.state.menuList}
                            </SubMenu>
                        </Menu>
                    </div>
                </SideBarWrapper >
            </div >);
    }
}

const mapStateToProps = (state) => {
    return {
        config: state.config.config,
        globalConfig: state.globalConfig.globalConfig
    }
}

export default withRouter(connect(mapStateToProps)(Side_bar))