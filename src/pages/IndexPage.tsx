import TodoListHeader from '../components/TodoListHeader';
import TodosList from '../components/TodosList';

export default function IndexPage() {
  return (
    <section className="container-box">
      <TodoListHeader />
      <TodosList />
    </section>
  );
}
