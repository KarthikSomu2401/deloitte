package com.deloitte.todoapp.serviceImpl;

import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.deloitte.todoapp.modal.Task;
import com.deloitte.todoapp.modal.TaskUpdates;
import com.deloitte.todoapp.modal.User;
import com.deloitte.todoapp.repository.TaskRepository;
import com.deloitte.todoapp.repository.TaskUpdatesRepository;
import com.deloitte.todoapp.repository.UserRepository;
import com.deloitte.todoapp.service.TaskService;

@Service
public class TaskServiceImpl implements TaskService {

	@Autowired
	private TaskRepository taskRepository;

	@Autowired
	private TaskUpdatesRepository taskUpdatesRepository;

	@Autowired
	private UserRepository userRepository;

	@Override
	public Task createTask(Task task, String userName) {
		User foundUser = userRepository.findByUserName(userName);
		if (foundUser != null) {
			task.setUser(foundUser);
			TaskUpdates taskUpdates = new TaskUpdates();
			taskUpdates.setTask(task);
			taskUpdates.setTaskDescription(task.getTaskDescription());
			taskUpdates.setTaskName(task.getTaskName());
			taskUpdatesRepository.save(taskUpdates);
			List<TaskUpdates> updatesList = new ArrayList<TaskUpdates>();
			updatesList.add(taskUpdates);
			task.setUpdates(updatesList);
			task.setTaskDateTime(Date
					.from(ZonedDateTime.parse(task.getUtcString(), DateTimeFormatter.RFC_1123_DATE_TIME).toInstant()));
			return taskRepository.save(task);
		}
		return null;
	}

	@Override
	public Task updateTask(Task task, String userName) {
		User foundUser = userRepository.findByUserName(userName);
		if (foundUser != null) {
			task.setUser(foundUser);
			TaskUpdates taskUpdates = new TaskUpdates();
			Task foundTask = taskRepository.findById(task.getId()).get();
			if (foundTask != null) {
				taskUpdates.setTask(foundTask);
				taskUpdates.setTaskDescription(task.getTaskDescription());
				taskUpdates.setTaskName(task.getTaskName());
				TaskUpdates updated = taskUpdatesRepository.save(taskUpdates);
				foundTask.getUpdates().add(updated);
				foundTask.setTaskName(task.getTaskName());
				foundTask.setTaskDateTime(Date.from(
						ZonedDateTime.parse(task.getUtcString(), DateTimeFormatter.RFC_1123_DATE_TIME).toInstant()));
				foundTask.setTaskDescription(task.getTaskDescription());
				return taskRepository.save(foundTask);
			}
		}
		return null;
	}

	@Override
	public String deleteTask(Integer taskId) {
		taskRepository.deleteById(taskId);
		if (taskRepository.findById(taskId).isEmpty()) {
			return "success";
		}
		return "failure";
	}

	@Override
	public List<Task> getAllTasks(String userName) {
		User user = userRepository.findByUserName(userName);
		return user.getTasks();
	}

}
