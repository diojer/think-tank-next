import * as yup from "yup";
import { validateImages } from "@/app/api/validation";

export const postSchema = yup.object().shape({
  title: yup.string().required(),
  author: yup.string().required(),
  subject: yup.string().required(),
  tags: yup.string(),
  byline: yup.string(),
  content: yup.string().required(),
  bannerImage: yup.string().required(),
  cardImage: yup.string().required()
});

export default async function validatePostsRequest(req) {
  try {
    const body = await req.json();
    await postSchema.validate(body);
    return body;
  } catch (error) {
    throw { message: error.message };
  }
}
