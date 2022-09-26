import { Bank, records } from "./structures";
let id = 0;
const rounds = {};
const rounds2 = []
export const Record = {
  customerDeposit(bank1: Bank, bank2: Bank, amount: number) {
    const reservesAssetRecord1 = {
      instrumentType: "cash",
      notationType: "assignment",
      amount: amount,
      id: bank2.id,
      symbol: "-",
      name: bank2.name,
    };
    const depositAssetRecord = {
      instrumentType: "deposits",
      notationType: "issuance",
      amount: amount,
      id: bank2.id,
      symbol: "+",
      name: bank2.name,
    };
    const reservesAssetRecord2 = {
      instrumentType: "cash",
      notationType: "assignment",
      amount: amount,
      id: bank1.id,
      symbol: "+",
      name: bank1.name,
    };
    const depositLiabilityRecord = {
      instrumentType: "deposits",
      notationType: "issuance",
      amount: amount,
      id: bank1.id,
      symbol: "+",
      name: bank1.name,
    };

    // records.allIds
    //   .map((id) => records.parties[id])
    //   .filter((record) => record.id !== bank1.id && record.id !== bank2.id)
    //   .map((r) => {
    //     r.records.liabilities.push(null);
    //     r.records.assets.push(null);
    //   });

    for (const party in records.parties) {
      if (records.parties[party].id === bank1.id) {
        records.parties[party].records.assets.push(reservesAssetRecord1);
        records.parties[party].records.assets.push(depositAssetRecord);
        // records.parties[party].records.liabilities.push(null);
        // records.parties[party].records.liabilities.push(null);
      } else if (records.parties[party].id === bank2.id) {
        records.parties[party].records.assets.push(reservesAssetRecord2);
        records.parties[party].records.liabilities.push(depositLiabilityRecord);
        // records.parties[party].records.assets.push(null);
        // records.parties[party].records.liabilities.push(null);
      } else {
        // records.parties[party].records.assets.push(null);
        // records.parties[party].records.assets.push(null);
        // records.parties[party].records.liabilities.push(null);
        // records.parties[party].records.liabilities.push(null);
      }
    }
  },
  customerWithdraw(bank1: Bank, bank2: Bank, amount: number) {
    const reservesAssetRecord1 = {
      instrumentType: "cash",
      notationType: "assignment",
      amount: amount,
      id: bank2.id,
      symbol: "+",
      name: bank2.name,
    };
    const depositAssetRecord = {
      instrumentType: "deposits",
      notationType: "setOff",
      amount: amount,
      id: bank2.id,
      symbol: "-",
      name: bank2.name,
    };
    const reservesAssetRecord2 = {
      instrumentType: "cash",
      notationType: "assignment",
      amount: amount,
      id: bank1.id,
      symbol: "-",
      name: bank1.name,
    };
    const depositLiabilityRecord = {
      instrumentType: "deposits",
      notationType: "setOff",
      amount: amount,
      id: bank1.id,
      symbol: "-",
      name: bank1.name,
    };

    // records.allIds
    //   .map((id) => records.parties[id])
    //   .filter((record) => record.id !== bank1.id && record.id !== bank2.id)
    //   .map((r) => {
    //     r.records.liabilities.push(null);
    //     r.records.assets.push(null);
    //   });

    for (const party in records.parties) {
      if (records.parties[party].id === bank1.id) {
        records.parties[party].records.assets.push(reservesAssetRecord1);
        records.parties[party].records.assets.push(depositAssetRecord);
        // records.parties[party].records.liabilities.push(null);
        // records.parties[party].records.liabilities.push(null);
      } else if (records.parties[party].id === bank2.id) {
        records.parties[party].records.assets.push(reservesAssetRecord2);
        records.parties[party].records.liabilities.push(depositLiabilityRecord);
        // records.parties[party].records.assets.push(null);
        // records.parties[party].records.liabilities.push(null);
      } else {
        // records.parties[party].records.assets.push(null);
        // records.parties[party].records.assets.push(null);
        // records.parties[party].records.liabilities.push(null);
        // records.parties[party].records.liabilities.push(null);
      }
    }
  },
  decreaseBalance(bank1: Bank, bank2: Bank, amount: number) {
    const depositAssetRecord = {
      instrumentType: "deposits",
      notationType: "novation",
      amount: amount,
      id: bank2.id,
      symbol: "-",
      name: bank2.name,
    };
    const depositLiabilityRecord = {
      instrumentType: "deposits",
      notationType: "novation",
      amount: amount,
      id: bank1.id,
      symbol: "-",
      name: bank1.name,
    };

    // records.allIds
    //   .map((id) => records.parties[id])
    //   .filter((record) => record.id !== bank1.id && record.id !== bank2.id)
    //   .map((r) => {
    //     r.records.liabilities.push(null);
    //     r.records.assets.push(null);
    //   });

    for (const party in records.parties) {
      if (records.parties[party].id === bank1.id) {
        records.parties[party].records.assets.push(depositAssetRecord);
        // records.parties[party].records.liabilities.push(null);
        // records.parties[party].records.liabilities.push(null);
      } else if (records.parties[party].id === bank2.id) {
        records.parties[party].records.liabilities.push(depositLiabilityRecord);
        // records.parties[party].records.assets.push(null);
        // records.parties[party].records.liabilities.push(null);
      } else {
        // records.parties[party].records.assets.push(null);
        // records.parties[party].records.assets.push(null);
        // records.parties[party].records.liabilities.push(null);
        // records.parties[party].records.liabilities.push(null);
      }
    }
  },
  increaseBalance(bank1: Bank, bank2: Bank, amount: number) {
    const depositAssetRecord = {
      instrumentType: "deposits",
      notationType: "novation",
      amount: amount,
      id: bank2.id,
      symbol: "+",
      name: bank2.name,
    };
    const depositLiabilityRecord = {
      instrumentType: "deposits",
      notationType: "novation",
      amount: amount,
      id: bank1.id,
      symbol: "+",
      name: bank1.name,
    };

    records.allIds
      .map((id) => records.parties[id])
      .filter((record) => record.id !== bank1.id && record.id !== bank2.id)
      .map((r) => {
        r.records.liabilities.push(null);
        r.records.assets.push(null);
      });

    for (const party in records.parties) {
      if (records.parties[party].id === bank1.id) {
        records.parties[party].records.assets.push(depositAssetRecord);
        // records.parties[party].records.liabilities.push(null);
        // records.parties[party].records.liabilities.push(null);
      } else if (records.parties[party].id === bank2.id) {
        records.parties[party].records.liabilities.push(depositLiabilityRecord);
        // records.parties[party].records.assets.push(null);
        // records.parties[party].records.liabilities.push(null);
      } else {
        // records.parties[party].records.assets.push(null);
        // records.parties[party].records.assets.push(null);
        // records.parties[party].records.liabilities.push(null);
        // records.parties[party].records.liabilities.push(null);
      }
    }
  },
  transferMultiple(
    amount: number,
    customer1: Bank,
    customer2: Bank,
    bank1: Bank,
    bank2: Bank
  ) {
    const customer1Record = {
      instrumentType: "deposits",
      notationType: "assignment",
      amount: amount,
      id: customer2.id,
      symbol: "-",
      name: customer2.name,
    };
    const bank1Record = {
      instrumentType: "deposits",
      notationType: "novation",
      amount: amount,
      id: customer1.id,
      symbol: "-",
      name: customer1.name,
    };
    const customer2Record = {
      instrumentType: "deposits",
      notationType: "assignment",
      amount: amount,
      id: customer1.id,
      symbol: "+",
      name: customer1.name,
    };
    const bank2Record = {
      instrumentType: "deposits",
      notationType: "novation",
      amount: amount,
      id: customer2.id,
      symbol: "+",
      name: customer2.name,
    };

    records.allIds
      .map((id) => records.parties[id])
      .filter((record) => record.id !== bank1.id && record.id !== bank2.id)
      .map((r) => {
        r.records.liabilities.push(null);
        r.records.assets.push(null);
      });

    for (const party in records.parties) {
      if (records.parties[party].id === customer1.id) {
        records.parties[party].records.assets.push(customer1Record);
        // records.parties[party].records.liabilities.push(null);
      } else if (records.parties[party].id === customer2.id) {
        records.parties[party].records.assets.push(customer2Record);
        // records.parties[party].records.assets.push(null);
      } else if (records.parties[party].id === bank1.id) {
        records.parties[party].records.liabilities.push(bank1Record);
        // records.parties[party].records.assets.push(null);
      } else if (records.parties[party].id === bank2.id) {
        records.parties[party].records.liabilities.push(bank2Record);
        // records.parties[party].records.assets.push(null);
      } else {
        // records.parties[party].records.liabilities.push(null);
        // records.parties[party].records.assets.push(null);
      }
    }
  },
  transferSingle(
    amount: number,
    customer1: Bank,
    customer2: Bank,
    bank1: Bank
  ) {
    const customer1Record = {
      instrumentType: "deposits",
      notationType: "assignment",
      amount: amount,
      id: customer2.id,
      symbol: "-",
      name: customer2.name,
    };
    const bank1Record = {
      instrumentType: "deposits",
      notationType: "novation",
      amount: amount,
      id: customer1.id,
      symbol: "-",
      name: customer1.name,
    };
    const customer2Record = {
      instrumentType: "deposits",
      notationType: "assignment",
      amount: amount,
      id: customer1.id,
      symbol: "+",
      name: customer1.name,
    };
    const bank2Record = {
      instrumentType: "deposits",
      notationType: "novation",
      amount: amount,
      id: customer2.id,
      symbol: "+",
      name: customer2.name,
    };

    // records.allIds
    //   .map((id) => records.parties[id])
    //   .filter((record) => record.id !== bank1.id && record.id !== customer1.id && record.id !== customer2.id )
    //   .map((r) => {
    //     r.records.liabilities.push(null);
    //     r.records.assets.push(null);
    //   });

    for (const party in records.parties) {
      if (records.parties[party].id === customer1.id) {
        records.parties[party].records.assets.push(customer1Record);
        // records.parties[party].records.liabilities.push(null);
      } else if (records.parties[party].id === customer2.id) {
        records.parties[party].records.assets.push(customer2Record);
        // records.parties[party].records.assets.push(null);
        // records.parties[party].records.liabilities.push(null);
        // records.parties[party].records.liabilities.push(null);
      } else if (records.parties[party].id === bank1.id) {
        records.parties[party].records.liabilities.push(bank1Record);
        records.parties[party].records.liabilities.push(bank2Record);
        // records.parties[party].records.assets.push(null);
        // records.parties[party].records.assets.push(null);
      } else {
        // records.parties[party].records.liabilities.push(null);
        // records.parties[party].records.assets.push(null);
        // records.parties[party].records.liabilities.push(null);
        // records.parties[party].records.assets.push(null);
      }
    }
  },
  get(id) {
    return {
      assets: records.parties[id].records.assets,
      liabilities: records.parties[id].records.liabilities,
    };
  },
  getAll() {
    return records.parties;
  },
  setRound() {
    const records = this.getAll();
    rounds[id] = { ...records };
    id++;
    console.log(rounds);
    rounds2.push(records)
    console.log(JSON.stringify(rounds2))
  },
};

