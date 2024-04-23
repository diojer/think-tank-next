import * as yup from "yup";
import { validateImages } from "@/app/api/validation";

export const sponsorSchema = yup.object().shape({
  name: yup.string().required(),
  type: yup.string().required(),
  description: yup.string().required(),
  image: yup.string(),
});

export default async function validateSponsorRequest(req) {
  try {
    const formData = await req.formData();
    const payload = JSON.parse(formData.get("payload"));
    const image = formData.get("image");
    await sponsorSchema.validate(payload);
    validateImages([image]);
    return [payload, image];
  } catch (error) {
    throw { message: error.message };
  }
}
