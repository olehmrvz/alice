import type { Concern, PriceCategory, PriceSubcategory, Procedure, ServiceCategory } from "./types";

const categories = [
  ["aesthetic-cosmetology", "Естетична косметологія"],
  ["injection-cosmetology", "Ін’єкційна косметологія"],
  ["hardware-cosmetology", "Апаратна косметологія"],
  ["dermatology", "Дерматологія"],
  ["trichology", "Трихологія"],
  ["laser-hair-removal", "Лазерна епіляція"],
  ["body-correction", "Корекція фігури"],
  ["weight-management", "Програми зниження ваги"],
] as const;

export const serviceCategories: ServiceCategory[] = categories.map(([slug, title]) => ({
  id: slug,
  slug,
  title,
  isPublished: false,
}));

export const procedures: Procedure[] = [];

export const pricingCategories: PriceCategory[] = [
  ["consultations", "Консультації"],
  ["aesthetic-care", "Естетичні та доглядові процедури"],
  ["hardware", "Апаратна косметологія"],
  ["injections", "Ін’єкційна косметологія"],
  ["dermatology-removal", "Дерматологія та видалення"],
  ["trichology", "Трихологія"],
  ["laser-hair-removal", "Лазерна епіляція"],
  ["body-correction", "Корекція фігури"],
  ["weight-management", "Програми зниження ваги"],
  ["iv-therapy", "Крапельниці"],
].map(([id, title], sortOrder) => ({ id, title, sortOrder, isPublished: true }));

const subcategoryData = [
  ["consultations", "consultation", "Консультація"],
  ["aesthetic-care", "cleansing", "Чистки"],
  ["aesthetic-care", "is-clinical-care", "Догляди iS Clinical"],
  ["aesthetic-care", "face-massage", "Масаж обличчя"],
  ["aesthetic-care", "peels", "Пілінги"],
  ["aesthetic-care", "carboxy-enzyme", "Карбоксітерапія та ферментотерапія"],
  ["hardware", "hydrofacial", "HydroFacial"],
  ["hardware", "oxygen-mesotherapy", "Киснева мезотерапія"],
  ["hardware", "rf-lifting", "RF-ліфтинг"],
  ["hardware", "ipl", "IPL-терапія"],
  ["hardware", "microneedle-rf", "Мікроголковий RF-ліфтинг"],
  ["hardware", "microcurrent", "Мікрострумова терапія"],
  ["hardware", "microdermabrasion", "Алмазна мікродермабразія"],
  ["hardware", "carbon-peel", "Карбоновий пілінг"],
  ["hardware", "smas-face", "SMAS-ліфтинг"],
  ["injections", "biorevitalization", "Біоревіталізація і біорепарація"],
  ["injections", "polynucleotides", "Препарати з полінуклеотидами"],
  ["injections", "eye-mesotherapy", "Мезотерапія і біорепарація очей"],
  ["injections", "lip-contouring", "Контурна пластика губ"],
  ["injections", "face-contouring", "Контурна пластика обличчя"],
  ["injections", "botulinum", "Ботулінотерапія"],
  ["injections", "plasma", "Плазмотерапія"],
  ["injections", "collagen", "Колагенотерапія"],
  ["injections", "exosomes", "Екзосоми"],
  ["injections", "lipolytics", "Ліполітики і ферменти"],
  ["injections", "polylactic-juvelook", "Полімолочна кислота - Juvelook"],
  ["injections", "polylactic-lenisna", "Полімолочна кислота - Lenisna"],
  ["dermatology-removal", "papilloma-removal", "Видалення папілом"],
  ["dermatology-removal", "tattoo-removal", "Видалення татуажу і татуювань"],
  ["trichology", "hair-mesotherapy", "Мезотерапія волосся"],
  ["laser-hair-removal", "laser-packages", "Комплекси"],
  ["laser-hair-removal", "laser-zones", "Окремі зони"],
  ["body-correction", "liposonix", "SMAS-ліфтинг Liposonix"],
  ["weight-management", "biopatid-programs", "Програми Biopatid"],
  ["weight-management", "biopatid-dosages", "Biopatid"],
  ["iv-therapy", "drips", "Крапельниці"],
] as const;

export const pricingSubcategories: PriceSubcategory[] = subcategoryData.map(
  ([categoryId, id, title], sortOrder) => ({ id, categoryId, title, sortOrder, isPublished: true }),
);

const concernTitles = [
  ["acne-post-acne", "Акне та постакне"],
  ["pigmentation", "Пігментація"],
  ["redness-vessels", "Почервоніння та судини"],
  ["dullness-skin-quality", "Тьмяність та якість шкіри"],
  ["wrinkles-loss-of-tone", "Зморшки та втрата тонусу"],
  ["facial-contours", "Контури обличчя"],
  ["hair-loss", "Випадіння волосся"],
  ["unwanted-hair", "Небажане волосся"],
  ["body-correction", "Корекція фігури"],
  ["weight-management", "Зниження ваги"],
  ["hyperhidrosis", "Гіпергідроз"],
  ["not-sure", "Не впевнені, з чого почати"],
] as const;

export const concernRecords: Concern[] = concernTitles.map(([slug, title]) => ({
  id: slug,
  slug,
  title,
  description: null,
  recommendedProcedureIds: [],
  isPublished: false,
}));
