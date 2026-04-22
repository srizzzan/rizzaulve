import { Product } from './store';

// We use picsum.photos for 100% reliable image loading without rate limits (429 errors).
const getImg = (seed: string) => `https://picsum.photos/seed/${seed}/800/1200`;

export const products: Product[] = [
  // Original 6
  {
    id: '1',
    name: 'Obsidian Trench Coat',
    price: 340,
    category: 'Outerwear',
    image: '/images/obsidian-trench-coat.png',
    description: 'A tailored charcoal trench coat made from premium wool blend. Features sharp lapels, minimalist hidden buttons, and a structured silhouette.',
    gender: 'Men',
    splineUrl: 'https://sketchfab.com/models/eba426d142724fb9985897fe57eca977/embed'
  },
  {
    id: '2',
    name: 'Desert Dune Knit Sweater',
    price: 185,
    category: 'Knitwear',
    image: 'https://cdn.shopify.com/s/files/1/0024/2289/8758/files/43MSW-OKGD-KHAK_02.jpg?v=1760723155',
    description: 'Luxuriously soft oversized knit sweater in a burnt amber tone. Perfect for layering, offering both warmth and a strong stylistic statement.',
    gender: 'Women'
  },
  {
    id: '3',
    name: 'Midnight Silk Trousers',
    price: 210,
    category: 'Bottoms',
    image: 'http://datura.com/cdn/shop/products/Andri096_portra_23de36_copia_1024x1024.jpg?v=1700830937',
    description: 'Fluid, high-waisted silk-blend trousers in deep black. Features a wide-leg cut that flows beautifully with every step.',
    gender: 'Women'
  },
  {
    id: '4',
    name: 'Eclipse Leather Jacket',
    price: 450,
    category: 'Outerwear',
    image: 'https://barneysoriginals.com/wp-content/uploads/2019/01/WEASLEY-BLCK-0047h-scaled.jpg',
    description: 'Matte black premium vegan leather jacket. Features asymmetrical zip, structural shoulders, and a slightly cropped hem.',
    gender: 'Men',
    splineUrl: 'https://sketchfab.com/models/4cc042033c5b4a698b62f331bbf3b426/embed'
  },
  {
    id: '5',
    name: 'Dusk Essential Tee',
    price: 65,
    category: 'Tops',
    image: 'https://twisttango.com/pub_images/original/250526_TTDAY1_9025_Leonie_Satin_Tee_Future_Dusk_8982_Tyne_Satin_Skirt_Future_Dusk1744.jpg',
    description: 'The perfect elevated basic. Heavyweight organic cotton with a structured drape and a slightly higher neckline.',
    gender: 'Unisex'
  },
  {
    id: '6',
    name: 'Ember Pleated Skirt',
    price: 155,
    category: 'Bottoms',
    image: 'https://skydance.pl/cdn/shop/products/skydance-flames-pleated-skirt-001.jpg?v=1689246149&width=1646',
    description: 'Mid-length pleated skirt in an iridescent warm amber hue. Creates dynamic movement and catches the light beautifully.',
    gender: 'Women'
  },

  // Added Men's Products
  {
    id: '7',
    name: 'Onyx Tailored Suit Jacket',
    price: 480,
    category: 'Outerwear',
    image: 'https://i.pinimg.com/originals/84/41/e0/8441e059a51eb5a7c173106c6fda6bc0.jpg',
    description: 'A sharp, architectural suit jacket in pure obsidian black. Made for those who dominate the room with subtle elegance.',
    gender: 'Men'
  },
  {
    id: '8',
    name: 'Sandstone Overshirt',
    price: 160,
    category: 'Tops',
    image: 'http://freeflyapparel.com/cdn/shop/files/MDOWVOV_24_4.webp?v=1748876669',
    description: 'A heavy canvas overshirt inspired by desert landscapes. Designed for transitional weather and effortless layering.',
    gender: 'Men'
  },
  {
    id: '9',
    name: 'Graphite Cargo Trousers',
    price: 195,
    category: 'Bottoms',
    image: 'https://www.dauletapparel.com/cdn/shop/products/S8e2e013328da4bf29fefe7c226155c13J.jpg?v=1665587275&width=800',
    description: 'Utilitarian design meets high fashion. Features geometric pocket placements and a relaxed, slightly tapered fit.',
    gender: 'Men'
  },
  {
    id: '10',
    name: 'Charcoal Cashmere Turtleneck',
    price: 260,
    category: 'Knitwear',
    image: 'https://n.nordstrommedia.com/it/b37c32e5-1b3f-4aef-a80d-ade1c73f4b89.jpeg?h=365&w=240&dpr=2',
    description: 'The pinnacle of winter luxury. A slim-fitting turtleneck made from 100% pure Mongolian cashmere.',
    gender: 'Men'
  },

  // Added Women's Products
  {
    id: '11',
    name: 'Amber Silk Slip Dress',
    price: 280,
    category: 'Dresses',
    image: 'https://images.urbndata.com/is/image/Anthropologie/83226431_011_b14?$a15-pdp-detail-shot$&fit=constrain&qlt=80&wid=640',
    description: 'A stunning burnt amber slip dress that cascades flawlessly. Perfect for evening wear and cinematic moments.',
    gender: 'Women'
  },
  {
    id: '12',
    name: 'Ash Wool Wrap Coat',
    price: 395,
    category: 'Outerwear',
    image: 'https://freemans.scene7.com/is/image/OttoUK/553w/phase-eight-aoife-wool-wrap-coat~68T840FRSP.jpg',
    description: 'An expansive, dramatic wrap coat in soft ash grey. The oversized lapels create a stunning architectural frame.',
    gender: 'Women'
  },
  {
    id: '13',
    name: 'Ivory Poplin Blouse',
    price: 140,
    category: 'Tops',
    image: 'https://images.asos-media.com/products/asos-design-bow-front-blouse-in-poplin-in-ivory/209651445-1-white?$n_640w$&wid=513&fit=constrain',
    description: 'A structural poplin blouse with exaggerated cuffs and a deep V-neckline. A modern reinvention of a classic.',
    gender: 'Women'
  },
  {
    id: '14',
    name: 'Shadow Wide-Leg Jeans',
    price: 175,
    category: 'Bottoms',
    image: 'https://n.nordstrommedia.com/it/cc29a48d-1f8c-4dd2-8623-c08f6f3507c4.jpeg?h=368&w=240&dpr=2',
    description: 'Washed black denim cut with an exaggerated wide leg. Features a high waist and raw hems for a deconstructed look.',
    gender: 'Women'
  }
];

