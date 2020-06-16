# Interactive pixelator

![npm](https://img.shields.io/npm/v/interactive-pixelator)
![GitHub](https://img.shields.io/github/license/taenykim/interactive-pixelator)
![dependencies](https://img.shields.io/badge/dependencies-none-brightengreen)
![typed](https://badgen.net/badge/icon/Typed?icon=typescript&label&labelColor=555555&color=blue)

🌇 🌃 upload image and make interactive pixel art 🕹

**[Demo page](https://interactive-pixelator.vercel.app) / [NPM page](https://www.npmjs.com/package/interactive-pixelator)**

## 🌟 Feature

<table width='100%' >
<tr>
<td align="center"><strong>Original Image</strong></td>
<td align="center"><strong>Change Pixel size</strong></td>
</tr>
<tr>
<td>
<img width='200px' src="https://raw.githubusercontent.com/taenykim/interactive-pixelator/master/examples/demo-cra/public/ralph-sample.jpg"/></td>
<td>
<img width='200px' src="https://raw.githubusercontent.com/taenykim/interactive-pixelator/master/images/pixelsize1.gif"/></td>
</tr>
<tr>
<td align="center"><strong>Chnage Pixel type</strong></td>
<td align="center"><strong>Change Grid size</strong></td>
</tr>
<tr>
<td align="center">
<img width='200px' src="https://raw.githubusercontent.com/taenykim/interactive-pixelator/master/images/pixeltype1.gif">
</td>
<td align="center">
<img width='200px' src="https://raw.githubusercontent.com/taenykim/interactive-pixelator/master/images/gridsize1.gif">
</td>
</tr>
<tr>
<td align="center"><strong>Chnage Grid color</strong></td>
<td align="center"><strong>Draw freely</strong></td>
</tr>
<tr>
<td align="center">
<img width='200px' src="https://raw.githubusercontent.com/taenykim/interactive-pixelator/master/images/gridcolor1.gif">
</td>
<td align="center">
<img width='200px' src="https://raw.githubusercontent.com/taenykim/interactive-pixelator/master/images/drawing1.gif">
</td>
</tr>
</table>

## 🌈 How to use

### npm

```BASH
$ npm i interactive-pixelator
```

### usage

```html
<div id="DOM-element-id"></div>
```

```typescript
import { Pixelator, PixelImage } from "interactive-pixelator";

// 🔥 Set width and height on the DOM element.

// if you need a file upload element
new Pixelator("DOM-element-id", pixelSize, gridSize, gridColor, pixelType);

// if you only need a image
new PixelImage("DOM-element-i", "image URL", pixelSize, gridSize, gridColor, pixelType);
```

## 🏎 Demo play

> I used create-react-app ! ☺️

```BASH
$ git clone https://github.com/taenykim/interactive-pixelator.git
$ cd example/demo-cra
$ npm install
$ npm start
```

## ✏️ And..

Still incomplete. If you came in by chance, please give me a lot of advice and support.
