import { useMediaQuery } from "@mantine/hooks";
import { useState, useEffect, useRef } from "react";
import { mediaQuery } from "../../../../config/media-query";
import CpiDisplay from "./cpi-display";

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

export default function CpiWeight() {
  const [cpi, setCpi] = useState(cpiData);
  const [inflationIndex, setInflationIndex] = useState(0);
  const [inflationRate, setInflationRate] = useState(0);
  const [indexWeight, setIndexWeight] = useState(0);
  const [valueWeight, setValueWeight] = useState(0);
  const max = 100;

  const isMobile = useMediaQuery(mediaQuery);

  function total(arr) {
    return arr.reduce((acc, cur) => ({ weight: acc.weight + cur.weight }));
  }

  function handleChange(index, value) {
    //deep copy cpi
    const newCpi = cpi.map((item) => ({ ...item }));
    //set this weight to value
    newCpi[index].weight = value;
    // Calculate the difference between the intended maximum and the real total
    let unallocated = max - total(newCpi).weight;
    // Get a list of all the other slider keys
    // If the real total exceeds the intended maximum, sort sliders by lowest to highest value
    let slidersToChangeArr = newCpi.filter((el, i) => i !== index);
    //deep copy slidersToChangeArr
    let slidersToChange = slidersToChangeArr.map((item) => ({ ...item }));
    if (unallocated > 0) {
      slidersToChange.sort((a, b) => b.weight - a.weight);
    } else {
      slidersToChange.sort((a, b) => a.weight - b.weight);
    }
    //number of sliders left to iterate through
    let lengthMinusOne = cpi.length - 1;
    let sliderCount = lengthMinusOne;
    // Iterate through sliders
    slidersToChange.forEach((item, index) => {
      // In a perfect world, add or subtract the same amount from all remaining sliders
      let targetAllocation = unallocated / sliderCount;
      let result = slidersToChange[index].weight + targetAllocation;
      // If we go under the minimum value of a slider, change the target allocation so that the result will be 0
      if (result < 0) {
        targetAllocation -= result;
      }
      // Add or subtract the target allocation
      slidersToChange[index].weight += targetAllocation;
      //set new values to newCpi
      const found = newCpi.find(
        (el) => el.category === slidersToChange[index].category
      );
      const foundIndex = newCpi.indexOf(found);
      newCpi[foundIndex] = slidersToChange[index];
      // Recalculate the remaining allocation
      unallocated -= targetAllocation;
      sliderCount -= 1;
    });
    setCpi(newCpi);
  }

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
      handleChange(indexWeight, valueWeight);
    }
  }, [valueWeight]);
  useEffect(() => {
    getInflationRate();
  }, [cpi]);

  return (
    <CpiDisplay
      description="Weight Allocation of Items to Consumer Prices Index"
      inflationIndex={inflationIndex}
      inflationRate={inflationRate}
      setIndexWeight={setIndexWeight}
      setValueWeight={setValueWeight}
      cpi={cpi}
      priceSelected={false}
      weightSelected={true}
      width={isMobile ? "100%" : "52%"}
    />
  );
}
