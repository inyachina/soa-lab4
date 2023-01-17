package com.soa.lab2.service.impl;

import com.soa.lab2.data.dto.LabDTO;
import com.soa.lab2.exception.BadRequestException;
import com.soa.lab2.exception.FilterException;
import com.soa.lab2.exception.NotFoundException;
import com.soa.lab2.exception.SortException;
import com.soa.lab2.model.Difficulty;
import com.soa.lab2.model.Lab;
import com.soa.lab2.repository.DisciplineRepository;
import com.soa.lab2.repository.LabsRepository;
import com.soa.lab2.rsql.CustomRsqlVisitor;
import com.soa.lab2.service.LabsService;
import cz.jirutka.rsql.parser.RSQLParser;
import cz.jirutka.rsql.parser.ast.Node;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.InvalidDataAccessApiUsageException;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
public class LabsServiceImpl implements LabsService {
    private LabsRepository labsRepository;
    private DisciplineRepository disciplineRepository;

    @Autowired
    public LabsServiceImpl(LabsRepository labsRepository, DisciplineRepository disciplineRepository) {
        this.labsRepository = labsRepository;
        this.disciplineRepository = disciplineRepository;
    }

    @Override
    public List<Lab> findAll() {
        return this.labsRepository.findAll();
    }

    @Override
    public List<Lab> findAll(int page, int size, String sort, String filter) {
        if (filter != null) {
            Node rootNode = new RSQLParser().parse(filter);
            Specification<Lab> spec = rootNode.accept(new CustomRsqlVisitor<>());
            try {
                if (sort != null)
                    return this.labsRepository.findAll(spec, PageRequest.of(page, size, Sort.by(parseToSort(sort)))).getContent();
                else return this.labsRepository.findAll(spec, PageRequest.of(page, size)).getContent();
            } catch (InvalidDataAccessApiUsageException | IllegalArgumentException e) {
                e.printStackTrace();
                throw new FilterException();
            }
        } else if (sort != null)
            return this.labsRepository.findAll(PageRequest.of(page, size, Sort.by(parseToSort(sort)))).getContent();

        return this.labsRepository.findAll(PageRequest.of(page, size)).getContent();
    }

    private List<Sort.Order> parseToSort(String sortRule) throws SortException {
        try {
            return Stream.of(sortRule.split(";"))
                    .map(x -> new Sort.Order(Sort.Direction.valueOf(x.split(",")[1].toUpperCase()), x.split(",")[0]))
                    .collect(Collectors.toList());
        } catch (ArrayIndexOutOfBoundsException e) {
            throw new SortException();
        }
    }

    @Override
    public Lab save(LabDTO labDTO) {
        return this.disciplineRepository.getByName(labDTO.getDisciplineName()).map((discipline) ->
                this.labsRepository.save(Lab.builder()
                        .name(labDTO.getName())
                        .x(labDTO.getX())
                        .y(labDTO.getY())
                        .discipline(discipline)
                        .difficulty(labDTO.getDifficulty())
                        .creationDate(LocalDate.now())
                        .minimalPoint(labDTO.getMinimalPoint())
                        .personalQualitiesMaximum(labDTO.getPersonalQualitiesMaximum())
                        .build())
        ).orElseThrow(() -> new NotFoundException("There is no such discipline"));
    }

    @Override
    public Lab findById(Integer id) throws NotFoundException {
        return labsRepository.findById(id).orElseThrow(() -> new NotFoundException());
    }

    @Override
    public long count() {
        return this.labsRepository.count();
    }

    @Override
    public void delete(Lab lab) throws NotFoundException {
        labsRepository.delete(lab);
    }
    @Override
    public void deleteById(Integer id) throws NotFoundException {
        labsRepository.deleteById(id);
    }

    @Override
    public void deleteByDifficulty(Difficulty difficulty) throws NotFoundException {
        List<Lab> labs = this.labsRepository.findByDifficulty(difficulty);
        if (labs.isEmpty()) throw new NotFoundException("There is no a single lab with such difficulty");
        this.labsRepository.delete(labs.get(0));
    }

    @Override
    @Transactional
    public Lab update(Integer id, LabDTO modLab) throws NotFoundException {
        return this.labsRepository.findById(id).map((lab ->
                        this.disciplineRepository.getByName(modLab.getDisciplineName()).map((discipline) ->
                                this.labsRepository.save(lab.toBuilder()
                                        .name(modLab.getName())
                                        .x(modLab.getX())
                                        .y(modLab.getY())
                                        .creationDate(modLab.getCreationDate())
                                        .discipline(discipline)
                                        .difficulty(modLab.getDifficulty())
                                        .minimalPoint(modLab.getMinimalPoint())
                                        .personalQualitiesMaximum(modLab.getPersonalQualitiesMaximum())
                                        .build())
                        ).orElseThrow(() -> new NotFoundException("There is no such discipline"))))
                .orElseThrow(() -> new NotFoundException("Couldn't find this lab to update"));
    }
}
