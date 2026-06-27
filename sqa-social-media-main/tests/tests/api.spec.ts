import { test, expect } from '@playwright/test';

const API_URL = 'http://localhost:8080';

test.describe('Testes de API - Autenticação', () => {

  test('POST /auth/signup - Deve cadastrar um usuário com sucesso', async ({ request }) => {

  const dynamicEmail = `playwright${Date.now()}@teste.com`;

  const response = await request.post('http://localhost:8080/auth/signup', {
    data: {
      email: dynamicEmail,
      password: "Senha@123"
    }
  });


  expect(response.ok()).toBeTruthy();
});

  test('POST /auth/signup - Deve falhar ao cadastrar e-mail duplicado', async ({ request }) => {
   
    const response = await request.post(`${API_URL}/auth/signup`, {
      data: {
        name: 'Usuário Copia',
        email: 'playwright@teste.com',
        password: 'Senha@123'
      }
    });

    expect(response.ok()).toBeFalsy();
  });

  test('POST /auth/signin - Deve fazer login com sucesso', async ({ request }) => {
    const response = await request.post(`${API_URL}/auth/signin`, {
      data: {
        email: 'playwright@teste.com',
        password: 'Senha@123'
      }
    });

    expect(response.ok()).toBeTruthy();
    
    const body = await response.json();
    expect(body).toHaveProperty('token');
  });

  test('POST /auth/signin - Deve falhar ao fazer login com senha errada', async ({ request }) => {
    const response = await request.post(`${API_URL}/auth/signin`, {
      data: {
        email: 'playwright@teste.com',
        password: 'SenhaErrada123'
      }
    });

    expect(response.ok()).toBeFalsy();
  });

});