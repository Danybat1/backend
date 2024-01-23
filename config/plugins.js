module.exports = ({ env }) => ({
  email: {
    config: {
      provider: "nodemailer",
      providerOptions: {
        host: env("SMTP_HOST"),
        port: env("SMTP_PORT"),
        service: env("SERVICE_EMAIL"),
        auth: {
          user: env("SERVICE_EMAIL_ADDRESS"),
          pass: env("SERVICE_EMAIL_PWD"),
        },
      },
      settings: {
        defaultFrom: env("SERVICE_EMAIL_FROM"),
        defaultReplyTo: env("SERVICE_EMAIL_REPLY_TO"),
      },
    },
  },
  documentation: {
    enabled: true,
    config: {
      openapi: "3.0.0",
      info: {
        version: "1.0.0",
        title: "DOCUMENTATION",
        description: "",
        termsOfService: "RHINOCEROS SOFTWARE SAS",
        contact: {
          name: "TEAM",
          email: "yves@rhinosoftware.io",
          url: "rhinosoftware.io",
        },
        license: {
          name: "Apache 2.0",
          url: "https://www.apache.org/licenses/LICENSE-2.0.html",
        },
      },
      "x-strapi-config": {
        // Leave empty to ignore plugins during generation
        plugins: ["upload", "users-permissions"],
        path: "/documentation",
      },
      servers: [
        {
          url: "http://localhost:7001/api",
          description: "Development server",
        },
        {
          url: "https://api.easysign.rhinocerosoftware/api",
          description: "Production server",
        },
      ],
      externalDocs: {
        description: "Find out more",
        url: "https://docs.strapi.io/developer-docs/latest/getting-started/introduction.html",
      },
      security: [{ bearerAuth: [] }],
    },
  },
});
