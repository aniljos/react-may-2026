import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import ListProducts from "../pages/ListProducts";
import { AppThemeContext } from "../context/AppThemeContext";
import Product from "../models/Product";
import { useProducts } from "../hooks/useProducts";
import { Axios } from "../axios/Axios";

const mockedNavigate = vi.fn();
const mockedSetProducts = vi.fn();
const mockedAlert = vi.fn();

vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual<typeof import("react-router-dom")>("react-router-dom");

    return {
        ...actual,
        useNavigate: () => mockedNavigate,
    };
});

vi.mock("../hooks/useProducts", () => ({
    useProducts: vi.fn(),
}));

vi.mock("../axios/Axios", () => ({
    Axios: {
        delete: vi.fn(),
    },
}));

const products = [
    new Product(1, "Phone", 1000, "Smart phone"),
    new Product(2, "Laptop", 2000, "Work laptop"),
];

function renderListProducts() {
    render(
        <MemoryRouter>
            <AppThemeContext.Provider value={{ mode: "light", changeMode: vi.fn() }}>
                <ListProducts />
            </AppThemeContext.Provider>
        </MemoryRouter>,
    );
}

describe("ListProducts", () => {
    beforeEach(() => {
        vi.clearAllMocks();
        mockedNavigate.mockClear();
        mockedSetProducts.mockClear();

        vi.mocked(useProducts).mockReturnValue({
            products,
            setProducts: mockedSetProducts,
            fetchProducts: vi.fn(),
        });

        vi.mocked(Axios.delete).mockResolvedValue({});
        vi.stubGlobal("alert", mockedAlert);
    });

    it("should render products and total price", () => {
        renderListProducts();

        expect(screen.getByRole("heading", { name: "List Products", level: 4 })).toBeInTheDocument();
        expect(screen.getByText("Phone")).toBeInTheDocument();
        expect(screen.getByText("Laptop")).toBeInTheDocument();
        expect(screen.getByText("Total Price: 3000")).toBeInTheDocument();
        expect(screen.getByText(/data fetching using axios/i)).toBeInTheDocument();
    });

    it("should toggle the info message", () => {
        renderListProducts();

        const toggleButton = screen.getByRole("button", { name: /hide info/i });
        fireEvent.click(toggleButton);

        expect(screen.queryByText(/data fetching using axios/i)).not.toBeInTheDocument();
        expect(screen.getByRole("button", { name: /show info/i })).toBeInTheDocument();
    });

    it("should navigate on edit", () => {
        renderListProducts();

        const editButtons = screen.getAllByRole("button", { name: "Edit" });
        fireEvent.click(editButtons[0]);

        expect(mockedNavigate).toHaveBeenCalledWith("/products/1");
    });

    it("should delete a product and update the list", async () => {
        renderListProducts();

        const deleteButtons = screen.getAllByRole("button", { name: "Delete" });
        fireEvent.click(deleteButtons[0]);

        await waitFor(() => {
            expect(Axios.delete).toHaveBeenCalledWith("/secure_products/1");
            expect(mockedSetProducts).toHaveBeenCalledWith([products[1]]);
            expect(mockedAlert).toHaveBeenCalledWith("deleted product 1");
        });
    });
});
