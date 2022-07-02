#Integration of Graph-ERR-QL into LOCAL HOST APP for Development

##Pre-reqs

- LOCAL TESTING Host App can use any node backend approach. This guide uses Express
- LOCAL TESTING Host App should live under top-level project repo "GraphERR-QL". It should live in separate directory WITHIN 'grapherrql-package', which holds our project source code. Example file structure for development:
  GraphERR-QL/
  ./grapherrql-package
  ./(HOST APP USED FOR TESTING)

If you are using a provided Host App repo (ie hackernews-clone), use 'git clone (host-app-repo-name)' INSIDE the directory used for HOST APP TESTING. When you make pushed up to GraphERR-QL after this, the host-app repo will not be included. It will only live locally

##Add Endpoint for Accessing Graph-ERR-QL by pointing to static files in grapherrql-package

In server.js (or wherever your backend is defined)

```
const path = require('path');

expressServer.use(express.static('../build'));
expressServer.get('/grapherrql', function (req, res) {
  res.sendFile(path.resolve('../build/index.html'));
});
```

##Starting Testing Host App
-FIRST, navigate to GraphERR-QL/grapherrql-package and run 'npm run build' to build the front-end code of our App. IF 'build/' already exists, delete it first so you replace it with your latest front-end changes
-Now, navigate to your testing Host App directory and start the server. It should now be referencing the latest grapherrql-package changes when you navigate to 'http://hostappserver/grapherrql'
