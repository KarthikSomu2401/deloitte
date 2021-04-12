package com.deloitte.todoapp.service;

import com.deloitte.todoapp.modal.User;

public interface AuthService {
	abstract User loginAuthenticate(User user);
}
