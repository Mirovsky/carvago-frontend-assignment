import UserForm from '../components/UserForm';

export default function RegisterPage() {
  return (
    <section className="mx-auto max-w-140 p-10 rounded-3xl bg-fill-white">
      <h1 className="mb-6 font-bold text-2xl">First time? Don't worry!</h1>

      <UserForm actionLabel="Register" />
    </section>
  );
}
