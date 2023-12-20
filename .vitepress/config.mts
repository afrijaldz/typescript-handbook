import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Typescript Handbook",
  description: "Typescript handbook that easy to read",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [{ text: "Home", link: "/" }],

    sidebar: [
      {
        items: [
          { text: "The Basics", link: "/basic-types" },
          { text: "Everyday Types", link: "/everyday-types" },
          { text: "Everyday Types", link: "/everyday-types" },
          { text: "Narrowing", link: "/narrowing" },
          { text: "More On Function", link: "/functions" },
          { text: "Object Types", link: "/objects" },
          {
            text: "Type Manipulation",
            items: [
              { text: "Creating Types from Types", link: "/types-from-types" },
              { text: "Generics", link: "/generics" },
              { text: "Keyof Type Operator", link: "/keyof-types" },
              { text: "Typeof Type Operator", link: "/typeof-types" },
              { text: "Typeof Type Operator", link: "/typeof-types" },
              { text: "Indexed Access Types", link: "/indexed-access-types" },
              { text: "Conditional Types", link: "/conditional-types" },
              { text: "Mapped Types", link: "/mapped-types" },
              {
                text: "Template Literal Types",
                link: "/template-literal-types",
              },
            ],
          },
          { text: "Classes", link: "/classes" },
          { text: "Modules", link: "/modules" },
        ],
      },
    ],

    // socialLinks: [
    //   { icon: "github", link: "https://github.com/vuejs/vitepress" },
    // ],
    aside: false,
  },
  rewrites: {
    "docs/handbook/2/basic-types.html": "docs/handbook/2/Basics.md",
  },
  cleanUrls: true,
});
