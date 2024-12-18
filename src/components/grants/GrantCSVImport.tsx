import React, { useState, useCallback } from 'react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import Papa, { ParseResult } from 'papaparse';
import type { GrantFormData, CSVMapping, GrantType } from '../../types/grant';
import { grantTypeEnum } from '../../types/grant';
import { Upload } from 'lucide-react';

interface GrantCSVImportProps {
  onImport: (grants: Partial<GrantFormData>[]) => Promise<void>;
  onCancel: () => void;
}

type CSVRow = Record<string, string>;

const extractUrl = (value: string): { url: string; text: string } | null => {
  // Handle both Excel and plain URL formats
  const hyperlinkMatch = value.match(/=HYPERLINK\("([^"]+)","([^"]+)"\)/);
  if (hyperlinkMatch) {
    return {
      url: hyperlinkMatch[1],
      text: hyperlinkMatch[2]
    };
  }
  
  // If it's just a URL, use it as both url and text
  if (value.startsWith('http')) {
    return {
      url: value,
      text: value
    };
  }
  
  return null;
};

const isValidGrantType = (value: string): value is GrantType => {
  return grantTypeEnum.includes(value.toLowerCase() as GrantType);
};

export function GrantCSVImport({ onImport, onCancel }: GrantCSVImportProps) {
  const [file, setFile] = useState<File | null>(null);
  const [headers, setHeaders] = useState<string[]>([]);
  const [mappings, setMappings] = useState<CSVMapping[]>([]);
  const [preview, setPreview] = useState<CSVRow[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Accept both .csv and .txt files (Excel often saves as .txt)
    if (!file.name.toLowerCase().match(/\.(csv|txt)$/)) {
      setError('Please upload a CSV file');
      return;
    }

    setFile(file);
    setError(null);
    
    Papa.parse(file, {
      header: true,
      preview: 3, // Preview first 3 rows
      skipEmptyLines: true, // Skip empty lines
      complete: (results: ParseResult<CSVRow>) => {
        if (results.errors.length > 0) {
          setError(`Error parsing CSV: ${results.errors[0].message}`);
          return;
        }

        if (results.data.length === 0) {
          setError('The CSV file appears to be empty');
          return;
        }

        const data = results.data;
        const headers = Object.keys(data[0]).map(h => h.trim()); // Clean headers
        setHeaders(headers);
        setPreview(data.slice(0, 3));
        
        // Create initial mappings
        const initialMappings = headers.map(header => ({
          fieldName: header,
          mappedTo: guessMapping(header),
          required: false
        }));
        setMappings(initialMappings);
      },
      error: (error: Error) => {
        setError(`Error reading file: ${error.message}`);
      }
    });
  }, []);

  const guessMapping = (header: string): keyof GrantFormData | string => {
    const normalized = header.toLowerCase().replace(/[^a-z0-9]/g, '');
    
    const mappingGuesses: Record<string, keyof GrantFormData> = {
      opportunitynumber: 'opportunity_number',
      opportunityid: 'opportunity_number',
      opportunitytitle: 'name',
      title: 'name',
      grantname: 'name',
      organization: 'organization',
      agency: 'organization',
      agencycode: 'agency_code',
      amount: 'amount',
      deadline: 'deadline',
      closedate: 'close_date',
      duedate: 'deadline',
      description: 'description',
      type: 'type',
      status: 'type', // Map status to type for backward compatibility
      opportunitystatus: 'opportunity_status',
      requirements: 'requirements',
      notes: 'notes',
      url: 'opportunity_url',
      link: 'opportunity_url',
      posteddate: 'posted_date'
    };

    return mappingGuesses[normalized] || header;
  };

  const validateGrant = (grant: Partial<GrantFormData>): boolean => {
    // At least one of these fields must be present for a valid grant
    return !!(
      grant.name ||
      grant.organization ||
      grant.opportunity_number ||
      grant.description
    );
  };

  const cleanValue = (value: string): string => {
    if (!value) return '';
    return value.trim().replace(/^"(.*)"$/, '$1'); // Remove surrounding quotes if present
  };

  const formatDate = (value: string): string | null => {
    // Try parsing the date
    const date = new Date(value);
    if (!isNaN(date.getTime())) {
      return date.toISOString().split('T')[0];
    }
    
    // Try parsing MM/DD/YYYY format
    const parts = value.split('/');
    if (parts.length === 3) {
      const [month, day, year] = parts;
      const formattedDate = new Date(
        parseInt(year),
        parseInt(month) - 1,
        parseInt(day)
      );
      if (!isNaN(formattedDate.getTime())) {
        return formattedDate.toISOString().split('T')[0];
      }
    }
    
    return null;
  };

  const handleImport = useCallback(async () => {
    if (!file) {
      setError('Please select a file to import');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: async (results: ParseResult<CSVRow>) => {
        try {
          if (results.errors.length > 0) {
            throw new Error(`Error parsing CSV: ${results.errors[0].message}`);
          }

          const data = results.data;
          if (!data.length) {
            throw new Error('The CSV file appears to be empty');
          }

          const grants = data
            .map((row) => {
              const grant: Partial<GrantFormData> = {
                type: 'identified',
                source_fields: {}
              };

              mappings.forEach(mapping => {
                let value = row[mapping.fieldName];
                if (!value || !mapping.mappedTo) return; // Skip empty values or unmapped fields

                // Handle Excel hyperlinks
                if (value.startsWith('=HYPERLINK')) {
                  const extracted = extractUrl(value);
                  if (extracted) {
                    if (mapping.mappedTo === 'opportunity_number') {
                      value = extracted.text;
                      grant.opportunity_url = extracted.url;
                    } else if (mapping.mappedTo === 'name') {
                      value = extracted.text;
                    }
                  }
                }

                value = cleanValue(value);
                if (!value) return; // Skip if value is empty after cleaning

                if (mapping.mappedTo in grant) {
                  if (mapping.mappedTo === 'amount' && value) {
                    const amount = parseFloat(value.replace(/[^0-9.-]+/g, ''));
                    if (!isNaN(amount)) {
                      grant.amount = amount;
                    }
                  } else if (mapping.mappedTo === 'type') {
                    const type = value.toLowerCase();
                    if (isValidGrantType(type)) {
                      grant.type = type;
                    }
                  } else if (mapping.mappedTo === 'posted_date' || mapping.mappedTo === 'close_date') {
                    const formattedDate = formatDate(value);
                    if (formattedDate) {
                      grant[mapping.mappedTo] = formattedDate;
                    }
                  } else {
                    (grant as any)[mapping.mappedTo] = value;
                  }
                } else if (value) {
                  grant.source_fields![mapping.fieldName] = value;
                }
              });

              return grant;
            })
            .filter(validateGrant);

          if (grants.length === 0) {
            throw new Error('No valid grants found in the CSV file. Each grant must have at least a name, organization, opportunity number, or description.');
          }

          await onImport(grants);
        } catch (error) {
          setError(error instanceof Error ? error.message : 'An error occurred while importing grants');
          console.error('Error importing grants:', error);
        } finally {
          setIsLoading(false);
        }
      },
      error: (error: Error) => {
        setError(`Error parsing CSV file: ${error.message}`);
        setIsLoading(false);
      }
    });
  }, [file, mappings, onImport]);

  const updateMapping = (index: number, mappedTo: string) => {
    const newMappings = [...mappings];
    newMappings[index] = {
      ...newMappings[index],
      mappedTo: mappedTo as keyof GrantFormData | string
    };
    setMappings(newMappings);
    setError(null);
  };

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div className="border-b border-gray-200 pb-4">
          <h2 className="text-xl font-semibold">Import Grants from CSV</h2>
          <p className="text-sm text-gray-500 mt-1">
            Upload a CSV file containing grant opportunities. Map the columns to the appropriate fields.
          </p>
        </div>

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {!file ? (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <div className="mt-4">
              <label htmlFor="file-upload" className="cursor-pointer">
                <span className="mt-2 block text-sm font-medium text-gray-900">
                  Upload a CSV file
                </span>
                <input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  className="sr-only"
                  accept=".csv,.txt"
                  onChange={handleFileUpload}
                />
              </label>
            </div>
          </div>
        ) : (
          <>
            <div className="space-y-4">
              <h3 className="font-medium">Map CSV Columns</h3>
              <div className="grid grid-cols-2 gap-4">
                {mappings.map((mapping, index) => (
                  <div key={mapping.fieldName} className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">{mapping.fieldName}</span>
                    <select
                      className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                      value={mapping.mappedTo}
                      onChange={(e) => updateMapping(index, e.target.value)}
                    >
                      <option value="">Don't import</option>
                      <option value="name">Grant Name</option>
                      <option value="organization">Organization</option>
                      <option value="amount">Amount</option>
                      <option value="deadline">Deadline</option>
                      <option value="description">Description</option>
                      <option value="requirements">Requirements</option>
                      <option value="opportunity_number">Opportunity Number</option>
                      <option value="opportunity_url">URL</option>
                      <option value="agency_code">Agency Code</option>
                      <option value="posted_date">Posted Date</option>
                      <option value="close_date">Close Date</option>
                      <option value="opportunity_status">Opportunity Status</option>
                      <option value="type">Grant Type</option>
                      <option value={mapping.fieldName}>Store as {mapping.fieldName}</option>
                    </select>
                  </div>
                ))}
              </div>
            </div>

            {preview.length > 0 && (
              <div className="space-y-4">
                <h3 className="font-medium">Preview</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        {headers.map((header) => (
                          <th
                            key={header}
                            className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {preview.map((row, i) => (
                        <tr key={i}>
                          {headers.map((header) => (
                            <td
                              key={header}
                              className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                            >
                              {row[header]}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            <div className="flex justify-end space-x-4">
              <Button variant="outline" onClick={onCancel}>
                Cancel
              </Button>
              <Button
                onClick={handleImport}
                disabled={isLoading}
              >
                {isLoading ? 'Importing...' : 'Import Grants'}
              </Button>
            </div>
          </>
        )}
      </div>
    </Card>
  );
} 