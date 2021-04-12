package com.deloitte.todoapp.service;

import com.deloitte.todoapp.modal.User;

public interface UserService {
	abstract User createUser(User user);

	abstract User findUser(String userName);

}
