# React Schema Generator

A standalone React application for generating Schema.org structured data, converted from the WordPress Slim SEO Schema plugin.

## Features

- **Visual Schema Builder**: Create schemas with a few clicks by selecting schema types and properties
- **30+ Schema Types**: Comprehensive list of schemas supported by Google (Article, Product, Organization, WebSite, etc.)
- **Dynamic Data Variables**: Connect schema properties to dynamic variables like post title, site name, etc.
- **Custom Properties**: Add custom properties to extend schemas beyond the default set
- **Import/Export**: Backup and restore your schema configurations
- **Modern UI**: Built with React 18, Tailwind CSS, and Radix UI components
- **Local Storage**: All data is stored locally in your browser
- **Theme Support**: Light, dark, and system theme modes

## Quick Start

### Prerequisites

- Node.js 18+
- pnpm

### Installation

1. Clone or download this project
2. Navigate to the `react-schema-generator` directory
3. Install dependencies:

```bash
pnpm install
```

### Development

Start the development server:

```bash
pnpm dev
```

The application will open at `http://localhost:3000`

### Building for Production

Build the application:

```bash
pnpm build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
pnpm preview
```

## Usage

### Creating a Schema

1. Click the "Add Schema" button
2. Select a schema type from the dropdown (e.g., Article, Product, Organization)
3. Fill in the schema properties in the Properties tab
4. Configure location rules in the Location tab (coming soon)
5. Click "Save Changes" to save your schema

### Schema Properties

Each schema type comes with predefined properties based on Google's structured data guidelines:

- **Required fields** are marked with a red asterisk (\*)
- **Tooltips** provide additional information about each property
- **Validation** ensures all required fields are filled before saving

### Import/Export

- **Export**: Download all your schemas as a JSON file for backup
- **Import**: Upload a JSON file to restore schemas from another installation

## Architecture

### Technology Stack

- **React 18** - UI framework
- **Vite 7** - Build tool and dev server
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Unstyled, accessible UI components
- **Zustand** - State management with persist middleware
- **Immer** - Immutable state updates via Zustand middleware
- **Lucide React** - Icon library

### Project Structure

```
src/
├── api/                 # Mock API and data
│   ├── mockData.ts     # Static data and schema types
│   └── schemas/        # Schema field definitions
├── components/         # React components
│   ├── Fields/         # Field type components
│   ├── Schema.tsx      # Individual schema component
│   ├── Schemas.tsx     # Schema list component
│   └── ...
├── constants/          # Application constants
├── hooks/              # Custom React hooks
├── stores/             # Zustand state management
│   ├── schemaStore.ts  # Schema state and actions
│   └── themeStore.ts   # Theme state and actions
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
├── styles/             # CSS files
└── App.tsx             # Main app component
```

### Data Storage

All data is stored in the browser's localStorage:

- **Schemas**: `schema-generator-store` (includes schemas and schema links)
- **Theme**: `schema-generator-theme` (user's theme preference)

## Supported Schema Types

### E-commerce

- Book
- Product
- Review
- SoftwareApplication

### Organizations

- HowTo
- LocalBusiness
- Organization

### Content

- Article (and subtypes)
- BlogPosting
- NewsArticle
- Recipe
- VideoObject
- ImageObject
- AudioObject
- Event
- Course
- JobPosting
- QAPage

### Basic

- WebSite
- WebPage
- SearchAction
- BreadcrumbList
- Thing
- Person
- Service
- Offer
- CustomJsonLd

## Development

### Adding New Schema Types

1. Add the schema type to `src/constants/index.ts` in the `schemaTypes` array
2. Define the schema fields in `src/api/schemas/` directory
3. Export the schema from `src/api/schemas/index.ts`
4. The schema will automatically appear in the dropdown

### Adding New Field Types

1. Create a new component in `src/components/Fields/`
2. Export it from the field components
3. The field type will be automatically available
