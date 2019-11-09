package com.e_commerce.backend.controllers;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.e_commerce.backend.files.FileUpload;
import com.e_commerce.backend.models.Email;
import com.e_commerce.backend.models.GoogleMap;
import com.e_commerce.backend.models.Phone;
import com.e_commerce.backend.repositories.EmailRepository;
import com.e_commerce.backend.repositories.GoogleMapRepository;
import com.e_commerce.backend.repositories.PhoneRepository;

@RequestMapping(value = "/contacts")
@RestController
public class ContactsController {

	private static final Logger LOGGER = LoggerFactory.getLogger(ContactsController.class);

	@Autowired
	PhoneRepository phoneRepository;
	@Autowired
	EmailRepository emailRepository;
	
@Autowired
GoogleMapRepository googleMapRepository;
	private static final String ABS_PATH = "/home/atif/SImages/";

	@Autowired
	FileUpload fileUpload;
	private String gMCode;
	
	
	
	
	
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

	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	@RequestMapping(value = "/addGMFile")
	public ResponseEntity<?> addGMFile(@RequestParam("gMFile") MultipartFile gMFile) {
		LOGGER.info("From class ContactController ,method : addGMFile()");
		ResponseEntity<?> rt = null;
this.gMCode=null;
		List<GoogleMap> googleMaps = this.googleMapRepository.findAll();

			if ((gMFile.getContentType().equals("image/jpeg")
					|| gMFile.getContentType().equals("image/jpg")
					|| gMFile.getContentType().equals("image/png")
					|| gMFile.getContentType().equals("image/gif")
					|| gMFile.getContentType().equals("image/jfif")
					|| gMFile.getContentType().equals("image/exif")
					|| gMFile.getContentType().equals("image/tiff")
					|| gMFile.getContentType().equals("image/bmp")
					|| gMFile.getContentType().equals("image/ppm")
					|| gMFile.getContentType().equals("image/pgm")
					|| gMFile.getContentType().equals("image/pbm")
					|| gMFile.getContentType().equals("image/pnm")
					|| gMFile.getContentType().equals("image/webp")
					|| gMFile.getContentType().equals("image/heif")
					|| gMFile.getContentType().equals("image/bat")
					|| gMFile.getContentType().equals("image/bpg")
					|| gMFile.getContentType().equals("image/cgm")
					|| gMFile.getContentType().equals("image/svg")

			)) {

			if (googleMaps!=null) {
				for (GoogleMap googleMap2 : googleMaps) {
					
				
				File gMapFile = new File(ABS_PATH + googleMap2.getgMap() + ".jpeg");
				gMapFile.delete();
			
				this.googleMapRepository.delete(googleMap2);
				
				}
				
				
				
				
				
			}	
			this.gMCode = "GMAP" + UUID.randomUUID().toString().replace("-", "");

			
			try {
				FileUpload.carouselFileUpload(gMFile, this.gMCode);
			} catch (IOException e) {
				rt = ResponseEntity.badRequest().body(null);

			}

			
			GoogleMap googleMap1=new GoogleMap();
			googleMap1.setgMap(this.gMCode);
			
			this.googleMapRepository.save(googleMap1);
			
			rt = ResponseEntity.ok().body(" success file upload ");

			
			}else {
				LOGGER.info("From class ContactsController ,method : addgMFile(), image  is rejected");
				rt = ResponseEntity.badRequest().body(null);
				
			}
					return rt;

	}

	@GetMapping(value = "/getGMPhoto")
	public ResponseEntity<GoogleMap> getGMphoto() {

		LOGGER.info("From class ContactsController ,method : getGMphoto()");

		List<GoogleMap> googleMaps = this.googleMapRepository.findAll();
		return ResponseEntity.ok().body(googleMaps.get(0));

	}

	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
}
