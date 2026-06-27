package com.demoapp.demo.controller;

import com.demoapp.demo.dto.EmailDTO;
import com.demoapp.demo.dto.UserDTO;
import com.demoapp.demo.model.User;
import com.demoapp.demo.service.UserService;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.http.ResponseEntity;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class AuthControllerTest {

    private UserService userService;
    private AuthController authController;

    @BeforeEach
    void setup() {
        userService = mock(UserService.class);
        authController = new AuthController(userService);
    }

    @Test
    void signupComEmailInvalidoDeveRetornar422() {
        UserDTO userDTO = new UserDTO();
        userDTO.setEmail("emailinvalido");
        userDTO.setPassword("Senha@123");

        when(userService.isEmailValid("emailinvalido")).thenReturn(false);

        ResponseEntity<?> response = authController.signup(userDTO);

        assertEquals(422, response.getStatusCode().value()); 
    }

    @Test
    void resetPasswordComUsuarioInexistenteDeveRetornar404EMensagemCorreta() {
        EmailDTO emailDTO = new EmailDTO();
        emailDTO.setEmail("teste@email.com");

        when(userService.isEmailValid("teste@email.com")).thenReturn(true);
        when(userService.findByEmail("teste@email.com")).thenReturn(null);

        ResponseEntity<?> response = authController.resetPassword(emailDTO);

        assertEquals(404, response.getStatusCode().value());
  
        assertEquals("Usuário não encontrado", response.getBody());
    }

    @Test
    void signupComEmailJaCadastradoDeveRetornarMensagemCorreta() {
        UserDTO userDTO = new UserDTO();
        userDTO.setEmail("teste@email.com");
        userDTO.setPassword("Senha@123");

        User usuarioExistente = new User();
        usuarioExistente.setEmail("teste@email.com");

        when(userService.isEmailValid("teste@email.com")).thenReturn(true);
        when(userService.isPasswordValid("Senha@123")).thenReturn(true);
        when(userService.findByEmail("teste@email.com")).thenReturn(usuarioExistente);

        ResponseEntity<?> response = authController.signup(userDTO);

        assertEquals(409, response.getStatusCode().value());

        assertEquals("E-mail já cadastrado", response.getBody());
    }
}