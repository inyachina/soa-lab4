package com.soa.lab2.contoller;

import com.soa.lab2.data.dto.LabDTO;
import com.soa.lab2.model.Lab;
import com.soa.lab2.service.impl.LabsServiceImpl;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.Nullable;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/labs")
@Slf4j
public class LabsController {
    private LabsServiceImpl labsService;

    @Autowired
    public LabsController(LabsServiceImpl labsService) {
        this.labsService = labsService;
    }

    @GetMapping
    private ResponseEntity getLabs(@RequestParam(defaultValue = "0") Integer page,
                                   @RequestParam(defaultValue = "15") Integer size,
                                   @RequestParam @Nullable String sort,
                                   @RequestParam @Nullable String filter) {
        log.info("Processing get labs request \npage: {}, \nsize: {}, \nfilter: {}, \nsort: {}", page, size, filter, sort);
        List<Lab> labs = labsService.findAll(page, size, sort, filter);
        if (labs.isEmpty()) return ResponseEntity.noContent().build();
        return ResponseEntity.ok().body(labs);
    }

    @GetMapping("/all")
    private ResponseEntity getLabs() {
        log.info("Processing get labs all request");
        List<Lab> labs = labsService.findAll();
        if (labs.isEmpty()) return ResponseEntity.noContent().build();
        return ResponseEntity.ok().body(labs);
    }

    @GetMapping("/amount")
    private ResponseEntity getLabsAmount() {
        log.info("Processing get labs amount");
        return ResponseEntity.ok().body(this.labsService.count());
    }

    @GetMapping("/{id}")
    private ResponseEntity getLab(@PathVariable Integer id) {
        log.info("Processing get lab request id:{} ", id);
        return ResponseEntity.ok().body(this.labsService.findById(id));
    }

    @PostMapping
    private ResponseEntity<Lab> saveLab(@RequestBody LabDTO labDTO) {
        log.info("Processing save lab request");
        return ResponseEntity.ok().body(this.labsService.save(labDTO));
    }

    @DeleteMapping("/{id}")
    private ResponseEntity deleteLab(@PathVariable Integer id) {
        log.info("Processing delete lab id:{} request", id);
        this.labsService.deleteById(id);
        return new ResponseEntity(HttpStatus.OK);
    }

    @PutMapping("/{id}")
    private ResponseEntity updateLab(@PathVariable Integer id, @RequestBody LabDTO labDTO) {
        log.info("Processing get update id:{} request", id);
        return ResponseEntity.ok().body(this.labsService.update(id, labDTO));
    }
}
