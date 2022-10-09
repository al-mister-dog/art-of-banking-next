export function getWeightedMedian(transactions) {
  const aggregatedTransactions = aggregate(transactions);
  const middleDollar = getTotalVolume(transactions) / 2;

  const medianVolume = aggregatedTransactions.find(
    (transaction) => transaction.cumulativeFrequency >= middleDollar
  );
  if (medianVolume) {
    const data = {
      volumeWeightedMedian: medianVolume.rate,
      associatedData: aggregatedTransactions,
    };
    return data;
  }

  const aboveTheMiddle = aggregatedTransactions.find(
    (transaction) => transaction.volume >= middleDollar
  );
  if (aboveTheMiddle) {
    const data = {
      volumeWeightedMedian: aboveTheMiddle.rate,
      associatedData: aggregatedTransactions,
    };
    return data;
  }

  const volumes = aggregatedTransactions.map((a) => a.volume);
  const rates = aggregatedTransactions.map((a) => a.rate);

  function getLowerMedianEven() {
    let sums = 0;
    for (let i = 0; i < volumes.length; i++) {
      sums += volumes[i];
      if (sums > middleDollar) {
        const data = {
          volumeWeightedMedian: rates[i],
          associatedData: aggregatedTransactions,
        };
        return data;
      }
    }
  }
  function getLowerMedianOdd() {
    let sums = 0;
    for (let i = 0; i < volumes.length; i++) {
      sums += volumes[i];
      if (sums <= middleDollar) {
        const data = {
          volumeWeightedMedian: rates[i],
          associatedData: aggregatedTransactions,
        };
        return data;
      }
    }
  }

  transactions.length % 2 === 0 ? getLowerMedianEven() : getLowerMedianOdd();
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

function getTotalVolume(transactions) {
  const totalVolume = transactions.reduce(
    (a, c) => ({ balance: a.balance + c.balance }),
    {
      balance: 0,
    }
  ).balance;
  return totalVolume;
}

//TEST DATA
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
