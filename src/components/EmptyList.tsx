import IconLogo from '@assets/logo.svg?react';

export default function EmptyList() {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex h-[150px]">
        <IconLogo />
      </div>
      <h2 className="font-semibold text-primary text-xl">You are amazing!</h2>
      <p className="text-base text-secondary">There is no more tasks to do.</p>
    </div>
  );
}
