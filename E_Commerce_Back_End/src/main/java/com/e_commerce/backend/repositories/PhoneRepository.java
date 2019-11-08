package com.e_commerce.backend.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import com.e_commerce.backend.models.Phone;

public interface PhoneRepository extends JpaRepository<Phone, Long>,JpaSpecificationExecutor<Phone> {

	Phone getById(Long id);
	
	//get Phone By DESC
		static final String PHONE_BY_DESC="FROM Phone ORDER BY id DESC";
		@Query(PHONE_BY_DESC)
		List<Phone>getPhonesByDesc();


	
	
	
}
