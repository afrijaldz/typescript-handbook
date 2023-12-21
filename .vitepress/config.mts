import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Typescript Handbook",
  description: "Typescript handbook that easy to read",
  themeConfig: {
    search: {
      provider: "local",
    },

    sidebar: [
      {
        text: "Getting Started",
        items: [
          {
            text: "TS for the New Programmer",
            link: "/get-started/typescript-from-scratch",
          },
          {
            text: "TS for JS Programmer",
            link: "/get-started/typescript-in-5-minutes",
          },
          {
            text: "TS for Java/C# Programmer",
            link: "/get-started/typescript-in-5-minutes-oop",
          },
          {
            text: "TS for Functional Programmer",
            link: "/get-started/typescript-in-5-minutes-func",
          },
          {
            text: "TypeSscript Tooling in 5 Minutes",
            link: "/get-started/typescript-tooling-in-5-minutes",
          },
        ],
        collapsed: false,
      },
      {
        text: "Handbook",
        items: [
          { text: "The Basics", link: "/handbook/basic-types" },
          { text: "Everyday Types", link: "/handbook/everyday-types" },
          { text: "Narrowing", link: "/handbook/narrowing" },
          { text: "More On Function", link: "/handbook/functions" },
          { text: "Object Types", link: "/handbook/objects" },
          {
            text: "Type Manipulation",
            items: [
              {
                text: "Creating Types from Types",
                link: "/handbook/type-manipulation/types-from-types",
              },
              {
                text: "Generics",
                link: "/handbook/type-manipulation/generics",
              },
              {
                text: "Keyof Type Operator",
                link: "/handbook/type-manipulation/keyof-types",
              },
              {
                text: "Typeof Type Operator",
                link: "/handbook/type-manipulation/typeof-types",
              },
              {
                text: "Typeof Type Operator",
                link: "/handbook/type-manipulation/typeof-types",
              },
              {
                text: "Indexed Access Types",
                link: "/handbook/type-manipulation/indexed-access-types",
              },
              {
                text: "Conditional Types",
                link: "/handbook/type-manipulation/conditional-types",
              },
              {
                text: "Mapped Types",
                link: "/handbook/type-manipulation/mapped-types",
              },
              {
                text: "Template Literal Types",
                link: "/handbook/type-manipulation/template-literal-types",
              },
            ],
          },
          { text: "Classes", link: "/handbook/classes" },
          { text: "Modules", link: "/handbook/modules" },
        ],
      },
    ],

    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/afrijaldz/typescript-handbook",
      },
    ],
    aside: false,
    editLink: {
      pattern:
        "https://github.com/afrijaldz/typescript-handbook/edit/main/:path",
    },
    lastUpdated: {
      text: "Updated at",
      formatOptions: {
        dateStyle: "full",
        timeStyle: "medium",
      },
    },
  },
  cleanUrls: true,
  ignoreDeadLinks: true,
});
