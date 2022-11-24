const path = require('path');
const fs = require('fs');

const SW_LOCATION = './src/service-workers/';

const serviceWorkersEntrys = () => {
  let swFiles = fs.readdirSync(SW_LOCATION);

  return swFiles.reduce(
    (entries, file) => ({
      ...entries,
      [file.split('.')[0]]: `${SW_LOCATION}${file}`,
    }),
    {}
  );
};

module.exports = (env, argv) => {
  const isDevelopment = (argv && argv.mode) === 'development';
  return [
    {
      entry: { main: `./src/index.jsx`, ...serviceWorkersEntrys() },
      output: {
        path: path.join(__dirname, 'public'),
        publicPath: 'auto',
        filename: '[name].js',
      },
      devServer: {
        static: './public',
        allowedHosts: 'all',
        historyApiFallback: true,
        port: 3031,
        client: {
          overlay: false,
          logging: 'none',
        },
      },
      devtool: isDevelopment ? 'source-map' : false,
      resolve: {
        alias: {
          components: path.resolve(__dirname, 'src/components/'),
          hooks: path.resolve(__dirname, 'src/hooks/'),
          utils: path.resolve(__dirname, 'src/utils/'),
        },
        extensions: ['', '.js', '.jsx'],
      },
      module: {
        rules: [
          {
            test: /\.(js|jsx)$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
          },
          {
            test: /\.(svg|png|jpg|gif)$/i,
            type: 'asset/resource',
          },
          {
            test: /\.html$/,
            use: [
              {
                loader: 'html-loader',
                options: {
                  minimize: true,
                },
              },
            ],
          },
          {
            test: /\.css$/,
            use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
          },
        ],
      },
    },
  ];
};
