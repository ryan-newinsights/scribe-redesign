import { Code2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { FunctionDocumentation } from "@/types/fileDocumentation";

interface FunctionCardProps {
  func: FunctionDocumentation;
}

export const FunctionCard = ({ func }: FunctionCardProps) => {
  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        {/* Function Name */}
        <div className="flex items-center gap-2">
          <Code2 className="h-4 w-4 text-primary" />
          <span className="font-mono font-semibold">{func.name}</span>
        </div>

        {/* Description */}
        <p className="text-muted-foreground text-sm">{func.description}</p>

        {/* Parameters */}
        {func.parameters.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Parameters:</h4>
            <div className="space-y-2">
              {func.parameters.map((param, idx) => (
                <div
                  key={idx}
                  className="bg-muted/50 rounded-md p-3 space-y-1"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm text-primary font-medium">
                      {param.name}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      ({param.type})
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {param.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Returns */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Returns:</h4>
          <div className="bg-muted/50 rounded-md p-3 space-y-1">
            <span className="font-mono text-sm text-primary font-medium">
              {func.returns.type}
            </span>
            <p className="text-sm text-muted-foreground">
              {func.returns.description}
            </p>
          </div>
        </div>

        {/* Examples */}
        {func.examples && func.examples.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Examples:</h4>
            {func.examples.map((example, idx) => (
              <pre
                key={idx}
                className="bg-foreground/95 text-primary rounded-md p-4 text-sm font-mono overflow-x-auto"
              >
                <code>{example}</code>
              </pre>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
