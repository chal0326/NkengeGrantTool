import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGrants } from '../hooks/useGrants';
import { GrantApplicationForm } from '../components/grant-form/GrantApplicationForm';
import { saveGrantApplication } from '../lib/grant-services';
import type { GrantFormData } from '../types/grant';
import supabase from '../lib/supabase';

interface Contact {
  name: string;
  title: string;
  email: string;
  phone: string;
  is_primary: boolean;
}

interface Organization {
  name: string;
  has_nonprofit_status: boolean;
  ein: string;
  mission_statement: string;
  organization_history: string;
  annual_operating_budget: number;
  contacts: Contact[];
}

interface Application {
  organization: Organization;
  project_name: string;
  project_description: string;
  target_audience: string;
  start_date: string;
  end_date: string;
  total_project_budget: number;
  requested_amount: number;
  is_fully_funded: boolean;
}

export default function EditApplication() {
  const { grantId } = useParams<{ grantId: string }>();
  const { grants, loading: grantsLoading } = useGrants();
  const [initialData, setInitialData] = useState<Partial<GrantFormData> | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadApplication = async () => {
      if (!grantId) return;

      try {
        // Load existing application data if it exists
        const { data: application } = await supabase
          .from('grant_applications')
          .select(`
            *,
            organization:organizations(
              *,
              contacts(*)
            )
          `)
          .eq('grant_id', grantId)
          .single();

        if (application) {
          const org = application.organization as Organization;
          const contacts = org.contacts;
          const primaryContact = contacts.find((c: Contact) => c.is_primary);
          const alternateContact = contacts.find((c: Contact) => !c.is_primary);

          setInitialData({
            organizationName: org.name,
            hasNonProfitStatus: org.has_nonprofit_status,
            ein: org.ein,
            missionStatement: org.mission_statement,
            organizationHistory: org.organization_history,
            contact: primaryContact ? {
              name: primaryContact.name,
              title: primaryContact.title,
              email: primaryContact.email,
              phone: primaryContact.phone,
            } : undefined,
            alternateContact: alternateContact ? {
              name: alternateContact.name,
              title: alternateContact.title,
              email: alternateContact.email,
              phone: alternateContact.phone,
            } : undefined,
            project: {
              name: (application as Application).project_name,
              description: (application as Application).project_description,
              targetAudience: (application as Application).target_audience,
              goals: [],
              alignment: '',
              timeline: {
                startDate: (application as Application).start_date,
                endDate: (application as Application).end_date,
                milestones: [],
              },
              outcomes: '',
              measurement: '',
            },
            financial: {
              annualBudget: org.annual_operating_budget,
              projectBudget: (application as Application).total_project_budget,
              requestedAmount: (application as Application).requested_amount,
              isFullyFunded: (application as Application).is_fully_funded,
              otherFunding: [],
            },
            impact: {
              communityContribution: '',
              communityNeeds: '',
              beneficiaries: '',
              equity: '',
            },
          });
        }
      } catch (error) {
        console.error('Error loading application:', error);
      } finally {
        setLoading(false);
      }
    };

    loadApplication();
  }, [grantId]);

  if (loading || grantsLoading) return <div>Loading...</div>;

  const grant = grants.find(g => g.id === grantId);
  if (!grant) {
    navigate('/applications');
    return null;
  }

  const handleSubmit = async (data: GrantFormData) => {
    await saveGrantApplication(data);
    navigate('/applications');
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{grant.name}</h1>
          <p className="text-gray-600">{grant.organization}</p>
        </div>
      </div>

      <GrantApplicationForm
        onSubmit={handleSubmit}
        initialData={initialData ?? undefined}
      />
    </div>
  );
} 