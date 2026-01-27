import { Button } from "@/components/ui/Button";
import { FormInput } from "@/components/layout/FormInput";
import { profileData } from "@/lib/mocks/dataProfile";

type ProfileFormCardProps = {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  name: string;
  setName: (value: string) => void;
  username: string;
  setUsername: (value: string) => void;
  email: string;
  setEmail: (value: string) => void;
};

function ProfileFormCard({
  onSubmit,
  name,
  setName,
  username,
  setUsername,
  email,
  setEmail,
}: ProfileFormCardProps) {
  return (
    <div
      className="
        flex flex-col
        gap-[24px] md:gap-[40px]
        px-[16px] pt-[24px] pb-[40px]
        w-[375px]
        bg-brown-200
        md:w-[550px]
        md:p-[40px]
        md:rounded-[16px]
      "
    >
      <div className="flex flex-col items-center gap-[28px] md:flex-row">
        <img
          src={profileData.avatarUrl}
          alt={profileData.username}
          className="
            w-[120px] h-[120px]
            rounded-full
          "
        />

        <Button
          label="Upload profile picture"
          variant="secondary"
          width="w-[255px]"
        />
      </div>

      <div className="w-full h-px bg-brown-300" />

      <form
        id="save-form"
        onSubmit={onSubmit}
        className="flex flex-col gap-[28px]"
      >
        <FormInput
          label="Name"
          value={name}
          variant="primary"
          onChange={setName}
        />

        <FormInput
          label="Username"
          value={username}
          variant="primary"
          onChange={setUsername}
        />

        <FormInput
          label="Email"
          value={email}
          variant="readonly"
          readonly
          onChange={setEmail}
        />
      </form>

      <div className="flex justify-start">
        <Button
          label="Save"
          type="submit"
          form="save-form"
          variant="primary"
          width="w-[120px]"
        />
      </div>
    </div>
  );
}

export default ProfileFormCard;
