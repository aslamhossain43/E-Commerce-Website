package com.e_commerce.backend.controllers;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.e_commerce.backend.models.Category;
import com.e_commerce.backend.repositories.CategoryRepository;

@RequestMapping(value = "/categories")
@RestController
public class CategoryController {
	private static final Logger LOGGER = LoggerFactory.getLogger(CategoryController.class);
	@Autowired
	CategoryRepository categoryRepository;
	
	
	@PostMapping(value = "/addCategory")
	public ResponseEntity<?> addCategory(@RequestBody Category category) {
		LOGGER.info("From class CategoryController, method : addCategory() ");
		
		
				categoryRepository.save(category);
			    new Category(null, null);
			
			return ResponseEntity.ok().body("Operation success !");

		
	}
	
	
	
	@GetMapping(value="/getAllCategories")
	public ResponseEntity<List<Category>>getAllCategories(){
		LOGGER.info("From class CategoryController, method : getAllCategories() ");
		List<Category>categories=categoryRepository.findAll();
	return ResponseEntity.ok().body(categories);
	}
	
	
	

}