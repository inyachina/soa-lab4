package com.soa.lab2.mapper;

import com.soa.lab2.data.dto.LabDTO;
import com.soa.lab2.model.Lab;
import org.mapstruct.Mapper;

@Mapper
public interface LabMapper {
    Lab labDTOtoLab(LabDTO labDTO);
}
