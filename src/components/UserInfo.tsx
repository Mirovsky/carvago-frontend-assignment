import {useMeQuery} from '../queries/me';

export default function UserInfo() {
  const me = useMeQuery();

  return (
    <div className="flex flex-row items-center gap-2">
      <div className="w-6 h-6 bg-gray-800 rounded-full"></div>
      <span className="hidden h-6 text-primary sm:block">{me.data?.username}</span>
    </div>
  );
}
