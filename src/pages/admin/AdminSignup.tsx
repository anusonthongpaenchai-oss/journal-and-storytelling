import { useState } from "react";
import { Link } from "react-router-dom";

import PublicNavbar from "@/components/layout/PublicNavbar";
import { FormInput } from "@/components/layout/FormInput";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/context/AuthenticationContext";

type FormErrors = {
  name?: string;
  username?: string;
  email?: string;
  password?: string;
};

function AdminSignup() {
  const { register } = useAuth();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isError, setIsError] = useState<FormErrors>({});
  const [notValid, setNotValid] = useState(false);
  const [isPasswordTooShort, setIsPasswordTooShort] = useState(false);

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

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!validate()) return;

    const formValues = {
      name,
      username,
      email,
      password,
    };

    const result = await register(formValues, {
      role: "admin",
      successRedirectTo: "/admin/register/success",
    });

    if (result?.error) {
      const nextErrors: FormErrors = {};

      if (result.error.toLowerCase().includes("email")) {
        nextErrors.email = "Email already exists";
      }

      if (result.error.toLowerCase().includes("username")) {
        nextErrors.username = "Username already exists";
      }

      setIsError(nextErrors);
    }
  }

  return (
    <div className="flex flex-col items-center">
      <PublicNavbar />

      <main
        className="
          mt-[60px] flex w-[798px] flex-col items-center gap-[40px]
          rounded-[16px] bg-brown-200 px-[120px] py-[30px]
        "
      >
        <div className="flex flex-col items-center gap-[8px]">
          <h4 className="text-headline-4 text-orange">Admin</h4>
          <h2 className="text-headline-2 text-brown-600">Sign up</h2>
        </div>

        <form
          id="admin-signup-form"
          onSubmit={handleSubmit}
          className="flex w-full flex-col gap-[28px]"
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
              placeholder={isError.email ?? "Admin email"}
              value={email}
              onChange={setEmail}
              variant={isError.email || notValid ? "secondary" : "primary"}
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
            form="admin-signup-form"
            variant="primary"
            width="w-[141px]"
          />
        </div>

        <footer className="flex justify-center gap-[12px] text-body-1">
          <span className="text-brown-400">Already have an account?</span>

          <Link to="/admin/login" className="text-brown-600 underline">
            Log in
          </Link>
        </footer>
      </main>
    </div>
  );
}

export default AdminSignup;
