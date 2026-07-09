export function HomePage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Welcome to IReader Next</h1>
      <p className="text-muted-foreground">
        A web-native manga/novel reader. Add sources from the Sources page to get started.
      </p>
      <div className="mt-8" id="sources-mount" />
    </div>
  )
}
