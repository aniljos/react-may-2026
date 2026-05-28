import { useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import type { BreadcrumbItem } from "../context/BreadcrumpsContext";
import { useBreadcrumbs } from "../context/BreadcrumpsContext";

const PATH_LABELS: Record<string, string> = {
    login: "Login",
    products: "Products",
    gadgets: "Gadgets",
    viewcart: "View Cart",
    users: "Users",
    assignments: "Assignments",
    search: "Search",
    customers: "Customers",
};

function toTitleCase(value: string) {
    return value
        .replace(/[-_]/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase());
}

function buildBreadcrumbs(pathname: string): BreadcrumbItem[] {
    if (pathname === "/") {
        return [{ label: "Home", path: "/" }];
    }

    const segments = pathname.split("/").filter(Boolean);
    const breadcrumbs: BreadcrumbItem[] = [{ label: "Home", path: "/" }];

    segments.forEach((segment, index) => {
        const path = `/${segments.slice(0, index + 1).join("/")}`;
        let label = PATH_LABELS[segment] ?? toTitleCase(segment);

        if (segments[0] === "products" && index === 1) {
            label = "EditProduct";
        }

        breadcrumbs.push({ label, path });
    });

    return breadcrumbs;
}

export function useRouteBreadcrumbs() {
    const location = useLocation();
    const { setBreadcrumbs } = useBreadcrumbs();

    const items = useMemo(() => buildBreadcrumbs(location.pathname), [location.pathname]);

    useEffect(() => {
        setBreadcrumbs(items);
    }, [items, setBreadcrumbs]);
}
