import IconCheck from '@assets/icons/icon-check.svg?react';

type CheckboxProps = {
  id: string;
  defaultChecked: boolean | undefined;
  onChange?: (e: React.ChangeEvent) => void;
  children?: React.ReactNode;
};

export default function Checkbox({id, defaultChecked, onChange, children}: CheckboxProps) {
  return (
    <label className="pl-12 relative group leading-10 h-10 flex cursor-pointer">
      <input
        type="checkbox"
        name={id}
        className="peer sr-only"
        defaultChecked={defaultChecked}
        onChange={onChange}
      />

      <span className="absolute top-1 left-0 w-8 h-8 bg-white border-2 border-gray rounded-full group-hover:border-brand group-hover:ring-4 group-hover:ring-brand/20 peer-checked:border-brand peer-checked:bg-brand"></span>
      <span className="absolute top-3 left-2 w-4 h-4 text-white hidden pointer-events-none peer-checked:block">
        <IconCheck />
      </span>

      {children}
    </label>
  );
}
