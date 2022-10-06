import { useState } from "react";
import InterestCalculator from "../../domain/calculators/interestClass";
// import {
//   ResponsiveContainer,
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
// } from "recharts";
import {
  Paper,
  Box,
  TextInput,
  Menu,
  Button,
  createStyles,
  Radio,
} from "@mantine/core";
import { RadioGroup } from "@mantine/core/lib/Radio/RadioGroup/RadioGroup";

const useStyles = createStyles(() => ({
  paper: {
    backgroundColor: "#fdfbf7",
    width: "70vw",
    height: "80vh",
    padding: "25px",
    margin: "auto",
    marginTop: "2rem",
    display: "flex",
    alignItems: "flex-start",
  },
  form: {
    width: 300,
    // margin: "auto",
    padding: 25,
  },
  textField: {
    width: 200,
    marginBottom: 10,
  },
  calculateBtn: {
    width: 200,
    marginTop: 25,
  },
}));
export default function CentralBank() {
  const { classes } = useStyles();

  const [principal, setPrincipal] = useState("1000");
  const [interestRate, setInterestRate] = useState("0.05");
  const [inflationRate, setInflationRate] = useState("0.02");
  const [compoundPeriod, setCompoundPeriod] = useState("0");
  const [years, setYears] = useState("10");
  const [graphResult, setGraphResult] = useState([]);
  const compoundPeriods = [
    {
      value: 0,
      label: "Annually",
    },
    {
      value: 1,
      label: "Semi-annually",
    },
    {
      value: 2,
      label: "Quarterly",
    },
    {
      value: 3,
      label: "Monthly",
    },
  ];

  const [option, setOption] = useState(compoundPeriods[0].value);

  function handleChangePrincipal(e) {
    setPrincipal(e.target.value);
  }
  function handleChangeInterestRate(e) {
    setInterestRate(e.target.value);
  }
  function handleChangeInflationRate(e) {
    setInflationRate(e.target.value);
  }
  function handleChangeYears(e) {
    setYears(e.target.value);
  }
  function handleChangeCompoundPeriod(value) {
    setCompoundPeriod(value);
    setOption(value);
  }

  function getCompoundInterest() {
    const futures = new InterestCalculator(
      parseFloat(principal),
      parseFloat(interestRate),
      parseFloat(inflationRate),
      parseFloat(years),
      parseFloat(compoundPeriod)
    );
    const eachYear = Array.from(
      { length: parseInt(years) },
      (_, i) => i + 2020
    );
    const compoundRealInterest = futures.getRealCompoundInterestPercent();
    const compoundInterest = futures.getCompoundInterestPercent();
    const simpleInterest = futures.getNominalInterestPercent();
    const graphData = eachYear.map((_, index) => {
      return {
        year: eachYear[index],
        "real interest": parseFloat(compoundRealInterest[index]),
        interest: parseFloat(compoundInterest[index]),
        "simple interest": parseFloat(simpleInterest[index]),
      };
    });
    setGraphResult(graphData);
  }
  return (
    <>
      <Paper className={classes.paper}>
        <Box
          sx={{
            width: "30%",
            margin: "auto",
            marginBottom: 190,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <TextInput
            className={classes.textField}
            type="number"
            placeholder={principal}
            label="Principal"
            onChange={handleChangePrincipal}
          />
          <TextInput
            className={classes.textField}
            type="number"
            placeholder={interestRate}
            label="Interest Rate (%)"
            onChange={handleChangeInterestRate}
          />
          <TextInput
            className={classes.textField}
            type="number"
            placeholder={inflationRate}
            label="Inflation Rate (%)"
            onChange={handleChangeInflationRate}
          />
          <TextInput
            className={classes.textField}
            type="number"
            placeholder={`${years}`}
            label="Years"
            onChange={handleChangeYears}
          />

          <Radio.Group
            value={`${option}`}
            orientation="vertical"
            onChange={(value) => handleChangeCompoundPeriod(value)}
            name="CompoundPeriod"
            label="Compound Period"
          >
            {compoundPeriods.map((option, index) => (
              <Radio
                key={option.value}
                color="violet"
                value={`${option.value}`}
                label={option.label}
              />
            ))}
          </Radio.Group>
          <Button
            variant="filled"
            className={classes.calculateBtn}
            onClick={getCompoundInterest}
          >
            Calculate
          </Button>
        </Box>
        <Box sx={{ height: 600, width: "70%", margin: "auto" }}>
          {JSON.stringify(graphResult)}
        </Box>
      </Paper>
    </>
  );
}
