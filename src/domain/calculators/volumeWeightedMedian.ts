const transactions1 = [
  { balance: 3, interestRate: 10 },
  { balance: 2, interestRate: 10 },
  { balance: 5, interestRate: 25 },
  { balance: 1, interestRate: 25 },
  { balance: 1, interestRate: 10 },
  { balance: 1, interestRate: 5 },
  { balance: 4, interestRate: 25 },
  { balance: 1, interestRate: 10 },
  { balance: 3, interestRate: 15 },
  { balance: 3, interestRate: 5 },
  { balance: 2, interestRate: 5 },
  { balance: 4, interestRate: 5 },
  { balance: 5, interestRate: 15 },
  { balance: 5, interestRate: 20 },
  { balance: 5, interestRate: 20 },
  { balance: 10, interestRate: 25 },
  { balance: 25, interestRate: 25 },
  { balance: 15, interestRate: 25 },
  { balance: 2, interestRate: 10 },
  { balance: 1, interestRate: 10 },
  { balance: 2, interestRate: 15 },
];

const transactions2 = [
  { balance: 20, interestRate: 10 },
  { balance: 20, interestRate: 15 },
  { balance: 20, interestRate: 20 },
  { balance: 20, interestRate: 25 },
];

export function getWeightedMedian(transactions) {
  function getTotalVolume(transactions) {
    const totalVolume = transactions.reduce(
      (a, c) => ({ balance: a.balance + c.balance }),
      {
        balance: 0,
      }
    ).balance;
    return totalVolume;
  }

  function aggregate(arr) {
    const occurences = arr.reduce((acc, cur) => {
      acc[cur.interestRate]
        ? acc[cur.interestRate].push(cur)
        : (acc[cur.interestRate] = [cur]);
      return acc;
    }, {});

    let cumulativeFrequency = 0;

    const occurencesPlusVolume = Object.keys(occurences).map((occurence) => {
      cumulativeFrequency += getTotalVolume(occurences[occurence]);
      return {
        rate: parseInt(occurence),
        occurences: occurences[occurence].length,
        volume: getTotalVolume(occurences[occurence]),
        cumulativeFrequency,
      };
    });

    const totalOccurences = occurencesPlusVolume.reduce(
      (a, c) => {
        return { occurences: a.occurences + c.occurences };
      },
      { occurences: 0 }
    ).occurences;

    const aggregatedList = occurencesPlusVolume.map((o) => {
      return {
        ...o,
        transactionPercentage: ((o.occurences / totalOccurences) * 100).toFixed(
          2
        ),
      };
    });

    return aggregatedList;
  }

  const aggregatedTransactions = aggregate(transactions);
  const middleDollar = getTotalVolume(transactions) / 2;

  const aboveTheMiddle = aggregatedTransactions.find(
    (transaction) => transaction.volume > middleDollar
  );

  if (aboveTheMiddle) {
    const data = {
      volumeWeightedMedian: aboveTheMiddle.rate,
      associatedData: aggregatedTransactions,
    };
    return data;
  }

  const middle = aggregatedTransactions.find(
    (transaction) => transaction.cumulativeFrequency >= middleDollar
  );

  if (middle) {
    const data = {
      volumeWeightedMedian: middle.rate,
      associatedData: aggregatedTransactions,
    };
    return data;
  }

  let cumulativeWeight = 0;
  let belowMidPointIndex = 0;
  const sortedWeights = aggregatedTransactions.map((a) => a.volume);
  const sortedValues = aggregatedTransactions.map((a) => a.rate);

  while (cumulativeWeight <= middleDollar) {
    belowMidPointIndex++;
    cumulativeWeight += sortedWeights[belowMidPointIndex - 1];
  }

  cumulativeWeight -= sortedWeights[belowMidPointIndex - 1];

  if (cumulativeWeight - middleDollar < Number.EPSILON) {
    var bounds = sortedValues.slice(belowMidPointIndex - 2, belowMidPointIndex);
    const data = {
      volumeWeightedMedian: sum(bounds) / bounds.length,
      associatedData: aggregatedTransactions,
    };
    return data;
  }

  function sum(numbers: number[]) {
    return numbers.reduce((a, c) => a + c, 0);
  }
  const data = {
    volumeWeightedMedian: sortedValues[belowMidPointIndex - 1],
    associatedData: aggregatedTransactions,
  };
  return data;
}

function weightedAverage(transactions) {
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
        parseInt(occurence) * (sum(occurences[occurence], "balance") / 100);
      return {
        rate: parseInt(occurence),
        occurences: occurences[occurence].length,
        volume: sum(occurences[occurence], "balance"),
        factor,
      };
    });
    return occurencesPlusVolume;
  }

  const aggregatedTransactions = aggregate(transactions);
  const weightedAverage = sum(aggregatedTransactions, "factor");
  const data = {
    volumeWeightedMedian: weightedAverage,
    associatedData: aggregatedTransactions,
  };
  return data;
}

type ObjectArray = { [index: string]: any }[];
function sum(objectArray: ObjectArray, key: string) {
  return objectArray.reduce((a, c) => ({ [key]: a[key] + c[key] }), {
    [key]: 0,
  })[key];
}
