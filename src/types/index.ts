import React from "react";

export interface SkillsState {
  softSkills: string[];
  specificSkills: string[];
  backpack: (string | null)[];
}

// Event types
export interface DragEvent extends React.DragEvent<HTMLDivElement> {
  dataTransfer: DataTransfer;
}

// Props pour les composants
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
  onDrop: (
    skill: string,
    source: string,
    sourceIndex: number,
    target: string,
    targetIndex?: number,
  ) => void;
  isCompetences?: boolean;
  onTouchStart?: (skill: string, source: string, index: number) => void;
  onTouchEnd?: (e: React.TouchEvent, target: string, index?: number) => void;
}

export interface SkillListProps {
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
  onDrop: (
    skill: string,
    source: string,
    sourceIndex: number,
    target: string,
    targetIndex?: number,
  ) => void;
  isCompetences?: boolean;
  onTouchStart?: (skill: string, source: string, index: number) => void;
  onTouchEnd?: (e: React.TouchEvent, target: string, index?: number) => void;
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
  onDrop: (
    skill: string,
    source: string,
    sourceIndex: number,
    target: string,
    targetIndex?: number,
  ) => void;
  onTouchStart?: (skill: string, source: string, index: number) => void;
  onTouchEnd?: (e: React.TouchEvent, target: string, index?: number) => void;
}

// Type pour l'élément en cours de déplacement
export interface DraggedItem {
  skill: string;
  source: string;
  index: number;
}

// Types pour les résultats
export interface Results {
  softSkills: string;
  specificSkills: string;
}

// Types pour les profils
export interface ProfileSkills {
  RHH: string[];
  RET: string[];
  CATL: string[];
}

export interface ProfileCompetencies {
  RHH: string[];
  RET: string[];
  CATL: string[];
}

// Types utilitaires
export type SkillType = "softSkills" | "specificSkills" | "backpack";

// Type pour les événements tactiles personnalisés
export interface TouchEventHandlers {
  onTouchStart?: (skill: string, source: string, index: number) => void;
  onTouchEnd?: (e: React.TouchEvent, target: string, index?: number) => void;
}

// Type pour le feedback visuel
export interface DragFeedback {
  isDragging: boolean;
  canDrop: boolean;
}
