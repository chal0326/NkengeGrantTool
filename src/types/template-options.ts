export interface TemplateOption {
  id: string;
  label: string;
  value: string;
  category: 'demographics' | 'art_forms' | 'program_types' | 'budget_categories';
  created_at: string;
  updated_at: string;
}

export interface TemplateSelectedOption {
  id: string;
  template_id: string;
  option_id: string;
  field_name: string;
  created_at: string;
}

export type TemplateOptionCategory = TemplateOption['category'];

export interface TemplateOptionField {
  fieldName: string;
  label: string;
  category: TemplateOptionCategory;
  multiple?: boolean;
} 