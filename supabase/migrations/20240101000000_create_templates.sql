-- Drop existing templates table if it exists
DROP TABLE IF EXISTS templates;

-- Create new templates table with updated schema
CREATE TABLE templates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('organization_info', 'project_details', 'financial_info', 'impact_info')),
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create index on category for faster lookups
CREATE INDEX templates_category_idx ON templates(category);

-- Create trigger to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc', NOW());
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_templates_updated_at
  BEFORE UPDATE ON templates
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column(); 