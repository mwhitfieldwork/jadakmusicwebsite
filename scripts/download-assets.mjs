#!/usr/bin/env node
/**
 * Downloads every image currently hotlinked from images.squarespace-cdn.com
 * into src/assets/images, then rewrites src/app/core/site-content.ts so
 * those entries point at the local copies instead. Run this from a machine
 * with normal internet access (the site-building sandbox this project was
 * generated in couldn't reach that CDN):
 *
 *   npm run download-assets
 *
 * Safe to re-run — it overwrites the downloaded files and only replaces
 * URLs it finds, so it's a no-op the second time.
 */
import { mkdir, writeFile, readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const imagesDir = join(root, 'src/assets/images');
const contentFile = join(root, 'src/app/core/site-content.ts');

/** url -> local path (relative to src/assets/images) */
const ASSETS = {
  'https://images.squarespace-cdn.com/content/v1/68b665ba9b236f72ca2824c8/6e5922f6-59ef-4437-bce6-8085890ebea1/official_logo.png?format=1500w': 'brand/official-logo.png',
  'https://images.squarespace-cdn.com/content/68b665ba9b236f72ca2824c8/06c9c426-79e7-42a6-be7c-38c778dc00bb/official_logo_footer.png?content-type=image%2Fpng': 'brand/official-logo-footer.png',
  'https://images.squarespace-cdn.com/content/v1/68b665ba9b236f72ca2824c8/76a5facb-a0bf-4471-9df7-b24d2ac2267f/harp_header_small.png?format=1000w': 'home-harp-header.png',
  'https://images.squarespace-cdn.com/content/v1/68b665ba9b236f72ca2824c8/0d6895ae-1938-40d0-a1ee-25f68c17720d/official_homepage_logo.png?format=1000w': 'home-homepage-logo.png',
  'https://images.squarespace-cdn.com/content/v1/68b665ba9b236f72ca2824c8/8bd10149-7e33-4f2e-afec-72c719a1410e/IMG_0643.jpg?format=1000w': 'home-photo-1.jpg',
  'https://images.squarespace-cdn.com/content/v1/68b665ba9b236f72ca2824c8/7de6ea3b-5b87-4278-9e49-e7d3d6dec631/IMG_0640.jpg?format=750w': 'home-photo-2.jpg',
  'https://images.squarespace-cdn.com/content/68b665ba9b236f72ca2824c8/e47bea7f-060b-4a90-a45c-23246be2378f/1298747_instagram_brand_logo_social+media_icon.png?content-type=image%2Fpng': 'icons/instagram.png',
  'https://images.squarespace-cdn.com/content/68b665ba9b236f72ca2824c8/2dbcdf06-1577-4c4e-98ff-514395a8ce81/fb.png?content-type=image%2Fpng': 'icons/facebook.png',
  'https://images.squarespace-cdn.com/content/68b665ba9b236f72ca2824c8/e1671faa-3c33-45ca-96b8-69f7c8c7f2d3/4362958_tiktok_logo_social+media_icon.png?content-type=image%2Fpng': 'icons/tiktok.png',
  'https://images.squarespace-cdn.com/content/68b665ba9b236f72ca2824c8/6bf917ab-9ef9-401a-8162-77166b4f0632/317714_video_youtube_icon.png?content-type=image%2Fpng': 'icons/youtube.png',
  'https://images.squarespace-cdn.com/content/v1/68b665ba9b236f72ca2824c8/0cf2a2ee-fd80-4922-87fa-83e4a5e31543/1.jpg?format=500w': 'events/1.jpg',
  'https://images.squarespace-cdn.com/content/v1/68b665ba9b236f72ca2824c8/01e5acc8-4c23-4142-b1a5-6b228d4faadd/2.jpg?format=500w': 'events/2.jpg',
  'https://images.squarespace-cdn.com/content/v1/68b665ba9b236f72ca2824c8/f0c621cf-3205-4a05-a228-93cd035c3231/3.jpg?format=500w': 'events/3.jpg',
  'https://images.squarespace-cdn.com/content/v1/68b665ba9b236f72ca2824c8/3dde91d5-e20e-46a1-ae7f-df65d1f13b8e/6.jpg?format=500w': 'events/6.jpg',
  'https://images.squarespace-cdn.com/content/v1/68b665ba9b236f72ca2824c8/52a633fb-123c-4b45-9eb7-b555599ef980/8.jpg?format=500w': 'events/8.jpg',
  'https://images.squarespace-cdn.com/content/v1/68b665ba9b236f72ca2824c8/1758478269370-3PI5VQCS55LIS81TEWSE/9.jpg?format=500w': 'events/9.jpg',
  'https://images.squarespace-cdn.com/content/v1/68b665ba9b236f72ca2824c8/b3515269-305f-4df4-ac59-7473443c88dc/4.png?format=500w': 'events/4.png',
  'https://images.squarespace-cdn.com/content/v1/68b665ba9b236f72ca2824c8/2324db0d-62b8-43ed-8afc-3e4aff1b7036/7.jpg?format=500w': 'events/7.jpg',
  'https://images.squarespace-cdn.com/content/v1/68b665ba9b236f72ca2824c8/2214afad-08f0-4fe4-8113-5cc024e5b77c/5.jpg?format=500w': 'events/5.jpg',
  'https://images.squarespace-cdn.com/content/v1/68b665ba9b236f72ca2824c8/79cd5e13-4454-4618-a2ce-d7175584f811/image0.jpeg?format=500w': 'events/image0.jpeg',
  'https://images.squarespace-cdn.com/content/v1/68b665ba9b236f72ca2824c8/0ab6f1fa-5374-4710-8799-95e335dea858/image1.jpeg?format=500w': 'events/image1.jpeg',
  'https://images.squarespace-cdn.com/content/v1/68b665ba9b236f72ca2824c8/1758477766788-FF8VDYBWDZ9KS5NN3D8I/Jada%2BKosine.jpg?format=500w': 'events/jada-kosine.jpg',
};

async function download(url, destPath) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await mkdir(dirname(destPath), { recursive: true });
  await writeFile(destPath, buf);
  return buf.length;
}

async function main() {
  let content = await readFile(contentFile, 'utf8');
  let ok = 0;
  let failed = 0;

  for (const [url, relPath] of Object.entries(ASSETS)) {
    const destPath = join(imagesDir, relPath);
    const localRef = `assets/images/${relPath}`;
    try {
      const bytes = await download(url, destPath);
      console.log(`✓ ${relPath} (${(bytes / 1024).toFixed(0)} KB)`);
      ok += 1;
      if (content.includes(url)) {
        content = content.split(url).join(localRef);
      }
    } catch (err) {
      console.warn(`✗ ${relPath}: ${err.message}`);
      failed += 1;
    }
  }

  await writeFile(contentFile, content, 'utf8');
  console.log(`\nDownloaded ${ok}/${ok + failed} assets to src/assets/images.`);
  console.log('site-content.ts updated to reference the local copies.');
  if (failed > 0) {
    console.log('Some downloads failed — re-run this script once you have a network connection to images.squarespace-cdn.com.');
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
