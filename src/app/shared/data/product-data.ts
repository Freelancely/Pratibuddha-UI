import { IProduct, IProductImage, IColor } from "@/types/product-type";

const product_data: IProduct[] = [
  {
    productId: "64250d8e253d81bc860d4d26", // Changed from id
    sku: "DCB7SDVX60",
    productName: "Carlys Cosmetics", // Changed from title
    slug: "inika-mineral-sunkissed",
    unit: "15pcs",
    productImageUrl: [
      {
        color: {
          name: "Purple Brown",
          clrCode: "#664536",
        },
        img: "https://i.ibb.co/qNn6Pqy/powder-1.png",
      },
      {
        color: {
          name: "Potters Clay",
          clrCode: "#8B5A39",
        },
        img: "https://i.ibb.co/4RJLN3h/powder-2.png",
      },
      {
        color: {
          name: "Antique Brass",
          clrCode: "#BF8A63",
        },
        img: "https://i.ibb.co/8PV5cC4/powder-3.png",
      },
      {
        color: {
          name: "Pale Taupe",
          clrCode: "#BD9B76",
        },
        img: "https://i.ibb.co/zJ9SWcP/powder-4.png",
      },
    ], // Changed from imageURLs
    parent: "Discover Skincare",
    children: "Face Powder",
    price: 85,
    discount: 5,
    quantity: 15,
    brand: {
      name: "INIKA",
    },
    category: {
      name: "Discover Skincare",
    },
    status: "in-stock",
    reviews: [],
    productType: "beauty",
    productDescription:
      "Achieve that sun-kissed glow with the Baked Mineral Bronzer from INIKA. Perfect for contouring, the loose powder adds a subtle and natural tanned tone to skin, perfectly complementing fair to medium complexions. Lightweight and non-cakey, it effortlessly sculpts and defines cheekbones to leave skin looking healthy and radiant. Certified Vegan. Cruelty free.",
    additionalInformation: [
      {
        key: "GREAT FOR LAYERING",
        value: "Mini waffle fabric construction",
      },
      {
        key: "Colors",
        value: "Wine Berry , Dirty Blue",
      },
      {
        key: "LEGENDARY STYLING",
        value: "Cute keyhole notch neck with custom",
      },
      {
        key: "CUFF DETAILS",
        value: "Velvet details with lace trim on the cuffs",
      },
      {
        key: "FEMIMINE HEMLINE",
        value: "Fashionable curved hem",
      },
      {
        key: "Graphics Coprocessor",
        value: "Exynos 9611, Octa Core (4x2.3GHz + 4x1.7GHz)",
      },
      {
        key: "Wireless Type",
        value: "802.11a/b/g/n/ac, Bluetooth",
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
    productName: "Grand Plumping Highlighter", // Changed from title
    slug: "grand-plumping-highlighter",
    unit: "10pcs",
    productImageUrl: [
      {
        color: {
          name: "Burning Sand",
          clrCode: "#D18F7C",
        },
        img: "https://i.ibb.co/whwFFGX/lip-liner-1.png",
      },
      {
        color: {
          name: "Antique Brass",
          clrCode: "#C88B6A",
        },
        img: "https://i.ibb.co/h9PYFHJ/lip-liner-2.png",
      },
      {
        color: {
          name: "Pinkish Tan",
          clrCode: "#D1A08F",
        },
        img: "https://i.ibb.co/LYr2Nkp/lip-liner-3.png",
      },
    ], // Changed from imageURLs
    parent: "Beauty of Skin",
    children: "Lip Liner",
    price: 60,
    discount: 5,
    quantity: 15,
    brand: {
      name: "INIKA",
    },
    category: {
      name: "Beauty of Skin",
    },
    status: "in-stock",
    reviews: [],
    productType: "beauty",
    productDescription:
      "Achieve that sun-kissed glow with the Baked Mineral Bronzer from INIKA. Perfect for contouring, the loose powder adds a subtle and natural tanned tone to skin, perfectly complementing fair to medium complexions. Lightweight and non-cakey, it effortlessly sculpts and defines cheekbones to leave skin looking healthy and radiant. Certified Vegan. Cruelty free.",
    additionalInformation: [
      {
        key: "GREAT FOR LAYERING",
        value: "Mini waffle fabric construction",
      },
      {
        key: "Colors",
        value: "Wine Berry , Dirty Blue",
      },
      {
        key: "LEGENDARY STYLING",
        value: "Cute keyhole notch neck with custom",
      },
      {
        key: "CUFF DETAILS",
        value: "Velvet details with lace trim on the cuffs",
      },
      {
        key: "FEMIMINE HEMLINE",
        value: "Fashionable curved hem",
      },
      {
        key: "Graphics Coprocessor",
        value: "Exynos 9611, Octa Core (4x2.3GHz + 4x1.7GHz)",
      },
      {
        key: "Wireless Type",
        value: "802.11a/b/g/n/ac, Bluetooth",
      },
    ],
    tags: ["beauty of skin", "lip liner"],
    featured: false,
    sellCount: 3,
  },
  {
    productId: "64251bc0253d81bc860d4db5", // Changed from id
    sku: "DFB7SDVX62",
    productName: "Brand Cosmetic Product", // Changed from title
    slug: "brand-cosmetic-product",
    unit: "12pcs",
    productImageUrl: [
      {
        color: {
          name: "Barney",
          clrCode: "#BF1EB2",
        },
        img: "https://i.ibb.co/vmJzZk4/cosmetics-1.png",
      },
      {
        color: {
          name: "Yellow Ochre",
          clrCode: "#C99E01",
        },
        img: "https://i.ibb.co/kG1N7m8/cosmetics-2.png",
      },
      {
        color: {
          name: "Rich Electric Blue",
          clrCode: "#0393C9",
        },
        img: "https://i.ibb.co/GTJ77k0/cosmetics-3.png",
      },
    ], // Changed from imageURLs
    parent: "Awesome Lip Care",
    children: "Cosmetics",
    price: 70,
    discount: 3,
    quantity: 8,
    brand: {
      name: "INIKA",
    },
    category: {
      name: "Awesome Lip Care",
    },
    status: "in-stock",
    reviews: [],
    productType: "beauty",
    productDescription:
      "Achieve that sun-kissed glow with the Baked Mineral Bronzer from INIKA. Perfect for contouring, the loose powder adds a subtle and natural tanned tone to skin, perfectly complementing fair to medium complexions. Lightweight and non-cakey, it effortlessly sculpts and defines cheekbones to leave skin looking healthy and radiant. Certified Vegan. Cruelty free.",
    additionalInformation: [
      {
        key: "GREAT FOR LAYERING",
        value: "Mini waffle fabric construction",
      },
      {
        key: "Colors",
        value: "Wine Berry , Dirty Blue",
      },
      {
        key: "LEGENDARY STYLING",
        value: "Cute keyhole notch neck with custom",
      },
      {
        key: "CUFF DETAILS",
        value: "Velvet details with lace trim on the cuffs",
      },
      {
        key: "FEMIMINE HEMLINE",
        value: "Fashionable curved hem",
      },
      {
        key: "Graphics Coprocessor",
        value: "Exynos 9611, Octa Core (4x2.3GHz + 4x1.7GHz)",
      },
      {
        key: "Wireless Type",
        value: "802.11a/b/g/n/ac, Bluetooth",
      },
    ],
    tags: ["awesome lip care", "cosmetics"],
    featured: true,
    sellCount: 1,
    sizes: [],
  },
  {
    productId: "64252172253d81bc860d4dbe", // Changed from id
    sku: "DGB7SDVX62",
    productName: "Wet Dewy Cream Beige", // Changed from title
    slug: "wet-dewy-cream-beige",
    unit: "12pcs",
    productImageUrl: [
      {
        color: {
          name: "Lion",
          clrCode: "#BE9770",
        },
        img: "https://i.ibb.co/p06Mk0H/makeup-1.png",
      },
      {
        color: {
          name: "Pickled Bean",
          clrCode: "#654631",
        },
        img: "https://i.ibb.co/9ttBnfM/makeup-2.png",
      },
      {
        color: {
          name: "Tumbleweed",
          clrCode: "#D4A987",
        },
        img: "https://i.ibb.co/sbpNm8n/makeup-3.png",
      },
      {
        color: {
          name: "Bullet Shell",
          clrCode: "#BC955E",
        },
        img: "https://i.ibb.co/M5z3jP1/makeup-4.png",
      },
    ], // Changed from imageURLs
    parent: "Facial Care",
    children: "Makeup Brush",
    price: 90,
    discount: 5,
    quantity: 6,
    brand: {
      name: "INIKA",
    },
    category: {
      name: "Facial Care",
    },
    status: "in-stock",
    reviews: [],
    productType: "beauty",
    productDescription:
      "Achieve that sun-kissed glow with the Baked Mineral Bronzer from INIKA. Perfect for contouring, the loose powder adds a subtle and natural tanned tone to skin, perfectly complementing fair to medium complexions. Lightweight and non-cakey, it effortlessly sculpts and defines cheekbones to leave skin looking healthy and radiant. Certified Vegan. Cruelty free.",
    additionalInformation: [
      {
        key: "GREAT FOR LAYERING",
        value: "Mini waffle fabric construction",
      },
      {
        key: "Colors",
        value: "Wine Berry , Dirty Blue",
      },
      {
        key: "LEGENDARY STYLING",
        value: "Cute keyhole notch neck with custom",
      },
      {
        key: "CUFF DETAILS",
        value: "Velvet details with lace trim on the cuffs",
      },
      {
        key: "FEMIMINE HEMLINE",
        value: "Fashionable curved hem",
      },
      {
        key: "Graphics Coprocessor",
        value: "Exynos 9611, Octa Core (4x2.3GHz + 4x1.7GHz)",
      },
      {
        key: "Wireless Type",
        value: "802.11a/b/g/n/ac, Bluetooth",
      },
    ],
    tags: ["facial care", "makeup brush"],
    featured: false,
    sellCount: 1,
  },
  {
    productId: "6426a68a253d81bc860d5ea6", // Changed from id
    sku: "EGB7SDVX68",
    productName: "Tea Tree Lemon For Fine Hair", // Changed from title
    slug: "tea-tree-lemon-for-fine-hair",
    unit: "100ml",
    productImageUrl: [
      {
        color: {
          name: "Rangoon Green",
          clrCode: "#142014",
        },
        img: "https://i.ibb.co/mvRsPK5/cosmetics-4.png",
      },
      {
        color: {
          name: "Rangoon Green",
          clrCode: "#142014",
        },
        img: "https://i.ibb.co/rkk6dXX/cosmetics-5.png",
      },
      {
        color: {
          name: "Rangoon Green",
          clrCode: "#142014",
        },
        img: "https://i.ibb.co/TMJPG3B/cosmetics-6.png",
      },
    ], // Changed from imageURLs
    parent: "Discover Skincare",
    children: "Makeup Brush",
    price: 45,
    discount: 0,
    quantity: 8,
    brand: {
      name: "INIKA",
    },
    category: {
      name: "Discover Skincare",
    },
    status: "in-stock",
    reviews: [],
    productType: "beauty",
    productDescription:
      "Achieve that sun-kissed glow with the Baked Mineral Bronzer from INIKA. Perfect for contouring, the loose powder adds a subtle and natural tanned tone to skin, perfectly complementing fair to medium complexions. Lightweight and non-cakey, it effortlessly sculpts and defines cheekbones to leave skin looking healthy and radiant. Certified Vegan. Cruelty free.",
    additionalInformation: [
      {
        key: "GREAT FOR LAYERING",
        value: "Mini waffle fabric construction",
      },
      {
        key: "Colors",
        value: "Wine Berry , Dirty Blue",
      },
      {
        key: "LEGENDARY STYLING",
        value: "Cute keyhole notch neck with custom",
      },
      {
        key: "CUFF DETAILS",
        value: "Velvet details with lace trim on the cuffs",
      },
      {
        key: "FEMIMINE HEMLINE",
        value: "Fashionable curved hem",
      },
      {
        key: "Graphics Coprocessor",
        value: "Exynos 9611, Octa Core (4x2.3GHz + 4x1.7GHz)",
      },
      {
        key: "Wireless Type",
        value: "802.11a/b/g/n/ac, Bluetooth",
      },
    ],
    tags: ["discover skincare", "makeup brush"],
    featured: false,
    sellCount: 0,
  },
  {
    productId: "6426ab33253d81bc860d5f86", // Changed from id
    sku: "FGB7SDVX68",
    productName: "Mielle Rosemary Mint Scalp", // Changed from title
    slug: "mielle-rosemary-mint-scalp",
    unit: "200ml",
    productImageUrl: [
      {
        color: {
          name: "Iridium",
          clrCode: "#3C3C3D",
        },
        img: "https://i.ibb.co/bdKTWYy/skin-1.png",
      },
      {
        color: {
          name: "Iridium",
          clrCode: "#3C3C3D",
        },
        img: "https://i.ibb.co/1GtZ2qC/skin-2.png",
      },
      {
        color: {
          name: "Iridium",
          clrCode: "#3C3C3D",
        },
        img: "https://i.ibb.co/qN95THF/skin-3.png",
      },
    ], // Changed from imageURLs
    parent: "Beauty of Skin",
    children: "Skin",
    price: 62,
    discount: 4,
    quantity: 10,
    brand: {
      name: "Antec",
    },
    category: {
      name: "Beauty of Skin",
    },
    status: "in-stock",
    reviews: [],
    productType: "beauty",
    productDescription:
      "Achieve that sun-kissed glow with the Baked Mineral Bronzer from INIKA. Perfect for contouring, the loose powder adds a subtle and natural tanned tone to skin, perfectly complementing fair to medium complexions. Lightweight and non-cakey, it effortlessly sculpts and defines cheekbones to leave skin looking healthy and radiant. Certified Vegan. Cruelty free.",
    additionalInformation: [
      {
        key: "GREAT FOR LAYERING",
        value: "Mini waffle fabric construction",
      },
      {
        key: "Colors",
        value: "Wine Berry , Dirty Blue",
      },
      {
        key: "LEGENDARY STYLING",
        value: "Cute keyhole notch neck with custom",
      },
      {
        key: "CUFF DETAILS",
        value: "Velvet details with lace trim on the cuffs",
      },
      {
        key: "FEMIMINE HEMLINE",
        value: "Fashionable curved hem",
      },
      {
        key: "Graphics Coprocessor",
        value: "Exynos 9611, Octa Core (4x2.3GHz + 4x1.7GHz)",
      },
      {
        key: "Wireless Type",
        value: "802.11a/b/g/n/ac, Bluetooth",
      },
    ],
    tags: ["beauty of skin", "skin"],
    featured: false,
    sellCount: 2,
  },
  {
    productId: "6426adba253d81bc860d6132", // Changed from id
    sku: "FCB7SDVX68",
    productName: "Innisfree Face Wash", // Changed from title
    slug: "innisfree face wash",
    unit: "150ml",
    productImageUrl: [
      {
        color: {
          name: "Faded Green",
          clrCode: "#80AF6B",
        },
        img: "https://i.ibb.co/T04BRtd/cream-1.png",
      },
      {
        color: {
          name: "Summer Green",
          clrCode: "#A6B7A5",
        },
        img: "https://i.ibb.co/8YGVKhd/cream-2.png",
      },
      {
        color: {
          name: "Dark Green",
          clrCode: "#1A2419",
        },
        img: "https://i.ibb.co/D1Hw4f4/cream-3.png",
      },
    ], // Changed from imageURLs
    parent: "Awesome Lip Care",
    children: "Cream",
    price: 68,
    discount: 3,
    quantity: 12,
    brand: {
      name: "INIKA",
    },
    category: {
      name: "Awesome Lip Care",
    },
    status: "in-stock",
    reviews: [],
    productType: "beauty",
    productDescription:
      "Achieve that sun-kissed glow with the Baked Mineral Bronzer from INIKA. Perfect for contouring, the loose powder adds a subtle and natural tanned tone to skin, perfectly complementing fair to medium complexions. Lightweight and non-cakey, it effortlessly sculpts and defines cheekbones to leave skin looking healthy and radiant. Certified Vegan. Cruelty free.",
    additionalInformation: [
      {
        key: "GREAT FOR LAYERING",
        value: "Mini waffle fabric construction",
      },
      {
        key: "Colors",
        value: "Wine Berry , Dirty Blue",
      },
      {
        key: "LEGENDARY STYLING",
        value: "Cute keyhole notch neck with custom",
      },
      {
        key: "CUFF DETAILS",
        value: "Velvet details with lace trim on the cuffs",
      },
      {
        key: "FEMIMINE HEMLINE",
        value: "Fashionable curved hem",
      },
      {
        key: "Graphics Coprocessor",
        value: "Exynos 9611, Octa Core (4x2.3GHz + 4x1.7GHz)",
      },
      {
        key: "Wireless Type",
        value: "802.11a/b/g/n/ac, Bluetooth",
      },
    ],
    tags: ["awesome lip care", "cream"],
    featured: false,
    sellCount: 5,
  },
  {
    productId: "6426b217253d81bc860d6217", // Changed from id
    sku: "FEB7SDVX68",
    productName: "Blue Rescue Face Mask", // Changed from title
    slug: "blue-rescue-face-mask",
    unit: "150ml",
    productImageUrl: [
      {
        color: {
          name: "Flame",
          clrCode: "#D74E27",
        },
        img: "https://i.ibb.co/XsZ9vLT/beauty-1.png",
      },
      {
        color: {
          name: "Flame",
          clrCode: "#D74E27",
        },
        img: "https://i.ibb.co/9qnGsJq/beauty-2.png",
      },
      {
        color: {
          name: "Flame",
          clrCode: "#D74E27",
        },
        img: "https://i.ibb.co/1JWCCnS/beauty-3.png",
      },
    ], // Changed from imageURLs
    parent: "Facial Care",
    children: "Powder",
    price: 72,
    discount: 5,
    quantity: 15,
    brand: {
      name: "INIKA",
    },
    category: {
      name: "Facial Care",
    },
    status: "in-stock",
    reviews: [],
    productType: "beauty",
    productDescription:
      "Achieve that sun-kissed glow with the Baked Mineral Bronzer from INIKA. Perfect for contouring, the loose powder adds a subtle and natural tanned tone to skin, perfectly complementing fair to medium complexions. Lightweight and non-cakey, it effortlessly sculpts and defines cheekbones to leave skin looking healthy and radiant. Certified Vegan. Cruelty free.",
    additionalInformation: [
      {
        key: "GREAT FOR LAYERING",
        value: "Mini waffle fabric construction",
      },
      {
        key: "Colors",
        value: "Wine Berry , Dirty Blue",
      },
      {
        key: "LEGENDARY STYLING",
        value: "Cute keyhole notch neck with custom",
      },
      {
        key: "CUFF DETAILS",
        value: "Velvet details with lace trim on the cuffs",
      },
      {
        key: "FEMIMINE HEMLINE",
        value: "Fashionable curved hem",
      },
      {
        key: "Graphics Coprocessor",
        value: "Exynos 9611, Octa Core (4x2.3GHz + 4x1.7GHz)",
      },
      {
        key: "Wireless Type",
        value: "802.11a/b/g/n/ac, Bluetooth",
      },
    ],
    tags: ["facial care", "powder"],
    featured: false,
    sellCount: 0,
  },
];

export default product_data;
