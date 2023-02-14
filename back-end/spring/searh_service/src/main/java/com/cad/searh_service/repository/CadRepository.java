package com.cad.searh_service.repository;

import com.cad.searh_service.entity.Cad;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface CadRepository extends MongoRepository<Cad, String> {

}
