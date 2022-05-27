import React from "react";
import { RecommendBlockWrapper } from "./style";
import 'antd/dist/antd.css';
import { Carousel } from 'antd';
import Axios from "../../utils/axios";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const contentStyle = {
    height: document.body.clientWidth * 0.377 * 0.75,
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
};

class RecommendBlock extends React.Component {

    state = {
        url: "",
        data: []
    }
    componentDidMount() {
        Axios.get("/ad").then(
            res => {
                this.setState({ url: res.data.content.url })
            }
        )
        Axios.get("/recommend").then(
            res => {
                this.setState({
                    data: res.data.content.map(
                        item => {
                           return <div>
                                <Link to={"/article/" + item.articleId}>
                                    <img src={item.head_img} key={item.id} style={contentStyle} />
                                </Link>
                            </div>
                        }
                    )
                })
            }
        )
    }

    render() {
        return (
            <RecommendBlockWrapper>
                <div className="pageContainer">
                    <div className="head_picture">
                        <Carousel autoplay>
                            {this.state.data}
                        </Carousel>
                    </div>
                    <div className="suggest_list">
                        <img src={this.state.url} style={contentStyle} />
                    </div>
                </div>
            </RecommendBlockWrapper >
        )
    }
};

export default RecommendBlock