import UserForm from '../components/UserForm';

export default function RegisterPage() {
  return (
    <section className="container-box max-w-140">
      <h1 className="font-bold text-2xl">First time? Don't worry!</h1>

      <UserForm actionLabel="Register" />
    </section>
  );
}