export const trendingProducts = products.slice(0, 4);
export const lookbookImages = [
  'https://images.openai.com/static-rsc-4/UqA2yzGNhKknn4bTmMvfzIylnLRF5bavxd4fgeIS_H-x3W_aCtr0J0QNdv_QdtulTYEfUvPxCH7QPyaf2XsBHbTKXCpUsk6yR-2a7CdKOyWYHxkWiLhKzNiM_SOYBGuna5cRYK3CAEF2H5J4Cv5Z3QcdnXY74kLIVJifDFhsqOJMs-AYojcNJZyszE5dtoCv?purpose=fullsize',
  'https://images.openai.com/static-rsc-4/prjV5uIZEkynoRuCgGf_9EZY13mR27beqNdbOOBpVTMCVAZtUCVoNlKH1eLnQF6GvViSFKGSBE09Bz88bZqSdlhiEZ8pc6fpICjfI1g7Hu0t_dbHWeixpiUNU9uE5JdTaaYEAD3AAAW-8a38i67ozJTjljwylKZ9whsBSclDiixt1WlM7vb9jsc6FzhgAP3P?purpose=fullsize',
  'https://images.openai.com/static-rsc-4/WFic_U7xGJrPI0En3ben1pi4a6pQJWytG6rjHmdV-t7zsgp1HAx3hG8K8N8CBkNSNaPJ2SEiMZCVM_pzYUFgg2gLeTzEp-kHxYcLkgjw9rlF01grvVCGT4C7OvFvDFo9wQWBAES7CYb0z1M70WRBOh4sVbThM4KsN4rfd0kkm9k5XCcIDzwnPEGC374tSkQH?purpose=fullsize',
  'https://images.openai.com/static-rsc-4/3v8NLTkuKLNxfWOnLjVXjuzLCoNdeFB7e2ow2Auc1hRyEIUlz6amfj778rk3bWUGEJH-qxkBATbKP9OoLPX6VCVU5dgbnUhnDWbbxN-2IAmmS3BoLO_pEER0tZBEzIJE0SODPil398FsGU7mQLcaK69grqcuhp7tgJb2gokToRC2iMmX2mEkk9htyFtFo0qm?purpose=fullsize',
  'https://images.openai.com/static-rsc-4/9kNSRz6VAs5OjNliDuaJbNnozgOF8rSzOb-cdx08XClvgo6oBMPhGcAuuW_mcvS8VTC_YxbBl907BTpD96lYhxNgqnLvujJIokJvmyzOzdqTTGyOTqUcwwEd2W3bPls3npP0LBjRbJy6J8nlF6CxP-WsxEokmXl-GUAfVh9ntuFpCuAnfswjU7J5oBWir4uI?purpose=fullsize',
  'https://images.openai.com/static-rsc-4/FTgw_4MTQyroGzgBizsp_LBtxm1P00v1iowjaKFh6GpPW_XPoRjmA0TUwuud9ZXWNEUAB2xX_T0psX3fnENCqqANi1bgpPvbGVHgQsjroiH-BeU6JrdLbezXXJrnd8dLSbeeYtOQKUvHKeRw68KVYs2CrL_qSTiOWqMU1iYGNUHErOjSAXBaHlChJq3gyA47?purpose=fullsize'
];
