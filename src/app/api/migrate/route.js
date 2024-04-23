import { NextResponse } from "next/server";

//models
import Posts from "@/app/models/Posts";
import Sponsors from "@/app/models/Sponsors";
import Reports from "@/app/models/Reports";
import Mailinglist from "@/app/models/Mailinglist";

export async function GET() {
  try {
    Posts.sync({ alter: true });
    Sponsors.sync({ alter: true });
    Reports.sync({ alter: true });
    Mailinglist.sync({ alter: true });
    return NextResponse.json(
      { message: "Migrated successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Migration failed" }, { status: 500 });
  }
}
