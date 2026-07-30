import type { Price, PriceOption } from "./types";

type PriceSeed = Partial<Omit<Price, "id" | "categoryId" | "subcategoryId" | "sourceImage" | "sourceSection" | "sortOrder" | "isPublished">> & {
  service: string;
};

const rows: Price[] = [];
let order = 0;

const f = (service: string, currentPrice: number, extra: PriceSeed = { service }) => ({ ...extra, service, currentPrice });
const m = (service: string, headDoctorPrice: number, doctorPrice: number, extra: PriceSeed = { service }) => ({ ...extra, service, headDoctorPrice, doctorPrice, doctorLevel: "both" as const });
const o = (service: string, priceOptions: PriceOption[], extra: PriceSeed = { service }) => ({ ...extra, service, priceOptions });
const option = (label: string, values: Partial<PriceOption>): PriceOption => ({
  label,
  currentPrice: null,
  originalPrice: null,
  headDoctorPrice: null,
  doctorPrice: null,
  ...values,
});

function add(categoryId: string, subcategoryId: string, sourceImage: string, sourceSection: string, seeds: PriceSeed[]) {
  for (const seed of seeds) {
    order += 1;
    rows.push({
      id: `price-${String(order).padStart(3, "0")}`,
      categoryId,
      subcategoryId,
      procedureId: null,
      sourceTitle: seed.sourceTitle ?? seed.service,
      normalizedTitle: seed.normalizedTitle ?? null,
      service: seed.service,
      variant: seed.variant ?? null,
      area: seed.area ?? null,
      product: seed.product ?? null,
      volume: seed.volume ?? null,
      dosage: seed.dosage ?? null,
      duration: seed.duration ?? null,
      unit: seed.unit ?? null,
      doctorLevel: seed.doctorLevel ?? null,
      headDoctorPrice: seed.headDoctorPrice ?? null,
      headDoctorPriceMax: seed.headDoctorPriceMax ?? null,
      doctorPrice: seed.doctorPrice ?? null,
      doctorPriceMax: seed.doctorPriceMax ?? null,
      currentPrice: seed.currentPrice ?? null,
      currentPriceMax: seed.currentPriceMax ?? null,
      originalPrice: seed.originalPrice ?? null,
      currency: seed.currency ?? "UAH",
      priceType: seed.priceType ?? "fixed",
      package: seed.package ?? false,
      description: seed.description ?? null,
      note: seed.note ?? null,
      included: seed.included ?? [],
      tags: seed.tags ?? [],
      searchTerms: seed.searchTerms ?? [],
      sortOrder: order,
      sourceImage,
      sourceSection,
      priceOptions: seed.priceOptions ?? [],
      isPublished: seed.isPublished ?? true,
    });
  }
}

add("consultations", "consultation", "01_IMAGE 2026-07-11 14:51:10.jpg", "Консультація", [
  m("Консультація лікаря-косметолога", 1800, 1000),
]);

add("aesthetic-care", "cleansing", "01_IMAGE 2026-07-11 14:51:10.jpg", "Чистки обличчя", [
  f("Японська комбінована чистка обличчя DEMAX", 1800, { service: "", note: "Включає маску по типу шкіри" }),
  f("Атравматична чистка обличчя ZEIN OBAGI", 2000, { service: "", note: "Виконується в 9 етапів; включає фірмовий пілінг ZO" }),
  f("Комбінована чистка обличчя ZEIN OBAGI", 2500, { service: "", note: "Виконується в 11 етапів; включає фірмовий пілінг ZO" }),
  f("Комбінована чистка обличчя iS Clinical", 3000, { service: "", note: "З фірмовим доглядом «Вогонь та Лід» або «Шовково-Медовим» доглядом" }),
  f("Комбінована чистка спини DEMAX", 2500),
  f("Комбінована чистка спини ZEIN OBAGI", 3500),
]);

add("hardware", "hydrofacial", "02_IMAGE 2026-07-11 14:51:13.jpg", "HydroFacial", [
  f("Класична HydroFacial", 2500, { service: "", note: "З сироватками по типу шкіри" }),
  f("HydroFacial 6в1", 3000, { service: "", included: ["HydroFacial", "Киснева апаратна мезотерапія (безін’єкційна)", "RF-ліфтинг", "Кріотерапія", "Фонофорез"] }),
]);

add("hardware", "oxygen-mesotherapy", "02_IMAGE 2026-07-11 14:51:13.jpg", "Киснева мезотерапія", [
  ...[["Очі",1000],["Очі + обличчя",1500],["Шия",1000],["Декольте",1000],["Очі + обличчя + шия",2000],["Очі + обличчя + шия + декольте",2400],["Живіт",1500],["Коліна",1500]].map(([area, price]) => f("Киснева мезотерапія", price as number, { service: "", area: area as string, note: "Безін’єкційна з сироватками під тип шкіри" })),
]);

