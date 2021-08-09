const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

module.exports = {
  entry: {
    main: "./src/client/js/main.js",
    videoPlayer: "./src/client/js/videoPlayer.js",
    recorder: ".src/client/js/recoder.js",
  },
  mode: "development",
  watch: true,
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/styles.css", // css dir 안에 styles.css로 아웃풋 생성
    }),
  ],
  output: {
    filename: "js/[name].js", // js dir안에 위에서 설정한 entry의 name으로  [name].js로 아웃풋 생성
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
