import { writeFile } from "fs/promises";
import path from "path";

export async function uploadImage(image, imgPath) {
  const buffer = Buffer.from(await image.arrayBuffer());

  const d = new Date();
  const filename = `${d.getTime()}_${image.name}`;
  try {
    await writeFile(
      path.join(process.cwd(), `public/images/${imgPath}` + filename),
      buffer
    );
    console.log("Images uploaded successfully");
    return `images/${imgPath}${filename}`;
  } catch (err) {
    console.log(err);
    throw err;
  }
}
