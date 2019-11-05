package com.e_commerce.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.e_commerce.backend.models.Fb;

public interface FbRepository extends JpaRepository<Fb, Long>,JpaSpecificationExecutor<Fb> {

}
