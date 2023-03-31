import React from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Label, Tooltip } from "recharts";

function GraphArea(props) {
  //Converting Y-Axis label in lacs
  const formatYAxisInLac = (tickItem) => {
    return `${tickItem / 100000}`;
  };

  const dataArray = [
    {
      label: "Start Today",
      Amount: props.graphData && props.graphData.startToday,
      fill: "#5D9C59",
    },
    {
      label: "Delayed Start",
      Amount: props.graphData && props.graphData.delayedStart,
      fill: "#BCE29E",
    },
    {
      label: "Notional Loss",
      Amount: props.graphData && props.graphData.notionalLoss,
      fill: "#DF2E38",
    },
  ];

  function toIndianRupees(sum) {
    return parseInt(sum)
      .toString()
      .replace(/\D/g, "")
      .replace(/(\d+?)(?=(\d\d)+(\d)(?!\d))(\.\d+)?/g, "$1,");
  }

  const formatValue = (label) => {
    if (label === "Start Today") 
      return toIndianRupees(props.graphData.startToday);
    
    if (label === "Delayed Start") 
      return toIndianRupees(props.graphData.delayedStart);
    
    if (label === "Notional Loss") 
      return toIndianRupees(props.graphData.notionalLoss);
    
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="customTooltip">
          <div className="labelData">{label}</div>
          <div className="tooltipAmount">₹{formatValue(label)}</div>
        </div>
      );
    }
  };

  return (
    <div className="rightContainer">
      <p className="graphText">
        Delay of &nbsp;
        <span className="delay">
          {props.delay} {props.delay > 1 ? " months " : " month "}
        </span>
        in starting your SIP will cause a notional loss of
        <h2 className="lossAmount">
          ₹ {toIndianRupees(props.graphData && props.graphData.notionalLoss)}
        </h2>
         in the final value of your investment.
      </p>
      <ResponsiveContainer height="40%" width="80%" aspect={1.3}>
        <BarChart className="barGraph" data={dataArray}>
          <XAxis dataKey="label" fill="#5E73EB" />
          <YAxis width={110} tickFormatter={formatYAxisInLac}>
            <Label
              angle={270}
              position="left"
              offset={-1}
              value="Amount (Rs. in Lacs)"
              style={{
                textAnchor: "middle",
                fontSize: "100%",
                fill: "rgba(0, 0, 0, 0.56)",
              }}
            ></Label>
          </YAxis>
          <Tooltip
            cursor={false}
            content={<CustomTooltip />}
            wrapperStyle={{ outline: "none" }}
            allowEscapeViewBox={{ x: true, y: true }}
          />
          <Bar dataKey="Amount" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default GraphArea;
