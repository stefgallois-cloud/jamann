"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { addEmployee, generateId, initializeStorage } from "@/lib/storage";
import { CheckCircle, ArrowLeft, UserPlus } from "lucide-react";

const DAYS = [
  "Lundi",
  "Mardi",
  "Mercredi",
  "Jeudi",
  "Vendredi",
  "Samedi",
  "Dimanche",
];

export default function Onboarding() {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [maxHours, setMaxHours] = useState("");
  const [availability, setAvailability] = useState<boolean[]>(
    new Array(7).fill(true)
  );
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const toggleDay = (index: number) => {
    setAvailability((prev) => {
      const next = [...prev];
      next[index] = !next[index];
      return next;
    });
  };

  const handleSubmit = () => {
    if (!name.trim()) {
      setError("Veuillez entrer un nom.");
      return;
    }
    if (!role) {
      setError("Veuillez sélectionner un poste.");
      return;
    }
    if (!maxHours) {
      setError("Veuillez sélectionner un type de contrat.");
      return;
    }

    setError("");
    initializeStorage();

    addEmployee({
      id: generateId(),
      name: name.trim(),
      role:
        role === "serveur"
          ? "Serveur"
          : role === "chef_rang"
          ? "Chef de Rang"
          : role === "cuisinier"
          ? "Cuisinier"
          : role === "plongeur"
          ? "Plongeur"
          : role === "barman"
          ? "Barman"
          : role,
      maxHours: parseInt(maxHours) || 35,
    });

    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[var(--manoire-creme)] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative mb-4">
            <Image
              src="/logo.png"
              alt="Le Manoïre"
              width={80}
              height={80}
              className="object-contain drop-shadow-lg rounded-2xl"
            />
          </div>
          <h1 className="text-3xl font-[family-name:var(--font-display)] text-[var(--manoire-bordeaux)] tracking-wide">
            Le Manoïre
          </h1>
          <p className="text-xs font-medium text-[var(--manoire-kaki)] uppercase tracking-[0.2em] mt-1">
            Espace Équipe
          </p>
        </div>

        {submitted ? (
          /* Success State */
          <Card className="border-[var(--manoire-beige)]/40 shadow-xl rounded-2xl bg-[var(--manoire-blanc)] overflow-hidden">
            <div className="h-1.5 bg-gradient-to-r from-emerald-400 to-emerald-500" />
            <CardContent className="pt-10 pb-8 text-center">
              <div className="w-20 h-20 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-6 animate-[bounce_0.5s_ease-in-out]">
                <CheckCircle className="w-10 h-10 text-emerald-500" />
              </div>
              <h2 className="text-2xl font-[family-name:var(--font-heading)] font-bold text-[var(--manoire-bordeaux)] mb-2">
                Bienvenue, {name} !
              </h2>
              <p className="text-[var(--manoire-kaki)] mb-8">
                Votre profil a été enregistré avec succès.
              </p>
              <div className="flex flex-col gap-3">
                <Button
                  onClick={() => {
                    setSubmitted(false);
                    setName("");
                    setRole("");
                    setMaxHours("");
                    setAvailability(new Array(7).fill(true));
                  }}
                  className="w-full bg-[var(--manoire-caramel)] hover:bg-[#7a3711] text-white rounded-xl py-6 text-base shadow-md gap-2"
                >
                  <UserPlus className="w-4 h-4" />
                  Ajouter un autre employé
                </Button>
                <Link href="/">
                  <Button
                    variant="ghost"
                    className="w-full text-[var(--manoire-kaki)] hover:text-[var(--manoire-bordeaux)] gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Retour au planning
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ) : (
          /* Form */
          <Card className="border-[var(--manoire-beige)]/40 shadow-xl rounded-2xl bg-[var(--manoire-blanc)] overflow-hidden">
            <div className="h-1.5 bg-gradient-to-r from-[var(--manoire-caramel)] to-[var(--manoire-ocre)]" />
            <CardHeader>
              <CardTitle className="text-xl font-[family-name:var(--font-heading)] text-[var(--manoire-bordeaux)]">
                Bienvenue dans l&apos;équipe !
              </CardTitle>
              <CardDescription className="text-[var(--manoire-kaki)]">
                Remplissez vos informations pour configurer votre profil et vos
                disponibilités.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              {/* Name */}
              <div className="space-y-2">
                <Label
                  htmlFor="name"
                  className="text-[var(--manoire-bordeaux)] font-medium"
                >
                  Nom complet
                </Label>
                <Input
                  id="name"
                  placeholder="Ex: Jean Dupont"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="border-[var(--manoire-beige)] focus:ring-[var(--manoire-caramel)] bg-white"
                />
              </div>

              {/* Role */}
              <div className="space-y-2">
                <Label className="text-[var(--manoire-bordeaux)] font-medium">
                  Votre poste principal
                </Label>
                <Select value={role} onValueChange={(v) => v && setRole(v)}>
                  <SelectTrigger className="border-[var(--manoire-beige)] bg-white">
                    <SelectValue placeholder="Sélectionnez un poste" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="serveur">Serveur / Serveuse</SelectItem>
                    <SelectItem value="chef_rang">Chef de Rang</SelectItem>
                    <SelectItem value="cuisinier">Cuisinier</SelectItem>
                    <SelectItem value="plongeur">Plongeur</SelectItem>
                    <SelectItem value="barman">Barman</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Contract */}
              <div className="space-y-2">
                <Label className="text-[var(--manoire-bordeaux)] font-medium">
                  Type de contrat (Heures / semaine)
                </Label>
                <Select value={maxHours} onValueChange={(v) => v && setMaxHours(v)}>
                  <SelectTrigger className="border-[var(--manoire-beige)] bg-white">
                    <SelectValue placeholder="Sélectionnez un contrat" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="42">Temps plein (42h)</SelectItem>
                    <SelectItem value="35">Temps plein (35h)</SelectItem>
                    <SelectItem value="20">Temps partiel (20h)</SelectItem>
                    <SelectItem value="10">Extra</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Availability */}
              <div className="space-y-3">
                <Label className="text-[var(--manoire-bordeaux)] font-medium">
                  Disponibilités
                </Label>
                <div className="flex flex-wrap gap-2">
                  {DAYS.map((day, i) => (
                    <button
                      key={day}
                      type="button"
                      onClick={() => toggleDay(i)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 border ${
                        availability[i]
                          ? "bg-[var(--manoire-caramel)] text-white border-[var(--manoire-caramel)] shadow-sm"
                          : "bg-white text-[var(--manoire-kaki)] border-[var(--manoire-beige)] hover:border-[var(--manoire-caramel)]"
                      }`}
                    >
                      {day.slice(0, 3)}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-[var(--manoire-kaki)]">
                  Cliquez pour activer/désactiver un jour
                </p>
              </div>

              {/* Error */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-sm text-red-700 font-medium">
                  {error}
                </div>
              )}
            </CardContent>
            <CardFooter className="flex flex-col gap-3">
              <Button
                onClick={handleSubmit}
                className="w-full bg-[var(--manoire-caramel)] hover:bg-[#7a3711] text-white rounded-xl py-6 text-base shadow-md transition-all hover:shadow-lg"
              >
                Enregistrer mon profil
              </Button>
              <Link href="/">
                <Button
                  variant="ghost"
                  className="w-full text-[var(--manoire-kaki)] hover:text-[var(--manoire-bordeaux)] gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Retour au planning
                </Button>
              </Link>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  );
}
