import React from 'react'
import { CardListWrapper } from './style';
import 'antd/dist/antd.css';
import { Card, Avatar, List } from 'antd';
import { CommentOutlined, StarOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import getDateDiff from '../../utils/getDateDiff';

const { Meta } = Card;

class Card_list extends React.Component {

    render() {
        //console.log(this.props.data);
        return (
            <CardListWrapper>
                <div className="site-card-wrapper">
                    <List
                        grid={{ gutter: 24, column: 5 }}
                        dataSource={this.props.data}
                        renderItem={item => (
                            <List.Item>
                                <Card cover={<img src={item.head_img} alt="item.title"/>}>
                                    <Link to={{ pathname: `/article/` + item.id }}>
                                        <Meta title={item.title} />
                                    </Link>
                                    <div className='description'>
                                        <Avatar src={item.avatar} />
                                        <div>
                                            <span>{item.username}</span>
                                            <br />
                                            <small>{getDateDiff(item.in_time)}</small>
                                        </div>
                                        <div className='likeAndComment'>
                                            <StarOutlined />{item.collect_count}
                                            &nbsp;
                                            <CommentOutlined />{item.comment_count}
                                        </div>
                                    </div>
                                </Card>
                            </List.Item>
                        )}
                    />
                </div>
            </CardListWrapper >
        );
    }
}

export default Card_list;