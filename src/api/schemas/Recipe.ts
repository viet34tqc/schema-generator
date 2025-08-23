import { commonProperties } from './commonProperties'

export default [
  {
    id: 'googleDocs',
    type: 'GoogleDocs',
    url: 'https://developers.google.com/search/docs/advanced/structured-data/recipe',
    show: false,
  },
  commonProperties.context,
  commonProperties.type('Recipe'),
  {
    ...commonProperties.name,
    required: true,
    tooltip: 'The name of the recipe.',
  },
  {
    ...commonProperties.description,
    required: true,
    tooltip: 'A short summary describing the recipe.',
  },
  {
    ...commonProperties.image,
    required: true,
    tooltip: 'Image of the completed recipe.',
  },
  {
    ...commonProperties.author,
    required: true,
    tooltip: 'The author of the recipe.',
  },
  {
    id: 'recipeIngredient',
    label: 'Recipe ingredients',
    type: 'Textarea',
    required: true,
    cloneable: true,
    tooltip: 'A list of ingredients used in the recipe, including the quantity of each.',
  },
  {
    id: 'recipeInstructions',
    label: 'Recipe instructions',
    type: 'Group',
    required: true,
    cloneable: true,
    tooltip: 'A list of steps to make the recipe.',
    fields: [
      {
        id: '@type',
        std: 'HowToStep',
        type: 'Hidden',
        required: true,
      },
      {
        id: 'text',
        label: 'Instruction',
        type: 'Textarea',
        required: true,
      },
    ],
  },
  {
    id: 'cookTime',
    label: 'Cook time',
    tooltip: 'The time it takes to actually cook the dish, in ISO 8601 duration format.',
  },
  {
    id: 'prepTime',
    label: 'Prep time',
    tooltip: 'The length of time it takes to prepare the recipe, in ISO 8601 duration format.',
  },
  {
    id: 'totalTime',
    label: 'Total time',
    tooltip:
      'The total time required to perform instructions or a direction, in ISO 8601 duration format.',
  },
  {
    id: 'recipeYield',
    label: 'Recipe yield',
    tooltip:
      'The quantity produced by the recipe (for example, number of people served, number of servings, etc).',
  },
  {
    id: 'recipeCategory',
    label: 'Recipe category',
    tooltip: 'The category of the recipe—for example, appetizer, entree, etc.',
  },
  {
    id: 'recipeCuisine',
    label: 'Recipe cuisine',
    tooltip: 'The cuisine of the recipe (for example, French or Ethiopian).',
  },
  {
    id: 'keywords',
    label: 'Keywords',
    tooltip: 'Keywords or tags used to describe this recipe.',
  },
  {
    id: 'nutrition',
    label: 'Nutrition',
    type: 'Group',
    tooltip: 'Nutrition information about the recipe.',
    fields: [
      {
        id: '@type',
        std: 'NutritionInformation',
        type: 'Hidden',
        required: true,
      },
      {
        id: 'calories',
        label: 'Calories',
        tooltip: 'The number of calories.',
      },
    ],
  },
]
