import { useRouter } from 'next/navigation';

export function DashboardCards() {
  const router = useRouter();
  
  const handleAddStudent = () => {
    router.push('/student-enrollment');
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Students</CardTitle>
          <Button onClick={handleAddStudent} variant="outline" size="icon">
            <Plus className="h-4 w-4" />
          </Button>
        </CardHeader>
      </Card>
    </div>
  );
}
