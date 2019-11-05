package com.e_commerce.backend.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
@Entity
public class Fb extends TimeSetting<Long>{
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	private String fblink;
	@Override
	public Long getId() {
		// TODO Auto-generated method stub
		return id;
	}
	public String getFblink() {
		return fblink;
	}
	public void setFblink(String fblink) {
		this.fblink = fblink;
	}
	public void setId(Long id) {
		this.id = id;
	}
	@Override
	public String toString() {
		return "Fb [id=" + id + ", fblink=" + fblink + "]";
	}
	
	
	
	
	
	
}
