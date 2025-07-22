export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="animate-pulse">
        <div className="h-8 bg-muted rounded w-64 mb-2"></div>
        <div className="h-4 bg-muted rounded w-96 mb-8"></div>
        
        <div className="bg-card p-6 rounded-lg border">
          <div className="h-4 bg-muted rounded w-full"></div>
        </div>
      </div>
    </div>
  );
}