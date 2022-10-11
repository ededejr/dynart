import type { NextApiRequest, NextApiResponse } from 'next'
import rateLimit from '../../../../utils/rate-limit'
import { Generators } from '../../../../utils/arte'
import { Resvg } from '@resvg/resvg-js';

const limiter = rateLimit({
  interval: 60 * 1000, // 60 seconds
  uniqueTokenPerInterval: 500, // Max 500 users per second
})

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await limiter.check(res, 10, 'CACHE_TOKEN') // 10 requests per minute
    const buffer = await generateRandomImage();
    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Cache-Control', 'public, max-age=60, s-maxage=60');
    res.status(200).send(buffer);
  } catch {
    res.status(429).json({ error: 'Rate limit exceeded' })
  }
}

async function generateRandomImage() {
  const generator = Generators.GradientsAndFlatColors;
  const svg = generator.generateString();
  const resvg = new Resvg(svg);
  const pngData = resvg.render();
  const buffer = pngData.asPng();
  return buffer;
}