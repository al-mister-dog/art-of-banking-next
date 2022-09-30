import { Analytics } from "./displays/analytics";
import { analytics, AnalyticsData } from "./structures";

export const GraphData = {
  setCentralBankGraphData() {
    let newCreditData = Analytics.getCreditTotal();

    const creditData = newCreditData.data
      .filter(
        (acc) => acc.type !== "fed funds" || acc.category === "bank deposits"
      )
      .reduce(
        (a, c) => {
          return { balance: a.balance + c.balance };
        },
        { balance: 0 }
      ).balance;
    const reservesData = newCreditData.data
      .filter((acc) => acc.category === "bank deposits")
      .reduce(
        (a, c) => {
          return { balance: a.balance + c.balance };
        },
        { balance: 0 }
      ).balance;

    const privateCredit = newCreditData.data
      .filter(
        (acc) =>
          acc.type === "fed funds" || acc.category === "bank deposits"
      )
      .reduce(
        (a, c) => {
          return { balance: a.balance + c.balance };
        },
        { balance: 0 }
      ).balance;

    this.update(reservesData, creditData, privateCredit);
  },
  update(reservesData, creditData, privateCredit) {
    let newReserves = [...analytics.graphs.reserves, reservesData];
    let newCredit = [...analytics.graphs.credit, creditData];
    let newPrivateCredit = [...analytics.graphs.privateCredit, privateCredit];
    let graphs = {
      ...analytics.graphs,
      reserves: newReserves,
      credit: newCredit,
      privateCredit: newPrivateCredit,
    };

    AnalyticsData.assignGraph(graphs);
  },
};
