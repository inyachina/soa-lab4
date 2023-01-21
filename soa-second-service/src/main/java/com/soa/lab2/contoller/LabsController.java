package com.soa.lab2.contoller;

import com.soa.lab2.model.Lab;
import com.soa.lab2.service.LabServiceImpl;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.ws.server.endpoint.annotation.Endpoint;
import org.springframework.ws.server.endpoint.annotation.PayloadRoot;
import org.springframework.ws.server.endpoint.annotation.RequestPayload;
import org.springframework.ws.server.endpoint.annotation.ResponsePayload;
import soa.lab4.DecreaseLabDifficultyRequest;
import soa.lab4.GetHardcoreLabsRequest;

import java.util.List;

@Slf4j
@Endpoint
@AllArgsConstructor
public class LabsController {
    private static final String NAMESPACE_URI = "http://soa/lab4";
    private final LabServiceImpl labService;

    @PayloadRoot(namespace = NAMESPACE_URI, localPart = "getHardcoreLabsRequest")
    @ResponsePayload
    private ResponseEntity getHardcore(@RequestPayload GetHardcoreLabsRequest request) {
        List<Lab> labs = this.labService.getHardcoreLabs(request.getDisciplineId());
        if (labs.isEmpty()) return ResponseEntity.noContent().build();

        return ResponseEntity.ok().body(labs);
    }

    @PayloadRoot(namespace = NAMESPACE_URI, localPart = "decreaseLabDifficultyRequest")
    @ResponsePayload
    private ResponseEntity decreaseLabDifficulty(@RequestPayload DecreaseLabDifficultyRequest request) {
        return ResponseEntity.ok().body(this.labService.decreaseLabDifficulty(request.getDisciplineId(), request.getDisciplineId()));
    }
}