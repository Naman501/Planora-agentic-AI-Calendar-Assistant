import RedirectIfAuthenticated from "@/components/ui/auth/RedirectIfAuthenticated";
import SignInComponent from "@/components/ui/auth/sign-in";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Sparkles } from "lucide-react";

function SignInpage() {
  return (
    <main className="app-shell-bg flex min-h-svh items-center justify-center px-6 py-10">
      <Card className="w-full max-w-md border/70 bg-card/90 shadow-none ring-1 ring-border/50">
        <CardHeader className="items-center text-center">
          <div className="flex mb-2 size-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
            <Sparkles className="size-5"></Sparkles>
          </div>
          <CardTitle className="font-heading text-3xl font-semibold tracking-tighter">
            Meeting Assistant
          </CardTitle>
          <CardDescription className="p-2 text-base leading-relaxed">
            Sign in to connect Calendar and start scheduling with your agent
          </CardDescription>
          <RedirectIfAuthenticated>
            <SignInComponent />
          </RedirectIfAuthenticated>
        </CardHeader>
      </Card>
    </main>
  );
}

export default SignInpage;
