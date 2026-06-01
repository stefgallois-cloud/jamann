"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

export default function Onboarding() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <Image src="/logo.png" alt="Le Manoïre" width={80} height={80} className="object-contain drop-shadow-md mb-4" />
          <h1 className="text-3xl font-extrabold tracking-tight text-[#5A3E26]">Le Manoïre</h1>
          <p className="text-sm font-medium text-stone-500 uppercase tracking-widest mt-1">Espace Équipe</p>
        </div>

        <Card className="border-stone-200 shadow-lg rounded-2xl">
          <CardHeader>
            <CardTitle className="text-xl text-stone-800">Bienvenue dans l'équipe !</CardTitle>
            <CardDescription className="text-stone-500">
              Veuillez remplir vos informations pour configurer votre profil et vos disponibilités.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-stone-700">Nom complet</Label>
              <Input id="name" placeholder="Ex: Jean Dupont" className="border-stone-200" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="role" className="text-stone-700">Votre poste principal</Label>
              <Select>
                <SelectTrigger className="border-stone-200">
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

            <div className="space-y-2">
              <Label htmlFor="contract" className="text-stone-700">Type de contrat (Heures / semaine)</Label>
              <Select>
                <SelectTrigger className="border-stone-200">
                  <SelectValue placeholder="Sélectionnez un contrat" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="42">Temps plein (42h)</SelectItem>
                  <SelectItem value="35">Temps plein (35h)</SelectItem>
                  <SelectItem value="20">Temps partiel (20h)</SelectItem>
                  <SelectItem value="extra">Extra</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-3">
            <Button className="w-full bg-[#8b5a2b] hover:bg-[#6b421c] text-white rounded-xl py-6 text-base shadow-md">
              Enregistrer mon profil
            </Button>
            <Button variant="ghost" className="w-full text-stone-500 hover:text-stone-700" onClick={() => window.location.href = "/"}>
              Retour au planning
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
