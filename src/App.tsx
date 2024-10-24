import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardContent } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { SkillsState, DragEvent, ColumnProps, SkillListProps } from "./types";
import "./styles.css";

// Interfaces
interface AppBackgroundProps {
  children: React.ReactNode;
}

interface BackpackProps {
  skills: SkillsState;
  onDragStart: (
    e: DragEvent,
    skill: string,
    source: string,
    index: number,
  ) => void;
  onDragOver: (e: DragEvent) => void;
  onDrop: (e: DragEvent, target: string, targetIndex?: number) => void;
  onTouchStart?: (skill: string, source: string, index: number) => void;
  onTouchEnd?: (e: React.TouchEvent, target: string, index?: number) => void;
}

interface DraggedItem {
  skill: string;
  source: string;
  index: number;
}

const AppBackground = ({ children }: AppBackgroundProps) => (
  <div className="min-h-screen p-2 md:p-4 relative overflow-x-hidden bg-gray-50">
    <div className="relative z-10 max-w-full md:max-w-[1400px] mx-auto px-2 md:px-0">
      <div className="flex flex-col md:flex-row justify-center items-center md:items-start gap-4 md:gap-8">
        {children}
      </div>
    </div>
  </div>
);

const SkillList = ({
  id,
  title,
  items,
  onDragStart,
  onDragOver,
  onDrop,
  isCompetences,
}: ColumnProps) => (
  <div className="w-full md:w-1/3 lg:w-1/4 mt-[20px] md:mt-[50px] px-2 md:px-4">
    {/* Ajout de l'icône en haut */}
    <div className="w-full flex justify-center mb-4">
      <img 
        src={isCompetences ? "/ico-competences.png" : "/ico-softskills.png"} 
        alt={isCompetences ? "Compétences" : "Soft Skills"}
        className="w-16 h-16 md:w-20 md:h-20 object-contain"
      />
    </div>
    <div className="grid grid-cols-1 gap-2">
      {items.map((skill, index) => (
        <div
          key={index}
          draggable
          onDragStart={(e) => onDragStart(e, skill, id, index)}
          className={`p-2 rounded-lg border-2 border-dashed ${
            isCompetences
              ? "border-pink-200 bg-pink-50"
              : "border-blue-200 bg-blue-50"
          } text-xs md:text-sm cursor-move hover:shadow-md transition-shadow min-h-[40px] md:min-h-[60px] flex items-center justify-center text-center`}
        >
          {skill}
        </div>
      ))}
    </div>
  </div>
);

const [touchStartPosition, setTouchStartPosition] = useState({ x: 0, y: 0 });

const handleTouchStart = (skill: string, source: string, index: number) => {
  setDraggedItem({ skill, source, index });
};

const handleTouchMove = (e: React.TouchEvent) => {
  if (!draggedItem) return;

  const touch = e.touches[0];
  const elements = document.elementsFromPoint(touch.clientX, touch.clientY);
  const dropTarget = elements.find(
    (el) => el.getAttribute("data-droppable") === "true",
  );

  if (dropTarget) {
    dropTarget.classList.add("drag-over");
  }
};

const handleTouchEnd = (
  e: React.TouchEvent,
  target: string,
  targetIndex?: number,
) => {
  if (!draggedItem) return;

  const touch = e.changedTouches[0];
  const elements = document.elementsFromPoint(touch.clientX, touch.clientY);
  const dropTarget = elements.find(
    (el) => el.getAttribute("data-droppable") === "true",
  );

  if (dropTarget) {
    const targetId = dropTarget.getAttribute("data-target");
    const targetIndex = dropTarget.getAttribute("data-index");

    if (targetId) {
      handleDrop(
        draggedItem.skill,
        draggedItem.source,
        draggedItem.index,
        targetId,
        targetIndex ? parseInt(targetIndex, 10) : undefined,
      );
    }
  }

  setDraggedItem(null);
};

