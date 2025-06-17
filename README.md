# scrum0.dev

**scrum0.dev** is an AI-powered productivity platform designed to centralize and automate Scrum management for modern teams. Built for Scrum Masters, it offers a single space to manage all daily stand-ups, sprint updates, and team workflows. With seamless integration of Zoom transcripts and meeting recordings, scrum0.dev automatically generates scrum entries—eliminating manual note-taking.

Powered by an intelligent AI agent, the platform understands the context of discussions and can automatically notify team members, update tickets, schedule follow-up meetings, and carry out a variety of post-scrum tasks. Whether you're managing one team or multiple, scrum0.dev ensures your agile processes are smooth, automated, and always up-to-date.

---

# Next.js Neo-Brutalism Template

A bold, unapologetic Next.js template built with neo-brutalism design principles. This production-ready template combines modern web technologies with aggressive, attention-demanding aesthetics.

## 🚀 Features

- **Next.js 14+** - Latest React framework with App Router
- **TypeScript** - Full type safety throughout the application
- **Tailwind CSS** - Utility-first CSS framework with custom neo-brutalism styles
- **shadcn/ui** - Beautiful, accessible component library
- **Supabase Ready** - Complete backend integration setup
- **Pino Logging** - Structured logging for production applications
- **ESLint & Prettier** - Code quality and formatting tools
- **Neo-Brutalism Design** - Bold, aggressive UI components and styling

## 🎨 Design Philosophy

This template embraces neo-brutalism design principles:

- **Bold Typography** - Space Grotesk font with heavy weights
- **High Contrast** - Black borders, bright colors, strong shadows
- **Geometric Shapes** - Sharp edges, no rounded corners
- **Aggressive Interactions** - Button presses with physical feedback
- **Unapologetic Aesthetics** - Design that demands attention

## 🛠️ Tech Stack

- **Framework**: Next.js 14+ with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Custom Neo-Brutalism CSS
- **Components**: shadcn/ui with custom neo-brutalist overrides
- **Database**: Supabase (configured, ready to use)
- **Logging**: Pino with pretty printing for development
- **Icons**: Lucide React
- **Fonts**: Space Grotesk from Google Fonts

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd nextjs-neobrutalism
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.local.example .env.local
```

4. Configure your Supabase credentials in `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

5. Start the development server:
```bash
npm run dev
```

## 🎯 Usage

### Neo-Brutalist Components

The template includes custom neo-brutalist components:

- `NeoButton` - Aggressive buttons with shadow effects
- `NeoCard` - Bold cards with thick borders
- `NeoInput` - Strong input fields with focus states

### Styling System

Custom CSS variables and utilities are available:

```css
/* Colors */
--neo-yellow: #FFFF00
--neo-black: #000000
--neo-white: #FFFFFF

/* Shadows */
--neo-shadow-sm: 2px 2px 0px var(--neo-black)
--neo-shadow-md: 4px 4px 0px var(--neo-black)
--neo-shadow-lg: 6px 6px 0px var(--neo-black)
```

### Utility Classes

```html
<div class="neo-border neo-shadow neo-bg-yellow">
  Bold content with neo-brutalist styling
</div>
```

## 🗄️ Database Integration

Supabase is pre-configured with helper functions:

```typescript
import { supabaseClient } from '@/lib/supabase';

// Authentication
const { data, error } = await supabaseClient.auth.signUp(email, password);

// Database operations
const { data } = await supabaseClient.from('table_name').select('*');
```

## 📝 Logging

Structured logging with Pino:

```typescript
import { logger } from '@/lib/logger';

logger.info('User action', { userId: '123', action: 'login' });
logger.error('Database error', { error: error.message });
```

## 🚀 Deployment

The template is configured for static export:

```bash
npm run build
```

Deploy to your preferred static hosting platform (Vercel, Netlify, etc.).

## 📁 Project Structure

```
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles + Neo-brutalism imports
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/
│   ├── ui/                # shadcn/ui components + Neo-brutalist overrides
│   └── theme-provider.tsx # Theme configuration
├── lib/
│   ├── supabase.ts        # Supabase client and helpers
│   ├── logger.ts          # Pino logging configuration
│   └── utils.ts           # Utility functions
├── styles/
│   └── neobrutalism.css   # Custom neo-brutalist styles
└── ...
```

## 🎨 Customization

### Colors

Modify the color palette in `styles/neobrutalism.css`:

```css
:root {
  --neo-yellow: #YOUR_COLOR;
  --neo-red: #YOUR_COLOR;
  /* Add more colors */
}
```

### Typography

The template uses Space Grotesk. To change fonts, update:

1. `app/layout.tsx` - Font import
2. `styles/neobrutalism.css` - Font family declarations
3. `tailwind.config.ts` - Font configuration

### Components

All components follow neo-brutalist principles. Customize them in:

- `components/ui/` - Individual component files
- `styles/neobrutalism.css` - Global component styles

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run linting and formatting: `npm run lint:fix && npm run format`
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- **shadcn/ui** - For the excellent component library
- **Tailwind CSS** - For the utility-first CSS framework
- **Next.js** - For the amazing React framework
- **Neo-Brutalism Movement** - For the design inspiration

---

**Built with ❤️ and absolutely zero compromise**