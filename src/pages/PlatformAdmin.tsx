import { Layout } from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings } from "lucide-react";
import { LanguagesTab } from "@/components/admin/LanguagesTab";
import { FeatureFlagsTab } from "@/components/admin/FeatureFlagsTab";
import { TierConfigurationsTab } from "@/components/admin/TierConfigurationsTab";
import { OrganizationsTab } from "@/components/admin/OrganizationsTab";

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

      <Tabs defaultValue="organizations" className="space-y-6">
        <TabsList className="bg-transparent border-b rounded-none w-full justify-start gap-4 px-0 h-auto pb-0">
          {["organizations", "languages", "feature-flags", "tiers"].map(tab => (
            <TabsTrigger
              key={tab}
              value={tab}
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none pb-3 px-1 text-sm capitalize"
            >
              {tab === "feature-flags" ? "Feature Flags" : tab === "tiers" ? "Tier Configurations" : tab}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="organizations">
          <OrganizationsTab />
        </TabsContent>
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
