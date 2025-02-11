// ...existing code...

export default function Home() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsContent value="overview" className="space-y-4">
          <DashboardCards />
          {/* ...existing code... */}
        </TabsContent>
      </Tabs>
    </div>
  );
}
