import { Hono } from 'hono';

// ----------------------------------------------------------------------------
// Serves product photos from the Cloudflare R2 bucket bound as PRODUCT_IMAGE.
//
//   GET /images/sakura-haze/main.jpg  →  R2 object key "sakura-haze/main.jpg"
//
// Upload files with the Cloudflare dashboard or:
//   npx wrangler r2 object put product-image/sakura-haze/main.jpg --file=./photo.jpg
// ----------------------------------------------------------------------------

const images = new Hono();

images.get('/*', async (c) => {
  try {
    const bucket = c.env.PRODUCT_IMAGE;
    if (!bucket) {
      return c.json({ error: 'Image storage is not configured (missing R2 binding)' }, 503);
    }

    const pathname = new URL(c.req.url).pathname;
    const key = decodeURIComponent(pathname.replace(/^\/images\/?/, ''));

    if (!key) {
      return c.json({ error: 'Image key is required' }, 400);
    }

    const object = await bucket.get(key);
    if (!object) {
      return c.json({ error: 'Image not found' }, 404);
    }

    const headers = new Headers();
    object.writeHttpMetadata(headers);
    headers.set('ETag', object.httpEtag);
    headers.set('Cache-Control', 'public, max-age=86400');

    return new Response(object.body, { status: 200, headers });
  } catch (error) {
    console.error('Unable to load R2 image:', error);
    return c.json({ error: 'Unable to load image' }, 500);
  }
});

export default images;
