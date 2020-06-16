var UploadContainer = /** @class */ (function () {
    function UploadContainer(_a) {
        var _this = this;
        var name = _a.name, $container = _a.$container, updateImageData = _a.updateImageData;
        this.updateImageData = updateImageData;
        var label = document.createElement("label");
        label.htmlFor = name + "-upload";
        label.className = name + "-upload-label";
        var p = document.createElement("p");
        p.className = name + "-upload-description";
        p.textContent = "UPLOAD IMAGE";
        p.style.width = "100%";
        p.style.height = "100%";
        p.style.textAlign = "center";
        label.append(p);
        var div = document.createElement("div");
        var inputFile = document.createElement("input");
        inputFile.type = "file";
        inputFile.accept = "image/*";
        inputFile.id = name + "-upload";
        inputFile.className = name + "-image-upload";
        inputFile.hidden = true;
        inputFile.addEventListener("change", function (e) {
            e.stopPropagation();
            var reader = new FileReader();
            reader.onload = function (event) {
                var img = new Image();
                var imgURL = event.target.result;
                img.src = imgURL;
                img.onload = function () {
                    _this.updateImageData(img);
                };
            };
            reader.readAsDataURL(e.target.files[0]);
        });
        div.append(inputFile);
        this.render($container, label, div);
    }
    UploadContainer.prototype.render = function ($container, label, div) {
        $container.append(label);
        $container.append(div);
    };
    return UploadContainer;
}());

var averageColor = function (row, column, ctx, tileSize, dataOffset) {
    var rgb = {
        r: 0,
        g: 0,
        b: 0,
    };
    var data;
    try {
        data = ctx.getImageData(column * tileSize, row * tileSize, tileSize, tileSize);
    }
    catch (e) {
        return rgb;
    }
    var length = data.data.length;
    var count = 0;
    for (var i = 0; i < length; i += dataOffset, count++) {
        rgb.r += data.data[i];
        rgb.g += data.data[i + 1];
        rgb.b += data.data[i + 2];
    }
    rgb.r = Math.floor(rgb.r / count);
    rgb.g = Math.floor(rgb.g / count);
    rgb.b = Math.floor(rgb.b / count);
    return rgb;
};

var sizeOffset = 10;
var averageLastPixelColor = function (row, column, ctx, tileSize, dataOffset) {
    var rgb = {
        r: 0,
        g: 0,
        b: 0,
    };
    var data;
    try {
        data = ctx.getImageData(column * tileSize, row * tileSize, sizeOffset, sizeOffset);
    }
    catch (e) {
        return rgb;
    }
    var length = data.data.length;
    var count = 0;
    for (var i = 0; i < length; i += dataOffset, count++) {
        rgb.r += data.data[i];
        rgb.g += data.data[i + 1];
        rgb.b += data.data[i + 2];
    }
    rgb.r = Math.floor(rgb.r / count);
    rgb.g = Math.floor(rgb.g / count);
    rgb.b = Math.floor(rgb.b / count);
    return rgb;
};

