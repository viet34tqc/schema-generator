import { commonProperties } from './commonProperties'

export default [
  {
    id: 'googleDocs',
    type: 'GoogleDocs',
    url: 'https://developers.google.com/search/docs/appearance/structured-data/practice-problems',
    show: false,
  },
  commonProperties.context,
  commonProperties.type('Quiz'),
  {
    ...commonProperties.name,
    required: true,
    tooltip: 'The title of the quiz.',
  },
  {
    id: 'about',
    label: 'About',
    tooltip: 'Nested information about the underlying concept behind the Quiz.',
    type: 'Group',
    required: true,
    fields: [
      {
        id: '@type',
        std: 'Thing',
        type: 'Hidden',
        required: true,
      },
      {
        id: 'name',
        required: true,
      },
    ],
  },
  {
    id: 'assesses',
    label: 'Assesses',
    tooltip: 'The skill(s) required to solve the question.',
  },
  {
    id: 'educationalLevel',
    label: 'Educational level',
    tooltip: 'The level of difficulty of the quiz.',
    type: 'Select',
    std: 'beginner',
    options: {
      'beginner': 'Beginner',
      'intermediate': 'Intermediate',
      'advanced': 'Advanced',
    },
  },
  {
    id: 'educationalAlignment',
    label: 'Educational alignment',
    tooltip: 'The quiz\'s alignment to an established educational framework.',
    type: 'Group',
    cloneable: true,
    cloneItemHeading: 'Alignment',
    fields: [
      {
        id: '@type',
        std: 'AlignmentObject',
        type: 'Hidden',
        required: true,
      },
      {
        id: 'alignmentType',
        label: 'Alignment type',
        tooltip: 'A category of alignment between the learning resource and the framework node for the quiz.',
        type: 'Select',
        required: true,
        std: 'educationalSubject',
        options: {
          'educationalSubject': 'Educational Subject',
          'educationalLevel': 'Educational Level',
        },
      },
      {
        id: 'educationalFramework',
        label: 'Educational framework',
        required: true,
        tooltip: 'The framework that the quiz is aligned to. For exp. "Common Core". For more information see Mark up educational standards. Multiple entries of this property is allowed.',
      },
      {
        id: 'targetName',
        label: 'Target name',
        required: true,
        tooltip: 'The name of a node of an established educational framework.',
      },
      {
        id: 'targetUrl',
        label: 'Target url',
        required: true,
        tooltip: 'The URL of the specific educational framework.',
      },
    ],
  },
  {
    id: 'hasPart',
    type: 'Group',
    label: 'Has part',
    tooltip: 'The individual questions that make up the quiz.',
    cloneable: true,
    cloneItemHeading: 'Question',
    required: true,
    fields: [
      {
        id: '@type',
        std: 'Question',
        type: 'Hidden',
        required: true,
      },
      {
        id: 'eduQuestionType',
        label: 'Question type',
        tooltip: 'The type of question, from the Occupation Data Model.',
        type: 'Select',
        options: {
          'Flashcard': 'Flashcard',
          'Multiple choice': 'Multiple choice',
          'Checkbox': 'Checkbox',
          'True or false': 'True or false',
        },
      },
      {
        ...commonProperties.name,
        required: true,
        tooltip: 'The full text of the question.',
      },
      {
        id: 'acceptedAnswer',
        label: 'Accepted answer',
        type: 'Group',
        required: true,
        fields: [
          {
            id: '@type',
            std: 'Answer',
            type: 'Hidden',
            required: true,
          },
          {
            id: 'text',
            label: 'Answer text',
            required: true,
            tooltip: 'The full text of the answer.',
          },
        ],
      },
      {
        id: 'suggestedAnswer',
        label: 'Suggested answer',
        type: 'Group',
        cloneable: true,
        cloneItemHeading: 'Answer option',
        fields: [
          {
            id: '@type',
            std: 'Answer',
            type: 'Hidden',
            required: true,
          },
          {
            id: 'text',
            label: 'Answer text',
            required: true,
            tooltip: 'The full text of the suggested answer.',
          },
        ],
      },
    ],
  },
]
