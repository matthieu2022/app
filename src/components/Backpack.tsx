import React from "react";
import { Card, CardHeader, CardContent } from "./ui/card";
import { BackpackProps } from "../types";

export function Backpack({
  skills,
  onDragStart,
  onDragOver,
  onDrop,
  onTouchStart,
  onTouchEnd
}: BackpackProps) {
  return (
    <Card className="w-full md:w-1/3 bg-white bg-opacity-85">
      <CardHeader className="bg-custom-blue font-semibold text-white text-center py-1">
        Mon Sac à Dos
      </CardHeader>
      <CardContent className="p-2">
        <div className="grid grid-cols-1 gap-2">
          {skills.backpack.map((skill, index) => (
            <div
              key={index}
              className={`p-2 rounded border ${
                skill ? "bg-white shadow-sm" : "border-dashed"
              } ${index < 5 ? "border-blue-300" : "border-green-300"}`}
              data-droppable="true"
              data-target="backpack"
              data-index={index}
              onDragOver={onDragOver}
              onDrop={(e) => onDrop(e, "backpack", index)}
              onTouchEnd={(e) => onTouchEnd?.(e, "backpack", index)}
            >
              {skill ? (
                <div
                  draggable
                  className="cursor-move text-sm"
                  onDragStart={(e) => onDragStart(e, skill, "backpack", index)}
                  onTouchStart={() => onTouchStart?.(skill, "backpack", index)}
                >
                  {skill}
                </div>
              ) : (
                <div className="text-center text-gray-400 text-sm">
                  {index < 5 ? "Soft Skill" : "Compétence"}
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
