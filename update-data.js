const fs = require('fs');
const path = require('path');

const productFile = path.join(__dirname, 'src/app/shared/data/product-data.ts');
let pData = fs.readFileSync(productFile, 'utf8');

const appliances = [
  { name: 'Samsung Smart Fridge', type: 'Fridge' },
  { name: 'LG Front Load Washing Machine', type: 'Washing Machine' },
  { name: 'Panasonic Inverter Microwave', type: 'Microwave' },
  { name: 'Sony Bravia 4K TV', type: 'TV' },
  { name: 'Whirlpool Convection Oven', type: 'Oven' },
  { name: 'Bosch Dishwasher', type: 'Dishwasher' },
  { name: 'Dyson Air Purifier', type: 'Air Purifier' },
  { name: 'Philips Air Fryer', type: 'Air Fryer' }
];

let appIdx = 0;

// Replace product images
pData = pData.replace(/productImageUrl: \[\s*\{[\s\S]*?\}\s*\](,?)( \/\/ Changed from imageURLs)?/g, (match) => {
    let app = appliances[appIdx % appliances.length];
    let imgText = app.type.replace(/ /g, '+');
    return `productImageUrl: [\n      {\n        color: { name: "Default", clrCode: "#000" },\n        img: "https://placehold.co/400x400/eeeeee/333333?text=${imgText}"\n      }\n    ] // Changed from imageURLs`;
});

appIdx = 0;
// Replace product name
pData = pData.replace(/productName: "(.*?)", \/\/ Changed from title/g, () => {
    let app = appliances[appIdx % appliances.length];
    appIdx++;
    return `productName: "${app.name}", // Changed from title`;
});

// Change beauty, fashion, jewelry to electronics
pData = pData.replace(/productType: "(beauty|fashion|jewelry)"/g, 'productType: "electronics"');

fs.writeFileSync(productFile, pData);

const categoryFile = path.join(__dirname, 'src/app/shared/data/category-data.ts');
let cData = fs.readFileSync(categoryFile, 'utf8');

cData = cData.replace(/productType: "(beauty|fashion|jewelry)"/g, 'productType: "electronics"');

let catImages = ['Fridge', 'Washing+Machine', 'TV', 'Oven', 'Microwave', 'Appliance', 'Dishwasher', 'Vacuum'];
let catIdx = 0;
cData = cData.replace(/img: "https:\/\/i\.ibb\.co\/.*?\.(jpg|png)"/g, () => {
    let imgText = catImages[catIdx % catImages.length];
    catIdx++;
    return `img: "https://placehold.co/100x100/eeeeee/333333?text=${imgText}"`;
});

fs.writeFileSync(categoryFile, cData);
console.log('Update Complete');
