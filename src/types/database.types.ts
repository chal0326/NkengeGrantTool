export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      template_options: {
        Row: {
          id: string
          label: string
          value: string
          category: 'demographics' | 'art_forms' | 'program_types' | 'budget_categories'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          label: string
          value: string
          category: 'demographics' | 'art_forms' | 'program_types' | 'budget_categories'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          label?: string
          value?: string
          category?: 'demographics' | 'art_forms' | 'program_types' | 'budget_categories'
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      template_selected_options: {
        Row: {
          id: string
          template_id: string
          option_id: string
          field_name: string
          created_at: string
        }
        Insert: {
          id?: string
          template_id: string
          option_id: string
          field_name: string
          created_at?: string
        }
        Update: {
          id?: string
          template_id?: string
          option_id?: string
          field_name?: string
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "template_selected_options_option_id_fkey"
            columns: ["option_id"]
            referencedRelation: "template_options"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "template_selected_options_template_id_fkey"
            columns: ["template_id"]
            referencedRelation: "templates"
            referencedColumns: ["id"]
          }
        ]
      }
      templates: {
        Row: {
          id: string
          name: string
          type: string
          content: Json
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          name: string
          type: string
          content: Json
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          name?: string
          type?: string
          content?: Json
          created_at?: string | null
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
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
} 