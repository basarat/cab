# Setup
```
git clone https://github.com/basarat/cab.git
cd cab
npm install
npm link 
```

Now run `cab`. Recommend you checkout `nodemon`.

# IDE
We presently use [`atom-typescript`](https://atom.io/packages/atom-typescript). Eventually this project should be self hosting. 

```
atom .
```

## Webpack
The workflow we are using is similar to: http://www.christianalfoni.com/articles/2015_04_19_The-ultimate-webpack-setup

The meanings of these folders comes from that
```
src/app
src/public
src/server
webpack.config.js
```

* Visit `/dev` to enable dev workflow and then test app
* Visit `/prod` to enable min js workflow and then test app