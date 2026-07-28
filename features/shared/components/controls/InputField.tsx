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
  disabled?: boolean;
  required?: boolean;
  ariaDescribedBy?: string;
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
  disabled,
  required,
  ariaDescribedBy,
}: Props) {
  const inputId = `field-${name}`;
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <Label
          htmlFor={inputId}
          className={`${labelClass} block text-sm font-medium text-slate-700 dark:text-slate-300`}
        >
          {label}
        </Label>

        {labelRight}
      </div>

      <Input
        id={inputId}
        name={name}
        value={value}
        onChange={onChange}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        aria-required={required ? "true" : undefined}
        aria-describedby={ariaDescribedBy}
      />
    </div>
  );
}
