const walletReqURL = "/wallet/overview"; // GET I think it's already implemented in accounting module
export const walletReqRes = {
  spendings_limit: 10000,
  total_spendings: 7800.8,
  deposits: 4000,
  current_balance: 9000,
};

const ordersReqURL = "/orders/total"; // GET
const ordersReqQueryParams = {
  "filter[date_from]": "2022-06-01",
  "filter[date_to]": "2022-06-30",
  "filter[user_role]": "Property Manger",
  "filter[property]": "Some Property",
};

export const ordersReqRes = {
  total_orders: 670, // total orders
  open_orders: 60, // total open orders
  completed_orders: 600, // total completed orders
  cancelled_orders: 10, //total cancelled orders
  months: [
    {
      month: "Jan",
      year: "1995",
      orders: {
        total_orders: 670, // total orders
        open_orders: 60, // total open orders
        completed_orders: 600, // total completed orders
        cancelled_orders: 10, //total cancelled orders
      },
    },
    {
      month: "Feb",
      year: "1995",
      orders: {
        total_orders: 600,
        open_orders: 60,
        completed_orders: 600,
        cancelled_orders: 10,
      },
    },
    {
      month: "March",
      year: "1995",
      orders: {
        total_orders: 30,
        open_orders: 60,
        completed_orders: 600,
        cancelled_orders: 10,
      },
    },
    {
      month: "Apr",
      year: "1995",
      orders: {
        total_orders: 30,
        open_orders: 60,
        completed_orders: 600,
        cancelled_orders: 10,
      },
    },
    {
      month: "May",
      year: "1995",
      orders: {
        total_orders: 30,
        open_orders: 60,
        completed_orders: 600,
        cancelled_orders: 10,
      },
    },
    {
      month: "Jun",
      year: "1995",
      orders: {
        total_orders: 30,
        open_orders: 60,
        completed_orders: 600,
        cancelled_orders: 10,
      },
    }, 
    
  ],
};

const servicesReqURL = "/services/orders"; // GET
export const servicesReqRes = [
  {
    service_type: "Cleaning",
    service_id: "12",
    total_orders: 10,
  },
  {
    service_type: "Plumbing",
    service_id: "35",
    total_orders: 35,
  },
  {
    service_type: "Air Conditioning",
    service_id: "42",
    total_orders: 42,
  },
  {
    service_type: "Deep Cleaning",
    service_id: "23",
    total_orders: 23,
  },
  {
    service_type: "Deep Cleaning",
    service_id: "23",
    total_orders: 23,
  },
];

const materialSpendingReqUrl = "/material/spending"; //GET
const aterialSpendingReqQueryParams = {
  "filter[date_from]": "2022-06-01",
  "filter[date_to]": "2022-06-30",
  "filter[user_role]": "Property Manger",
  "filter[property]": "Some Property",
};
export const materialSpendingReqRes = {
  meta: {
    currentPage: 1,
    lastPage: 1,
    perPage: 20,
    total: 15,
  },
  data: [
    {
      id: "12",
      propert: {
        id: "100",
        name: "Ali Touers",
      },
      service: {
        name: "Plumbling",
      },
      sub_service: {
        name: "installation",
      },
      total_orders: 20,
      completed_orders: 10,
      visted_orders: 10,
      total_cost: 100,
    },
    {
      id: "25",
      propert: {
        id: "100",
        name: "Ali Touers",
      },
      service: {
        name: "cleaning",
      },
      sub_service: {
        name: "basic cleaning",
      },
      total_orders: 20,
      completed_orders: 10,
      visted_orders: 10,
      total_cost: 100,
    },
  ],
};

const propertyStateReqUrl = "/properties/state"; //GET
const propertyStateReqQueryParams = {
  "filter[date_from]": "2022-06-01",
  "filter[date_to]": "2022-06-30",
  "filter[user_role]": "Property Manger",
  "filter[property]": "Some Property",
};
export const propertyStateReqRes = {
  meta: {
    currentPage: 1,
    lastPage: 1,
    perPage: 20,
    total: 15,
  },
  data: [
    {
      id: "109",
      property: {
        id: "122",
        name: "Esssam Touers",
      },
      unit: {
        id: "540",
        name: "Mhmd unit",
      },
      created_by: {
        name: "Mngaer Ali",
        id: "550",
        role: "Area Manger",
      },
      total_orders: 20,
      open_orders: 10,
      completed_orders: 10,
      total_cost: 100,
    },
    {
      id: "108",
      property: {
        id: "122",
        name: "Ali Touers",
      },
      unit: {
        id: "530",
        name: "Ali Mhmd unit",
      },
      created_by: {
        name: "Mngaer Ali",
        id: "520",
        role: "Area Manger",
      },
      total_orders: 20,
      open_orders: 10,
      completed_orders: 10,
      total_cost: 100,
    },
  ],
};
