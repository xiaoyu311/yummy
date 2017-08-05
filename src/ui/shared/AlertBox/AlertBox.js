import React from 'react'
import './alertBox.css'
import { connect } from 'react-redux'


class AlertBox extends React.Component{

  closeAlert = () => {
    this.props.dispatch({type:'HIDE_ALERT'})
  }
  render(){
    return(
      <div className= {this.props.showAlert ? "alert-box show" : "alert-box"}>
        <div className="alert-content-card">
          <div className="alert-msg">
            {this.props.alertMsg}
          </div>
          <div
            onClick={this.closeAlert}
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
