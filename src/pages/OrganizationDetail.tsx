import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { ImpersonationBanner } from "@/components/organizations/ImpersonationBanner";
import { getOrgDetail } from "@/data/mockOrganizationDetail";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableHeader, TableHead, TableRow, TableBody, TableCell } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowLeft, Shield, Users, FolderOpen, Zap, Clock,
  Send, Trash2, Check, X as XIcon, AlertCircle
} from "lucide-react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";

const OrganizationDetail = () => {
  const { orgId } = useParams<{ orgId: string }>();
  const navigate = useNavigate();
  const org = getOrgDetail(orgId ?? "");

  const [impersonating, setImpersonating] = useState(false);
  const [tierAssignments, setTierAssignments] = useState(
    org.availableTiers.reduce((acc, t) => ({ ...acc, [t.id]: t.assigned }), {} as Record<string, boolean>)
  );
  const [inviteEmail, setInviteEmail] = useState("");
  const [dateRange, setDateRange] = useState("7d");

  const resolvedLanguages = [...new Set(
    org.availableTiers.filter(t => tierAssignments[t.id]).flatMap(t => t.languages)
  )];
  const resolvedFeatures = [...new Set(
    org.availableTiers.filter(t => tierAssignments[t.id]).flatMap(t => t.features)
  )];

  const tierBadgeColor = (tier: string) => {
    if (tier === "Enterprise") return "bg-info-bg text-info border-info/20";
    if (tier === "Beta") return "bg-[hsl(270_60%_94%)] text-[hsl(270_60%_40%)] border-[hsl(270_60%_80%)]";
    return "bg-muted text-muted-foreground";
  };

  const statusBadge = (status: string) => {
    if (status === "Completed") return "bg-status-completed-bg text-status-completed";
    if (status === "Running") return "bg-status-running-bg text-status-running";
    return "bg-status-failed-bg text-status-failed";
  };

  return (
    <>
      {impersonating && (
        <ImpersonationBanner orgName={org.name} onExit={() => setImpersonating(false)} />
      )}
      <Layout>
        {/* Back link */}
        <button
          onClick={() => navigate("/organizations")}
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Organizations
        </button>

        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-2xl font-bold font-heading">{org.name}</h1>
              {org.tiers.map(t => (
                <Badge key={t} variant="outline" className={`text-xs ${tierBadgeColor(t)}`}>{t}</Badge>
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              Created: {org.created} · Last Login: {org.lastLogin}
            </p>
          </div>
          <Button
            className="bg-warning-bg text-warning-foreground border border-warning/30 hover:bg-warning/20 font-medium"
            onClick={() => setImpersonating(true)}
          >
            <Shield className="h-4 w-4 mr-1.5" />
            Enter as Admin
          </Button>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="bg-transparent border-b rounded-none w-full justify-start gap-4 px-0 h-auto pb-0">
            {["overview", "tiers", "usage", "members"].map(tab => (
              <TabsTrigger
                key={tab}
                value={tab}
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none pb-3 px-1 capitalize text-sm"
              >
                {tab === "usage" ? "Usage & Billing" : tab}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Overview */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-4 gap-4">
              {[
                { label: "Members", value: org.members.length, icon: Users },
                { label: "Projects", value: org.projects, icon: FolderOpen },
                { label: "Jobs Run", value: org.jobsRun, icon: Zap },
                { label: "Last Active", value: org.lastActive, icon: Clock },
              ].map(s => (
                <Card key={s.label} className="border">
                  <CardContent className="pt-5 pb-4 px-5">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                      <s.icon className="h-3.5 w-3.5" />
                      {s.label}
                    </div>
                    <p className="text-2xl font-semibold font-heading">{s.value}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div>
              <h3 className="text-sm font-medium mb-3">Members</h3>
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead className="text-right">Last Login</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {org.members.map(m => (
                    <TableRow key={m.email}>
                      <TableCell className="font-medium">{m.name}</TableCell>
                      <TableCell className="text-muted-foreground">{m.email}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={m.role === "Admin" ? "bg-info-bg text-info border-info/20" : "bg-muted text-muted-foreground"}>
                          {m.role}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right text-sm text-muted-foreground">{m.lastLogin}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          {/* Tiers */}
          <TabsContent value="tiers" className="space-y-6">
            <div className="space-y-3">
              {org.availableTiers.map(tier => (
                <Card key={tier.id} className="border">
                  <CardContent className="flex items-center justify-between py-4 px-5">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-medium font-heading">{tier.name}</span>
                        <Switch
                          checked={tierAssignments[tier.id]}
                          onCheckedChange={v => setTierAssignments(p => ({ ...p, [tier.id]: v }))}
                        />
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {tier.languages.map(l => (
                          <Badge key={l} variant="outline" className="text-xs bg-secondary">{l}</Badge>
                        ))}
                        {tier.features.map(f => (
                          <Badge key={f} variant="outline" className="text-xs bg-muted">{f}</Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Resolved entitlements */}
            <Card className="border-success/30 border bg-success-bg/30">
              <CardContent className="py-4 px-5">
                <h4 className="text-sm font-medium mb-3 flex items-center gap-1.5">
                  <Check className="h-4 w-4 text-success" />
                  Resolved Entitlements
                </h4>
                <div className="space-y-2 text-sm">
                  <p><span className="text-muted-foreground">Languages:</span> {resolvedLanguages.join(", ") || "None"}</p>
                  <p><span className="text-muted-foreground">Features:</span> {resolvedFeatures.join(", ") || "None"}</p>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Button>Save Changes</Button>
            </div>
          </TabsContent>

          {/* Usage & Billing */}
          <TabsContent value="usage" className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium">Token Consumption</h3>
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger className="w-28 h-8 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">7 days</SelectItem>
                  <SelectItem value="30d">30 days</SelectItem>
                  <SelectItem value="90d">90 days</SelectItem>
                  <SelectItem value="all">All</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Card className="border">
              <CardContent className="pt-5 pb-2 px-2">
                <ResponsiveContainer width="100%" height={240}>
                  <LineChart data={org.usageData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="date" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                    <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                    <Tooltip />
                    <Line type="monotone" dataKey="tokens" stroke="hsl(var(--info))" strokeWidth={2} dot={{ r: 3 }} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="grid grid-cols-3 gap-4">
              <Card className="border">
                <CardContent className="pt-5 pb-4 px-5">
                  <p className="text-xs text-muted-foreground mb-1">Jobs Started</p>
                  <p className="text-3xl font-semibold font-heading">{org.jobsStarted}</p>
                </CardContent>
              </Card>
              <Card className="border">
                <CardContent className="pt-5 pb-4 px-5">
                  <p className="text-xs text-muted-foreground mb-1">Jobs Completed</p>
                  <p className="text-3xl font-semibold font-heading text-status-completed">{org.jobsCompleted}</p>
                </CardContent>
              </Card>
              <Card className="border">
                <CardContent className="pt-5 pb-4 px-5">
                  <p className="text-xs text-muted-foreground mb-1">Jobs Failed</p>
                  <p className="text-3xl font-semibold font-heading text-status-failed">{org.jobsFailed}</p>
                </CardContent>
              </Card>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-3">Recent Jobs</h3>
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead>Project</TableHead>
                    <TableHead>Started</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Duration</TableHead>
                    <TableHead className="text-right">Components</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {org.jobs.map((j, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-medium">{j.project}</TableCell>
                      <TableCell className="text-muted-foreground text-sm">{j.started}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={`text-xs ${statusBadge(j.status)}`}>{j.status}</Badge>
                      </TableCell>
                      <TableCell className="text-right text-sm text-muted-foreground">{j.duration}</TableCell>
                      <TableCell className="text-right text-sm text-muted-foreground">{j.components}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          {/* Members */}
          <TabsContent value="members" className="space-y-6">
            <Card className="border">
              <CardContent className="py-4 px-5">
                <h4 className="text-sm font-medium mb-3">Invite Member</h4>
                <div className="flex items-center gap-3">
                  <Input
                    type="email"
                    placeholder="Email address"
                    value={inviteEmail}
                    onChange={e => setInviteEmail(e.target.value)}
                    className="max-w-sm"
                  />
                  <Button size="sm">
                    <Send className="h-3.5 w-3.5 mr-1.5" />
                    Send Invite
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Last Login</TableHead>
                  <TableHead className="text-right" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {org.members.map(m => (
                  <TableRow key={m.email}>
                    <TableCell className="font-medium">{m.name}</TableCell>
                    <TableCell className="text-muted-foreground">{m.email}</TableCell>
                    <TableCell>
                      <Select defaultValue={m.role.toLowerCase()}>
                        <SelectTrigger className="w-28 h-8 text-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="member">Member</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{m.lastLogin}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive hover:bg-destructive/10 h-7 text-xs">
                        <Trash2 className="h-3 w-3 mr-1" />
                        Remove
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
        </Tabs>
      </Layout>
    </>
  );
};

export default OrganizationDetail;
