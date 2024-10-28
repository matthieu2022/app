import type { BackpackProps } from '../types';

export const Backpack = ({
  skills,
  onDragStart,
  onDragOver,
  onDrop,
  onTouchStart,
  onTouchEnd,
}: BackpackProps) => (
  <div className="w-full md:w-[600px] lg:w-[800px] mx-auto mt-4 md:mt-[8.1rem] px-4">
    <div className="relative w-full h-full">

      <div className="grid grid-cols-2 gap-20 relative w-[250px] z-10 mt-70 ml-[225px]">
        {/* Colonne Soft Skills */}
        <div className="space-y-2 w-[175px] mt-[225px]">
          {skills.backpack.slice(0, 5).map((skill, index) => (
            <div
              key={index}
              data-droppable="true"
              data-target="backpack"
              data-index={index}
              onDragOver={onDragOver}
              onDrop={(e) => onDrop(e, "backpack", index)}
              onTouchEnd={(e) => onTouchEnd?.(e, "backpack", index)}
              className="h-16 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center ml-4"
            >
              {skill && (
                <div
                  draggable
                  data-draggable="true"
                  data-skill={skill}
                  data-source="backpack"
                  data-index={index}
                  onDragStart={(e) => onDragStart(e, skill, "backpack", index)}
                  onTouchStart={() => onTouchStart?.(skill, "backpack", index)}
                  className="bg-blue-50 p-2 rounded text-xs md:text-sm cursor-move w-full h-full flex items-center justify-center"
                >
                  {skill}
                </div>
              )}
            </div>
          ))}
        </div>
        {/* Colonne Compétences */}
        <div className="space-y-2 w-[175px] mt-[225px]">
          {skills.backpack.slice(5, 10).map((skill, index) => (
            <div
              key={index + 5}
              data-droppable="true"
              data-target="backpack"
              data-index={index + 5}
              onDragOver={onDragOver}
              onDrop={(e) => onDrop(e, "backpack", index + 5)}
              onTouchEnd={(e) => onTouchEnd?.(e, "backpack", index + 5)}
              className="h-16 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center ml-4"
            >
              {skill && (
                <div
                  draggable
                  data-draggable="true"
                  data-skill={skill}
                  data-source="backpack"
                  data-index={index + 5}
                  onDragStart={(e) => onDragStart(e, skill, "backpack", index + 5)}
                  onTouchStart={() => onTouchStart?.(skill, "backpack", index + 5)}
                  className="bg-pink-50 p-2 rounded text-xs md:text-sm cursor-move w-full h-full flex items-center justify-center"
                >
                  {skill}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);
