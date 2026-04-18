import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import PublicNavbar from "@/components/layout/PublicNavbar";
import { FormInput } from "@/components/layout/FormInput";
import { Button } from "@/components/ui/Button";
import { Alert } from "@/components/feedback/Alert";
import { useAuth } from "@/context/AuthenticationContext";
import { getPostLogoutAlert, type PostLogoutAlert } from "@/utils/postLogoutAlert";

type FormErrors = {
  email?: boolean;
  password?: boolean;
};

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [alert, setAlert] = useState<PostLogoutAlert | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isError, setIsError] = useState<FormErrors>({});

  const { login } = useAuth();

  useEffect(() => {
    const storedAlert = getPostLogoutAlert();

    if (storedAlert) {
      setAlert(storedAlert);
    }
  }, []);

  function showInvalidCredentialAlert() {
    setAlert({
      title: "Your password is incorrect or this email doesn't exist",
      description: "Please try another password or email",
      variant: "secondary",
    });
  }

  function validate(): boolean {
    const nextErrors: FormErrors = {};
    let hasError = false;

    if (!email.trim()) {
      hasError = true;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      hasError = true;
    }

    if (!password.trim()) {
      hasError = true;
    }

    if (hasError) {
      nextErrors.email = true;
      nextErrors.password = true;
    }

    setIsError(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);

    if (!validate()) {
      showInvalidCredentialAlert();
      setIsSubmitting(false);
      return;
    }

    try {
      const result = await login({ email, password });

      if (result?.error) {
        setIsError({
          email: true,
          password: true,
        });
        showInvalidCredentialAlert();
        return;
      }

      setIsError({});
      setAlert(null);
    } catch {
      setIsError({
        email: true,
        password: true,
      });
      showInvalidCredentialAlert();
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex flex-col items-center">
      <PublicNavbar />

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
          className="flex w-full flex-col gap-[24px] md:gap-[28px]"
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
            autoComplete="current-password"
            value={password}
            variant={isError.password ? "secondary" : "primary"}
            onChange={setPassword}
          />
        </form>

        <Button
          label="Log in"
          type="submit"
          form="login-form"
          variant="primary"
          width="w-[127px]"
          disabled={isSubmitting}
        />

        <footer className="flex gap-[12px] text-body-1">
          <span className="text-brown-400">Don't have any account?</span>

          <Link to="/signup" className="text-brown-600 underline">
            Sign up
          </Link>
        </footer>
      </main>

      {alert && (
        <div className="hidden md:flex fixed bottom-6 right-6 z-50">
          <Alert
            title={alert.title}
            description={alert.description}
            variant={alert.variant}
            onClose={() => setAlert(null)}
            timeout={3000}
          />
        </div>
      )}
    </div>
  );
}

export default LoginPage;