add("trichology", "hair-mesotherapy", "02_IMAGE 2026-07-11 14:51:13.jpg", "Киснева мезотерапія", [
  f("Мезотерапія волосся", 1500, { service: "", note: "Киснева мезотерапія" }),
]);

add("hardware", "rf-lifting", "03_IMAGE 2026-07-11 14:51:14.jpg", "RF-ліфтинг / RF-ліфтинг + кріотерапія / фонофорез / кріотерапія", [
  ...[["1 зона",1000],["2 зони",1500],["3 зони",1800]].map(([area, price]) => f("RF-ліфтинг", price as number, { service: "", area: area as string, description: "Стимуляція колагену, омолодження" })),
  ...[["1 зона",1500],["2 зони",1800],["3 зони",2200]].map(([area, price]) => f("RF-ліфтинг + кріотерапія", price as number, { service: "", area: area as string, description: "Ліфтинг, стимуляція колагену, омолодження, зменшення набряків" })),
  f("Фонофорез", 900, { service: "", area: "1 зона", description: "Введення в шкіру активних компонентів" }),
  f("Кріотерапія", 600, { service: "", area: "1 зона", description: "Зменшення набряку та почервоніння шкіри" }),
]);

add("aesthetic-care", "is-clinical-care", "04_IMAGE 2026-07-11 14:51:16.jpg", "Догляди iS Clinical", [
  ...[["Догляд «Вогонь та Лід»","Обличчя",2300],["Догляд «Вогонь та Лід»","Обличчя + шия",3500],["Догляд «Вогонь та Лід»","Обличчя + шия + декольте",4000],["«Шовково-Медовий» догляд","Обличчя",2300],["«Шовково-Медовий» догляд","Обличчя + шия",3500],["«Шовково-Медовий» догляд","Обличчя + шия + декольте",4000],["Пінний ферментативний догляд","Обличчя",2600],["Пінний ферментативний догляд","Обличчя + шия",3800],["Пінний ферментативний догляд","Обличчя + шия + декольте",4200]].map(([service, area, price]) => f(service as string, price as number, { service: "", area: area as string })),
]);

add("aesthetic-care", "face-massage", "04_IMAGE 2026-07-11 14:51:16.jpg", "Масаж обличчя", [
  f("Масаж обличчя", 1000, { service: "", duration: "30 хвилин" }),
  f("Масаж обличчя", 1200, { service: "", duration: "45 хвилин" }),
]);

add("aesthetic-care", "peels", "05_IMAGE 2026-07-11 14:51:18.jpg", "Пілінги", [
  ...[["Азелаїновий",1000],["Мигдальний з ДМАЕ",1000],["Відбілюючий",1000],["Молочний",1000],["Саліциловий",1000],["Феруловий",1000],["Ензимний",1000],["Гліколевий",1000],["LCAGE",1500],["Антивіковий",1000],["Білий пілінг з пептидами",1000],["Фітиновий",1000],["Зелений",1000],["Вишневий",1000],["Коєвий",1000],["Янтарний",1000],["Резорциновий",1000],["Джесснера",1000],["TCA",1000],["Жовтий",1800],["KEMIKUM",1500],["BIOREPEELCL3",1900],["PRX-T33",2000],["ZEIN OBAGI 3 STEP PEEL",1500],["Лавандовий",1000],["Транексамовий",1000],["Вітамін C 25%",1200],["Пілінг для очей/губ",1000],["INNOAESTHETICS",1500]].map(([service, price]) => f(service as string, price as number, { service: "", note: service === "Жовтий" ? "Ретиноловий" : service === "Лавандовий" ? "Для чутливої шкіри" : null })),
]);

add("aesthetic-care", "carboxy-enzyme", "06_IMAGE 2026-07-11 14:51:20.jpg", "Полінуклеотидна карбоксітерапія", [
  ...[["Обличчя",1500],["Обличчя + шия",2000],["Обличчя + шия + декольте",2500]].map(([area, price]) => f("Полінуклеотидна карбоксітерапія", price as number, { service: "", area: area as string })),
]);
add("aesthetic-care", "carboxy-enzyme", "06_IMAGE 2026-07-11 14:51:20.jpg", "Ферментотерапія", [
  ...[["Класична","Обличчя",1500],["Класична","Обличчя + шия",2000],["Класична","Обличчя + шия + декольте",2500],["Екзосомальна","Обличчя",2000],["Екзосомальна","Обличчя + шия",2500],["Екзосомальна","Обличчя + шия + декольте",3000]].map(([variant, area, price]) => f("Ферментотерапія", price as number, { service: "", variant: variant as string, area: area as string })),
]);

