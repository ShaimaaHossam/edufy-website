export const order = {
  id: "1001", // UUID
  order_number: "A200-1001", // string like "A05-10202"

  service_type: "maintenance", // one string of (maintenance | plumbing | cleaning | otherType)
  status: "canceled", // one string of (requested | assigned | pending  | inprogress | completed | canceled)
  due_date: "2022-06-19", // date string yyyy-mm-dd
  due_time_from: "14:00:00", // time string hh:mm
  due_time_to: "23:12", // time string hh:mm

  vat_amount: 14,
  total_without_vat: 100,
  total_amount: 114,

  property: {
    id: "1001",
    title: "Property 1",
  }, // property object
  units: [
    {
      id: "1001",
      title: "Unit 1",
    },
    {
      id: "1002",
      title: "Unit 2",
    },
    {
      id: "1003",
      title: "Unit 3",
    },
  ], // array of units, min. of 1

  services_vat_amount: 140,
  services_total_without_vat: 1000,
  services_total_amount: 1140,
  services: [
    {
      service_id: "1001",
      name: "Service 1",
      description: "Some text to describe 1",
      price: 20,
      quantity: 3,
      total_price: 60,
    },
    {
      service_id: "1002",
      name: "Service 2",
      description: "Some text to describe 2",
      price: 50,
      quantity: 1,
      total_price: 50,
    },
    {
      service_id: "1003",
      name: "Service 3",
      description: "Some text to describe 3",
      price: 100,
      quantity: 3,
      total_price: 300,
    },
  ], // array of services

  materials_vat_amount: 280,
  materials_total_without_vat: 2000,
  materials_total_amount: 2280,
  materials: [
    {
      id: "1001",
      name: "Material 1",
      price: 20,
      quantity: 3,
      total_price: 60,

      is_approved: true, // true/fasle
      reviewed_at: "2022-06-15 15:15:00", // datetime string, null if not reviewed yet
      reviewed_by: {}, // user object, could be null
    },
    {
      id: "1002",
      name: "Material 2",
      price: 20,
      quantity: 3,
      total_price: 60,

      is_approved: false, // true/fasle
      reviewed_at: "2022-06-15 12:19:00", // datetime string, null if not reviewed yet
      reviewed_by: {}, // user object, could be null
    },
    {
      id: "1003",
      name: "Material 3",
      price: 20,
      quantity: 3,
      total_price: 60,

      is_approved: true, // true/fasle
      reviewed_at: "", // datetime string, null if not reviewed yet
      reviewed_by: {}, // user object, could be null
    },
  ], // array of services material, could be null

  created_at: "2022-06-15 12:15:00", // datetime string
  created_by: {
    id: "1001",
    name: "Hossam Dashshan",
    role: {
      name: "Property Manager",
    },
  }, // user object

  cancelled_at: "", // datetime string, could be null
  cancelled_by: {
    id: "1001",
    name: "Hossam Dahshan 100",
    role: {
      name: "Area Manager",
    },
  }, // user object, could be null

  assigned_at: "", // datetime string, could be null
  assigned_by: "", // user object, could be null

  completed_at: "", // datetime string, could be null

  service_provider: {}, // to whom the order is assigned (optional)

  note: "", // order notes (optional)
  note_images: ["", "", ""], // array of urls of images ids (optional)
};

const orderPostBody = {
  type: "", // one string of (maintenance | plumbing | cleaning | otherType)

  property_id: "", // property id
  units_ids: ["", "", ""], // array units ids
  services: [
    {
      service_id: "",
      quantity: 3,
    },
    {},
    {},
  ], // array of services

  due_date: "2022-06-19", // date string yyyy-mm-dd
  due_time_from: "23:12", // time string hh:mm
  due_time_to: "23:12", // time string hh:mm

  note: "", // order notes (optional)
  note_images: ["", "", ""], // array of urls of images ids (optional)
};

export const orders = {
  data: [order],
  meta: { currentPage: 1, lastPage: 3, perPage: 20, total: 55 },
};
