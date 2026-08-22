import SiteBackground from "@/components/site/SiteBackground";
import ForgotPasswordForm from "./forgot-password-form";

export default function ForgotPasswordPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6 relative">
      <SiteBackground />
      <div className="relative z-[1]">
        <ForgotPasswordForm />
      </div>
    </main>
  );
}