add("injections", "biorevitalization", "07_IMAGE 2026-07-11 14:51:21.jpg", "Біоревіталізація і біорепарація", [
  m("HYARON",3000,2500,{service:"",volume:"2.5ml",product:"HYARON"}),
  m("INFINI ACNECURE",3000,2500,{service:"",volume:"2ml",product:"INFINI ACNECURE"}),
  m("INFINI PREMIUM",3400,2900,{service:"",volume:"2.5ml",product:"INFINI PREMIUM"}),
  m("RRS LONG LASTING",6500,6000,{service:"",volume:"3ml",product:"RRS LONG LASTING"}),
  m("HYALUAL ELECTRI",4100,3600,{service:"",volume:"1.5ml",product:"HYALUAL ELECTRI"}),
  o("HYALUAL",[option("1ml",{headDoctorPrice:4100,doctorPrice:3900}),option("2ml",{headDoctorPrice:5100,doctorPrice:4900})],{service:"",headDoctorPrice:4100,doctorPrice:3900,doctorLevel:"both",volume:"1ml/2ml",product:"HYALUAL"}),
  m("JUVEDERM VOLITE",7100,6600,{service:"",volume:"1ml",product:"JUVEDERM VOLITE"}),
  o("SKIN RELAX",[option("1ml",{headDoctorPrice:3000,doctorPrice:2500}),option("2ml",{headDoctorPrice:3500,doctorPrice:3000}),option("3ml",{headDoctorPrice:4000,doctorPrice:3500})],{service:"",headDoctorPrice:3000,doctorPrice:2500,doctorLevel:"both",volume:"1/2/3ml",product:"SKIN RELAX"}),
  o("WHITENING",[option("1ml",{headDoctorPrice:3000,doctorPrice:2500}),option("2ml",{headDoctorPrice:3500,doctorPrice:3000}),option("3ml",{headDoctorPrice:4000,doctorPrice:3500})],{service:"",headDoctorPrice:3000,doctorPrice:2500,doctorLevel:"both",volume:"1/2/3ml",product:"WHITENING"}),
  o("HA NAD+NADP",[option("2ml",{headDoctorPrice:4000,doctorPrice:3500}),option("4ml",{headDoctorPrice:5400,doctorPrice:4900})],{service:"",headDoctorPrice:4000,doctorPrice:3500,doctorLevel:"both",volume:"2/4ml",product:"HA NAD+NADP"}),
  o("TENSOR LIFT",[option("2ml",{headDoctorPrice:3800,doctorPrice:3500}),option("4ml",{headDoctorPrice:5400,doctorPrice:4900})],{service:"",headDoctorPrice:3800,doctorPrice:3500,doctorLevel:"both",volume:"2/4ml",product:"TENSOR LIFT"}),
]);

add("injections", "polynucleotides", "08_IMAGE 2026-07-11 14:51:23.jpg", "Препарати з полінуклеотидами", [
  m("KIARA REJU",3500,3000,{service:"",volume:"2.2ml"}),
  o("MASTELLI PLINEST",[option("2ml",{headDoctorPrice:3300,doctorPrice:2800}),option("4ml",{headDoctorPrice:5000,doctorPrice:4500})],{service:"",headDoctorPrice:3300,doctorPrice:2800,doctorLevel:"both",volume:"2ml/4ml"}),
  o("SIMILDIET DNA3",[option("2ml",{headDoctorPrice:3800,doctorPrice:3300}),option("4ml",{headDoctorPrice:5000,doctorPrice:4500})],{service:"",headDoctorPrice:3800,doctorPrice:3300,doctorLevel:"both",volume:"2ml/4ml"}),
  o("INNOAESTHETICS",[option("2.5ml",{headDoctorPrice:3800,doctorPrice:3300}),option("5ml",{headDoctorPrice:5400,doctorPrice:4900})],{service:"",headDoctorPrice:3800,doctorPrice:3300,doctorLevel:"both",volume:"2.5/5ml"}),
  m("REJURAN S",4800,4300,{service:"",volume:"1ml"}),m("REJURAN HEALER",7000,6500,{service:"",volume:"2ml"}),m("REJURAN HB PLUS",6000,5500,{service:"",volume:"1ml"}),
  o("TWAC 2.0/3.0",[option("2.0",{headDoctorPrice:7000,doctorPrice:6500}),option("3.0",{headDoctorPrice:7500,doctorPrice:7000})],{service:"",headDoctorPrice:7000,doctorPrice:6500,doctorLevel:"both",volume:"3ml"}),
  m("VITARAN",4450,3950,{service:"",volume:"1ml"}),m("VITARAN",5850,5350,{service:"",volume:"2ml",variant:"2ml"}),m("VITARAN WHITENING",6250,5750,{service:"",volume:"2ml"}),m("VITARAN TOX COLLAGEN",6250,5750,{service:"",volume:"2ml"}),
]);

