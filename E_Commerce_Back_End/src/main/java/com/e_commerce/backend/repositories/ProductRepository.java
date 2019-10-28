package com.e_commerce.backend.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.e_commerce.backend.models.Product;

public interface ProductRepository extends JpaRepository<Product, Long>,JpaSpecificationExecutor<Product> {
Product getById(long id);

//getProductsByIdForSameCategoryAndBrand
	static final String PRODUCT_BY_CATEGORY_AND_BRAND="FROM Product where category=:category and brand=:brand and id!=:longId";
	@Query(PRODUCT_BY_CATEGORY_AND_BRAND)
	List<Product>getProductsByIdForSameCategoryAndBrand(@Param("category") String category,@Param("brand") String brand,@Param("longId")Long longId);

	//getProductsByCategory
		static final String PRODUCT_BY_CATEGORY="FROM Product where category=:category";
		@Query(PRODUCT_BY_CATEGORY)
		List<Product>getProductsByCategory(@Param("category") String category);
	
}
