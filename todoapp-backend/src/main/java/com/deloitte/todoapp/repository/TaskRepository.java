package com.deloitte.todoapp.repository;

import org.springframework.data.repository.CrudRepository;

import com.deloitte.todoapp.modal.Task;

public interface TaskRepository extends CrudRepository<Task, Integer> {
}