add("injections", "eye-mesotherapy", "09_IMAGE 2026-07-11 14:51:25.jpg", "Мезотерапія і біорепарація очей", [
  ...[["DERMAHEAL EYEBAG","1.5 ml",3300,2800],["DERMAHEAL DARK CIRCLE","1.5 ml",3300,2800],["INFINI PREMIUM","2ml",3300,2800],["RRS HA EYES","1.5 ml",3300,2800],["MASTELLI PLINEST","2ml",3300,2800],["HYALUAL ELECTRI","1.5 ml",4100,3600],["REJURAN I","1ml",4600,4100],["TWAC EYES","1ml",4900,4400],["MESO-EYE C71","1ml",6800,6300],["VITARAN","1ml",4450,3950],["VITARAN","2ml",5850,5350],["VITARAN TOX COLLAGEN","2ml",6250,5750]].map(([service,volume,h,d])=>m(service as string,h as number,d as number,{service:"",volume:volume as string,product:service as string})),
]);
add("trichology", "hair-mesotherapy", "09_IMAGE 2026-07-11 14:51:25.jpg", "Мезотерапія волосся", [
  ...[["DERMAHEAL HL",2100,1600],["RRS XL HAIR",2900,2400],["MASTELLI PLINEST",4000,3500],["DR.CYJ HAIR FILLER",4700,4200],["INNOAESTHETICS",2900,2400]].map(([service,h,d])=>m(service as string,h as number,d as number,{service:"",product:service as string})),
]);

add("injections", "lip-contouring", "10_IMAGE 2026-07-11 14:51:26.jpg", "Контурна пластика губ", [
  ...[["REVOLAX","1ml",5400,4900],["STYLAGE S","0.8ml",6500,6000],["STYLAGE M","1ml",7500,7000],["STYLAGE L","1ml",8000,7500],["STYLAGE SPECIAL LIPS","1ml",7600,7100],["STYLAGE LIPS PLUS","1ml",8000,7500],["JUVEDERM 2","0.6ml",5900,5400],["JUVEDERM 2","1.1ml",7100,6600],["JUVEDERM SMILE","0.6ml",6300,5800],["JUVEDERM VOLIFT","0.6ml",6700,6200],["JUVEDERM ULTRA 3","1ml",7500,7000],["JUVEDERM VOLIFT","1ml",8300,7800],["JUVEDERM VOLBELLA","1ml",8300,7800],["TEOSYAL KISS","0.7ml",7500,7000],["TEOSYAL RHA 3","1ml",8000,7500],["BELOTERO","0.6ml",8100,7600],["BELOTERO","1ml",9000,8500]].map(([service,volume,h,d])=>m(service as string,h as number,d as number,{service:"",volume:volume as string,product:service as string})),
  m("Розчинення філеру",3000,2500),m("Розчинення фіброзу",3000,2500),
]);

add("injections", "face-contouring", "11_IMAGE 2026-07-11 14:51:33.jpg", "Контурна пластика обличчя", [
  ...[["YOUTHFILL",4500],["REVOLAX SUB-Q",4900],["STYLAGE L",7000],["STYLAGE XL",7400],["STYLAGE XXL",7600],["JUVEDERM ULTRA 4",7000],["JUVEDERM VOLUMA",8000],["JUVEDERM VOLUX",8200],["BELOTERO VOLUME",7700],["TEOSYAL",7500]].map(([service,price])=>f(service as string,price as number,{service:"",volume:"1ml",note:"Носогубні складки, вилиці, середня третина обличчя, кути нижньої щелепи, підборіддя і т.д."})),
]);
add("injections", "face-contouring", "11_IMAGE 2026-07-11 14:51:33.jpg", "Носослізна борозна", [
  f("NEURAMIS LIGHT",5000,{service:"",volume:"1ml"}),f("STYLAGE S",6300,{service:"",volume:"0.8ml"}),
  o("BELOTERO SOFT/BALANCE",[option("SOFT",{currentPrice:7000}),option("BALANCE",{currentPrice:7500})],{service:"",currentPrice:7000,volume:"1ml"}),
  f("TEOSYAL REDENSITY 2",7800,{service:"",volume:"1ml"}),
]);
add("injections", "face-contouring", "11_IMAGE 2026-07-11 14:51:33.jpg", "Бланшинг", [
  m("NEURAMIS LIGHT",5000,4500,{service:"",volume:"1ml"}),m("STYLAGE S",6300,5800,{service:"",volume:"0.8ml"}),
  o("BELOTERO SOFT/BALANCE",[option("SOFT",{headDoctorPrice:7000,doctorPrice:6500}),option("BALANCE",{headDoctorPrice:7500,doctorPrice:7000})],{service:"",headDoctorPrice:7000,doctorPrice:6500,doctorLevel:"both",volume:"1ml"}),
]);

