package com.deloitte.todoapp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.deloitte.todoapp.modal.Task;
import com.deloitte.todoapp.service.TaskService;

@RestController
@RequestMapping("todo")
public class ToDoAppController {

	@Autowired
	private TaskService taskService;

	@PostMapping("/create-task")
	public Task createToDo(@RequestBody Task task, @RequestParam String userName) {
		return taskService.createTask(task, userName);
	}

	@PutMapping("/update-task")
	public Task updateToDo(@RequestBody Task task, @RequestParam String userName) {
		return taskService.updateTask(task, userName);
	}

	@DeleteMapping("/delete-task")
	public String deleteToDo(@RequestParam Integer taskId) {
		return taskService.deleteTask(taskId);
	}

	@GetMapping("/get-all-tasks")
	public List<Task> deleteToDo(@RequestParam String userName) {
		return taskService.getAllTasks(userName);
	}

	@PutMapping("/mark-complete")
	public Task completeToDo(@RequestParam Integer taskId) {
		return taskService.markTaskComplete(taskId);
	}
}
