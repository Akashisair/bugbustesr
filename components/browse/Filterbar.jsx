import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Filter } from "lucide-react";

export default function FilterBar({ typeFilter, setTypeFilter, dangerFilter, setDangerFilter }) {
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <div className="flex items-center gap-2 min-w-[160px]">
        <Filter className="w-5 h-5 text-gray-400" />
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="h-12">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="snake">Snakes</SelectItem>
            <SelectItem value="plant">Plants</SelectItem>
            <SelectItem value="insect">Insects</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-2 min-w-[160px]">
        <Filter className="w-5 h-5 text-gray-400" />
        <Select value={dangerFilter} onValueChange={setDangerFilter}>
          <SelectTrigger className="h-12">
            <SelectValue placeholder="Danger" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Levels</SelectItem>
            <SelectItem value="low">Low</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="high">High</SelectItem>
            <SelectItem value="extreme">Extreme</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