const botoxAreas = [
  ["Лоб + міжбрів’я",4500,5500,4000,5000],["Лоб + міжбрів’я + очі",5500,7500,5000,7000],["Очі",2500,3000,2000,2500],["Міжбрів’я",2500,3000,2000,2500],["Ліфтинг брів",1500,1700,1000,1500],["Ліфтинг лоба",2000,2200,1500,2000],["Ніс",1500,2000,1000,1500],["Гінгівальна посмішка",2000,2500,1500,2000],["Кисетні зморшки",1800,2000,1500,1800],["Верхня губа",2000,2500,1500,2000],["ДАО",2000,2200,1800,2000],["Підборіддя",2000,2200,1500,2000],["Платизма",5000,7500,4500,7000],["Масетер",3500,4500,3000,4000],["Корекція гіпергідрозу",7000,9000,6500,8500],["Корекція мігрені",7000,9000,6500,8500],["Корекція розацеа",4500,6000,3800,5500],
] as const;
add("injections", "botulinum", "12_IMAGE 2026-07-11 14:51:36.jpg", "Ботулінотерапія", botoxAreas.map(([service,hRentox,hOther,dRentox,dOther]) => o(service,[option("RENTOX",{headDoctorPrice:hRentox,doctorPrice:dRentox}),option("NEURONOX / BOTOX / XEOMIN / DYSPORT / NABOTA",{headDoctorPrice:hOther,doctorPrice:dOther})],{service:"",headDoctorPrice:hRentox,doctorPrice:dRentox,doctorLevel:"both"})));

add("injections", "plasma", "13_IMAGE 2026-07-11 14:51:38.jpg", "Плазмотерапія", [
  ...[["Волосся/брови",2500,2000],["Плазма + мезотерапія",3000,2500],["Обличчя/шия/декольте",3000,2500],["Обличчя + шия",4000,3500],["Обличчя + шия + декольте",5000,4500],["Спина",4000,3500],["Очі",2500,2000],["Кисті рук",3000,2500],["Шрами по тілу",3500,3000],["Живіт",3500,3000]].map(([area,h,d])=>m("Плазмотерапія",h as number,d as number,{service:"",area:area as string})),
]);
add("injections", "collagen", "13_IMAGE 2026-07-11 14:51:38.jpg", "Колагенотерапія", [m("KARISMA",8500,8000,{service:"",volume:"2ml"})]);
add("injections", "exosomes", "13_IMAGE 2026-07-11 14:51:38.jpg", "Екзосоми", [
  ...[["EXOS ANTI-AGING","5ml",6900,6400],["EXO-SKIN","2ml",7500,7000],["EXOXE","5ml",10000,9500],["ASCE+","5ml",13000,12500]].map(([service,volume,h,d])=>m(service as string,h as number,d as number,{service:"",volume:volume as string})),
]);

add("injections", "lipolytics", "14_IMAGE 2026-07-11 14:51:42.jpg", "Ліполітики і ферменти", [
  ...[["LIPO LAB","Тіло",2300,1800],["RRS DERMASTABILON","Тіло",2500,2000],["RRS CELLUTRIX","Тіло",2500,2000],["INNOAESTHETICS","Тіло",2500,2000],["PDNA-DRAIN","Тіло",2300,1800],["SMART4DERMA","Тіло",2300,1800],["SMART4DERMA","Від стрий (розтяжок)",2300,1800],["SIMILDIET","Від стрий (розтяжок)",3400,2900],["LIPO LAB V-LINE PREMIUM","Обличчя",2500,2000],["INNOAESTHETICS FACE NADE","Обличчя",2500,2000],["RRS CELLUTRIX","Обличчя",2500,2000],["PDNA-DRAIN","Обличчя",2500,2000],["SMART4DERMA","Обличчя",2500,2000],["Ліпаза","Ферменти",3000,2500],["Тріада","Ферменти",6000,5500],["PB SERUM HA-LOW","Виконуються 1 раз",8000,7500],["PB SERUM HA-MEDIUM","Виконуються 1 раз",8500,8000],["PB SERUM HA-HIGH","Виконуються 1 раз",9000,8500]].map(([service,area,h,d])=>m(service as string,h as number,d as number,{service:"",area:area as string,volume:service === "SMART4DERMA" && area === "Від стрий (розтяжок)" ? "5ml" : service === "SIMILDIET" ? "5ml" : null,note: area === "Ферменти" && service === "Тріада" ? "На декілька зон" : area === "Виконуються 1 раз" ? "Вартість вказана за зону" : null})),
]);

