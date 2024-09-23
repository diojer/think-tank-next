import { Button } from "@/components/Button";
import { CookiesProvider } from "next-client-cookies/server";
import "./Portal.css";

export const metadata = {
  title: "LPI Admin Portal",
  description: "Leeds Policy Institute Admin Portal - View, Edit and Upload",
};

export default function portalLayout({ children }) {
  return (
    <>
      <div className="portal-wrapper">
        <p className="upload-buttons-header portal-header">Add a new...</p>
        <div className="upload-buttons">
          <Button path="/portal/upload/article">Article</Button>
          <Button path="/portal/upload/report">Report</Button>
          <Button path="/portal/upload/media/press-release">
            Press Release
          </Button>
          <Button path="/portal/upload/media/appearances">
            Media Appearance
          </Button>
          <Button path="/portal/upload/job">Job/Position</Button>
          <Button path="/portal/upload/about-us/team">Team Member</Button>
          <Button path="/portal/upload/sponsor">Sponsor</Button>
        </div>
        <p className="view-buttons-header portal-header">View/edit...</p>
        <div className="view-buttons">
          <Button path="/portal/view/articles">Articles</Button>
          <Button path="/portal/view/reports">Reports</Button>
          <Button path="/portal/view/media/press-releases">Press Releases</Button>
          <Button path="/portal/view/media/appearances">Media Appearances</Button>
          <Button path="/portal/view/emails">Mailing List</Button>
          <Button path="/portal/view/sponsors">Sponsors</Button>
          <Button path="/portal/view/users">Registered Users</Button>
        </div>
      </div>
      <hr></hr>
      <CookiesProvider>
        {children}
      </CookiesProvider>
    </>
  );
}
