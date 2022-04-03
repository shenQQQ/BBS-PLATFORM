import 'antd/dist/antd.css'
import React from 'react';

import Side_bar from "./components/side_bar";
import Article from './pages/article';
import Home from './pages/home';
import Header from './components/header';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Content from './pages/content';
import SearchPage from './pages/searchPage';
import SignupPage from './pages/signUpPage';
import FlashMessageList from './components/flash/flashMessageList';
import LoginPage from './pages/loginPage';
import authByLocalStorageToken from './utils/authByLocalStorageToken';
import MyArticle from './pages/myArticle';
import MyCollect from './pages/myCollect';
import Contribution from './pages/contribution';

const mainStyle = {
  margin: '0 0 0 250px',
  display: 'block',
  background: '#fff',
};

class App extends React.Component {
  componentDidMount() {
    authByLocalStorageToken();
  }

  render() {
    return (
      <Router>
        <div>
          <Side_bar />
          <Header />
          <FlashMessageList />
          <div style={mainStyle}>
            <Route exact path="/" component={Home}></Route>
            <Route path="/home" component={Home}></Route>
            <Route path="/articleList" component={Article}></Route>
            <Route path="/article/*" component={Content}></Route>
            <Route path="/searchPage" component={SearchPage}></Route>
            <Route path="/signup" component={SignupPage}></Route>
            <Route path="/login" component={LoginPage}></Route>
            <Route path="/myArticle" component={MyArticle}></Route>
            <Route path="/myCollect" component={MyCollect}></Route>
            <Route path="/contribution" component={Contribution}></Route>
          </div>
        </div>
      </Router>
    );
  }
};

export default App;
