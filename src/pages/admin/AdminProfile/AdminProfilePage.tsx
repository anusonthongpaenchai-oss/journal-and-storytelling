import { useEffect, useState, type ChangeEvent } from "react";
import axios from "axios";

import AdminSidebar from "@/components/Admin/AdminSidebar";
import { Alert } from "@/components/feedback/Alert";
import { useAuth } from "@/context/AuthenticationContext";

import AdminProfileForm from "./AdminProfileForm";

const DEFAULT_AVATAR = "https://cdn-icons-png.flaticon.com/512/149/149071.png";

function AdminProfilePage() {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const { state, fetchUser, logout } = useAuth();

  const [isSaving, setIsSaving] = useState(false);
  const [successAlert, setSuccessAlert] = useState<null | {
    title: string;
    description: string;
  }>(null);
  const [profile, setProfile] = useState({
    image: DEFAULT_AVATAR,
    name: "",
    username: "",
    email: "",
    bio: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    setProfile({
      image: state.user?.profilePic || DEFAULT_AVATAR,
      name: state.user?.name ?? "",
      username: state.user?.username ?? "",
      email: state.user?.email ?? "",
      bio: state.user?.bio ?? "",
    });
  }, [state.user]);

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    if (!allowedTypes.includes(file.type)) return;

    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) return;

    setImageFile(file);
    setProfile((prev) => ({
      ...prev,
      image: URL.createObjectURL(file),
    }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!API_BASE_URL || profile.bio.length > 120) return;

    setIsSaving(true);

    try {
      if (imageFile) {
        const formData = new FormData();
        formData.append("name", profile.name);
        formData.append("username", profile.username);
        formData.append("bio", profile.bio);
        formData.append("imageFile", imageFile);

        await axios.put(`${API_BASE_URL}/setting/profile`, formData);
      } else {
        await axios.put(`${API_BASE_URL}/setting/profile`, {
          name: profile.name,
          username: profile.username,
          bio: profile.bio,
        });
      }

      await fetchUser();
      setImageFile(null);
      setSuccessAlert({
        title: "Saved profile",
        description: "Your profile has been successfully updated",
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Update admin profile failed:", error.response?.status, error.response?.data);
      } else {
        console.error("Update admin profile failed:", error);
      }
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="min-h-screen bg-brown-100">
      <div className="flex flex-row">
        <AdminSidebar onLogout={logout} end="/admin/profile" />

        <main className="flex-1">
          <AdminProfileForm
            name={profile.name}
            username={profile.username}
            email={profile.email}
            bio={profile.bio}
            userPicture={profile.image}
            onSubmit={handleSubmit}
            onNameChange={(value) => setProfile((prev) => ({ ...prev, name: value }))}
            onBioChange={(value) => setProfile((prev) => ({ ...prev, bio: value }))}
            onImageChange={handleFileChange}
            isSaving={isSaving}
          />
        </main>
      </div>

      {successAlert && (
        <div className="fixed bottom-6 right-6 z-50 w-[580px]">
          <Alert
            title={successAlert.title}
            description={successAlert.description}
            variant="primary"
            onClose={() => setSuccessAlert(null)}
            timeout={3000}
          />
        </div>
      )}
    </div>
  );
}

export default AdminProfilePage;
