import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Header from "../components/Header";
import { useAuth } from "../contexts/AuthContext";
import { useRouter } from "next/navigation";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("../contexts/AuthContext", () => ({
  useAuth: jest.fn(),
}));

describe("Header", () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("deve exibir botões 'Posts Curtidos' e 'Sair' quando usuário estiver logado", () => {
    (useAuth as jest.Mock).mockReturnValue({
      isAuthenticated: true,
      logout: jest.fn(),
    });

    render(<Header />);

    expect(screen.getByText("Posts Curtidos")).toBeInTheDocument();
    expect(screen.getByText("Sair")).toBeInTheDocument();
  });

  test("deve exibir exatamente o botão 'Criar conta' conforme o documento de requisitos", () => {
    (useAuth as jest.Mock).mockReturnValue({
      isAuthenticated: false, 
      logout: jest.fn(),
    });

    render(<Header />);

    expect(screen.getByText("Criar conta")).toBeInTheDocument();
  });
});