
export type GalleryPhoto = {
  id: string;
  src: string;
  title: string;
  alt: string;
  category: string;
};

export const GALLERY_CATEGORY_ORDER = [
  "Campus",
  "Academics",
  "School Life",
  "Sports & Games",
  "Culture & Drama",
  "Cadets & Band",
  "Faith & Assembly",
  "Awards & Events",
  "Dining & Boarding",
  "Alumni",
  "CMS Gallery",
] as const;
