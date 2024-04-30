export default async function uploadImage(image, type, auth) {
    let formData = new FormData();
    formData.append("image", image);
    formData.append("type", type);
    const path = `https://api.leedsthinktank.org.uk/api/images`;
    try {
        const response = await fetch(path, {
            body: formData,
            method: "POST",
            headers: {
                authorization: `${auth}`
            }
        })
        const data = await response.json();
        return data.filepath;
    } catch (error) {
        throw (`Problem uploading image: ${error}`)
    }
};

export async function tinymceUploadImage(blobInfo, resolve, reject, cookies) {
    const session_token = cookies.get("__session");
    const blob = blobInfo.blob();
    const image = new FormData();
    const path = `${process.env.APP_IMAGE_HOST}/api/images`;
    image.append("image", blob);
    try {
        const response = await fetch(path, {
            method: "POST",
            body: image,
            headers: {
                authorization: `${session_token}`
            }

        })
        const data = await response.json()
        resolve(`${process.env.APP_PUBLIC_URL}${data.filepath}`)
    } catch (error) {
        reject(`Error: ${error}`);
    }
}