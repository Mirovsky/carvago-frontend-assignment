import UserInfo from './UserInfo';
import Logo from './Logo';

export default function AuthorizedHeader() {
  return (
    <div className="py-10 flex flex-row justify-between">
      <div className="flex h-[32px]">
        <Logo />
      </div>
      <UserInfo />
    </div>
  );
}
