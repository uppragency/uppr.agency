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
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          domain: string;
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
