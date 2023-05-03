const path=require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin=require('mini-css-extract-plugin')
module.exports ={
    entry: path.join(__dirname,'src','index.js'),
    devServer:{
        historyApiFallback: true,
        static: {
            directory: path.join(__dirname, "dist"),
          }
    },
    output:{
        path:path.resolve(__dirname,'dist'),
        publicPath: "/"
    },
    module:{
      rules:[
        {
            test: /\.(js|jsx)$/,
            exclude:/node_modules/,
            use:['babel-loader']
        },
        {
            test:/\.(sa|sc|c)ss$/,
            use:[MiniCssExtractPlugin.loader,'css-loader','sass-loader']
        },
        {
            test:/\.(png|jp(e*)g|svg|gif)$/,
            use:['file-loader']
        },
        {
            test:/\.svg$/,
            use:['@svgr/webpack']
        }
      ]  
    },
    resolve: {
        extensions: ['*', '.js', '.jsx'],
      },
    plugins:[
        new HtmlWebpackPlugin({
            template: path.join(__dirname,'src','index.html')
        }),
        new MiniCssExtractPlugin({
            filename:'main.css',
            chunkFilename:'main.[id].css'
        })
    ]
};