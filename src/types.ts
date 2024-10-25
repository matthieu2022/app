import { ReactNode } from 'react';

export interface SkillsState {
  softSkills: string[];
  specificSkills: string[];
  backpack: (string | null)[];
}

export interface DraggedItem {
  skill: string;
  source: string;
  index: number;
}

export type DragEvent = React.DragEvent<HTMLDivElement>;

export interface BackpackProps {
  skills: SkillsState;
  onDragStart: (e: DragEvent, skill: string, source: string, index: number) => void;
  onDragOver: (e: DragEvent) => void;
  onDrop: (e: DragEvent, target: string, targetIndex?: number) => void;
  onTouchStart?: (skill: string, source: string, index: number) => void;
  onTouchEnd?: (e: React.TouchEvent, target: string, index?: number) => void;
}

export interface SkillListProps {
  id: string;
  title: string;
  items: string[];
  isCompetences: boolean;
  onDragStart: (e: DragEvent, skill: string, source: string, index: number) => void;
  onDragOver: (e: DragEvent) => void;
  onDrop: (e: DragEvent, target: string, targetIndex?: number) => void;
  onTouchStart?: (skill: string, source: string, index: number) => void;
  onTouchEnd?: (e: React.TouchEvent, target: string, index?: number) => void;
}
