package com.deloitte.todoapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.deloitte.todoapp.modal.User;
import com.deloitte.todoapp.service.UserService;

@RestController
@RequestMapping("user")
public class UserController {

	@Autowired
	private UserService userService;

	@PostMapping("create-user")
	private User createUser(@RequestBody User user) {
		return userService.createUser(user);
	}

	@GetMapping("get-user")
	private User findUser(@RequestParam String userName) {
		return userService.findUser(userName);
	}
}
