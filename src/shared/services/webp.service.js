import imageCompression from "browser-image-compression";

export async function convertToWebp(file, large) {
  const options = {
    maxSizeMB: 1,           // tamanho máximo (MB)
    maxWidthOrHeight: large ? 900 : 300, // resolução máxima
    useWebWorker: true,
    fileType: "image/webp",
    initialQuality: 0.8    // qualidade (0 a 1)
  };

  const compressedFile = await imageCompression(file, options);

  return compressedFile;
}