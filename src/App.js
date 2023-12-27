import './App.css';
import Main from './componenets/Main';
import { Route, Routes } from 'react-router-dom';
import SummaryPage from './componenets/SummaryPage';
import Chat from './componenets/Chat';


function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<Main/>}/>
      <Route path='/summary' element={<SummaryPage/>}/>
      <Route path='/chat' element={<Chat/>}/>
    </Routes>
    </>
  );
}

export default App;