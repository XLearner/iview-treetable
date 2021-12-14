/*
 * @Author: your name
 * @Date: 2021-12-14 22:33:20
 * @LastEditTime: 2021-12-15 00:11:46
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \tree-table\vue.config.js
 */

module.exports = {
  outputDir: "output/",
  lintOnSave: false,
  pages: {
    index: {
      entry: "src/main.js"
    }
  },
  configureWebpack: (config) => {
    config.module.rules.push(...[
      
      // {
      //   test: /\.css$/,
      //   use: [
      //     'vue-style-loader',
      //     'css-loader',
      //   ],
      // },
      // {
      //   test: /\.less$/,
      //   use: [{
      //       loader: "vue-style-loader"
      //     },
      //     {
      //       loader: "css-loader"
      //     }, {
      //       loader: "less-loader",
      //       options: {
      //         sourceMap: true,
      //         javascriptEnabled: true
      //       }
      //     }
      //   ]
      // },
      // // {
      // //   test: /\.vue$/,
      // //   loader: 'vue-loader',
      // //   options: {
      // //     loaders: {
      // //     }
      // //     // other vue-loader options go here
      // //   }
      // // },
      // // {
      // //   test: /\.js$/,
      // //   loader: 'babel-loader',
      // //   exclude: /node_modules/
      // // },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: "url-loader?limit=8192&name=./[name].[ext]?[hash]"
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'fonts/[name].[hash:7].[ext]'
        }
      }
    ])
  },
}