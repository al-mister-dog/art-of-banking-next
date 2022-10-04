import { useState, useEffect, useRef } from "react";

import {
  Box,
  Text,
  Slider,
  TextInput,
  Button,
  createStyles,
} from "@mantine/core";

const useStyles = createStyles((theme) => ({
  titleCalculator: {
    marginBottom: "5px",
    padding: "20px 0 10px 0",
    "@media (max-width: 620px)": {
      fontSize: "0.7rem",
      margin: "15px 0 15px 0",
      padding: "0",
    },
  },
  container: {
    padding: "20px",
    width: "60%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    margin: "auto",
    "@media (max-width: 620px)": {
      width: "90%",
    },
  },
  labelsInflation: {
    display: "flex",
    justifyContent: "space-around",
  },
  labelInflationIndex: {
    "@media (max-width: 620px)": {
      fontSize: "0.8rem",
      padding: "5px",
    },
  },
  labelInflationRate: {
    "@media (max-width: 620px)": {
      fontSize: "0.8rem",
      padding: "5px",
    },
  },
  containerCalculator: {},

  sliderLabels: {
    display: "grid",
    gridTemplateColumns: "3.5fr 1.5fr 5fr",
    backgroundColor: "gray",
    color: "white",
    padding: "5px",
    borderRadius: "5px",
    marginBottom: "15px",
  },
  sliderLabelCategory: {
    fontSize: "0.8rem",
    fontWeight: "bold",
    textAlign: "left",
    "@media (max-width: 620px)": {
      fontSize: "0.6rem",
    },
  },
  sliderLabelChange: {
    fontSize: "0.8rem",
    fontWeight: "bold",
    "@media (max-width: 620px)": {
      fontSize: "0.6rem",
    },
  },
  sliderLabelWeight: {
    fontSize: "0.8rem",
    fontWeight: "bold",
    paddingLeft: "15px",
    "@media (max-width: 620px)": {
      fontSize: "0.6rem",
    },
  },

  slider: {
    display: "grid",
    gridTemplateColumns: "3.5fr 1.5fr 1.5fr 3.5fr",
  },
  labelCategory: {
    fontSize: "0.8rem",
    fontWeight: "bold",
    color: "#808080",
    textAlign: "left",
    "@media (max-width: 620px)": {
      fontSize: "0.4rem",
    },
  },
  labelChange: {
    fontSize: "0.8rem",
    fontWeight: "bold",
    color: "#808080",
  },
  labelWeight: {
    fontSize: "0.8rem",
    fontWeight: "bold",
    color: "#808080",
  },
}));

const cpiData = [
  { category: "Food & non-alcoholic beverages", weight: 8.9, change: 1.4 },
  { category: "Alcohol & tobacco", weight: 3.5, change: 1.7 },
  { category: "Clothing & footwear", weight: 5.9, change: 1.4 },
  { category: "Housing & household services", weight: 32.8, change: 2.2 },
  { category: "Furniture & household goods", weight: 4.9, change: 1.8 },
  { category: "Health", weight: 2.0, change: 0.8 },
  { category: "Transport", weight: 10.7, change: 2.5 },
  { category: "Communication", weight: 1.9, change: 1.9 },
  { category: "Recreation & culture", weight: 11.2, change: 1.8 },
  { category: "Education", weight: 3.0, change: 1.5 },
  { category: "Restaurants & hotels", weight: 6.9, change: 1.9 },
  { category: "Miscellaneous goods & services", weight: 8.3, change: 1.4 },
];

