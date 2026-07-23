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
          name="full_name"
          type="text"
          value={accountDetail.full_name}
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
          name="job_title"
          type="text"
          value={accountDetail.job_title ?? ""}
          onChange={handleChange}
          placeholder="Enter your Jop Title"
        />
        <InputField
          label="Location"
          name="location"
          type="text"
          value={accountDetail.location ?? ""}
          onChange={handleChange}
          placeholder="Type Your Location"
        />
      </div>

      {/* About */}
      <div className="mt-4">
        <Label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
          About
        </Label>

        <textarea
          name="about"
          value={accountDetail.about || ""}
          onChange={handleChange}
          placeholder="Write Your About"
          rows={4}
          className="w-full px-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
        />
      </div>
    </div>
  );
}
