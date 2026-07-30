export const specialistPlaceholders = [
  {
    id: "chief-doctor",
    role: "Головний лікар",
    image: "/images/founder-placeholder.webp",
    imageAlt: "Місце для погодженого портрета головного лікаря",
    note: "Ім’я, спеціалізація, освіта, фото.",
  },
  {
    id: "cosmetologist",
    role: "Лікар-косметолог",
    image: "/images/clinic-interior.webp",
    imageAlt: "Місце для погодженого портрета лікаря-косметолога",
    note: "Процедури та форма запису.",
  },
  {
    id: "dermatologist",
    role: "Лікар-дерматолог",
    image: "/images/technology.webp",
    imageAlt: "Місце для погодженого портрета лікаря-дерматолога",
    note: "Лише підтверджені кваліфікації.",
  },
] as const;

export const specialOffers = [
  {
    id: "new-client-24h",
    title: "Для нових клієнтів",
    value: "−10%",
    description: "Якщо ви наш новий клієнт, при записі протягом 24 годин у вас 10% знижка.",
    note: "Деталі та застосування пропозиції підтвердить адміністратор під час запису.",
  },
] as const;

export const expertVideos = [
  {
    id: "procedures",
    title: "Процедури",
    description: "Короткі пояснення лікаря про вибір процедур і послідовність протоколів.",
    youtubeId: null,
  },
  {
    id: "lipolytics",
    title: "Ліполітики",
    description: "Показання, обмеження та питання, які варто обговорити до процедури.",
    youtubeId: null,
  },
  {
    id: "biorevitalization",
    title: "Біоревіталізація",
    description: "Як лікар оцінює стан шкіри та підбирає персональний протокол.",
    youtubeId: null,
  },
  {
    id: "rf-lifting",
    title: "Мікроголковий RF-ліфтинг",
    description: "Що важливо знати про показання, відновлення та очікувану динаміку.",
    youtubeId: null,
  },
] as const;

export const reviewChannels = [
  {
    id: "instagram",
    title: "Instagram",
    text: "Тут з’являться погоджені відгуки клієнтів з Instagram.",
  },
  {
    id: "google",
    title: "Google",
    text: "Після підключення профілю додамо перевірені відгуки з Google.",
  },
  {
    id: "direct",
    title: "Особисті повідомлення",
    text: "Скріншоти приватних повідомлень публікуємо лише зі згоди автора.",
  },
] as const;
