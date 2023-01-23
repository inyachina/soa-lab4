package com.soa.lab2.service;

import com.soa.lab2.exception.ApiException;
import com.soa.lab2.exception.DecreaseDifficultyException;
import com.soa.lab2.model.Difficulty;
import com.soa.lab2.model.Discipline;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import soa.lab4.DifficultyDto;
import soa.lab4.LabDto;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
@AllArgsConstructor
public class LabServiceImpl implements LabService {
    private CallingServiceImpl callingService;

    @Override
    public List<LabDto> getHardcoreLabs(Integer disciplineId) throws ApiException {
        this.callingService.get("/disciplines/" + disciplineId, Discipline.class);
        LabDto[] labs = this.callingService.get("/labs/all", LabDto[].class);
        return Stream.of(labs).filter(lab -> lab.getDiscipline().getId() == (long) disciplineId)
                .filter(lab -> Difficulty.valueOf(lab.getDifficulty().toString()).equals(Difficulty.VERY_HARD))
                .limit(10).collect(Collectors.toList());
    }

    @Override
    public LabDto decreaseLabDifficulty(Integer labId, Integer stepsCount) throws ApiException {
        LabDto lab = this.callingService.get("/labs/" + labId, LabDto.class);
        Integer currentLevel = Difficulty.valueOf(lab.getDifficulty().toString()).getLevel();

        if (currentLevel - stepsCount < 0) throw new DecreaseDifficultyException("Impossible to decrease on this step");

        lab.setDifficulty(DifficultyDto.valueOf(Objects.requireNonNull(Difficulty.getDifficultyByLevel(currentLevel - stepsCount)).toString()));
        return this.callingService.put("/labs/" + labId, lab);
    }
}
