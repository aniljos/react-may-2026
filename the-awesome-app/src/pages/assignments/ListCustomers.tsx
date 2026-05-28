import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTitle } from "../../hooks/useTitle";
import type { Customer } from "../../models/Customer";



const url = "http://localhost:9000/customers";

function ListCustomers() {
    useTitle("Customers");

    const [customers, setCustomers] = useState<Customer[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    async function fetchCustomers() {
        try {
            setIsLoading(true);
            setErrorMessage("");

            const response = await axios.get<Customer[]>(url);
            setCustomers(response.data);
        } catch (error) {
            console.log("customers error", error);
            setCustomers([]);
            setErrorMessage("Unable to load customers right now.");
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        void fetchCustomers();
    }, []);

    return (
        <div className="container py-4">
            <div className="card border-0 shadow-sm">
                <div className="card-body p-4">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <div>
                            <p className="text-uppercase text-primary fw-semibold mb-1">Assignment</p>
                            <h2 className="mb-1">Customers</h2>
                            <p className="text-muted mb-0">
                                Select a customer name to open the detail route.
                            </p>
                        </div>
                        <span className="badge text-bg-dark rounded-pill fs-6 px-3 py-2">
                            {customers.length} customers
                        </span>
                    </div>

                    {errorMessage && (
                        <div className="alert alert-danger" role="alert">
                            {errorMessage}
                        </div>
                    )}

                    {isLoading ? (
                        <div className="alert alert-info mb-0" role="status">
                            Loading customers...
                        </div>
                    ) : (
                        <div className="table-responsive">
                            <table className="table table-hover align-middle mb-0">
                                <thead className="table-dark">
                                    <tr>
                                        <th scope="col">Id</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Location</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {customers.length === 0 ? (
                                        <tr>
                                            <td colSpan={5} className="text-center py-4 text-muted">
                                                No customers found.
                                            </td>
                                        </tr>
                                    ) : (
                                        customers.map((customer) => (
                                            <tr key={customer.id ?? customer.name}>
                                                <td>{customer.id ?? "-"}</td>
                                                <td>
                                                    {customer.id !== undefined ? (
                                                        <Link
                                                            to={`${customer.id}`}
                                                            className="text-decoration-none fw-semibold"
                                                        >
                                                            {customer.name ?? "Unknown Customer"}
                                                        </Link>
                                                    ) : (
                                                        customer.name ?? "Unknown Customer"
                                                    )}
                                                </td>
                                                <td>{customer.location ?? "-"}</td>
                                                
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ListCustomers;
