import { useState } from "react";
import { FormInput } from "@/components/layout/FormInput";
import NavbarPublic from "@/components/layout/NavbarPublic";
import { Link } from "react-router-dom"; 4
import Registration from "./Signup/Registration";
import { Button } from "@/components/ui/Button";

function SignUpPage() {
    const [fullName, setFullName] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [registration, setRegistration] = useState<boolean>(false)
    const [isError, setIsError] = useState<FormErrors>({});
    const [isPasswordTooShort, setIsPasswordTooShort] = useState<boolean>(false)

    type FormErrors = {
        fullName?: string;
        username?: string;
        email?: string;
        password?: string;
    };

    function validate(): boolean {
        const nextErrors: FormErrors = {};
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!fullName.trim()) {
            nextErrors.fullName = "Please enter full name";
        }

        if (!username.trim()) {
            nextErrors.username = "Please enter username";
        }

        if (!email.trim()) {
            nextErrors.email = "Please enter email";
        } else if (!emailPattern.test(email)) {
            nextErrors.email = "Invalid email format";
        }

        if (!password.trim()) {
            nextErrors.password = "Please enter password";
        } else if (password.length <= 6) {
            setIsPasswordTooShort(true)
        } else {
            setIsPasswordTooShort(false)
        }

        setIsError(nextErrors);
        return Object.keys(nextErrors).length === 0;
    }


    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const isValidate = validate()
        if (!isValidate) return;
        setRegistration(true)
    }

    return (
        <div className="flex flex-col items-center">
            <NavbarPublic />
            {/* Form */}

            <div className="flex flex-col items-center mt-[60px] bg-brown-200 
                rounded-[16px] px-[120px] py-[60px] gap-[40px] w-[798px]">

                {/* Title */}
                <h1 className="text-headline-2 text-center text-brown-600">
                    Sign up
                </h1>
                {!registration ?
                    <form
                        id='signup-form'
                        onSubmit={handleSubmit}
                        className="
                    flex flex-col gap-[28px]
                    w-full
                "
                    >

                        {/* Fields */}
                        <div className="flex flex-col gap-4">
                            <div>
                                <FormInput
                                    label="Name"
                                    placeholder={isError.fullName ?? "Full Name"}
                                    value={fullName}
                                    onChange={setFullName}
                                    variant={isError.fullName ? "secondary" : "primary"}
                                    autoComplete="name"
                                />
                            </div>


                            <div>
                                <FormInput
                                    label="Username"
                                    placeholder={isError.username ?? "Username"}
                                    value={username}
                                    onChange={setUsername}
                                    variant={isError.username ? "secondary" : "primary"}
                                    autoComplete="username"
                                />
                            </div>


                            <div>
                                <FormInput
                                    label="Email"
                                    type="email"
                                    placeholder={isError.email ?? "Email"}
                                    value={email}
                                    onChange={setEmail}
                                    variant={isError.email ? "secondary" : "primary"}
                                    autoComplete="email"
                                />
                            </div>

                            <div className="flex flex-col gap-[4px]">
                                <FormInput
                                    label="Password"
                                    type="password"
                                    placeholder={isError.password ?? "Password"}
                                    autoComplete="current-password"
                                    value={password}
                                    onChange={setPassword}
                                    variant={isError.password ? "secondary" : "primary"}
                                />
                                {isPasswordTooShort && (
                                    <span className="text-body-3 text-brand-red">Password must be at least 6 characters</span>
                                )}
                            </div>



                        </div>
                    </form>
                    :
                    <div className="flex justify-center mt-[60px]">
                        <Registration />
                    </div>
                }

                {/* Submit Button */}
                <div className="flex justify-center items-center">
                    <Button label='Sign up' width='w-[141px]' variant="primary" type="submit" form="signup-form" />
                </div>

                {/* Footer */}
                <div className="flex gap-[12px] text-gray-600 justify-center">
                    <span className="text-body-1 text-brown-400"> Already have an account? </span>
                    <Link
                        to='/login'
                        className="text-body-1 underline text-brown-600"
                    >
                        Log in
                    </Link>
                </div>
            </div>

        </div>
    );
}

export default SignUpPage;