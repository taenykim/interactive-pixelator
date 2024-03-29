export const averageColor = (row: number, column: number, ctx: CanvasRenderingContext2D, tileSize: number, dataOffset: number) => {
  const rgb = {
    r: 0,
    g: 0,
    b: 0,
  };
  let data: ImageData;

  try {
    data = ctx.getImageData(column * tileSize, row * tileSize, tileSize, tileSize);
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
