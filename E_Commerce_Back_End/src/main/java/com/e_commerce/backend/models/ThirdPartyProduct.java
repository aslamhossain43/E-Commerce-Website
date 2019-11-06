package com.e_commerce.backend.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
@Entity
public class ThirdPartyProduct extends TimeSetting<Long> {

	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	private String yourname;
	private String yourphn;
	private String youraddress;
	
	private String name;
	private String brand;
	private String description;
	private String soldPrice;
	private String color;
	private String quantity;
	private String frontCode;
	private String backCode;
	private String leftCode;
	private String rightCode;
	private String headCode;
	private String footCode;
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
	public void setId(Long id) {
		this.id = id;
	}
	public String getYourname() {
		return yourname;
	}
	public void setYourname(String yourname) {
		this.yourname = yourname;
	}
	public String getYourphn() {
		return yourphn;
	}
	public void setYourphn(String yourphn) {
		this.yourphn = yourphn;
	}
	public String getYouraddress() {
		return youraddress;
	}
	public void setYouraddress(String youraddress) {
		this.youraddress = youraddress;
	}
	@Override
	public String toString() {
		return "ThirdPartyProduct [id=" + id + ", yourname=" + yourname + ", yourphn=" + yourphn + ", youraddress="
				+ youraddress + ", name=" + name + ", brand=" + brand + ", description=" + description + ", soldPrice="
				+ soldPrice + ", color=" + color + ", quantity=" + quantity + ", frontCode=" + frontCode + ", backCode="
				+ backCode + ", leftCode=" + leftCode + ", rightCode=" + rightCode + ", headCode=" + headCode
				+ ", footCode=" + footCode + "]";
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
}
