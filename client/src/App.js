import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './components/home/Home';

import LandingPage from './components/landingpage/LandingPage';
import Create from './components/create/Create';
import Detail from './components/detail/Detail';
import Page404 from './components/page404/Page404';

function App() {
  return (
    <div className="App">
      <Routes>

        <Route path='/' element={<LandingPage/>}/>
        
        <Route exact path='/home' element={<Home/>}/>

        <Route exact path='/create' element={<Create/>}/>

        <Route exact path='/detail/:id' element={<Detail/>} />

        <Route exact path='*' element={<Page404/>} />
      </Routes>
    </div>
  );
}

export default App;
