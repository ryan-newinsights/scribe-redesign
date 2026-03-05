import { Layout } from "@/components/layout/Layout";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { Table, TableHeader, TableHead, TableRow, TableBody, TableCell } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, ArrowRight, Building2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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

const Organizations = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const filtered = organizations.filter((org) =>
    org.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Layout>
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/platform-admin">Platform Admin</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Organizations</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex items-center gap-3 mb-6">
        <Building2 className="h-6 w-6 text-muted-foreground" />
        <h1 className="text-2xl font-bold">Organizations</h1>
        <span className="text-sm text-muted-foreground ml-1">({organizations.length})</span>
      </div>

      <div className="relative mb-6 max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search organizations..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <Building2 className="h-12 w-12 text-muted-foreground/40 mb-4" />
          <p className="text-lg font-medium text-muted-foreground">No organizations found</p>
          <p className="text-sm text-muted-foreground/60 mt-1">Try adjusting your search query</p>
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead>Organization Name</TableHead>
              <TableHead className="text-center">Projects</TableHead>
              <TableHead className="text-center">Jobs Run</TableHead>
              <TableHead className="text-center">Last Job Run</TableHead>
              <TableHead className="text-right w-[80px]" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((org) => (
              <TableRow key={org.id} className="group">
                <TableCell>
                  <button
                    onClick={() => navigate(`/organizations/${org.id}`)}
                    className="font-medium text-foreground hover:text-primary transition-colors text-left"
                  >
                    {org.name}
                  </button>
                </TableCell>
                <TableCell className="text-center text-muted-foreground">
                  {org.projects}
                </TableCell>
                <TableCell className="text-center text-muted-foreground">
                  {org.jobsRun.toLocaleString()}
                </TableCell>
                <TableCell className="text-center text-muted-foreground text-sm">
                  {org.lastJobRun}
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="opacity-0 group-hover:opacity-100 transition-opacity hover:text-primary hover:bg-primary/10"
                    onClick={() => navigate(`/organizations/${org.id}`)}
                  >
                    Enter
                    <ArrowRight className="h-3.5 w-3.5 ml-1" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Layout>
  );
};

export default Organizations;
