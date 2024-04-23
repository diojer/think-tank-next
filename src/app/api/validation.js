export function validateImages(images) {
  images.map((image) => {
    validateImage(image);
  });
}

export function validateImage(image) {
  const allowedFiletypes = [
    "image/png",
    "image/jpeg",
    "image/jpg",
    "image/gif",
    "image/svg+xml",
  ];

  //check filetype and size

  if (image.size > 50000000) {
    throw { message: "Image size exceeds 50MB" };
  }
  if (!allowedFiletypes.includes(image.type)) {
    throw { message: "File extension not allowed" };
  }
}
