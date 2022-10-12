import type { NextApiRequest, NextApiResponse } from 'next'
import rateLimit from '../../../utils/rate-limit'
import { sample } from '@ededejr/utils';
import { ArtGenerator, AvailableGenerators } from '../../../utils/arte'
import { Resvg } from '@resvg/resvg-js';
import Randomizer from '../../../utils/arte/utilities/randomizer';
import path from 'path';

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
  const fontDirectory = path.join(process.cwd(), 'fonts');
  const font = (file: TemplateStringsArray) => path.join(fontDirectory, file[0]);

  const generator: ArtGenerator = sample(AvailableGenerators);
  const svg = generator.model.generateString();
  const fontFiles = [
    font`BebasNeue-Regular.ttf`,
    font`Bungee-Regular.ttf`,
  ];

  const resvg = new Resvg(svg, {
    font: {
      loadSystemFonts: false,
      defaultFontFamily: Randomizer.decide('Bebas Neue', 'Bungee'),
      fontFiles
    }
  });
  const pngData = resvg.render();
  const buffer = pngData.asPng();
  return buffer;
}