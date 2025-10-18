import React from "react";
import { useQuery } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, AlertTriangle, MapPin, Activity, Shield, Leaf, Bug } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { createPageUrl } from "@/utils";

export default function SpeciesDetail() {
  const navigate = useNavigate();
  const urlParams = new URLSearchParams(window.location.search);
  const speciesId = urlParams.get('id');

  const { data: allSpecies, isLoading } = useQuery({
    queryKey: ['species'],
    queryFn: () => base44.entities.Species.list(),
    initialData: [],
  });

  const species = allSpecies.find(s => s.id === speciesId);

  const dangerColors = {
    low: "bg-blue-100 text-blue-800 border-blue-200",
    medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
    high: "bg-orange-100 text-orange-800 border-orange-200",
    extreme: "bg-red-100 text-red-800 border-red-200"
  };

  const typeIcons = {
    snake: Activity,
    plant: Leaf,
    insect: Bug
  };

  const TypeIcon = species ? typeIcons[species.type] : Activity;

  if (isLoading) {
    return (
      <div className="min-h-screen py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Skeleton className="h-96 w-full rounded-xl mb-8" />
          <Skeleton className="h-12 w-3/4 mb-4" />
          <Skeleton className="h-64 w-full" />
        </div>
      </div>
    );
  }

  if (!species) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="w-16 h-16 mx-auto text-gray-300 mb-4" />
          <h2 className="text-2xl font-bold text-gray-700 mb-2">Species not found</h2>
          <Button onClick={() => navigate(createPageUrl("Browse"))}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Browse
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Button
          variant="outline"
          onClick={() => navigate(createPageUrl("Browse"))}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Browse
        </Button>

        {/* Hero Image */}
        <Card className="overflow-hidden mb-8 shadow-2xl">
          <div className="relative h-96 bg-gradient-to-br from-gray-800 to-gray-900">
            {species.image_url ? (
              <img
                src={species.image_url}
                alt={species.common_name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <TypeIcon className="w-32 h-32 text-gray-600" />
              </div>
            )}
            <div className="absolute top-4 right-4">
              <Badge className={`${dangerColors[species.danger_level]} border-2 px-4 py-2 text-lg font-bold`}>
                <AlertTriangle className="w-5 h-5 mr-2" />
                {species.danger_level?.toUpperCase()} DANGER
              </Badge>
            </div>
          </div>
        </Card>

        {/* Species Info */}
        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2 space-y-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <TypeIcon className="w-8 h-8 text-emerald-600" />
                <Badge variant="outline" className="text-sm">
                  {species.type}
                </Badge>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
                {species.common_name}
              </h1>
              <p className="text-xl text-gray-600 italic">{species.scientific_name}</p>
            </div>

            {species.description && (
              <Card className="p-6 bg-emerald-50 border-emerald-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Shield className="w-6 h-6 text-emerald-600" />
                  About This Species
                </h2>
                <p className="text-gray-700 leading-relaxed text-lg">{species.description}</p>
              </Card>
            )}

            {species.habitat && (
              <Card className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <MapPin className="w-6 h-6 text-blue-600" />
                  Habitat & Regions
                </h2>
                <p className="text-gray-700 leading-relaxed text-lg">{species.habitat}</p>
              </Card>
            )}

            {species.prevention_tips && (
              <Card className="p-6 bg-blue-50 border-blue-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Shield className="w-6 h-6 text-blue-600" />
                  Prevention Tips
                </h2>
                <p className="text-gray-700 leading-relaxed text-lg whitespace-pre-line">
                  {species.prevention_tips}
                </p>
              </Card>
            )}
          </div>

          <div className="space-y-6">
            {species.symptoms && (
              <Card className="p-6 bg-orange-50 border-orange-200 border-2">
                <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-orange-600" />
                  Symptoms
                </h2>
                <Separator className="my-3" />
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {species.symptoms}
                </p>
              </Card>
            )}

            {species.first_aid && (
              <Card className="p-6 bg-red-50 border-red-300 border-2">
                <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                  First Aid
                </h2>
                <Separator className="my-3" />
                <div className="space-y-3">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {species.first_aid}
                  </p>
                  <Button
                    className="w-full bg-red-600 hover:bg-red-700 mt-4"
                    onClick={() => navigate(createPageUrl("Emergency"))}
                  >
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    View Full Emergency Guide
                  </Button>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}