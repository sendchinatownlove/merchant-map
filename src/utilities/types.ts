export type Merchant = {
  name: string;
  address?: string;
  addressLine1?: string;
  addressLine2?: string;
  shortDescription: string;
  typeBusiness?: string[];
  heroURL?: string | null;
  phoneNumber: string;
  websiteUrl: string;
  position: LatLong;
  insiderTips?: string;
  story: string;
};

export type LatLong = {
  lat: number;
  lng: number;
};

export type MerchantRaw = {
  Name: string;
  TYPE: string;
  Notes: string;
  Attachments: string;
  Status: string;
  Address: string;
  Borough: string;
  "hours open": string;
  Phone: string;
  "Phone 2": string;
  Website: string;
  Takeout: string;
  Delivery: string;
  "3rd Party Delivery": string;
  giftcards: string;
  "giftcards 2": string;
  "SCL Merchants": string;
  "SCL Outreach Notes": string;
  "Merchant Interactions": string;
  "SCL Merchant (Y/N)": string;
  "GAM_Capacity Matrix": string;
  RoboGeocache: string;
  "Short Description": string;
  "Image URLs": string;
  Story: string;
  "Hero Image URL": string;
  "Hide on Map": string;
}