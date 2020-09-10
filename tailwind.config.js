module.exports = {
  purge: [],
  theme: {
    extend: {
      gridTemplateColumns: {
        "app-desktop": "minmax(16rem, 20rem) minmax(24rem, 1fr)",
        "app-mobile": "5rem 1fr",
      },
      borderRadius: {
        "app-search": "18px",
      },
      gridTemplateRows: {
        app: "auto 1fr",
      },
      backgroundImage: {
        "message-box-pattern": "url('../images/confetti.svg')",
      },
      minHeight: {
        "comm-header-height": "4rem",
      },
      minWidth: {
        "contact-avatar": "3rem",
      },
      maxWidth: {
        "contact-info": "10.75rem",
      },
    },
  },
  variants: {},
  plugins: [],
};
