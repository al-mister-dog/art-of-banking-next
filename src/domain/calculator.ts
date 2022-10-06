export const InterestRates = {
  percentage(percentage: number, subjectNumber: number) {
    return ((percentage * subjectNumber) / 100).toFixed(2);
  },
  realInterestRate(interestRate: number, inflationRate: number) {
    return interestRate - inflationRate;
  },
  simpleInterestDecimal(amount: number, rate: number) {
    return amount * rate;
  },
  simpleInterestPercent(amount: number, rate: number) {
    return (amount * rate) / 100;
  },
  realInterestDecimal(amount: number, rate: number, inflationRate: number) {
    function simpleInterestDecimal(amount: number, rate: number) {
      return amount * rate;
    }
    const realInterestRate = rate - inflationRate;
    return simpleInterestDecimal(amount, realInterestRate);
  },
  realInterestPercent(amount: number, rate: number, inflationRate: number) {
    function simpleInterestPercent(amount: number, rate: number) {
      return (amount * rate) / 100;
    }
    const realInterestRate = rate - inflationRate;
    return simpleInterestPercent(amount, realInterestRate);
  },
};

const InterestRateGetters = {
  getSimpleInterest(principal: number, interest: number, frequency: number) {
    let returns = [];
    for (let i = 0; i < frequency; i++) {
      principal += interest;
      returns = [...returns, principal.toFixed(2)];
    }
    return returns;
  },
};

// console.log(InterestRateGetters.getSimpleInterest(1000, 1, 10))