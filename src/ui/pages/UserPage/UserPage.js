import React, { Component } from 'react'
import TitleHeader from '../../shared/TitleHeader/TitleHeader'
import './userpage.css'
import { connect } from 'react-redux'
import settings from '../../../settings'

class UserPage extends Component {
  render(){
    let { users } = this.props
    let { username } = this.props.match.params
    if (users) {
      let usersAll = Object.keys(users).map( id => users[id])
      var user = usersAll.filter( item => item.username === username)[0]
      console.log(user);

    }
    return(
      <div className="userpage">
        <TitleHeader title="好友简介" />
        {
          users ?
          <div className="userpage-wrap">
            <img
              src={user.avatar?`${settings.host}/uploads/avatars/${user.avatar}`:'http://media.haoduoshipin.com/yummy/default-avatar.png'}
              alt="img" />
            <div className="userpage-name">{user.username}</div>
            <div className="userpage-synopsis">
              <div className="userpage-qianming">
                个性签名
              </div>
              <div className="userpage-show">
                {
                  user.slogan? user.slogan :'无个性签名'
                }
              </div>
              <div className="userpage-lianxi">
                <div>Q+</div>
                <div>f+</div>
                <div>g+</div>
                <div>W+</div>
              </div>
              <div className="userpage-fensi">
                <div style={{borderRight:'1px solid #ccc'}}>
                  <div>购买</div>
                  <div>13</div>
                </div>
                <div>
                  <div>粉丝</div>
                  <div>15</div>
                </div>
              </div>
            </div>
            <div className="userpage-btn">加为好友</div>
          </div>
          : null
        }
      </div>
    )
  }
}


const mapStateToProps = (state) => ({
  users:state.users
})
export default connect(mapStateToProps)(UserPage)
