import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Pencil, Eye } from "lucide-react";
import { mockTierConfigs } from "@/data/mockAdminData";

export function TierConfigurationsTab() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Tier Configurations</h2>
          <p className="text-sm text-muted-foreground">
            Define language and feature bundles for each pricing tier
          </p>
        </div>
        <Button size="sm" className="gap-1.5">
          <Plus className="h-4 w-4" />
          New Tier
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {mockTierConfigs.map((tier) => (
          <Card
            key={tier.id}
            className={
              tier.isBeta
                ? "border-dashed border-warning/50 bg-warning-bg/20"
                : ""
            }
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">{tier.name}</CardTitle>
                <Badge
                  variant={tier.active ? "default" : "secondary"}
                  className={
                    tier.active
                      ? tier.isBeta
                        ? "bg-warning text-warning-foreground"
                        : "bg-status-completed text-primary-foreground"
                      : ""
                  }
                >
                  {tier.active ? (tier.isBeta ? "Beta" : "Active") : "Inactive"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wider">
                  Languages ({tier.languages.length})
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {tier.languages.map((lang) => (
                    <span
                      key={lang}
                      className="inline-flex items-center gap-1 rounded-md bg-muted px-2 py-0.5 text-xs font-medium text-foreground"
                    >
                      {lang}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wider">
                  Features ({tier.features.length})
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {tier.features.map((feat) => (
                    <Badge key={feat} variant="outline" className="text-xs font-normal">
                      {feat}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 pt-1">
                <Button variant="outline" size="sm" className="gap-1.5 flex-1">
                  <Pencil className="h-3.5 w-3.5" />
                  Edit
                </Button>
                <Button variant="ghost" size="sm" className="gap-1.5 flex-1">
                  <Eye className="h-3.5 w-3.5" />
                  Preview
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
