package com.e_commerce.backend.controllers;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.e_commerce.backend.models.Email;
import com.e_commerce.backend.models.Phone;
import com.e_commerce.backend.repositories.EmailRepository;
import com.e_commerce.backend.repositories.PhoneRepository;

@RequestMapping(value = "/contacts")
@RestController
public class ContactsController {

	private static final Logger LOGGER = LoggerFactory.getLogger(ContactsController.class);

	@Autowired
	PhoneRepository phoneRepository;
	@Autowired
	EmailRepository emailRepository;

	@RequestMapping(value = "/addPhone")
	public ResponseEntity<?> addPhone(@RequestBody Phone phone) {
		LOGGER.info("From class ContactsController , method : addPhone()");
		this.phoneRepository.save(phone);
		return ResponseEntity.ok().body("ok");
	}

	@RequestMapping(value = "/addEmail")
	public ResponseEntity<?> addEmail(@RequestBody Email email) {
		LOGGER.info("From class ContactsController , method : addEmail()");
		this.emailRepository.save(email);
		return ResponseEntity.ok().body("ok");
	}

	@GetMapping(value = "/getAllPhones")
	public ResponseEntity<List<Phone>> getAllPhones() {

		List<Phone> phones = this.phoneRepository.getPhonesByDesc();
		return ResponseEntity.ok().body(phones);
	}

	@GetMapping(value = "/getAllEmails")
	public ResponseEntity<List<Email>> getAllEmails() {

		List<Email> emails = this.emailRepository.getEmailsByDesc();
		return ResponseEntity.ok().body(emails);
	}

	@RequestMapping(value = "/delete/phone/{id}")
	public ResponseEntity<?> deletePhoneById(@PathVariable("id") String id) {

		long longId = Long.valueOf(id);
		Phone phone = this.phoneRepository.getById(longId);
		if (phone != null) {
			this.phoneRepository.delete(phone);

		}
		return ResponseEntity.ok().body("ok");

	}

	
	
	
	
	
	@RequestMapping(value = "/delete/email/{id}")
	public ResponseEntity<?> deleteEmailById(@PathVariable("id") String id) {

		long longId = Long.valueOf(id);
		Email email=this.emailRepository.getById(longId);
		if (email != null) {
			this.emailRepository.delete(email);

		}
		return ResponseEntity.ok().body("ok");

	}

	
	
	
	
	
	
	
	
	
	
}
