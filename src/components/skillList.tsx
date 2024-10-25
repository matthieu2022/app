import React from 'react';
import { SkillListProps } from '../types';
import { Card, CardHeader, CardContent } from './ui/card';

export function SkillList({
  id,
  title,
  items,
  isCompetences,
  onDragStart,
  onDragOver,
  onDrop,
  onTouchStart,
  onTouchEnd
}: SkillListProps) {
  return (
    <Card className={`w-full md:w-1/3 bg-white bg-opacity-85 ${isCompetences ? 'border-green-300' : 'border-blue-300'}`}>
      <CardHeader className="bg-custom-blue font-semibold text-white text-center py-1">
        {title}
      </CardHeader>
      <CardContent 
        className="p-2 min-h-[200px]"
        onDragOver={onDragOver}
        onDrop={(e) => onDrop(e, id)}
        data-droppable="true"
        data-target={id}
      >
        <div className="grid grid-cols-1 gap-2">
          {items.map((skill, index) => (
            <div
              key={index}
              draggable
              className="p-2 bg-white rounded border border-gray-200 shadow-sm cursor-move text-sm"
              onDragStart={(e) => onDragStart(e, skill, id, index)}
              onTouchStart={() => onTouchStart?.(skill, id, index)}
              onTouchEnd={(e) => onTouchEnd?.(e, id, index)}
            >
              {skill}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
