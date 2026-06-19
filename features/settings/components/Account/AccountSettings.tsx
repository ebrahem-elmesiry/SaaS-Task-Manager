import SkillsSettings from "./SkillsSettings";
import AvatarUpload from "./AvatarUpload";
import ProfileFormFields from "./ProfileFormFields";
import { AccountDetailsType } from "@/validation/profile.schema";
import { toast } from "sonner";
import { useState } from "react";
import useChangeInput from "@/features/settings/hooks/useChangeInput";
import { ActionButtons } from "@/features/shared/components/ActionButtons";

export function AccountSettings({
  accountData,
  skillsProp,
  avatar,
}: {
  accountData: AccountDetailsType;
  skillsProp: string[];
  avatar: string;
}) {
  // Get Data By Hook
  const {
    accountDetail,
    handleChange,
    submitAccountDetails,
    Loading,
    photo,
    setPhoto,
    mutate,
  } = useChangeInput(accountData);
  const [skills, setSkills] = useState<string[]>(skillsProp);
  const handleSave = async () => {
    const res = await submitAccountDetails();
    if (!res.success) {
      toast.error(res.message);
      return;
    }
    mutate(accountDetail);
  };

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <AvatarUpload
        name={accountData.fullName}
        photo={photo}
        setPhoto={setPhoto}
        avatar={avatar}
      />

      <ProfileFormFields
        accountDetail={accountDetail}
        handleChange={handleChange}
      />

      {/* Skills */}
      <SkillsSettings skills={skills} setSkills={setSkills} />

      <ActionButtons Loading={Loading} onSave={handleSave} />
    </div>
  );
}
