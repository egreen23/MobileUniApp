// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // serverUrl: "http://localhost:8080/UniApp",
  //   serverUrl: "http://10.0.210.97:8080/UniApp",

      serverUrl: "http://192.168.0.102:8080/UniApp",




    firebase: {

      apiKey: "AIzaSyCvHY7d9M2eIaopP9L3YKukxgwGFyYCunQ",
      authDomain: "uniapp-97fa0.firebaseapp.com",
      databaseURL: "https://uniapp-97fa0.firebaseio.com",
      projectId: "uniapp-97fa0",
      storageBucket: "uniapp-97fa0.appspot.com",
      messagingSenderId: "473616851926",
      appId: "1:473616851926:web:86fde46f67f2c3ea"

  }


};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
