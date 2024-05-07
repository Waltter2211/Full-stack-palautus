import { useState } from 'react'

function SingleTodo() {
    const [todoState, setTodoState] = useState('not done')

    const completeTodo = () => {
        setTodoState('completed')
    }

    const uncompleteTodo = () => {
        setTodoState('not done')
    }

  return (
    <div data-testid="todo-1" style={{display: 'flex', justifyContent: 'space-around'}}>
        <p>Todo text</p>
        <p>{todoState}</p>
        {todoState === 'not done'
        ? <button onClick={completeTodo}>Complete</button>
        : <button onClick={uncompleteTodo}>Uncomplete</button>}
    </div>
  )
}

export default SingleTodo