var dataOffset = 4; // we can set how many pixels to skip
var borderSize = 0;
var drawCanvas = function (canvas, image, pixelSize, gridSize, gridColor) {
    gridColor = gridColor || "#000000";
    var ctx = canvas.getContext("2d");
    canvas.width = canvas.width - borderSize;
    canvas.height = canvas.height - borderSize;
    var tileSize = pixelSize;
    if (ctx)
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    var imageData = ctx ? ctx.getImageData(0, 0, canvas.width, canvas.height) : null;
    var pixels = imageData ? imageData.data : null;
    var numTileRows = Math.ceil(canvas.height / tileSize);
    var numTileCols = Math.ceil(canvas.width / tileSize);
    var grid = gridSize;
    var gridRed = parseInt(gridColor.substr(1, 2), 16);
    var gridGreen = parseInt(gridColor.substr(3, 2), 16);
    var gridBlue = parseInt(gridColor.substr(5, 2), 16);
    // Loop through each tile
    for (var r = 0; r < numTileRows; r++) {
        for (var c = 0; c < numTileCols; c++) {
            // Set the pixel values for each tile
            var average = void 0;
            if (ctx) {
                if (c === numTileCols - 1 || r === numTileRows - 1)
                    average = averageLastPixelColor(r, c, ctx, tileSize, dataOffset);
                else
                    average = averageColor(r, c, ctx, tileSize, dataOffset);
            }
            var rgb = average;
            var red = rgb ? rgb.r : 0;
            var green = rgb ? rgb.g : 0;
            var blue = rgb ? rgb.b : 0;
            // Loop through each tile pixel
            if (c === numTileCols - 1) {
                for (var tr = 0; tr < tileSize; tr++) {
                    for (var tc = 0; tc < canvas.width - c * tileSize; tc++) {
                        // Calculate the true position of the tile pixel
                        var trueRow = r * tileSize + tr;
                        var trueCol = c * tileSize + tc;
                        var imageDataWidth = imageData ? imageData.width : 0;
                        // Calculate the position of the current pixel in the array
                        var position = trueRow * (imageDataWidth * dataOffset) + trueCol * dataOffset;
                        // console.log("position", position);
                        // Assign the colour to each pixel
                        if (pixels) {
                            if (tc < grid || tr < grid || tc > canvas.width - c * tileSize - grid || tr > canvas.height - r * tileSize - grid) {
                                pixels[position + 0] = gridRed;
                                pixels[position + 1] = gridGreen;
                                pixels[position + 2] = gridBlue;
                                pixels[position + 3] = 255;
                            }
                            else {
                                pixels[position + 0] = red;
                                pixels[position + 1] = green;
                                pixels[position + 2] = blue;
                                pixels[position + 3] = 255;
                            }
                        }
                    }
                }
            }
            else {
                for (var tr = 0; tr < tileSize; tr++) {
                    for (var tc = 0; tc < tileSize; tc++) {
                        // Calculate the true position of the tile pixel
                        var trueRow = r * tileSize + tr;
                        var trueCol = c * tileSize + tc;
                        var imageDataWidth = imageData ? imageData.width : 0;
                        // Calculate the position of the current pixel in the array
                        var position = trueRow * (imageDataWidth * dataOffset) + trueCol * dataOffset;
                        // console.log("position", position);
                        // Assign the colour to each pixel
                        if (pixels) {
                            if (tc < grid || tr < grid || tr > canvas.height - r * tileSize - grid) {
                                pixels[position + 0] = gridRed;
                                pixels[position + 1] = gridGreen;
                                pixels[position + 2] = gridBlue;
                                pixels[position + 3] = 255;
                            }
                            else {
                                pixels[position + 0] = red;
                                pixels[position + 1] = green;
                                pixels[position + 2] = blue;
                                pixels[position + 3] = 255;
                            }
                        }
                    }
                }
            }
        }
    }
    // Draw image data to the canvas
    if (ctx && imageData)
        ctx.putImageData(imageData, 0, 0);
};

var dataOffset$1 = 4; // we can set how many pixels to skip
var drawCanvasCircle = function (canvas, image, pixelSize, gridSize, gridColor) {
    gridColor = gridColor || "#000000";
    var ctx = canvas.getContext("2d");
    var tileSize = pixelSize;
    // const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    var numTileRows = Math.ceil(canvas.height / tileSize);
    var numTileCols = Math.ceil(canvas.width / tileSize);
    if (ctx)
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    // Loop through each tile
    for (var r = 0; r < numTileRows; r++) {
        for (var c = 0; c < numTileCols; c++) {
            // Set the pixel values for each tile
            var average = void 0;
            if (ctx) {
                if (c === numTileCols - 1 || r === numTileRows - 1)
                    average = averageLastPixelColor(r, c, ctx, tileSize, dataOffset$1);
                else
                    average = averageColor(r, c, ctx, tileSize, dataOffset$1);
            }
            var rgb = average;
            var red = rgb ? rgb.r : 0;
            var green = rgb ? rgb.g : 0;
            var blue = rgb ? rgb.b : 0;
            var trueRow = c * tileSize;
            var trueCol = r * tileSize;
            var arcCenterX = trueRow;
            var arcCenterY = trueCol;
            if (ctx) {
                ctx.beginPath();
                ctx.fillStyle = "" + gridColor;
                ctx.fillRect(trueRow, trueCol, tileSize, tileSize);
                ctx.fillStyle = "rgb(" + red + "," + green + "," + blue + ")";
                ctx.arc(arcCenterX + tileSize / 2, arcCenterY + tileSize / 2, (tileSize - gridSize) / 2, 0, Math.PI * 2, false);
                ctx.fill();
            }
        }
    }
};

var drawCanvasOriginal = function (canvas, image) {
    var ctx = canvas.getContext("2d");
    if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    }
};

