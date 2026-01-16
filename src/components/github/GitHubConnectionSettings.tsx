import { Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { GitHubConnection } from "@/types/github";

interface GitHubConnectionSettingsProps {
  connection: GitHubConnection | null;
  onConnect: () => void;
  onDisconnect: () => void;
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function GitHubConnectionSettings({
  connection,
  onConnect,
  onDisconnect,
}: GitHubConnectionSettingsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Connected Accounts</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between p-4 rounded-lg border bg-muted/30">
          <div className="flex items-center gap-3">
            {/* GitHub logo */}
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-foreground text-background">
              <Github className="h-5 w-5" />
            </div>

            {/* Connection info */}
            <div>
              <p className="font-medium text-sm">GitHub</p>
              {connection ? (
                <div className="flex items-center gap-2 mt-0.5">
                  <Avatar className="h-4 w-4">
                    <AvatarImage src={connection.avatarUrl} alt={connection.username} />
                    <AvatarFallback className="text-[8px]">
                      {connection.username.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-xs text-muted-foreground">
                    @{connection.username} connected {formatDate(connection.connectedAt)}
                  </span>
                </div>
              ) : (
                <p className="text-xs text-muted-foreground">Not connected</p>
              )}
            </div>
          </div>

          {/* Action button */}
          {connection ? (
            <Button variant="outline" size="sm" onClick={onDisconnect}>
              Disconnect
            </Button>
          ) : (
            <Button size="sm" onClick={onConnect}>
              <Github className="h-4 w-4 mr-1.5" />
              Connect GitHub
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
