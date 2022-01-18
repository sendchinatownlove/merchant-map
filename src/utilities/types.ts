export type Merchant = {
  name: string;
  address?: string;
  addressLine1?: string;
  addressLine2?: string;
  shortDescription: string;
  typeBusiness?: string[];
  heroURL: string | null;
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