add("injections", "polylactic-juvelook", "15_IMAGE 2026-07-11 14:51:44.jpg", "Полімолочна кислота - Juvelook", [
  ...[["Очі",200,200],["Обличчя",550,350],["Шия",550,350],["Декольте",550,350],["Підщелепна зона",250,150],["Живіт",500,400],["Коліна",400,300],["Передпліччя",450,350],["Передпліччя повністю",550,450],["Стегна",550,450],["Стегна повністю",650,550],["Очі + обличчя",600,450],["Очі + обличчя + шия",800,550],["Очі + обличчя + шия + декольте",1000,700]].map(([area,h,d])=>m("JUVELOOK",h as number,d as number,{service:"",area:area as string,currency:"EUR",note:area === "Підщелепна зона" ? "Підборіддя" : area === "Передпліччя" ? "Передня/задня частина" : area === "Стегна" ? "Передня/задня частина" : null,package:(area as string).includes("+")})),
  { service:"JUVELOOK", area:"Рубці/стрії", doctorLevel:"both", headDoctorPrice:200, headDoctorPriceMax:550, doctorPrice:100, doctorPriceMax:450, currency:"EUR", priceType:"from", note:"В залежності від площі" },
  { service:"JUVELOOK - інші зони", area:"Інші зони", currency:"EUR", priceType:"on_request", note:"Будь-які інші зони уточнюйте" },
]);

add("injections", "polylactic-lenisna", "16_IMAGE 2026-07-11 14:51:47.jpg", "Полімолочна кислота - Lenisna", [
  ...[["Обличчя",600],["Шия",600],["Декольте",550],["Живіт",600],["Кисті рук",450],["Груди",600],["Сідниці",600],["Коліна",550],["2 зони",800],["3 зони",900],["4 зони",1000]].map(([area,price])=>f("LENISNA",price as number,{service:"",area:area as string,currency:"EUR",doctorLevel:"chief_doctor",note:area === "Обличчя" ? "Повний векторний ліфтинг середньої та нижньої третин обличчя" : null,package:(area as string).includes("зони")})),
  { service:"LENISNA - інші зони", area:"Інші зони", currency:"EUR", priceType:"on_request", doctorLevel:"chief_doctor", note:"Будь-які інші зони уточнюйте" },
]);

add("iv-therapy", "drips", "17_IMAGE 2026-07-11 14:51:49.jpg", "Крапельниці", [
  f("Попелюшка",4500),f("Попелюшка+",6000),
  o("NAD+",[option("200 мг",{currentPrice:9000}),option("500 мг",{currentPrice:12500}),option("1000 мг",{currentPrice:16000})],{service:"",currentPrice:9000,dosage:"200/500/1000 мг"}),
  f("Коктейль Майєрса",4500),f("Коктейль Майєрса + детокс",5100),f("ANTI-AGE",5500),f("Імунна",5800),f("Відновлююча",4100),f("ENERGY BOOST",4100),f("Пост COVID",5600),f("AFTER PARTY",5500),f("ANTI-STRESS",4500),f("Детокс печінки",4500),
  o("Біотин",[option("5 мг",{currentPrice:2950}),option("10 мг",{currentPrice:3500}),option("15 мг",{currentPrice:4000}),option("20 мг",{currentPrice:4500})],{service:"",currentPrice:2950,dosage:"5/10/15/20 мг"}),
  f("LAENNEC",3800),f("MELSMON",3800),f("L-ARGINEX SKINNY DRIP",3800,{service:"",note:"Для зменшення ваги"}),
]);

add("hardware", "ipl", "20_IMAGE 2026-07-11 14:51:56.jpg", "IPL-терапія", [
  ...[["Видалення куперозу","Обличчя",2500],["Видалення куперозу","Крила носу",1000],["Видалення куперозу","Шия",2500],["Видалення куперозу","Декольте",2500],["Видалення пігментації","Обличчя",2500],["Видалення пігментації","Шия",2500],["Видалення пігментації","Декольте",2500],["Лікування акне","Обличчя",2500],["Лікування акне","Шия",2500],["Лікування акне","Декольте",2500],["Лікування акне","Спина",3000],["Фотоомолодження","Обличчя",2500],["Фотоомолодження","Обличчя + шия",3000],["Фотоомолодження","Обличчя + шия + декольте",3500],["Лікування гематом","Обличчя повністю / шия / декольте",2500],["Лікування гематом","1 маленька гематома",500],["Лікування гематом","1 велика гематома",1000]].map(([service,area,price])=>f(service as string,price as number,{service:"",area:area as string})),
]);

add("hardware", "microneedle-rf", "21_IMAGE 2026-07-11 14:54:32.jpg", "Мікроголковий RF-ліфтинг", [
  ...[["Малярні мішки",3000],["Очі",3000],["Підщелепна зона",3000],["Обличчя повністю",4000],["Шия",3500],["Декольте",3500],["Глибоке декольте",4000],["Груди",4500],["Обличчя + шия",6000],["Обличчя + шия + декольте",7000],["Кисті рук",3000],["Живіт",4500],["Стегна частково",6000],["Стегна повністю",9000],["Бікіні",4500],["Коліна",4000],["Сідниці",5000],["Передпліччя частково",4500],["Передпліччя повністю",6500],["Руки повністю",8000],["Пахви",3500],["Гіпергідроз",3500]].map(([area,price])=>f("Мікроголковий RF-ліфтинг",price as number,{service:"",area:area as string,note:["Малярні мішки","Очі","Підщелепна зона"].includes(area as string)?"Окремо":area === "Передпліччя частково"?"Внутрішня/зовнішня частина":null})),
]);

