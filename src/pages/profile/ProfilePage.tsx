import { useEffect, useState, type ChangeEvent } from "react";

import ProfileTemplate from "./ProfileTemplate";
import ProfileFormCard from "./profileSetting/ProfileFormCard";
import { Alert } from "@/components/feedback/Alert";

import { useAuth } from "@/context/AuthenticationContext";
import axios from "axios";

const DEFAULT_AVATAR = "https://cdn-icons-png.flaticon.com/512/149/149071.png";

function ProfilePage() {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const { state, fetchUser } = useAuth();

  const [isAlert, setIsAlert] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [profile, setProfile] = useState({
    image: DEFAULT_AVATAR,
    name: "",
    username: "",
    email: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    setProfile({
      image: state.user?.profilePic || DEFAULT_AVATAR,
      name: state.user?.name ?? "",
      username: state.user?.username ?? "",
      email: state.user?.email ?? "",
    });
  }, [state.user]);

  function handleNameChange(value: string) {
    setProfile((prev) => ({ ...prev, name: value }));
  }

  function handleUsernameChange(value: string) {
    setProfile((prev) => ({ ...prev, username: value }));
  }

  function handleEmailChange(value: string) {
    setProfile((prev) => ({ ...prev, email: value }));
  }

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

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!API_BASE_URL) return;
  
    setIsSaving(true);
    try {
      if (imageFile) {
        const formData = new FormData();
        formData.append("name", profile.name);
        formData.append("username", profile.username);
        formData.append("imageFile", imageFile);

        await axios.put(`${API_BASE_URL}/setting/profile`, formData);
      } else {
        await axios.put(`${API_BASE_URL}/setting/profile`, {
          name: profile.name,
          username: profile.username,
        });
      }
  
      setIsAlert(true);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Update profile failed:", error.response?.status, error.response?.data);
      } else {
        console.error("Update profile failed:", error);
      }
    } finally {
      setIsSaving(false);
      await fetchUser();
    }
  }

  return (
    <div className="flex flex-col">
      <ProfileTemplate
        component={
          <ProfileFormCard
            name={profile.name}
            setName={handleNameChange}
            username={profile.username}
            setUsername={handleUsernameChange}
            email={profile.email}
            setEmail={handleEmailChange}
            onSubmit={handleSubmit}
            userPicture={profile.image}
            onImageChange={handleFileChange}
            isSaving={isSaving}
          />
        }
      />

      {isAlert && (
        <div
          className="
            sticky bottom-2
            px-2
            z-50
            md:fixed md:bottom-6 md:right-6
          "
        >
          <Alert
            title="Saved profile"
            description="Your profile has been successfully updated"
            variant="primary"
            onClose={() => setIsAlert(false)}
            timeout={3000}
          />
        </div>
      )}
    </div>
  );
}

export default ProfilePage;
