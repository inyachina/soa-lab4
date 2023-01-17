import {FormControl, FormGroup} from "@angular/forms";

export interface Lab {
  id: number | null;
  name: string;
  x: number;
  y: number | null;
  creationDate: string | null;
  minimalPoint: number;
  personalQualitiesMaximum: number;
  difficulty: string;
  discipline: Discipline;
}

export interface LabDto {
  name: string;
  x: number;
  y: number | null;
  minimalPoint: number;
  personalQualitiesMaximum: number;
  difficulty: string;
  disciplineName: string;
}

export function LabMapperDTO(lab: Lab, disciplineName: string): LabDto {
  return {
    name: lab.name,
    x: lab.x,
    y: lab.y,
    minimalPoint: lab.minimalPoint,
    personalQualitiesMaximum: lab.personalQualitiesMaximum,
    difficulty: lab.difficulty,
    disciplineName
  }
}

export interface Discipline {
  id: number | null | undefined;
  name: string;
  lectureHours: number;
  selfStudyHours: number;
}

export enum DifficultyType {
  VERY_EASY,
  NORMAL,
  VERY_HARD,
  IMPOSSIBLE,
  INSANE,
}

export const DifficultyTypeMapper: Record<DifficultyType, string> = {
  [DifficultyType.VERY_EASY]: 'very easy',
  [DifficultyType.NORMAL]: 'normal',
  [DifficultyType.VERY_HARD]: 'very hard',
  [DifficultyType.IMPOSSIBLE]: 'impossible',
  [DifficultyType.INSANE]: 'insane',
}

export interface PagingType {
  size: number,
  page: number
}

export interface FilterProperty {
  name: string,
  formGroup?: FormGroup,
  type: string,
}

export interface SortType {
  sort: string,
  order: 'asc' | 'desc'
}

export interface FilterFormGroup extends FormGroup {
  controls: {
    rule: FormControl,
    value: FormControl,
  };
}

export interface PropertyFormGroup extends FormGroup{
  controls: {
    type: FormControl,
    property: FormControl,
    name: FormControl,
    sort: FormControl,
    filter: FilterFormGroup
  },
}
export interface LabFormGroup extends FormGroup{
  controls: {
    name: FormControl,
    x: FormControl,
    y: FormControl,
    personalQualitiesMaximum: FormControl,
    minimalPoint: FormControl,
    discipline: FormControl,
    difficulty: FormControl,
    creationDate: FormControl,
  }
}
export interface PropertyType {
  filter: {
    rule: string,
    value: string
  }
  property: string,
  sort: string,
  type: string
}
