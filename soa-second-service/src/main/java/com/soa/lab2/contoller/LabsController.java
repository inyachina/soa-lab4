package com.soa.lab2.contoller;

import com.soa.lab2.model.Lab;
import com.soa.lab2.service.LabService;
import com.soa.lab2.service.LabServiceImpl;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("bars/api/v1")
@AllArgsConstructor
public class LabsController {
    private final LabServiceImpl labService;

    @GetMapping("/disciplines/{discipline-id}/get-hardcore")
    private ResponseEntity getHardcore(@PathVariable(name = "discipline-id") Integer disciplineId) {
        List<Lab> labs = this.labService.getHardcoreLabs(disciplineId);
        if (labs.isEmpty()) return ResponseEntity.noContent().build();

        return ResponseEntity.ok().body(labs);
    }

    @PostMapping("/labwork/{labwork-id}/difficulty/decrease/{steps-count}")
    private ResponseEntity decreaseLabDifficulty(@PathVariable("labwork-id") Integer labId, @PathVariable("steps-count") Integer stepsCount) {
        return ResponseEntity.ok().body(this.labService.decreaseLabDifficulty(labId, stepsCount));
    }
}