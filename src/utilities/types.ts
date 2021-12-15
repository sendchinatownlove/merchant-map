export type Merchant = {
  name: string;
  address: string;
  shortDescription: string;
  typeBusiness: string[];
  imageURLs: { left: string; right: string };
  phoneNumber: string;
  websiteUrl: string;
  description: string;
  position: LatLong;
  insiderTips: string;
};

export type LatLong = {
  lat: number;
  lng: number;
};
