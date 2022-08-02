## Overview

Graph-ERR-QL is a hosted endpoint package that improves GraphQL error inference. Features include:

- Snappy Implementation onto existing Host-App. Be up and analyzing Mutation logs in minutes.
- Sandbox Mode: Using your Host-App Schema, draft and test Queries/Mutations before you write a single line of Front-End code.
- Live Mode: Our platform will capture Queries/Mutations as they arrive from a Live Front-End. Collection/Analysis of these logs all in one place.

## File Structure

- ./: Overall config files. package.json defined npm package metadata, tsconfig.json defines entry point of /src
- /src: This contains all the implementation files for Graph-ERR-QL. Hosted React/HTML files are bundled, then published to npm. More on that below
- /build: Resultant of the "npm run build" script, which joins serving files via 'react-scripts'
- /package: This is where "npm publish" should be run from. /package results from the "npm run builduipackage" script, which copies /build contents to /package, and runs /scripts and /packageScripts to setup relative pathing for application by Host App.
- /scripts: Here, tsconfig compiles the createPackage file, which transpiles system metadata (eg 'package name', 'version') into the /package package file. It verifies the needed files exist before doing so.
- /packageScripts: Here, tsconfig compiles the index file, which exports "directoryPath" as '\_\_dirname' and "defaultFilePath" for use by Host App.

## Implementation of Graph-ERR-QL into Host App

- reference 'Host-App_README.md'

## Resources

- https://levelup.gitconnected.com/how-to-create-npm-package-out-of-react-app-7556b9b47bce -> walks through attaching a React app to a Host-App as a Middleware Endpoint
