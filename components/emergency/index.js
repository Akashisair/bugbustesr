import React from "react";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Activity, Leaf, Bug, CheckCircle2 } from "lucide-react";

export default function FirstAidSteps({ title, type, steps }) {
  const typeIcons = {
    snake: Activity,
    plant: Leaf,
    insect: Bug
  };

  const typeColors = {
    snake: "from-red-500 to-orange-500",
    plant: "from-green-500 to-emerald-500",
    insect: "from-amber-500 to-yellow-500"
  };

  const TypeIcon = typeIcons[type] || Activity;
  const colorGradient = typeColors[type] || "from-gray-500 to-gray-600";

  return (
    <Card className="p-6 border-2 hover:shadow-lg transition-all">
      <div className="flex items-center gap-4 mb-4">
        <div className={`w-14 h-14 bg-gradient-to-br ${colorGradient} rounded-xl flex items-center justify-center`}>
          <TypeIcon className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
      </div>

      <Separator className="my-4" />

      <div className="space-y-4">
        {steps.map((item, index) => (
          <div key={index} className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-emerald-600" />
              </div>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-1">{item.step}</h4>
              <p className="text-gray-600">{item.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}