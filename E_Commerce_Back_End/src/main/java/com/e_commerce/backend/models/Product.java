package com.e_commerce.backend.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Product extends TimeSetting<Long> {

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
	private String pCode;
	private String category;

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

	public String getpCode() {
		return pCode;
	}

	public void setpCode(String pCode) {
		this.pCode = pCode;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public void setId(Long id) {
		this.id = id;
	}

	@Override
	public String toString() {
		return "Product [id=" + id + ", name=" + name + ", brand=" + brand + ", description=" + description
				+ ", marketPrice=" + marketPrice + ", soldPrice=" + soldPrice + ", color=" + color + ", quantity="
				+ quantity + ", pCode=" + pCode + ", category=" + category + "]";
	}

	
	
	
	
	
	
}
