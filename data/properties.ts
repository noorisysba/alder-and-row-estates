import { areas } from "./areas";
export type Property = {
  id: string;
  slug: string;
  title: string;
  address: string;
  area: string;
  postcode: string;
  category: "buy" | "rent" | "commercial";
  type: string;
  price: number;
  beds: number;
  baths: number;
  size: number;
  description: string;
  fullDescription: string;
  highlights: string[];
  image: string;
  gallery: string[];
  tenure: string;
  furnishing: string;
  epc: string;
  councilTax: string;
  status: string;
  transaction: string;
  lat: number;
  lng: number;
  brochure: boolean;
  video: boolean;
};
const seeds: [
  string,
  string,
  string,
  "buy" | "rent" | "commercial",
  string,
  number,
  number,
  number,
  number,
  string,
][] = [
  [
    "A light-filled garden apartment",
    "Linden Gardens",
    "Notting Hill",
    "buy",
    "Apartment",
    1450000,
    2,
    2,
    1284,
    "living-1",
  ],
  [
    "An elegant home above the square",
    "Weymouth Street",
    "Marylebone",
    "buy",
    "Apartment",
    1895000,
    3,
    2,
    1520,
    "living-2",
  ],
  [
    "A beautifully considered family home",
    "Alder Grove",
    "Kensington",
    "buy",
    "Townhouse",
    3250000,
    5,
    4,
    2840,
    "living-3",
  ],
  [
    "A quiet corner of Chelsea",
    "Rosemont Mews",
    "Chelsea",
    "buy",
    "Mews house",
    2250000,
    3,
    2,
    1720,
    "living-4",
  ],
  [
    "A penthouse with a wider perspective",
    "Dockside Crescent",
    "Canary Wharf",
    "buy",
    "Penthouse",
    1250000,
    3,
    2,
    1490,
    "living-5",
  ],
  [
    "Period detail, modern living",
    "Cedar Terrace",
    "Islington",
    "buy",
    "Terraced house",
    1175000,
    3,
    2,
    1380,
    "living-6",
  ],
  [
    "A village retreat by the Heath",
    "Elm Walk",
    "Hampstead",
    "buy",
    "Terraced house",
    2150000,
    4,
    3,
    2120,
    "living-7",
  ],
  [
    "A refined Mayfair residence",
    "Clarges Court",
    "Mayfair",
    "buy",
    "Apartment",
    2750000,
    3,
    3,
    1820,
    "living-8",
  ],
  [
    "A fresh start by the river",
    "Willow Reach",
    "Richmond",
    "buy",
    "Flat",
    495000,
    1,
    1,
    560,
    "living-9",
  ],
  [
    "A place to make your own",
    "Parkside Lane",
    "Battersea",
    "buy",
    "Flat",
    625000,
    2,
    1,
    780,
    "living-10",
  ],
  [
    "A discreet Belgravia address",
    "Ebury Mews",
    "Belgravia",
    "buy",
    "Mews house",
    2950000,
    4,
    3,
    2260,
    "living-11",
  ],
  [
    "A thoughtfully designed studio",
    "Warren Place",
    "Fitzrovia",
    "buy",
    "Studio",
    425000,
    0,
    1,
    360,
    "living-12",
  ],
  [
    "Your own corner of Marylebone",
    "Ashfield Street",
    "Marylebone",
    "rent",
    "Apartment",
    3250,
    2,
    2,
    940,
    "living-8",
  ],
  [
    "Garden-square living",
    "Pembridge Court",
    "Notting Hill",
    "rent",
    "Flat",
    2850,
    2,
    1,
    810,
    "living-6",
  ],
  [
    "A well-connected city home",
    "Harbour View",
    "Canary Wharf",
    "rent",
    "Apartment",
    2450,
    1,
    1,
    620,
    "living-5",
  ],
  [
    "A charming Chelsea base",
    "Oakley Mews",
    "Chelsea",
    "rent",
    "Mews house",
    5500,
    3,
    2,
    1350,
    "living-4",
  ],
  [
    "Room to grow in Richmond",
    "Orchard Terrace",
    "Richmond",
    "rent",
    "Terraced house",
    3950,
    4,
    2,
    1740,
    "living-7",
  ],
  [
    "A compact home with character",
    "Florence Yard",
    "Islington",
    "rent",
    "Studio",
    1550,
    0,
    1,
    330,
    "living-12",
  ],
  [
    "City views, quiet evenings",
    "Riverlight Court",
    "Battersea",
    "rent",
    "Penthouse",
    4750,
    3,
    2,
    1380,
    "living-9",
  ],
  [
    "A graceful Kensington apartment",
    "Holland Rise",
    "Kensington",
    "rent",
    "Apartment",
    4250,
    3,
    2,
    1240,
    "living-2",
  ],
  [
    "Central London, beautifully framed",
    "Chapter Street",
    "Westminster",
    "rent",
    "Flat",
    2600,
    1,
    1,
    650,
    "living-10",
  ],
  [
    "A distinctive cultural address",
    "Floral Court",
    "Covent Garden",
    "rent",
    "Apartment",
    3450,
    2,
    2,
    890,
    "living-11",
  ],
  [
    "A bright workspace for new ideas",
    "Charlotte Yard",
    "Fitzrovia",
    "commercial",
    "Office",
    52000,
    0,
    0,
    1250,
    "office-1",
  ],
  [
    "A shopfront with neighbourhood appeal",
    "Upper Passage",
    "Islington",
    "commercial",
    "Retail",
    32000,
    0,
    0,
    720,
    "retail",
  ],
  [
    "A contemporary waterfront office",
    "Quayside Exchange",
    "Canary Wharf",
    "commercial",
    "Office",
    78000,
    0,
    0,
    2450,
    "office-2",
  ],
  [
    "A creative studio, reimagined",
    "Foundry Lane",
    "Battersea",
    "commercial",
    "Studio",
    28500,
    0,
    0,
    860,
    "office-3",
  ],
  [
    "A versatile village investment",
    "Heathside Parade",
    "Hampstead",
    "commercial",
    "Mixed-use",
    1250000,
    0,
    0,
    2240,
    "office-4",
  ],
  [
    "A considered professional address",
    "Bentinck Court",
    "Marylebone",
    "commercial",
    "Office",
    64000,
    0,
    0,
    1420,
    "office-5",
  ],
  [
    "Retail space with character",
    "Richmond Arcade",
    "Richmond",
    "commercial",
    "Retail",
    575000,
    0,
    0,
    980,
    "office-6",
  ],
  [
    "A flagship Knightsbridge opportunity",
    "Brompton Place",
    "Knightsbridge",
    "commercial",
    "Retail",
    95000,
    0,
    0,
    1640,
    "office-7",
  ],
];
export const properties: Property[] = seeds.map((s, i) => {
  const [title, street, area, category, type, price, beds, baths, size, image] =
    s;
  const a = areas.find((a) => a.name === area)!;
  const commercial = category === "commercial";
  const transaction =
    commercial && [26, 28].includes(i)
      ? "Sale"
      : commercial
        ? "Lease"
        : category === "buy"
          ? "Sale"
          : "Let";
  const highlights = commercial
    ? [
        "Flexible open-plan layout",
        "Excellent natural light",
        "Established London location",
        "Scope for a considered fit-out",
        "Well-connected neighbourhood",
        "Viewings by appointment",
      ]
    : [
        "Beautifully proportioned living space",
        beds === 0
          ? "Thoughtfully zoned studio layout"
          : `${beds} ${beds === 1 ? "bedroom" : "bedrooms"} with considered storage`,
        "Contemporary fitted kitchen",
        "A welcoming neighbourhood setting",
        "Excellent natural light",
        "Viewings by appointment",
      ];
  return {
    id: `AR${String(i + 1).padStart(3, "0")}`,
    slug: street.toLowerCase().replaceAll(" ", "-"),
    title,
    address: `${i + 6} ${street}`,
    area,
    postcode: `${a.postcode} ${(i % 9) + 1}AR`,
    category,
    type,
    price,
    beds,
    baths,
    size,
    image,
    gallery: [
      image,
      ...(commercial
        ? [
            "office-1",
            "office-2",
            "office-3",
            "office-4",
            "office-5",
            "office-7",
          ].filter((x) => x !== image)
        : [
            `kitchen-${(i % 3) + 1}`,
            `bedroom-${(i % 3) + 1}`,
            `bathroom-${(i % 2) + 1}`,
            `living-${((i + 3) % 12) + 1}`,
            "garden",
          ]),
    ].slice(0, 6),
    description: commercial
      ? `A versatile ${type.toLowerCase()} in ${area}, offering ${size.toLocaleString("en-GB")} sq ft of adaptable space.`
      : `A thoughtfully presented ${type.toLowerCase()} in ${area}, with generous proportions and a lovely sense of light.`,
    fullDescription: commercial
      ? `Set within the established commercial landscape of ${area}, this ${type.toLowerCase()} offers an inviting setting for a growing business. The adaptable arrangement allows a future occupier to shape the space around their own working style.\n\nA welcoming entrance leads into a well-proportioned main space, with natural light and room for a considered fit-out. The surrounding neighbourhood provides a useful mix of cafés, services and transport connections.\n\nAll dimensions, terms and permitted uses are illustrative. A real transaction would require independent checks on planning, business rates, service charges and lease terms.`
      : `Set on a residential street in ${area}, this ${type.toLowerCase()} brings together a natural sense of light with an easy, practical layout. The main living area provides space to relax, entertain and settle into everyday life.\n\nThe kitchen is arranged for both quiet mornings and sociable evenings, while ${beds === 0 ? "the sleeping area is carefully integrated into the open-plan space" : `the ${beds === 1 ? "bedroom offers" : "bedrooms offer"} a peaceful retreat with space for personal touches`}. Well-considered storage and a restrained interior palette complete the picture.\n\nBeyond the front door, ${area} offers its own distinctive mix of local shops, places to eat and green space. This is a home for those who value neighbourhood character as much as their own space.`,
    highlights,
    tenure: commercial
      ? "Terms by negotiation"
      : ["Terraced house", "Townhouse", "Mews house"].includes(type)
        ? "Freehold"
        : "Leasehold · illustrative 125 years",
    furnishing: i % 2 ? "Furnished" : "Unfurnished",
    epc: ["B", "C", "D"][i % 3],
    councilTax: ["D", "E", "F", "G"][i % 4],
    status:
      i === 1
        ? "Under offer"
        : category === "rent"
          ? i % 2
            ? "Available now"
            : "Available by arrangement"
          : commercial
            ? "Available"
            : "For sale",
    transaction,
    lat: a.lat + (i % 3) * 0.001,
    lng: a.lng + (i % 4) * 0.001,
    brochure: true,
    video: true,
  };
});
export const money = (p: Property) =>
  `£${p.price.toLocaleString("en-GB")}${p.category === "rent" ? " pcm" : p.category === "commercial" && p.transaction === "Lease" ? " pa" : ""}`;