var dataOffset$2 = 4; // we can set how many pixels to skip
var drawCanvasRoundSquare = function (canvas, image, pixelSize, gridSize, gridColor) {
    gridColor = gridColor || "#000000";
    var ctx = canvas.getContext("2d");
    var tileSize = pixelSize;
    var numTileRows = Math.ceil(canvas.height / tileSize);
    var numTileCols = Math.ceil(canvas.width / tileSize);
    if (ctx)
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    var grid = Number(gridSize);
    // Loop through each tile
    for (var r = 0; r < numTileRows; r++) {
        for (var c = 0; c < numTileCols; c++) {
            // Set the pixel values for each tile
            var average = void 0;
            if (ctx) {
                if (c === numTileCols - 1 || r === numTileRows - 1)
                    average = averageLastPixelColor(r, c, ctx, tileSize, dataOffset$2);
                else
                    average = averageColor(r, c, ctx, tileSize, dataOffset$2);
            }
            var rgb = average;
            var red = rgb ? rgb.r : 0;
            var green = rgb ? rgb.g : 0;
            var blue = rgb ? rgb.b : 0;
            var trueRow = c * tileSize;
            var trueCol = r * tileSize;
            if (ctx) {
                ctx.beginPath();
                ctx.fillStyle = "" + gridColor;
                ctx.fillRect(trueRow, trueCol, tileSize, tileSize);
                ctx.fillStyle = "rgb(" + red + "," + green + "," + blue + ")";
                ctx.strokeStyle = "rgb(" + red + "," + green + "," + blue + ")";
                var radius = (tileSize * 20) / 100;
                roundRect(ctx, trueRow + grid, trueCol + grid, tileSize - grid, tileSize - grid, radius, true);
            }
        }
    }
    function roundRect(ctx, x, y, width, height, radius, fill, stroke) {
        var _radius;
        if (typeof stroke === "undefined") {
            stroke = true;
        }
        if (typeof radius === "undefined") {
            radius = 5;
        }
        if (typeof radius === "number") {
            _radius = { tl: radius, tr: radius, br: radius, bl: radius };
        }
        else {
            var defaultRadius = { tl: 0, tr: 0, br: 0, bl: 0 };
            for (var side in defaultRadius) {
                _radius[side] = _radius[side] || 0;
            }
        }
        ctx.beginPath();
        ctx.moveTo(x + _radius.tl, y);
        ctx.lineTo(x + width - _radius.tr, y);
        ctx.quadraticCurveTo(x + width, y, x + width, y + _radius.tr);
        ctx.lineTo(x + width, y + height - _radius.br);
        ctx.quadraticCurveTo(x + width, y + height, x + width - _radius.br, y + height);
        ctx.lineTo(x + _radius.bl, y + height);
        ctx.quadraticCurveTo(x, y + height, x, y + height - _radius.bl);
        ctx.lineTo(x, y + _radius.tl);
        ctx.quadraticCurveTo(x, y, x + _radius.tl, y);
        ctx.closePath();
        if (fill) {
            ctx.fill();
        }
        if (stroke) {
            ctx.stroke();
        }
    }
};

var resizeImage = function (image, $target) {
    var MAX_WIDTH = $target.getBoundingClientRect().width - 1;
    var MAX_HEIGHT = $target.getBoundingClientRect().height - 1;
    var width = image.width;
    var height = image.height;
    // 아트보드 가로세로 비율
    var artboardRatio = MAX_WIDTH / MAX_HEIGHT;
    // 이미지 가로세로 비율
    var imageRatio = width / height;
    // 아트보드 비율이 이미지 비율보다 크면 이미지의 세로를 아트보드의 세로에 맞춤
    if (artboardRatio > imageRatio) {
        width *= MAX_HEIGHT / height;
        height = MAX_HEIGHT;
    }
    // 이미지 비율이 아트보드 비율보다 크면 이미지의 가로를 아트보드의 가로에 맞춤
    else {
        height *= MAX_WIDTH / width;
        width = MAX_WIDTH;
    }
    return [width, height];
};

