import React, { useEffect, useState } from 'react';
import './App.css'

function App() {
  const [taskName, settaskName] = useState('');
  const [list, setList] = useState([]);

  useEffect(() => {
    // Retrieve the list from localStorage when the component mounts
    const storedList = JSON.parse(localStorage.getItem('todoList'));
    if (storedList) {
      setList(storedList);
    }
  }, []);


  useEffect(() => {
    if (list.length > 0)
      localStorage.setItem('todoList', JSON.stringify(list));
  }, [list]);


  const handleDelete = (taskName) => {
    const updatedList = list.filter((item) => item.task !== taskName)
    setList(updatedList)
    settaskName('')
    localStorage.setItem('todoList', JSON.stringify(updatedList));
  };

  const handleTextClick = (taskName) => {
    const taskIndex = list.findIndex((item) => item.task === taskName);

    if (taskIndex !== -1) {
      // Task exists, update its isStruck property
      const updatedList = list.map((item, index) =>
        index === taskIndex ? { task: item.task, isStruck: !item.isStruck } : item
      );
      setList(updatedList);

    }
  };

  return (
    <div className='container'>
      <div className='todo-container' >
        <div className='title-box'> <h3 className='title'>Todo App</h3>
          <div className='refresh' onClick={() => {
            localStorage.removeItem("todoList");
            setList([])
          }
          } >    <img src="refresh.svg" alt="" /></div></div>
        <div class="custom-search">
          <input
            type="text"
            placeholder='What needs to be done?'
            value={taskName}
            class="custom-search-input"
            onChange={(e) => settaskName(e.target.value)}
          />

          <button class="custom-search-botton" onClick={() => {
            if (taskName.length > 0) {
              setList((prev) => [...prev, { task: taskName, isStruck: false }])
              settaskName('')
            }
          }}>
            <img src="plus.svg" alt=""/>
          </button>

        </div>
        {list.length > 0 && list?.map((item) => {
          return <div className='list-container'><p key={item} onClick={() => handleTextClick(item.task)} className="custom-list" style={{ textDecoration: item.isStruck ? 'line-through' : 'none' }}
          >{`${item.task}`}</p><div className='delete-icon' onClick={() => handleDelete(item.task)}><img src="delete.svg" alt=""/></div> </div>
        })}
      </div>
    </div>
  );
}

export default App;

