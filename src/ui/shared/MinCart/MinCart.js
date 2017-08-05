import React, { Component } from 'react'
import CartIcon from '../../icons/CartIcon'
import './mincart.css'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'


class MinCart extends Component {
  handClick = () => {
    this.props.history.push('/cart')
  }
  render() {
    return (
      <div onClick={this.handClick} className="mincart">
        <CartIcon color={'#F77062'} />
        <div>{this.props.cart.length}</div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  cart:state.cart
})
export default connect(mapStateToProps)(withRouter(MinCart))
