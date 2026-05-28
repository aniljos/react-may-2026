import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useTitle } from "../../hooks/useTitle";
import type { Customer } from "../../models/Customer";



function CustomerView() {
    useTitle("Customer View");

    const { id } = useParams();
    const [customer, setCustomer] = useState<Customer | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    async function fetchCustomer() {
        if (!id) {
            setErrorMessage("Customer id is missing.");
            return;
        }

        try {
            setIsLoading(true);
            setErrorMessage("");

            const response = await axios.get<Customer>(`http://localhost:9000/customers/${id}`);
            setCustomer(response.data);
        } catch (error) {
            console.log("customer detail error", error);
            setCustomer(null);
            setErrorMessage("Unable to load customer details right now.");
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        void fetchCustomer();
    }, [id]);

    const displayEntries = customer
        ? Object.entries(customer).filter(([, value]) => value !== undefined && value !== "")
        : [];

    return (
        <div className="container py-4">
            <div className="row justify-content-center">
                <div className="col-lg-8">
                    <div className="card border-0 shadow-sm">
                        <div className="card-body p-4">
                            <div className="d-flex justify-content-between align-items-start mb-4">
                                <div>
                                    <p className="text-uppercase text-primary fw-semibold mb-1">Customer Detail</p>
                                    <h2 className="mb-1">{customer?.name ?? "Customer View"}</h2>
                                    <p className="text-muted mb-0">
                                        Details loaded from the customer detail endpoint.
                                    </p>
                                </div>
                                <Link to="/assignments/customers" className="btn btn-outline-secondary">
                                    Back to Customers
                                </Link>
                            </div>

                            {errorMessage && (
                                <div className="alert alert-danger" role="alert">
                                    {errorMessage}
                                </div>
                            )}

                            {isLoading && (
                                <div className="alert alert-info mb-0" role="status">
                                    Loading customer details...
                                </div>
                            )}

                            {!isLoading && customer && (
                                <div className="list-group">
                                    {displayEntries.map(([key, value]) => (
                                        <div
                                            key={key}
                                            className="list-group-item d-flex justify-content-between align-items-center"
                                        >
                                            <span className="text-capitalize fw-semibold">{key}</span>
                                            <span className="text-muted">{String(value)}</span>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {!isLoading && !customer && !errorMessage && (
                                <div className="alert alert-warning mb-0">Customer details not found.</div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CustomerView;
