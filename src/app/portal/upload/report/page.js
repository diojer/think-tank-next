"use client";
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/Button";
import { Editor } from "@tinymce/tinymce-react";
import { useCookies } from "next-client-cookies";
import uploadImage from "@/app/portal/upload/uploadImage"

const validationSchema = Yup.object().shape({
    title: Yup.string().required(),
    authors: Yup.string().required(),
    subject: Yup.string().required(),
    tags: Yup.string(),
    description: Yup.string().required(),
    abstract: Yup.string().required(),
    reportPDF: Yup.mixed().required(),
    cardImage: Yup.mixed().required(),
    bannerImage: Yup.mixed().required(),
});

const initialValues = {
    title: "",
    authors: "",
    subject: "",
    tags: "",
    description: "",
    abstract: "",
    reportPDF: "",
    cardImage: "",
    bannerImage: "",
};

const onUpload = async (data, cookies) => {
    try {
        const session_token = cookies.get("__session");


        const pdfPath = await uploadPDF(data.reportPDF, session_token);
        const bannerImagePath = await uploadImage(data.bannerImage, "report", session_token);
        const cardImagePath = await uploadImage(data.cardImage, "report", session_token);

        //images and pdf uploaded successfully

        data.fileLocation = pdfPath;
        data.bannerImage = bannerImagePath;
        data.cardImage = cardImagePath;

        //upload new record to posts table
        const response = await fetch(`${process.env.APP_API_URL}/reports`, {
            body: JSON.stringify(data),
            method: "POST",
            headers: {
                authorization: `${session_token}`
            }
        })
        if (!response.ok) {
            throw ("Images uploaded successfully, problem recording to table.");
        } else {
            alert("Report successfully created.");
        }
    } catch (error) {
        alert(`Error: ${error}`)
    }
};

async function uploadPDF(pdf, auth) {
    let formData = new FormData();
    formData.append("pdf", pdf);
    const path = `${process.env.APP_IMAGE_HOST}/api/pdf`;
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
        throw (`Problem uploading file: ${error}`)
    }
}

function UploadReport() {
    const cookies = useCookies();
    return (
        <div className="upload-article-form-wrapper upload-subwrapper">
            <p className="article-table-heading upload-subheader">Upload Report</p>
            <Formik
                validationSchema={validationSchema}
                initialValues={initialValues}
                onSubmit={values => {
                    onUpload(values, cookies)
                }}
            >
                <Form className="upload-article-form">
                    <label>Title:</label>
                    <Field name="title" />
                    <label>Authors (Surname A, Forename A; Surname B, Forename B; etc.):</label>
                    <Field name="authors" />
                    <label>
                        Policy Area (e.g., Education, Energy and Environment, etc.):
                    </label>
                    <Field name="subject" />
                    <label>
                        Tags (seperated by comma) <span className="red">(Optional)</span>:
                    </label>
                    <Field name="tags" />
                    <label>
                        Description<a
                            onClick={(e) => {
                                alert(
                                    "This will be displayed on the reports page, when users are deciding which report to click on."
                                );
                            }}
                            className="tooltip"
                        >
                            (?)
                        </a>
                    </label>
                    <Field name="description" />
                    <label>
                        Report
                        <a
                            onClick={(e) => {
                                alert(
                                    "This should be a .pdf file."
                                );
                            }}
                            className="tooltip"
                        >
                            (?)
                        </a>
                    </label>
                    <Field name="reportPDF">
                        {({ form }) => {
                            const { setFieldValue } = form;
                            return (
                                <input
                                    type="file"
                                    onChange={(event) => {
                                        setFieldValue("reportPDF", event.currentTarget.files[0]);
                                    }}
                                />
                            );
                        }}
                    </Field>
                    <label>
                        Banner Image
                        <a
                            onClick={(e) => {
                                alert(
                                    "Landscape images are best suited for this. This will be displayed when your article is at the top of the homescreen."
                                );
                            }}
                            className="tooltip"
                        >
                            (?)
                        </a>
                    </label>
                    <Field name="bannerImage">
                        {({ form }) => {
                            const { setFieldValue } = form;
                            return (
                                <input
                                    type="file"
                                    onChange={(event) => {
                                        setFieldValue("bannerImage", event.currentTarget.files[0]);
                                    }}
                                />
                            );
                        }}
                    </Field>
                    <label>
                        Card Image
                        <a
                            onClick={(e) => {
                                alert(
                                    "Square images are best suited for this. This will be displayed on the article page and at the bottom of the homescreen."
                                );
                            }}
                            className="tooltip"
                        >
                            (?)
                        </a>
                    </label>
                    <Field name="cardImage">
                        {({ form }) => {
                            const { setFieldValue } = form;
                            return (
                                <input
                                    type="file"
                                    onChange={(event) => {
                                        setFieldValue("cardImage", event.currentTarget.files[0]);
                                    }}
                                />
                            );
                        }}
                    </Field>
                    <label>
                        Abstract
                        <a
                            className="tooltip"
                            onClick={(e) => {
                                alert(
                                    "If you see a normal input field, turn off your adblock."
                                );
                            }}
                        >
                            (?)
                        </a>
                        :
                    </label>
                    <Field name="abstract">
                        {({ form }) => {
                            const { setFieldValue } = form;
                            return (
                                <>
                                    <Editor
                                        apiKey="4b6mrveofakq5g9eza49d9ve4hoc8y59winphb8mnjs9t6eh"
                                        value={form.values.content}
                                        init={{
                                            height: 750,
                                            menubar: true,
                                            plugins:
                                                "anchor autolink charmap codesample emoticons link lists searchreplace table visualblocks wordcount image imagetools",
                                            toolbar:
                                                "undo redo | blocks fontfamily fontsize | forecolor backcolor bold italic underline | link image table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat ",
                                            imagetools_toolbar:
                                                "rotateleft rotateright | flipv fliph | editimage imageoptions",
                                            images_upload_handler: (blobInfo) =>
                                                new Promise((resolve, reject) => {
                                                    UploadImage(blobInfo, resolve, reject);
                                                }),
                                            images_upload_base_path: process.env.APP_PUBLIC_URL,
                                        }}
                                        onEditorChange={(content) => {
                                            setFieldValue("abstract", content);
                                        }}
                                    />
                                </>
                            );
                        }}
                    </Field>
                    <Button type="submit">Upload Report</Button>
                    <div className="error-messages-wrapper">
                        <ErrorMessage name="title" component="p" />
                        <ErrorMessage name="authors" component="p" />
                        <ErrorMessage name="subject" component="p" />
                        <ErrorMessage name="description" component="p" />
                        <ErrorMessage name="abstract" component="p" />
                        <ErrorMessage name="reportPDF" component="p" />
                        <ErrorMessage name="bannerImage" component="p" />
                        <ErrorMessage name="cardImage" component="p" />
                    </div>
                </Form>
            </Formik>
        </div>
    );
}

export default UploadReport;
