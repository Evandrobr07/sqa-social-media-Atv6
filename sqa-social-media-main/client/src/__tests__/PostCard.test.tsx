import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import PostCard from "../components/PostCard";

const mockPost = {
  id: 1,
  title: "Título teste",
  body: "Post de teste",
  liked: false,
};

describe("PostCard", () => {

  test("deve exibir botão Curtir quando post não está curtido", () => {
    render(
      <PostCard
        post={mockPost}
        isAuthenticated={true}
        onLike={async () => {}}
      />
    );

    expect(screen.getByText("Curtir")).toBeInTheDocument();
  });

  test("deve chamar função onLike ao clicar em Curtir", async () => {
    const onLikeMock = jest.fn().mockResolvedValue(undefined);

    render(
      <PostCard
        post={mockPost}
        isAuthenticated={true}
        onLike={onLikeMock}
      />
    );

    fireEvent.click(screen.getByText("Curtir"));

    await waitFor(() => {
      expect(onLikeMock).toHaveBeenCalledTimes(1);
    });
    expect(onLikeMock).toHaveBeenCalledWith(1);
  });

  test("deve exibir um alert com a mensagem correta se usuário deslogado tentar curtir", () => {

    const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});

    render(
      <PostCard
        post={mockPost}
        isAuthenticated={false} 
        onLike={async () => {}}
      />
    );

    fireEvent.click(screen.getByText("Curtir"));

    expect(alertMock).toHaveBeenCalledWith("Você precisa estar autenticado para curtir posts!");

    alertMock.mockRestore();
  });
});