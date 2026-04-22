import { IProduct, IProductImage, IColor } from "@/types/product-type";

const product_data: IProduct[] = [
  {
    productId: "64250d8e253d81bc860d4d26", // Changed from id
    sku: "DCB7SDVX60",
    productName: "Samsung Smart Fridge", // Changed from title
    slug: "samsung-smart-fridge",
    unit: "15pcs",
    productImageUrl: [
      {
        color: {
          name: "Purple Brown",
          clrCode: "#664536",
        },
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Open_refrigerator_with_food_at_night.jpg/500px-Open_refrigerator_with_food_at_night.jpg",
      },
      {
        color: {
          name: "Potters Clay",
          clrCode: "#8B5A39",
        },
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Open_refrigerator_with_food_at_night.jpg/500px-Open_refrigerator_with_food_at_night.jpg",
      },
      {
        color: {
          name: "Antique Brass",
          clrCode: "#BF8A63",
        },
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Open_refrigerator_with_food_at_night.jpg/500px-Open_refrigerator_with_food_at_night.jpg",
      },
      {
        color: {
          name: "Pale Taupe",
          clrCode: "#BD9B76",
        },
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Open_refrigerator_with_food_at_night.jpg/500px-Open_refrigerator_with_food_at_night.jpg",
      },
    ], // Changed from imageURLs
    parent: "Home Appliances",
    children: "Refrigerators",
    price: 85,
    discount: 5,
    quantity: 15,
    brand: {
      name: "Samsung",
    },
    category: {
      name: "Home Appliances",
    },
    status: "in-stock",
    reviews: [],
    productType: "electronics",
    productDescription: "Experience the next generation of modern home appliances. Elevate your everyday living with intelligent features, energy efficiency, and premium design that seamlessly blends into your home.",
    additionalInformation: [
      {
        key: "Capacity",
        value: "28 cu. ft.",
      },
      {
        key: "Energy Rating",
        value: "A++",
      },
      {
        key: "Finish",
        value: "Stainless steel",
      },
      {
        key: "Smart Features",
        value: "Wi‑Fi, temperature zones, door alerts",
      },
      {
        key: "Warranty",
        value: "2 years manufacturer warranty",
      },
    ],
    tags: ["inika", "sunkissed"],
    featured: true,
    sellCount: 4,
    sizes: [],
  },
  {
    productId: "642515c0253d81bc860d4da3", // Changed from id
    sku: "DEB7SDVX62",
    productName: "LG Front Load Washing Machine", // Changed from title
    slug: "lg-washing-machine",
    unit: "10pcs",
    productImageUrl: [
      {
        color: {
          name: "Burning Sand",
          clrCode: "#D18F7C",
        },
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/LG_%EB%93%9C%EB%9F%BC%EC%84%B8%ED%83%81%EA%B8%B0%EC%99%80_%EC%8B%9D%EA%B8%B0%EC%84%B8%EC%B2%99%EA%B8%B0%2C_%EC%98%81%EA%B5%AD%EC%84%9C_%EB%AC%BC%EC%82%AC%EC%9A%A9_%ED%9A%A8%EC%9C%A8_%EC%B5%9C%EC%9A%B0%EC%88%98_%EC%A0%9C%ED%92%88_%EC%88%98%EC%83%81.jpg/500px-LG_%EB%93%9C%EB%9F%BC%EC%84%B8%ED%83%81%EA%B8%B0%EC%99%80_%EC%8B%9D%EA%B8%B0%EC%84%B8%EC%B2%99%EA%B8%B0%2C_%EC%98%81%EA%B5%AD%EC%84%9C_%EB%AC%BC%EC%82%AC%EC%9A%A9_%ED%9A%A8%EC%9C%A8_%EC%B5%9C%EC%9A%B0%EC%88%98_%EC%A0%9C%ED%92%88_%EC%88%98%EC%83%81.jpg",
      },
      {
        color: {
          name: "Antique Brass",
          clrCode: "#C88B6A",
        },
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/LG_%EB%93%9C%EB%9F%BC%EC%84%B8%ED%83%81%EA%B8%B0%EC%99%80_%EC%8B%9D%EA%B8%B0%EC%84%B8%EC%B2%99%EA%B8%B0%2C_%EC%98%81%EA%B5%AD%EC%84%9C_%EB%AC%BC%EC%82%AC%EC%9A%A9_%ED%9A%A8%EC%9C%A8_%EC%B5%9C%EC%9A%B0%EC%88%98_%EC%A0%9C%ED%92%88_%EC%88%98%EC%83%81.jpg/500px-LG_%EB%93%9C%EB%9F%BC%EC%84%B8%ED%83%81%EA%B8%B0%EC%99%80_%EC%8B%9D%EA%B8%B0%EC%84%B8%EC%B2%99%EA%B8%B0%2C_%EC%98%81%EA%B5%AD%EC%84%9C_%EB%AC%BC%EC%82%AC%EC%9A%A9_%ED%9A%A8%EC%9C%A8_%EC%B5%9C%EC%9A%B0%EC%88%98_%EC%A0%9C%ED%92%88_%EC%88%98%EC%83%81.jpg",
      },
      {
        color: {
          name: "Pinkish Tan",
          clrCode: "#D1A08F",
        },
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/LG_%EB%93%9C%EB%9F%BC%EC%84%B8%ED%83%81%EA%B8%B0%EC%99%80_%EC%8B%9D%EA%B8%B0%EC%84%B8%EC%B2%99%EA%B8%B0%2C_%EC%98%81%EA%B5%AD%EC%84%9C_%EB%AC%BC%EC%82%AC%EC%9A%A9_%ED%9A%A8%EC%9C%A8_%EC%B5%9C%EC%9A%B0%EC%88%98_%EC%A0%9C%ED%92%88_%EC%88%98%EC%83%81.jpg/500px-LG_%EB%93%9C%EB%9F%BC%EC%84%B8%ED%83%81%EA%B8%B0%EC%99%80_%EC%8B%9D%EA%B8%B0%EC%84%B8%EC%B2%99%EA%B8%B0%2C_%EC%98%81%EA%B5%AD%EC%84%9C_%EB%AC%BC%EC%82%AC%EC%9A%A9_%ED%9A%A8%EC%9C%A8_%EC%B5%9C%EC%9A%B0%EC%88%98_%EC%A0%9C%ED%92%88_%EC%88%98%EC%83%81.jpg",
      },
    ], // Changed from imageURLs
    parent: "Smart Appliances",
    children: "Washing Machines",
    price: 60,
    discount: 5,
    quantity: 15,
    brand: {
      name: "LG",
    },
    category: {
      name: "Smart Appliances",
    },
    status: "in-stock",
    reviews: [],
    productType: "electronics",
    productDescription: "Experience the next generation of modern home appliances. Elevate your everyday living with intelligent features, energy efficiency, and premium design that seamlessly blends into your home.",
    additionalInformation: [
      {
        key: "Capacity",
        value: "8 kg",
      },
      {
        key: "Motor",
        value: "Inverter Direct Drive",
      },
      {
        key: "Spin Speed",
        value: "1200 RPM",
      },
      {
        key: "Programs",
        value: "Quick wash, cotton, eco, delicates",
      },
      {
        key: "Warranty",
        value: "2 years manufacturer warranty",
      },
    ],
    tags: ["smart appliances", "washing machines"],
    featured: false,
    sellCount: 3,
  },
  {
    productId: "64251bc0253d81bc860d4db5", // Changed from id
    sku: "DFB7SDVX62",
    productName: "Panasonic Inverter Microwave", // Changed from title
    slug: "panasonic-microwave",
    unit: "12pcs",
    productImageUrl: [
      {
        color: {
          name: "Barney",
          clrCode: "#BF1EB2",
        },
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Panasonic_NN-SD69LS_20220410.jpg/500px-Panasonic_NN-SD69LS_20220410.jpg",
      },
      {
        color: {
          name: "Yellow Ochre",
          clrCode: "#C99E01",
        },
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Panasonic_NN-SD69LS_20220410.jpg/500px-Panasonic_NN-SD69LS_20220410.jpg",
      },
      {
        color: {
          name: "Rich Electric Blue",
          clrCode: "#0393C9",
        },
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Panasonic_NN-SD69LS_20220410.jpg/500px-Panasonic_NN-SD69LS_20220410.jpg",
      },
    ], // Changed from imageURLs
    parent: "Entertainment",
    children: "Microwaves",
    price: 70,
    discount: 3,
    quantity: 8,
    brand: {
      name: "Panasonic",
    },
    category: {
      name: "Entertainment",
    },
    status: "in-stock",
    reviews: [],
    productType: "electronics",
    productDescription: "Experience the next generation of modern home appliances. Elevate your everyday living with intelligent features, energy efficiency, and premium design that seamlessly blends into your home.",
    additionalInformation: [
      {
        key: "Power",
        value: "1000W",
      },
      {
        key: "Capacity",
        value: "32 L",
      },
      {
        key: "Technology",
        value: "Inverter heating",
      },
      {
        key: "Modes",
        value: "Reheat, defrost, grill",
      },
      {
        key: "Warranty",
        value: "1 year manufacturer warranty",
      },
    ],
    tags: ["entertainment", "microwaves"],
    featured: true,
    sellCount: 1,
    sizes: [],
  },
  {
    productId: "64252172253d81bc860d4dbe", // Changed from id
    sku: "DGB7SDVX62",
    productName: "Sony Bravia 4K TV", // Changed from title
    slug: "sony-bravia-4k-tv",
    unit: "12pcs",
    productImageUrl: [
      {
        color: {
          name: "Lion",
          clrCode: "#BE9770",
        },
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Cptvdisplay.jpg/500px-Cptvdisplay.jpg",
      },
      {
        color: {
          name: "Pickled Bean",
          clrCode: "#654631",
        },
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Cptvdisplay.jpg/500px-Cptvdisplay.jpg",
      },
      {
        color: {
          name: "Tumbleweed",
          clrCode: "#D4A987",
        },
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Cptvdisplay.jpg/500px-Cptvdisplay.jpg",
      },
      {
        color: {
          name: "Bullet Shell",
          clrCode: "#BC955E",
        },
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Cptvdisplay.jpg/500px-Cptvdisplay.jpg",
      },
    ], // Changed from imageURLs
    parent: "Gadgets",
    children: "Televisions",
    price: 90,
    discount: 5,
    quantity: 6,
    brand: {
      name: "Sony",
    },
    category: {
      name: "Gadgets",
    },
    status: "in-stock",
    reviews: [],
    productType: "electronics",
    productDescription: "Experience the next generation of modern home appliances. Elevate your everyday living with intelligent features, energy efficiency, and premium design that seamlessly blends into your home.",
    additionalInformation: [
      {
        key: "Screen Size",
        value: "65-inch",
      },
      {
        key: "Resolution",
        value: "4K Ultra HD",
      },
      {
        key: "HDR",
        value: "HDR10 / Dolby Vision",
      },
      {
        key: "Smart OS",
        value: "Google TV",
      },
      {
        key: "Connectivity",
        value: "Wi‑Fi, Bluetooth, HDMI, USB",
      },
    ],
    tags: ["gadgets", "televisions"],
    featured: false,
    sellCount: 1,
  },
  {
    productId: "6426a68a253d81bc860d5ea6", // Changed from id
    sku: "EGB7SDVX68",
    productName: "Whirlpool Convection Oven", // Changed from title
    slug: "whirlpool-oven",
    unit: "100ml",
    productImageUrl: [
      {
        color: {
          name: "Rangoon Green",
          clrCode: "#142014",
        },
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Tabletop_convection_oven.jpg/500px-Tabletop_convection_oven.jpg",
      },
      {
        color: {
          name: "Rangoon Green",
          clrCode: "#142014",
        },
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Tabletop_convection_oven.jpg/500px-Tabletop_convection_oven.jpg",
      },
      {
        color: {
          name: "Rangoon Green",
          clrCode: "#142014",
        },
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Tabletop_convection_oven.jpg/500px-Tabletop_convection_oven.jpg",
      },
    ], // Changed from imageURLs
    parent: "Home Appliances",
    children: "Televisions",
    price: 45,
    discount: 0,
    quantity: 8,
    brand: {
      name: "Whirlpool",
    },
    category: {
      name: "Home Appliances",
    },
    status: "in-stock",
    reviews: [],
    productType: "electronics",
    productDescription: "Experience the next generation of modern home appliances. Elevate your everyday living with intelligent features, energy efficiency, and premium design that seamlessly blends into your home.",
    additionalInformation: [
      {
        key: "Type",
        value: "Convection oven",
      },
      {
        key: "Capacity",
        value: "35 L",
      },
      {
        key: "Functions",
        value: "Bake, toast, grill",
      },
      {
        key: "Controls",
        value: "Knob + timer",
      },
      {
        key: "Warranty",
        value: "1 year manufacturer warranty",
      },
    ],
    tags: ["home appliances", "televisions"],
    featured: false,
    sellCount: 0,
  },
  {
    productId: "6426ab33253d81bc860d5f86", // Changed from id
    sku: "FGB7SDVX68",
    productName: "Bosch Dishwasher", // Changed from title
    slug: "bosch-dishwasher",
    unit: "200ml",
    productImageUrl: [
      {
        color: {
          name: "Iridium",
          clrCode: "#3C3C3D",
        },
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Dishwasher_with_dishes.JPG/500px-Dishwasher_with_dishes.JPG",
      },
      {
        color: {
          name: "Iridium",
          clrCode: "#3C3C3D",
        },
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Dishwasher_with_dishes.JPG/500px-Dishwasher_with_dishes.JPG",
      },
      {
        color: {
          name: "Iridium",
          clrCode: "#3C3C3D",
        },
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Dishwasher_with_dishes.JPG/500px-Dishwasher_with_dishes.JPG",
      },
    ], // Changed from imageURLs
    parent: "Smart Appliances",
    children: "Dishwashers",
    price: 62,
    discount: 4,
    quantity: 10,
    brand: {
      name: "Bosch",
    },
    category: {
      name: "Smart Appliances",
    },
    status: "in-stock",
    reviews: [],
    productType: "electronics",
    productDescription: "Experience the next generation of modern home appliances. Elevate your everyday living with intelligent features, energy efficiency, and premium design that seamlessly blends into your home.",
    additionalInformation: [
      {
        key: "Capacity",
        value: "12 place settings",
      },
      {
        key: "Noise Level",
        value: "46 dB",
      },
      {
        key: "Programs",
        value: "Eco, auto, intensive, quick",
      },
      {
        key: "Drying",
        value: "Heated drying",
      },
      {
        key: "Warranty",
        value: "2 years manufacturer warranty",
      },
    ],
    tags: ["smart appliances", "dishwashers"],
    featured: false,
    sellCount: 2,
  },
  {
    productId: "6426adba253d81bc860d6132", // Changed from id
    sku: "FCB7SDVX68",
    productName: "Dyson Air Purifier", // Changed from title
    slug: "dyson-purifier",
    unit: "150ml",
    productImageUrl: [
      {
        color: {
          name: "Faded Green",
          clrCode: "#80AF6B",
        },
        img: "https://cdn.dummyjson.com/product-images/smartphones/iphone-13-pro/1.webp",
      },
      {
        color: {
          name: "Summer Green",
          clrCode: "#A6B7A5",
        },
        img: "https://cdn.dummyjson.com/product-images/smartphones/iphone-13-pro/1.webp",
      },
      {
        color: {
          name: "Dark Green",
          clrCode: "#1A2419",
        },
        img: "https://cdn.dummyjson.com/product-images/smartphones/iphone-13-pro/1.webp",
      },
    ], // Changed from imageURLs
    parent: "Entertainment",
    children: "Ovens",
    price: 68,
    discount: 3,
    quantity: 12,
    brand: {
      name: "Dyson",
    },
    category: {
      name: "Entertainment",
    },
    status: "in-stock",
    reviews: [],
    productType: "electronics",
    productDescription: "Experience the next generation of modern home appliances. Elevate your everyday living with intelligent features, energy efficiency, and premium design that seamlessly blends into your home.",
    additionalInformation: [
      {
        key: "Coverage",
        value: "Up to 400 sq. ft.",
      },
      {
        key: "Filter",
        value: "HEPA + activated carbon",
      },
      {
        key: "Modes",
        value: "Auto, sleep, boost",
      },
      {
        key: "Noise",
        value: "Quiet mode supported",
      },
      {
        key: "Warranty",
        value: "2 years manufacturer warranty",
      },
    ],
    tags: ["entertainment", "ovens"],
    featured: false,
    sellCount: 5,
  },
  {
    productId: "6426b217253d81bc860d6217", // Changed from id
    sku: "FEB7SDVX68",
    productName: "Philips Air Fryer", // Changed from title
    slug: "philips-air-fryer",
    unit: "150ml",
    productImageUrl: [
      {
        color: {
          name: "Flame",
          clrCode: "#D74E27",
        },
        img: "https://cdn.dummyjson.com/product-images/laptops/apple-macbook-pro-14-inch-space-grey/1.webp",
      },
      {
        color: {
          name: "Flame",
          clrCode: "#D74E27",
        },
        img: "https://cdn.dummyjson.com/product-images/laptops/apple-macbook-pro-14-inch-space-grey/1.webp",
      },
      {
        color: {
          name: "Flame",
          clrCode: "#D74E27",
        },
        img: "https://cdn.dummyjson.com/product-images/laptops/apple-macbook-pro-14-inch-space-grey/1.webp",
      },
    ], // Changed from imageURLs
    parent: "Gadgets",
    children: "Air Purifiers",
    price: 72,
    discount: 5,
    quantity: 15,
    brand: {
      name: "Philips",
    },
    category: {
      name: "Gadgets",
    },
    status: "in-stock",
    reviews: [],
    productType: "electronics",
    productDescription: "Experience the next generation of modern home appliances. Elevate your everyday living with intelligent features, energy efficiency, and premium design that seamlessly blends into your home.",
    additionalInformation: [
      {
        key: "Capacity",
        value: "4.1 L",
      },
      {
        key: "Power",
        value: "1400W",
      },
      {
        key: "Technology",
        value: "Rapid Air",
      },
      {
        key: "Controls",
        value: "Digital touch panel",
      },
      {
        key: "Warranty",
        value: "1 year manufacturer warranty",
      },
    ],
    tags: ["gadgets", "air purifiers"],
    featured: false,
    sellCount: 0,
  },
];

export default product_data;
