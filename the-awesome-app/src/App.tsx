import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import ListProducts from './pages/ListProducts';
import EditProduct from './pages/EditProduct';
import GadgetStore from './pages/GadgetStore';
import ViewCart from './pages/ViewCart';
import AppBar from './components/AppBar';
import Users from './pages/Users';
import BreadcrumbsBar from './components/BreadcrumbsBar';
import Assignments from './pages/Assignments';
import Search from './pages/assignments/Search';
import ListCustomers from './pages/assignments/ListCustomers';
import CustomerView from './pages/assignments/CustomerView';
import ProtectedRoute from './components/ProtectedRoute';


function App() {
  

  return (
    <Router basename='/awesomeapp/'>
      <div className="container-fluid">
            {/* navigation bar */}
            <AppBar/>
            <BreadcrumbsBar />
            {/* main content(pages) */}
          {/* <main style={{border: "2px solid red", padding: "10px"}}> */}
          <main>
              <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/login' element={<Login/>}/>
                
                <Route element={<ProtectedRoute/>}>
                  <Route path='/products' element={ <ListProducts/>}/>
                  <Route path='/products/:id' element={<EditProduct/>}/>
                  <Route path='/gadgets' element={<GadgetStore/>}/>
                  <Route path='/viewcart' element={<ViewCart/>}/>
                  <Route path='/users' element={<Users/>}/>
                  <Route path='/assignments' element={<Assignments/>}>
                    <Route index element={<Search/>}/>
                    {/* <Route path='search' element={<div>Search</div>}/> */}
                    <Route path='customers' element={<ListCustomers/>}/>
                    {/* <Route path='customers' element={<div>Customers</div>}/> */}
                    <Route path='customers/:id' element={<CustomerView/>}/>
                  </Route>
                </Route>

              </Routes>
          </main>

      </div>
    </Router>
  )
}

export default App
