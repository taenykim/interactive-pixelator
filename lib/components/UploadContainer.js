export default class UploadContainer {
  constructor({ name, $container, updateImageData }) {
    this.updateImageData = updateImageData;

    const label = document.createElement("label");
    label.htmlFor = `${name}-upload`;
    label.className = `${name}-upload-label`;

    const p = document.createElement("p");
    p.className = `${name}-upload-description`;
    p.textContent = "UPLOAD IMAGE";
    p.style.width = "100%";
    p.style.height = "100%";
    p.style.textAlign = "center";

    label.append(p);

    const div = document.createElement("div");
    const inputFile = document.createElement("input");
    inputFile.type = "file";
    inputFile.accept = "image/*";
    inputFile.id = `${name}-upload`;
    inputFile.className = `${name}-image-upload`;
    inputFile.hidden = true;
    inputFile.addEventListener("change", (e) => {
      e.stopPropagation();
      const reader = new FileReader();

      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;

        img.onload = () => {
          this.updateImageData(img);
        };
      };
      reader.readAsDataURL(e.target.files[0]);
    });
    div.append(inputFile);

    this.render($container, label, div);
  }

  render($container, label, div) {
    $container.append(label);
    $container.append(div);
  }
}
