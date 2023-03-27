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

  const [currInputBoxType, setCurrInputBoxType] = useState();
  const [inputBoxValue, setInputBoxValue] = useState();
  const [invalidInputBoxType, setInvalidInputBoxType] = useState();


  const [graphData, setGraphData] = useState({});
  const [err, setErr] = useState(false);
  



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
    setInputBoxValue(newValue);
    setInvalidInputBoxType('');
  };

  const handleInputChange = (event, type) => {

    const [min, max] = setRange(type);
    const val = event.target.value;

    setCurrInputBoxType(type)
    setInputBoxValue(val);
    

    if (Number(val) < min) {
      onSliderChange(type, min);
      setInvalidInputBoxType(type);
    } else if (Number(val) > max) {
      onSliderChange(type, max);
      setInvalidInputBoxType(type);
    } else {
      onSliderChange(type, Number(val));
      setInvalidInputBoxType('');
    }
  };

  const handleBlur = (event, type) => {
    setInvalidInputBoxType('');
    setCurrInputBoxType('')

    const [min, max] = setRange(type);

    const val = event.target.value;

    if (Number(val) < min) {
      onSliderChange(type, min);
    } else if (Number(val) > max) {
      onSliderChange(type, max);
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
            inputBoxValue={inputBoxValue}
            onSliderChange={onSliderChange}
            handleSliderChange={handleSliderChange}
            handleInputChange={handleInputChange}
            handleBlur={handleBlur}
            invalidInputBoxType={invalidInputBoxType}
            currInputBoxType={currInputBoxType}
          />
          <SliderArea
            index={1}
            type="investmentPeriod"
            min={1}
            max={30}
            steps={1}
            value={investmentPeriod}
            inputBoxValue={inputBoxValue}
            onSliderChange={onSliderChange}
            handleSliderChange={handleSliderChange}
            handleInputChange={handleInputChange}
            handleBlur={handleBlur}
            invalidInputBoxType={invalidInputBoxType}
            currInputBoxType={currInputBoxType}
          />
          <SliderArea
            index={2}
            type="rateOfReturn"
            min={1}
            max={30}
            steps={0.1}
            value={rateOfReturn}
            inputBoxValue={inputBoxValue}
            onSliderChange={onSliderChange}
            handleSliderChange={handleSliderChange}
            handleInputChange={handleInputChange}
            handleBlur={handleBlur}
            invalidInputBoxType={invalidInputBoxType}
            currInputBoxType={currInputBoxType}
          />
          <SliderArea
            index={3}
            type="delay"
            min={1}
            max={120}
            steps={1}
            value={delay}
            inputBoxValue={inputBoxValue}
            onSliderChange={onSliderChange}
            handleSliderChange={handleSliderChange}
            handleInputChange={handleInputChange}
            handleBlur={handleBlur}
            invalidInputBoxType={invalidInputBoxType}
            currInputBoxType={currInputBoxType}
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
