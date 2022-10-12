import type { NextApiRequest, NextApiResponse } from 'next'
import rateLimit from './rate-limit'
import { Generators } from './arte'
import { Resvg } from '@resvg/resvg-js';

export default class StaticGeneratorRoute {
  private generatorKey: keyof typeof Generators;
  private limiter = rateLimit({
    interval: 60 * 1000, // 60 seconds
    uniqueTokenPerInterval: 500, // Max 500 users per second
  })

  constructor(generatorKey: keyof typeof Generators) {
    this.generatorKey = generatorKey;
  }

  public handler = async(
    _req: NextApiRequest,
    res: NextApiResponse
  ) => {
    console.log(`[API] Generating "${this.generatorKey}"...`);
    try {
      if (process.env.NODE_ENV !== 'development') {
        await this.limiter.check(res, 10, 'CACHE_TOKEN') // 10 requests per minute
      }
      const buffer = await this.generateImage();
      res.setHeader('Content-Type', 'image/png');
      res.setHeader('Cache-Control', 'public, max-age=60, s-maxage=60');
      res.status(200).send(buffer);
    } catch {
      res.status(429).json({ error: 'Rate limit exceeded' })
    }
  }

  private async generateImage() {
    const generator = Generators[this.generatorKey];
    const svg = generator.generateString();
    const resvg = new Resvg(svg);
    const pngData = resvg.render();
    const buffer = pngData.asPng();
    return buffer;
  }
}