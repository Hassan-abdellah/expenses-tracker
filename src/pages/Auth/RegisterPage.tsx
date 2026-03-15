import { SignUp } from "@clerk/react";

const RegisterPage = () => {
  return (
    <section className="flex justify-center my-16">
      <SignUp
        forceRedirectUrl="/"
        signInUrl="/auth/sign-in"
        oauthFlow="popup"
      />
    </section>
  );
};

export default RegisterPage;
