export const balanceSheetDisplay1 = {
  assets: {
    customer overdrafts: [
      {
        id: 2,
        subordinateId: 4,
        superiorId: 0,
        type: 'customer overdrafts',
        balance: 25,
        category: 'customer overdrafts',
      },
    ],
    dueTos: [
      {
        id: 1,
        subordinateId: 1,
        superiorId: 0,
        type: 'customer deposits',
        balance: 10,
        category: 'dueTos',
      },
    ],
  },
  liabilities: {
    customer deposits: [
      {
        id: 0,
        subordinateId: 2,
        superiorId: 0,
        type: 'customer deposits',
        balance: 35,
        category: 'customer deposits',
      },
    ],
    dueTos: [
      {
        id: 0,
        subordinateId: 0,
        superiorId: 1,
        type: 'customer deposits',
        balance: 100,
        category: 'dueTos',
      },
    ],
  },
}

export const balanceSheetDisplay2 = {
  assets: {
    customer overdrafts: [
      {
        id: 2,
        subordinateId: 4,
        superiorId: 0,
        type: 'customer overdrafts',
        balance: 25,
        thirdPartyDetail: {
          id: 4,
          name: 'emma',
          type: 'customer',
          accountIds: [2],
          duesIds: [],
        },
        category: 'customer overdrafts',
      },
    ],
    dueTos: [
      {
        id: 1,
        subordinateId: 1,
        superiorId: 0,
        type: 'customer deposits',
        balance: 10,
        thirdPartyDetail: {
          id: 1,
          name: 'hsbc',
          type: 'bank',
          accountIds: [1, 3],
          duesIds: [0, 1],
        },
        category: 'dueTos',
      },
    ],
  },
  liabilities: {
    customer deposits: [
      {
        id: 0,
        subordinateId: 2,
        superiorId: 0,
        type: 'customer deposits',
        balance: 35,
        thirdPartyDetail: {
          id: 2,
          name: 'alex',
          type: 'customer',
          accountIds: [0],
          duesIds: [],
        },
        category: 'customer deposits',
      },
    ],
    dueTos: [
      {
        id: 0,
        subordinateId: 0,
        superiorId: 1,
        type: 'customer deposits',
        balance: 100,
        thirdPartyDetail: {
          id: 1,
          name: 'hsbc',
          type: 'bank',
          accountIds: [1, 3],
          duesIds: [0, 1],
        },
        category: 'dueTos',
      },
    ],
  },
}

export const balanceSheetDisplay3 = {
  assets: {
    customer overdrafts: [
      {
        id: 2,
        subordinateId: 4,
        superiorId: 0,
        type: 'customer overdrafts',
        balance: 25,
        thirdPartyDetail: {
          id: 4,
          name: 'emma',
          type: 'customer',
          accountIds: [2],
          duesIds: [],
        },
        category: 'customer overdrafts',
      },
    ],
    dueTos: [
      {
        id: 1,
        subordinateId: 1,
        superiorId: 0,
        type: 'customer deposits',
        balance: 10,
        thirdPartyDetail: {
          id: 1,
          name: 'hsbc',
          type: 'bank',
          accountIds: [1, 3],
          duesIds: [0, 1],
        },
        category: 'dueTos',
      },
    ],
    cashReserves: [
      { id: 0, cashReserves: 100, category: 'cashReserves', balance: 100 },
    ],
  },
  liabilities: {
    customer deposits: [
      {
        id: 0,
        subordinateId: 2,
        superiorId: 0,
        type: 'customer deposits',
        balance: 35,
        thirdPartyDetail: {
          id: 2,
          name: 'alex',
          type: 'customer',
          accountIds: [0],
          duesIds: [],
        },
        category: 'customer deposits',
      },
    ],
    dueTos: [
      {
        id: 0,
        subordinateId: 0,
        superiorId: 1,
        type: 'customer deposits',
        balance: 100,
        thirdPartyDetail: {
          id: 1,
          name: 'hsbc',
          type: 'bank',
          accountIds: [1, 3],
          duesIds: [0, 1],
        },
        category: 'dueTos',
      },
    ],
  },
}

