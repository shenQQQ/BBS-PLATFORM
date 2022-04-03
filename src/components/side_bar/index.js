import React from "react";

import { Menu } from 'antd'
import { AppstoreFilled, HomeFilled, RocketFilled, ThunderboltFilled } from '@ant-design/icons';
import { SideBarWrapper } from "./style";
import { Link } from "react-router-dom";
import { ProjectName } from "../../config/config";

const { SubMenu } = Menu;
const Side_bar = () => (
    <SideBarWrapper>
        <div className="side_bar">
            <Link to="/home">
                <span className="side_bar_logo">
                    {ProjectName}
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

                <SubMenu key="block" icon={<AppstoreFilled />} title="板块">
                    <Menu.Item key="game"># 游戏</Menu.Item>
                    <Menu.Item key="acg"># 二次元</Menu.Item>
                </SubMenu>
            </Menu>
        </div>
    </SideBarWrapper>
)

export default Side_bar