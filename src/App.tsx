import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardContent } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { SkillsState, DragEvent, ColumnProps, SkillListProps } from './types';

// Interfaces
interface AppBackgroundProps {
  children: React.ReactNode;
}

interface BackpackProps {
  skills: SkillsState;
  onDragStart: (e: DragEvent, skill: string, source: string, index: number) => void;
  onDragOver: (e: DragEvent) => void;
  onDrop: (e: DragEvent, target: string, targetIndex?: number) => void;
}

const App = () => {
  const [skills, setSkills] = useState<SkillsState>({
    softSkills: ["Communication", "Leadership"],
    specificSkills: ["React", "TypeScript"],
    backpack: []
  });

  const handleDragStart = (e: DragEvent, skill: string, source: string, index: number) => {
    // votre code
  };

    const Column = ({ id, title, items, onDragStart, onDragOver, onDrop, isCompetences }: ColumnProps) => {};

  const SkillList = ({ skills, onDragStart, onDragOver, onDrop }: SkillListProps) => {
    // Votre code existant
  };
  
  const AppBackground = ({ children }: AppBackgroundProps) => (
  <div className="min-h-screen p-4 relative">
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
    <div className="relative z-10 max-w-[1400px]">
      <div className="flex justify-center items-start gap-8">{children}</div>
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
  <div className="flex-1 max-w-xl mt-[150px] ml-[20px]">
    <div className="flex items-center justify-center mb-4">
      {/*<h2 className="text-lg font-semibold">{title}</h2>*/}
    </div>
    <div
      onDragOver={onDragOver}
      onDrop={(e) => onDrop(e, id)}
      className="grid grid-cols-2 gap-2"
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
          } text-sm cursor-move hover:shadow-md transition-shadow min-h-[60px] flex items-center justify-center text-center`}
        >
          {skill}
        </div>
      ))}
    </div>
  </div>
);
  
  const Backpack = ({ skills, onDragStart, onDragOver, onDrop }: BackpackProps) => (
  <div
    className="self-end mb-2 w-[580px] rounded-lg p-4 translate-x-[180px]"
    style={{ marginTop: "320px", marginLeft: "20px" }}
  >
    <div className="text-center gap-16">
      <div className="grid grid-cols-2 gap-2">
        {/* Colonne Soft Skills */}
        <div>
          <div className="space-y-2">
            {skills.backpack.slice(0, 5).map((skill, index) => (
              <div
                key={index}
                onDragOver={onDragOver}
                onDrop={(e) => onDrop(e, "backpack", index)}
                className="h-24 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center ml-[30px]"
              >
                {skill && (
                  <div
                    draggable
                    onDragStart={(e) =>
                      onDragStart(e, skill, "backpack", index)
                    }
                    className="bg-blue-50 p-2 rounded text-sm cursor-move w-full h-full flex items-center justify-center"
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
                className="h-24 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center ml-[35px]"
              >
                {skill && (
                  <div
                    draggable
                    onDragStart={(e) =>
                      onDragStart(e, skill, "backpack", index + 5)
                    }
                    className="bg-pink-50 p-2 rounded text-sm cursor-move w-full h-full flex items-center justify-center"
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

const DragDropApp = () => {
  const [skills, setSkills] = useState({
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
      // RHH
      "Accueillir, informer et conseiller le client",
      "Traiter les demandes de réservations de prestations hôtelières",
      "Procéder aux opérations d'arrivée, de suivi et de départ du client",
      "Assurer le suivi de l'activité journalière",
      "Contribuer au développement commercial",
      // RET
      "Gérer les opérations de l'établissement",
      "Développer des stratégies commerciales",
      "Gérer les ressources humaines",
      "Assurer la gestion financière",
      "Promouvoir l'établissement",
      // CATL
      "Accueillir les clients",
      "Organiser des séjours et des voyages",
      "Vendre des prestations touristiques",
      "Gérer les relations avec les prestataires",
      "Assurer le suivi des clients",
    ],
    backpack: Array(10).fill(null),
  });

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

  const [results, setResults] = useState({
    softSkills: "",
    specificSkills: "",
  });

  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    console.log("⚡ useEffect triggered - Changement dans le backpack");
    console.log("Contenu actuel du backpack:", skills.backpack);
    updateResults();
  }, [skills.backpack]); // Dépendance explicite au backpack

  const onDragStart = (e, skill, source, index) => {
    console.log("\n=== Début du Drag ===");
    console.log("Compétence glissée:", skill);
    console.log("Source:", source);
    console.log("Index de départ:", index);

    e.dataTransfer.setData("skill", skill);
    e.dataTransfer.setData("source", source);
    e.dataTransfer.setData("sourceIndex", index.toString());

    console.log("Données DataTransfer définies:");
    console.log("- skill:", e.dataTransfer.getData("skill"));
    console.log("- source:", e.dataTransfer.getData("source"));
    console.log("- sourceIndex:", e.dataTransfer.getData("sourceIndex"));
  };

  const onDragOver = (e) => {
    e.preventDefault();
    console.log("→ Drag over");
  };

  const onDrop = (e, target, targetIndex = null) => {
    e.preventDefault();
    console.log("\n=== Début du Drop ===");

    const skill = e.dataTransfer.getData("skill");
    const source = e.dataTransfer.getData("source");
    const sourceIndex = parseInt(e.dataTransfer.getData("sourceIndex"), 10);

    console.log("Données du drop:");
    console.log("- Compétence:", skill);
    console.log("- Source:", source);
    console.log("- Index source:", sourceIndex);
    console.log("- Cible:", target);
    console.log("- Index cible:", targetIndex);

    const newSkills = { ...skills };
    const isSoftSkill = source === "softSkills";

    console.log("Validation du drop:");
    console.log("- Est un soft skill?", isSoftSkill);
    console.log("- Drop vers backpack?", target === "backpack");
    console.log(
      "- Position valide?",
      isSoftSkill ? targetIndex < 5 : targetIndex >= 5,
    );

    setSkills((prevSkills) => {
      console.log("\nVérification des conditions de drop:");

      const isSoftSkill = source === "softSkills";
      console.log("- Est un soft skill?", isSoftSkill);

      const isValidDrop =
        (target === "backpack" &&
          ((isSoftSkill && targetIndex < 5) ||
            (!isSoftSkill && targetIndex >= 5))) ||
        (target === "softSkills" && source === "backpack" && sourceIndex < 5) ||
        (target === "specificSkills" &&
          source === "backpack" &&
          sourceIndex >= 5);

      if (!isValidDrop) {
        console.log("❌ Drop invalide - Annulation");
        return;
      }

      console.log("✅ Drop valide - Mise à jour du state");

      const newSkills = { ...prevSkills };
      console.log("\nMise à jour des compétences:");

      if (source === "backpack") {
        console.log(
          `- Retrait de ${skill} du sac à dos position ${sourceIndex}`,
        );
        newSkills.backpack[sourceIndex] = null;
      } else {
        console.log(`- Retrait de ${skill} de ${source}`);
        newSkills[source] = newSkills[source].filter((s) => s !== skill);
      }

      // Retrait de la source
      if (source === "backpack") {
        newSkills.backpack[sourceIndex] = null;
        console.log(`Retiré de backpack[${sourceIndex}]`);
      } else {
        newSkills[source] = newSkills[source].filter((s) => s !== skill);
        console.log(`Retiré de ${source}`);
      }

      if (target === "backpack") {
        if (newSkills.backpack[targetIndex] === null) {
          console.log(
            `- Ajout de ${skill} au sac à dos position ${targetIndex}`,
          );
          newSkills.backpack[targetIndex] = skill;
        } else {
          console.log(`❌ Position ${targetIndex} déjà occupée`);
        }
      } else {
        console.log(`- Ajout de ${skill} à ${target}`);
        newSkills[target] = [...newSkills[target], skill];
      }

      console.log("\nNouvel état:", newSkills);
      return newSkills;
    });
  };

  const updateResults = () => {
    console.log("\n=== Analyse des résultats ===");

    // Extraction et filtrage des compétences du backpack
    const softSkillsInBackpack = skills.backpack
      .slice(0, 5)
      .filter((skill) => skill !== null);
    const specificSkillsInBackpack = skills.backpack
      .slice(5, 10)
      .filter((skill) => skill !== null);

    console.log("\nContenu du backpack:");
    console.log("Soft Skills:", softSkillsInBackpack);
    console.log("Compétences:", specificSkillsInBackpack);

    // Vérification des correspondances RHH
    const rhhSoftSkills = softSkillsInBackpack.filter((skill) => {
      const isMatch = profileSkills.RHH.includes(skill);
      console.log(`Checking RHH soft skill: ${skill} -> ${isMatch}`);
      return isMatch;
    });

    const rhhSpecificSkills = specificSkillsInBackpack.filter((skill) => {
      const isMatch = profileCompetencies.RHH.includes(skill);
      console.log(`Checking RHH specific skill: ${skill} -> ${isMatch}`);
      return isMatch;
    });

    // Vérification des correspondances RET
    const retSoftSkills = softSkillsInBackpack.filter((skill) => {
      const isMatch = profileSkills.RET.includes(skill);
      console.log(`Checking RET soft skill: ${skill} -> ${isMatch}`);
      return isMatch;
    });

    const retSpecificSkills = specificSkillsInBackpack.filter((skill) => {
      const isMatch = profileCompetencies.RET.includes(skill);
      console.log(`Checking RET specific skill: ${skill} -> ${isMatch}`);
      return isMatch;
    });

    // Vérification des correspondances CATL
    const catlSoftSkills = softSkillsInBackpack.filter((skill) => {
      const isMatch = profileSkills.CATL.includes(skill);
      console.log(`Checking CATL soft skill: ${skill} -> ${isMatch}`);
      return isMatch;
    });

    const catlSpecificSkills = specificSkillsInBackpack.filter((skill) => {
      const isMatch = profileCompetencies.CATL.includes(skill);
      console.log(`Checking CATL specific skill: ${skill} -> ${isMatch}`);
      return isMatch;
    });

    console.log("\nRésultats des correspondances:");
    console.log("RHH:", {
      softSkills: { matches: rhhSoftSkills.length, skills: rhhSoftSkills },
      specificSkills: {
        matches: rhhSpecificSkills.length,
        skills: rhhSpecificSkills,
      },
    });
    console.log("RET:", {
      softSkills: { matches: retSoftSkills.length, skills: retSoftSkills },
      specificSkills: {
        matches: retSpecificSkills.length,
        skills: retSpecificSkills,
      },
    });
    console.log("CATL:", {
      softSkills: { matches: catlSoftSkills.length, skills: catlSoftSkills },
      specificSkills: {
        matches: catlSpecificSkills.length,
        skills: catlSpecificSkills,
      },
    });

    // Détermination des profils
    let softSkillsResult = "Profil non associé";
    let specificSkillsResult = "Profil non associé";

    if (rhhSoftSkills.length >= 3) {
      softSkillsResult = "Réceptionniste d'Hôtel (RHH)";
      console.log(`✅ RHH Soft Skills trouvé: ${rhhSoftSkills.length}/3`);
    } else if (retSoftSkills.length >= 3) {
      softSkillsResult = "Responsable d'Établissement Touristique (RET)";
      console.log(`✅ RET Soft Skills trouvé: ${retSoftSkills.length}/3`);
    } else if (catlSoftSkills.length >= 3) {
      softSkillsResult = "Conseiller en Agence de Tourisme et Loisirs (CATL)";
      console.log(`✅ CATL Soft Skills trouvé: ${catlSoftSkills.length}/3`);
    }

    if (rhhSpecificSkills.length >= 3) {
      specificSkillsResult = "Réceptionniste d'Hôtel (RHH)";
      console.log(`✅ RHH Compétences trouvé: ${rhhSpecificSkills.length}/3`);
    } else if (retSpecificSkills.length >= 3) {
      specificSkillsResult = "Responsable d'Établissement Touristique (RET)";
      console.log(`✅ RET Compétences trouvé: ${retSpecificSkills.length}/3`);
    } else if (catlSpecificSkills.length >= 3) {
      specificSkillsResult =
        "Conseiller en Agence de Tourisme et Loisirs (CATL)";
      console.log(`✅ CATL Compétences trouvé: ${catlSpecificSkills.length}/3`);
    }

    setResults((prevResults) => {
      console.log("Mise à jour des résultats:", {
        softSkills: softSkillsResult,
        specificSkills: specificSkillsResult,
      });
      return {
        softSkills: softSkillsResult,
        specificSkills: specificSkillsResult,
      };
    });
  };

  const handleShowResults = () => {
    console.log("Affichage des résultats demandé");
    updateResults(); // Force une mise à jour des résultats avant affichage
    setShowResults(true);
  };

  const resetApp = () => {
    console.log("\n=== Réinitialisation de l'application ===");
    setSkills({
      softSkills: [
        // RHH
        "Empathie",
        "Organisation",
        "Bonne communication",
        "Adaptabilité",
        "Esprit d'équipe",
        // RET
        "Leadership",
        "Proactivité",
        "Résolution de problèmes",
        "Capacité de Négociation",
        "Flexibilité",
        // CATL
        "Sens du service",
        "Créativité",
        "Patience",
        "Dynamisme",
        "Curiosité",
      ],
      specificSkills: [
        // RHH
        "Accueillir, informer et conseiller le client",
        "Traiter les demandes de réservations de prestations hôtelières",
        "Procéder aux opérations d'arrivée, de suivi et de départ du client",
        "Assurer le suivi de l'activité journalière",
        "Contribuer au développement commercial",
        // RET
        "Gérer les opérations de l'établissement",
        "Développer des stratégies commerciales",
        "Gérer les ressources humaines",
        "Assurer la gestion financière",
        "Promouvoir l'établissement",
        // CATL
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
    console.log("Application réinitialisée");
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
        <Card className="fixed top-4 left-1/2 transform w-full max-w-2xl bg-white bg-opacity-85 shadow-lg">
          <CardHeader className="bg-custom-blue font-semibold text-white text-center text-lg py-0.5">
            Résultats de votre recherche de profil
          </CardHeader>
          <CardContent className="p-4">
            <div className="space-y-2">
              <hr></hr>
              <h3 className="font-semibold">
                Le Profil que nous trouvons selon vos choix de Soft Skills
              </h3>
              <hr></hr>
              <p className="text-center font-bold text-[#308dc2] uppercase text-lg">
                {results.softSkills || "Aucun résultat"}
              </p>
              <hr></hr>
              <h3 className="font-semibold">
                Le Profil que nous trouvons selon vos choix de Compétences
              </h3>
              <hr></hr>
              <p className="text-center font-bold text-[#308dc2] uppercase text-lg">
                {results.specificSkills || "Aucun résultat"}
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="fixed bottom-4 right-4 space-x-2">
        <Button
          onClick={handleShowResults}
          className="bg-blue-500 hover:bg-blue-600 text-white px-[10px] pb-[10px] rounded-lg rounded-lg"
        >
          Résultats
        </Button>
        <Button
          onClick={resetApp}
          className="bg-red-500 hover:bg-red-600 text-white px-[10px] pb-[10px] rounded-lg rounded-lg"
        >
          Réinitialiser
        </Button>
      </div>
    </AppBackground>
  );
};

export default DragDropApp;
