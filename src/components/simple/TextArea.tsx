type TextAreaProps = {
  id: string;
  label: string;
  defaultValue?: string;
  required?: boolean;
};

export default function TextArea({id, label, required}: TextAreaProps) {
  return (
    <label className="flex flex-col">
      <span className="mb-1 text-secondary">
        {required && <span className="text-danger">*</span>} {label} {!required && '(Optional)'}
      </span>
      <textarea
        name={id}
        className="px-4 py-3 h-25 text-primary input-border"
        required={required}
        autoComplete={id}
      />
    </label>
  );
}
