import SingleTask from "./SingleTask"


const Task = ({tasks, onDelete, onToggle}) => {
    
    return (
<>
        {tasks.map(
            (task)=>(
                    <SingleTask task={task} key={task.id} onDelete={onDelete} onToggle={onToggle}></SingleTask>
                    )
        )}
</>
    )
}

export default Task
