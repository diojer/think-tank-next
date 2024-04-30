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
    await sponsorSchema.validate(req);
    return req;
  } catch (error) {
    throw { message: error.message };
  }
}
