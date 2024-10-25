import { ReactNode } from 'react';

export interface DragEvent extends React.DragEvent<HTMLDivElement> {}

export interface SkillsState {
  softSkills: string[];
  specificSkills: string[];
  backpack: (string | null)[];
}

export interface AppBackgroundProps {
  children: ReactNode;
}

export interface ColumnProps {
  id: string;
  title: string;
  items: string[];
  onDragStart: (e: DragEvent, skill: string, source: string, index: number) => void;
  onDragOver: (e: DragEvent) => void;
  onDrop: (e: DragEvent, target: string, targetIndex?: number) => void;
  isCompetences?: boolean;
  onTouchStart?: (skill: string, source: string, index: number) => void;
  onTouchEnd?: (e: React.TouchEvent, target: string, index?: number) => void;
}

export interface BackpackProps {
  skills: SkillsState;
  onDragStart: (e: DragEvent, skill: string, source: string, index: number) => void;
  onDragOver: (e: DragEvent) => void;
  onDrop: (e: DragEvent, target: string, targetIndex?: number) => void;
  onTouchStart?: (skill: string, source: string, index: number) => void;
  onTouchEnd?: (e: React.TouchEvent, target: string, index?: number) => void;
}

export interface DraggedItem {
  skill: string;
  source: string;
  index: number;
}
