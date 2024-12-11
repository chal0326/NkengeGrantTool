import React from 'react';
import { FormField } from '../form/FormField';
import { TextArea } from '../form/TextArea';

export function ProjectDetails() {
  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200 pb-6">
        <h2 className="text-xl font-semibold text-gray-900">Project Details</h2>
        <p className="mt-1 text-sm text-gray-500">
          Tell us about your proposed project or program.
        </p>
      </div>

      <FormField
        name="project.name"
        label="What is the name of the project/program for which you are seeking funding?"
        placeholder="Enter project name"
      />

      <TextArea
        name="project.description"
        label="Briefly describe the project/program"
        placeholder="Provide a detailed description of your project"
      />

      <TextArea
        name="project.goals"
        label="What are the primary goals and objectives of this project?"
        placeholder="List the main goals and objectives"
      />

      <TextArea
        name="project.targetAudience"
        label="Who is the target audience or population served by this project?"
        placeholder="Describe your target audience"
      />

      <TextArea
        name="project.alignment"
        label="How will this project/program align with the goals of the grant you're applying for?"
        placeholder="Explain how your project aligns with the grant goals"
      />
    </div>
  );
}