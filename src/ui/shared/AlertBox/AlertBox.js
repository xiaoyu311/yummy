import React from 'react'
import './alertBox.css'
import { connect } from 'react-redux'


class AlertBox extends React.Component{

  closeAlert = (e) => {
    if (e.target.className === "alert-close-button" || e.target.className === "alert-box show") {
      this.props.dispatch({type:'HIDE_ALERT'})
    }
  }
  render(){
    return(
      <div onClick={this.closeAlert} className= {this.props.showAlert ? "alert-box show" : "alert-box"}>
        <div className="alert-content-card">
          <div className="alert-msg">
            {this.props.alertMsg}
          </div>
          <div
            className="alert-close-button">
            关闭
          </div>
        </div>
      </div>
    )
  }
}
const mapStateToProps = (state) => ({
  showAlert:state.appReducer.showAlert,
  alertMsg:state.appReducer.alertMsg
})
export default connect(mapStateToProps)(AlertBox)
