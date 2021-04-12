package com.deloitte.todoapp.repository;

import org.springframework.data.repository.CrudRepository;

import com.deloitte.todoapp.modal.TaskUpdates;

public interface TaskUpdatesRepository extends CrudRepository<TaskUpdates, Integer> {

}
