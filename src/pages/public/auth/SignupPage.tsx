import { useState } from "react";
import { useAuth } from "@/context/AuthenticationContext";
import { Link } from "react-router-dom";

import PublicNavbar from "@/components/layout/PublicNavbar";
import { FormInput } from "@/components/layout/FormInput";
import { Button } from "@/components/ui/Button";

type FormErrors = {
  name?: string;
  username?: string;
  email?: string;
  password?: string;
};

function SignUpPage() {
  // ===== Form State =====
  const { register } = useAuth();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ===== UI / Validation State =====
  const [isError, setIsError] = useState<FormErrors>({});
  const [notValid, setNotValid] = useState(false);
  const [isPasswordTooShort, setIsPasswordTooShort] = useState(false);

  // ===== Form Validation =====
  // Responsibility: validate input values and update error-related states
  function validate(): boolean {
    const nextErrors: FormErrors = {};
    const emailPattern =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!name.trim()) {
      nextErrors.name = "Please enter full name";
    }

    if (!username.trim()) {
      nextErrors.username = "Please enter username";
    }

    if (!email.trim()) {
      nextErrors.email = "Please enter email";
    } else if (!emailPattern.test(email)) {
      setNotValid(true);
    } else {
      setNotValid(false);
    }

    if (!password.trim()) {
      nextErrors.password = "Please enter password";
    } else if (password.length <= 6) {
      setIsPasswordTooShort(true);
    } else {
      setIsPasswordTooShort(false);
    }

    setIsError(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  // ===== Form Submission =====
  // Responsibility: validate form and switch to registration success state
  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (!validate()) return;

    const formValues = {
      name,
      username,
      email,
      password,
    };

    const result = await register(formValues);

    if (result?.error) {
      const nextErrors: FormErrors = {};

      if (result.error.toLowerCase().includes("email")) {
        nextErrors.email = "Email already exists";
      }

      if (result.error.toLowerCase().includes("username")) {
        nextErrors.username = "Username already exists";
      }

      setIsError(nextErrors);
      return;
    }
  }


  return (
    <div className="flex flex-col items-center">
      <PublicNavbar/>
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
        <h1 className="w-full text-headline-2 text-center text-brown-600">
          Sign up
        </h1>

        <form
          id="signup-form"
          onSubmit={handleSubmit}
          className="flex flex-col gap-[24px] md:gap-[28px] w-full"
        >
          <FormInput
            label="Name"
            placeholder={isError.name ?? "Full Name"}
            value={name}
            onChange={setName}
            variant={isError.name ? "secondary" : "primary"}
            autoComplete="name"
          />

          <FormInput
            label="Username"
            placeholder={isError.username ?? "Username"}
            value={username}
            onChange={setUsername}
            variant={isError.username ? "secondary" : "primary"}
            autoComplete="username"
          />

          <div className="flex flex-col gap-[4px]">
            <FormInput
              label="Email"
              type="text"
              placeholder={isError.email ?? "Email"}
              value={email}
              onChange={setEmail}
              variant={
                isError.email || notValid
                  ? "secondary"
                  : "primary"
              }
              autoComplete="email"
            />

            {notValid && (
              <span className="text-body-3 text-brand-red">
                Email must be a valid email
              </span>
            )}
          </div>

          <div className="flex flex-col gap-[4px]">
            <FormInput
              label="Password"
              type="password"
              placeholder={isError.password ?? "Password"}
              value={password}
              onChange={setPassword}
              variant={isError.password ? "secondary" : "primary"}
              autoComplete="current-password"
            />

            {isPasswordTooShort && (
              <span className="text-body-3 text-brand-red">
                Password must be at least 6 characters
              </span>
            )}
          </div>
        </form>

        <div className="flex justify-center">
          <Button
            label="Sign up"
            type="submit"
            form="signup-form"
            variant="primary"
            width="w-[141px]"
          />
        </div>

        <footer className="flex justify-center gap-[12px] text-body-1">
          <span className="text-brown-400">
            Already have an account?
          </span>

          <Link
            to="/login"
            className="text-brown-600 underline"
          >
            Log in
          </Link>
        </footer>
      </main>
    </div>
  );
}

export default SignUpPage;
