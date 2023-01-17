package com.soa.lab2.service;

import com.soa.lab2.data.dto.LabDTO;
import com.soa.lab2.exception.NotFoundException;
import com.soa.lab2.model.Difficulty;
import com.soa.lab2.model.Lab;

import java.util.List;

public interface LabsService {
    List<Lab> findAll();

    public List<Lab> findAll(int page, int size, String sort, String filter);

    Lab save(LabDTO entity);

    Lab findById(Integer integer) throws NotFoundException;

    long count();

    void delete(Lab entity) throws NotFoundException;

    void deleteById(Integer id) throws NotFoundException;

    void deleteByDifficulty(Difficulty difficulty) throws NotFoundException;

    Lab update(Integer id, LabDTO labDTO) throws NotFoundException;
}
