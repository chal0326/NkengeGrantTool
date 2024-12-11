import React from 'react';
import { FormField } from '../form/FormField';
import { TextArea } from '../form/TextArea';

export function Timeline() {
  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200 pb-6">
        <h2 className="text-xl font-semibold text-gray-900">Project Timeline</h2>
        <p className="mt-1 text-sm text-gray-500">
          Provide details about your project's timeline and milestones.
        </p>
      </div>

      <FormField
        name="project.timeline.startDate"
        label="Project Start Date"
        type="date"
      />

      <FormField
        name="project.timeline.endDate"
        label="Project End Date"
        type="date"
      />

      <TextArea
        name="project.timeline.milestones"
        label="What are the key milestones for this project?"
        placeholder="List major milestones and their expected completion dates"
      />

      <TextArea
        name="project.outcomes"
        label="What are the expected outcomes or measurable results of this project?"
        placeholder="Describe the anticipated results and how you'll measure success"
      />

      <TextArea
        name="project.measurement"
        label="How do you measure the success of your programs?"
        placeholder="Describe your evaluation methods (e.g., surveys, attendance numbers, qualitative feedback)"
      />
    </div>
  );
}