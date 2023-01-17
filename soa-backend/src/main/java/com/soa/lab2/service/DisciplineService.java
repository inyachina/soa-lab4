package com.soa.lab2.service;

import com.soa.lab2.data.dto.DisciplineDTO;
import com.soa.lab2.model.Discipline;

import java.util.List;

public interface DisciplineService {
    List<Discipline> findAll(Integer page, Integer size);

    Discipline save(DisciplineDTO disciplineDTO);

    Discipline getById(Integer id);

    void deleteById(Integer id);

    Object count();
}