var dataOffset$3 = 4; // we can set how many pixels to skip
var drawMousemoveCanvas = function (canvas, pixelSize, gridSize, y, x, gridColor) {
    console.log("mCanvas ps", pixelSize);
    var tileSize = pixelSize;
    var numTileCols = Math.ceil(canvas.width / tileSize);
    var ctx = canvas.getContext("2d");
    var imageData = ctx ? ctx.getImageData(0, 0, canvas.width, canvas.height) : null;
    var pixels = imageData ? imageData.data : null;
    var rowIndex = Math.floor(x / tileSize);
    var colIndex = Math.floor(y / tileSize);
    // Set the pixel values for each tile
    var gridRed = parseInt(gridColor.substr(1, 2), 16);
    var gridGreen = parseInt(gridColor.substr(3, 2), 16);
    var gridBlue = parseInt(gridColor.substr(5, 2), 16);
    if (colIndex === numTileCols - 1) {
        for (var tr = 0; tr < tileSize; tr++) {
            for (var tc = 0; tc < canvas.width - colIndex * tileSize; tc++) {
                // Calculate the true position of the tile pixel
                var trueRow = rowIndex * tileSize + tr;
                var trueCol = colIndex * tileSize + tc;
                // Calculate the position of the current pixel in the array
                var imageDataWidth = imageData ? imageData.width : 0;
                var position = trueRow * (imageDataWidth * dataOffset$3) + trueCol * dataOffset$3;
                // Assign the colour to each pixel
                if (pixels) {
                    pixels[position + 0] = gridRed;
                    pixels[position + 1] = gridGreen;
                    pixels[position + 2] = gridBlue;
                    pixels[position + 3] = 255;
                }
            }
        }
    }
    else {
        // Loop through each tile pixel
        for (var tr = 0; tr < tileSize; tr++) {
            for (var tc = 0; tc < tileSize; tc++) {
                // Calculate the true position of the tile pixel
                var trueRow = rowIndex * tileSize + tr;
                var trueCol = colIndex * tileSize + tc;
                // Calculate the position of the current pixel in the array
                var position = trueRow * (canvas.width * dataOffset$3) + trueCol * dataOffset$3;
                // Assign the colour to each pixel
                if (pixels) {
                    pixels[position + 0] = gridRed;
                    pixels[position + 1] = gridGreen;
                    pixels[position + 2] = gridBlue;
                    pixels[position + 3] = 255;
                }
            }
        }
    }
    // Draw image data to the canvas
    return imageData;
};

var dataOffset$4 = 4; // we can set how many pixels to skip
var drawHoverCanvas = function (canvas, pixelSize, gridSize, y, x, hoverColor) {
    var tileSize = pixelSize;
    var numTileCols = Math.ceil(canvas.width / tileSize);
    var ctx = canvas.getContext("2d");
    var grid = gridSize;
    var imageData = ctx ? ctx.getImageData(0, 0, canvas.width, canvas.height) : null;
    var pixels = imageData ? imageData.data : null;
    var rowIndex = Math.floor(x / tileSize);
    var colIndex = Math.floor(y / tileSize);
    // Set the pixel values for each tile
    var gridRed = 255 - parseInt(hoverColor.substr(1, 2), 16);
    var gridGreen = 255 - parseInt(hoverColor.substr(3, 2), 16);
    var gridBlue = 255 - parseInt(hoverColor.substr(5, 2), 16);
    if (colIndex === numTileCols - 1) {
        for (var tr = 0; tr < tileSize; tr++) {
            for (var tc = 0; tc < canvas.width - colIndex * tileSize; tc++) {
                // Calculate the true position of the tile pixel
                var trueRow = rowIndex * tileSize + tr;
                var trueCol = colIndex * tileSize + tc;
                // Calculate the position of the current pixel in the array
                var imageDataWidth = imageData ? imageData.width : 0;
                var position = trueRow * (imageDataWidth * dataOffset$4) + trueCol * dataOffset$4;
                // Assign the colour to each pixel
                if (pixels) {
                    if (tc < grid || tr < grid || tc > canvas.width - colIndex * tileSize - grid || tr > canvas.height - rowIndex * tileSize - grid) {
                        pixels[position + 0] = gridRed;
                        pixels[position + 1] = gridGreen;
                        pixels[position + 2] = gridBlue;
                        pixels[position + 3] = 255;
                    }
                }
            }
        }
    }
    else {
        // Loop through each tile pixel
        for (var tr = 0; tr < tileSize; tr++) {
            for (var tc = 0; tc < tileSize; tc++) {
                // Calculate the true position of the tile pixel
                var trueRow = rowIndex * tileSize + tr;
                var trueCol = colIndex * tileSize + tc;
                // Calculate the position of the current pixel in the array
                var position = trueRow * (canvas.width * dataOffset$4) + trueCol * dataOffset$4;
                // Assign the colour to each pixel
                if (pixels) {
                    if (tc < grid || tr < grid || tr > canvas.height - rowIndex * tileSize - grid) {
                        pixels[position + 0] = gridRed;
                        pixels[position + 1] = gridGreen;
                        pixels[position + 2] = gridBlue;
                        pixels[position + 3] = 255;
                    }
                }
            }
        }
    }
    // Draw image data to the canvas
    return imageData;
};

