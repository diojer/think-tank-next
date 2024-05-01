"use client"
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/Button";
import { Editor } from "@tinymce/tinymce-react";
import { useCookies } from "next-client-cookies";
import uploadImage, { tinymceUploadImage } from "@/app/portal/upload/uploadImage";

export const EditForm = ({ post, type }) => {
    const cookies = useCookies();


    const validationSchema = Yup.object().shape({
        title: Yup.string().required(),
        author: Yup.string().required(),
        subject: Yup.string().required(),
        tags: Yup.string(),
        byline: Yup.string(),
        content: Yup.string().required(),
        cardImage: Yup.mixed(),
        bannerImage: Yup.mixed(),
    });

    const initialValues = {
        title: post.title,
        author: post.author,
        subject: post.subject,
        tags: post.tags,
        byline: post.byline,
        content: post.content,
        cardImage: "",
        bannerImage: ""
    };

    function capitaliseFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const title = ((type) => {
        const array = type.split("-");
        let title = "";
        array.map((wordlet) => {
            title = title + capitaliseFirstLetter(wordlet) + " ";
        })
        title = title.trimEnd();
        return title;
    })(type)

    const onUpload = async (data, cookies) => {
        try {
            const session_token = cookies.get("__session");

            let bannerImagePath = null;

            //If no images are being changed, data.<x>Image will be set to post.<x>Image
            //This is so it can be validated by the back-end (the filepaths are required).
            if (data.bannerImage) {
                bannerImagePath = await uploadImage(data.bannerImage, type, session_token);
            } else {
                bannerImagePath = post.bannerImage;
            }

            let cardImagePath = null;
            if (data.cardImage) {
                cardImagePath = await uploadImage(data.cardImage, type, session_token);
            } else {
                cardImagePath = post.cardImage;
            }
            //images uploaded successfully

            data.bannerImage = bannerImagePath;
            data.cardImage = cardImagePath;

            //upload new record to posts table
            try {
                const response = await fetch(`${process.env.APP_API_URL}/posts/${type}/${post.slug}`, {
                    body: JSON.stringify(data),
                    method: "PUT",
                    headers: {
                        authorization: `${session_token}`
                    }
                })
                if (!response.ok) {
                    throw (`Status not ok. ${JSON.stringify(response)}`);
                } else {
                    alert("Article successfully edited.");
                }
            } catch (error) {
                throw (`Images uploaded successfully, problem recording to table: ${error}`);
            }

        } catch (error) {
            console.log(error);
            alert(`Error: ${error}`)
        }
    };

    return (<div className="upload-article-form-wrapper upload-subwrapper">
        <p className="article-table-heading upload-subheader">Edit {title}</p>
        <Formik
            enableReinitialize
            validationSchema={validationSchema}
            initialValues={initialValues}
            onSubmit={values => {
                onUpload(values, cookies)
            }}
        >
            <Form className="upload-article-form">
                <label>Title:</label>
                <Field name="title" />
                <label>Author:</label>
                <Field name="author" />
                <label>
                    Policy Area (e.g., Education, Energy and Environment, etc.):
                </label>
                <Field name="subject" />
                <label>
                    Tags (seperated by comma) <span className="red">(Optional)</span>:
                </label>
                <Field name="tags" />
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
                    Byline/Subheading <span className="red">(Optional)</span>:
                </label>
                <Field name="byline" />
                <label>
                    Article Content
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
                <Field name="content">
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
                                                tinymceUploadImage(blobInfo, resolve, reject, cookies);
                                            }),
                                        images_upload_base_path: process.env.APP_PUBLIC_URL,
                                    }}
                                    onEditorChange={(content) => {
                                        setFieldValue("content", content);
                                    }}
                                />
                            </>
                        );
                    }}
                </Field>
                <Button type="submit">Edit {title}</Button>
                <div className="error-messages-wrapper">
                    <ErrorMessage name="title" component="p" />
                    <ErrorMessage name="author" component="p" />
                    <ErrorMessage name="subject" component="p" />
                    <ErrorMessage name="bannerImage" component="p" />
                    <ErrorMessage name="cardImage" component="p" />
                    <ErrorMessage name="content" component="p" />
                </div>
            </Form>
        </Formik>
    </div>)
}
