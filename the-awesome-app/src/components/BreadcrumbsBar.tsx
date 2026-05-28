import { Link } from "react-router-dom";
import { useBreadcrumbs } from "../context/BreadcrumpsContext";
import { useRouteBreadcrumbs } from "../hooks/useRouteBreadcrumbs";

function BreadcrumbsBar() {
    useRouteBreadcrumbs();
    const { items } = useBreadcrumbs();

    if (items.length === 0) {
        return null;
    }

    return (
        <nav aria-label="breadcrumb" className="mt-3">
            <ol className="breadcrumb">
                {items.map((item, index) => {
                    const isLast = index === items.length - 1;

                    return (
                        <li
                            key={`${item.path}-${item.label}`}
                            className={`breadcrumb-item${isLast ? " active" : ""}`}
                            aria-current={isLast ? "page" : undefined}
                        >
                            {isLast ? (
                                item.label
                            ) : (
                                <Link to={item.path}>{item.label}</Link>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}

export default BreadcrumbsBar;
