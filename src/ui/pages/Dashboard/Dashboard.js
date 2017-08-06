import React, { Component } from 'react'
import TitleHeader from '../../shared/TitleHeader/TitleHeader'
import './dashboard.css'
import FeedItem from './FeedItem'
import { connect } from 'react-redux'
import MinCart from '../../shared/MinCart/MinCart'

class Dashboard extends Component  {
  render() {
      if (Object.keys(this.props.comments).length !== 0) {
        const ids = Object.keys(this.props.comments).map( id => id)
        return(
          <div className="dashboard">
            <TitleHeader title="好友更新"/>
            <div className="feed-wrap">
              {
                Object.keys(this.props.comments).length !== 0?
                ids.map((id) =>
                  <FeedItem
                    key={id}
                    id={this.props.comments[id].dish._id}
                    name={this.props.comments[id].user.username}
                    comment={this.props.comments[id].content}
                    src={this.props.comments[id].dish.poster}
                    time={this.props.comments[id].createdAt}
                    avatar={this.props.comments[id].user.avatar} />

                )
                :
                null
            }
          </div>
          <MinCart />
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

export default connect(mapStateToProps)(Dashboard)