const Backpack = ({ skills, onDragStart, onDragOver, onDrop }: BackpackProps) => (
  <div className="relative w-full md:w-[600px] lg:w-[800px] mx-auto mt-4 md:mt-[100px] px-4">
    {/* Image du sac à dos en arrière-plan */}
    <div className="absolute inset-0 pointer-events-none">
      <img 
        src="/sacados.png" 
        alt="Sac à dos"
        className="w-full h-full object-contain opacity-90"
      />
    </div>
    <div className="grid grid-cols-2 gap-4 relative z-10">
      {/* Colonne Soft Skills */}
      <div className="space-y-2">
        {skills.backpack.slice(0, 5).map((skill, index) => (
          <div
            key={index}
            onDragOver={onDragOver}
            onDrop={(e) => onDrop(e, "backpack", index)}
            className="h-16 md:h-20 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-white bg-opacity-80"
          >
            {skill && (
              <div
                draggable
                onDragStart={(e) => onDragStart(e, skill, "backpack", index)}
                className="bg-blue-50 p-2 rounded text-xs md:text-sm cursor-move w-full h-full flex items-center justify-center"
              >
                {skill}
              </div>
            )}
          </div>
        ))}
      </div>
      {/* Colonne Compétences */}
      <div className="space-y-2">
        {skills.backpack.slice(5, 10).map((skill, index) => (
          <div
            key={index + 5}
            onDragOver={onDragOver}
            onDrop={(e) => onDrop(e, "backpack", index + 5)}
            className="h-16 md:h-20 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-white bg-opacity-80"
          >
            {skill && (
              <div
                draggable
                onDragStart={(e) => onDragStart(e, skill, "backpack", index + 5)}
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
);

const App = () => {
  const [skills, setSkills] = useState<SkillsState>({
    softSkills: [
      "Empathie",
      "Organisation",
      "Bonne communication",
      "Adaptabilité",
      "Esprit d'équipe",
      "Leadership",
      "Proactivité",
      "Résolution de problèmes",
      "Capacité de Négociation",
      "Flexibilité",
      "Sens du service",
      "Créativité",
      "Patience",
      "Dynamisme",
      "Curiosité",
    ],
    specificSkills: [
      "Accueillir, informer et conseiller le client",
      "Traiter les demandes de réservations de prestations hôtelières",
      "Procéder aux opérations d'arrivée, de suivi et de départ du client",
      "Assurer le suivi de l'activité journalière",
      "Contribuer au développement commercial",
      "Gérer les opérations de l'établissement",
      "Développer des stratégies commerciales",
      "Gérer les ressources humaines",
      "Assurer la gestion financière",
      "Promouvoir l'établissement",
      "Accueillir les clients",
      "Organiser des séjours et des voyages",
      "Vendre des prestations touristiques",
      "Gérer les relations avec les prestataires",
      "Assurer le suivi des clients",
    ],
    backpack: Array(10).fill(null),
  });
  
  const [results, setResults] = useState({
    softSkills: "",
    specificSkills: "",
  });

  const [showResults, setShowResults] = useState(false);
  
  const [results, setResults] = useState({
    softSkills: "",
    specificSkills: "",
  });
  
  // Ajoutez ces nouveaux états
  const [draggedItem, setDraggedItem] = useState<{
    skill: string;
    source: string;
    index: number;
  } | null>(null);

  const [touchStartPosition, setTouchStartPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  // Ajoutez effet
  useEffect(() => {
    setIsDragging(!!draggedItem);
  }, [draggedItem]);
  
  const [showResults, setShowResults] = useState(false);
  const [draggedItem, setDraggedItem] = useState<DraggedItem | null>(null);

  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    setIsDragging(!!draggedItem);
  }, [draggedItem]);

  // Profils de compétences
  const profileSkills = {
    RHH: [
      "Empathie",
      "Organisation",
      "Bonne communication",
      "Adaptabilité",
      "Esprit d'équipe",
    ],
    RET: [
      "Leadership",
      "Proactivité",
      "Résolution de problèmes",
      "Capacité de Négociation",
      "Flexibilité",
    ],
    CATL: [
      "Sens du service",
      "Créativité",
      "Patience",
      "Dynamisme",
      "Curiosité",
    ],
  };

  const profileCompetencies = {
    RHH: [
      "Accueillir, informer et conseiller le client",
      "Traiter les demandes de réservations de prestations hôtelières",
      "Procéder aux opérations d'arrivée, de suivi et de départ du client",
      "Assurer le suivi de l'activité journalière",
      "Contribuer au développement commercial",
    ],
    RET: [
      "Gérer les opérations de l'établissement",
      "Développer des stratégies commerciales",
      "Gérer les ressources humaines",
      "Assurer la gestion financière",
      "Promouvoir l'établissement",
    ],
    CATL: [
      "Accueillir les clients",
      "Organiser des séjours et des voyages",
      "Vendre des prestations touristiques",
      "Gérer les relations avec les prestataires",
      "Assurer le suivi des clients",
    ],
  };

  // Gestionnaires tactiles
  const handleTouchStart = (skill: string, source: string, index: number) => {
    setDraggedItem({ skill, source, index });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!draggedItem) return;

    const touch = e.touches[0];
    const elements = document.elementsFromPoint(touch.clientX, touch.clientY);
    const dropTarget = elements.find(el => el.getAttribute('data-droppable') === 'true');

    if (dropTarget) {
      dropTarget.classList.add('drag-over');
    }
  };

  const handleTouchEnd = (e: React.TouchEvent, target: string, targetIndex?: number) => {
    if (!draggedItem) return;

    const touch = e.changedTouches[0];
    const elements = document.elementsFromPoint(touch.clientX, touch.clientY);
    const dropTarget = elements.find(el => el.getAttribute('data-droppable') === 'true');

    if (dropTarget) {
      const targetId = dropTarget.getAttribute('data-target');
      const targetIndex = dropTarget.getAttribute('data-index');

      if (targetId) {
        handleDrop(
          draggedItem.skill,
          draggedItem.source,
          draggedItem.index,
          targetId,
          targetIndex ? parseInt(targetIndex, 10) : undefined
        );
      }
    }

    setDraggedItem(null);
  };

  // Gestionnaires d'événements drag & drop
  const onDragStart = (
    e: DragEvent,
    skill: string,
    source: string,
    index: number,
  ) => {
    e.dataTransfer.setData("skill", skill);
    e.dataTransfer.setData("source", source);
    e.dataTransfer.setData("sourceIndex", index.toString());
  };

  const onDragOver = (e: DragEvent) => {
    e.preventDefault();
    // Ajoutez une classe visuelle pour le feedback
    const target = e.currentTarget as HTMLElement;
    target.classList.add("drag-over");
  };

  const handleDrop = (
    skill: string,
    source: string,
    sourceIndex: number,
    target: string,
    targetIndex: number | null = null,
  ) => {
    const isSoftSkill = source === "softSkills";

    const isValidDrop =
      (target === "backpack" &&
        ((isSoftSkill && targetIndex! < 5) ||
          (!isSoftSkill && targetIndex! >= 5))) ||
      (target === "softSkills" && source === "backpack" && sourceIndex < 5) ||
      (target === "specificSkills" &&
        source === "backpack" &&
        sourceIndex >= 5);

    if (!isValidDrop) return;

    setSkills((prevSkills) => {
      const newSkills = { ...prevSkills };

      if (source === "backpack") {
        newSkills.backpack[sourceIndex] = null;
      } else {
        newSkills[source as keyof SkillsState] = (
          newSkills[source as keyof SkillsState] as string[]
        ).filter((s) => s !== skill);
      }

      if (target === "backpack" && targetIndex !== null) {
        if (newSkills.backpack[targetIndex] === null) {
          newSkills.backpack[targetIndex] = skill;
        }
      } else {
        newSkills[target as keyof SkillsState] = [
          ...(newSkills[target as keyof SkillsState] as string[]),
          skill,
        ];
      }

      return newSkills;
    });
  };

  const updateResults = () => {
    const softSkillsInBackpack = skills.backpack
      .slice(0, 5)
      .filter((skill): skill is string => skill !== null);
    const specificSkillsInBackpack = skills.backpack
      .slice(5, 10)
      .filter((skill): skill is string => skill !== null);

    // Vérification des correspondances
    const rhhSoftSkills = softSkillsInBackpack.filter((skill) =>
      profileSkills.RHH.includes(skill),
    );
    const rhhSpecificSkills = specificSkillsInBackpack.filter((skill) =>
      profileCompetencies.RHH.includes(skill),
    );

    const retSoftSkills = softSkillsInBackpack.filter((skill) =>
      profileSkills.RET.includes(skill),
    );
    const retSpecificSkills = specificSkillsInBackpack.filter((skill) =>
      profileCompetencies.RET.includes(skill),
    );

    const catlSoftSkills = softSkillsInBackpack.filter((skill) =>
      profileSkills.CATL.includes(skill),
    );
    const catlSpecificSkills = specificSkillsInBackpack.filter((skill) =>
      profileCompetencies.CATL.includes(skill),
    );

    // Détermination des profils
    let softSkillsResult = "Profil non associé";
    let specificSkillsResult = "Profil non associé";

    if (rhhSoftSkills.length >= 3) {
      softSkillsResult = "Réceptionniste d'Hôtel (RHH)";
    } else if (retSoftSkills.length >= 3) {
      softSkillsResult = "Responsable d'Établissement Touristique (RET)";
    } else if (catlSoftSkills.length >= 3) {
      softSkillsResult = "Conseiller en Agence de Tourisme et Loisirs (CATL)";
    }

    if (rhhSpecificSkills.length >= 3) {
      specificSkillsResult = "Réceptionniste d'Hôtel (RHH)";
    } else if (retSpecificSkills.length >= 3) {
      specificSkillsResult = "Responsable d'Établissement Touristique (RET)";
    } else if (catlSpecificSkills.length >= 3) {
      specificSkillsResult =
        "Conseiller en Agence de Tourisme et Loisirs (CATL)";
    }

    setResults({
      softSkills: softSkillsResult,
      specificSkills: specificSkillsResult,
    });
  };

  const handleShowResults = () => {
    updateResults();
    setShowResults(true);
  };

  const resetApp = () => {
    setSkills({
      softSkills: [
        "Empathie",
        "Organisation",
        "Bonne communication",
        "Adaptabilité",
        "Esprit d'équipe",
        "Leadership",
        "Proactivité",
        "Résolution de problèmes",
        "Capacité de Négociation",
        "Flexibilité",
        "Sens du service",
        "Créativité",
        "Patience",
        "Dynamisme",
        "Curiosité",
      ],
      specificSkills: [
        "Accueillir, informer et conseiller le client",
        "Traiter les demandes de réservations de prestations hôtelières",
        "Procéder aux opérations d'arrivée, de suivi et de départ du client",
        "Assurer le suivi de l'activité journalière",
        "Contribuer au développement commercial",
        "Gérer les opérations de l'établissement",
        "Développer des stratégies commerciales",
        "Gérer les ressources humaines",
        "Assurer la gestion financière",
        "Promouvoir l'établissement",
        "Accueillir les clients",
        "Organiser des séjours et des voyages",
        "Vendre des prestations touristiques",
        "Gérer les relations avec les prestataires",
        "Assurer le suivi des clients",
      ],
      backpack: Array(10).fill(null),
    });
    setResults({
      softSkills: "",
      specificSkills: "",
    });
    setShowResults(false);
    setDraggedItem(null);
  };

  // Effect pour la mise à jour des résultats
  useEffect(() => {
    if (skills.backpack.some((skill) => skill !== null)) {
      updateResults();
    }
  }, [skills.backpack]);

  return (
    <AppBackground>
      <div className="w-full min-h-screen relative">
        <div className="container mx-auto px-2 md:px-4">
          <div className="flex flex-col md:flex-row justify-center items-start gap-4 md:gap-8">
            {/* SkillLists */}
            <SkillList
              id="softSkills"
              title="Soft Skills"
              items={skills.softSkills}
              onDragStart={onDragStart}
              onDragOver={onDragOver}
              onDrop={(e: DragEvent, target: string, targetIndex?: number) => {
                const skill = e.dataTransfer.getData("skill");
                const source = e.dataTransfer.getData("source");
                const sourceIndex = parseInt(e.dataTransfer.getData("sourceIndex"), 10);
                handleDrop(skill, source, sourceIndex, target, targetIndex);
              }}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              isCompetences={false}
            />
            <SkillList
              id="specificSkills"
              title="Compétences"
              items={skills.specificSkills}
              onDragStart={onDragStart}
              onDragOver={onDragOver}
              onDrop={handleDrop}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              isCompetences={true}
            />
            {/* Backpack */}
            <Backpack
              skills={skills}
              onDragStart={onDragStart}
              onDragOver={onDragOver}
              onDrop={handleDrop}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            />
          </div>

          {/* Modal des résultats */}
          {showResults && (
            <Card className="fixed top-4 left-2 right-2 md:left-1/2 md:transform md:-translate-x-1/2 w-auto md:w-full md:max-w-2xl bg-white bg-opacity-85 shadow-lg z-50">
              <CardHeader className="bg-custom-blue font-semibold text-white text-center text-base md:text-lg py-0.5">
                Résultats de votre recherche de profil
              </CardHeader>
              <CardContent className="p-2 md:p-4">
                <div className="space-y-2">
                  <hr />
                  <h3 className="font-semibold">
                    Le Profil que nous trouvons selon vos choix de Soft Skills
                  </h3>
                  <hr />
                  <p className="text-center font-bold text-[#308dc2] uppercase text-sm md:text-lg">
                    {results.softSkills || "Aucun résultat"}
                  </p>
                  <hr />
                  <h3 className="font-semibold">
                    Le Profil que nous trouvons selon vos choix de Compétences
                  </h3>
                  <hr />
                  <p className="text-center font-bold text-[#308dc2] uppercase text-sm md:text-lg">
                    {results.specificSkills || "Aucun résultat"}
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Boutons */}
          <div className="fixed bottom-4 right-2 md:right-4 space-x-2 z-50">
            <Button
              onClick={handleShowResults}
              className="text-sm md:text-base bg-blue-500 hover:bg-blue-600 text-white px-2 md:px-4 py-2 rounded-lg shadow-md"
            >
              Résultats
            </Button>
            <Button
              onClick={resetApp}
              className="text-sm md:text-base bg-red-500 hover:bg-red-600 text-white px-2 md:px-4 py-2 rounded-lg shadow-md"
            >
              Réinitialiser
            </Button>
          </div>
        </div>
      </div>
    </AppBackground>
  );
};

export default App;
