const path = require("path");

module.exports = {
  entry: {
    index: "./src/index.tsx"
  },
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.tsx?/,
        exclude: /(node_modules)/,
        use: {
          loader: "swc-loader"
        }
      }
    ]
  },
  resolve: {
    extensions: [".js", ".ts", ".tsx"]
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'public')
    }
  }
};
