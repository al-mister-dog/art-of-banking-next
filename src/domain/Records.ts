import { Bank, RecordDetail, records } from "./structures";
import { System } from "./system";

const creditInstrumentsBySystem = {
  national: "deposits",
  correspondent: "deposits",
  clearinghouse: "ch certs",
};

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
    insertAssetsEntry(bank1.id, reservesAssetRecord1);
    insertAssetsEntry(bank1.id, depositAssetRecord);
    insertAssetsEntry(bank2.id, reservesAssetRecord2);
    insertLiabilitiesEntry(bank2.id, depositLiabilityRecord);
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

    insertAssetsEntry(bank1.id, reservesAssetRecord1);
    insertAssetsEntry(bank1.id, depositAssetRecord);
    insertAssetsEntry(bank2.id, reservesAssetRecord2);
    insertLiabilitiesEntry(bank2.id, depositLiabilityRecord);
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

    insertAssetsEntry(bank1.id, reservesAssetRecord1);
    insertAssetsEntry(bank1.id, depositAssetRecord);
    insertAssetsEntry(bank2.id, reservesAssetRecord2);
    insertLiabilitiesEntry(bank2.id, depositLiabilityRecord);
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
    insertAssetsEntry(bank1.id, depositAssetRecord);
    insertLiabilitiesEntry(bank2.id, depositLiabilityRecord);
  },
  increaseBalance(bank1: Bank, bank2: Bank, amount: number) {
    let type = "deposits";
    if (bank1.name === "clearinghouse" || bank2.name === "clearinghouse") {
      type = "ch certs";
    }
    const depositAssetRecord = {
      instrumentType: type,
      notationType: "novation",
      amount: amount,
      id: bank2.id,
      symbol: "+",
      name: bank2.name === "clearinghouse" ? "CH" : bank2.name,
    };
    const depositLiabilityRecord = {
      instrumentType: type,
      notationType: "novation",
      amount: amount,
      id: bank1.id,
      symbol: "+",
      name: bank1.name === "clearinghouse" ? "CH" : bank1.name,
    };

    insertAssetsEntry(bank1.id, depositAssetRecord);
    insertLiabilitiesEntry(bank2.id, depositLiabilityRecord);
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
    insertAssetsEntry(customer1.id, customer1Record);
    insertAssetsEntry(customer2.id, customer2Record);
    insertLiabilitiesEntry(bank1.id, bank1Record);
    insertLiabilitiesEntry(bank2.id, bank2Record);
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

    insertAssetsEntry(customer1.id, customer1Record);
    insertAssetsEntry(customer2.id, customer2Record);
    insertLiabilitiesEntry(bank1.id, bank1Record);
    insertLiabilitiesEntry(bank1.id, bank2Record);
  },
  creditAccount(bank1, bank2, amount) {
    const system = System.getSystem();

    const bank1Record = {
      instrumentType: creditInstrumentsBySystem[system],
      notationType: "issuance",
      amount: amount,
      id: bank2.id,
      symbol: "+",
      name: bank2.name,
    };
    const bank2Record = {
      instrumentType: creditInstrumentsBySystem[system],
      notationType: "issuance",
      amount: amount,
      id: bank1.id,
      symbol: "+",
      name: bank1.name,
    };
    insertAssetsEntry(bank2.id, bank2Record);
    insertLiabilitiesEntry(bank1.id, bank1Record);
  },
  debitAccount(bank1, bank2, amount) {
    const system = System.getSystem();
    const bank1Record = {
      instrumentType: creditInstrumentsBySystem[system],
      notationType: "setOff",
      amount: amount,
      id: bank2.id,
      symbol: "-",
      name: bank2.name,
    };
    const bank2Record = {
      instrumentType: creditInstrumentsBySystem[system],
      notationType: "setOff",
      amount: amount,
      id: bank1.id,
      symbol: "-",
      name: bank1.name,
    };
    insertAssetsEntry(bank1.id, bank1Record);
    insertLiabilitiesEntry(bank2.id, bank2Record);
  },
  increaseDues(bank1, bank2, amount) {
    const system = System.getSystem();
    const duesLiabilityRecord1 = {
      instrumentType: creditInstrumentsBySystem[system],
      notationType: "issuance",
      amount: amount,
      id: bank2.id,
      symbol: "+",
      name: bank2.name,
    };
    const duesAssetRecord2 = {
      instrumentType: creditInstrumentsBySystem[system],
      notationType: "issuance",
      amount: amount,
      id: bank1.id,
      symbol: "+",
      name: bank1.name,
    };

    insertLiabilitiesEntry(bank1.id, duesLiabilityRecord1);
    insertAssetsEntry(bank2.id, duesAssetRecord2);
  },
  decreaseDues(bank1, bank2, amount) {
    const system = System.getSystem();
    const duesLiabilityRecord1 = {
      instrumentType: creditInstrumentsBySystem[system],
      notationType: "setOff",
      amount: amount,
      id: bank2.id,
      symbol: "-",
      name: bank2.name,
    };
    const duesAssetRecord2 = {
      instrumentType: creditInstrumentsBySystem[system],
      notationType: "setOff",
      amount: amount,
      id: bank1.id,
      symbol: "-",
      name: bank1.name,
    };
    insertLiabilitiesEntry(bank1.id, duesLiabilityRecord1);
    insertAssetsEntry(bank2.id, duesAssetRecord2);
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
  getByRound(id) {
    if (records.id === 0) {
      return { assets: undefined, liabilities: undefined };
    }

    const partyRecords = records.rounds[records.id - 1];
    return {
      assets: partyRecords.round[id].records.assets,
      liabilities: partyRecords.round[id].records.liabilities,
    };
  },
  getLastTwo(id) {
    if (records.id === 0) {
      return { assets: undefined, liabilities: undefined };
    } else if (records.id === 1) {
      return this.getByRound(id);
    }
    const partyRecords1 = records.rounds[records.id - 2];
    const partyRecords2 = records.rounds[records.id - 1];
    return {
      assets: [
        ...partyRecords1.round[id].records.assets,
        ...partyRecords2.round[id].records.assets,
      ],
      liabilities: [
        ...partyRecords1.round[id].records.liabilities,
        ...partyRecords2.round[id].records.liabilities,
      ],
    };
  },
  getAllTransactions(id) {
    if (records.id === 0) {
      return { assets: undefined, liabilities: undefined };
    }
    if (records.id === 1) {
      return this.getByRound(id);
    }
    let allAssets = [];
    let allLiabilities = [];
    for (const round in records.rounds) {
      const rounds = records.rounds[round];
      allAssets.push(rounds.round[id].records.assets);
      allLiabilities.push(rounds.round[id].records.liabilities);
    }
    const flattenedAssets = allAssets.reduce((a, c) => {
      return a.concat(c);
    }, []);
    const flattenedLiabilities = allLiabilities.reduce((a, c) => {
      return a.concat(c);
    }, []);

    return { assets: flattenedAssets, liabilities: flattenedLiabilities };
  },
  getAll() {
    return records.parties;
  },
  setRound() {
    const thisRecords = this.getAll();
    const round = populateRound(thisRecords);
    records.rounds[records.id] = {
      id: records.id,
      round: JSON.parse(JSON.stringify(round)),
    };
    resetRecords();
    records.id++;
  },
};
function resetRecords() {
  for (const party in records.parties) {
    records.parties[party].records = { assets: [], liabilities: [] };
  }
}
function insertAssetsEntry(id1: number, assetRecord: RecordDetail) {
  records.parties[id1].records.assets.push(assetRecord);
}
function insertLiabilitiesEntry(id1: number, liabilityRecord: RecordDetail) {
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

export const recs = {
  id: 0,
  parties: {},
  rounds: {},
  allIds: [],
};
