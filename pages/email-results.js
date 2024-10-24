import React, { useState } from "react";
import { Card, CardHeader, CardContent } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";

const EmailResultsPage = ({ results }) => {
  const [email, setEmail] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);
    setMessage("");

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          results: {
            softSkills: results.softSkills,
            specificSkills: results.specificSkills,
          },
        }),
      });

      if (response.ok) {
        setMessage("Email envoyé avec succès !");
        setEmail("");
      } else {
        throw new Error("Erreur lors de l'envoi");
      }
    } catch (error) {
      setMessage("Erreur: " + error.message);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl mx-auto">
        <Card>
          <CardHeader className="bg-blue-500 text-white">
            <h2 className="text-2xl font-bold text-center">
              Envoi des résultats par email
            </h2>
          </CardHeader>
          <CardContent className="p-6">
            {/* Affichage des résultats */}
            <div className="mb-8 space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-bold mb-2">Profil Soft Skills :</h3>
                <p>{results?.softSkills || "Aucun résultat"}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-bold mb-2">Profil Compétences :</h3>
                <p>{results?.specificSkills || "Aucun résultat"}</p>
              </div>
            </div>

            {/* Formulaire d'envoi */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Adresse email
                </label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="votre@email.com"
                  className="w-full"
                />
              </div>

              {message && (
                <div
                  className={`p-3 rounded-lg ${
                    message.includes("Erreur")
                      ? "bg-red-100 text-red-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {message}
                </div>
              )}

              <div className="flex justify-end space-x-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => window.history.back()}
                >
                  Retour
                </Button>
                <Button
                  type="submit"
                  disabled={isSending}
                  className="bg-blue-500 hover:bg-blue-600 text-white"
                >
                  {isSending ? "Envoi en cours..." : "Envoyer"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EmailResultsPage;
