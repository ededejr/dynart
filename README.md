### dynart

A proof of concept which explores generating dynamic og images (for seo) on the fly. This initially arose from discussions with [@magus](https://github.com/magus) a few months ago.

The team at Vercel recently released a new package, which handles this sort of thing. You can learn more about it in their [blog post](https://vercel.com/blog/introducing-vercel-og-image-generation-fast-dynamic-social-card-images). After seeing this, I dug deeper into the libraries they were using and was able to build out a custom stack sharing similar foundations.

The `@vercel/og` package remains closed source at the time of this writing, and I suspect it's a wrapper to keep folks locked into the Vercel system. Understandable for the business but I wagered we could build our own.

## Technical Design
I wrote this fairly quickly over the course of a few hours, so its definitely not ready for production. However it does outline a possible path forward to implement this service on a larger scale. An edge network could be the optimal approach for this, even though I am not using one here.

Another approach being considered for scaling the service, is to isolate it as a component of a distributed system, where edge nodes request a new image and pipe through the response.

### Api Routes with Next
The server routes are served by Next+Vercel. Its a few standard routes responsible for the image generation. You can request either a random image (from a select few models) using `/random` or a specific type of image using `/s/<generator name>`.

The api routes are also guarded using a rate-limiter. Its based off Next's api-routes with rate limiter example which you can set up with:

```bash
npx create-next-app --example api-routes-rate-limit api-routes-rate-limit-app
```

An `lru-cache` is used to implement a simple rate limiter for API routes ([Serverless Functions](https://vercel.com/docs/serverless-functions/introduction)).

```bash
curl https://dynart.edede.ca/api/img/random -I
HTTP/1.1 200 OK
X-RateLimit-Limit: 10
X-RateLimit-Remaining: 9

curl https://dynart.edede.ca/api/img/random -I
HTTP/1.1 429 Too Many Requests
X-RateLimit-Limit: 10
X-RateLimit-Remaining: 0
```

> Although I would like to use edge networks, we'll see how the project progresses. A service based approach that serves content to the edge might work too.

### Arte
Spinning this up so quickly was possible due to the previous work done in the Arte project. Arte is a generative art project, which generated svg variants based on encodings of underlying models. This infographic explains the system best:

![Arte Conceptual Model](https://user-images.githubusercontent.com/16638639/195362806-27ecceab-eefe-4f96-b417-eae7b8f7389b.png)

The Arte generators can output an `svg` string, rendered by `ReactDOMServer.renderToStaticMarkup`. I ported over the code for Arte, and adapted it slightly. In the future this could be reworked entirely for dynart.

### Resvg
The final piece of the puzzle is converting the generated `svg` string into an image. `@vercel/og` abstracts this away I suspect behind `ImageResponse`. [vercel/satori](https://github.com/vercel/satori) converts the passed JSX into an `svg` string, and then `ImageResponse` generates the image. In this case, we already have the generated `svg` string, and can avoid `@vercel/og` entirely by using [resvg-js](https://github.com/yisibl/resvg-js) to convert the `svg` into an image. This is the same package used by Vercel.
