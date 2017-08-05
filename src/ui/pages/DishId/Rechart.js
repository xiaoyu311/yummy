import React, { Component } from 'react'
import { PieChart, Pie, Cell, AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, Area} from 'recharts';
import './rechart.css'
import { connect } from 'react-redux'


class Rechart extends Component {
  state = {
    show:[]
  }
  handleClick = (item) => {
    var show = [item, ...this.state.show]
    this.setState({show:show})
  }
  render() {
    const newData = this.props.rechart.filter( item =>
      {
         if (item.includes(this.props.id)) {
           return item
         }else{
           return null
         }
      })
    const data = newData[0]
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
    return(
      <div className="rechart">
        <div className="rechart-title">营养成分</div>
        <PieChart width={300} height={300}>
          <Pie

            data={data}
            dataKey="uv"
            cx="50%"
            cy="50%"
            nameKey={data.name}
            innerRadius={30}
            outerRadius={75}
            fill="#8884d8"
            >
            {
              data.map((item, index) =>
                <Cell
                  key={data[index].name}
                  onClick={() => this.handleClick(item.name)}
                  fill={COLORS[index % COLORS.length]}/>
              )
            }
          </Pie>
        </PieChart>
        <div>
          {
            data.map( (item, index ) =>
              <div
                style={{
                  background:COLORS[index]
                }}
                key={index}
                className={this.state.show.includes(item.name)?'percent-show percent-show-show':'percent-show'}>{item.percent}</div>
            )
          }
        </div>
        <div style={{marginBottom:'20px'}} className="rechart-title">销售额</div>
        <AreaChart
          width={300}
          height={200}
          data={data}
          margin={{top: 10, right: 30, left: 0, bottom: 0}}>
            <XAxis dataKey="month"/>
            <YAxis/>
            <CartesianGrid strokeDasharray="3 3"/>
            <Tooltip/>
            <Area type='monotone' dataKey='sale' stroke='#0088FE' fill='#00C49F' />
        </AreaChart>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  rechart:state.rechart
})
export default connect(mapStateToProps)(Rechart)
