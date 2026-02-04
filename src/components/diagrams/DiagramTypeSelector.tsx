import { Badge } from "@/components/ui/badge";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { DiagramType } from "@/data/mockDiagramData";
import { cn } from "@/lib/utils";

interface DiagramTypeSelectorProps {
  types: DiagramType[];
  selected: string;
  onSelect: (type: string) => void;
}

export const DiagramTypeSelector = ({
  types,
  selected,
  onSelect,
}: DiagramTypeSelectorProps) => {
  return (
    <ToggleGroup
      type="single"
      value={selected}
      onValueChange={(value) => value && onSelect(value)}
      className="justify-start gap-2"
    >
      {types.map((type) => (
        <ToggleGroupItem
          key={type.id}
          value={type.id}
          disabled={type.disabled}
          className={cn(
            "px-4 py-2 rounded-full border transition-all",
            selected === type.id
              ? "bg-primary text-primary-foreground border-primary"
              : "bg-background border-border hover:bg-muted",
            type.disabled && "opacity-50 cursor-not-allowed"
          )}
        >
          <span>{type.label}</span>
          {type.comingSoon && (
            <Badge variant="secondary" className="ml-2 text-xs">
              Coming Soon
            </Badge>
          )}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
};
