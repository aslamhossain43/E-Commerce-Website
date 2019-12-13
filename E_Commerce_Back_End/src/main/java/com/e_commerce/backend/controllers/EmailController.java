package com.e_commerce.backend.controllers;

import javax.mail.internet.MimeMessage;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.e_commerce.backend.models.EmailSending;

@RequestMapping(value = "/email")
@RestController
public class EmailController {
	private static final Logger LOGGER=LoggerFactory.getLogger(EmailController.class);
	@Autowired
	private JavaMailSender sender;
	

@RequestMapping(value = "/send")
public ResponseEntity<?> sendingEmail(@RequestBody EmailSending emailSending) {
	LOGGER.info("From class EmailController,method : sendingEmail()-----ENTER-----");
ResponseEntity<?> rt;
	MimeMessage message = sender.createMimeMessage();
	MimeMessageHelper helper = new MimeMessageHelper(message);

	try {

		helper.setTo("tizaramart@gmail.com");
		helper.setFrom(emailSending.getFrom());
		helper.setSubject("Customer's name : "+emailSending.getName()+", "+"Customer's Phone : "+emailSending.getPhone());
		helper.setText(emailSending.getMessage());
		sendMailAsynchronously(message);
rt=ResponseEntity.ok().body("OK");
	} catch (Exception e) {
		LOGGER.info("From class EmailController,method : sendingEmail()--ERROR---");
		LOGGER.info(e.toString());
		rt=ResponseEntity.badRequest().body(null);
	}
return rt;
}

@Async
private void sendMailAsynchronously(MimeMessage message) {
	LOGGER.info("From sendMailAsynchronously()-----ENTER-----");
	sender.send(message);

}

	
	
	

}