//new algorithm
const rounds = [
  {
    "0": {
      id: 0,
      records: {
        assets: [
          {
            instrumentType: "cash",
            notationType: "assignment",
            amount: 10,
            id: 3,
            symbol: "+",
            name: "Customer 3",
          },
        ],
        liabilities: [
          {
            instrumentType: "deposits",
            notationType: "issuance",
            amount: 10,
            id: 3,
            symbol: "+",
            name: "Customer 3",
          },
          {
            instrumentType: "deposits",
            notationType: "novation",
            amount: 5,
            id: 3,
            symbol: "-",
            name: "Customer 3",
          },
          {
            instrumentType: "deposits",
            notationType: "novation",
            amount: 5,
            id: 1,
            symbol: "+",
            name: "Customer 1",
          },
        ],
      },
    },
    "1": {
      id: 1,
      records: {
        assets: [
          {
            instrumentType: "deposits",
            notationType: "assignment",
            amount: 5,
            id: 3,
            symbol: "+",
            name: "Customer 3",
          },
        ],
        liabilities: [],
      },
    },
    "2": { id: 2, records: { assets: [], liabilities: [] } },
    "3": {
      id: 3,
      records: {
        assets: [
          {
            instrumentType: "cash",
            notationType: "assignment",
            amount: 10,
            id: 0,
            symbol: "-",
            name: "Bank 1",
          },
          {
            instrumentType: "deposits",
            notationType: "issuance",
            amount: 10,
            id: 0,
            symbol: "+",
            name: "Bank 1",
          },
          {
            instrumentType: "deposits",
            notationType: "assignment",
            amount: 5,
            id: 1,
            symbol: "-",
            name: "Customer 1",
          },
        ],
        liabilities: [],
      },
    },
    "4": { id: 4, records: { assets: [], liabilities: [] } },
  },
  {
    "0": {
      id: 0,
      records: {
        assets: [
          {
            instrumentType: "cash",
            notationType: "assignment",
            amount: 10,
            id: 3,
            symbol: "+",
            name: "Customer 3",
          },
        ],
        liabilities: [
          {
            instrumentType: "deposits",
            notationType: "issuance",
            amount: 10,
            id: 3,
            symbol: "+",
            name: "Customer 3",
          },
          {
            instrumentType: "deposits",
            notationType: "novation",
            amount: 5,
            id: 3,
            symbol: "-",
            name: "Customer 3",
          },
          {
            instrumentType: "deposits",
            notationType: "novation",
            amount: 5,
            id: 1,
            symbol: "+",
            name: "Customer 1",
          },
        ],
      },
    },
    "1": {
      id: 1,
      records: {
        assets: [
          {
            instrumentType: "deposits",
            notationType: "assignment",
            amount: 5,
            id: 3,
            symbol: "+",
            name: "Customer 3",
          },
        ],
        liabilities: [],
      },
    },
    "2": { id: 2, records: { assets: [], liabilities: [] } },
    "3": {
      id: 3,
      records: {
        assets: [
          {
            instrumentType: "cash",
            notationType: "assignment",
            amount: 10,
            id: 0,
            symbol: "-",
            name: "Bank 1",
          },
          {
            instrumentType: "deposits",
            notationType: "issuance",
            amount: 10,
            id: 0,
            symbol: "+",
            name: "Bank 1",
          },
          {
            instrumentType: "deposits",
            notationType: "assignment",
            amount: 5,
            id: 1,
            symbol: "-",
            name: "Customer 1",
          },
        ],
        liabilities: [],
      },
    },
    "4": { id: 4, records: { assets: [], liabilities: [] } },
  },
];

const round1 = rounds[0];

const longestAsset = Object.keys(round1).map(
  (id) => round1[id].records.assets.length
);
const longestLiability = Object.keys(round1).map(
  (id) => round1[id].records.liabilities.length
);
const longestEntry = Math.max(...longestAsset, ...longestLiability);

const populatedEntries = Object.keys(round1).map((id) => {
  const assetsLength = round1[id].records.assets.length;
  const liabilitiesLength = round1[id].records.liabilities.length;
  if (longestEntry > liabilitiesLength) {
    const difference = longestEntry - liabilitiesLength;
    for (let i = 0; i < difference; i++) {
      round1[id].records.liabilities.push(null);
    }
  }
  if (longestEntry > assetsLength) {
    const difference = longestEntry - assetsLength;
    for (let i = 0; i < difference; i++) {
      round1[id].records.assets.push(null);
    }
  }

  return {
    assets: round1[id].records.assets,
    liabilities: round1[id].records.liabilities,
  };
});

Object.keys(round1).forEach(
  (id, index) => (round1[index].records = populatedEntries[index])
);

console.log(round1)
