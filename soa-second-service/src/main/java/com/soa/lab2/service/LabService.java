package com.soa.lab2.service;

import com.soa.lab2.exception.ApiException;
import com.soa.lab2.model.Lab;
import org.springframework.stereotype.Service;

import java.util.List;

public interface LabService {
    List<Lab> getHardcoreLabs(Integer disciplineId) throws ApiException;

    Lab decreaseLabDifficulty(Integer labId, Integer stepsCount) throws ApiException;
}
