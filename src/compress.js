"use strict";
import sharp from 'sharp';
import { redirect } from './redirect.js';

// Define the sharpStream function
const sharpStream = () => sharp({ animated: !process.env.NO_ANIMATE, unlimited: true });

export async function compressImg(request, reply, input) {
    const format = request.params.webp ? 'webp' : 'jpeg';
    
    input.body.pipe(sharpStream()
    .grayscale(req.params.grayscale)
    .toFormat(format, {
      quality: req.params.quality,
      progressive: true,
      optimizeScans: true
    })
    .toBuffer((err, output, info) => _sendResponse(err, output, info, format, request, reply)))
}

function _sendResponse(err, output, info, format, req, res) {
  if (err || !info) return redirect(requedt, reply);

  reply
            .header('content-type', 'image/' + format)
            .header('content-length', info.size)
            .header('x-original-size', request.params.originSize)
            .header('x-bytes-saved', request.params.originSize - info.size)
            .code(200)
            .send(data);
}
