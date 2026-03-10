import { Layout } from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, Code2, Flag, Layers, Building2, ArrowRight } from "lucide-react";
import { LanguagesTab } from "@/components/admin/LanguagesTab";
import { FeatureFlagsTab } from "@/components/admin/FeatureFlagsTab";
import { TierConfigurationsTab } from "@/components/admin/TierConfigurationsTab";
import { Link } from "react-router-dom";

const PlatformAdmin = () => {
  return (
    <Layout>
      <div className="flex items-center gap-3 mb-6">
        <Settings className="h-6 w-6 text-muted-foreground" />
        <div>
          <h1 className="text-2xl font-bold">Platform Admin Settings</h1>
          <p className="text-sm text-muted-foreground">Manage platform configuration for Scribe</p>
        </div>
      </div>

      <Link
        to="/organizations"
        className="flex items-center justify-between p-4 mb-6 rounded-lg border bg-card hover:bg-accent/50 transition-colors group"
      >
        <div className="flex items-center gap-3">
          <Building2 className="h-5 w-5 text-muted-foreground" />
          <div>
            <p className="font-medium">Organizations</p>
            <p className="text-sm text-muted-foreground">View and manage customer organizations</p>
          </div>
        </div>
        <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
      </Link>

      <Tabs defaultValue="languages" className="space-y-6">
        <TabsList>
          <TabsTrigger value="languages" className="gap-1.5">
            <Code2 className="h-4 w-4" />
            Languages
          </TabsTrigger>
          <TabsTrigger value="feature-flags" className="gap-1.5">
            <Flag className="h-4 w-4" />
            Feature Flags
          </TabsTrigger>
          <TabsTrigger value="tiers" className="gap-1.5">
            <Layers className="h-4 w-4" />
            Tier Configurations
          </TabsTrigger>
        </TabsList>

        <TabsContent value="languages">
          <LanguagesTab />
        </TabsContent>
        <TabsContent value="feature-flags">
          <FeatureFlagsTab />
        </TabsContent>
        <TabsContent value="tiers">
          <TierConfigurationsTab />
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

export default PlatformAdmin;
