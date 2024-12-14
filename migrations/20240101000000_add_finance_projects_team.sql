-- Create enum for project status
CREATE TYPE project_status AS ENUM ('active', 'completed', 'on_hold');

-- Create enum for transaction type
CREATE TYPE transaction_type AS ENUM ('income', 'expense');

-- Create transaction categories table
CREATE TABLE transaction_categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    type transaction_type NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create financial transactions table
CREATE TABLE financial_transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    date TIMESTAMP WITH TIME ZONE NOT NULL,
    description TEXT NOT NULL,
    amount DECIMAL(12,2) NOT NULL,
    type transaction_type NOT NULL,
    category_id UUID REFERENCES transaction_categories(id),
    grant_id UUID REFERENCES grants(id),
    project_id UUID,  -- Will be linked after projects table is created
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create projects table
CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    status project_status DEFAULT 'active',
    start_date TIMESTAMP WITH TIME ZONE NOT NULL,
    end_date TIMESTAMP WITH TIME ZONE NOT NULL,
    budget DECIMAL(12,2) NOT NULL,
    grant_id UUID REFERENCES grants(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Add foreign key to financial_transactions for project_id
ALTER TABLE financial_transactions 
ADD CONSTRAINT financial_transactions_project_id_fkey 
FOREIGN KEY (project_id) REFERENCES projects(id);

-- Create team members table
CREATE TABLE team_members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone VARCHAR(20),
    department VARCHAR(255),
    bio TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create team member roles table
CREATE TABLE team_member_roles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create junction table for team member roles
CREATE TABLE team_member_role_assignments (
    team_member_id UUID REFERENCES team_members(id),
    role_id UUID REFERENCES team_member_roles(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (team_member_id, role_id)
);

-- Create junction table for project team members
CREATE TABLE project_team_assignments (
    project_id UUID REFERENCES projects(id),
    team_member_id UUID REFERENCES team_members(id),
    role VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (project_id, team_member_id)
);

-- Add indexes for better query performance
CREATE INDEX idx_financial_transactions_date ON financial_transactions(date);
CREATE INDEX idx_financial_transactions_type ON financial_transactions(type);
CREATE INDEX idx_financial_transactions_category ON financial_transactions(category_id);
CREATE INDEX idx_financial_transactions_grant ON financial_transactions(grant_id);
CREATE INDEX idx_financial_transactions_project ON financial_transactions(project_id);

CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_projects_grant ON projects(grant_id);
CREATE INDEX idx_projects_dates ON projects(start_date, end_date);

CREATE INDEX idx_team_members_email ON team_members(email);
CREATE INDEX idx_team_members_department ON team_members(department);

-- Insert default transaction categories
INSERT INTO transaction_categories (name, type, description) VALUES
    ('Grant Income', 'income', 'Income received from grants'),
    ('Other Income', 'income', 'Income from other sources'),
    ('Payroll', 'expense', 'Staff and contractor payments'),
    ('Equipment', 'expense', 'Equipment and supplies'),
    ('Travel', 'expense', 'Travel and transportation expenses'),
    ('Professional Services', 'expense', 'Professional and consulting services'),
    ('Marketing', 'expense', 'Marketing and advertising expenses'),
    ('Office Expenses', 'expense', 'General office expenses'),
    ('Program Expenses', 'expense', 'Direct program-related expenses'),
    ('Administrative', 'expense', 'Administrative and overhead costs');

-- Insert default team member roles
INSERT INTO team_member_roles (name, description) VALUES
    ('Administrator', 'Has full access to manage the organization'),
    ('Project Manager', 'Manages projects and team assignments'),
    ('Finance Manager', 'Manages financial transactions and budgets'),
    ('Grant Writer', 'Writes and manages grant applications'),
    ('Program Staff', 'Works on program delivery and implementation'),
    ('Volunteer', 'Volunteer team member');

-- Add new migration for renaming template tables to grant sections
ALTER TABLE templates RENAME TO grant_sections;
ALTER TABLE template_options RENAME TO grant_section_options;
ALTER TABLE template_selected_options RENAME TO grant_section_selected_options;

-- Update foreign key references
ALTER TABLE grant_section_selected_options 
  RENAME COLUMN template_id TO section_id;

ALTER TABLE grant_section_selected_options 
  RENAME CONSTRAINT template_selected_options_template_id_fkey 
  TO grant_section_selected_options_section_id_fkey;

ALTER TABLE grant_section_selected_options 
  RENAME CONSTRAINT template_selected_options_option_id_fkey 
  TO grant_section_selected_options_option_id_fkey;

-- Update enum types
ALTER TYPE template_category RENAME TO grant_section_category;
ALTER TYPE template_category_old RENAME TO grant_section_category_old;

-- Update column names in grant_sections table
ALTER TABLE grant_sections 
  RENAME COLUMN template_type TO section_type; 