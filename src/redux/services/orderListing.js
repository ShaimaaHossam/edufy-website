const orderListingReqURL = "/orders"; // GET
const orderListingReqQueryParams = {
    'filter[service_type]': 'maintenance', //required
    "filter[keyword]": "",
    'filter[from_date]': "2022-06-01",
    'filter[to_date]': "2022-07-01",
    "filter[creator_role]": "Admin",
    "filter[property_id]": ["0001", "0002"], // UUID
    "filter[unit_id]": ["0001"], //UUID
    "filter[service_id]": ["0001", "0002", "0003"], //UUID ,
    'filter[status]': 'pending',
};
export const orderListingReqRes = {
    meta: {
        currentPage: 1,
        lastPage: 1,
        perPage: 20,
        total: 15,
    },
    data: [
        {
            id: "096f02c0-44ff-42dc-9f35-52d140b1bc29",
            type: "cleaning",
            status: "Confirmed", // Confirmed ,SPAssigned ,InProgress ,Pending , SPDone ,Cancelled , In-Progress , Completed
            starting_at: "2020/06/01",
            order_number: "A1231234",
            total: 960,


            property: {
                id: "0bb086d9-7230-4177-be64-1b12cd4c326b",
                type: {
                    id: "0bb086d9-7230-4177-be64-1b12cd4c326b",
                    title: "test"
                },
                title: "Porperty 104",
                address: "Al Madinah, Prophet's Mohamad Mosque",
                city_id: "aea8d888-4492-4c9e-ab21-5d6774e673bd",
                location: {
                    lat: 24.4686741481888,
                    lng: 39.61493968963624
                }
            },// property object


            created_by: {
                id: "3bc53ada-cbab-4180-9fc3-b15e7e8de8a5",
                name: "mohamed",
                role: "admin"
            }, // user object


            unit: {
                id: "3bc53ada-cbab-4180-9fc3-b15e7e8de8a5",
                type: {
                    id: "0bb086d9-7230-4177-be64-1b12cd4c326b",
                    title: "test"
                },
                title: "U2001",
                city_id: "aea8d888-4492-4c9e-ab21-5d6774e673bd"
            }, // unit object


            service: {
                id: "367328c6-fb94-46d4-b338-c2b267b10b2a",
                name: {
                    ar: "السباكة",
                    en: "Plumbing"
                },
                slug: {
                    ar: "alsbak",
                    en: "plumbing"
                },
                description: {
                    ar: "السباكة",
                    en: "Plumbing"
                },
            } // service object
        }
    ]
};

const downloadOrdersListSheetReqURL = "/orders/download"; // GET
