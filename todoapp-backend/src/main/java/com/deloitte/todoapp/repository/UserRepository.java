package com.deloitte.todoapp.repository;

import org.springframework.data.repository.CrudRepository;

import com.deloitte.todoapp.modal.User;

public interface UserRepository extends CrudRepository<User, Integer> {
	User findByUserName(String userName);
}
