import { useRef, type ChangeEvent } from "react";

import { FormInput } from "@/components/layout/FormInput";
import { Button } from "@/components/ui/Button";

type AdminProfileFormProps = {
  name: string;
  username: string;
  email: string;
  bio: string;
  userPicture: string;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onNameChange: (value: string) => void;
  onBioChange: (value: string) => void;
  onImageChange: (event: ChangeEvent<HTMLInputElement>) => void;
  isSaving?: boolean;
};

function AdminProfileForm({
  name,
  username,
  email,
  bio,
  userPicture,
  onSubmit,
  onNameChange,
  onBioChange,
  onImageChange,
  isSaving = false,
}: AdminProfileFormProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <section className="bg-brown-100">
      <header className="flex items-center justify-between border-b border-brown-300 bg-white px-[40px] py-[24px]">
        <h1 className="text-headline-3 text-brown-600">Profile</h1>

        <Button
          label={isSaving ? "Saving..." : "Save"}
          type="submit"
          form="admin-profile-form"
          variant="primary"
          width="w-[104px]"
          disabled={isSaving}
        />
      </header>

      <div className="px-[40px] py-[28px]">
        <form
          id="admin-profile-form"
          onSubmit={onSubmit}
          className="flex max-w-[688px] flex-col gap-[28px]"
        >
          <div className="flex items-center gap-[28px]">
            <img
              src={userPicture}
              alt={`${username} profile`}
              className="h-[120px] w-[120px] rounded-full object-cover"
            />

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={onImageChange}
              className="hidden"
            />

            <Button
              label="Upload profile picture"
              variant="secondary"
              width="w-[255px]"
              onClick={() => fileInputRef.current?.click()}
              disabled={isSaving}
            />
          </div>

          <div className="h-px w-[316px] bg-brown-300" />

          <FormInput
            label="Name"
            value={name}
            variant="primary"
            onChange={onNameChange}
          />

          <FormInput
            label="Username"
            value={username}
            variant="readonly"
            readonly
            onChange={() => undefined}
          />

          <FormInput
            label="Email"
            value={email}
            variant="readonly"
            readonly
            onChange={() => undefined}
          />

          <div className="flex flex-col gap-[4px]">
            <label className="text-body-1 text-brown-400">
              Bio (max 120 letters)
            </label>

            <textarea
              value={bio}
              maxLength={120}
              onChange={(event) => onBioChange(event.target.value)}
              className="
                min-h-[120px] w-full rounded-[8px] border border-brown-300 bg-white
                px-[16px] py-[12px] text-body-1 text-brown-500 outline-none
                focus:border-brown-600
              "
            />

            <div className="text-right text-body-3 text-brown-400">
              {bio.length}/120
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

export default AdminProfileForm;
