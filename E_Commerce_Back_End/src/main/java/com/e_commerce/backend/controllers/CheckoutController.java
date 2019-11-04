package com.e_commerce.backend.controllers;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.e_commerce.backend.models.Person;
import com.e_commerce.backend.models.PersonAndProductsCombinedForCheckOut;
import com.e_commerce.backend.models.ProductsForCheckOut;
import com.e_commerce.backend.repositories.PersonRepository;

@RequestMapping(value = "/checkout")
@RestController
public class CheckoutController {
	private static final Logger LOGGER = LoggerFactory.getLogger(CheckoutController.class);

	@Autowired
	PersonRepository personRepository;

	@PostMapping(value = "/addCheckout")
	public ResponseEntity<?> addCheckout(
			@RequestBody PersonAndProductsCombinedForCheckOut personAndProductsCombinedForCheckOut) {

//you must assign id null in client side for both related models

		LOGGER.info("From class CheckoutController method addCheckout()-enter---- ");
 LOGGER.info(""+personAndProductsCombinedForCheckOut.getProductsForCheckOuts().toString());
 LOGGER.info(""+personAndProductsCombinedForCheckOut.getPerson().toString());
 personAndProductsCombinedForCheckOut.getPerson()
				.setProductsForCheckOuts(personAndProductsCombinedForCheckOut.getProductsForCheckOuts());
 personAndProductsCombinedForCheckOut.getProductsForCheckOuts()
				.forEach(x -> x.setPerson(personAndProductsCombinedForCheckOut.getPerson()));
		personRepository.save(personAndProductsCombinedForCheckOut.getPerson());

		return ResponseEntity.ok().body("OK");
	}
	
	@RequestMapping(value = "/getAllCheckout")
	public ResponseEntity<?>getAllCheckout(){
		
		List<Person>pList=this.personRepository.findAll();
		Person person;
		
		PersonAndProductsCombinedForCheckOut personAndProductsCombinedForCheckOut;
		
		List<PersonAndProductsCombinedForCheckOut>personAndProductsCombinedForCheckOuts=new ArrayList<PersonAndProductsCombinedForCheckOut>();
		
		for (Person person2:pList) {
			person=new Person();
			personAndProductsCombinedForCheckOut=new PersonAndProductsCombinedForCheckOut();
			
			person.setId(person2.getId());
			person.setFirstName(person2.getFirstName());
			person.setLastName(person2.getLastName());
			person.setPhone(person2.getPhone());
			person.setEmail(person2.getEmail());
			person.setPresentAddress(person2.getPresentAddress());
			person.setPermanentAddress(person2.getPermanentAddress());
			person.setPromoCode(person2.getPromoCode());
			person.setTotal(person2.getTotal());
			person.setCartNumber(person2.getCartNumber());
			person.setCreatedDate(person2.getCreatedDate());
			
            personAndProductsCombinedForCheckOut.setPerson(person);
			personAndProductsCombinedForCheckOut.setProductsForCheckOuts(person2.getProductsForCheckOuts());
			
			personAndProductsCombinedForCheckOuts.add(personAndProductsCombinedForCheckOut);
			
			
			
			
		}
		
		
		
		
		
		
		
		
		return ResponseEntity.ok().body(personAndProductsCombinedForCheckOuts);
		
		
		
	}
	
	//----------------------------------------------------------------------------------------
	@RequestMapping(value = "/delete/{id}")
	public ResponseEntity<?> deleteById(@PathVariable("id") String id) {
	
		long longId=Long.parseLong(id);
		LOGGER.info("From class CheckOutController,method : deleteById()---enter---");
		Person person=this.personRepository.getById(longId);
		this.personRepository.delete(person);
		return ResponseEntity.ok().body("---DELETED ID : "+id);
	}
	
	
	
	

}
