package com.soa.lab2.data.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import org.springframework.lang.Nullable;

@NonNull
@NoArgsConstructor
@AllArgsConstructor
@Data
public class DisciplineDTO {
    @Nullable
    private int id;
    private String name;
    private int lectureHours;
    private int selfStudyHours;
}
