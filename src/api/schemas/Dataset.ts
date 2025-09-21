import { commonProperties } from './commonProperties'

export default [
  {
    id: 'googleDocs',
    type: 'GoogleDocs',
    url: 'https://developers.google.com/search/docs/appearance/structured-data/dataset',
    show: false,
  },
  commonProperties.context,
  commonProperties.type('Dataset'),
  {
    ...commonProperties.name,
    required: true,
    tooltip: 'The name of the dataset',
  },
  {
    id: 'alternateName',
    label: 'Alternate Name',
    tooltip: 'Alternative names that have been used to refer to this dataset, such as aliases or abbreviations.',
  },
  {
    ...commonProperties.description,
    required: true,
    tooltip: 'A short summary describing a dataset. Must be between 50 and 5000 characters long.',
  },
  {
    id: 'creator',
    label: 'Creator',
    type: 'Group',
    tooltip: 'The creator or author of this dataset.',
    fields: [
      {
        id: '@type',
        std: 'Person',
        type: 'Hidden',
        required: true,
      },
      {
        ...commonProperties.name,
        tooltip: 'The name of the creator.',
      },
      {
        ...commonProperties.url,
        tooltip: 'The URL of the creator.',
      },
    ],
  },
  {
    id: 'citation',
    label: 'Citation',
    tooltip: 'Identifies academic articles that are recommended by the data provider be cited in addition to the dataset itself.',
  },
  {
    id: 'distribution',
    label: 'Distribution',
    tooltip: 'The description of the location for download of the dataset and the file format for download.',
    type: 'Group',
    cloneable: true,
    fields: [
      {
        id: '@type',
        std: 'DataDownload',
        type: 'Hidden',
        required: true,
      },
      {
        id: 'encodingFormat',
        label: 'Encoding format',
        tooltip: 'The file format of the distribution.',
        required: true,
      },
      {
        id: 'contentUrl',
        label: 'Content URL',
        tooltip: 'The URL for accessing the dataset.',
        required: true,
      },
    ],
  },
  {
    id: 'identifier',
    label: 'Identifier',
    tooltip: 'An identifier, such as a DOI or a Compact Identifier.',
  },
  {
    id: 'keywords',
    label: 'Keywords',
    tooltip: 'Keywords summarizing the dataset.',
  },
  {
    id: 'license',
    label: 'License',
    tooltip: 'A license under which the dataset is distributed.',
  },
  {
    id: 'sameAs',
    label: 'Same as',
    tooltip: 'Link to a page that provides more information about the same dataset.',
  },
  {
    id: 'spatialCoverage',
    label: 'Spatial coverage',
    tooltip: 'You can provide a single point that describes the spatial aspect of the dataset.',
  },
  {
    id: 'temporalCoverage',
    label: 'Temporal coverage',
    tooltip: 'The data in the dataset covers a specific time interval.',
  },
  {
    id: 'variableMeasured',
    label: 'Variable measured',
    tooltip: 'What does the dataset measure? (for example, temperature, pressure)',
  },
  {
    id: 'version',
    label: 'Version',
    tooltip: 'The version number for the dataset.',
  },
]
