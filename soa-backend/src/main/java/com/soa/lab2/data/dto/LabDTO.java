package com.soa.lab2.data.dto;

import com.soa.lab2.model.Difficulty;
import lombok.*;
import org.springframework.lang.Nullable;

import javax.validation.constraints.Size;
import java.time.LocalDate;

@NonNull
@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString
public class LabDTO {

    @Nullable
    private Integer id;

    private String name;

    @Size(max = 295)
    private double x;

    @Nullable
    private double y;

    @Nullable
    private LocalDate creationDate;

    private int minimalPoint;

    private float personalQualitiesMaximum;

    private Difficulty difficulty;

    private String disciplineName;
}
