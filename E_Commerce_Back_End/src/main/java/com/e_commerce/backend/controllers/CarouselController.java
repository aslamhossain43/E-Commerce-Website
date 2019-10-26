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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.e_commerce.backend.files.FileUpload;
import com.e_commerce.backend.models.Carousel;
import com.e_commerce.backend.repositories.CarouselRepository;

@RequestMapping(value = "/carousel")
@RestController
public class CarouselController {

	private static final Logger LOGGER = LoggerFactory.getLogger(CarouselController.class);
	@Autowired
	FileUpload fileUpload;
	@Autowired
	CarouselRepository carouselRepository;
	private static final String ABS_PATH = "/home/atif/SImages/";

	@RequestMapping(value = "/addCFiles")
	public ResponseEntity<?> addCarouselFiles(@RequestParam("cFiles") MultipartFile[] cFile) {
		LOGGER.info("From class CarouselController ,method : addCarouselFiles()");
		ResponseEntity<?> rt = null;

		List<Carousel> carousels = carouselRepository.findAll();

		for (MultipartFile multipartFile : cFile) {

			if ((multipartFile.getContentType().equals("image/jpeg")
					|| multipartFile.getContentType().equals("image/jpg")
					|| multipartFile.getContentType().equals("image/png")
					|| multipartFile.getContentType().equals("image/gif")
					|| multipartFile.getContentType().equals("image/jfif")
					|| multipartFile.getContentType().equals("image/exif")
					|| multipartFile.getContentType().equals("image/tiff")
					|| multipartFile.getContentType().equals("image/bmp")
					|| multipartFile.getContentType().equals("image/ppm")
					|| multipartFile.getContentType().equals("image/pgm")
					|| multipartFile.getContentType().equals("image/pbm")
					|| multipartFile.getContentType().equals("image/pnm")
					|| multipartFile.getContentType().equals("image/webp")
					|| multipartFile.getContentType().equals("image/heif")
					|| multipartFile.getContentType().equals("image/bat")
					|| multipartFile.getContentType().equals("image/bpg")
					|| multipartFile.getContentType().equals("image/cgm")
					|| multipartFile.getContentType().equals("image/svg")

			)) {

				if (carousels != null) {

					for (Carousel carousel : carousels) {

						File carouselFile = new File(ABS_PATH + carousel.getcCode() + ".jpeg");
						carouselFile.delete();
						carouselRepository.deleteById(carousel.getId());
						LOGGER.info("From class CarouselController ,method : addCarouselFiles(), image : "
								+ carousel.getId());
					}
				}

			} else {
				break;
			}
			break;
		}

		for (MultipartFile multipartFile : cFile) {

			if (!(multipartFile.getContentType().equals("image/jpeg")
					|| multipartFile.getContentType().equals("image/jpg")
					|| multipartFile.getContentType().equals("image/png")
					|| multipartFile.getContentType().equals("image/gif")
					|| multipartFile.getContentType().equals("image/jfif")
					|| multipartFile.getContentType().equals("image/exif")
					|| multipartFile.getContentType().equals("image/tiff")
					|| multipartFile.getContentType().equals("image/bmp")
					|| multipartFile.getContentType().equals("image/ppm")
					|| multipartFile.getContentType().equals("image/pgm")
					|| multipartFile.getContentType().equals("image/pbm")
					|| multipartFile.getContentType().equals("image/pnm")
					|| multipartFile.getContentType().equals("image/webp")
					|| multipartFile.getContentType().equals("image/heif")
					|| multipartFile.getContentType().equals("image/bat")
					|| multipartFile.getContentType().equals("image/bpg")
					|| multipartFile.getContentType().equals("image/cgm")
					|| multipartFile.getContentType().equals("image/svg")

			)) {

				LOGGER.info("From class CarouselController ,method : addCarouselFiles(), image : "
						+ multipartFile.getName() + " is rejected");
				rt = ResponseEntity.badRequest().body(null);
				continue;

			} else {

				String cCode = "C" + UUID.randomUUID().toString().substring(26).toUpperCase();

				try {
					FileUpload.carouselFileUpload(multipartFile, cCode);
				} catch (IOException e) {
					rt = ResponseEntity.badRequest().body(null);

				}
				Carousel carousel = new Carousel();
				carousel.setcCode(cCode);
				carouselRepository.save(carousel);

				LOGGER.info(cCode);
				LOGGER.info("From class CarouselController ,method : addCarouselFiles(),Image "
						+ multipartFile.getName() + " is uploaded");
				rt = ResponseEntity.ok().body(" success file upload ");

			}

		}
		return rt;

	}

	@GetMapping(value = "/getAllCarousel")
	public ResponseEntity<List<Carousel>> getAllCarousel() {

		LOGGER.info("From class CarouselController ,method : getAllCarousel()");

		List<Carousel> carousels = carouselRepository.findAll();
		return ResponseEntity.ok().body(carousels);

	}

}
