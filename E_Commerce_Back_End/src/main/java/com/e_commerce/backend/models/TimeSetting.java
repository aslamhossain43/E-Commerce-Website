package com.e_commerce.backend.models;

import java.text.SimpleDateFormat;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;

import javax.persistence.MappedSuperclass;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;

@MappedSuperclass
public abstract class TimeSetting<ID> {
	private String createdDate;
	private String lastModifiedDate;

	public abstract ID getId();

	public String getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(String createdDate) {
		this.createdDate = createdDate;
	}

	public String getLastModifiedDate() {
		return lastModifiedDate;
	}

	public void setLastModifiedDate(String lastModifiedDate) {
		this.lastModifiedDate = lastModifiedDate;
	}

	@PrePersist
	public void prepersist() {
		Date currentDate = new Date();
		DateTimeFormatter dtf = DateTimeFormatter.ofPattern("hh:mm:ss a");
		this.createdDate = new SimpleDateFormat("dd/MM/yyyy").format(currentDate)+" , "+LocalTime.now().format(dtf);
		this.lastModifiedDate = new SimpleDateFormat("dd/MM/yyyy").format(currentDate)+" , "+LocalTime.now().format(dtf);
	}

	@PreUpdate
	public void preUpdate() {
		Date currentDate = new Date();
		DateTimeFormatter dtf = DateTimeFormatter.ofPattern("hh:mm:ss a");
		this.lastModifiedDate = new SimpleDateFormat("dd/MM/yyyy").format(currentDate)+" , "+LocalTime.now().format(dtf);
}
}