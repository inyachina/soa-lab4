package com.soa.lab2.contoller;

import com.soa.lab2.service.LabServiceImpl;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.ws.server.endpoint.annotation.Endpoint;
import org.springframework.ws.server.endpoint.annotation.PayloadRoot;
import org.springframework.ws.server.endpoint.annotation.RequestPayload;
import org.springframework.ws.server.endpoint.annotation.ResponsePayload;
import soa.lab4.*;

import java.util.List;

@Slf4j
@Endpoint
@AllArgsConstructor
public class LabsController {
    private static final String NAMESPACE_URI = "http://soa/lab4";
    private final LabServiceImpl labService;

    @PayloadRoot(namespace = NAMESPACE_URI, localPart = "getHardcoreLabsRequest")
    @ResponsePayload
    private GetHardcoreLabsResponse getHardcore(@RequestPayload GetHardcoreLabsRequest request) {
        List<LabDto> labs = this.labService.getHardcoreLabs(request.getDisciplineId());
        GetHardcoreLabsResponse response = new GetHardcoreLabsResponse();
        response.getLabs().addAll(labs);
        return response;
    }

    @PayloadRoot(namespace = NAMESPACE_URI, localPart = "decreaseLabDifficultyRequest")
    @ResponsePayload
    private DecreaseLabDifficultyResponse decreaseLabDifficulty(@RequestPayload DecreaseLabDifficultyRequest request) {
        DecreaseLabDifficultyResponse response = new DecreaseLabDifficultyResponse();
        LabDto lab = this.labService.decreaseLabDifficulty(request.getDisciplineId(), request.getDisciplineId());
        response.setLab(lab);
        return response;
    }
}