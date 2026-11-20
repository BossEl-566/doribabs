
import path from "node:path";
import {
  readdir,
  mkdir,
  writeFile,
} from "node:fs/promises";

// ======================================================
// PATHS
// ======================================================

const root = process.cwd();

const imagesDirectory = path.join(
  root,
  "public",
  "images"
);

const outputDirectory = path.join(
  root,
  "src",
  "data"
);

const outputFile = path.join(
  outputDirectory,
  "school-gallery.generated.json"
);

// ======================================================
// CATEGORIES
// ======================================================

const CATEGORY_ORDER = [
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
];

function getCategory(filename) {
  const name = filename.toLowerCase();

  if (
    /^(school-building|sky-shot)/.test(name)
  ) {
    return "Campus";
  }

  if (
    /^(computer-lab|science-lab|exams-preparation)/.test(name)
  ) {
    return "Academics";
  }

  if (
    /^(6th-match|games-and-fun|playing)/.test(name)
  ) {
    return "Sports & Games";
  }

  if (
    /^(school-culture|random-students-acting)/.test(name)
  ) {
    return "Culture & Drama";
  }

  if (
    /^(school-cardet|regimental-band|group-of-regimental-band|full-band|band\.|trumpet-band|cardet-parade)/.test(
      name
    )
  ) {
    return "Cadets & Band";
  }

  if (
    /^(school-church|church-meeting|assembly)/.test(name)
  ) {
    return "Faith & Assembly";
  }

  if (
    /^(all-schools-awards|school-achievement|speech-and-prize|speech-by-head|student-holding-school-award|staffs-with-school-award|founder-with-hasband)/.test(
      name
    )
  ) {
    return "Awards & Events";
  }

  if (
    /^student-at-dinning-hall/.test(name)
  ) {
    return "Dining & Boarding";
  }

  if (
    /^old-student/.test(name)
  ) {
    return "Alumni";
  }

  return "School Life";
}

// ======================================================
// IMAGE LABELS
// ======================================================

function getTitle(filename) {
  const withoutExtension = filename.replace(
    /\.[^.]+$/,
    ""
  );

  return withoutExtension
    .replace(/[-_]+/g, " ")
    .replace(/([a-z])(\d)/g, "$1 $2")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b[a-z]/g, (letter) =>
      letter.toUpperCase()
    )
    .replace(/\bBorad\b/g, "Board")
    .replace(/\bCardet\b/g, "Cadet")
    .replace(/\bDinning\b/g, "Dining");
}

// ======================================================
// READ ALL IMAGES
// ======================================================

const files = await readdir(imagesDirectory, {
  withFileTypes: true,
});

const photos = files
  .filter((file) => file.isFile())
  .filter((file) =>
    /\.(jpg|jpeg|png|webp|avif)$/i.test(file.name)
  )
  // Do not treat branding files as gallery photos.
  .filter((file) =>
    !/logo/i.test(file.name)
  )
  .map((file) => {
    const title = getTitle(file.name);

    return {
      id: `local:${file.name}`,
      src: `/images/${encodeURIComponent(file.name)}`,
      title,
      alt: `${title} — Doribabs School Complex`,
      category: getCategory(file.name),
    };
  });

// ======================================================
// MIX CATEGORIES FOR A MORE VARIED GALLERY
// ======================================================

// Sort naturally within each category.
const groups = new Map();

for (const category of CATEGORY_ORDER) {
  groups.set(
    category,
    photos
      .filter((photo) => photo.category === category)
      .sort((a, b) =>
        a.title.localeCompare(b.title, "en", {
          numeric: true,
        })
      )
  );
}

// Interleave groups so "All Photos" includes
// different activities rather than one long block
// of computer-lab or award photographs.
const orderedPhotos = [];

let index = 0;
let hasMore = true;

while (hasMore) {
  hasMore = false;

  for (const category of CATEGORY_ORDER) {
    const group = groups.get(category) ?? [];

    if (index < group.length) {
      orderedPhotos.push(group[index]);
      hasMore = true;
    }
  }

  index += 1;
}

// ======================================================
// WRITE GENERATED JSON
// ======================================================

await mkdir(outputDirectory, {
  recursive: true,
});

await writeFile(
  outputFile,
  JSON.stringify(orderedPhotos, null, 2) + "\n",
  "utf8"
);

console.log(
  `Gallery catalogue generated: ${orderedPhotos.length} photographs`
);

for (const category of CATEGORY_ORDER) {
  const count =
    groups.get(category)?.length ?? 0;

  if (count > 0) {
    console.log(`  ${category}: ${count}`);
  }
}

console.log(`Saved to: ${outputFile}`);
