package com.e_commerce.backend.controllers;

import java.io.File;
import java.io.IOException;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
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

@RequestMapping(value = "/products")
@RestController
public class ProductController {

	private static final Logger LOGGER = LoggerFactory.getLogger(ProductController.class);
	@Autowired
	FileUpload fileUpload;
	@Autowired
	ProductRepository productRepository;
	public String[] pCodes;
	private String photoUrl="/home/atif/SImages/";

	
	@PostMapping(value = "/addFiles")
	public ResponseEntity<?> addProductFile(@RequestParam("pFiles") MultipartFile[] pFiles) {
		LOGGER.info("From class ProductController ,method : addProductFile()");
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

				LOGGER.info("From class ProductController ,method : addProductFile(),Image rejected !");
				rt = ResponseEntity.badRequest().body(null);
				continue;

			} else {

				this.pCodes[index] = "PRODUCT" + UUID.randomUUID().toString().replace("-", "");

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
		return rt;

	}

	@PostMapping(value = "/addProduct")
	public ResponseEntity<?> addProduct(@RequestBody Product product) {
		LOGGER.info("From class ProductController ,method : addProduct()");

		if (this.pCodes.length != 0) {
			if (product.getId()==null) {
				
			

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
			}else {
				
				
				

				long longId = Long.valueOf(product.getId());
				Product p=this.productRepository.getById(longId);
				
				
				if (p.getFrontCode()!=null) {
					
				
				File frontFile=new File(photoUrl+p.getFrontCode()+".jpeg");
				frontFile.delete();
				}

				if (p.getBackCode()!=null) {
					
				File backFile=new File(photoUrl+p.getBackCode()+".jpeg");
				backFile.delete();
				}
			if (p.getLeftCode()!=null) {
				
				File leftFile=new File(photoUrl+p.getLeftCode()+".jpeg");
				leftFile.delete();
			}

			if (p.getRightCode()!=null) {
				
				File rightFile=new File(photoUrl+p.getRightCode()+".jpeg");
				rightFile.delete();
			}
			if (p.getHeadCode()!=null) {
				
				
				File headFile=new File(photoUrl+p.getHeadCode()+".jpeg");
				headFile.delete();
			}
			if (p.getFootCode()!=null) {
				
				File footerFile=new File(photoUrl+p.getFootCode()+".jpeg");
				footerFile.delete();
			}
				

			p.setId(longId);
			p.setName(product.getName());
			p.setBrand(product.getBrand());
			p.setDescription(product.getDescription());
			p.setMarketPrice(product.getMarketPrice());
			p.setSoldPrice(product.getSoldPrice());
			p.setColor(product.getColor());
			p.setQuantity(product.getQuantity());

			p.setFrontCode(this.pCodes[0]);
			p.setBackCode(this.pCodes[1]);
			p.setLeftCode(this.pCodes[2]);
			p.setRightCode(this.pCodes[3]);
			p.setHeadCode(this.pCodes[4]);
			p.setFootCode(this.pCodes[5]);

			p.setCategory(product.getCategory());

			productRepository.save(p);

			LOGGER.info("pCodes : " + this.pCodes);
			this.pCodes = null;
			product.setId(null);

				
			
				
			}
			
			
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
	
	
	
	
	@GetMapping(value = "/getProductsByCategory/{category}")
	public ResponseEntity<List<Product>> getProductsByCategory(@PathVariable("category") String category) {
		LOGGER.info("From class ProductController, method : getProductsByCategory() ");
		
		List<Product> products = productRepository.getProductsByCategory(category);

		return ResponseEntity.ok().body(products);
	}
	
	@GetMapping(value = "/getProductsByBrand/{brand}")
	public ResponseEntity<List<Product>> getProductsByBrand(@PathVariable("brand") String brand) {
		LOGGER.info("From class ProductController, method : getProductsByBrand() ");
		
		List<Product> products = productRepository.getProductsByBrand(brand);

		return ResponseEntity.ok().body(products);
	}
	
	
	
	
	
	
	
	
	@GetMapping(value = "/getProductsCategoryNoDuplicate")
	public ResponseEntity<Set<String>> getProductsCategoryNoDuplicate() {
		LOGGER.info("From class ProductController, method : getProductsCategoryNoDuplicate() ");
		
		Set<String>categories=new HashSet<String>(); 
		List<Product> products = productRepository.findAll();
		for (Product product : products) {
			categories.add(product.getCategory());
		}

		return ResponseEntity.ok().body(categories);
	}
	
	
	@GetMapping(value = "/getProductsBrandNoDuplicate")
	public ResponseEntity<Set<String>> getProductsBrandNoDuplicate() {
		LOGGER.info("From class ProductController, method : getProductsBrandNoDuplicate() ");
		
		Set<String>brands=new HashSet<String>(); 
		List<Product> products = productRepository.findAll();
		for (Product product : products) {
			brands.add(product.getBrand());
		}

		return ResponseEntity.ok().body(brands);
	}
	
	@GetMapping(value = "/getProductsColorNoDuplicate")
	public ResponseEntity<Set<String>> getProductsColorNoDuplicate() {
		LOGGER.info("From class ProductController, method : getProductsColorNoDuplicate() ");
		
		Set<String>colors=new HashSet<String>(); 
		List<Product> products = productRepository.findAll();
		for (Product product : products) {
			colors.add(product.getColor());
		}

		return ResponseEntity.ok().body(colors);
	}
	
	
	@GetMapping(value = "/getProductsNamesNoDuplicate")
	public ResponseEntity<Set<String>> getProductsNamesNoDuplicate() {
		LOGGER.info("From class ProductController, method : getProductsNamesNoDuplicate() ");
		
		Set<String>names=new HashSet<String>(); 
		List<Product> products = productRepository.findAll();
		for (Product product : products) {
			names.add(product.getName());
		}

		return ResponseEntity.ok().body(names);
	}
	
	
	
	
	
	
	

@RequestMapping(value = "/delete/{id}")
public ResponseEntity<?> deleteProductById(@PathVariable("id") String id) {
	LOGGER.info("From class ProductsController, method : deleteProductById() ");

	long longId = Long.valueOf(id);
	Product product=this.productRepository.getById(longId);
	
	
	if (product.getFrontCode()!=null) {
		
	
	File frontFile=new File(photoUrl+product.getFrontCode()+".jpeg");
	frontFile.delete();
	}

	if (product.getBackCode()!=null) {
		
	File backFile=new File(photoUrl+product.getBackCode()+".jpeg");
	backFile.delete();
	}
if (product.getLeftCode()!=null) {
	
	File leftFile=new File(photoUrl+product.getLeftCode()+".jpeg");
	leftFile.delete();
}

if (product.getRightCode()!=null) {
	
	File rightFile=new File(photoUrl+product.getRightCode()+".jpeg");
	rightFile.delete();
}
if (product.getHeadCode()!=null) {
	
	
	File headFile=new File(photoUrl+product.getHeadCode()+".jpeg");
	headFile.delete();
}
if (product.getFootCode()!=null) {
	
	File footerFile=new File(photoUrl+product.getFootCode()+".jpeg");
	footerFile.delete();
}
	
	
	this.productRepository.delete(product);

	
	
	return ResponseEntity.ok().body("OK");
}


	

	
	
	
	

}
