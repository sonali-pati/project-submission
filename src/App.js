
import './App.css';
import { BrowserRouter,Routes, Route } from 'react-router-dom';
import Products from'./components/Products';
import Create from './components/Create'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Products/>}/>
        <Route path='/products' element={<Products/>}/>
        <Route path='/create' element={<Create/>}/>
        
      </Routes>
      </BrowserRouter>
       

    </div>
  );
}

export default App;
