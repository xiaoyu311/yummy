import React, { Component } from 'react'
import TitleHeader from '../../shared/TitleHeader/TitleHeader'
import './profile.css'
import axios from 'axios'
import settings from '../../../settings'
import { connect } from 'react-redux'
import EditIcon from '../../icons/EditIcon'
import Toggle from 'react-toggle'
import { Link } from 'react-router-dom'



class Profile extends Component {
  state = {
    EditShow:true,
    baconIsReady:false
  }
  selectFile = (e) => {
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.onload = () => {
      let formData = new FormData()
      formData.append('avatar', file)
      formData.append('userId', localStorage.getItem('userId'))
      axios.post(`${settings.host}/avatar`, formData)
        .then( res =>{
          this.props.dispatch({type:'LOAD_AVATAR', avatar:`${settings.host}/uploads/avatars/${res.data.user.avatar}`})
          localStorage.setItem('avatar', res.data.user.avatar)
        })
    }
    reader.readAsDataURL(file)
  }
  Edit = () => {
    this.setState({EditShow:false})
  }
  Hold = (e) => {
    let slogan = this.input.value
    let username = this.props.username
    if (slogan !== '') {
      axios.put(`${settings.host}/user`, {slogan, username})
        .then( res =>{
          this.props.dispatch({type:'EDIT', edit:res.data.user.slogan})
          this.setState({EditShow:true})
        })
        .catch( err =>console.log(err))
    }
  }
  render() {
    if (this.props.users) {
      var id = Object.keys(this.props.users).map( item => item)
    }
    return(
      <div className="profile">
        <div className="profile-header-wrap">
          <TitleHeader title="个人中心" />
          <div className="profile-header">
            <div className="profile-user-wrap">
              <div className="profile-img">
                <label style={{backgroundImage:`url(${this.props.avatar})`}}>
                  <input type="file" onChange={this.selectFile} />
                </label>
              </div>
              <div className="profile-user">
                <div className="profile-user-name">{this.props.username}</div>
                <div className="profile-user-signature">
                  <input
                    ref={value => this.input = value}
                    style={{display:this.state.EditShow?'none':'block'}}
                    type="text"
                    placeholder="编辑个性签名" />
                  <div style={{display:this.state.EditShow ?'block':'none'}}>
                    {this.props.edit}
                  </div>
                </div>
              </div>
            </div>
            <div style={{marginRight:'15px'}}>
              <div
                style={{display:this.state.EditShow ?'block':'none'}}
                onClick={this.Edit}>
                  <EditIcon color={'#fff'} />
              </div>
              <div
                style={{display:this.state.EditShow ?'none':'block'}}
                onClick={this.Hold}
                id="hold">
                  保存
              </div>
            </div>
          </div>
        </div>
        <div className="profile-main">
          {
            this.props.users === null ? null :
              id.map( id =>
                <div className="friend-item" key={id}>
                  <div className="friend-name-wrap">
                    <Link to={`/user/${this.props.users[id].username}`}>
                      <img src={this.props.users[id].avatar? `${settings.host}/uploads/avatars/${this.props.users[id].avatar}` : 'https://github.com/xiaoyu311/yummy-images/blob/master/default-avatar.png?raw=true'} alt="img" />
                    </Link>
                    <div className="friend-name">{this.props.users[id].username}</div>
                  </div>
                  <label>
                    <Toggle
                      defaultChecked={this.state.baconIsReady}
                      icons={false}/>
                  </label>
                </div>
              )
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  avatar:state.avatar,
  username:state.account.currentUser,
  edit:state.edit,
  users:state.users
})
export default connect(mapStateToProps)(Profile)
