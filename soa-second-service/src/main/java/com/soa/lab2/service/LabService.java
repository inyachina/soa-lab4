package com.soa.lab2.service;

import com.soa.lab2.exception.ApiException;
import soa.lab4.LabDto;

import java.util.List;

public interface LabService {
    List<LabDto> getHardcoreLabs(Integer disciplineId) throws ApiException;

    LabDto decreaseLabDifficulty(Integer labId, Integer stepsCount) throws ApiException;
}
