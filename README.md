# Hebrew RTL Landing Page

A production-ready, single-page Hebrew RTL landing page for financial consulting services. Features a lead capture form that stores submissions in Google Sheets with email notifications.

## Tech Stack

- **Framework**: Vite + React + TypeScript
- **Styling**: Tailwind CSS (RTL, dark mode)
- **Animations**: Framer Motion
- **Icons**: React Icons
- **Forms**: React Hook Form + Zod validation
- **Backend**: Google Apps Script (Sheets storage + email notifications)

## Features

- Full RTL (Right-to-Left) support for Hebrew
- Responsive design (mobile-first)
- Dark mode with system preference detection
- Smooth scroll navigation
- Animated sections with Framer Motion
- Lead capture form with validation
- Google Sheets integration for lead storage
- Email notifications for new leads

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

Copy the example environment file:

```bash
cp .env.example .env
```

Update `.env` with your Google Apps Script Web App URL (see [Apps Script Setup](#apps-script-setup)).

### 3. Start Development Server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |

## Project Structure

```
client/
├── index.html              # Entry HTML (RTL + Hebrew lang)
├── package.json            # Dependencies
├── vite.config.ts          # Vite configuration
├── tailwind.config.ts      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
├── .env.example            # Environment variables template
│
├── apps-script/            # Google Apps Script backend
│   ├── Code.gs             # Main script file
│   └── README.md           # Setup instructions
│
├── public/                 # Static assets
│
└── src/
    ├── main.tsx            # React entry point
    ├── App.tsx             # Main app component
    ├── index.css           # Global styles + Tailwind
    │
    ├── components/
    │   ├── Navbar.tsx      # Sticky navigation
    │   ├── ThemeToggle.tsx # Dark mode toggle
    │   ├── Section.tsx     # Animated section wrapper
    │   ├── LeadForm.tsx    # Contact form
    │   ├── Hero.tsx        # Hero section
    │   ├── Trust.tsx       # Credentials strip
    │   ├── About.tsx       # About section
    │   ├── WhyUs.tsx       # Why choose us
    │   ├── Services.tsx    # Services cards
    │   ├── Process.tsx     # How it works
    │   ├── Testimonials.tsx # Client testimonials
    │   ├── Result.tsx      # Personal message
    │   ├── Contact.tsx     # Contact section
    │   ├── Footer.tsx      # Footer
    │   └── ui/             # UI components
    │       ├── Button.tsx
    │       ├── Input.tsx
    │       ├── Textarea.tsx
    │       └── Card.tsx
    │
    └── lib/
        ├── cn.ts           # Class name utility
        ├── phone.ts        # Phone validation
        ├── validation.ts   # Zod schemas
        └── api.ts          # API client
```

## Apps Script Setup

The lead form submits to a Google Apps Script Web App. Follow these steps to set it up:

### 1. Create Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Copy the Spreadsheet ID from the URL

### 2. Create Apps Script

1. In your sheet, go to **Extensions > Apps Script**
2. Delete existing code and paste contents of `apps-script/Code.gs`
3. Update the configuration constants:
   ```javascript
   const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID';
   const NOTIFY_EMAIL = 'your-email@example.com';
   ```

### 3. Deploy

1. Click **Deploy > New deployment**
2. Select **Web app**
3. Set:
   - Execute as: **Me**
   - Who has access: **Anyone**
4. Click **Deploy** and copy the URL

### 4. Configure Frontend

Add the URL to your `.env` file:

```env
VITE_GAS_WEBAPP_URL=https://script.google.com/macros/s/YOUR_ID/exec
```

For detailed instructions, see `apps-script/README.md`.

## Customization

### Brand Colors

The project uses a neutral color palette by default. To add brand colors:

1. Open `tailwind.config.ts`
2. Find the `colors` section with TODO comments
3. Replace the `primary` colors with your brand colors

### Logo and Images

Look for TODO comments in the code for:
- Logo placeholder in `Navbar.tsx` and `Hero.tsx`
- Photo placeholder in `About.tsx`
- Signature placeholder in `Result.tsx`

### Content

All Hebrew copy is embedded in the components. To modify:
- Hero slogan/vision: `Hero.tsx`
- About bio: `About.tsx`
- Services: `Services.tsx`
- Process steps: `Process.tsx`
- Testimonials: `Testimonials.tsx`

## Phone Validation

The form accepts Israeli mobile numbers in various formats:

- `+972547565895`
- `972547565895`
- `0547565895`
- `054-756-5895`
- `054 756 5895`

All numbers are normalized to `05XXXXXXXX` format before storage.

## Dark Mode

Dark mode is enabled by default with:
- System preference detection
- Manual toggle in navigation
- Preference stored in localStorage

## Deployment

### Build for Production

```bash
npm run build
```

The build output is in the `dist/` folder.

### Deploy to Hosting

The static build can be deployed to any hosting service:

- **Vercel**: Connect your repo for automatic deploys
- **Netlify**: Drag and drop `dist/` folder
- **GitHub Pages**: Use GitHub Actions
- **Any static host**: Upload `dist/` folder contents

### Environment Variables in Production

Set `VITE_GAS_WEBAPP_URL` in your hosting platform's environment variables.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## License

Private - All rights reserved.

## Support

For issues or questions, contact the development team.
