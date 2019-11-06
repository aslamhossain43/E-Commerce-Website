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
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.e_commerce.backend.files.FileUpload;
import com.e_commerce.backend.models.Product;
import com.e_commerce.backend.models.ThirdPartyProduct;
import com.e_commerce.backend.repositories.ProductRepository;
import com.e_commerce.backend.repositories.ThirdPartyProductRepository;

@RequestMapping(value = "/thirdParty")
@RestController
public class ThirdPartyProductController {
private static final Logger LOGGER=LoggerFactory.getLogger(ThirdPartyProductController.class);


@Autowired
FileUpload fileUpload;
@Autowired
ThirdPartyProductRepository thirdPartyProductRepository;
public String[] pCodes;
private String photoUrl="/home/atif/SImages/";


@PostMapping(value = "/addtpFiles")
public ResponseEntity<?> addtProductFile(@RequestParam("tpFiles") MultipartFile[] pFiles) {
	LOGGER.info("From class ThirdPartyProductController ,method : addtProductFile()");
	this.pCodes=new String[6];
	ResponseEntity<?> rt = null;
	int index = 0;

	for (MultipartFile multipartFile : pFiles) {

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

			LOGGER.info("From class ThirdPartyProductController ,method : addtProductFile(),Image rejected !");
			rt = ResponseEntity.badRequest().body(null);
			continue;

		} else {

			this.pCodes[index] = "THIRDPARTY" + UUID.randomUUID().toString().replace("-", "");

			try {
				FileUpload.productFileUpload(multipartFile, this.pCodes[index]);
				index++;
			} catch (IOException e) {
				rt = ResponseEntity.badRequest().body(null);

			}
			LOGGER.info("From class ThirdPartyProductController ,method : addtProductFile(),Image uploaded !");
			rt = ResponseEntity.ok().body(" success file upload ");

		}

	}
	return rt;

}

@PostMapping(value = "/addThirdPartyProduct")
public ResponseEntity<?> addtProduct(@RequestBody ThirdPartyProduct product) {
	LOGGER.info("From class ThirdPartyProductController ,method : addtProduct()");

	if (this.pCodes.length != 0) {

		LOGGER.info("pCode : " + this.pCodes);
		
		product.setYourname(product.getYourname());
		product.setYourphn(product.getYourphn());
		product.setYouraddress(product.getYouraddress());
		
		product.setName(product.getName());
		product.setBrand(product.getBrand());
		product.setDescription(product.getDescription());
		product.setSoldPrice(product.getSoldPrice());
		product.setColor(product.getColor());
		product.setQuantity(product.getQuantity());

		product.setFrontCode(this.pCodes[0]);
		product.setBackCode(this.pCodes[1]);
		product.setLeftCode(this.pCodes[2]);
		product.setRightCode(this.pCodes[3]);
		product.setHeadCode(this.pCodes[4]);
		product.setFootCode(this.pCodes[5]);


		thirdPartyProductRepository.save(product);

		LOGGER.info("pCodes : " + this.pCodes);
		this.pCodes = null;
		product.setId(null);

	}
	return ResponseEntity.ok().body("Operation success !");

}

	
@GetMapping(value = "/getAllThirdPartyProducts")
public ResponseEntity<List<ThirdPartyProduct>> getAllgetAllThirdPartyProducts() {

	LOGGER.info("From class ThirdPartyProductsController ,method : getAllgetAllThirdPartyProducts()");

	List<ThirdPartyProduct> thirdPartyProducts = thirdPartyProductRepository.findAll();
	return ResponseEntity.ok().body(thirdPartyProducts);

}
	



@GetMapping(value = "/getThirdPartyProductById/{id}")
public ResponseEntity<ThirdPartyProduct> getThirdPartyProductsById(@PathVariable("id") String id) {
	LOGGER.info("From class ThirdPartyProductsController, method : getThirdPartyProductById() ");

	long longId = Long.valueOf(id);
	ThirdPartyProduct thirdPartyProduct=this.thirdPartyProductRepository.getById(longId);
	
	return ResponseEntity.ok().body(thirdPartyProduct);
}


@RequestMapping(value = "/delete/{id}")
public ResponseEntity<?> deleteThirdPartyProductsById(@PathVariable("id") String id) {
	LOGGER.info("From class ThirdPartyProductsController, method : deleteThirdPartyProductsById() ");

	long longId = Long.valueOf(id);
	ThirdPartyProduct thirdPartyProduct=this.thirdPartyProductRepository.getById(longId);
	
	
	if (thirdPartyProduct.getFrontCode()!=null) {
		
	
	File frontFile=new File(photoUrl+thirdPartyProduct.getFrontCode()+".jpeg");
	frontFile.delete();
	}

	if (thirdPartyProduct.getBackCode()!=null) {
		
	File backFile=new File(photoUrl+thirdPartyProduct.getBackCode()+".jpeg");
	backFile.delete();
	}
if (thirdPartyProduct.getLeftCode()!=null) {
	
	File leftFile=new File(photoUrl+thirdPartyProduct.getLeftCode()+".jpeg");
	leftFile.delete();
}

if (thirdPartyProduct.getRightCode()!=null) {
	
	File rightFile=new File(photoUrl+thirdPartyProduct.getRightCode()+".jpeg");
	rightFile.delete();
}
if (thirdPartyProduct.getHeadCode()!=null) {
	
	
	File headFile=new File(photoUrl+thirdPartyProduct.getHeadCode()+".jpeg");
	headFile.delete();
}
if (thirdPartyProduct.getFootCode()!=null) {
	
	File footerFile=new File(photoUrl+thirdPartyProduct.getFootCode()+".jpeg");
	footerFile.delete();
}
	
	
	this.thirdPartyProductRepository.delete(thirdPartyProduct);

	
	
	return ResponseEntity.ok().body(thirdPartyProduct);
}








	
}
