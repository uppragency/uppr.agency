import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import SiteBackground from "@/components/site/SiteBackground";
import LoginForm from "./login-form";

export default async function LoginPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();
    redirect(profile?.role === "admin" ? "/admin" : "/dashboard");
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-6 relative">
      <SiteBackground />
      <div className="relative z-[1]">
        <LoginForm />
      </div>
    </main>
  );
}
