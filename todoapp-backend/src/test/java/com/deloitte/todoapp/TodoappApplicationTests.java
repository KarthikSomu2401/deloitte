package com.deloitte.todoapp;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.TimeZone;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import com.deloitte.todoapp.modal.Task;
import com.deloitte.todoapp.modal.User;
import com.fasterxml.jackson.databind.ObjectMapper;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
//@TestPropertySource(locations = "classpath:application-integrationtest.properties")
public class TodoappApplicationTests {

	@Autowired
	private MockMvc mvc;

	public static String asJsonString(final Object obj) {
		try {
			return new ObjectMapper().writeValueAsString(obj);
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}

	@Test
	public void testLoginUser() throws Exception {
		User user = new User();
		user.setUserName("test");
		user.setPassword("pwd123");
		this.mvc.perform(MockMvcRequestBuilders.post("/auth/loginuser").contentType(MediaType.APPLICATION_JSON)
				.content(asJsonString(user))).andExpect(MockMvcResultMatchers.status().isOk());
	}

	@Test
	public void testAllTasksGet() throws Exception {
		this.mvc.perform(
				MockMvcRequestBuilders.get("/todo/get-all-tasks").param("userName", "test").param("completed", "false"))
				.andExpect(MockMvcResultMatchers.status().isOk());
	}

	@Test
	public void testCreateTask() throws Exception {
		Task task = new Task();
		Date currentTime = new Date();
		SimpleDateFormat sdf = new SimpleDateFormat("EEE, d MMM yyyy hh:mm:ss z");
		sdf.setTimeZone(TimeZone.getTimeZone("GMT"));
		task.setTaskName("Meeting");
		task.setTaskDescription("Deloitte Technical Interview");
		task.setUtcString(sdf.format(currentTime));
		task.setComplete(false);
		this.mvc.perform(MockMvcRequestBuilders.post("/todo/create-task").param("userName", "test")
				.contentType(MediaType.APPLICATION_JSON).content(asJsonString(task)))
				.andExpect(MockMvcResultMatchers.status().isOk());
	}

	@Test
	public void testTaskDelete() throws Exception {
		this.testCreateTask();
		this.mvc.perform(MockMvcRequestBuilders.delete("/todo/delete-task").param("taskId", "1"))
				.andExpect(MockMvcResultMatchers.status().isOk());
	}

}