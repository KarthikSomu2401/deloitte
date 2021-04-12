package com.deloitte.todoapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.deloitte.todoapp.modal.User;
import com.deloitte.todoapp.service.AuthService;

@RestController
@RequestMapping("auth")
public class AuthController {

	@Autowired
	private AuthService authService;

	@PostMapping("/loginuser")
	public User createToDo(@RequestBody User user) {
		return authService.loginAuthenticate(user);
	}

}
