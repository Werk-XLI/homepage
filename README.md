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
├── public/                # Static assets (favicon, images, etc.)
├── src/
│   ├── components/        # Reusable UI components (menus, logo, footer)
│   ├── layouts/           # Page layouts (Base, Shop, etc.)
│   ├── pages/             # Site pages (index, 404, 500, etc.)
│   └── styles/            # Global and custom CSS
├── tailwind.config.js     # Tailwind CSS configuration
└── package.json           # Project metadata and scripts
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
- **Theme:** Customize Tailwind in `tailwind.config.js` and `src/styles/global.css`

---

## 📚 Learn More

- [Astro Documentation](https://docs.astro.build)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

---

© 2025 Werk XLI. All rights reserved.
