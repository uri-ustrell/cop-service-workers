const path = require("path");

module.exports = (env, argv) => {
  const isDevelopment = (argv && argv.mode) === "development";
  return [
    {
      entry: `./src/index.jsx`,
      output: {
        path: path.join(__dirname, "public"),
        publicPath: "auto",
        filename: "main.js",
      },
      devServer: {
        static: "./public",
        allowedHosts: "all",
        historyApiFallback: true,
        client: {
          overlay: false,
        },
      },
      devtool: isDevelopment ? "source-map" : false,
      resolve: {
        alias: {
          components: path.resolve(__dirname, "src/components/"),
          hooks: path.resolve(__dirname, "src/hooks/"),
        },
        extensions: ["", ".js", ".jsx"],
      },
      module: {
        rules: [
          {
            test: /\.(js|jsx)$/,
            loader: "babel-loader",
            exclude: /node_modules/,
          },
          {
            test: /\.(svg|png|jpg|gif)$/i,
            type: "asset/resource",
          },
          {
            test: /\.html$/,
            use: [
              {
                loader: "html-loader",
                options: {
                  minimize: true,
                },
              },
            ],
          },
          {
            test: /\.css$/,
            use: [{ loader: "style-loader" }, { loader: "css-loader" }],
          },
        ],
      },
    },
  ];
};
