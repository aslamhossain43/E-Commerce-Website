package com.e_commerce.backend.controllers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.e_commerce.backend.models.PersonAndProductsCombinedForCheckOut;
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

}
