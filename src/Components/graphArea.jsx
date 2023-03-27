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

function GraphArea(props){
  const Array = [
    {
      name: "Start Today",
      Amount: props.graphData && props.graphData.startToday,
    },
    {
      name: "Delayed Start",
      Amount: props.graphData && props.graphData.delayedStart,
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
        After {props.investmentPeriod} years, you will have
        <br />
        <span className="totalAmount">
          ₹ {toIndianRupees(props.graphData.delayedStart)}
        </span>
        <br />
        That's{" "}
        <span className="potentialAmount">
          ₹ {toIndianRupees(props.graphData.startToday)}
        </span>{" "}
        as potential capital gains <br /> on your investment of
        <span className="delay">
          {" "}
          ₹ {toIndianRupees(props.monthlyInvestment)}
        </span>
      </p>
      <ResponsiveContainer height="40%" width="80%" aspect={1.3}>
        <BarChart
          className="barGraph"
          data={Array}
          width={200}
          max-height={200}
        >
          <XAxis dataKey="name" fill="#5E73EB" />
          <YAxis width={110}>
            <Label
              angle={270}
              position="left"
              offset={-1}
              value="Amount (Rs.)"
              style={{
                textAnchor: "middle",
                fontSize: "100%",
                fill: "rgba(0, 0, 0, 0.56)",
              }}
            ></Label>
          </YAxis>
          <Tooltip cursor={false} />
          <Bar dataKey="Amount" fill="#5E73EB" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GraphArea;