add("hardware", "microcurrent", "22_IMAGE 2026-07-11 14:54:35.jpg", "Мікрострумова терапія", [
  f("Мікрострумова терапія",600,{service:"",duration:"15 хвилин"}),f("Мікрострумова терапія",1200,{service:"",duration:"30 хвилин"}),f("Мікрострумова терапія",1800,{service:"",duration:"45 хвилин"}),
]);
add("hardware", "microdermabrasion", "22_IMAGE 2026-07-11 14:54:35.jpg", "Алмазна мікродермабразія", [
  f("Алмазна мікродермабразія",1500,{service:"",area:"Обличчя / декольте",note:"Входить доглядова маска по типу шкіри"}),f("Алмазна мікродермабразія",2500,{service:"",area:"Спина",note:"Входить доглядова маска по типу шкіри"}),
]);
add("hardware", "carbon-peel", "22_IMAGE 2026-07-11 14:54:35.jpg", "Карбоновий пілінг", [
  f("Карбоновий пілінг",1500,{service:"",area:"Обличчя"}),f("Карбоновий пілінг",1500,{service:"",area:"Декольте"}),f("Карбоновий пілінг",2500,{service:"",area:"Спина"}),
]);

add("hardware", "smas-face", "23_IMAGE 2026-07-11 14:54:36.jpg", "SMAS-ліфтинг", [
  f("Обличчя повністю",15000,{service:"",variant:"Без підщелепної зони"}),f("Обличчя повністю",17000,{service:"",variant:"З підщелепною зоною"}),f("Малярні мішки",5000),f("Верхня третина обличчя",5000),f("Середня третина обличчя",6500),f("Нижня третина обличчя",6500),f("Середня + нижня третини обличчя",10000,{service:"",variant:"Без підщелепної зони"}),f("Середня + нижня третини обличчя",15000,{service:"",variant:"З підщелепною зоною"}),f("Нижня третина + підщелепна зона",11500),f("Підщелепна зона",6500,{service:"",note:"Зона підборіддя"}),f("Шия",6500),f("Декольте",6500),f("Шия + декольте",10000),
]);

add("body-correction", "liposonix", "24_IMAGE 2026-07-11 14:54:38.jpg", "SMAS-ліфтинг Liposonix", [
  ...[["Живіт",9000],["Бока",7500],["Живіт + бока",14000],["Руки",7500],["Руки повністю",10000],["Стегна",8000],["Стегна",8000],["Стегна повністю",15000],["Сідниці",8000],["Стегна повністю + сідниці",20000],["Ікри",7500],["Коліна",7500]].map(([area,price],index)=>f("SMAS-ліфтинг Liposonix",price as number,{service:"",area:area as string,note:area === "Руки"?"Внутрішня/зовнішня поверхня":area === "Стегна"?(index===5?"Внутрішня/зовнішня поверхня":"Задня/передня поверхня"):null})),
]);

add("dermatology-removal", "papilloma-removal", "25_IMAGE 2026-07-11 14:54:39.jpg", "Видалення папілом", [
  f("Видалення папілом",250,{service:"",variant:"1 одиниця",unit:"одиниця"}),f("Видалення папілом",1000,{service:"",variant:"10 одиниць"}),f("Видалення папілом",2250,{service:"",variant:"15 одиниць"}),{service:"Видалення папілом",variant:"Від 15 одиниць",currentPrice:150,priceType:"from",unit:"грн/шт"},
]);
add("dermatology-removal", "tattoo-removal", "25_IMAGE 2026-07-11 14:54:39.jpg", "Видалення татуажу і татуювань", [
  f("Татуаж брів",1000,{service:"",note:"Вартість вказана за 1 сеанс"}),f("Татуаж губ",1000,{service:"",note:"Вартість вказана за 1 сеанс"}),f("Татуаж повік",1000,{service:"",area:"Верх/низ",note:"Вартість вказана за 1 сеанс"}),f("Татуаж повік",1800,{service:"",area:"Верх + низ",note:"Вартість вказана за 1 сеанс"}),f("Видалення татуювання",250,{service:"",area:"1 см³",unit:"1 см³",note:"Розрахувати приблизну вартість можна по фото; вартість вказана за 1 сеанс"}),
]);

