import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import NavbarPublic from "@/components/layout/NavbarPublic";
import { FormInput } from "@/components/layout/FormInput";
import { Button } from "@/components/ui/Button";
import { Alert } from "@/components/feedback/Alert";
import { useBackNavigation } from "@/hooks/useBackNavigation";

type FormErrors = {
  email?: boolean;
  password?: boolean;
};

function LogInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAlert, setAlert] = useState(false);
  const [isError, setIsError] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const { goBack } = useBackNavigation();

  const emailTrue = "test@gmail.com";
  const passwordTrue = "test001";

  // ===== Form Validation =====
  // Responsibility: validate credentials and update error state
  function validate(): boolean {
    const nextErrors: FormErrors = {};

    if (email !== emailTrue) {
      nextErrors.email = true;
    }

    if (password !== passwordTrue) {
      nextErrors.password = true;
    }

    setIsError(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  // ===== Form Submission =====
  // Responsibility: prevent duplicate submit, validate credentials, and navigate back on success
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);

    if (!validate()) {
      setAlert(true);
      setIsSubmitting(false);
      return;
    }

    setIsSubmitting(false);
    goBack();
  }

  return (
    <div className="flex flex-col items-center">
      <NavbarPublic
        onLogin={() =>
          navigate("/login", {
            state: { from: "post" },
          })
        }
        onSignUp={() =>
          navigate("/signup", {
            state: { from: "post" },
          })
        }
      />

      <main
        className="
          flex flex-col items-center
          gap-[24px] md:gap-[40px]
          mt-[40px] md:mt-[60px]
          w-[344px] md:w-[798px]
          px-[16px] py-[40px]
          md:px-[120px] md:py-[60px]
          bg-brown-200
          rounded-[16px]
        "
      >
        <h1 className="text-headline-2 text-brown-600">Log in</h1>

        <form
          id="login-form"
          onSubmit={handleSubmit}
          className="flex flex-col gap-[24px] md:gap-[28px] w-full"
        >
          <FormInput
            label="Email"
            type="email"
            placeholder="Email"
            autoComplete="email"
            value={email}
            variant={isError.email ? "secondary" : "primary"}
            onChange={setEmail}
          />

          <FormInput
            label="Password"
            type="password"
            placeholder="Password"
            autoComplete="current-passwor"
            value={password}
            variant={isError.password ? "secondary" : "primary"}
            onChange={setPassword}
          />
        </form>

        <Button
          label="Log in"
          type="submit"
          variant="primary"
          form="login-form"
          width="w-[127px]"
          disabled={isSubmitting}
        />

        <footer className="flex gap-[12px] text-body-1">
          <span className="text-brown-400">Don’t have any account?</span>

          <Link to="/signup" className="text-brown-600 underline">
            Sign up
          </Link>
        </footer>
      </main>

      {isAlert && (
        <div className="fixed bottom-6 right-6 z-50 hidden md:flex">
          <Alert
            title="Your password is incorrect or this email doesn’t exist"
            description="Please try another password or email"
            variant="secondary"
            onClose={() => setAlert(false)}
            timeout={3000}
          />
        </div>
      )}
    </div>
  );
}

export default LogInPage;
 