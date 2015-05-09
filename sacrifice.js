function el(id) {
	return document.getElementById(id);
} // Get elem by ID

function readImage() {
    if ( this.files && this.files[0] ) {
        var FR = new FileReader();
        FR.onload = function(e) {
           var img = new Image();
           img.onload = function() {
             context.drawImage(img, 0, 0);
           };
           img.src = e.target.result;
        };       
        FR.readAsDataURL( this.files[0] );
    }
}





Filters = {};

Filters.getPixels = function(img) {
  context.drawImage(img);
  return context.getImageData(0, 0, canvas.width, canvas.height);
};

Filters.filterImage = function(filter, image, var_args) {
  var args = [this.getPixels(image)];
  for (var i=2; i<arguments.length; i++) {
    args.push(arguments[i]);
  }
  return filter.apply(null, args);
};

Filters.grayscale = function(pixels, args) {
  var d = pixels.data;
  for (var i=0; i<d.length; i+=4) {
    var r = d[i];
    var g = d[i+1];
    var b = d[i+2];
    // CIE luminance for the RGB
    // The human eye is bad at seeing red and blue, so we de-emphasize them.
    var v = 0.2126*r + 0.7152*g + 0.0722*b;
    d[i] = d[i+1] = d[i+2] = v
  }
  return pixels;
};
