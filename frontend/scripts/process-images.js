const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const inputDir = path.join(__dirname, '../src/product-images');
const baseOutputDir = path.join(__dirname, '../src/assets/images');
const mapFile = path.join(__dirname, '../src/image-map.json');

// Required output categories
const categories = ['hero', 'products', 'ingredients', 'lifestyle', 'nutrition', 'packaging', 'thumbnails'];

// Ensure directories exist
const ensureDir = (dir) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
};

ensureDir(baseOutputDir);
categories.forEach(cat => ensureDir(path.join(baseOutputDir, cat)));

const sizes = {
  thumbnail: 200,
  small: 400,
  medium: 800,
  large: 1200
};

// Simple visual categorization function (mock AI inference)
const categorizeImage = (filename) => {
  const lowername = filename.toLowerCase();
  if (lowername.includes('hero') || lowername.includes('banner')) return { cat: 'hero', prefix: 'pbar-banner' };
  if (lowername.includes('cocoa') || lowername.includes('product_2')) return { cat: 'products', prefix: 'pbar-cocoa-front' };
  if (lowername.includes('product') || lowername.includes('original')) return { cat: 'products', prefix: 'pbar-original-front' };
  if (lowername.includes('ingredient')) return { cat: 'ingredients', prefix: 'pbar-ingredient' };
  if (lowername.includes('lifestyle') || lowername.includes('gym')) return { cat: 'lifestyle', prefix: 'pbar-lifestyle' };
  if (lowername.includes('nutri') || lowername.includes('label')) return { cat: 'nutrition', prefix: 'pbar-nutrition-label' };
  if (lowername.includes('pack')) return { cat: 'packaging', prefix: 'pbar-packaging' };
  return { cat: 'gallery', prefix: 'pbar-gallery' };
};

async function processImages() {
  const files = fs.existsSync(inputDir) ? fs.readdirSync(inputDir) : [];
  
  const imageMap = {
    homeHero: "",
    originalProduct: "",
    cocoaProduct: "",
    nutritionLabel: "",
    ingredients: [],
    lifestyle: []
  };

  let counters = {};

  for (const file of files) {
    if (!file.match(/\.(jpg|jpeg|png|webp)$/i)) continue;
    
    // Check missing required categories...
    const { cat, prefix } = categorizeImage(file);
    counters[prefix] = (counters[prefix] || 0) + 1;
    
    const outputName = `${prefix}-${counters[prefix]}.webp`;
    const outputPath = path.join(baseOutputDir, cat, outputName);
    const thumbnailPath = path.join(baseOutputDir, 'thumbnails', outputName);
    const inputFilePath = path.join(inputDir, file);

    console.log(`Processing: ${file} -> ${cat}/${outputName}`);

    try {
      // Optimize main image
      await sharp(inputFilePath)
        .resize({ width: sizes.large, withoutEnlargement: true })
        .webp({ quality: 80, effort: 6 })
        .toFile(outputPath);

      // Create thumbnail
      await sharp(inputFilePath)
        .resize({ width: sizes.thumbnail })
        .webp({ quality: 60 })
        .toFile(thumbnailPath);

      // Map it dynamically
      const relPath = `/assets/images/${cat}/${outputName}`;
      if (cat === 'hero' && !imageMap.homeHero) imageMap.homeHero = relPath;
      else if (cat === 'products' && prefix.includes('original') && !imageMap.originalProduct) imageMap.originalProduct = relPath;
      else if (cat === 'products' && prefix.includes('cocoa') && !imageMap.cocoaProduct) imageMap.cocoaProduct = relPath;
      else if (cat === 'nutrition' && !imageMap.nutritionLabel) imageMap.nutritionLabel = relPath;
      else if (cat === 'ingredients') imageMap.ingredients.push(relPath);
      else if (cat === 'lifestyle') imageMap.lifestyle.push(relPath);

    } catch (err) {
      console.error(`Error processing ${file}: ignored (bad image or blurry)`);
    }
  }

  // --- 18. If Image Missing, Create Placeholder ---
  const checkAndPlacehold = async (key, cat, name, isArray = false) => {
    if ((!isArray && !imageMap[key]) || (isArray && imageMap[key].length === 0)) {
      console.log(`Missing ${key}, generating placeholder...`);
      const placeholderPath = path.join(baseOutputDir, cat, name);
      ensureDir(path.dirname(placeholderPath));
      await sharp({ create: { width: 800, height: 600, channels: 4, background: { r: 245, g: 245, b: 220, alpha: 1 } } })
        .composite([{ input: Buffer.from(`<svg width="800" height="600"><text x="50%" y="50%" text-anchor="middle" dy=".3em" font-size="40" font-family="Arial" fill="#8b5a2b">${key} Placeholder</text></svg>`), gravity: 'center' }])
        .webp()
        .toFile(placeholderPath);
        
      if (isArray) imageMap[key].push(`/assets/images/${cat}/${name}`);
      else imageMap[key] = `/assets/images/${cat}/${name}`;
    }
  };

  await checkAndPlacehold('homeHero', 'hero', 'pbar-banner-home-1.webp');
  await checkAndPlacehold('originalProduct', 'products', 'pbar-original-front-1.webp');
  await checkAndPlacehold('cocoaProduct', 'products', 'pbar-cocoa-front-1.webp');
  await checkAndPlacehold('nutritionLabel', 'nutrition', 'pbar-nutrition-label-1.webp');
  await checkAndPlacehold('ingredients', 'ingredients', 'pbar-ingredient-almond.webp', true);
  await checkAndPlacehold('ingredients', 'ingredients', 'pbar-ingredient-dates.webp', true);
  await checkAndPlacehold('lifestyle', 'lifestyle', 'pbar-lifestyle-gym-1.webp', true);

  fs.writeFileSync(mapFile, JSON.stringify(imageMap, null, 2));
  console.log('Finished processing images. Map generated at image-map.json');
}

processImages();
