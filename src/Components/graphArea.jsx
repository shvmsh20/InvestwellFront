import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Label,
  Tooltip,
} from "recharts";

function GraphArea(props) {
  const formatYAxis = (tickItem) => {
    return `${tickItem / 100000}`;
  };

  const Array = [
    {
      name: "Start Today",
      Amount: props.graphData && props.graphData.startToday,
      fill : "#5D9C59",
    },
    {
      name: "Delayed Start",
      Amount: props.graphData && props.graphData.delayedStart,
      fill : "#BCE29E"
    },
    {
      name: "Notional Loss",
      Amount: props.graphData && props.graphData.notionalLoss,
      fill: "#DF2E38",
    },
  ];

  function toIndianRupees(sum) {
    return Number(sum)
      .toString()
      .replace(/\D/g, "")
      .replace(/(\d+?)(?=(\d\d)+(\d)(?!\d))(\.\d+)?/g, "$1,");
  }

  return (
    <div className="rightContainer">
      <p className="graphText">
        Delay of{" "}
        <span className="delay">
          {props.delay} {props.delay > 1 ? "months" : "month"}{" "}
        </span>{" "}
        in starting your SIP will cause a notional loss of{" "}
        <span className="notionalLoss">
          {" "}
          <br />₹{toIndianRupees(props.graphData.notionalLoss)}
        </span>
        <br /> in the final value of your investment.
      </p>
      <ResponsiveContainer height="40%" width="80%" aspect={1.3}>
        <BarChart
          className="barGraph"
          data={Array}
          width={200}
          max-height={200}
        >
          <XAxis dataKey="name" fill="#5E73EB" />
          <YAxis width={110} tickFormatter={formatYAxis}>
            <Label
              angle={270}
              position="left"
              offset={-1}
              value="Amount (Rs. in Lakh)"
              style={{
                textAnchor: "middle",
                fontSize: "100%",
                fill: "rgba(0, 0, 0, 0.56)",
              }}
            ></Label>
          </YAxis>
          <Tooltip cursor={false} />
          <Bar dataKey="Amount" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default GraphArea;
