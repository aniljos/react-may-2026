import { Link, Outlet } from "react-router-dom";
import { useTitle } from "../hooks/useTitle";

function Assignments() {
    useTitle("Assignments");

    return (
        <div className="container py-4">
            <div className="card border-0 shadow-sm mb-4">
                <div className="card-body p-4">
                    <p className="text-uppercase text-primary fw-semibold mb-1">Assignments</p>
                    <h2 className="mb-2">Practice Pages</h2>
                    <p className="text-muted mb-3">
                        Use the links below to open the assignment pages. These routes are nested under
                        the assignments section.
                    </p>

                    <div className="d-flex flex-wrap gap-2">
                        <Link className="btn btn-outline-primary" to="">
                            Wikipedia Search
                        </Link>
                        <Link className="btn btn-outline-primary" to="customers">
                            Customers
                        </Link>
                    </div>
                </div>
            </div>

            
        </div>
    );
}

export default Assignments;
