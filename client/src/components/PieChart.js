import React, {Component} from 'react';
import {
  Chart,
  Geom,
  Axis,
  Tooltip,
  Coord,
  Label,
  Legend,
} from "bizcharts";

class PieChart extends Component {
  render() {
    return (
      <div>
        <Chart
          height={250}
          data={this.props.data}
          padding={[0, 0, 60, 0]}
          forceFit
        >
          <Coord type="theta" radius={0.9} />
          <Axis name="count" />
          <Legend
            position="bottom"
          />
          <Tooltip
            showTitle={false}
            itemTpl="<li><span style=&quot;background-color:{color};&quot; class=&quot;g2-tooltip-marker&quot;></span>{name}: {value}</li>"
          />
          <Geom
            type="intervalStack"
            position="count"
            color={this.props.colorSet}
            tooltip={[
              "item*count",
              (item, count) => {
                return {
                  name: item,
                  value: count
                };
              }
            ]}
            style={{
              lineWidth: this.props.intervalWidth,
              stroke: "#fff"
            }}
          >
          </Geom>
        </Chart>
      </div>
    );
  }
}

PieChart.defaultProps={
  intervalWidth: 2,
  colorSet: 'item'
}

export default PieChart