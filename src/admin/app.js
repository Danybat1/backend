// path: ./my-app/src/admin/app.js

import AuthLogo from "./extensions/logo.png";
import MenuLogo from "./extensions/logo.png";
import favicon from "./extensions/favicon.png";

export default {
  config: {
    // Configure admin UI languages
    locales: ["fr", "en"],
    // Replace the Strapi logo in auth (login) views
    auth: {
      logo: AuthLogo,
    },
    
    translations: {
      en: {
        "app.components.LeftMenu.navbrand.title": "Linzaka Admin",
        "app.components.LeftMenu.navbrand.workplace":
          "Corporate Documents Management",
        "Auth.form.welcome.title": "Linzaka Services",
        "Auth.form.welcome.subtitle": "Log in",
        "Auth.text.warning": "Log out when finishing",
        "global.homepage.chart.1": "Visitors",
        "global.homepage.chart.2": "Booking orders",
        "app.components.HomePage.welcomeBlock.content": "Current system state",
      },
      fr: {
        "app.components.LeftMenu.navbrand.title": "Linzaka Admin",
        "app.components.LeftMenu.navbrand.workplace":
          "Gestion de documents d'entreprise",
        "Auth.form.welcome.title": "Services de Linzaka",
        "Auth.form.welcome.subtitle": "Se sonnecter",
        "Auth.text.warning": "Se déconnecter à la clôture du travail",
        "global.homepage.chart.1": "Visiteurs",
        "global.homepage.chart.2": "Reservations",
        "app.components.HomePage.welcomeBlock.content":
          "Status actuel du système",
      },
    },

    // Replace the favicon
    head: {
      favicon: favicon,
    },

    // Replace the Strapi logo in the main navigation
    menu: {
      logo: MenuLogo,
    },
    // Override or extend the theme
    theme: {
      // overwrite light theme properties
      light: {
        colors: {
          primary100: "#d8e4e6",
          primary200: "#e8f9fa",
          primary500: "#ac73e6",
          primary600: "#347378",
          primary700: "#347378",
          danger700: "#b72b1a",
          buttonPrimary600: "#347378",
          buttonPrimary500: "#347378",
          buttonPrimary400: "#347378",
          buttonPrimary300: "#347378",
        },
      },

      // overwrite dark theme properties
      dark: {
        colors: {
          primary100: "#d8e4e6",
          primary200: "#e8f9fa",
          primary500: "#ac73e6",
          primary600: "#347378",
          primary700: "#347378",
          danger700: "#b72b1a",
          buttonPrimary600: "#347378",
          buttonPrimary500: "#347378",
          buttonPrimary400: "#347378",
          buttonPrimary300: "#347378",
        },
      },
    },
    // Disable video tutorials
    tutorials: false,
  },

  bootstrap() { },
};
