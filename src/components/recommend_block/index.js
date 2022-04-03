import React from "react";
import { RecommendBlockWrapper } from "./style";
import 'antd/dist/antd.css';
import { Carousel } from 'antd';

const contentStyle = {
    height: document.body.clientWidth * 0.377 * 0.75,
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
};

const RecommendBlock = () => {

    return (
        <RecommendBlockWrapper>
            <div className="pageContainer">
                <div className="head_picture">
                    <Carousel autoplay>
                        <div>
                            <img src="https://image.gcores.com/961c1602-f178-43cb-b231-ebb7d693c6c8.png?x-oss-process=image/resize,limit_1,m_fill,w_938,h_525/quality,q_90" style={contentStyle} />
                        </div>
                        <div>
                            <img src="https://image.gcores.com/6e9d3bc7-bd93-4f34-bdb0-bc76901b1b6e.jpg?x-oss-process=image/resize,limit_1,m_fill,w_938,h_525/quality,q_90" style={contentStyle} />
                        </div>
                        <div>
                            <img src="https://image.gcores.com/61868533-e76c-4fa2-9562-1555e5683709.png?x-oss-process=image/resize,limit_1,m_fill,w_938,h_525/quality,q_90" style={contentStyle} />
                        </div>
                        <div>
                            <img src="https://image.gcores.com/5a1ceed7-75ae-42c3-8c17-e6db8b14b3df.jpg?x-oss-process=image/resize,limit_1,m_fill,w_938,h_525/quality,q_90" style={contentStyle} />
                        </div>
                    </Carousel>
                </div>
                <div className="suggest_list">
                    <img src="https://image.gcores.com/3aa067dc-e46a-45d9-be6b-f48785632155.jpg?x-oss-process=image/resize,limit_1,m_fill,w_328,h_395/quality,q_90" style={contentStyle} />
                </div>
            </div>
        </RecommendBlockWrapper>
    )
};

export default RecommendBlock