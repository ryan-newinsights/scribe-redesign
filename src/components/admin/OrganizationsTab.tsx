import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, ArrowRight, Building2 } from "lucide-react";

const organizations = [
  { id: "acme-bank", name: "Acme Bank AG", projects: 3, jobsRun: 47, lastJobRun: "2 days ago" },
  { id: "deutsche-versicherung", name: "Deutsche Versicherung", projects: 1, jobsRun: 12, lastJobRun: "1 week ago" },
  { id: "commerzbank-it", name: "Commerzbank IT", projects: 5, jobsRun: 203, lastJobRun: "4 hours ago" },
  { id: "fintech-solutions", name: "FinTech Solutions GmbH", projects: 2, jobsRun: 85, lastJobRun: "12 hours ago" },
  { id: "swiss-re", name: "Swiss Re Digital", projects: 4, jobsRun: 134, lastJobRun: "1 day ago" },
  { id: "allianz-tech", name: "Allianz Technology", projects: 7, jobsRun: 312, lastJobRun: "30 minutes ago" },
  { id: "munich-re", name: "Munich Re Labs", projects: 2, jobsRun: 28, lastJobRun: "3 days ago" },
  { id: "zurich-digital", name: "Zurich Digital Hub", projects: 1, jobsRun: 5, lastJobRun: "2 weeks ago" },
];

export function OrganizationsTab() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const filtered = organizations.filter((org) =>
    org.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Organizations</h2>
          <p className="text-sm text-muted-foreground">
            View and manage customer organizations
          </p>
        </div>
        <div className="relative max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search organizations..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 h-9"
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center rounded-lg border bg-card">
          <Building2 className="h-12 w-12 text-muted-foreground/40 mb-4" />
          <p className="text-lg font-medium text-muted-foreground">No organizations found</p>
          <p className="text-sm text-muted-foreground/60 mt-1">Try adjusting your search query</p>
        </div>
      ) : (
        <div className="rounded-lg border bg-card">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left font-medium text-muted-foreground px-4 py-3">Organization Name</th>
                <th className="text-center font-medium text-muted-foreground px-4 py-3">Projects</th>
                <th className="text-center font-medium text-muted-foreground px-4 py-3">Jobs Run</th>
                <th className="text-center font-medium text-muted-foreground px-4 py-3">Last Job Run</th>
                <th className="text-right font-medium text-muted-foreground px-4 py-3 w-16"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((org) => (
                <tr
                  key={org.id}
                  className="border-b last:border-0 transition-colors hover:bg-muted/30 group cursor-pointer"
                  onClick={() => navigate(`/organizations/${org.id}`)}
                >
                  <td className="px-4 py-3 font-medium text-foreground">{org.name}</td>
                  <td className="px-4 py-3 text-center text-muted-foreground">
                    <Badge variant="secondary" className="text-xs font-normal">{org.projects}</Badge>
                  </td>
                  <td className="px-4 py-3 text-center text-muted-foreground">{org.jobsRun.toLocaleString()}</td>
                  <td className="px-4 py-3 text-center text-muted-foreground text-xs">{org.lastJobRun}</td>
                  <td className="px-4 py-3 text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity hover:text-foreground"
                    >
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
