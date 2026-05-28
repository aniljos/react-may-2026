import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import ListProducts from './pages/ListProducts';
import EditProduct from './pages/EditProduct';
import GadgetStore from './pages/GadgetStore';
import ViewCart from './pages/ViewCart';
import AppBar from './components/AppBar';
import Users from './pages/Users';
import BreadcrumbsBar from './components/BreadcrumbsBar';


function App() {
  

  return (
    <Router>
      <div className="container-fluid">
            {/* navigation bar */}
            <AppBar/>
            <BreadcrumbsBar />
            {/* main content(pages) */}
          <main>
              <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/products' element={ <ListProducts/>}/>
                <Route path='/products/:id' element={<EditProduct/>}/>
                <Route path='/gadgets' element={<GadgetStore/>}/>
                <Route path='/viewcart' element={<ViewCart/>}/>
                <Route path='/users' element={<Users/>}/>
              </Routes>
          </main>

      </div>
    </Router>
  )
}

export default App
