import React, { Component } from 'react'
import './dishes.css'
import TitleHeader from '../../shared/TitleHeader/TitleHeader'
import { connect } from 'react-redux'
import CommentIcon from '../../icons/CommentIcon'
import { Link } from 'react-router-dom'


class Dishes extends Component {

  state = {
    width:'',
    index:0,
  }

  handleTouchStart = (e) => {
    this.startTime = new Date().getTime()
    this.startX = e.targetTouches[0].pageX
  }

  handleTouchNext = () => {
    this.setState({index:this.state.index+1})
  }

  handleTouchPrev = () => {
    this.setState({index:this.state.index-1})
  }

  handleTouchEnd = (e) => {
    let startX = this.startX
    let startTime = this.startTime
    let endTime = new Date().getTime()
    let endX = e.changedTouches[0].pageX
    let pageX = Math.abs(startX - endX)
    let pageTime = endTime - startTime
    if (Object.keys(this.props.dishes).length !== 0 ) {
      if (this.checkSwipe(pageX, pageTime)) {
        if (startX > endX && this.state.index <= Object.keys(this.props.dishes).length - 2 ) {
          this.handleTouchNext()
        }else if (startX < endX && this.state.index >= 1) {
          this.handleTouchPrev()
        }else {
          return
        }
      }
    }
  }

  checkSwipe = (pageX, pageTime) => {
    if (pageX>10 && pageTime<300) {
      return true
    }else {
      return false
    }
  }

  handleClick = (index) => {
    this.setState({index:index})
  }

  componentDidMount(){
    this.setState({width:window.innerWidth})
  }


  render() {
    let style = {
      width:3*this.state.width,
      transform:`translate(-${this.state.width*this.state.index}px, 0)`,
      transition:'transform .4s'
    }
    return(
      <div className="dishes">
        <TitleHeader title="猜你喜欢" />
        <div style={{width:this.state.width}} className="dishes-wrap">
          <div
            onTouchStart={this.handleTouchStart}
            onTouchEnd={this.handleTouchEnd}
            style={style}
            className="dishes-show">
            {
              Object.keys(this.props.dishes).length === 0?null:
                Object.keys(this.props.dishes).map( (id, index) =>
                  <div style={{width:this.state.width}} className="dishes-show-item" key={id}>
                    <div className="dishes-dishId-show">
                      <Link to={`/dish/${id}`}><img src={this.props.dishes[id].poster} alt="img" /></Link>
                      <div className="dishes-dishId-comment">
                        <div className="dishes-dishId-name">{this.props.dishes[id].name}</div>
                        <div className="dishes-dishId-price">{this.props.dishes[id].price}元</div>
                        <div className="dishes-dishId-icon"><CommentIcon color={'#ccc'} /></div>
                        <div className="dishes-dishId-comment-show">{this.props.dishes[id].desc}</div>
                      </div>
                    </div>
                  </div>
                )
            }
          </div>
        </div>
        <div className="dishes-btn-wrap">
          {
            Object.keys(this.props.dishes).length === 0?null:
              Object.keys(this.props.dishes).map( (id, index) =>
              <div key={id} style={{background:this.state.index === index?'yellow':'#fff'}} onClick={() => this.handleClick(index)} className="dishes-btn"></div>
            )
          }
        </div>
      </div>
    )
  }
}


const mapStateToProps = (state) => ({
  dishes:state.dish.all
})
export default connect(mapStateToProps)(Dishes)
