package com.deloitte.todoapp.modal;

import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.PrePersist;
import javax.persistence.Transient;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Task {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	@JsonIgnore
	@ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.PERSIST)
	@JoinColumn(name = "user_id", nullable = false)
	private User user;

	@Transient
	private String utcString;

	private String taskName;
	private Date taskCreatedAt;
	private Date taskDateTime;
	private String taskDescription;
	private boolean isComplete;

	@OneToMany(mappedBy = "task", fetch = FetchType.LAZY, orphanRemoval = true, cascade = CascadeType.REMOVE)
	private List<TaskUpdates> updates;

	@PrePersist
	private void prePersistFunction() {
		this.taskCreatedAt = new Date();
	}
}
