package com.soa.lab2.repository;

import com.soa.lab2.model.Difficulty;
import com.soa.lab2.model.Lab;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface LabsRepository extends PagingAndSortingRepository<Lab, Integer>, JpaSpecificationExecutor<Lab> {

    List<Lab> findAll();

    Page<Lab> findAll(Pageable pageable);

    List<Lab> findByDifficulty(Difficulty difficulty);

    Lab save(Lab entity);

    Optional<Lab> findById(Integer integer);

    long count();

    void delete(Lab entity);

    void deleteById(Integer id);

}
