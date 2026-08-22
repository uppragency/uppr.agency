import SiteBackground from "@/components/site/SiteBackground";
import ResetPasswordForm from "./reset-password-form";

export default function ResetPasswordPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6 relative">
      <SiteBackground />
      <div className="relative z-[1]">
        <ResetPasswordForm />
      </div>
    </main>
  );
}
