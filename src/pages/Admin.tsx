import { Layout } from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, Cpu, Gauge, Workflow, Bot } from "lucide-react";
import { LLMConfigurationsTab } from "@/components/admin/LLMConfigurationsTab";
import { RateLimitsTab } from "@/components/admin/RateLimitsTab";
import { ProcessingControlsTab } from "@/components/admin/ProcessingControlsTab";
import { AgentFlowControlTab } from "@/components/admin/AgentFlowControlTab";

const Admin = () => {
  return (
    <Layout>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Settings className="h-6 w-6 text-muted-foreground" />
          <div>
            <h1 className="text-2xl font-bold">Configuration</h1>
            <p className="text-sm text-muted-foreground">Manage your Scribe instance settings</p>
          </div>
        </div>
      </div>

      <Tabs defaultValue="llm" className="space-y-6">
        <TabsList>
          <TabsTrigger value="llm" className="gap-1.5">
            <Cpu className="h-4 w-4" />
            LLM Configurations
          </TabsTrigger>
          <TabsTrigger value="rate-limits" className="gap-1.5">
            <Gauge className="h-4 w-4" />
            Rate Limits
          </TabsTrigger>
          <TabsTrigger value="processing" className="gap-1.5">
            <Workflow className="h-4 w-4" />
            Processing Controls
          </TabsTrigger>
          <TabsTrigger value="agent-flow" className="gap-1.5">
            <Bot className="h-4 w-4" />
            Agent Flow Control
          </TabsTrigger>
        </TabsList>

        <TabsContent value="llm">
          <LLMConfigurationsTab />
        </TabsContent>
        <TabsContent value="rate-limits">
          <RateLimitsTab />
        </TabsContent>
        <TabsContent value="processing">
          <ProcessingControlsTab />
        </TabsContent>
        <TabsContent value="agent-flow">
          <AgentFlowControlTab />
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

export default Admin;
