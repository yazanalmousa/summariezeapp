import './App.css';
import Main from './componenets/Main';
import { Route, Routes } from 'react-router-dom';
import SummaryPage from './componenets/SummaryPage';


function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<Main/>}/>
      <Route path='/summary' element={<SummaryPage/>}/>
    </Routes>
    </>
  );
}

export default App;