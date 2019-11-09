package com.e_commerce.backend.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
@Entity
public class GoogleMap extends TimeSetting<Long>{

	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	
	private String gMap;

	@Override
	public Long getId() {
		return id;
	}

	public String getgMap() {
		return gMap;
	}

	public void setgMap(String gMap) {
		this.gMap = gMap;
	}

	public void setId(Long id) {
		this.id = id;
	}
	
	
	
	
	
	
	
	
	
}
