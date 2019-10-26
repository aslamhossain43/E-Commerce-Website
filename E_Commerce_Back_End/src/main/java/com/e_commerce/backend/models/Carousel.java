package com.e_commerce.backend.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
@Entity
public class Carousel extends TimeSetting<Long>{

	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	private String cCode;
	
	@Override
	public Long getId() {
		// TODO Auto-generated method stub
		return id;
	}

	




	public String getcCode() {
		return cCode;
	}






	public void setcCode(String cCode) {
		this.cCode = cCode;
	}






	public void setId(Long id) {
		this.id = id;
	}






	@Override
	public String toString() {
		return "Carousel [id=" + id + ", cCode=" + cCode + "]";
	}

	
	

}
