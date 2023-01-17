package com.soa.lab2.repository;

import com.soa.lab2.model.Discipline;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DisciplineRepository extends CrudRepository<Discipline, Integer> {
    List<Discipline> findAll();

    List<Discipline> findAll(Pageable pageable);

    Discipline save(Discipline discipline);

    Optional<Discipline> findById(Integer id);

    Optional<Discipline> getByName(String id);

    long count();

    void deleteById(Integer id);
}
