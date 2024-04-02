import React from "react";
import { Button } from "@/components/Button";
import "./Upload.css";

export default function uploadLayout({ children }) {
  return (
    <>
      <div className="upload-wrapper">
        <p className="upload-buttons-header upload-header">Add a new...</p>
        <div className="upload-buttons">
          <Button path="upload/article">Article</Button>
          <Button path="upload/report">Report</Button>
          <Button path="upload/media/press-release">Press Release</Button>
          <Button path="upload/media/appearance">Media Appearance</Button>
          <Button path="upload/job">Job/Position</Button>
          <Button path="upload/about-us/team">Team Member</Button>
          <Button path="upload/sponsor">Sponsor</Button>
        </div>
        <p className="view-buttons-header upload-header">View/edit...</p>
        <div className="view-buttons">
          <Button path="view/articles">Articles</Button>
          <Button path="view/emails">Mailing List</Button>
          <Button path="view/sponsors">Sponsors</Button>
          <Button path="view/users">Registered Users</Button>
        </div>
      </div>
      <hr></hr>
      {children}
    </>
  );
}
