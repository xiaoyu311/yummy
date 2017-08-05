import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import CommentIcon from '../../icons/CommentIcon'
import moment from 'moment'
import settings from '../../../settings'

class FeedItem extends Component {

  state = {
    expand: false
  }

  toggleExpand = () => {
    this.setState({
      expand: !this.state.expand
    })
  }

  render() {
    return(
      <div className={`feed-item ${this.state.expand  ? 'expand' : ''}`}>
        <div className="feed-expand">
          {this.props.comment}
        </div>
        <div className="feed-card">
          <div className="feed-card-header">
            <div className="feed-user">
              <Link to={`/user/${this.props.name}`}>
                <img
                  src={this.props.avatar? `${settings.host}/uploads/avatars/${this.props.avatar}` :'http://media.haoduoshipin.com/yummy/default-avatar.png'}
                  alt="avtar" />
              </Link>
                <div className="feed-user-info">
                  <div className="feed-username">
                    {this.props.name}
                  </div>
                  <div className="feed-time">
                    {moment(this.props.time).fromNow()}
                  </div>
                </div>
            </div>
            <div className="feed-button"
                onClick={this.toggleExpand}
                to="" >
                <CommentIcon color={ this.state.expand ? '#FE5196' : '#D0D0D0'}/>
            </div>
          </div>
          <Link style={{ 'backgroundImage': `url(${this.props.src})`}}
            to={`/dish/${this.props.id}`} className='feed-dish'>
          </Link>
      </div>
    </div>
    )
  }
}

export default FeedItem
