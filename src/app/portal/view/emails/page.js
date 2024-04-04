import React from "react";
import { Button } from "@/components/Button";
import "../View.css";
import { Link } from "next/link";
import { index } from "@/lib/routes";

async function ViewEmails() {
  const emails = await index("/mailinglist");

  //sorting function

  function emailDelete(email) {
    if (
      !window.confirm(
        "Are you sure you want to remove this email from the list?"
      )
    ) {
      return;
    } else {
      //delete email
    }
  }

  function copyEmail(email) {
    navigator.clipboard.writeText(email);
  }
  function copyAllEmails() {
    let mailinglist = "";
    let delimiter = "\n";
    for (let i = 0; i < emails.length - 1; i++) {
      mailinglist = mailinglist + emails[i].email + delimiter;
    }
    mailinglist = mailinglist + emails[emails.length - 1].email;
    navigator.clipboard.writeText(mailinglist);
  }

  return (
    <>
      <div className="email-view-wrapper upload-subwrapper">
        <p className="email-view-heading upload-subheader">
          View/Edit Mailing List
        </p>
        {
          <div className="email-copy-all">
            <Button
              buttonStyle="btn--blue"
              onClick={(e) => {
                copyAllEmails();
              }}
            >
              Copy all emails
            </Button>
          </div>
        }

        <table className="default-table">
          <tr className="default-table-headings">
            <th>ID</th>
            <th>Email</th>
            <th>Created on</th>
            <th>Actions</th>
          </tr>
          {loading && (
            <tr className="default-row-loading">
              <p>Loading...</p>
            </tr>
          )}
          {emails.map((email, key) => {
            return (
              <>
                <tr className={`default-table-rows ${email.id}`} key={key}>
                  <td className="default-row-id">{email.id}</td>
                  <td className="default-row-email">
                    <a href={`mailto:${email.email}`}>{email.email}</a>
                  </td>
                  <td className="default-row-date">{email.created_at}</td>
                  <td className="email-row-buttons default-row-buttons">
                    <div className="default-buttons-container">
                      <Button
                        onClick={(e) => {
                          copyEmail(email.email);
                        }}
                        buttonStyle="btn--blue"
                      >
                        Copy
                      </Button>
                      <Button
                        buttonStyle="btn--red"
                        onClick={(e) => {
                          emailDelete(email);
                        }}
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              </>
            );
          })}
        </table>
      </div>
    </>
  );
}

export default ViewEmails;
