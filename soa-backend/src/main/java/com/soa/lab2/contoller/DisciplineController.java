package com.soa.lab2.contoller;

import com.soa.lab2.data.dto.DisciplineDTO;
import com.soa.lab2.model.Discipline;
import com.soa.lab2.service.impl.DisciplineServiceImpl;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/disciplines")
@Slf4j
public class DisciplineController {
    private DisciplineServiceImpl disciplineService;

    @Autowired
    public DisciplineController(DisciplineServiceImpl disciplineService) {
        this.disciplineService = disciplineService;
    }

    @GetMapping
    private ResponseEntity getDisciplines(@RequestParam(defaultValue = "0") Integer page,
                                          @RequestParam(defaultValue = "15") Integer size) {
        log.info("Processing get disciplines request: page: {}, size{}", page, size);
        List<Discipline> disciplines = disciplineService.findAll(page, size);
        if (disciplines.isEmpty()) return ResponseEntity.status(HttpStatus.NO_CONTENT).body("Collection is empty");
        else return ResponseEntity.ok().body(disciplines);
    }

    @GetMapping("/{id}")
    private ResponseEntity getDiscipline(@PathVariable Integer id) {
        log.info("Processing get discipline id:{} request", id);
        return ResponseEntity.ok().body(this.disciplineService.getById(id));
    }

    @GetMapping("/amount")
    private ResponseEntity getDisciplinesAmount() {
        log.info("Processing get disciplines amount request");
        return ResponseEntity.ok().body(this.disciplineService.count());
    }


    @PostMapping
    private ResponseEntity saveDiscipline(@RequestBody DisciplineDTO disciplineDTO) {
        log.info("Processing save discipline request");
        return ResponseEntity.ok().body(this.disciplineService.save(disciplineDTO));
    }

    @DeleteMapping("/{id}")
    private ResponseEntity deleteDiscipline(@PathVariable Integer id) {
        log.info("Processing delete discipline request");
        this.disciplineService.deleteById(id);
        return ResponseEntity.ok().body(id);
    }

}
