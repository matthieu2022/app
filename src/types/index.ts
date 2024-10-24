import React from "react"; // Ajoutez cette ligne

export interface SkillsState {
  softSkills: string[];
  specificSkills: string[];
  backpack: (string | null)[]; // Changé de any[] à (string | null)[]
}

export interface DragEvent extends React.DragEvent<HTMLDivElement> {
  dataTransfer: DataTransfer;
}

export interface ColumnProps {
  id: string;
  title: string;
  items: string[];
  onDragStart: (
    e: DragEvent,
    skill: string,
    source: string,
    index: number,
  ) => void;
  onDragOver: (e: DragEvent) => void;
  onDrop: (e: DragEvent, target: string, index?: number) => void;
  isCompetences?: boolean;
}

export interface BackpackProps {
  skills: SkillsState;
  onDragStart: (
    e: DragEvent,
    skill: string,
    source: string,
    index: number,
  ) => void;
  onDragOver: (e: DragEvent) => void;
  onDrop: (e: DragEvent, target: string, targetIndex?: number) => void;
}

export interface SkillListProps {
  id: string; // Ajout de l'id manquant
  title: string; // Ajout du title manquant
  items: string[];
  onDragStart: (
    e: DragEvent,
    skill: string,
    source: string,
    index: number,
  ) => void;
  onDragOver: (e: DragEvent) => void;
  onDrop: (e: DragEvent, target: string, targetIndex?: number) => void; // Ajout du paramètre targetIndex optionnel
  isCompetences?: boolean; // Ajout de isCompetences manquant
}
