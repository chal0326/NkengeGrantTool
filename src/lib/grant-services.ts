import supabase from './supabase';
import { uploadFiles } from './supabase-storage';
import type { GrantFormData } from '../types/grant';

export async function saveGrantApplication(data: GrantFormData) {
  const { data: organization, error: orgError } = await supabase
    .from('organizations')
    .upsert({
      name: data.organizationName,
      ein: data.ein,
      has_nonprofit_status: data.hasNonProfitStatus,
      mission_statement: data.missionStatement,
      organization_history: data.organizationHistory,
      annual_operating_budget: data.financial.annualBudget,
    })
    .select()
    .single();

  if (orgError) throw new Error(`Error saving organization: ${orgError.message}`);

  // Upload files if provided
  const fileUploads = [];
  if (data.irsLetter?.length) {
    fileUploads.push(
      uploadFiles('documents', `${organization.id}/irs-letter`, data.irsLetter)
    );
  }
  if (data.workSamples?.length) {
    fileUploads.push(
      uploadFiles('documents', `${organization.id}/work-samples`, data.workSamples)
    );
  }
  if (data.supportLetters?.length) {
    fileUploads.push(
      uploadFiles('documents', `${organization.id}/support-letters`, data.supportLetters)
    );
  }

  await Promise.all(fileUploads);

  // Save contacts
  const { error: contactError } = await supabase.from('contacts').upsert([
    {
      organization_id: organization.id,
      name: data.contact.name,
      title: data.contact.title,
      email: data.contact.email,
      phone: data.contact.phone,
      is_primary: true,
    },
    {
      organization_id: organization.id,
      name: data.alternateContact.name,
      title: data.alternateContact.title,
      email: data.alternateContact.email,
      phone: data.alternateContact.phone,
      is_primary: false,
    },
  ]);

  if (contactError) throw new Error(`Error saving contacts: ${contactError.message}`);

  // Save grant application
  const { data: application, error: appError } = await supabase
    .from('grant_applications')
    .upsert({
      organization_id: organization.id,
      project_name: data.project.name,
      project_description: data.project.description,
      target_audience: data.project.targetAudience,
      start_date: data.project.timeline.startDate,
      end_date: data.project.timeline.endDate,
      requested_amount: data.financial.requestedAmount,
      total_project_budget: data.financial.projectBudget,
      is_fully_funded: data.financial.isFullyFunded,
    })
    .select()
    .single();

  if (appError) throw new Error(`Error saving grant application: ${appError.message}`);

  // Save project goals
  const { error: goalsError } = await supabase.from('project_goals').upsert(
    data.project.goals.map((goal) => ({
      grant_application_id: application.id,
      description: goal,
    }))
  );

  if (goalsError) throw new Error(`Error saving project goals: ${goalsError.message}`);

  // Save project milestones
  const { error: milestonesError } = await supabase.from('project_milestones').upsert(
    data.project.timeline.milestones.map((milestone) => ({
      grant_application_id: application.id,
      description: milestone.description,
      target_date: milestone.date,
      status: 'pending',
    }))
  );

  if (milestonesError)
    throw new Error(`Error saving project milestones: ${milestonesError.message}`);

  // Save funding sources
  const { error: fundingError } = await supabase.from('funding_sources').upsert(
    data.financial.otherFunding.map((source) => ({
      grant_application_id: application.id,
      source_name: source.source,
      amount: source.amount,
      status: source.status,
    }))
  );

  if (fundingError)
    throw new Error(`Error saving funding sources: ${fundingError.message}`);

  return { organization, application };
}