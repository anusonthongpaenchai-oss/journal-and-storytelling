import { useState } from "react";

import ProfileTemplate from "./ProfileTemplate";
import ProfileFormCard from "./profileSetting/ProfileFormCard";
import { Alert } from "@/components/feedback/Alert";

import { profileData } from "@/lib/mocks/dataProfile";

function ProfilePage() {
  const [isAlert, setIsAlert] = useState(false);
  const [name, setName] = useState(profileData.name);
  const [username, setUsername] = useState(profileData.username);
  const [email, setEmail] = useState(profileData.email);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsAlert(true);
  }

  return (
    <div className="flex flex-col">
      <ProfileTemplate
        component={
          <ProfileFormCard
            name={name}
            setName={setName}
            username={username}
            setUsername={setUsername}
            email={email}
            setEmail={setEmail}
            onSubmit={handleSubmit}
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
