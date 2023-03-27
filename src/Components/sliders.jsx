import React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import MuiInput from "@mui/material/Input";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";


const miArray = [
  {
    value: 500,
    label: "500",
  },
  {
    value: 24000,
    label: "24000",
  },
  {
    value: 43000,
    label: "43000",
  },
  {
    value: 62000,
    label: "62000",
  },
  {
    value: 81000,
    label: "81000",
  },
  {
    value: 100000,
    label: "100000",
  }
];

const ipArray = [
  {
    value: 1,
    label: "1",
  },
  {
    value: 4,
    label: "4",
  },
  {
    value: 7,
    label: "7",
  },
  {
    value: 10,
    label: "10",
  },
  {
    value: 13,
    label: "13",
  },
  {
    value: 15,
    label: "15",
  },
  {
    value: 18,
    label: "18",
  },
  {
    value: 21,
    label: "21",
  },
  {
    value: 24,
    label: "24",
  },
  {
    value: 27,
    label: "27",
  },
  {
    value: 30,
    label: "30",
  }
];

const errArray = [
  {
    value: 1,
    label: "1",
  },
  {
    value: 3.9,
    label: "3.9",
  },
  {
    value: 6.8,
    label: "6.8",
  },
  {
    value: 9.7,
    label: "9.7",
  },
  {
    value: 12.6,
    label: "12.6",
  },
  {
    value: 15.5,
    label: "15.5",
  },
  {
    value: 18.4,
    label: "18.4",
  },
  {
    value: 21.3,
    label: "21.3",
  },
  {
    value: 24.2,
    label: "24.2",
  },
  {
    value: 27.1,
    label: "27.1",
  },
  {
    value: 30,
    label: "30",
  }
];

const delayArray = [
  {
    value: 1,
    label: "1",
  },
  {
    value: 13,
    label: "13",
  },
  {
    value: 25,
    label: "25",
  },
  {
    value: 37,
    label: "37",
  },
  {
    value: 49,
    label: "49",
  },
  {
    value: 61,
    label: "61",
  },
  {
    value: 72,
    label: "72",
  },
  {
    value: 84,
    label: "84",
  },
  {
    value: 96,
    label: "96",
  },
  {
    value: 108,
    label: "108",
  },
  {
    value: 120,
    label: "120",
  }
];

const labelArr = [miArray, ipArray, errArray, delayArray];

const titleArr = [
  "Monthly Investment (Rs.)",
  "Investment Period (in years)",
  "Expected Rate of Return (%p.a)",
  "Delay in Staring SIP (in months)",
];

function valuetext(value) {
  return `${value}`;
}

const Input2 = styled(MuiInput)`
  width: 60px;
`;

function SliderArea(props) {

  return (
    <div className="sliders">
      <Box sx={{ width: 500 }}>
        <Grid container className="grid">
          <Grid item >
            <Typography gutterBottom>{titleArr[props.index]}</Typography>
          </Grid>
          <Grid item className="gridItem">
            <Input2
              value={props.inputVal}
              size="small"
              onBlur={(event)=>props.handleBlur(event, props.type)}
              onChange={(event)=>props.handleInputChange(event, props.type)}
              inputProps={{
                step: props.steps,
                min: props.min,
                max: props.max,
                type: "number",
              }}
            />
          </Grid>
        </Grid>
        {props.invalidInputStatus && <div className="errField">Invalid input</div>}

        <Grid container>
          <Grid item xs>
            <Slider
              aria-label="Custom marks"
              defaultValue={props.value}
              getAriaValueText={valuetext}
              min={props.min}
              max={props.max}
              step={props.steps}
              marks={labelArr[props.index]}
              value={props.value}
              onChange={(event, newValue)=>props.handleSliderChange(event, newValue, props.type)}
              aria-labelledby="input-slider"
            />
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default SliderArea;