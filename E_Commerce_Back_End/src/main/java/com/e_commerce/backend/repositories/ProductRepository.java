package com.e_commerce.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.e_commerce.backend.models.Product;

public interface ProductRepository extends JpaRepository<Product, Long>,JpaSpecificationExecutor<Product> {
Product getById(long id);
}
