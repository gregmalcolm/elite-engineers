Elite Engineers
===============

A webapp util for the game Elite:Dangerous.

For gathering personal and technical data for each Engineer, with soon-to-come 
calculators to calculate ship stats output across multiple mods for a single 
module, and multiple mods through several modules.

Original project structure is based on this:
https://github.com/coryhouse/react-slingshot

Take a look through it for additional information and instation steps

Install
=======

NVM
---

This is a node project. The easiest way to install node is by
first installing NVM (Node Version Manager). Don’t use sudo for
any of this, or you may be in for a world of pain!

NVM install instructions are here:

https://github.com/creationix/nvm

After installing it install the latest stable npm 4.x:

```
nvm install 4.4.5
nvm use 4.4.5
node -v
```

Build the project
-----------------

```
npm install
npm start -s
```

The app will then be available at http://localhost:3000

Deploying assets
----------------

For deployment to servers we can genearte html/js files with webpack

```
npm install -g webpack
npm --config webpack.config.prod.js
```
