import * as yup from "yup";

export const reportSchema = yup.object().shape({
    title: yup.string().required(),
    authors: yup.string().required(),
    subject: yup.string().required(),
    tags: yup.string(),
    description: yup.string().required(),
    abstract: yup.string().required(),
    fileLocation: yup.string().required(),
    bannerImage: yup.string().required(),
    cardImage: yup.string().required()
});

export default async function validatePostsRequest(req) {
    try {
        const body = await req.json();
        await reportSchema.validate(body);
        return body;
    } catch (error) {
        throw { message: error.message };
    }
}
