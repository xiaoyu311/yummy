import React from 'react'
import './title-header.css'

class TitleHeader extends React.Component {
  render() {
    return(
      <div className="title-header">
        {this.props.title}
      </div>
    )
  }
}


export default TitleHeader
