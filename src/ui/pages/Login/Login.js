import React, { Component } from 'react'
import TitleHeader from '../../shared/TitleHeader/TitleHeader'
import './login.css'
import axios from 'axios'
import {
  Link
} from 'react-router-dom'
import Settings from '../../../settings'
import { connect } from 'react-redux'

class Login extends Component {

  handlelogin = (e) => {
    e.preventDefault()
    let username = this.usernameInput.value
    let password = this.passwordInput.value
    axios.post(`${Settings.host}/user/login`, {username, password})
      .then( res => {
        this.props.dispatch({type:'SIGN_UP', username:res.data.username})
        this.props.history.push('/dashboard')
        localStorage.setItem('userId',res.data.userId)
      })
      .catch( err => this.props.dispatch({type:'SHOW_ALERT',alertMsg:err.response.data.msg}))
  }

  render() {
    return(
      <div className="login">
        <TitleHeader title="login" />
        <div className="login-content">
          <div className="login-hero" >
            <h1 className="title">
              登录
            </h1>
            <p className="slogan">
              连接小而确定的幸福
            </p>
          </div>
          <form onSubmit={this.handlelogin} className="login-form">
            <div className="login-text-inputs">
              <div className="login-text-inputs-inner">
                <input ref={value => this.usernameInput = value} type="text" placeholder="用户名" />
                <input ref={value => this.passwordInput = value} type="password" placeholder="password" />
              </div>
            </div>
            <div className="login-actions">
              <button type="submit">登录</button>
            </div>
          </form>
          <div className="login-other-option">
            <Link to="/signup">没有账号？请先注册</Link>
          </div>
        </div>
      </div>
    )
  }
}


export default connect(null)(Login)
