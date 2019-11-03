package com.e_commerce.backend.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class ProductsForCheckOut extends TimeSetting<Long> {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	private String name;
	private String brand;
	private String description;

	private String marketPrice;
	private String soldPrice;
	private String color;
	private String quantity;
	private String frontCode;
	private String backCode;
	private String leftCode;
	private String rightCode;
	private String headCode;
	private String footCode;
	private String category;
	
	@ManyToOne
	@JsonIgnore
	private Person person;
	

	public ProductsForCheckOut() {
		super();
	}


	@Override
	public Long getId() {
		// TODO Auto-generated method stub
		return id;
	}


	public String getName() {
		return name;
	}


	public void setName(String name) {
		this.name = name;
	}


	public String getBrand() {
		return brand;
	}


	public void setBrand(String brand) {
		this.brand = brand;
	}


	public String getDescription() {
		return description;
	}


	public void setDescription(String description) {
		this.description = description;
	}


	public String getMarketPrice() {
		return marketPrice;
	}


	public void setMarketPrice(String marketPrice) {
		this.marketPrice = marketPrice;
	}


	public String getSoldPrice() {
		return soldPrice;
	}


	public void setSoldPrice(String soldPrice) {
		this.soldPrice = soldPrice;
	}


	public String getColor() {
		return color;
	}


	public void setColor(String color) {
		this.color = color;
	}


	public String getQuantity() {
		return quantity;
	}


	public void setQuantity(String quantity) {
		this.quantity = quantity;
	}


	public String getFrontCode() {
		return frontCode;
	}


	public void setFrontCode(String frontCode) {
		this.frontCode = frontCode;
	}


	public String getBackCode() {
		return backCode;
	}


	public void setBackCode(String backCode) {
		this.backCode = backCode;
	}


	public String getLeftCode() {
		return leftCode;
	}


	public void setLeftCode(String leftCode) {
		this.leftCode = leftCode;
	}


	public String getRightCode() {
		return rightCode;
	}


	public void setRightCode(String rightCode) {
		this.rightCode = rightCode;
	}


	public String getHeadCode() {
		return headCode;
	}


	public void setHeadCode(String headCode) {
		this.headCode = headCode;
	}


	public String getFootCode() {
		return footCode;
	}


	public void setFootCode(String footCode) {
		this.footCode = footCode;
	}


	public String getCategory() {
		return category;
	}


	public void setCategory(String category) {
		this.category = category;
	}


	public Person getPerson() {
		return person;
	}


	public void setPerson(Person person) {
		this.person = person;
	}


	public void setId(Long id) {
		this.id = id;
	}

	
	
	
	
	
	
	
	
	
}
