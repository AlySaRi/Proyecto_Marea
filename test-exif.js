// test-exif.js
import exifr from 'exifr';
import fs from 'fs';

async function testExif() {
  const buffer = fs.readFileSync('./IMG_6137.jpg');
  
  // Leer todo el EXIF
  const data = await exifr.parse(buffer);
  console.log('EXIF completo:', data);

  // Intentar extraer GPS de forma segura
  const latitude = data?.latitude || data?.GPSLatitude;
  const longitude = data?.longitude || data?.GPSLongitude;

  if (latitude && longitude) {
    console.log(`Latitud: ${latitude}, Longitud: ${longitude}`);
  } else {
    console.log('No se encontró GPS en la imagen.');
  }
}

testExif();
