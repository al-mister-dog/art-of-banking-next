import { Button } from "@mantine/core";
import { useState, useEffect, useRef } from "react";
import CpiDisplay from "./cpi-display";

export default function CpiPriceWeight({ setNewCpi, cpiData }) {
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
      <CpiDisplay
        title="CPI Weight Calculator"
        description="Price Change and Weight Allocation of Items to Consumer Prices Index"
        inflationIndex={inflationIndex}
        inflationRate={inflationRate}
        setIndexPrice={setIndexPrice}
        setValuePrice={setValuePrice}
        setIndexWeight={setIndexWeight}
        setValueWeight={setValueWeight}
        cpi={cpi}
        priceSelected={true}
        weightSelected={true}
        setNewCpi={setNewCpi}
      />
    </>
  );
}
