import { Task } from "../App"
import { Radio } from "../assets/Radio";
import { RadioFilled } from "../assets/RadioFilled";
import { Trash } from "../assets/Trash";

interface TaskCardProps {
    task: Task;
    onToggleDone: (task: Task) => void;
    onDelete: (task: Task) => void;
}


export function TaskCard({ task, onToggleDone, onDelete }: TaskCardProps) {
    const getDescriptionClass = () => {
        return task.done ? 'text-gray-300 line-through' : 'text-gray-100';
    }

    return (
        <div className="border border-gray-400 bg-gray-500 rounded-lg p-4 gap-3 shadow-md shadow-[#0000000f] flex">
            <button type="button" onClick={() => onToggleDone(task)}>
                {task.done ? <RadioFilled /> : <Radio />}
            </button>
            <span className={`text-sm flex-1 ${getDescriptionClass()}`}>{task.description}</span>
            <button type="button" onClick={() => onDelete(task)}>
                <Trash />
            </button>
        </div>
    )
}