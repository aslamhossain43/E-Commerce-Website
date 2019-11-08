package com.e_commerce.backend.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import com.e_commerce.backend.models.Email;

public interface EmailRepository extends JpaRepository<Email, Long>,JpaSpecificationExecutor<Email> {

	Email getById(Long id);
	
	//get Email By DESC
			static final String EMAIL_BY_DESC="FROM Email ORDER BY id DESC";
			@Query(EMAIL_BY_DESC)
			List<Email>getEmailsByDesc();

	
}
