module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          "node": "current"
        }
      }
    ]
  ],
  plugins: [
    "@babel/plugin-transform-react-jsx",
    "@babel/plugin-proposal-object-rest-spread",
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-proposal-private-methods"
  ],
};