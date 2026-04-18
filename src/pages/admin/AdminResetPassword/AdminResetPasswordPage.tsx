import { useState } from "react";
import axios from "axios";

import AdminSidebar from "@/components/Admin/AdminSidebar";
import { Alert } from "@/components/feedback/Alert";
import ConfirmDialog from "@/components/layout/ConfirmDialog";
import { useAuth } from "@/context/AuthenticationContext";
import { setPostLogoutAlert } from "@/utils/postLogoutAlert";

import AdminResetPasswordForm from "./AdminResetPasswordForm";

type FormErrors = {
  currentPassword?: boolean;
  newPassword?: boolean;
  confirmPassword?: boolean;
};

type Feedback = {
  title: string;
  description: string;
  variant: "primary" | "secondary";
};

function AdminResetPasswordPage() {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const { logout } = useAuth();

  const [isConfirm, setIsConfirm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isError, setIsError] = useState<FormErrors>({});
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  function validate() {
    const nextErrors: FormErrors = {};

    if (!currentPassword.trim()) {
      nextErrors.currentPassword = true;
    }

    if (!newPassword.trim() || newPassword.length < 6) {
      nextErrors.newPassword = true;
    }

    if (!confirmPassword.trim()) {
      nextErrors.confirmPassword = true;
    }

    if (newPassword !== confirmPassword) {
      nextErrors.newPassword = true;
      nextErrors.confirmPassword = true;
    }

    setIsError(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function handleReset() {
    if (!API_BASE_URL) {
      setFeedback({
        title: "Reset password failed",
        description: "API base URL is not configured",
        variant: "secondary",
      });
      setIsConfirm(false);
      return;
    }

    try {
      setIsSubmitting(true);

      await axios.patch(`${API_BASE_URL}/setting/reset-password`, {
        oldPassword: currentPassword,
        newPassword,
      });

      setPostLogoutAlert({
        title: "Password updated",
        description: "Your password has been updated. Please log in again.",
        variant: "primary",
      });
      window.localStorage.removeItem("token");
      window.location.assign("/admin/login");
      return;
    } catch (error) {
      let message = "Please try again later.";
      let isInvalidCurrentPassword = false;

      if (axios.isAxiosError<{ error?: string }>(error)) {
        message = error.response?.data?.error || message;
        isInvalidCurrentPassword = message.toLowerCase().includes("old password");
      }

      if (isInvalidCurrentPassword) {
        setIsError((prev) => ({
          ...prev,
          currentPassword: true,
        }));
      }

      setFeedback({
        title: "Reset password failed",
        description: message,
        variant: "secondary",
      });
    } finally {
      setIsSubmitting(false);
      setIsConfirm(false);
    }
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!validate()) return;

    setIsConfirm(true);
  }

  return (
    <div className="min-h-screen bg-brown-100">
      <div className="flex flex-row">
        <AdminSidebar onLogout={logout} end="/admin/reset-password" />

        <main className="flex-1">
          <AdminResetPasswordForm
            currentPassword={currentPassword}
            newPassword={newPassword}
            confirmPassword={confirmPassword}
            isError={isError}
            isSubmitting={isSubmitting}
            onCurrentPasswordChange={setCurrentPassword}
            onNewPasswordChange={setNewPassword}
            onConfirmPasswordChange={setConfirmPassword}
            onSubmit={handleSubmit}
          />
        </main>
      </div>

      {isConfirm && (
        <ConfirmDialog
          title="Reset password"
          description="Do you want to reset your password?"
          confirmLabel="Reset"
          cancelLabel="Cancel"
          onCancel={() => setIsConfirm(false)}
          onConfirm={() => {
            void handleReset();
          }}
        />
      )}

      {feedback && (
        <div className="fixed bottom-6 right-6 z-50 w-[580px]">
          <Alert
            title={feedback.title}
            description={feedback.description}
            variant={feedback.variant}
            onClose={() => setFeedback(null)}
            timeout={3000}
          />
        </div>
      )}
    </div>
  );
}

export default AdminResetPasswordPage;
