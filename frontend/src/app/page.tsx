import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-3xl font-bold">Welcome to the Home Page</h1>
      <p className="text-lg text-muted-foreground">
        This is the main landing page of the application.
      </p>
      <Button>Let's get started</Button>
    </div>
  );
}
