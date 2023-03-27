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

  const [monthlyInvestmentInput, setMonthlyInvestmentInput] = useState(500);
  const [investmentPeriodInput, setInvestmentPeriodInput] = useState(1);
  const [rateOfReturnInput, setRateOfReturnInput] = useState(1);
  const [delayInput, setDelayInput] = useState(1);

  const [graphData, setGraphData] = useState({});

  const [err, setErr] = useState(false);

  const [invalidInputType, setInvalidInputType] = useState();



  //Set Values of monthly investment, rate of return, investmment period, delay

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
        break;
    }
  }

  function onInputChange(type, val) {
    switch (type) {
      case "monthlyInvestment":
        setMonthlyInvestmentInput(val);
        break;
      case "investmentPeriod":
        setInvestmentPeriodInput(val);
        break;
      case "rateOfReturn":
        setRateOfReturnInput(val);
        break;
      case "delay":
        setDelayInput(val);
        break;
      default:
        break;
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
        break;  
    }
  };


  const handleSliderChange = (event, newValue, type) => {
    onSliderChange(type, newValue);
    onInputChange(type, newValue);
    setInvalidInputType('');
  };

  const handleInputChange = (event, type) => {
    //FrontEnd validations

    const [min, max] = setRange(type);
    const val = event.target.value;

    if (Number(val) < min) {
      onInputChange(type, val);
      onSliderChange(type, min);
      setInvalidInputType(type);
    } else if (Number(val) > max) {
      onInputChange(type, val);
      onSliderChange(type, max);
      setInvalidInputType(type);
    } else {
      onInputChange(type, val);
      onSliderChange(type, Number(val));
      setInvalidInputType('');
    }
  };

  const handleBlur = (event, type) => {
    setInvalidInputType('');

    const [min, max] = setRange(type);

    const val = event.target.value;

    if (Number(val) < min) {
      onSliderChange(type, min);
      onInputChange(type, min);
    } else if (Number(val) > max) {
      onSliderChange(type, max);
      onInputChange(type, max);
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
        if (res.data && res.data.status === 0) {
          setGraphData(res.data.result);
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
            inputVal={monthlyInvestmentInput}
            onSliderChange={onSliderChange}
            handleSliderChange={handleSliderChange}
            handleInputChange={handleInputChange}
            handleBlur={handleBlur}
            invalidInput={invalidInputType}
          />
          <SliderArea
            index={1}
            type="investmentPeriod"
            min={1}
            max={30}
            steps={1}
            value={investmentPeriod}
            inputVal={investmentPeriodInput}
            onSliderChange={onSliderChange}
            handleSliderChange={handleSliderChange}
            handleInputChange={handleInputChange}
            handleBlur={handleBlur}
            invalidInput={invalidInputType}
          />
          <SliderArea
            index={2}
            type="rateOfReturn"
            min={1}
            max={30}
            steps={0.1}
            value={rateOfReturn}
            inputVal={rateOfReturnInput}
            onSliderChange={onSliderChange}
            handleSliderChange={handleSliderChange}
            handleInputChange={handleInputChange}
            handleBlur={handleBlur}
            invalidInput={invalidInputType}
          />
          <SliderArea
            index={3}
            type="delay"
            min={1}
            max={120}
            steps={1}
            value={delay}
            inputVal={delayInput}
            onSliderChange={onSliderChange}
            handleSliderChange={handleSliderChange}
            handleInputChange={handleInputChange}
            handleBlur={handleBlur}
            invalidInput={invalidInputType}
          />
        </div>
        {err ? (
          <ErrorPage />
        ) : (
          <GraphArea
            delay={delay}
            graphData={graphData}
          />
        )}
      </div>
    </div>
  );
}

export default Calculator;
