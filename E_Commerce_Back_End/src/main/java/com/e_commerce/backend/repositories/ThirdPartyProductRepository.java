package com.e_commerce.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.e_commerce.backend.models.ThirdPartyProduct;

public interface ThirdPartyProductRepository extends JpaRepository<ThirdPartyProduct, Long>,JpaSpecificationExecutor<ThirdPartyProduct>{
ThirdPartyProduct getById(Long id);
}
