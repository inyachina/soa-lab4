package com.soa.lab2.contoller;


import com.soa.lab2.model.Difficulty;
import com.soa.lab2.model.Lab;
import com.soa.lab2.service.impl.LabsServiceImpl;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api/v1/labs")
@Slf4j
@RestController
public class AdditionalLabsController {
    private LabsServiceImpl labsService;

    @Autowired
    public AdditionalLabsController(LabsServiceImpl labsService) {
        this.labsService = labsService;
    }

    @GetMapping("/average/minimal_point")
    public ResponseEntity getAverageMinimalPoint() {
        log.info("Processing get average minimal point request");
        List<Lab> labs = this.labsService.findAll();
        if (labs.isEmpty()) return ResponseEntity.noContent().build();
        return ResponseEntity.ok().body(labs.stream().mapToDouble(Lab::getMinimalPoint).average());
    }

    @DeleteMapping("/delete_by/difficulty")
    public ResponseEntity deleteByDifficulty(@RequestParam String difficulty) {
        log.info("Processing delete lab by difficulty :{} request", difficulty);
        this.labsService.deleteByDifficulty(Difficulty.valueOf(difficulty));
        return ResponseEntity.ok().build();
    }
}
