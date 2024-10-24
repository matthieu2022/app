// src/types/index.ts

export interface SkillsState {
  softSkills: string[];
  specificSkills: string[];
  backpack: any[];
}

export interface DragEvent extends React.DragEvent<HTMLDivElement> {
  dataTransfer: DataTransfer;
}

export interface ColumnProps {
  id: string;
  title: string;
  items: string[];
  onDragStart: (e: DragEvent, skill: string, source: string, index: number) => void;
  onDragOver: (e: DragEvent) => void;
  onDrop: (e: DragEvent, target: string) => void;
  isCompetences?: boolean;
}

export interface SkillListProps {
  skills: string[];
  onDragStart: (e: DragEvent, skill: string, source: string, index: number) => void;
  onDragOver: (e: DragEvent) => void;
  onDrop: (e: DragEvent, target: string) => void;
}