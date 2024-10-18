export function RecentStudents() {
  return (
    <div className="space-y-8">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="flex items-center">
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">Student {i + 1}</p>
            <p className="text-sm text-muted-foreground">
              student{i + 1}@example.com
            </p>
          </div>
          <div className="ml-auto font-medium">Grade {['A', 'B', 'C', 'D', 'F'][Math.floor(Math.random() * 5)]}</div>
        </div>
      ))}
    </div>
  )
}