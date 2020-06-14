const sizeOffset = 10;

export const averageLastPixelColor = (canvas, row, column, ctx, tileSize, dataOffset) => {
  const rgb = {
    r: 0,
    g: 0,
    b: 0,
  };
  let data;

  try {
    data = ctx.getImageData(column * tileSize, row * tileSize, sizeOffset, sizeOffset);
  } catch (e) {
    return rgb;
  }

  const length = data.data.length;
  let count = 0;

  for (let i = 0; i < length; i += dataOffset, count++) {
    rgb.r += data.data[i];
    rgb.g += data.data[i + 1];
    rgb.b += data.data[i + 2];
  }

  rgb.r = Math.floor(rgb.r / count);
  rgb.g = Math.floor(rgb.g / count);
  rgb.b = Math.floor(rgb.b / count);

  return rgb;
};
