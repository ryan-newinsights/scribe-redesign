export function RateLimitsTab() {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold text-foreground">Rate Limits</h2>
        <p className="text-sm text-muted-foreground">
          Configure rate limiting for API and LLM requests.
        </p>
      </div>
      <div className="rounded-lg border bg-card p-8 text-center text-sm text-muted-foreground">
        Rate limit configuration coming soon.
      </div>
    </div>
  );
}
