import React, { useState, useEffect } from "react";
import axios from "axios";
import SliderArea from "../../src/Components/sliders";
import GraphArea from "../../src/Components/graphArea";
import ErrorPage from "../../src/Components/errorPage";

function Calculator() {
  const [monthlyInvestment, setMonthlyInvestment] = useState(500);
  const [investmentPeriod, setInvestmentPeriod] = useState(1);
  const [rateOfReturn, setRateOfReturn] = useState(1);
  const [delay, setDelay] = useState(1);

  // const [monthlyInvestmentInput, setMonthlyInvestmentInput] = useState(500);
  // const [investmentPeriodInput, setInvestmentPeriodInput] = useState(1);
  // const [rateOfReturnInput, setRateOfReturnInput] = useState(1);
  // const [delayInput, setDelayInput] = useState(1);

  const [inputVal,setInputVal] = useState();
  const[invalidInputStatus,setInvalidInputStatus] = useState();
  const[invalidInputType,setInvalidInputType]=useState();

  const [graphData, setGraphData] = useState({});

  const [err, setErr] = useState(false);
  const [
    invalidInputStatusMonthlyInvestment,
    setInvalidInputStatusMonthlyInvestment,
  ] = useState(false);
  const [
    invalidInputStatusInvestmentPeriod,
    setInvalidInputStatusInvestmentPeriod,
  ] = useState(false);
  const [invalidInputStatusRateOfReturn, setInvalidInputStatusRateOfReturn] =
    useState(false);
  const [invalidInputStatusDelay, setInvalidInputStatusDelay] = useState(false);

  //Set Values of monthly investment,rate of return, investmment period, delay

  function onSliderChange(type, val) {
    switch (type) {
      case "monthlyInvestment":
        setMonthlyInvestment(val);
        break;
      case "investmentPeriod":
        setInvestmentPeriod(val);
        break;
      case "rateOfReturn":
        setRateOfReturn(val);
        break;
      case "delay":
        setDelay(val);
        break;
        default: 

    }
  }


  const setRange = (type) => {
    switch (type) {
      case "monthlyInvestment":
        return [500, 100000];
      case "investmentPeriod":
        return [1, 30];
      case "rateOfReturn":
        return [1, 30];
      case "delay":
        return [1, 120];
        default: 

    }
  };

 
  const handleSliderChange = (event, newValue, type) => {
    onSliderChange(type, newValue);
    setInputVal(newValue);
    setInvalidInputType(type);
  }
  const handleInputChange = (event, type) => {
    //FrontEnd validations

    const [min, max] = setRange(type);
    const val = event.target.value;

    if (Number(val) < min) {
      onSliderChange(type, min);
      invalidInputType(type);
    } else if (Number(val) > max) {
      onSliderChange(type, max);
      invalidInputType(type);
    } else {
      onSliderChange(type, Number(val));
    }
  };

  const handleBlur = (event, type) => {

    const [min, max] = setRange(type);

    const val = event.target.value;

    if (Number(val) < min) {
      onSliderChange(type, min);
      setInputVal(min);
    } else if (Number(val) > max) {
      onSliderChange(type, max);
      setInputVal(max);
    }
  };

  //Api calling

  useEffect(() => {
    axios
      .get("/getResults", {
        params: {
          monthlyInvestment: monthlyInvestment,
          investmentPeriod: investmentPeriod,
          rateOfReturn: rateOfReturn,
          delay: delay,
        },
      })
      .then((res) => {
        // for backend validation and showing the error page
        if (res.data && res.data.status == 0) {
          setGraphData(res.data.result && res.data.result);
          setErr(false);
        } else {
          setErr(true);
        }
      })
      .catch((error) => {
        setErr(true);
      });
  }, [monthlyInvestment, investmentPeriod, rateOfReturn, delay]);

  return (
    <div className="rightMain">
      <h2 className="heading"> SIP Delay Calculator</h2>

      <h5 className="info">
        It tells you how much wealth you can create by making monthly investment
      </h5>
      <div className="outerContainer">
        <div class="leftContainer">
          <SliderArea
            index={0}
            type="monthlyInvestment"
            min={500}
            max={100000}
            steps={50}
            value={monthlyInvestment}
            inputVal={inputVal}
            onSliderChange={onSliderChange}
            handleSliderChange={handleSliderChange}
            handleInputChange={handleInputChange}
            handleBlur={handleBlur}
            invalidInputStatus={invalidInputStatus}
            invalidInputType = {invalidInputType}

          />
          <SliderArea
            index={1}
            type="investmentPeriod"
            min={1}
            max={30}
            steps={1}
            value={investmentPeriod}
            inputVal={inputVal}
            onSliderChange={onSliderChange}
            handleSliderChange={handleSliderChange}
            handleInputChange={handleInputChange}
            handleBlur={handleBlur}
            invalidInputStatus={invalidInputStatus}
            invalidInputType = {invalidInputType}
          />
          <SliderArea
            index={2}
            type="rateOfReturn"
            min={1}
            max={30}
            steps={0.1}
            value={rateOfReturn}
            inputVal={inputVal}
            onSliderChange={onSliderChange}
            handleSliderChange={handleSliderChange}
            handleInputChange={handleInputChange}
            handleBlur={handleBlur}
            invalidInputStatus={invalidInputStatus}
            invalidInputType = {invalidInputType}

          />
          <SliderArea
            index={3}
            type="delay"
            min={1}
            max={120}
            steps={1}
            value={delay}
            inputVal={inputVal}
            onSliderChange={onSliderChange}
            handleSliderChange={handleSliderChange}
            handleInputChange={handleInputChange}
            handleBlur={handleBlur}
            invalidInputStatus={invalidInputStatus}
            invalidInputType = {invalidInputType}

          />
        </div>
        {err ? (
          <ErrorPage />
        ) : (
          <GraphArea
            monthlyInvestment={monthlyInvestment}
            delay={delay}
            graphData={graphData}
          />
        )}
      </div>
    </div>
  );
}

export default Calculator;
