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
* Visit `/dev` to enable dev workflow and then test app
* Visit `/prod` to enable min js workflow and then test app