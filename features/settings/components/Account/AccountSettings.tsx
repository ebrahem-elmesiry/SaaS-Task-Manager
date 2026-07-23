import SkillsSettings from "./SkillsSettings";
import AvatarUpload from "./AvatarUpload";
import ProfileFormFields from "./ProfileFormFields";
import useChangeInput from "@/features/settings/hooks/useChangeInput";
import { ActionButtons } from "@/features/shared/components/ActionButtons";
import { SettingsData } from "@/types/settings";

export function AccountSettings({ data }: { data: SettingsData }) {
  const accountData = {
    full_name: data.full_name,
    email: data.email,
    job_title: data.job_title,
    about: data.about,
    location: data.location,
  };

  const {
    accountDetail,
    handleChange,
    Loading,
    photo,
    setPhoto,
    handleSave,
    handleCancel,
  } = useChangeInput(accountData);

  return (
    <div className="space-y-6">
      <AvatarUpload
        name={data.full_name}
        photo={photo}
        setPhoto={setPhoto}
        avatar={data.avatar_url}
      />

      <ProfileFormFields
        accountDetail={accountDetail}
        handleChange={handleChange}
      />

      <SkillsSettings skills={data.skills ?? []} />

      <ActionButtons
        Loading={Loading}
        onSave={handleSave}
        onCancel={handleCancel}
      />
    </div>
  );
}
