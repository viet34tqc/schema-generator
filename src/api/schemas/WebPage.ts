import { commonProperties } from './commonProperties'

export default [
  commonProperties.context,
  {
    id: '@type',
    required: true,
    label: 'Type',
    type: 'Select',
    std: 'WebPage',
    options: {
      WebPage: 'General web page',
      AboutPage: 'About page',
      CheckoutPage: 'Checkout page',
      CollectionPage: 'Collection page',
      ContactPage: 'Contact page',
      ItemPage: 'Item page',
      MedicalWebPage: 'Medical web page',
      ProfilePage: 'Profile page',
      QAPage: 'QA page',
      RealEstateListing: 'Real estate listing',
      SearchResultsPage: 'Search results',
    },
  },
  {
    ...commonProperties.name,
    required: true,
    tooltip: 'The name of the webpage.',
  },
  {
    ...commonProperties.description,
    tooltip: 'The description of the webpage.',
  },
  {
    ...commonProperties.url,
    required: true,
  },
  {
    id: 'mainEntity',
    label: 'Main entity',
    tooltip: 'Indicates the primary entity described in some page or other CreativeWork.',
  },
]
