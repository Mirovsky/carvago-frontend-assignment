type InputProps = {
  id: string;
  label: string;
  type: 'text' | 'password';
  defaultValue?: string;
  required: boolean;
};

export default function Input({id, label, type, defaultValue, required}: InputProps) {
  return (
    <label className="flex flex-col">
      <span className="mb-1 text-secondary">
        {required && <span className="text-danger">*</span>} {label}
      </span>
      <input
        name={id}
        className="px-4 py-3 text-primary input-border"
        type={type}
        required
        autoComplete={id}
        defaultValue={defaultValue}
      />
    </label>
  );
}
