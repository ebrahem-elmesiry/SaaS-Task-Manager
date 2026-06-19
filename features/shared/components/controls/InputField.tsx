import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Props = {
  label: string;
  name: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
  labelClass?: string;
  labelRight?: React.ReactNode;
};

export default function InputField({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder,
  labelClass,
  labelRight,
}: Props) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <Label
          className={`${labelClass} block text-sm font-medium text-slate-700 dark:text-slate-300`}
        >
          {label}
        </Label>

        {labelRight}
      </div>

      <Input
        name={name}
        value={value}
        onChange={onChange}
        type={type}
        placeholder={placeholder}
      />
    </div>
  );
}
