module.exports = {
  presets: ["next/babel"],
  plugins: [
    [
      "prismjs",
      {
        languages: ["javascript", "css", "html", "bash", "hcl"],
        plugins: ["line-numbers", "show-language"],
        theme: "tomorrow",
        css: true,
      },
    ],
  ],
};
