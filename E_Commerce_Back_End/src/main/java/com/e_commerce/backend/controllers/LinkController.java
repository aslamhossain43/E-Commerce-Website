package com.e_commerce.backend.controllers;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.e_commerce.backend.models.Fb;
import com.e_commerce.backend.models.Twitter;
import com.e_commerce.backend.repositories.FbRepository;
import com.e_commerce.backend.repositories.TwitterRepository;

@RequestMapping(value = "/link")
@RestController
public class LinkController {

	private static final Logger LOGGER = LoggerFactory.getLogger(LinkController.class);

	@Autowired
	FbRepository fbRepository;
	@Autowired
	TwitterRepository twitterRepository;

	@RequestMapping(value = "/addFb")
	public ResponseEntity<?> addFb(@RequestBody Fb fb) {
		LOGGER.info("From class LinkCOntroller ,,method()--addFb"+fb.getFblink());
		List<Fb> fbs = this.fbRepository.findAll();
		if (fbs != null) {
			this.fbRepository.deleteAll();
		}

		Fb fb2 = new Fb();
		fb2.setFblink(fb.getFblink());
		this.fbRepository.save(fb2);

		return ResponseEntity.ok().body("ok");

	}

	@RequestMapping(value = "/getFb")
	public ResponseEntity<?> getFb() {
		LOGGER.info("From class LinkCOntroller ,,method()--getFb");
		List<Fb> fbs = this.fbRepository.findAll();

		Fb fb2 = fbs.get(0);

		return ResponseEntity.ok().body(fb2);

	}

	@RequestMapping(value = "/addTwitter")
	public ResponseEntity<?> addTwitter(@RequestBody Twitter twitter) {

		LOGGER.info("From class LinkCOntroller ,,method()--addTwitter"+twitter.getTwitter());
		List<Twitter> twitters = this.twitterRepository.findAll();
		if (twitters != null) {
			this.twitterRepository.deleteAll();
		}

		Twitter twitter2 = new Twitter();
		twitter2.setTwitter(twitter.getTwitter());
		this.twitterRepository.save(twitter2);
		return ResponseEntity.ok().body("ok");

	}
	
	

	@RequestMapping(value = "/getTwitter")
	public ResponseEntity<?> getTwitter() {
		LOGGER.info("From class LinkCOntroller ,,method()--getTwitter");
		List<Twitter> twitters = this.twitterRepository.findAll();

		Twitter twitter = twitters.get(0);

		return ResponseEntity.ok().body(twitter);

	}

}
