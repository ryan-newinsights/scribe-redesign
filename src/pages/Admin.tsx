import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings } from "lucide-react";

const Admin = () => {
  return (
    <Layout>
      <div className="flex items-center gap-3 mb-6">
        <Settings className="h-6 w-6 text-muted-foreground" />
        <h1 className="text-2xl font-bold">Admin Settings</h1>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>LLM Configuration</CardTitle>
            <CardDescription>
              Manage your language model configurations and API keys
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              LLM configuration settings will be displayed here.
            </p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Admin;
