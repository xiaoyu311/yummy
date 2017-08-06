import React, { Component } from 'react'
import {
  Link
} from 'react-router-dom'
import './sidebar.css'

import { slide as Menu } from 'react-burger-menu'
import { connect } from 'react-redux'


class Sidebar extends Component {

  state = {
    isOpen: false
  }

  closeBmMenu = () => {
    this.setState({
      isOpen: false
    })
  }

  logout = () => {
    localStorage.removeItem('userId')
    this.props.dispatch({type:'LOG_OUT'})
    this.props.dispatch({type:'LOAD_AVATAR', avatar:`http://media.haoduoshipin.com/yummy/default-avatar.png`})
  }
  render() {
    let userInfo = (
      <div>
        <Link to="" className="bm-user-left">
          {this.props.username}
        </Link>
        <Link to="/"
          onClick={this.logout}
          className="bm-user-right">
            退出
        </Link>
      </div>
    )
    let authStr = (
      <div onClick={this.closeBmMenu}>
        <Link to="/signup" className="bm-user-left">
          注册
        </Link>
        <Link to="/login"
          className="bm-user-right">
            登录
        </Link>
      </div>
    )
    return(
      <div className="sidebar">
        <Menu isOpen={this.state.isOpen}>
          <div className="bm-user-info">
            <img src={this.props.avatar} alt="avatar" />
            <div className="bm-user-auth">
              {this.props.isAuthenticated ? userInfo : authStr}
            </div>
          </div>
          <div className="bm-link-list">
            <Link onClick={this.closeBmMenu} to="/dashboard">商品选择</Link>
            <Link onClick={this.closeBmMenu} to={this.props.isAuthenticated?'/profile':'/login'}>个人中心</Link>
            <Link onClick={this.closeBmMenu} to="/cart">购物车</Link>
            <Link onClick={this.closeBmMenu} to="/dishes">猜你喜欢</Link>
          </div>
          <button onClick={this.closeBmMenu} className="bm-close-button">
            关闭
          </button>
        </Menu>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  username:state.account.currentUser,
  isAuthenticated:state.account.isAuthenticated,
  avatar:state.avatar
})
export default connect(mapStateToProps)(Sidebar)
