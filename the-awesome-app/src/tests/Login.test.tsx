import {beforeEach, describe, expect, it, vi} from 'vitest';
import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import '@testing-library/jest-dom';
import Login from '../pages/Login';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import { Axios } from '../axios/Axios';

vi.mock('../axios/Axios', () => ({
    Axios: {
        post: vi.fn(),
        get: vi.fn(),
    }
}))

const mockedNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual<typeof import("react-router-dom")>("react-router-dom");

  return {
    ...actual,
    useNavigate: () => mockedNavigate,
  };
});

describe("Test Login", () => {

     beforeEach(() => {
        vi.clearAllMocks();
        mockedNavigate.mockClear();
        
    })

    it("should render the UI", () => {

        render(
            <MemoryRouter>
                <Provider store={store}>
                    <Login/>
                </Provider>
            </MemoryRouter>
        );
        expect(screen.getByRole("heading", {name: "Login", level: 3})).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Name")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("*****")).toBeInTheDocument();
        expect(screen.getByRole("button")).toBeInTheDocument()
    })
    it("should display an error message without credentials", () => {

        render(
            <MemoryRouter>
                <Provider store={store}>
                    <Login/>
                </Provider>
            </MemoryRouter>
        );
        
        const btn = screen.getByRole("button");
        fireEvent.click(btn);
        expect(screen.getByText("Enter the credentials")).toBeInTheDocument()
    })
    it("should display an error message with invalid credentials", async () => {

        vi.mocked(Axios.post).mockRejectedValueOnce(new Error(""));

        render(
            <MemoryRouter>
                <Provider store={store}>
                    <Login/>
                </Provider>
            </MemoryRouter>
        );
        
        const usernameInput = screen.getByPlaceholderText("Name");
        const pwdInput = screen.getByPlaceholderText("*****");

        fireEvent.change(usernameInput, {target: {value: "abc"}});
        fireEvent.change(pwdInput, {target: {value: "abc"}});


        const btn = screen.getByRole("button");
        fireEvent.click(btn);
        expect(await screen.findByText("Invalid credentials")).toBeInTheDocument()
    })

    it("should navigate with valid credentials", async () => {

        vi.mocked(Axios.post).mockResolvedValueOnce({
                status: 200,
                data: {
                    accessToken: "mock-access-token",
                    refreshToken: "mock-refresh-token",
                },
                });

        render(
            <MemoryRouter>
                <Provider store={store}>
                    <Login/>
                </Provider>
            </MemoryRouter>
        );
        
        const usernameInput = screen.getByPlaceholderText("Name");
        const pwdInput = screen.getByPlaceholderText("*****");

        fireEvent.change(usernameInput, {target: {value: "abc"}});
        fireEvent.change(pwdInput, {target: {value: "abc"}});


        const btn = screen.getByRole("button");
        fireEvent.click(btn);
        //expect(await screen.findByText("Invalid credentials")).toBeInTheDocument()
        await waitFor(() => {
            expect(Axios.post).toHaveBeenCalledWith("/login", { name: "abc", password: "abc" });
            expect(mockedNavigate).toHaveBeenCalledWith("/products", { replace: true });
        });
    })

})