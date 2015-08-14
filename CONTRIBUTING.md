# Setup
I presently use [`atom-typescript`](https://atom.io/packages/atom-typescript). Eventually this project should be self hosting. 

You need webpack. The workflow we are using is well documented : http://www.christianalfoni.com/articles/2015_04_19_The-ultimate-webpack-setup Specifically the meaning of the following folders/files: 
```
src/app
src/public
src/server
webpack.config.js
```

## Your friends
```
npm install
npm prune
```

## If messing with webpack config
* Delete `bundle.js`. Run app and see it works
* Now run `npm run prepublish`. Run app and see it works