package com.e_commerce.backend.models;

import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

@Entity
public class Person extends TimeSetting<Long> {
	
	

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
private String firstName;
private String lastName;
private String phone;
private String email;
private String presentAddress;
private String permanentAddress;
private String promoCode;

@OneToMany(mappedBy="person",cascade=CascadeType.ALL)
private Set<ProductsForCheckOut> productsForCheckOuts;

@Override
public Long getId() {
	// TODO Auto-generated method stub
	return id;
}

public String getFirstName() {
	return firstName;
}

public void setFirstName(String firstName) {
	this.firstName = firstName;
}

public String getLastName() {
	return lastName;
}

public void setLastName(String lastName) {
	this.lastName = lastName;
}

public String getPhone() {
	return phone;
}

public void setPhone(String phone) {
	this.phone = phone;
}

public String getEmail() {
	return email;
}

public void setEmail(String email) {
	this.email = email;
}

public String getPresentAddress() {
	return presentAddress;
}

public void setPresentAddress(String presentAddress) {
	this.presentAddress = presentAddress;
}

public String getPermanentAddress() {
	return permanentAddress;
}

public void setPermanentAddress(String permanentAddress) {
	this.permanentAddress = permanentAddress;
}

public String getPromoCode() {
	return promoCode;
}

public void setPromoCode(String promoCode) {
	this.promoCode = promoCode;
}

public Set<ProductsForCheckOut> getProductsForCheckOuts() {
	return productsForCheckOuts;
}

public void setProductsForCheckOuts(Set<ProductsForCheckOut> productsForCheckOuts) {
	this.productsForCheckOuts = productsForCheckOuts;
}

public void setId(Long id) {
	this.id = id;
}




}
