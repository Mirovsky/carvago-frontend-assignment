import UserInfo from './UserInfo';
import Logo from './Logo';

export default function AuthorizedHeader() {
  return (
    <div className="py-10 mx-auto max-w-7xl flex flex-row justify-between">
      <div className="flex h-[32px]">
        <Logo />
      </div>
      <UserInfo />
    </div>
  );
}
