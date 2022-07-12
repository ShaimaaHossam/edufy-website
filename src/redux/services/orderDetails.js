const orderDetailsReqURL = "/orders"; // GET
const orderDetailsReqQueryParams = { id: '0bb086d9-7230-4177-be64-1b12cd4c326b' }; //UUID
export const orderDetailsReqRes = {
    data: {
        // There is no quotations in cleaing services
        new_quotations: [
            {
                id: "0bb086d9-7230-4177-be64-1b12cd4c326b", // quotation id
                name: "Quotation 3", // quotation name
                created_at: "15/06/2022 12:15 am",
                materials_total_without_vat: 2000, // I will calucate the total_with_vat from my side
                materials: [
                    {
                        id: "1001",
                        name: "Material 1",
                        unit_price: 20,
                        quantity: 3,
                        total_price: 60,
                        attachments: {
                            path: [
                                'https://image1.url.com/',
                                'https://image2.url.com/',
                                'https://image3.url.com/',
                            ]
                        }
                    },
                    {
                        id: "1002",
                        name: "Material 2",
                        unit_price: 20,
                        quantity: 3,
                        total_price: 60,
                        attachments: {
                            path: [
                                'https://image1.url.com/',
                                'https://image2.url.com/',
                                'https://image3.url.com/',
                            ]
                        }
                    },
                    {
                        id: "1003",
                        name: "Material 3",
                        unit_price: 20,
                        quantity: 3,
                        total_price: 60,
                        attachments: {
                            path: [
                                'https://image1.url.com/',
                                'https://image2.url.com/',
                                'https://image3.url.com/',
                            ]
                        }
                    },
                ],
            }
        ],

        approved_quotations: [
            {
                id: "533086d9-2330-4177-be64-1d1gcd4c326b", // quotation id
                name: "Quotation 1", // quotation name
                created_at: "15/06/2022 12:15 am",
                materials_total_without_vat: 2000, // I will calucate the total_with_vat from my side
                invoice_path: 'https://file.url.com/', // only if it's approved quotation , otherwise null
                materials: [
                    {
                        id: "0004",
                        name: "Material 1",
                        unit_price: 20,
                        quantity: 3,
                        total_price: 60,
                        attachments: {
                            path: [
                                'https://image1.url.com/',
                                'https://image2.url.com/',
                                'https://image3.url.com/',
                            ]
                        }
                    },
                    {
                        id: "0005",
                        name: "Material 2",
                        unit_price: 20,
                        quantity: 3,
                        total_price: 60,
                        attachments: {
                            path: [
                                'https://image1.url.com/',
                                'https://image2.url.com/',
                                'https://image3.url.com/',
                            ]
                        }
                    },
                    {
                        id: "0006",
                        name: "Material 3",
                        unit_price: 20,
                        quantity: 3,
                        total_price: 60,
                        attachments: {
                            path: [
                                'https://image1.url.com/',
                                'https://image2.url.com/',
                                'https://image3.url.com/',
                            ]
                        }
                    },
                ],
            }
        ],

        rejected_quotations: [
            {
                id: "533086d9-2330-4177-be64-1d1gcd4c326b", // quotation id
                name: "Quotation 2", // quotation name
                created_at: "15/06/2022 12:15 am",
                materials_total_without_vat: 2000, // I will calucate the total_with_vat from my side

                materials: [
                    {
                        id: "0011",
                        name: "Material 1",
                        unit_price: 20,
                        quantity: 3,
                        total_price: 60,
                        attachments: {
                            path: [
                                'https://image1.url.com/',
                                'https://image2.url.com/',
                                'https://image3.url.com/',
                            ]
                        }
                    },
                    {
                        id: "0012",
                        name: "Material 2",
                        unit_price: 20,
                        quantity: 3,
                        total_price: 60,
                        attachments: {
                            path: [
                                'https://image1.url.com/',
                                'https://image2.url.com/',
                                'https://image3.url.com/',
                            ]
                        }
                    },
                    {
                        id: "0034",
                        name: "Material 3",
                        unit_price: 20,
                        quantity: 3,
                        total_price: 60,
                    },
                ],
            }
        ],

        order_summery: {
            order_number: 'AM439007',
            order_status: 'In progress',
            schedule: {
                date: "20-07-2022",
                to_time: "20:00",
                from_time: "13:00",
            },
            property: {
                id: "0001",
                title: "Property 1",
            }, // property object
            unit: {
                id: "0009",
                title: "Unit 9",
            },
            ordered_by: {
                id: "0015",
                name: "Khaled Tag",
                role: {
                    name: "Unit manger",
                },
            }, // user object

        },

        additional_services: {
            service_type: "Electricity",
            services_total_without_vat: 1000, // I will calucate the total_with_vat from my side
            services: [
                {
                    service_id: "1001",
                    name: "Service 1",
                    Unit_price: 20,
                    quantity: 3,
                },
                {
                    service_id: "1002",
                    name: "Service 2",
                    Unit_price: 50,
                    quantity: 1,
                },
                {
                    service_id: "1003",
                    name: "Service 3",
                    Unit_price: 100,
                    quantity: 3,
                },
            ], // array of services
        },

        Ordered_Services_Summery: {
            service_type: "Plumbing",
            services_total_without_vat: 1000, // I will calucate the total_with_vat from my side
            services: [
                {
                    service_id: "1001",
                    name: "Service 1",
                    Unit_price: 20,
                    quantity: 3,
                },
                {
                    service_id: "1002",
                    name: "Service 2",
                    Unit_price: 50,
                    quantity: 1,
                },
                {
                    service_id: "1003",
                    name: "Service 3",
                    Unit_price: 100,
                    quantity: 3,
                },
            ], // array of services
        },

        Order_Visits: {}, // Already have been discussed

        acitivity_log: [
            {
                id: "0001",
                activity: 'Order completion confirmation was Confirmed by [User_name].',
                created_at: "15/06/2022 01:15 am",
            },
            {
                id: "0002",
                activity: 'Order completion confirmation was Confirmed by [User_name].',
                created_at: "15/06/2022 05:15 am",
            },
            {
                id: "0003",
                activity: 'Order completion confirmation was Confirmed by [User_name].',
                created_at: "15/06/2022 06:15 am",
            }
        ]
    },
};

//** quotation Actions ** //
const approveQuotationMaterialsReqURL; // Update all materials status to 1 (approved) in quotation 
const removeMaterialReqURL; // Update the material status to 2 (rejected)
const approveMaterialReqURL; // Update the material status to 0 (pending) , if it's rejected
// note that you can't approve single material unless it is removed (rejected).
// Otherwiste, you have to approve all materials in quotation

//** Additional services Actions ** //
const approveAdditionalServiceReqURL;
// const rejectAdditionalServiceReqURL;

