import { commonProperties } from './commonProperties';

export default [
  {
    id: 'schemaDocs',
    type: 'SchemaDocs',
    url: 'https://schema.org/Organization',
    show: true,
  },
  commonProperties.context,
  commonProperties.type('Organization'),
  commonProperties.id,
  {
    ...commonProperties.name,
    required: true,
    tooltip: 'The name of the organization.',
  },
  {
    ...commonProperties.description,
    tooltip: 'A description of the organization.',
  },
  {
    ...commonProperties.url,
    tooltip: 'URL of the organization.',
  },
  {
    id: 'logo',
    label: 'Logo',
    type: 'Image',
    std: '{{ site.logo }}',
    tooltip: 'An associated logo.',
  },
  {
    id: 'contactPoint',
    label: 'Contact point',
    type: 'Group',
    cloneable: true,
    tooltip: 'A contact point for a person or organization.',
    fields: [
      {
        id: '@type',
        std: 'ContactPoint',
        type: 'Hidden',
        required: true,
      },
      {
        id: 'telephone',
        label: 'Telephone',
        tooltip: 'The telephone number.',
      },
      {
        id: 'contactType',
        label: 'Contact type',
        tooltip: 'A person or organization can have different contact points, for different purposes.',
      },
      {
        id: 'email',
        label: 'Email',
        tooltip: 'Email address.',
      },
    ],
  },
  {
    id: 'address',
    label: 'Address',
    type: 'Group',
    tooltip: 'Physical address of the organization.',
    fields: [
      {
        id: '@type',
        std: 'PostalAddress',
        type: 'Hidden',
        required: true,
      },
      {
        id: 'streetAddress',
        label: 'Street address',
      },
      {
        id: 'addressLocality',
        label: 'City',
      },
      {
        id: 'addressRegion',
        label: 'State/Region',
      },
      {
        id: 'postalCode',
        label: 'Postal code',
      },
      {
        id: 'addressCountry',
        label: 'Country',
      },
    ],
  },
  {
    id: 'sameAs',
    label: 'Same as',
    cloneable: true,
    tooltip: 'URL of a reference Web page that unambiguously indicates the item\'s identity.',
  },
  {
    id: 'foundingDate',
    label: 'Founding date',
    type: 'Date',
    tooltip: 'The date that this organization was founded.',
  },
  {
    id: 'founder',
    label: 'Founder',
    type: 'Group',
    cloneable: true,
    tooltip: 'A person who founded this organization.',
    fields: [
      {
        id: '@type',
        std: 'Person',
        type: 'Hidden',
        required: true,
      },
      {
        id: 'name',
        label: 'Name',
        required: true,
      },
    ],
  },
  {
    id: 'employee',
    label: 'Employees',
    type: 'Group',
    cloneable: true,
    tooltip: 'Someone working for this organization.',
    fields: [
      {
        id: '@type',
        std: 'Person',
        type: 'Hidden',
        required: true,
      },
      {
        id: 'name',
        label: 'Name',
        required: true,
      },
      {
        id: 'jobTitle',
        label: 'Job title',
      },
    ],
  },
];
