import React from "react";
import { Label } from "@/components/ui/label";
import { AccountDetailsType } from "@/validation/profile.schema";
import InputField from "@/features/shared/components/controls/InputField";

interface Props {
  accountDetail: AccountDetailsType;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
}

export default function ProfileFormFields({
  accountDetail,
  handleChange,
}: Props) {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField
          label="Full Name"
          name="fullName"
          type="text"
          value={accountDetail.fullName}
          onChange={handleChange}
          placeholder="Enter your Full Name"
        />

        <InputField
          label="Email Address"
          name="email"
          type="email"
          value={accountDetail.email}
          onChange={handleChange}
          placeholder="Enter your Email"
        />

        <InputField
          label="Job Title"
          name="jobTitle"
          type="text"
          value={accountDetail.jobTitle}
          onChange={handleChange}
          placeholder="Enter your Jop Title"
        />
        <InputField
          label="Location"
          name="location"
          type="text"
          value={accountDetail.location}
          onChange={handleChange}
          placeholder="Type Your Location"
        />
      </div>

      {/* Bio */}
      <div className="mt-4">
        <Label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
          Bio
        </Label>

        <textarea
          name="bio"
          value={accountDetail.bio}
          onChange={handleChange}
          rows={4}
          className="w-full px-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
        />
      </div>
    </div>
  );
}
