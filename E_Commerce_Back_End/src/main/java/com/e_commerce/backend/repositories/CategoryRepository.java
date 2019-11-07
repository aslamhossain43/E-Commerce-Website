package com.e_commerce.backend.repositories;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import com.e_commerce.backend.models.Category;


public interface CategoryRepository extends JpaRepository<Category, Long>,JpaSpecificationExecutor<Category>{
Category getById(long id);

	//getProducts By ASC
		static final String CATEGORY_BY_DESC="FROM Category ORDER BY id DESC";
		@Query(CATEGORY_BY_DESC)
		List<Category>getCategoriesByDESC();

}