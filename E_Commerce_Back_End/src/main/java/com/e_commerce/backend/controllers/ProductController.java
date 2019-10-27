package com.e_commerce.backend.controllers;

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
import com.e_commerce.backend.repositories.ProductRepository;

@RequestMapping(value = "/products")
@RestController
public class ProductController {

	private static final Logger LOGGER = LoggerFactory.getLogger(ProductController.class);
	@Autowired
	FileUpload fileUpload;
	@Autowired
	ProductRepository productRepository;
	public String[] pCodes = new String[6];
	int index = 0;

	@PostMapping(value = "/addFiles")
	public ResponseEntity<?> addProductFile(@RequestParam("pFiles") MultipartFile[] pFiles) {
		LOGGER.info("From class ProductController ,method : addProductFile()");
		ResponseEntity<?> rt = null;

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

				LOGGER.info("From class ProductController ,method : addProductFile(),Image rejected !");
				rt = ResponseEntity.badRequest().body(null);
				continue;

			} else {

				this.pCodes[index] = "P" + UUID.randomUUID().toString().substring(26).toUpperCase();

				try {
					FileUpload.productFileUpload(multipartFile, this.pCodes[index]);
					index++;
				} catch (IOException e) {
					rt = ResponseEntity.badRequest().body(null);

				}
				LOGGER.info("From class ProductController ,method : addProductFile(),Image uploaded !");
				rt = ResponseEntity.ok().body(" success file upload ");

			}

		}
		index = 0;
		return rt;

	}

	@PostMapping(value = "/addProduct")
	public ResponseEntity<?> addProduct(@RequestBody Product product) {
		LOGGER.info("From class ProductController ,method : addProduct()");

		if (this.pCodes.length != 0) {

			LOGGER.info("pCode : " + this.pCodes);
			product.setName(product.getName());
			product.setBrand(product.getBrand());
			product.setDescription(product.getDescription());
			product.setMarketPrice(product.getMarketPrice());
			product.setSoldPrice(product.getSoldPrice());
			product.setColor(product.getColor());
			product.setQuantity(product.getQuantity());

			product.setFrontCode(this.pCodes[0]);
			product.setBackCode(this.pCodes[1]);
			product.setLeftCode(this.pCodes[2]);
			product.setRightCode(this.pCodes[3]);
			product.setHeadCode(this.pCodes[4]);
			product.setFootCode(this.pCodes[5]);

			product.setCategory(product.getCategory());

			productRepository.save(product);

			LOGGER.info("pCodes : " + this.pCodes);
			this.pCodes = null;
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

	@GetMapping(value = "/getProductById/{id}")
	public ResponseEntity<Product> getProductById(@PathVariable("id") Long id) {
		LOGGER.info("From class ProductController, method : getProductById() ");
		Product product = productRepository.getById(id);
		LOGGER.info("" + product);
		return ResponseEntity.ok().body(product);
	}

	@GetMapping(value = "/getProductsByIdForSameCategory/{id}")
	public ResponseEntity<List<Product>> getProductsByIdForSameCategory(@PathVariable("id") String id) {
		LOGGER.info("From class ProductController, method : getProductsByIdForSameCategory() ");

		long longId = Long.valueOf(id);
		Product product = productRepository.getById(longId);
		String category = product.getCategory();
		String brand = product.getBrand();
		
		
		List<Product> products = productRepository.getProductsByIdForSameCategoryAndBrand(category,brand, longId);

		return ResponseEntity.ok().body(products);
	}

}
