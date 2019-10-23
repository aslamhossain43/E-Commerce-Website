package com.e_commerce.backend.controllers;

import java.util.List;
import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.e_commerce.backend.files.FileUpload;
import com.e_commerce.backend.models.Product;
import com.e_commerce.backend.repositories.ProductRepository;

@RequestMapping(value = "/products")
@RestController
public class ProductController {

	private static final Logger LOGGER = LoggerFactory.getLogger(ProductController.class);
	@Autowired
	FileUpload fileUpload;
	@Autowired
	ProductRepository productRepository;
	public String pCode = null;
	private static final String ABS_PATH = "/home/atif/SImages";

	@PostMapping(value = "/addFile")
	public ResponseEntity<?> addProductFile(@RequestParam("pFile") MultipartFile pFile) {
		LOGGER.info("From class ProductController ,method : addProductFile()");
		if ((pFile.getContentType().equals("image/jpeg") || pFile.getContentType().equals("image/jpg")
				|| pFile.getContentType().equals("image/png") || pFile.getContentType().equals("image/gif"))) {

			this.pCode = "P" + UUID.randomUUID().toString().substring(26).toUpperCase();

			FileUpload.fileUpload(pFile, pCode);
			LOGGER.info(this.pCode);
			LOGGER.info("From class ProductController ,method : addProductFile(),Image uploaded");
			return ResponseEntity.ok().body(" success file upload ");
		} else {
			LOGGER.info("From class ProductController ,method : addProductFile(), File not an image that is rejected");
			return ResponseEntity.badRequest().body(null);

		}

	}

	@PostMapping(value = "/addProduct")
	public ResponseEntity<?> addProduct(@RequestBody Product product) {
		LOGGER.info("From class ProductController ,method : addProduct()");

		if (!(this.pCode.equals(null))) {

			LOGGER.info("piCode : " + this.pCode);
			product.setpCode(this.pCode);
			product.setCategory(product.getCategory());

			product.setColor(product.getColor());
			product.setName(product.getName());
			product.setQuantity(product.getQuantity());
			product.setPrice(product.getPrice());

			productRepository.save(product);

			LOGGER.info("pCode : " + this.pCode);
			this.pCode = null;
			product.setId(null);

		}
		return ResponseEntity.ok().body("Operation success !");

	}

	@GetMapping(value = "/getAllProducts")
	public ResponseEntity<List<Product>> getAllProduct() {

		LOGGER.info("From class ProductController ,method : getAllProducts()");

		List<Product> products = productRepository.findAll();
		return ResponseEntity.ok().body(products);

	}

}
