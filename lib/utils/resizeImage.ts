export const resizeImage = (image: HTMLImageElement, $target: HTMLElement) => {
  let MAX_WIDTH = $target.getBoundingClientRect().width - 1;
  let MAX_HEIGHT = $target.getBoundingClientRect().height - 1;
  let width = image.width;
  let height = image.height;

  const artboardRatio = MAX_WIDTH / MAX_HEIGHT;
  const imageRatio = width / height;

  if (artboardRatio > imageRatio) {
    width *= MAX_HEIGHT / height;
    height = MAX_HEIGHT;
  } else {
    height *= MAX_WIDTH / width;
    width = MAX_WIDTH;
  }
  return [width, height];
};
