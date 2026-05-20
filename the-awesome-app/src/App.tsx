import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';


function App() {
  

  return (
    <Router>
      <div className="container-fluid">
            {/* navigation bar */}
          <nav className="navbar navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Vite React</Link>
                <ul className="nav">
                  <li className="nav-item">
                    <Link className="nav-link" to="/">Home</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">Login</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/products">Products</Link>
                  </li>
                </ul>
            </div>
          </nav>
            {/* main content(pages) */}
          <main>
              <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/products' element={<div>Products</div>}/>
              </Routes>
          </main>

      </div>
    </Router>
  )
}

export default App
