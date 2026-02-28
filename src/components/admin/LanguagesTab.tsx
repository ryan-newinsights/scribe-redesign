import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Plus, Pencil } from "lucide-react";
import { mockLanguages, type Language } from "@/data/mockAdminData";

export function LanguagesTab() {
  const [languages, setLanguages] = useState<Language[]>(mockLanguages);

  const toggleAvailability = (id: string) => {
    setLanguages((prev) =>
      prev.map((lang) =>
        lang.id === id ? { ...lang, available: !lang.available } : lang
      )
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Supported Languages</h2>
          <p className="text-sm text-muted-foreground">
            Manage programming languages available for code analysis
          </p>
        </div>
        <Button size="sm" className="gap-1.5">
          <Plus className="h-4 w-4" />
          Add Language
        </Button>
      </div>

      <div className="rounded-lg border bg-card">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="text-left font-medium text-muted-foreground px-4 py-3 w-12"></th>
              <th className="text-left font-medium text-muted-foreground px-4 py-3">Display Name</th>
              <th className="text-left font-medium text-muted-foreground px-4 py-3">Key</th>
              <th className="text-left font-medium text-muted-foreground px-4 py-3">File Extensions</th>
              <th className="text-center font-medium text-muted-foreground px-4 py-3">Available</th>
              <th className="text-right font-medium text-muted-foreground px-4 py-3 w-16"></th>
            </tr>
          </thead>
          <tbody>
            {languages.map((lang) => (
              <tr
                key={lang.id}
                className={`border-b last:border-0 transition-colors hover:bg-muted/30 ${
                  !lang.available ? "opacity-50" : ""
                }`}
              >
                <td className="px-4 py-3">
                  <div className="h-8 w-8 rounded-md bg-muted flex items-center justify-center text-xs font-bold text-muted-foreground">
                    {lang.icon}
                  </div>
                </td>
                <td className="px-4 py-3 font-medium text-foreground">{lang.displayName}</td>
                <td className="px-4 py-3">
                  <code className="rounded bg-muted px-2 py-0.5 text-xs font-mono text-muted-foreground">
                    {lang.key}
                  </code>
                </td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-1">
                    {lang.fileExtensions.map((ext) => (
                      <Badge key={ext} variant="secondary" className="text-xs font-normal px-1.5 py-0">
                        {ext}
                      </Badge>
                    ))}
                  </div>
                </td>
                <td className="px-4 py-3 text-center">
                  <Switch
                    checked={lang.available}
                    onCheckedChange={() => toggleAvailability(lang.id)}
                    className="data-[state=checked]:bg-status-completed"
                  />
                </td>
                <td className="px-4 py-3 text-right">
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                    <Pencil className="h-3.5 w-3.5" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
