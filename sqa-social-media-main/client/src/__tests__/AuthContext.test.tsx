import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { AuthProvider, useAuth } from "../contexts/AuthContext";

function TestComponent() {
  return <div>Auth funcionando</div>;
}

function AuthConsumerTest() {
  const { isAuthenticated } = useAuth();

  return (
    <div>
      {isAuthenticated ? "Autenticado" : "Não autenticado"}
    </div>
  );
}

function LoginTestComponent() {
  const { login, isAuthenticated } = useAuth();

  return (
    <>
      <button
        onClick={() =>
          login({
            id: 1,
            email: "teste@email.com",
          })
        }
      >
        Login
      </button>

      <span>
        {isAuthenticated ? "Autenticado" : "Não autenticado"}
      </span>
    </>
  );
}

describe("AuthContext", () => {
  test("deve renderizar o provider corretamente", () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(screen.getByText("Auth funcionando")).toBeInTheDocument();
  });

  test("deve renderizar componentes filhos", () => {
    render(
      <AuthProvider>
        <p>Filho renderizado</p>
      </AuthProvider>
    );

    expect(screen.getByText("Filho renderizado")).toBeInTheDocument();
  });

  test("deve iniciar como não autenticado", () => {
    render(
      <AuthProvider>
        <AuthConsumerTest />
      </AuthProvider>
    );

    expect(
      screen.getByText("Não autenticado")
    ).toBeInTheDocument();
  });

  test("deve autenticar usuário após login", () => {
    render(
      <AuthProvider>
        <LoginTestComponent />
      </AuthProvider>
    );

    fireEvent.click(screen.getByText("Login"));

    expect(
      screen.getByText("Autenticado")
    ).toBeInTheDocument();
  });
});