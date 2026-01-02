import Logo from './Logo';

export default function UnauthorizedHeader() {
  return (
    <div className="p-10 flex justify-center">
      <div className="flex h-[33px] sm:h-[67px]">
        <Logo />
      </div>
    </div>
  );
}