var CanvasContainer = /** @class */ (function () {
    function CanvasContainer(_a) {
        var _this = this;
        var name = _a.name, $container = _a.$container, image = _a.image, pixelSize = _a.pixelSize, gridSize = _a.gridSize, gridColor = _a.gridColor, pixelType = _a.pixelType;
        this.isDrawing = false;
        this.pixelSize = pixelSize;
        this.gridSize = gridSize;
        this.gridColor = gridColor;
        this.pixelType = pixelType;
        this.canvasFirstData = null;
        var canvas = document.createElement("canvas");
        this.canvas = canvas;
        $container.innerHTML = "";
        canvas.id = name + "-canvas";
        var _b = resizeImage(image, $container), width = _b[0], height = _b[1];
        canvas.width = width;
        canvas.height = height;
        var ctx = canvas.getContext("2d");
        if (ctx)
            ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
        this.render($container, canvas);
        if (pixelType === "square") {
            drawCanvas(canvas, image, pixelSize, gridSize, gridColor);
        }
        else if (pixelType === "circle") {
            drawCanvasCircle(canvas, image, pixelSize, gridSize, gridColor);
        }
        else if (pixelType === "original") {
            drawCanvasOriginal(canvas, image);
        }
        else if (pixelType === "roundsquare") {
            drawCanvasRoundSquare(canvas, image, pixelSize, gridSize, gridColor);
        }
        if (ctx)
            this.canvasFirstData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        canvas.addEventListener("mousedown", this.mousedownHandler.bind(this));
        canvas.addEventListener("mousemove", this.mousemoveHandler.bind(this));
        canvas.addEventListener("mouseleave", this.mouseleaveHandler.bind(this));
        window.addEventListener("mouseup", function (e) {
            _this.isDrawing = false;
        });
        this.render($container, canvas);
    }
    CanvasContainer.prototype.render = function ($container, canvas) {
        $container.innerHTML = "";
        $container.append(canvas);
    };
    CanvasContainer.prototype.mousedownHandler = function (e) {
        var ctx = this.canvas.getContext("2d");
        this.isDrawing = true;
        var rect = this.canvas.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;
        this.canvasFirstData = drawMousemoveCanvas(this.canvas, this.pixelSize, this.gridSize, x, y, this.gridColor);
        if (ctx && this.canvasFirstData)
            ctx.putImageData(this.canvasFirstData, 0, 0);
    };
    CanvasContainer.prototype.mousemoveHandler = function (e) {
        var ctx = this.canvas.getContext("2d");
        var rect = this.canvas.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;
        if (!this.isDrawing) {
            if (ctx && this.canvasFirstData) {
                ctx.putImageData(this.canvasFirstData, 0, 0);
                var dragHoveredImageData = drawHoverCanvas(this.canvas, this.pixelSize, this.gridSize, x, y, this.gridColor);
                if (dragHoveredImageData)
                    ctx.putImageData(dragHoveredImageData, 0, 0);
            }
            return;
        }
        this.canvasFirstData = drawMousemoveCanvas(this.canvas, this.pixelSize, this.gridSize, x, y, this.gridColor);
        if (ctx && this.canvasFirstData)
            ctx.putImageData(this.canvasFirstData, 0, 0);
    };
    CanvasContainer.prototype.mouseleaveHandler = function () {
        var ctx = this.canvas.getContext("2d");
        if (ctx && this.canvasFirstData)
            ctx.putImageData(this.canvasFirstData, 0, 0);
    };
    return CanvasContainer;
}());

var Pixelator = /** @class */ (function () {
    function Pixelator(name, pixelSize, gridSize, gridColor, pixelType) {
        var _this = this;
        var $container = document.getElementById("" + name);
        this.$container = $container;
        this.$target = null;
        if ($container)
            this.$target = new UploadContainer({
                name: name,
                $container: $container,
                updateImageData: function (image) {
                    _this.$target = new CanvasContainer({
                        name: name,
                        $container: $container,
                        image: image,
                        pixelSize: pixelSize,
                        gridSize: gridSize,
                        gridColor: gridColor,
                        pixelType: pixelType,
                    });
                },
            });
    }
    Pixelator.prototype.getImage = function () {
        return this.$target;
    };
    return Pixelator;
}());

var PixelImage = /** @class */ (function () {
    function PixelImage(name, imageSrc, pixelSize, gridSize, gridColor, pixelType) {
        var _this = this;
        var $container = document.getElementById("" + name);
        this.$container = $container;
        this.$target = null;
        var img = new Image();
        img.src = imageSrc;
        if ($container)
            img.addEventListener("load", function () {
                var image = img;
                _this.$target = new CanvasContainer({
                    name: name,
                    $container: $container,
                    image: image,
                    pixelSize: pixelSize,
                    gridSize: gridSize,
                    gridColor: gridColor,
                    pixelType: pixelType,
                });
            });
    }
    return PixelImage;
}());

export { PixelImage, Pixelator };
