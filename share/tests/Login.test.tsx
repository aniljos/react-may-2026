import { screen, fireEvent, render, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import Login from "../pages/Login";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { store } from "../store/store";
import { Axios } from "../axios/Axios";

const mockedNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual<typeof import("react-router-dom")>("react-router-dom");

  return {
    ...actual,
    useNavigate: () => mockedNavigate,
  };
});

vi.mock('../axios/Axios', () => ({
    Axios: {
        post: vi.fn()
    }
}))

  function renderLogin() {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    </Provider>,
  );
}

describe("Login", () => {

    beforeEach(() => {
        vi.clearAllMocks();
        mockedNavigate.mockClear();
    })

  it("should render", () => {
    renderLogin();

    expect(
      screen.getByRole("heading", { name: "Login", level: 3 }),
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("*****")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });
  it("should show error message", () => {
    renderLogin();

    expect(
      screen.getByRole("heading", { name: "Login", level: 3 }),
    ).toBeInTheDocument();
    const btn = screen.getByRole("button");
    fireEvent.click(btn);
    expect(screen.getByText(/Enter the credentials/)).toBeInTheDocument();
  });
  it("should show backend error message", async () => {
    vi.mocked(Axios.post).mockRejectedValueOnce(new Error(""));

    renderLogin();

    expect(
      screen.getByRole("heading", { name: "Login", level: 3 }),
    ).toBeInTheDocument();
    const usernameInput = screen.getByPlaceholderText("Name");
    const pwdInput = screen.getByPlaceholderText("*****");
    fireEvent.change(usernameInput, {target: {value: "abc"}});
    fireEvent.change(pwdInput, {target: {value: "abc"}});
    const btn = screen.getByRole("button");
    fireEvent.click(btn);
    expect(await screen.findByText(/Invalid credentials/i)).toBeInTheDocument();
    //expect(screen.getByText(/Invalid credentials/)).toBeInTheDocument();
  });
  it("should navigate", async () => {
    vi.mocked(Axios.post).mockResolvedValueOnce({
      status: 200,
      data: {
        accessToken: "mock-access-token",
        refreshToken: "mock-refresh-token",
      },
    });

    renderLogin();

    expect(
      screen.getByRole("heading", { name: "Login", level: 3 }),
    ).toBeInTheDocument();
    const usernameInput = screen.getByPlaceholderText("Name");
    const pwdInput = screen.getByPlaceholderText("*****");
    fireEvent.change(usernameInput, {target: {value: "abc"}});
    fireEvent.change(pwdInput, {target: {value: "abc"}});
    const btn = screen.getByRole("button");
    fireEvent.click(btn);

    await waitFor(() => {
      expect(Axios.post).toHaveBeenCalledWith("/login", { name: "abc", password: "abc" });
      expect(mockedNavigate).toHaveBeenCalledWith("/products", { replace: true });
    });
  });
});
