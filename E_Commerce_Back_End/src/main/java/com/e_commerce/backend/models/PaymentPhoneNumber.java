package com.e_commerce.backend.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class PaymentPhoneNumber extends TimeSetting<Long> {


	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	private String bKash;
	private String rocket;
	@Override
	public Long getId() {
		// TODO Auto-generated method stub
		return id;
	}
	public String getbKash() {
		return bKash;
	}
	public void setbKash(String bKash) {
		this.bKash = bKash;
	}
	public String getRocket() {
		return rocket;
	}
	public void setRocket(String rocket) {
		this.rocket = rocket;
	}
	public void setId(Long id) {
		this.id = id;
	}
	@Override
	public String toString() {
		return "PaymentPhoneNumber [id=" + id + ", bKash=" + bKash + ", rocket=" + rocket + "]";
	}
	
	
	
	
	
	
	
	
	
	
}
