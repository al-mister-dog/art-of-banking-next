export let analytics = {
  records: {},
  balances: {},
  graphs: {
    credit: [],
    reserves: [],
    privateCredit: [],
    nationalData: {},
  },
};

export const AnalyticsData = {
  addIdToNationalData(id: number) {
    const newNationalData = { ...analytics.graphs.nationalData };
    newNationalData[id] = [];
    const newGraphs = { ...analytics.graphs, nationalData: newNationalData };
    analytics = { ...analytics, graphs: newGraphs };
  },
  addDataToNationalData(id: number, data: any) {
    const newDataArray = [...analytics.graphs.nationalData[id]];
    newDataArray.push(data);
    const newNationalData = {
      ...analytics.graphs.nationalData,
      [id]: newDataArray,
    };
    const newGraphs = { ...analytics.graphs, nationalData: newNationalData };
    analytics = { ...analytics, graphs: newGraphs };
  },
  assignNationalData(graphs) {},

  assignCreditData(graphs) {
    analytics = { ...analytics, graphs };
  },
};
