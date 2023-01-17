package com.soa.lab2.data.sort_filter;

import lombok.Data;
import lombok.ToString;

@Data
@ToString
public class SortFilter {
    public SortFilterRule name;
    public SortFilterRule x;
    public SortFilterRule y;
    public SortFilterRule difficulty;
    public SortFilterRule minimalPoint;
    public SortFilterRule personalQualitiesMaximum;
}
