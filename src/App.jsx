import { useState, useEffect } from 'react';
import AddTaskButton from './Components/addTaskButton';
import AdmitTaskButton from './Components/admitButton';
import SetTimeOut from './Components/SetTimeOut';
import './App.css';

function App() {
  const [pendingTasks, setPendingTasks] = useState([]);
  const [highPriority, setHighPriority] = useState([]);
  const [regularQueue2, setRegularQueue2] = useState([]);
  const [regularQueue3, setRegularQueue3] = useState([]);
  const [regularQueue4, setRegularQueue4] = useState([]);
  const [taskDurations, setTaskDurations] = useState({});
  const [activeQueue, setActiveQueue] = useState({
    highPriority: null,
    regularQueue2: null,
    regularQueue3: null,
    regularQueue4: null,
  });

  const handleGenerateNumbers = () => {
    const newNumber = {
      number: Math.floor(Math.random() * 100),
      color: Math.random() > 0.5 ? 'white' : 'red'
    };
    setPendingTasks((prev) => [...prev, newNumber]);
  };

  const handleAdmitTask = () => {
    if (pendingTasks.length > 0) {
      const taskToAdmit = pendingTasks[0];
      const admittedTask = { ...taskToAdmit, admittedAt: Date.now() };
      setPendingTasks((prev) => prev.slice(1));

      if (taskToAdmit.color === 'red') {
        setHighPriority((prev) => [...prev, admittedTask]);
      } else {
        if (regularQueue2.length <= regularQueue3.length && regularQueue2.length <= regularQueue4.length) {
          setRegularQueue2((prev) => [...prev, admittedTask]);
        } else if (regularQueue3.length <= regularQueue4.length) {
          setRegularQueue3((prev) => [...prev, admittedTask]);
        } else {
          setRegularQueue4((prev) => [...prev, admittedTask]);
        }
      }

      setTaskDurations((prev) => ({
        ...prev,
        [admittedTask.number]: { start: admittedTask.admittedAt, end: null }
      }));
    }
  };

  const handleTaskCompletion = (queueSetter, taskNumber, queueName) => {
    queueSetter((prevTasks) => prevTasks.filter((task) => task.number !== taskNumber));
    setActiveQueue((prevActive) => ({
      ...prevActive,
      [queueName]: null,
    }));
  };

  const processQueue = (queue, queueSetter, queueName) => {
    if (queue.length > 0 && !activeQueue[queueName]) {
      const task = queue[0];
      setActiveQueue((prevActive) => ({
        ...prevActive,
        [queueName]: task.number,
      }));
    }
  };

  useEffect(() => {
    processQueue(highPriority, setHighPriority, 'highPriority');
    processQueue(regularQueue2, setRegularQueue2, 'regularQueue2');
    processQueue(regularQueue3, setRegularQueue3, 'regularQueue3');
    processQueue(regularQueue4, setRegularQueue4, 'regularQueue4');
  }, [highPriority, regularQueue2, regularQueue3, regularQueue4, activeQueue]);
  
  const renderTaskList = (queue, queueSetter, queueName) => (
    
    <div className='taskList'>
    {queue.map((task, index) => (
      <div key={index} className='taskItem'>
        {/* Task Number */}
        <div className='taskNumber' style={{ color: task.color }}>
        {task.number}
        </div>
        {/* Timeout Bar */}
        {activeQueue[queueName] === task.number && (
        <div className='timeoutBarContainer'>
          <SetTimeOut
            start={taskDurations[task.number]?.start}
            onComplete={() => handleTaskCompletion(queueSetter, task.number, queueName)}
          />
        </div>
      )}
    </div>
  ))}
</div>
  );

  return (
    <>
      <div className='outerGrid'>
        <div className='leftGrid'>
          <br />
          <AddTaskButton onClick={handleGenerateNumbers} />
          <br />
          <h3>Task Queue</h3>
          <div className='generateTaskNumbers'>
            {pendingTasks.map((item, index) => (
              <div key={index} style={{ color: item.color }}>
                {item.number}
              </div>
            ))}
          </div>
          <br />
          <AdmitTaskButton onClick={handleAdmitTask} />
        </div>

        <div className='rightGrid'>
          <div className='priorityQueue1'>
            <h3>High Priority Queue 1</h3>
            <h4>Queue List</h4>
            {renderTaskList(highPriority, setHighPriority, 'highPriority')}
          </div>

          <div className='regularQueue2'>
            <h3>Regular Queue 2</h3>
            <h4>Queue List</h4>
            {renderTaskList(regularQueue2, setRegularQueue2, 'regularQueue2')}
          </div>

          <div className='regularQueue3'>
            <h3>Regular Queue 3</h3>
            <h4>Queue List</h4>
            {renderTaskList(regularQueue3, setRegularQueue3, 'regularQueue3')}
          </div>

          <div className='regularQueue4'>
            <h3>Regular Queue 4</h3>
            <h4>Queue List</h4>
            {renderTaskList(regularQueue4, setRegularQueue4, 'regularQueue4')}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
