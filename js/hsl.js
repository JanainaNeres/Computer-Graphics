function processImage(inImg) {
    const width = inImg.width;
    const height = inImg.height;
    const src = new Uint32Array(inImg.data.buffer);
    
    // HSL Correction
    processCanvas('canvasHsl', width, height, function(dst) {
      let deltaH = parseInt($("#rangeH").val()) / 180.0;
      let deltaS = parseInt($("#rangeS").val()) / 100.0;
      let deltaL = parseInt($("#rangeL").val()) / 100.0;
      for (let i = 0; i < dst.length; i++) {
        let r = src[i] & 0xFF;
        let g = (src[i] >> 8) & 0xFF;
        let b = (src[i] >> 16) & 0xFF;
        
        // RGB to HSL
        let hsl = rgbToHsl(r / 255, g / 255, b / 255);
        let h = hsl[0];
        let s = hsl[1]
        let l = hsl[2];
        
        h += deltaH;
        s += deltaS;
        l += deltaL;
        if (h > 1) h -= 1;
        else if (h < 0) h += 1;
        if (s > 1) s = 1;
        else if (s < 0) s = 0;
        if (l > 1) l = 1;
        else if (l < 0) l = 0;
        
        // HSL to RGB
        let rgb = hslToRgb(h, s, l);
        r = rgb[0] * 255;
        g = rgb[1] * 255;
        b = rgb[2] * 255;
        
        dst[i] = (src[i] & 0xFF000000) | (b << 16) | (g << 8) | r;
      }
    });
  }
  
  function rgbToHsl(r, g, b) {
    let max = Math.max(r, g, b);
    let min = Math.min(r, g, b);
    let l = (max + min) / 2;
  
    if (max == min) {
      return [0, 0, l];
    }
    let h, s;
    let d = max - min;
    if (l > 0.5) {
      s = d / (2 - max - min);
    } else {
      s = d / (max + min);
    }
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
    return [h, s, l];
  }
  
  function hue2rgb(p, q, t) {
    if (t < 0) t += 1;
    else if (t > 1) t -= 1;
    if (t < 1/6) return p + (q - p) * 6 * t;
    if (t < 1/2) return q;
    if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
    return p;
  }
  function hslToRgb(h, s, l) {
    if (s == 0) {
      return [l, l, l];
    }
    let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    let p = 2 * l - q;
  
    let r = hue2rgb(p, q, h + 1/3);
    let g = hue2rgb(p, q, h);
    let b = hue2rgb(p, q, h - 1/3);
    return [r, g, b];

  }

  

  
  function getImageData(el) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const img = document.getElementById(el);
    img.crossOrigin = 'anonymous';
    canvas.width = img.width;
    canvas.height = img.height;
    context.drawImage(img, 0, 0);
    return context.getImageData(0, 0, img.width, img.height);
  }
  
  function processCanvas(canvasId, width, height, func) {
    const canvas = document.getElementById(canvasId);
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    const outImg = ctx.createImageData(width, height);
    const dst = new Uint32Array(outImg.data.buffer);
    func(dst);
    ctx.putImageData(outImg, 0, 0);
  }
  
  
  
  document.getElementById('input').addEventListener('change', function() {
    if (this.files && this.files[0]) {
      var img = document.getElementById('img');
      img.crossOrigin = 'anonymous';
      img.src = URL.createObjectURL(this.files[0]);
      img.onload = update;
    }
  });
  
  $("#rangeH").on('input change', update);
  $("#rangeS").on('input change', update);
  $("#rangeL").on('input change', update);
  
  function update(e) {
    $('#valueH').text($("#rangeH").val());
    $('#valueS').text($("#rangeS").val());
    $('#valueL').text($("#rangeL").val());
    processImage(getImageData('img'));
  }
  
  update();





