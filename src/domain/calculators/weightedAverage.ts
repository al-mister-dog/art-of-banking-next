export function weightedAverage(transactions) {
  function sum(objectArray, key) {
    return objectArray.reduce((a, c) => ({ [key]: a[key] + c[key] }), {
      [key]: 0,
    })[key];
  }

  function aggregate(arr) {
    const occurences = arr.reduce((acc, cur) => {
      acc[cur.interestRate]
        ? acc[cur.interestRate].push(cur)
        : (acc[cur.interestRate] = [cur]);
      return acc;
    }, {});

    const occurencesPlusVolume = Object.keys(occurences).map((occurence) => {
      const factor =
        parseInt(occurence) * (sum(occurences[occurence], "amount") / 100);
      return {
        rate: parseInt(occurence),
        occurences: occurences[occurence].length,
        volume: sum(occurences[occurence], "amount"),
        factor,
      };
    });
    return occurencesPlusVolume;
  }

  const aggregatedTransactions = aggregate(transactions);
  const weightedAverage = sum(aggregatedTransactions, "factor");

  return weightedAverage;
}
