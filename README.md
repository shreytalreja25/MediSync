# MediSync - Healthcare Platform

MediSync is a modern healthcare scheduling and triage system built for patients, doctors, and admins. It aims to reduce in-clinic wait times, streamline appointment management, and improve overall user experience through AI and automation.

## Features

- **Patient Dashboard**
  - Appointment scheduling and management
  - Medical reports access
  - Billing and payments
  - Video consultations
  - Profile settings

- **Doctor Features** (Coming Soon)
  - Schedule management
  - Patient records
  - Case notes
  - Teleconsultations

- **Admin Features** (Coming Soon)
  - User management
  - Analytics and reporting
  - System configuration

## Tech Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- Heroicons

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/medisync.git
   cd medisync
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── dashboard/         # Dashboard pages
│   │   ├── appointments/  # Appointment management
│   │   ├── reports/      # Medical reports
│   │   ├── billing/      # Billing and payments
│   │   ├── consult/      # Video consultations
│   │   └── settings/     # User settings
│   └── layout.tsx        # Root layout
├── components/            # Reusable components
│   └── layout/           # Layout components
└── styles/               # Global styles
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Design inspired by modern healthcare platforms
- Icons provided by [Heroicons](https://heroicons.com/)
- Built with [Next.js](https://nextjs.org/) and [Tailwind CSS](https://tailwindcss.com/) 