export default {
  name: "menu",
  title: "Menu",
  type: "document",
  fields: [
    {
      title: "menuItem",
      name: "menuItem",
      type: "array",
      of: [
        {
          title: "Menu",
          name: "menuwrap",
          type: "object",
          fields: [
            {
              title: "Label",
              name: "label",
              type: "string"
            },
            {
              title: "Link",
              name: "link",
              type: "string",
              description:
                "please include all / characters i.e. for www.{this site}.com/about enter /about. If you would like to link out of this site please include the https or www"
            }
          ]
        }
      ]
    }
  ],
  preview: {
    name: "preview",
    title: "Preview",
    prepare() {
      return {
        title: "Menu"
      };
    }
  }
};
