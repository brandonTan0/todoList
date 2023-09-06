import { Header } from './components/Header';
import { Task } from './components/Task';
import { ToDoList } from './components/ToDoList';
import { CompletedTask } from './components/CompletedTask';
import { AddNewTask } from './components/AddNewTask';

import './App.css';
import { GlobalProvider } from './context/GlobalState';


function App() {
  return (
    <GlobalProvider>
    <Header />
    <div className="container">
      <Task />
      <ToDoList />
      <CompletedTask />
      <AddNewTask />
    </div>
    </GlobalProvider>
  );
}

export default App;
