import SiteBackground from "@/components/site/SiteBackground";
import SetPasswordForm from "./set-password-form";

export default function SetPasswordPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6 relative">
      <SiteBackground />
      <div className="relative z-[1]">
        <SetPasswordForm />
      </div>
    </main>
  );
}
