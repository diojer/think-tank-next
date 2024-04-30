import React from "react";
import { Button } from "@/components/Button";
import "../View.css";
import { Link } from "next/link";
import { index } from "@/lib/routes";
import { revalidateTag } from "next/cache";

async function ViewEmails() {
    revalidateTag("/reports");
    const reports = await index("/reports");

    //sorting function

    //   function emailDelete(email) {
    //     if (
    //       !window.confirm(
    //         "Are you sure you want to remove this email from the list?"
    //       )
    //     ) {
    //       return;
    //     } else {
    //       //delete email
    //     }
    //   }

    return (
        <>
            <div className="report-view-wrapper upload-subwrapper">
                <p className="report-view-heading upload-subheader">
                    View/Edit Reports
                </p>
                <table className="default-table">
                    <tbody>
                        <tr className="default-table-headings">
                            <th>ID</th>
                            <th>Title</th>
                            <th>Authors</th>
                            <th>Subject</th>
                            <th>Description</th>
                            <th>Banner Image</th>
                            <th>Card Image</th>
                            <th>Report PDF</th>
                            <th>Created At</th>
                            <th>Actions</th>
                        </tr>
                        {reports.map((report, key) => {
                            return (
                                <>
                                    <tr
                                        className={`default-table-rows ${report.id}`}
                                        key={report.id}
                                    >
                                        <td className="default-row-id">{report.id}</td>
                                        <td>
                                            <a href={`/reports/${report.slug}`}>{report.title}</a>
                                        </td>
                                        <td>{report.authors}</td>
                                        <td>{report.subject}</td>
                                        <td>{report.description}</td>
                                        <td>
                                            <a
                                                href={`${process.env.APP_PUBLIC_URL}${report.bannerImage}`}
                                                target="_blank"
                                            >
                                                Link
                                            </a>
                                        </td>
                                        <td>
                                            <a
                                                href={`${process.env.APP_PUBLIC_URL}${report.cardImage}`}
                                                target="_blank"
                                            >
                                                Link
                                            </a>
                                        </td>
                                        <td>
                                            <a
                                                href={`${process.env.APP_PUBLIC_URL}${report.fileLocation}`}
                                                target="_blank"
                                            >
                                                Link
                                            </a>
                                        </td>
                                        <td>{report.createdAt}</td>
                                        <td>
                                            <div className="default-buttons-container">
                                                <Button path={`/portal/edit/report/${report.slug}`}>
                                                    Edit
                                                </Button>
                                                <Button buttonStyle="btn--red">Delete</Button>
                                            </div>
                                        </td>
                                    </tr>
                                </>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default ViewEmails;
