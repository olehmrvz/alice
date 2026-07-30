export type Publishable = { isPublished: boolean };

export type Doctor = Publishable & {
  id: string;
  slug: string;
  name: string | null;
  role: "chief_doctor" | "doctor";
  isChiefDoctor: boolean;
  isFounder: boolean;
  specialties: string[];
  procedureIds: string[];
  education: string[];
  experience: string | null;
  certifications: string[];
  image: string | null;
  shortQuote: string | null;
};

export type ServiceCategory = Publishable & {
  id: string;
  slug: string;
  title: string;
};

export type Procedure = Publishable & {
  id: string;
  slug: string;
  categoryId: string;
  title: string;
  shortDescription: string | null;
  concernIds: string[];
  doctorIds: string[];
  priceIds: string[];
  duration: string | null;
  sessions: string | null;
  recovery: string | null;
  indications: string[];
  contraindications: string[];
  image: string | null;
  relatedProcedureIds: string[];
};

export type Concern = Publishable & {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  recommendedProcedureIds: string[];
};

export type Price = Publishable & {
  id: string;
  categoryId: string | null;
  subcategoryId: string | null;
  procedureId: string | null;
  service: string;
  variant: string | null;
  area: string | null;
  product: string | null;
  volume: string | null;
  dosage: string | null;
  duration: string | null;
  unit: string | null;
  sourceTitle: string;
  normalizedTitle: string | null;
  doctorLevel: "chief_doctor" | "doctor" | "both" | null;
  headDoctorPrice: number | null;
  headDoctorPriceMax: number | null;
  doctorPrice: number | null;
  doctorPriceMax: number | null;
  currentPrice: number | null;
  currentPriceMax: number | null;
  originalPrice: number | null;
  currency: "UAH" | "EUR";
  priceType: "fixed" | "from" | "on_request";
  package: boolean;
  description: string | null;
  note: string | null;
  included: string[];
  tags: string[];
  searchTerms: string[];
  sortOrder: number;
  sourceImage: string;
  sourceSection: string;
  priceOptions: PriceOption[];
};

export type PriceOption = {
  label: string;
  currentPrice: number | null;
  originalPrice: number | null;
  headDoctorPrice: number | null;
  doctorPrice: number | null;
};

export type PriceCategory = Publishable & {
  id: string;
  title: string;
  sortOrder: number;
};

export type PriceSubcategory = Publishable & {
  id: string;
  categoryId: string;
  title: string;
  sortOrder: number;
};

export type ContactConfig = {
  instagramUrl: string;
  viberUrl: string | null;
  telegramUrl: string | null;
  whatsappUrl: string | null;
  phoneDisplay: string | null;
  phoneHref: string | null;
  address: string | null;
  mapUrl: string | null;
  workHours: string | null;
  leadEndpoint: string | null;
};

export type ContentRecord = Publishable & { id: string; slug: string };

export type SiteSettings = {
  name: string;
  city: string;
  district: string;
  features: Record<string, boolean>;
};
