package com.deloitte.todoapp.serviceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.deloitte.todoapp.modal.User;
import com.deloitte.todoapp.repository.UserRepository;
import com.deloitte.todoapp.service.UserService;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	private UserRepository userRepository;

	@Override
	public User createUser(User user) {
		return userRepository.save(user);
	}

	@Override
	public User findUser(String userName) {
		return userRepository.findByUserName(userName);
	}

}
