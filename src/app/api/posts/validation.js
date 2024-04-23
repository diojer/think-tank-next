import * as yup from "yup";
import { validateImages } from "@/app/api/validation";

export const postSchema = yup.object().shape({
  title: yup.string().required(),
  author: yup.string().required(),
  subject: yup.string().required(),
  tags: yup.string(),
  byline: yup.string(),
  content: yup.string().required(),
});

export default async function validatePostsRequest(req) {
  try {
    const formData = await req.formData();
    const payload = JSON.parse(formData.get("payload"));
    const cardImage = formData.get("cardImage");
    const bannerImage = formData.get("bannerImage");
    await postSchema.validate(payload);
    validateImages([bannerImage, cardImage]);
    return [payload, cardImage, bannerImage];
  } catch (error) {
    throw { message: error.message };
  }
}
