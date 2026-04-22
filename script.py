import re
import json

with open('img_urls.json', 'r', encoding='utf-8') as f:
    urls = json.load(f)

urls['Air_purifier'] = 'https://cdn.dummyjson.com/product-images/smartphones/iphone-13-pro/1.webp'
urls['Air_fryer'] = 'https://cdn.dummyjson.com/product-images/laptops/apple-macbook-pro-14-inch-space-grey/1.webp'

product_urls = [
    urls['Refrigerator'],
    urls['Washing_machine'],
    urls['Microwave_oven'],
    urls['Television'],
    urls['Convection_oven'],
    urls['Dishwasher'],
    urls['Air_purifier'],
    urls['Air_fryer']
]

new_desc = 'Experience the next generation of modern home appliances. Elevate your everyday living with intelligent features, energy efficiency, and premium design that seamlessly blends into your home.'

with open('src/app/shared/data/product-data.ts', 'r', encoding='utf-8') as f:
    text = f.read()

blocks = text.split('productId:')
for i in range(1, len(blocks)):
    url = product_urls[i-1]
    blocks[i] = re.sub(r'img:\s*\"[^\"]+\"', f'img: \"{url}\"', blocks[i])
    blocks[i] = re.sub(r'productDescription:\s*\"[^\"]+\"', f'productDescription: \"{new_desc}\"', blocks[i])

new_text = 'productId:'.join(blocks)

with open('src/app/shared/data/product-data.ts', 'w', encoding='utf-8') as f:
    f.write(new_text)
