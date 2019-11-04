package com.e_commerce.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.e_commerce.backend.models.Person;

public interface PersonRepository extends JpaRepository<Person, Long>,JpaSpecificationExecutor<Person> {
Person getById(Long id);
}