add("laser-hair-removal", "laser-packages", "26_IMAGE 2026-07-11 14:54:41.jpg", "Лазерна епіляція - комплекси", [
  {service:"Пакет 1",package:true,originalPrice:1350,currentPrice:1000,included:["Пахви","Глибоке бікіні","Маленька зона на вибір"]},
  {service:"Пакет 2",package:true,originalPrice:2050,currentPrice:1600,included:["Пахви","Глибоке бікіні","Гомілки","Маленька зона на вибір"]},
  {service:"Пакет 3",package:true,originalPrice:2750,currentPrice:2100,included:["Пахви","Глибоке бікіні","Ноги повністю","Маленька зона на вибір"]},
  {service:"Пакет 4",package:true,originalPrice:3200,currentPrice:2500,included:["Пахви","Глибоке бікіні","Ноги повністю","Руки до ліктя","Маленька зона на вибір"]},
  {service:"Пакет 5",package:true,originalPrice:3550,currentPrice:2900,included:["Пахви","Глибоке бікіні","Ноги повністю","Руки повністю","Маленька зона на вибір"]},
  {service:"Пакет 6",package:true,currentPrice:3900,included:["Будь-які зони на вибір, без обмежень"]},
]);

add("laser-hair-removal", "laser-zones", "27_IMAGE 2026-07-11 14:54:42.jpg", "Лазерна епіляція", [
  ...[["Обличчя повністю",800,"Обличчя"],["Шия",400,"Обличчя"],["Передня поверхня шиї",350,"Обличчя"],["Верхня губа",250,"Обличчя"],["Бакенбарди",250,"Обличчя"],["Міжбрів’я",250,"Обличчя"],["Підборіддя",250,"Обличчя"],["Щоки",300,"Обличчя"],["Лоб",250,"Обличчя"],["Пахви",550,"Руки"],["Руки до ліктя",450,"Руки"],["Руки повністю",800,"Руки"],["Кисті рук/пальці",250,"Руки"],["Декольте",350,"Тіло"],["Ареоли молочних залоз",300,"Тіло"],["Груди",550,"Тіло"],["Живіт",700,"Тіло"],["Біла лінія живота",200,"Тіло"],["Спина",700,"Тіло"],["Плечі",400,"Тіло"],["Поперек",400,"Тіло"]].map(([area,price,variant])=>f("Лазерна епіляція",price as number,{service:"",area:area as string,variant:variant as string})),
]);
add("laser-hair-removal", "laser-zones", "28_IMAGE 2026-07-11 14:54:44.jpg", "Лазерна епіляція", [
  ...[["Бікіні до лінії трусиків",450,"Бікіні"],["Неглибоке бікіні",600,"Бікіні"],["Глибоке бікіні",800,"Бікіні"],["Бікіні екстра",450,"Бікіні"],["Лобок",400,"Бікіні"],["Статеві губи",350,"Бікіні"],["Сідниці",700,"Бікіні"],["Міжсіднична складка",400,"Бікіні"],["Гомілки",700,"Ноги"],["Стегна",800,"Ноги"],["Стегна частково",400,"Ноги"],["Ноги повністю",1400,"Ноги"],["Коліна",250,"Ноги"],["Пальці ніг",100,"Ноги"]].map(([area,price,variant])=>f("Лазерна епіляція",price as number,{service:"",area:area as string,variant:variant as string,note:area === "Бікіні екстра"?"Статеві губи та міжсіднична складка":null})),
]);

add("weight-management", "biopatid-programs", "29_IMAGE 2026-07-11 14:54:46.jpg", "Програми Biopatid", [
  {service:"Програма схуднення BASIC",sourceTitle:"Програма схуднення BASIC",package:true,currentPrice:35000,duration:"2 місяці",description:"Скидання ваги +/- 2-8 кг",included:["30 мг тирзепатиду [Biopatid]","3 консультації з лікарем","4 ліполітичні процедури"]},
  {service:"Програма схуднення STANDART",sourceTitle:"Програма схуднення STANDART",package:true,currentPrice:50000,duration:"3 місяці",description:"Скидання ваги +/- 5-11 кг",included:["60 мг тирзепатиду [Biopatid]","5 консультацій з лікарем","6 ліполітичних процедур"]},
  {service:"Програма схуднення PROFFESIONAL",sourceTitle:"Програма схуднення PROFFESIONAL",package:true,currentPrice:70000,duration:"5 місяців",description:"Скидання ваги +/- 10-25 кг",included:["90 мг тирзепатиду [Biopatid]","8 консультацій з лікарем","10 ліполітичних процедур"]},
]);

add("weight-management", "biopatid-dosages", "30_IMAGE 2026-07-11 14:54:50.jpg", "Biopatid", [
  ...[["2.5 мг",3000],["3 мг",3500],["3.5 мг",3900],["4 мг",4500],["4.5 мг",4900],["5 мг",5500],["5.5 мг",5900],["6 мг",6500],["6.5 мг",6900],["7 мг",7500],["7.5 мг",7900]].map(([dosage,price])=>f("Biopatid",price as number,{service:"",dosage:dosage as string})),
  {service:"Повний флакон препарату Biopatid",dosage:"60 мг",priceType:"on_request",note:"В оригінальній упаковці для індивідуального використання вдома; вартість повного флакону уточнюйте в direct"},
]);

export const pricing: Price[] = rows;
