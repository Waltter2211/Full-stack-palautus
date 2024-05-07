import './App.css';
import SingleTodo from './Todos/SingleTodo';
import TodoView from './Todos/TodoView'

function App() {
  return (
    <div className="App">
      <TodoView />
      <SingleTodo />
    </div>
  );
}

export default App;
