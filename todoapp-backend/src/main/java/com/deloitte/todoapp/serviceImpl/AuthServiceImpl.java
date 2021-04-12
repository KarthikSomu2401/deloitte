package com.deloitte.todoapp.serviceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.deloitte.todoapp.modal.User;
import com.deloitte.todoapp.repository.UserRepository;
import com.deloitte.todoapp.service.AuthService;

@Service
public class AuthServiceImpl implements AuthService {

	@Autowired
	private UserRepository userRepository;

	@Override
	public User loginAuthenticate(User user) {
		User userToBeAuthenticated = userRepository.findByUserName(user.getUserName());
		if (userToBeAuthenticated.getPassword().equals(user.getPassword())) {
			return userToBeAuthenticated;
		}
		return null;
	}

}
