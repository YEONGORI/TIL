package com.cad.searh_service.repository;

import com.cad.searh_service.entity.Cad;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CadRepository extends JpaRepository<Cad, Long> {
//    Optional<Cad>
}
