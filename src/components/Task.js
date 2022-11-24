import {FaTimes, FaExclamation} from 'react-icons/fa'

const Task = ({task, onDelete, onToggle}) => {
  return (
    <div className = {`task ${task.reminder ? 'reminder' : ''}`}>
        <h3>
          {task.text}
          <FaTimes style={{color: 'red', cursor:'pointer'}} onClick={() => onDelete(task.id)}/>
          <FaExclamation style={{cursor:'pointer'}} onClick={() => onToggle(task.id)}/>
        </h3>
        <p>{task.day}</p>
    </div>
  )
}

export default Task