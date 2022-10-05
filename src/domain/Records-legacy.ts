import { Bank, records } from "./structures";

export const Record = {
  deposit(bank1: Bank, bank2: Bank, amount: number) {
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
    insertAssetsEntry(bank1.id, reservesAssetRecord1)
    insertAssetsEntry(bank1.id, depositAssetRecord)
    insertAssetsEntry(bank2.id, reservesAssetRecord2)
    insertLiabilitiesEntry(bank2.id, depositLiabilityRecord)
    // for (const party in records.parties) {
    //   if (records.parties[party].id === bank1.id) {
    //     records.parties[party].records.assets.push(reservesAssetRecord1);
    //     records.parties[party].records.assets.push(depositAssetRecord);
    //   } else if (records.parties[party].id === bank2.id) {
    //     records.parties[party].records.assets.push(reservesAssetRecord2);
    //     records.parties[party].records.liabilities.push(depositLiabilityRecord);
    //   }
    // }
  },
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

    for (const party in records.parties) {
      if (records.parties[party].id === bank1.id) {
        records.parties[party].records.assets.push(reservesAssetRecord1);
        records.parties[party].records.assets.push(depositAssetRecord);
      } else if (records.parties[party].id === bank2.id) {
        records.parties[party].records.assets.push(reservesAssetRecord2);
        records.parties[party].records.liabilities.push(depositLiabilityRecord);
      }
    }
  },
  withdraw(bank1: Bank, bank2: Bank, amount: number) {
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

    for (const party in records.parties) {
      if (records.parties[party].id === bank1.id) {
        records.parties[party].records.assets.push(reservesAssetRecord1);
        records.parties[party].records.assets.push(depositAssetRecord);
      } else if (records.parties[party].id === bank2.id) {
        records.parties[party].records.assets.push(reservesAssetRecord2);
        records.parties[party].records.liabilities.push(depositLiabilityRecord);
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

    for (const party in records.parties) {
      if (records.parties[party].id === bank1.id) {
        records.parties[party].records.assets.push(depositAssetRecord);
      } else if (records.parties[party].id === bank2.id) {
        records.parties[party].records.liabilities.push(depositLiabilityRecord);
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

    for (const party in records.parties) {
      if (records.parties[party].id === bank1.id) {
        records.parties[party].records.assets.push(depositAssetRecord);
      } else if (records.parties[party].id === bank2.id) {
        records.parties[party].records.liabilities.push(depositLiabilityRecord);
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
    for (const party in records.parties) {
      if (records.parties[party].id === customer1.id) {
        records.parties[party].records.assets.push(customer1Record);
      } else if (records.parties[party].id === customer2.id) {
        records.parties[party].records.assets.push(customer2Record);
      } else if (records.parties[party].id === bank1.id) {
        records.parties[party].records.liabilities.push(bank1Record);
      } else if (records.parties[party].id === bank2.id) {
        records.parties[party].records.liabilities.push(bank2Record);
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

    for (const party in records.parties) {
      if (records.parties[party].id === customer1.id) {
        records.parties[party].records.assets.push(customer1Record);
      } else if (records.parties[party].id === customer2.id) {
        records.parties[party].records.assets.push(customer2Record);
      } else if (records.parties[party].id === bank1.id) {
        records.parties[party].records.liabilities.push(bank1Record);
        records.parties[party].records.liabilities.push(bank2Record);
      }
    }
  },
  creditAccount(bank1, bank2, amount) {
    const bank1Record = {
      instrumentType: "deposits",
      notationType: "issuance",
      amount: amount,
      id: bank2.id,
      symbol: "+",
      name: bank2.name,
    };
    const bank2Record = {
      instrumentType: "deposits",
      notationType: "issuance",
      amount: amount,
      id: bank1.id,
      symbol: "+",
      name: bank1.name,
    };
    for (const party in records.parties) {
      if (records.parties[party].id === bank1.id) {
        records.parties[party].records.liabilities.push(bank1Record);
      } else if (records.parties[party].id === bank2.id) {
        records.parties[party].records.assets.push(bank2Record);
      }
    }
  },
  debitAccount(bank1, bank2, amount) {
    const bank1Record = {
      instrumentType: "deposits",
      notationType: "setOff",
      amount: amount,
      id: bank2.id,
      symbol: "-",
      name: bank2.name,
    };
    const bank2Record = {
      instrumentType: "deposits",
      notationType: "setOff",
      amount: amount,
      id: bank1.id,
      symbol: "-",
      name: bank1.name,
    };
    for (const party in records.parties) {
      if (records.parties[party].id === bank1.id) {
        records.parties[party].records.assets.push(bank1Record);
      } else if (records.parties[party].id === bank2.id) {
        records.parties[party].records.liabilities.push(bank2Record);
      }
    }
  },
  get(id) {
    if (records.id === 0) {
      return { assets: undefined, liabilities: undefined };
    }

    const partyRecords = records.rounds[records.id - 1];

    return {
      assets: partyRecords.round[id].records.assets,
      liabilities: partyRecords.round[id].records.liabilities,
    };
  },
  getAll() {
    return records.parties;
  },
  setRound() {
    const thisRecords = this.getAll();
    const round = populateRound(thisRecords);
    records.rounds[records.id] = { id: records.id, round };
    records.id++;
  },
};

function insertAssetsEntry(id1, assetRecord) {
  records.parties[id1].records.assets.push(assetRecord);
}
function insertLiabilitiesEntry(id1, liabilityRecord) {
  records.parties[id1].records.liabilities.push(liabilityRecord);
}

function populateRound(round) {
  const assetLengths = Object.keys(round).map(
    (id) => round[id].records.assets.length
  );

  const liabilityLengths = Object.keys(round).map(
    (id) => round[id].records.liabilities.length
  );

  const longestEntry = Math.max(...assetLengths, ...liabilityLengths);

  const populatedEntries = Object.keys(round).map((id) => {
    const assetsLength = round[id].records.assets.length;
    const liabilitiesLength = round[id].records.liabilities.length;
    if (longestEntry > liabilitiesLength) {
      const difference = longestEntry - liabilitiesLength;
      for (let i = 0; i < difference; i++) {
        round[id].records.liabilities.push(null);
      }
    }
    if (longestEntry > assetsLength) {
      const difference = longestEntry - assetsLength;
      for (let i = 0; i < difference; i++) {
        round[id].records.assets.push(null);
      }
    }
    return {
      assets: round[id].records.assets,
      liabilities: round[id].records.liabilities,
    };
  });

  Object.keys(round).forEach(
    (id, index) => (round[index].records = populatedEntries[index])
  );
  return round;
}
