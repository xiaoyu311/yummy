import React, { Component } from 'react'
import { connect } from 'react-redux'
import TitleHeader from '../../shared/TitleHeader/TitleHeader'
import './dishId.css'
import CartIcon from '../../icons/CartIcon'
import CommentIcon from '../../icons/CommentIcon'
import MinCart from '../../shared/MinCart/MinCart'
import Rechart from './Rechart'
import DishIdComment from './DishIdComment'

class Dish extends Component {
  state = {
    show:false
  }
  addCart = (dish, id) => {
    if (this.props.cart.filter( item => item.id === this.props.match.params.id).length === 0) {
      this.props.dispatch({type:'ADD_CART', cart:{...dish, id:id, num:1}})
    }
  }

  showComment = () => {
    this.setState({show:!this.state.show})
  }

  render(){
    if(Object.keys(this.props.dishes).length !== 0) {
      const { dishes } = this.props
      const { id } = this.props.match.params
      let dish = dishes[id]
      return(
         <div className="dish">
           <TitleHeader title={dish.name} />
             <div className="dish-info">
               <div className="dish-img-wrap">
                 <div style={{ 'backgroundImage' : `url(${dish.poster})`}}
                   className="img">
                 </div>
               </div>
               <div className="comment">
                 <div className="dish-shop">
                   <div className="dish-name">{dish.name}</div>
                   <div className="dish-price">{dish.price}元</div>
                   <div onClick={() => this.addCart(dish, id)}>
                     <CartIcon color={this.props.cart.filter( item => item.id === id).length === 0?'#ccc':'#F77062'} />
                   </div>
                 </div>
                 <div className="comment-show">{dish.desc}</div>
                 <div className="comment-number">
                   <div onClick={this.showComment}>
                     <CommentIcon color={this.state.show?'#F77062':'#ccc'} />
                   </div>
                 </div>
                  <DishIdComment style={this.state.show} id={id} />
                 <Rechart id={id} />
               </div>
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
  dishes: state.dish.all,
  cart:state.cart
})

export default connect(mapStateToProps)(Dish)