export const balanceSheetDisplay4 = {
  assets: [
    {
      instrument: 'customer overdrafts',
      accounts: [
        {
          id: 2,
          subordinateId: 4,
          superiorId: 0,
          type: 'customer deposits',
          balance: 25,
          category: 'customer overdrafts',
          thirdPartyDetail: {
            id: 4,
            name: 'emma',
            type: 'customer',
            accountIds: [2],
            duesIds: [],
            loanIds: [],
          },
        },
      ],
    },
    {
      instrument: 'dueFroms',
      accounts: [
        {
          id: 1,
          subordinateId: 1,
          superiorId: 0,
          type: 'customer deposits',
          balance: 10,
          category: 'dueFroms',
          thirdPartyDetail: {
            id: 1,
            name: 'hsbc',
            type: 'bank',
            accountIds: [1, 3],
            duesIds: [0, 1],
            loanIds: [],
          },
        },
      ],
    },
    {
      instrument: 'reserves',
      accounts: [
        { id: 0, cashReserves: 100, category: 'reserves', balance: 100 },
      ],
    },
  ],
  liabilities: [
    {
      instrument: 'customer deposits',
      accounts: [
        {
          id: 0,
          subordinateId: 2,
          superiorId: 0,
          type: 'customer deposits',
          balance: 35,
          category: 'customer deposits',
          thirdPartyDetail: {
            id: 2,
            name: 'alex',
            type: 'customer',
            accountIds: [0],
            duesIds: [],
            loanIds: [],
          },
        },
      ],
    },
    {
      instrument: 'dueTos',
      accounts: [
        {
          id: 0,
          subordinateId: 0,
          superiorId: 1,
          type: 'customer deposits',
          balance: 100,
          category: 'dueTos',
          thirdPartyDetail: {
            id: 1,
            name: 'hsbc',
            type: 'bank',
            accountIds: [1, 3],
            duesIds: [0, 1],
            loanIds: [],
          },
        },
      ],
    },
  ],
}

export const balanceSheetDisplay5 = {
  assets: [
    {
      instrument: 'customer overdrafts',
      accounts: [
        {
          id: 2,
          subordinateId: 4,
          superiorId: 0,
          type: 'customer deposits',
          balance: 25,
          category: 'customer overdrafts',
          thirdPartyDetail: {
            id: 4,
            name: 'emma',
            type: 'customer',
            accountIds: [2],
            creditIds: [],
          },
        },
      ],
    },
    {
      instrument: 'dueFroms',
      accounts: [
        {
          id: 1,
          subordinateId: 1,
          superiorId: 0,
          type: 'customer deposits',
          balance: 10,
          category: 'dueFroms',
          thirdPartyDetail: {
            id: 1,
            name: 'hsbc',
            type: 'bank',
            accountIds: [1, 3],
            creditIds: [0, 1],
          },
        },
      ],
    },
    {
      instrument: 'reserves',
      accounts: [
        { id: 0, cashReserves: 100, category: 'reserves', balance: 100 },
      ],
    },
  ],
  liabilities: [
    {
      instrument: 'customer deposits',
      accounts: [
        {
          id: 0,
          subordinateId: 2,
          superiorId: 0,
          type: 'customer deposits',
          balance: 35,
          category: 'customer deposits',
          thirdPartyDetail: {
            id: 2,
            name: 'alex',
            type: 'customer',
            accountIds: [0],
            creditIds: [],
          },
        },
      ],
    },
    {
      instrument: 'dueTos',
      accounts: [
        {
          id: 0,
          subordinateId: 0,
          superiorId: 1,
          type: 'customer deposits',
          balance: 100,
          category: 'dueTos',
          thirdPartyDetail: {
            id: 1,
            name: 'hsbc',
            type: 'bank',
            accountIds: [1, 3],
            creditIds: [0, 1],
          },
        },
      ],
    },
  ],
}
