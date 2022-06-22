import { PlusCircle } from 'phosphor-react'
import { ChangeEvent, FormEvent, useState } from 'react'
import { Clipboard } from './assets/Clipboard';
import { Logo } from './assets/Logo'
import { TaskCard } from './components/TaskCard';
import './styles/global.css'

export interface Task {
  id: string;
  description: string;
  done: boolean;
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');

  const doneTasks = tasks.length ? `${tasks.filter(x => x.done).length} de ${tasks.length}` : '0';

  const handleSubmitForm = (e: FormEvent) => {
    e.preventDefault();
    setTasks(prev => ([...prev, {
      id: Math.floor(Math.random() * 101).toString(),
      description: newTask,
      done: false
    }]));
    setNewTask('');
  }

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTask(e.target.value);
  }

  const handleToggleDone = (task: Task) => {
    setTasks(prev => (prev.map(x => x.id === task.id ? { ...task, done: !task.done } : x)))
  }

  const handleDelete = (task: Task) => {
    setTasks(prev => (prev.filter(x => x.id !== task.id)))
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-600">
      <header className="h-[200px] bg-gray-700 flex justify-center items-center">
        <Logo />
      </header>
      <main className="max-w-3xl w-full mx-auto">
        <form onSubmit={handleSubmitForm} className="flex gap-2 mt-[-29px]">
          <input 
            className="flex-1 bg-gray-500 border border-gray-700 rounded-lg placeholder:text-gray-300 p-4 text-gray-300" 
            placeholder="Adicione uma nova tarefa"
            value={newTask}
            onChange={handleOnChange}
          />
          <button disabled={!newTask} type="submit" className='bg-blue-700 flex justify-center items-center p-4 rounded-lg gap-2 text-white text-sm disabled:opacity-75 disabled:bg-gray-300 disabled:cursor-not-allowed'>
            <span className="font-bold">Criar</span>
            <PlusCircle size={16} weight="bold" className='relative top[2px]' />
          </button>
        </form>

        <div className="mt-16">
          <header className="flex justify-between">
            <span className="text-blue-500 text-sm font-bold">
              Tarefas criadas
              <div className="ml-2 inline bg-gray-400 px-2 py-[2px] rounded-[999px] text-xs text-gray-200">{tasks.length}</div>
            </span>

            <span className="text-purple-500 text-sm font-bold">
              Concluídas
              <div className="ml-2 inline bg-gray-400 px-2 py-[2px] rounded-[999px] text-xs text-gray-200">{doneTasks}</div>
            </span>
          </header>
        </div>

        <div className="mt-6">
          {
            tasks.length ? 
              <div className='flex flex-col gap-3'>
                {tasks.map(task => (
                  <TaskCard 
                    key={task.id} 
                    task={task} 
                    onToggleDone={handleToggleDone}
                    onDelete={handleDelete}
                  />
                ))}
              </div> : (
                <div className="flex flex-col justify-center items-center text-gray-300 py-16 px-6 rounded-lg border-t border-gray-400">
                  <Clipboard />
                  <strong className="mt-4">Você ainda não tem tarefas cadastradas</strong>
                  <span>Crie tarefas e organize seus itens a fazer</span>
                </div>
              )
          }
        </div>
      </main>
    </div>
  )
}

export default App
