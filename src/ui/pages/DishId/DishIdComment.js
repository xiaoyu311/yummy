import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import axios from 'axios'
import settings from '../../../settings'
import { Link } from 'react-router-dom'

class DishIdComment extends Component {

  content = () => {
    let content = this.input.value.trim()
    let user = localStorage.getItem('userId')
    let dish = this.props.id
    axios.post(`${settings.host}/comment`, {content, user, dish})
      .then( res =>{
        axios.get(`${settings.host}/comments`).then(
          res => {
            const { comments } = res.data
            this.props.dispatch({ type: 'LOAD_COMMENTS', comments })
          }
        )
        this.input.value = ''
      })
      .catch(err => console.log(err))
  }

  render(){
    if (Object.keys(this.props.comments).length !== 0) {
      const ids = Object.keys(this.props.comments).map( id => id)
      const commentsWrap = ids.map( id =>this.props.comments[id])
      const commentsId = commentsWrap.filter( item => item.dish._id === this.props.id)
      return(
        <div style={{height:this.props.style? `${commentsId.length*86+65}px`:null}} className={"comment-all-wrap"}>
          {
            commentsId.map((item, index) =>
              <div key={index} className="comment-write">
                <div className="comment-write-name-wrap">
                  <Link to={`/user/${item.user.username}`}>
                    <img
                      src={item.user.avatar?`${settings.host}/uploads/avatars/${item.user.avatar}`:'https://github.com/xiaoyu311/yummy-images/blob/master/default-avatar.png?raw=true'}
                      alt="img" />
                  </Link>
                  <div className="comment-write-wrap">
                    <div className="comment-write-name">{item.user.username}</div>
                    <div className="comment-write-show">{item.content}</div>
                  </div>
                </div>
                <div className="comment-write-time">{moment(item.createdAt).fromNow()}</div>
              </div>
            )
          }
          <div className="comment-btn">
            <input ref={value => this.input = value} type="text" />
            <button onClick={this.content}>评论</button>
          </div>
        </div>
      )
    }else {
      return null
    }
  }
}

const mapStateToProps = (state) => ({
  comments:state.comments
})
export default connect(mapStateToProps)(DishIdComment)