export default function CpiWeightCalculator() {
  const { classes } = useStyles();
  const [cpi, setCpi] = useState(cpiData);
  const [inflationIndex, setInflationIndex] = useState(0);
  const [inflationRate, setInflationRate] = useState(0);
  const [indexWeight, setIndexWeight] = useState(0);
  const [valueWeight, setValueWeight] = useState(0);
  const [indexPrice, setIndexPrice] = useState(0);
  const [valuePrice, setValuePrice] = useState(0);

  const max = 100;

  function total(arr) {
    return arr.reduce((acc, cur) => ({ weight: acc.weight + cur.weight }));
  }

  const handleChangeTextInput = (index) => (e, value) => {
    setIndexPrice(index);
    setValuePrice(e.target.value);
  };

  function handleChangePrice(index, value) {
    value = parseFloat(value);
    const newCpi = cpi.map((item) => ({ ...item }));
    newCpi[index].change = value;
    setCpi(newCpi);
  }

  function handleChangeWeight(index, value) {
    const newCpi = cpi.map((item) => ({ ...item }));
    newCpi[index].weight = value;
    let unallocated = max - total(newCpi).weight;
    let slidersToChangeArr = newCpi.filter((el, i) => i !== index);
    let slidersToChange = slidersToChangeArr.map((item) => ({ ...item }));
    if (unallocated > 0) {
      slidersToChange.sort((a, b) => b.weight - a.weight);
    } else {
      slidersToChange.sort((a, b) => a.weight - b.weight);
    }
    let lengthMinusOne = cpi.length - 1;
    let sliderCount = lengthMinusOne;
    slidersToChange.forEach((item, index) => {
      let targetAllocation = unallocated / sliderCount;
      let result = slidersToChange[index].weight + targetAllocation;
      if (result < 0) {
        targetAllocation -= result;
      }
      slidersToChange[index].weight += targetAllocation;
      const found = newCpi.find(
        (el) => el.category === slidersToChange[index].category
      );
      const foundIndex = newCpi.indexOf(found);
      newCpi[foundIndex] = slidersToChange[index];
      unallocated -= targetAllocation;
      sliderCount -= 1;
    });
    setCpi(newCpi);
  }

  const handleChangeSlider = (index) => (value) => {
    setIndexWeight(index);
    setValueWeight(value);
  };

  function getInflationRate() {
    let weightedIndex = [];
    const priceIndex = cpi.map((i) => {
      return 100 + i.change;
    });

    cpi.forEach((item, index) => {
      weightedIndex = [
        ...weightedIndex,
        (item.weight / 10) * priceIndex[index],
      ];
    });
    const weightedIndexSum = weightedIndex.reduce((a, b) => a + b) / 10;

    const newInflationIndex = weightedIndexSum;
    const newInflationRate = newInflationIndex - 100;

    setInflationIndex(parseFloat(newInflationIndex.toFixed(2)));
    setInflationRate(parseFloat(newInflationRate.toFixed(2)));
  }

  const firstUpdate = useRef(true);
  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
    } else {
      handleChangeWeight(indexWeight, valueWeight);
    }
  }, [valueWeight]);

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
    } else {
      handleChangePrice(indexPrice, valuePrice);
    }
  }, [valuePrice]);

  useEffect(() => {
    getInflationRate();
  }, [cpi]);

  return (
    <>
      <Box className={classes.container}>
        <Box className={classes.labelsInflation}>
          <Text className={classes.labelInflationIndex}>
            Inflation index:{" "}
            <span style={{ fontWeight: "bold" }}>%{inflationIndex}</span>
          </Text>
          <Text className={classes.labelInflationRate}>
            Inflation rate:{" "}
            <span style={{ fontWeight: "bold" }}>%{inflationRate}</span>
          </Text>
        </Box>
        <Box className={classes.containerCalculator}>
          <Text align="center" className={classes.titleCalculator}></Text>
          <Box >
            <Box className={classes.sliderLabels}>
              <Text className={classes.sliderLabelCategory}>Category</Text>
              <Text className={classes.sliderLabelChange}>Price Change</Text>
              <Text className={classes.sliderLabelWeight} align="left">
                Weight (% of 100)
              </Text>
            </Box>
            {cpi.map((object, index) => {
              const { category, weight, change } = object;
              return (
                <div key={index} className={classes.slider}>
                  <Text className={classes.labelCategory}>{category}:</Text>
                  <TextInput
                    className={classes.labelChange}
                    type="number"
                    placeholder={`%${parseFloat(change.toFixed(2))}`}
                    defaultValue={change}
                    onChange={handleChangeTextInput}
                  >
                    
                  </TextInput>
                  <Text className={classes.labelWeight}>
                    %{parseFloat(weight.toFixed(2))}
                  </Text>
                  <Slider
                    
                    value={parseFloat(weight.toFixed(2))}
                    onChange={handleChangeSlider}
                    // aria-labelledby="discrete-slider-custom"
                    
                    min={0}
                    max={100}
                  />
                </div>
              );
            })}
          </Box>
        </Box>

        <Button
          color="secondary"
          //   onClick={() => dispatch(submitCpi(cpi))}
          style={{ marginTop: "10px" }}
        >
          Submit New Weights
        </Button>
      </Box>
    </>
  );
}
