import { useState } from 'react';
import { useGrants } from '../hooks/useGrants';
import { useTemplates } from '../hooks/useTemplates';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Plus, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

export default function Applications() {
  const { grants, loading: grantsLoading } = useGrants();
  const { templates, loading: templatesLoading } = useTemplates();
  const [selectedGrant, setSelectedGrant] = useState<string | null>(null);
  const navigate = useNavigate();

  if (grantsLoading || templatesLoading) return <div>Loading...</div>;

  const activeGrants = grants.filter(g => g.status === 'in_progress');

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Grant Applications</h1>
        <Button onClick={() => navigate('/grants')}>
          <Plus className="w-4 h-4 mr-2" />
          Start New Application
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {activeGrants.map(grant => (
          <Card key={grant.id} className="hover:shadow-lg transition-shadow">
            <div className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{grant.name}</h3>
                  <p className="text-sm text-gray-600">{grant.organization}</p>
                </div>
                <span className="px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
                  In Progress
                </span>
              </div>

              <div className="mt-4 space-y-4">
                <div className="flex items-center text-sm text-gray-600">
                  <FileText className="w-4 h-4 mr-2" />
                  {templates.length} Templates Available
                </div>
                <div className="text-sm text-gray-600">
                  Deadline: {format(new Date(grant.deadline), 'MMM d, yyyy')}
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-4">
                <Button
                  variant="outline"
                  onClick={() => setSelectedGrant(grant.id)}
                >
                  View Details
                </Button>
                <Button onClick={() => navigate(`/applications/${grant.id}/edit`)}>
                  Continue Application
                </Button>
              </div>
            </div>
          </Card>
        ))}

        {activeGrants.length === 0 && (
          <Card className="col-span-2">
            <div className="p-6 text-center">
              <h3 className="text-lg font-semibold text-gray-900">No Active Applications</h3>
              <p className="mt-2 text-gray-600">
                Start a new application by browsing available grants.
              </p>
              <Button
                className="mt-4"
                onClick={() => navigate('/grants')}
              >
                Browse Grants
              </Button>
            </div>
          </Card>
        )}
      </div>

      {selectedGrant && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-2xl">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Application Details
              </h2>
              <div className="mt-4">
                {/* Application details content */}
              </div>
              <div className="mt-6 flex justify-end">
                <Button
                  variant="outline"
                  onClick={() => setSelectedGrant(null)}
                >
                  Close
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}