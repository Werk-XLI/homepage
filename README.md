# Werk XLI Band Website

This is the official website for Werk XLI, built with [Astro](https://astro.build/) and [Tailwind CSS](https://tailwindcss.com/).

---

## 🚀 Features

- **Fast, static site** powered by Astro
- **Responsive design** with mobile and desktop navigation
- **Custom branding** with Averia Libre font and outlined text
- **Accessible navigation** and semantic HTML
- **Easy content editing** with Astro components and layouts

---

## 📁 Project Structure

```
/
├── .github/              # GitHub workflows and CI/CD
├── .vscode/              # VS Code configuration
├── public/               # Static assets (favicon, fonts, etc.)
├── src/
│   ├── components/       # Reusable UI components (menus, logo, footer)
│   ├── content/          # Content collections and markdown files
│   ├── images/           # Image assets
│   ├── layouts/          # Page layouts (Base, Shop, etc.)
│   ├── pages/            # Site pages (index, 404, 500, etc.)
│   ├── scripts/          # JavaScript/TypeScript utilities
│   ├── styles/           # Global and custom CSS
│   ├── content.config.ts # Content collections configuration
│   └── env.d.ts          # TypeScript environment definitions
├── astro.config.mjs      # Astro configuration
├── Dockerfile            # Docker containerization
├── package.json          # Project metadata and scripts
├── tsconfig.json         # TypeScript configuration
└── vite.config.mjs       # Vite configuration
```

---

## 🧑‍💻 Development

Install dependencies:

```sh
npm install
```

Start the local dev server:

```sh
npm run dev
```

Build for production:

```sh
npm run build
```

Preview the production build:

```sh
npm run preview
```

---

## 🛠️ Customization

- **Navigation:** Edit `src/components/menus/FullMenu.astro` and `CurtainMenu.astro`
- **Footer:** Edit `src/components/footer/DefaultFooter.astro`
- **Branding:** Update `src/styles/averiaLibre.css` and logo SVG in `src/components/logo/Logo.astro`
- **Content:** Manage content collections in `src/content/` directory
- **Theme:** Customize Tailwind in configuration files and `src/styles/global.css`

---

## 📚 Learn More

- [Astro Documentation](https://docs.astro.build)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

---

© 2025 Werk XLI. All rights reserved.
