import { useContext } from "react";
import { Link } from "react-router-dom";
import { AppThemeContext } from "../context/AppThemeContext";

function AppBar(){

    const themeContext = useContext(AppThemeContext);

    function switchTheme(){
        themeContext.mode = themeContext.mode === 'dark' ? 'light' : 'dark';
        console.log("mode", themeContext.mode);
    }

    return (
        <nav className={`navbar navbar-${themeContext.mode} bg-${themeContext.mode}`}>
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
                  <li className="nav-item">
                    <Link className="nav-link" to="/gadgets">Gadgets</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/viewcart">View Cart</Link>
                  </li>
                   <li className="nav-item">
                    <button className="btn btn-warning" onClick={switchTheme}>Switch Theme</button>
                  </li>
                </ul>
            </div>
          </nav>
    )
}

export default AppBar;