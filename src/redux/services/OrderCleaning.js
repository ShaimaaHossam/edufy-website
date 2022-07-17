const createCleaningOrderReq = {
    "type": "cleaning",
    "property_id": "43838ea8-d364-4835-ad13-ddfeccfdd2bd",
    "units": [
        "20784403-462e-4289-ba7d-cb0af0537b2c",
        "59c5a705-554f-4240-a8c1-09c06d8a037d"
    ],
    "categories": [
        {// Daily 
            "id": "367328c6-fb94-46d4-b338-c2b2b1067b2a", // service_type id
            "include_laundry": true, // true or false
            "repetition_type": 2, // 1 = one time order , 2 = recurring order ( desgin flow showing the recurring order only )
            "frequency": 1, // 1 = Daily ,2 = Custom

            "schedule": [
                {
                    "from_date": "20-07-2022",
                    "to_date": "25-07-2022",
                    "from_time": "13:00",
                    "to_time": "20:00"
                },
            ],
        },
        { // Custom 
            "id": "367328c6-fb94-46d4-b338-c2b267b10b2a", // service_type id
            "include_laundry": true, // true or false
            "repetition_type": 2, // 1 = one time order , 2 = recurring order ( desgin flow showing the recurring order only )
            "frequency": 2, // 1 = Daily ,2 = Custom

            "schedule": [
                {
                    "form_date": "20-07-2022",
                    "to_date": "",
                    "from_time": "13:00",
                    "to_time": "20:00"
                },
                {
                    "form_date": "21-07-2022",
                    "to_date": "",
                    "from_time": "13:00",
                    "to_time": "20:00"
                },
                {
                    "from_date": "22-07-2022",
                    "to_date": "",
                    "from_time": "13:00",
                    "to_time": "20:00"
                },
                {
                    "from_date": "23-07-2022",
                    "to_date": "",
                    "from_time": "13:00",
                    "to_time": "20:00"
                }
            ],
        },

    ]
}