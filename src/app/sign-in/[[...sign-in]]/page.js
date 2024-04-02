import { SignIn } from "@clerk/nextjs";
import "./sign-in.css";

export default function Page() {
  return (
    <>
      <div
        className="background-image"
        style={{
          backgroundImage: `url(${process.env.APP_PUBLIC_URL}/images/leeds-clocktower.jpg)`,
        }}
      >
        <div className="login-form-box">
          <SignIn />
        </div>
      </div>
    </>
  );
}
