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
      addresses: {
        Row: {
          city: string
          created_at: string | null
          id: string
          organization_id: string | null
          state: string
          street: string
          updated_at: string | null
          zip_code: string
        }
        Insert: {
          city: string
          created_at?: string | null
          id?: string
          organization_id?: string | null
          state: string
          street: string
          updated_at?: string | null
          zip_code: string
        }
        Update: {
          city?: string
          created_at?: string | null
          id?: string
          organization_id?: string | null
          state?: string
          street?: string
          updated_at?: string | null
          zip_code?: string
        }
        Relationships: [
          {
            foreignKeyName: "addresses_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      art_forms: {
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
      budget_line_items: {
        Row: {
          amount: number
          category: string
          created_at: string | null
          description: string
          grant_application_id: string | null
          id: string
          updated_at: string | null
        }
        Insert: {
          amount: number
          category: string
          created_at?: string | null
          description: string
          grant_application_id?: string | null
          id?: string
          updated_at?: string | null
        }
        Update: {
          amount?: number
          category?: string
          created_at?: string | null
          description?: string
          grant_application_id?: string | null
          id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "budget_line_items_grant_application_id_fkey"
            columns: ["grant_application_id"]
            isOneToOne: false
            referencedRelation: "grant_applications"
            referencedColumns: ["id"]
          },
        ]
      }
      community_partnerships: {
        Row: {
          contribution: string
          created_at: string | null
          grant_application_id: string | null
          id: string
          partner: string
          role: string
          updated_at: string | null
        }
        Insert: {
          contribution: string
          created_at?: string | null
          grant_application_id?: string | null
          id?: string
          partner: string
          role: string
          updated_at?: string | null
        }
        Update: {
          contribution?: string
          created_at?: string | null
          grant_application_id?: string | null
          id?: string
          partner?: string
          role?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "community_partnerships_grant_application_id_fkey"
            columns: ["grant_application_id"]
            isOneToOne: false
            referencedRelation: "grant_applications"
            referencedColumns: ["id"]
          },
        ]
      }
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
      demographic_data: {
        Row: {
          categories: Json
          collection_method: string
          created_at: string | null
          frequency: string
          grant_application_id: string | null
          id: string
          updated_at: string | null
        }
        Insert: {
          categories: Json
          collection_method: string
          created_at?: string | null
          frequency: string
          grant_application_id?: string | null
          id?: string
          updated_at?: string | null
        }
        Update: {
          categories?: Json
          collection_method?: string
          created_at?: string | null
          frequency?: string
          grant_application_id?: string | null
          id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "demographic_data_grant_application_id_fkey"
            columns: ["grant_application_id"]
            isOneToOne: false
            referencedRelation: "grant_applications"
            referencedColumns: ["id"]
          },
        ]
      }
      financial_transactions: {
        Row: {
          amount: number
          category_id: string | null
          created_at: string | null
          date: string
          description: string
          grant_id: string | null
          id: string
          project_id: string | null
          type: Database["public"]["Enums"]["transaction_type"]
          updated_at: string | null
        }
        Insert: {
          amount: number
          category_id?: string | null
          created_at?: string | null
          date: string
          description: string
          grant_id?: string | null
          id?: string
          project_id?: string | null
          type: Database["public"]["Enums"]["transaction_type"]
          updated_at?: string | null
        }
        Update: {
          amount?: number
          category_id?: string | null
          created_at?: string | null
          date?: string
          description?: string
          grant_id?: string | null
          id?: string
          project_id?: string | null
          type?: Database["public"]["Enums"]["transaction_type"]
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "financial_transactions_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "transaction_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "financial_transactions_grant_id_fkey"
            columns: ["grant_id"]
            isOneToOne: false
            referencedRelation: "grants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "financial_transactions_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
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
          art_program_details: string | null
          arts_sector_impact: string | null
          created_at: string | null
          end_date: string
          id: string
          indirect_cost_basis: string | null
          indirect_cost_rate: number | null
          is_fully_funded: boolean
          matching_funds_percentage: number | null
          matching_funds_required: boolean | null
          matching_funds_secured: number | null
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
          art_program_details?: string | null
          arts_sector_impact?: string | null
          created_at?: string | null
          end_date: string
          id?: string
          indirect_cost_basis?: string | null
          indirect_cost_rate?: number | null
          is_fully_funded?: boolean
          matching_funds_percentage?: number | null
          matching_funds_required?: boolean | null
          matching_funds_secured?: number | null
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
          art_program_details?: string | null
          arts_sector_impact?: string | null
          created_at?: string | null
          end_date?: string
          id?: string
          indirect_cost_basis?: string | null
          indirect_cost_rate?: number | null
          is_fully_funded?: boolean
          matching_funds_percentage?: number | null
          matching_funds_required?: boolean | null
          matching_funds_secured?: number | null
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
      grant_section_options: {
        Row: {
          category: string
          created_at: string | null
          id: string
          label: string
          updated_at: string | null
          value: string
        }
        Insert: {
          category: string
          created_at?: string | null
          id?: string
          label: string
          updated_at?: string | null
          value: string
        }
        Update: {
          category?: string
          created_at?: string | null
          id?: string
          label?: string
          updated_at?: string | null
          value?: string
        }
        Relationships: []
      }
      grant_section_selected_options: {
        Row: {
          created_at: string | null
          field_name: string
          id: string
          option_id: string | null
          section_id: string | null
        }
        Insert: {
          created_at?: string | null
          field_name: string
          id?: string
          option_id?: string | null
          section_id?: string | null
        }
        Update: {
          created_at?: string | null
          field_name?: string
          id?: string
          option_id?: string | null
          section_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "grant_section_selected_options_option_id_fkey"
            columns: ["option_id"]
            isOneToOne: false
            referencedRelation: "grant_section_options"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "grant_section_selected_options_section_id_fkey"
            columns: ["section_id"]
            isOneToOne: false
            referencedRelation: "grant_sections"
            referencedColumns: ["id"]
          },
        ]
      }
      grant_sections: {
        Row: {
          category: string
          content: Json
          created_at: string | null
          id: string
          name: string
          section_type: Database["public"]["Enums"]["grant_section_category_old"]
          updated_at: string | null
        }
        Insert: {
          category: string
          content: Json
          created_at?: string | null
          id?: string
          name: string
          section_type?: Database["public"]["Enums"]["grant_section_category_old"]
          updated_at?: string | null
        }
        Update: {
          category?: string
          content?: Json
          created_at?: string | null
          id?: string
          name?: string
          section_type?: Database["public"]["Enums"]["grant_section_category_old"]
          updated_at?: string | null
        }
        Relationships: []
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
          bipoc_women_arts_focus: string | null
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
          bipoc_women_arts_focus?: string | null
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
          bipoc_women_arts_focus?: string | null
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
      program_art_forms: {
        Row: {
          art_form_id: string
          program_id: string
        }
        Insert: {
          art_form_id: string
          program_id: string
        }
        Update: {
          art_form_id?: string
          program_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "program_art_forms_art_form_id_fkey"
            columns: ["art_form_id"]
            isOneToOne: false
            referencedRelation: "art_forms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "program_art_forms_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "programs"
            referencedColumns: ["id"]
          },
        ]
      }
      program_types: {
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
      program_types_mapping: {
        Row: {
          program_id: string
          program_type_id: string
        }
        Insert: {
          program_id: string
          program_type_id: string
        }
        Update: {
          program_id?: string
          program_type_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "program_types_mapping_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "programs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "program_types_mapping_program_type_id_fkey"
            columns: ["program_type_id"]
            isOneToOne: false
            referencedRelation: "program_types"
            referencedColumns: ["id"]
          },
        ]
      }
      programs: {
        Row: {
          created_at: string | null
          description: string
          id: string
          impact: string
          name: string
          organization_id: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description: string
          id?: string
          impact: string
          name: string
          organization_id?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string
          id?: string
          impact?: string
          name?: string
          organization_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "programs_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      project_activities: {
        Row: {
          activity: string
          created_at: string | null
          grant_application_id: string | null
          id: string
          method: string
          responsible_party: string
          timeline: string
          updated_at: string | null
        }
        Insert: {
          activity: string
          created_at?: string | null
          grant_application_id?: string | null
          id?: string
          method: string
          responsible_party: string
          timeline: string
          updated_at?: string | null
        }
        Update: {
          activity?: string
          created_at?: string | null
          grant_application_id?: string | null
          id?: string
          method?: string
          responsible_party?: string
          timeline?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "project_activities_grant_application_id_fkey"
            columns: ["grant_application_id"]
            isOneToOne: false
            referencedRelation: "grant_applications"
            referencedColumns: ["id"]
          },
        ]
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
      project_team_assignments: {
        Row: {
          created_at: string | null
          project_id: string
          role: string
          team_member_id: string
        }
        Insert: {
          created_at?: string | null
          project_id: string
          role: string
          team_member_id: string
        }
        Update: {
          created_at?: string | null
          project_id?: string
          role?: string
          team_member_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_team_assignments_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_team_assignments_team_member_id_fkey"
            columns: ["team_member_id"]
            isOneToOne: false
            referencedRelation: "team_members"
            referencedColumns: ["id"]
          },
        ]
      }
      project_team_members: {
        Row: {
          created_at: string | null
          grant_application_id: string | null
          id: string
          name: string
          qualifications: string
          role: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          grant_application_id?: string | null
          id?: string
          name: string
          qualifications: string
          role: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          grant_application_id?: string | null
          id?: string
          name?: string
          qualifications?: string
          role?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "project_team_members_grant_application_id_fkey"
            columns: ["grant_application_id"]
            isOneToOne: false
            referencedRelation: "grant_applications"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          budget: number
          created_at: string | null
          description: string | null
          end_date: string
          grant_id: string | null
          id: string
          name: string
          start_date: string
          status: Database["public"]["Enums"]["project_status"] | null
          updated_at: string | null
        }
        Insert: {
          budget: number
          created_at?: string | null
          description?: string | null
          end_date: string
          grant_id?: string | null
          id?: string
          name: string
          start_date: string
          status?: Database["public"]["Enums"]["project_status"] | null
          updated_at?: string | null
        }
        Update: {
          budget?: number
          created_at?: string | null
          description?: string | null
          end_date?: string
          grant_id?: string | null
          id?: string
          name?: string
          start_date?: string
          status?: Database["public"]["Enums"]["project_status"] | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "projects_grant_id_fkey"
            columns: ["grant_id"]
            isOneToOne: false
            referencedRelation: "grants"
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
      team_member_role_assignments: {
        Row: {
          created_at: string | null
          role_id: string
          team_member_id: string
        }
        Insert: {
          created_at?: string | null
          role_id: string
          team_member_id: string
        }
        Update: {
          created_at?: string | null
          role_id?: string
          team_member_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "team_member_role_assignments_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "team_member_roles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "team_member_role_assignments_team_member_id_fkey"
            columns: ["team_member_id"]
            isOneToOne: false
            referencedRelation: "team_members"
            referencedColumns: ["id"]
          },
        ]
      }
      team_member_roles: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      team_members: {
        Row: {
          bio: string | null
          created_at: string | null
          department: string | null
          email: string
          id: string
          name: string
          phone: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          bio?: string | null
          created_at?: string | null
          department?: string | null
          email: string
          id?: string
          name: string
          phone?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          bio?: string | null
          created_at?: string | null
          department?: string | null
          email?: string
          id?: string
          name?: string
          phone?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      transaction_categories: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          name: string
          type: Database["public"]["Enums"]["transaction_type"]
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
          type: Database["public"]["Enums"]["transaction_type"]
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          type?: Database["public"]["Enums"]["transaction_type"]
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
      application_status:
        | "draft"
        | "review"
        | "final"
        | "NULL"
        | "in_progress"
        | "under_review"
        | "submitted"
        | "rejected"
      grant_section_category:
        | "organization_info"
        | "project_details"
        | "financial_info"
        | "impact_info"
        | "additional_info"
      grant_section_category_old:
        | "organization_info"
        | "project_details"
        | "financial_info"
        | "impact_info"
      grant_status:
        | "identified"
        | "in_progress"
        | "submitted"
        | "approved"
        | "rejected"
        | "NULL"
        | "under_review"
      organization_type: "foundation" | "charity" | "business"
      project_status: "active" | "completed" | "on_hold"
      transaction_type: "income" | "expense"
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
