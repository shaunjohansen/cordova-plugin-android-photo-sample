# cordova-plugin-android-photo-sample - A React Material UI App

This is a sample application that demonstrates the usage of the [cordova-plugin-android-photo](https://github.com/shaunjohansen/cordova-plugin-android-photo) Cordova plugin.

The bulk of the code and scripts in this app are boilerplate for setting up React to run within Cordova. Usage of the plugin is restricted to the [TakePictureButton.js](./src/components/TakePictureButton.js) file.

## Build and Run

This app was built using nodejs v10.11.0 with npm v6.4.1 on a Mac OSX computer. I suspect it will build and run on other platforms but they have not been tried.

To install dependencies we use the normal `npm install` plus an additional script to create the `./www` diretory and initialize the Android platform for Cordova:

```bash
  npm install
  npm run reset-cordova-android
```

Normal operating procedures apply for running the cordova app on android:

```bash
  cordova run android
```
