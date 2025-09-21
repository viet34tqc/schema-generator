import { commonProperties } from './commonProperties'

export default [
  {
    id: 'googleDocs',
    type: 'GoogleDocs',
    url: 'https://developers.google.com/search/docs/appearance/structured-data/estimated-salary',
    show: false,
  },
  commonProperties.context,
  commonProperties.type('Occupation'),
  {
    ...commonProperties.name,
    required: true,
    tooltip: 'The title of the occupation. Don\'t include job codes, addresses, dates, salaries, or company names and special characters.',
  },
  {
    ...commonProperties.description,
    show: true,
    tooltip: 'The description of the occupation. Must be a complete representation of the job, including job responsibilities, qualifications, skills, working hours, education requirements, and experience requirements.',
  },
  {
    id: 'estimatedSalary',
    label: 'Estimated salary',
    type: 'Group',
    cloneable: true,
    required: true,
    cloneItemHeading: 'Salary',
    fields: [
      {
        id: '@type',
        std: 'MonetaryAmountDistribution',
        type: 'Hidden',
        required: true,
      },
      {
        ...commonProperties.name,
        required: true,
        std: 'base',
        tooltip: 'The type of value. You must specify the base salary. Other types of compensation are optional for exp. "base", "bonus", "commission".',
      },
      {
        id: 'currency',
        show: true,
        label: 'Currency',
        tooltip: 'The ISO 4217 3-letter currency code.',
      },
      {
        id: 'duration',
        label: 'Duration',
        required: true,
        std: 'P1Y',
        tooltip: 'The period of time that it takes to earn the estimated salary in ISO 8601 date format. For example, if the estimated salary is earned over the course of one year, use P1Y for duration.',
        type: 'Date',
      },
      {
        id: 'maxValue',
        show: true,
        label: 'Max value',
      },
      {
        id: 'minValue',
        show: true,
        label: 'Min value',
      },
      {
        id: 'median',
        label: 'Median',
        tooltip: 'The median (or "middle") value.',
      },
      {
        id: 'percentile10',
        label: 'Percentile 10',
        tooltip: 'The 10th percentile value.',
      },
      {
        id: 'percentile25',
        label: 'Percentile 25',
        tooltip: 'The 25th percentile value.',
      },
      {
        id: 'percentile75',
        label: 'Percentile 75',
        tooltip: 'The 75th percentile value.',
      },
      {
        id: 'percentile90',
        label: 'Percentile 90',
        tooltip: 'The 90th percentile value.',
      },
    ],
  },
  {
    id: 'hiringOrganization',
    label: 'Hiring organization',
    tooltip: 'The organization offering a position of this occupation.',
    required: true,
    std: '{{ schemas.organization }}',
  },
  {
    id: 'industry',
    label: 'Industry',
    tooltip: 'The industry that\'s associated with the job position.',
  },
  {
    id: 'occupationLocation',
    label: 'Occupation location',
    type: 'Group',
    tooltip: 'A city or other location where this occupation is available.',
    fields: [
      {
        id: '@type',
        std: 'City',
        type: 'Hidden',
        required: true,
      },
      {
        ...commonProperties.name,
        tooltip: 'The name of the city.',
      },
    ],
  },
  {
    id: 'qualifications',
    label: 'Qualifications',
    tooltip: 'Specific qualifications required for this role or Occupation.',
  },
  {
    id: 'responsibilities',
    label: 'Responsibilities',
    tooltip: 'Responsibilities associated with this role or Occupation.',
  },
  {
    id: 'skills',
    label: 'Skills',
    tooltip: 'A statement of knowledge, skill, ability, task or any other assertion expressing a competency that is desired or required to fulfill this role or to work in this occupation.',
  },
]
