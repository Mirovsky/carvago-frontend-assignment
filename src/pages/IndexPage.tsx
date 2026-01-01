import TodoListHeader from '../components/TodoListHeader';
import TodosList from '../components/TodosList';

export default function IndexPage() {
  return (
    <section className="mx-auto mx-w-140 flex flex-col gap-10 p-10 rounded-3xl bg-fill-white">
      <TodoListHeader />
      <TodosList />
    </section>
  );
}
