module.exports = {
  transpileDependencies: ["vuetify"],
  devServer:{
    proxy:{
      '/':{
        target:'http://127.0.0.1:5000/',
        chageOrigin:true,
        ws:false,
        pathRewrite:{
          '^/':''
        }
      }
    }
  }
};
