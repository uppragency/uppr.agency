// Tipuri generate manual din schema Supabase (public schema).
// Regenerare recomandată ulterior via: supabase gen types typescript

export type UserRole = "admin" | "client";
export type ArticleStatus = "draft" | "published";
export type ReportStatus = "draft" | "published";

export interface Database {
  __InternalSupabase: {
    PostgrestVersion: "13";
  };
  public: {
    Tables: {
      clients: {
        Row: {
          id: string;
          name: string;
          domain: string;
          onboarding_account_created: boolean;
          onboarding_first_report: boolean;
          onboarding_welcome_sent: boolean;
          setup_cost: number;
          target_margin_pct: number | null;
          archived: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          domain: string;
          onboarding_account_created?: boolean;
          onboarding_first_report?: boolean;
          onboarding_welcome_sent?: boolean;
          setup_cost?: number;
          target_margin_pct?: number | null;
          archived?: boolean;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["clients"]["Insert"]>;
        Relationships: [];
      };
      profiles: {
        Row: {
          id: string;
          role: UserRole;
          client_id: string | null;
          created_at: string;
        };
        Insert: {
          id: string;
          role?: UserRole;
          client_id?: string | null;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["profiles"]["Insert"]>;
        Relationships: [
          {
            foreignKeyName: "profiles_client_id_fkey";
            columns: ["client_id"];
            isOneToOne: false;
            referencedRelation: "clients";
            referencedColumns: ["id"];
          }
        ];
      };
      articles: {
        Row: {
          id: string;
          title: string;
          slug: string;
          content: string;
          meta_title: string | null;
          meta_description: string | null;
          og_image: string | null;
          status: ArticleStatus;
          tags: string[];
          published_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          slug: string;
          content: string;
          meta_title?: string | null;
          meta_description?: string | null;
          og_image?: string | null;
          status?: ArticleStatus;
          tags?: string[];
          published_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["articles"]["Insert"]>;
        Relationships: [];
      };
      campaign_reports: {
        Row: {
          id: string;
          client_id: string;
          month: number;
          year: number;
          ecom_sent_emails: number;
          ecom_clicks: number;
          ecom_conversion_rate: number;
          ecom_transactions: number;
          ecom_revenue: number;
          cost_themarketer: number;
          cost_invoice: number;
          recommendation_1: string | null;
          recommendation_2: string | null;
          recommendation_3: string | null;
          recommendation_4: string | null;
          status: ReportStatus;
          internal_note: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          client_id: string;
          month: number;
          year: number;
          ecom_sent_emails: number;
          ecom_clicks: number;
          ecom_conversion_rate: number;
          ecom_transactions: number;
          ecom_revenue: number;
          cost_themarketer?: number;
          cost_invoice?: number;
          recommendation_1?: string | null;
          recommendation_2?: string | null;
          recommendation_3?: string | null;
          recommendation_4?: string | null;
          status?: ReportStatus;
          internal_note?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["campaign_reports"]["Insert"]>;
        Relationships: [
          {
            foreignKeyName: "campaign_reports_client_id_fkey";
            columns: ["client_id"];
            isOneToOne: false;
            referencedRelation: "clients";
            referencedColumns: ["id"];
          }
        ];
      };
      newsletters: {
        Row: {
          id: string;
          report_id: string;
          title: string;
          sent_emails: number;
          unique_open_rate: number;
          unique_click_rate: number;
          transactions: number;
          revenue: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          report_id: string;
          title: string;
          sent_emails: number;
          unique_open_rate: number;
          unique_click_rate: number;
          transactions: number;
          revenue: number;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["newsletters"]["Insert"]>;
        Relationships: [
          {
            foreignKeyName: "newsletters_report_id_fkey";
            columns: ["report_id"];
            isOneToOne: false;
            referencedRelation: "campaign_reports";
            referencedColumns: ["id"];
          }
        ];
      };
      client_notes: {
        Row: {
          id: string;
          client_id: string;
          admin_email: string;
          note: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          client_id: string;
          admin_email: string;
          note: string;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["client_notes"]["Insert"]>;
        Relationships: [
          {
            foreignKeyName: "client_notes_client_id_fkey";
            columns: ["client_id"];
            isOneToOne: false;
            referencedRelation: "clients";
            referencedColumns: ["id"];
          }
        ];
      };
      audit_log: {
        Row: {
          id: string;
          report_id: string | null;
          admin_email: string;
          action: string;
          details: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          report_id?: string | null;
          admin_email: string;
          action: string;
          details?: string | null;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["audit_log"]["Insert"]>;
        Relationships: [
          {
            foreignKeyName: "audit_log_report_id_fkey";
            columns: ["report_id"];
            isOneToOne: false;
            referencedRelation: "campaign_reports";
            referencedColumns: ["id"];
          }
        ];
      };
      login_attempts: {
        Row: {
          id: string;
          email: string;
          success: boolean;
          attempted_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          success: boolean;
          attempted_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["login_attempts"]["Insert"]>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      user_role: UserRole;
      article_status: ArticleStatus;
      report_status: ReportStatus;
    };
    CompositeTypes: Record<string, never>;
  };
}
