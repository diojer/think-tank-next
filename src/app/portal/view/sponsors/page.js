import React from "react";
import { Button } from "@/components/Button";
import "../View.css";
import { Link } from "next/link";
import { index } from "@/lib/routes";
import { revalidateTag } from "next/cache";

async function ViewSponsors() {
  revalidateTag("/sponsors");
  const sponsors = await index("/sponsors");

  return (
    <>
      <div className="sponsor-view-wrapper upload-subwrapper">
        <p className="sponsor-view-heading upload-subheader">
          View/Edit Sponsors
        </p>
        <table className="default-table">
          <tbody>
            <tr className="default-table-headings">
              <th>ID</th>
              <th>Name</th>
              <th>Type</th>
              <th>Description</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
            {sponsors.map((sponsor, key) => {
              return (
                <tr className={`default-table-rows ${sponsor.id}`} key={key}>
                  <td className="default-row-id">{sponsor.id}</td>
                  <td>
                    <a href={`https://${sponsor.link}`} target="_blank">
                      {sponsor.name}
                    </a>
                  </td>
                  <td>{sponsor.type}</td>
                  <td>{sponsor.description}</td>

                  <td>
                    <a href={`${process.env.APP_PUBLIC_URL}${sponsor.image}`}>
                      Link
                    </a>
                  </td>
                  <td></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ViewSponsors;
