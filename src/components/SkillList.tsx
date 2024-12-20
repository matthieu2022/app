import type { ColumnProps } from '../types';

export const SkillList = ({
  id,
  title,
  items,
  onDragStart,
  onDragOver,
  onDrop,
  onTouchStart,
  onTouchEnd,
  isCompetences,
}: ColumnProps) => {
  return (
    <div className="w-full md:w-1/3 lg:w-1/4 mt-[20px] md:mt-[50px] px-2 md:px-4">
      <div className="w-full flex justify-center mb-4">
        <img 
          src={isCompetences ? "/ico-competences.png" : "/ico-softskills.png"} 
          alt={isCompetences ? "Compétences" : "Soft Skills"}
          className="w-24 h-24 md:w-56 md:h-40 object-contain"
        />
      </div>

      <div className="grid grid-cols-2 gap-2">
        {items.map((skill, index) => (
          <div
            key={index}
            draggable="true"
            data-draggable="true"
            data-skill={skill}
            data-source={id}
            data-index={index}
            onDragStart={(e) => onDragStart(e, skill, id, index)}
            onDragOver={onDragOver}
            onDrop={(e) => onDrop(e, id)}
            onTouchStart={(e) => {
              e.preventDefault();
              onTouchStart?.(skill, id, index);
            }}
            onTouchEnd={(e) => {
              e.preventDefault();
              onTouchEnd?.(e, id);
            }}
            className={`skill-item p-2 rounded-lg border-2 border-dashed ${
              isCompetences
                ? "border-pink-200 bg-pink-50 hover:border-pink-300"
                : "border-blue-200 bg-blue-50 hover:border-blue-300"
            } text-xs md:text-sm cursor-move hover:shadow-md transition-all min-h-[40px] md:min-h-[60px] flex items-center justify-center text-center active:scale-95`}
          >
            {skill}
          </div>
        ))}
      </div>
    </div>
  );
};
