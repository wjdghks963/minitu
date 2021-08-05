const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

module.exports = {
  entry: "./src/client/js/main.js",
  mode: "development",
  watch: true,
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/styles.css", // css dir 안에 styles.css로 아웃풋 생성
    }),
  ],
  output: {
    filename: "js/main.js", // js dir안에 main.js로 아웃풋 생성
    path: path.resolve(__dirname, "assets"),
    clean: true, // ouput folder를 build 전에 clear 해줌
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env", { targets: "defaults" }]],
          },
        },
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },
};
