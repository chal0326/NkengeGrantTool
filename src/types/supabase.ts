export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      contacts: {
        Row: {
          created_at: string | null
          email: string
          id: string
          is_primary: boolean
          name: string
          organization_id: string
          phone: string
          title: string
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          is_primary?: boolean
          name: string
          organization_id: string
          phone: string
          title: string
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          is_primary?: boolean
          name?: string
          organization_id?: string
          phone?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "contacts_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      focus_areas: {
        Row: {
          created_at: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      funding_sources: {
        Row: {
          amount: number
          created_at: string | null
          grant_application_id: string
          id: string
          source_name: string
          status: string
        }
        Insert: {
          amount: number
          created_at?: string | null
          grant_application_id: string
          id?: string
          source_name: string
          status: string
        }
        Update: {
          amount?: number
          created_at?: string | null
          grant_application_id?: string
          id?: string
          source_name?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "funding_sources_grant_application_id_fkey"
            columns: ["grant_application_id"]
            isOneToOne: false
            referencedRelation: "grant_applications"
            referencedColumns: ["id"]
          },
        ]
      }
      grant_applications: {
        Row: {
          created_at: string | null
          end_date: string
          id: string
          is_fully_funded: boolean
          organization_id: string
          project_description: string
          project_name: string
          requested_amount: number
          start_date: string
          status: string
          target_audience: string
          total_project_budget: number
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          end_date: string
          id?: string
          is_fully_funded?: boolean
          organization_id: string
          project_description: string
          project_name: string
          requested_amount: number
          start_date: string
          status?: string
          target_audience: string
          total_project_budget: number
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          end_date?: string
          id?: string
          is_fully_funded?: boolean
          organization_id?: string
          project_description?: string
          project_name?: string
          requested_amount?: number
          start_date?: string
          status?: string
          target_audience?: string
          total_project_budget?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "grant_applications_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      grants: {
        Row: {
          amount: number
          created_at: string
          deadline: string
          description: string
          id: string
          name: string
          notes: string | null
          organization: string
          requirements: string | null
          status: Database["public"]["Enums"]["grant_status"]
          updated_at: string
        }
        Insert: {
          amount: number
          created_at?: string
          deadline: string
          description: string
          id?: string
          name: string
          notes?: string | null
          organization: string
          requirements?: string | null
          status?: Database["public"]["Enums"]["grant_status"]
          updated_at?: string
        }
        Update: {
          amount?: number
          created_at?: string
          deadline?: string
          description?: string
          id?: string
          name?: string
          notes?: string | null
          organization?: string
          requirements?: string | null
          status?: Database["public"]["Enums"]["grant_status"]
          updated_at?: string
        }
        Relationships: []
      }
      organization_focus_areas: {
        Row: {
          focus_area_id: string
          organization_id: string
        }
        Insert: {
          focus_area_id: string
          organization_id: string
        }
        Update: {
          focus_area_id?: string
          organization_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "organization_focus_areas_focus_area_id_fkey"
            columns: ["focus_area_id"]
            isOneToOne: false
            referencedRelation: "focus_areas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "organization_focus_areas_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      organization_users: {
        Row: {
          created_at: string | null
          id: string
          organization_id: string | null
          role: Database["public"]["Enums"]["user_role"]
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          organization_id?: string | null
          role: Database["public"]["Enums"]["user_role"]
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          organization_id?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "organization_users_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      organizations: {
        Row: {
          annual_operating_budget: number
          created_at: string | null
          ein: string
          has_nonprofit_status: boolean
          id: string
          mission_statement: string
          name: string
          organization_history: string
          updated_at: string | null
        }
        Insert: {
          annual_operating_budget: number
          created_at?: string | null
          ein: string
          has_nonprofit_status?: boolean
          id?: string
          mission_statement: string
          name: string
          organization_history: string
          updated_at?: string | null
        }
        Update: {
          annual_operating_budget?: number
          created_at?: string | null
          ein?: string
          has_nonprofit_status?: boolean
          id?: string
          mission_statement?: string
          name?: string
          organization_history?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      project_goals: {
        Row: {
          created_at: string | null
          description: string
          grant_application_id: string
          id: string
        }
        Insert: {
          created_at?: string | null
          description: string
          grant_application_id: string
          id?: string
        }
        Update: {
          created_at?: string | null
          description?: string
          grant_application_id?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_goals_grant_application_id_fkey"
            columns: ["grant_application_id"]
            isOneToOne: false
            referencedRelation: "grant_applications"
            referencedColumns: ["id"]
          },
        ]
      }
      project_milestones: {
        Row: {
          created_at: string | null
          description: string
          grant_application_id: string
          id: string
          status: string
          target_date: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description: string
          grant_application_id: string
          id?: string
          status?: string
          target_date: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string
          grant_application_id?: string
          id?: string
          status?: string
          target_date?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "project_milestones_grant_application_id_fkey"
            columns: ["grant_application_id"]
            isOneToOne: false
            referencedRelation: "grant_applications"
            referencedColumns: ["id"]
          },
        ]
      }
      supporting_documents: {
        Row: {
          document_type: string
          file_name: string
          file_path: string
          file_size: number
          grant_application_id: string
          id: string
          mime_type: string
          uploaded_at: string | null
        }
        Insert: {
          document_type: string
          file_name: string
          file_path: string
          file_size: number
          grant_application_id: string
          id?: string
          mime_type: string
          uploaded_at?: string | null
        }
        Update: {
          document_type?: string
          file_name?: string
          file_path?: string
          file_size?: number
          grant_application_id?: string
          id?: string
          mime_type?: string
          uploaded_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "supporting_documents_grant_application_id_fkey"
            columns: ["grant_application_id"]
            isOneToOne: false
            referencedRelation: "grant_applications"
            referencedColumns: ["id"]
          },
        ]
      }
      templates: {
        Row: {
          category: string
          content: string
          created_at: string | null
          id: string
          name: string
          updated_at: string | null
        }
        Insert: {
          category: string
          content: string
          created_at?: string | null
          id?: string
          name: string
          updated_at?: string | null
        }
        Update: {
          category?: string
          content?: string
          created_at?: string | null
          id?: string
          name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      application_status: "draft" | "review" | "final"
      grant_status:
        | "identified"
        | "in_progress"
        | "submitted"
        | "approved"
        | "rejected"
      organization_type: "foundation" | "charity" | "business"
      template_category:
        | "mission_statement"
        | "project_description"
        | "budget"
        | "impact"
        | "other"
      user_role: "owner" | "admin" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
