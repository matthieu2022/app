import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardContent } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { SkillsState, DragEvent, ColumnProps, SkillListProps } from "./types";

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
}

// Composants
const AppBackground = ({ children }: AppBackgroundProps) => (
  <div className="min-h-screen p-2 md:p-4 relative">
    <div
      className="fixed inset-0 z-0"
      style={{
        backgroundImage: "url('/fdp_sacados.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        opacity: 0.8,
      }}
    />
    <div className="relative z-10 max-w-full md:max-w-[1400px] mx-auto">
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
  <div className="w-full md:flex-1 md:max-w-xl mt-[50px] md:mt-[150px] mx-2 md:ml-[20px]">
    <div className="flex items-center justify-center mb-4">
      {/*<h2 className="text-lg font-semibold">{title}</h2>*/}
    </div>
    <div
      onDragOver={onDragOver}
      onDrop={(e) => onDrop(e, id)}
      className="grid grid-cols-1 sm:grid-cols-2 gap-2"
    >
      {items.map((skill, index) => (
        <div
          key={index}
          draggable
          onDragStart={(e) => onDragStart(e, skill, id, index)}
          className={`p-2 rounded-lg border-2 border-dashed ${
            isCompetences
              ? "border-pink-200 bg-pink-50"
              : "border-blue-200 bg-blue-50"
          } text-xs md:text-sm cursor-move hover:shadow-md transition-shadow min-h-[60px] flex items-center justify-center text-center`}
        >
          {skill}
        </div>
      ))}
    </div>
  </div>
);

const Backpack = ({
  skills,
  onDragStart,
  onDragOver,
  onDrop,
}: BackpackProps) => (
  <div
    className={`
      w-full md:w-[580px] rounded-lg p-2 md:p-4 mx-auto md:translate-x-[180px]
      mt-[20px] md:mt-[320px] md:ml-[20px]
    `}
  >
    <div className="text-center gap-4 md:gap-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {/* Colonne Soft Skills */}
        <div>
          <div className="space-y-2">
            {skills.backpack.slice(0, 5).map((skill, index) => (
              <div
                key={index}
                onDragOver={onDragOver}
                onDrop={(e) => onDrop(e, "backpack", index)}
                className="h-16 md:h-24 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center mx-2 md:ml-[30px]"
              >
                {skill && (
                  <div
                    draggable
                    onDragStart={(e) =>
                      onDragStart(e, skill, "backpack", index)
                    }
                    className="bg-blue-50 p-2 rounded text-xs md:text-sm cursor-move w-full h-full flex items-center justify-center"
                  >
                    {skill}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        {/* Colonne Compétences */}
        <div>
          <div className="space-y-2">
            {skills.backpack.slice(5, 10).map((skill, index) => (
              <div
                key={index + 5}
                onDragOver={onDragOver}
                onDrop={(e) => onDrop(e, "backpack", index + 5)}
                className="h-16 md:h-24 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center mx-2 md:ml-[35px]"
              >
                {skill && (
                  <div
                    draggable
                    onDragStart={(e) =>
                      onDragStart(e, skill, "backpack", index + 5)
                    }
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
  </div>
);

// Composant principal
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

  useEffect(() => {
    console.log("⚡ useEffect triggered - Changement dans le backpack");
    console.log("Contenu actuel du backpack:", skills.backpack);
    updateResults();
  }, [skills.backpack]);

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
  };

  const onDrop = (
    e: DragEvent,
    target: string,
    targetIndex: number | null = null,
  ) => {
    e.preventDefault();

    const skill = e.dataTransfer.getData("skill");
    const source = e.dataTransfer.getData("source");
    const sourceIndex = parseInt(e.dataTransfer.getData("sourceIndex"), 10);

    setSkills((prevSkills) => {
      const isSoftSkill = source === "softSkills";

      const isValidDrop =
        (target === "backpack" &&
          ((isSoftSkill && targetIndex! < 5) ||
            (!isSoftSkill && targetIndex! >= 5))) ||
        (target === "softSkills" && source === "backpack" && sourceIndex < 5) ||
        (target === "specificSkills" &&
          source === "backpack" &&
          sourceIndex >= 5);

      if (!isValidDrop) {
        return prevSkills;
      }

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
  };

  return (
    <AppBackground>
      {/* Colonne Soft Skills */}
      <SkillList
        id="softSkills"
        title="Soft Skills"
        items={skills.softSkills}
        onDragStart={onDragStart}
        onDragOver={onDragOver}
        onDrop={onDrop}
        isCompetences={false}
      />

      {/* Colonne Compétences */}
      <SkillList
        id="specificSkills"
        title="Compétences"
        items={skills.specificSkills}
        onDragStart={onDragStart}
        onDragOver={onDragOver}
        onDrop={onDrop}
        isCompetences={true}
      />

      {/* Sac à dos */}
      <Backpack
        skills={skills}
        onDragStart={onDragStart}
        onDragOver={onDragOver}
        onDrop={onDrop}
      />

      {showResults && (
        <Card className="fixed top-4 left-2 right-2 md:left-1/2 md:transform md:-translate-x-1/2 w-auto md:w-full md:max-w-2xl bg-white bg-opacity-85 shadow-lg">
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
              <p className="text-center font-bold text-[#308dc2] uppercase text-lg">
                {results.softSkills || "Aucun résultat"}
              </p>
              <hr />
              <h3 className="font-semibold">
                Le Profil que nous trouvons selon vos choix de Compétences
              </h3>
              <hr />
              <p className="text-center font-bold text-[#308dc2] uppercase text-lg">
                {results.specificSkills || "Aucun résultat"}
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="fixed bottom-4 right-2 md:right-4 space-x-2">
        <Button
          onClick={handleShowResults}
          className="text-sm md:text-base bg-blue-500 hover:bg-blue-600 text-white px-2 md:px-[10px] py-1 md:pb-[10px] rounded-lg"
        >
          Résultats
        </Button>
        <Button
          onClick={resetApp}
          className="text-sm md:text-base bg-red-500 hover:bg-red-600 text-white px-2 md:px-[10px] py-1 md:pb-[10px] rounded-lg"
        >
          Réinitialiser
        </Button>
      </div>
    </AppBackground>
  );
};

export default App;
