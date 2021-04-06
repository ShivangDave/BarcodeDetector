document.addEventListener('DOMContentLoaded',() => {
  setupScanner();
})

const setupScanner = () => {
  const upload = document.querySelector('input')

  upload.onchange = (e) => {
    const imageFile = e.target.files[0]
    BarcodeDetector.getSupportedFormats()
    .then(supportedFormats => {

      const barcodeDetector = new BarcodeDetector({formats: supportedFormats})
      const reader = new FileReader();

      reader.onload = function(e) {
        const img = new Image()
        img.src = e.target.result

        img.decode().then(() => {
          barcodeDetector.detect(img)
          .then(barcodes => {
            barcodes.forEach(barcode => console.log(barcode));
          })
          .catch(err => {
            console.log(err);
          })
        })
      };

      reader.readAsDataURL(imageFile);
    });
  }
}
