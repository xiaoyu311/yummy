import React, { Component } from 'react'
import TitleHeader from '../../shared/TitleHeader/TitleHeader'
import './cart.css'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'


class Cart extends Component {
  state = {
    total:0
  }
  fun = () => {
    var total = 0
    for (var i = 0; i < this.props.cart.length; i++) {
      total = this.props.cart[i].num * this.props.cart[i].price + total
    }
    this.props.dispatch({type:'TOTAL', num:total})
  }
  addClick = (id) => {
    this.props.dispatch({type:'ADD_NUM', id:id})
    this.fun()
  }
  subClick = (item) => {
    if (item.num > 0) {
      this.props.dispatch({type:'SUB_NUM', id:item.id})
      this.fun()
    }
  }
  balance = () => {
    if (this.props.total !== 0) {
      this.props.dispatch({type:'SHOW_ALERT', alertMsg:'购买成功'})
      this.props.dispatch({type:'KONG', cart:[]})
    }else {
      this.props.dispatch({type:'SHOW_ALERT', alertMsg:'请先选择商品'})
    }
    this.props.history.push("/dashboard")
  }
  componentDidMount(){
    if (this.props.cart.length !== 0) {
      this.fun()
    }
  }
  render() {
    return(
      <div className="cart">
        <div className="cart-header">
          <TitleHeader title="购物车" />
          <div className="cart-total">${this.props.total}</div>
        </div>
        <div className="cart-item-wrap">
          <div className={this.props.cart.length === 0?"cart-item-all-two":"cart-item-all"}>
            {
              this.props.cart.length === 0 ?
              <Link to="/dashboard">点我去购物</Link>
              :
              this.props.cart.map( item =>
                <div key={item.id} className="cart-item">
                  <div className="cart-item-left">
                    <img style={{width:'80px', height:'80px'}} src={item.poster} alt="img" />
                    <div className="cart-item-name-wrap">
                      <div className="cart-item-name">{item.name}</div>
                      <div className="cart-item-price">${item.price}</div>
                    </div>
                  </div>
                  <div className="cart-item-right">
                    <div onClick={() => this.subClick(item)} className="cart-item-btn">-</div>
                    <div style={{width:'40px', lineHeight:'40px', borderRadius:'20px', background:'#F77062', color:'#fff', fontWeight:'600', fontSize:'18px'}}>{item.num}</div>
                    <div onClick={() => this.addClick(item.id)} className="cart-item-btn">+</div>
                  </div>
                </div>
              )
            }
          </div>
          <div onClick={this.balance} className="cart-balance">结算</div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  cart:state.cart,
  total:state.total
})
export default connect(mapStateToProps)(Cart)
