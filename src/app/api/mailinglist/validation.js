import * as yup from "yup";

export const emailSchema = yup.object().shape({
  email: yup.string().email().required(),
});

export default async function validateMailingRequest(req) {
  try {
    const email = await req.json();
    await emailSchema.validate(email);
    return email;
  } catch (error) {
    throw { message: error.message };
  }
}
