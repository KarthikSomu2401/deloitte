package com.deloitte.todoapp.service;

import java.util.List;

import com.deloitte.todoapp.modal.Task;

public interface TaskService {
	abstract Task createTask(Task task, String userName);
	abstract Task updateTask(Task task, String userName);
	abstract String deleteTask(Integer taskId);
	abstract List<Task> getAllTasks(String userName);
}
