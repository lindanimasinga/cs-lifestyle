importScripts("https://www.gstatic.com/firebasejs/9.1.3/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.1.3/firebase-messaging-compat.js");

firebase.initializeApp({
 apiKey: "AIzaSyB1KhGf_VDF8VDUT0pNddLXB1Hls_dtR0U",
 authDomain: "ijudi-d19bd.firebaseapp.com",
 databaseURL: "https://ijudi-d19bd.firebaseio.com",
 projectId: "ijudi-d19bd",
 storageBucket: "cs-clothing.appspot.com",
 messagingSenderId: "315529266651",
 appId: "1:315529266651:web:b28ea03f57c4d432ed53fe",
 measurementId: "G-ZJRDF78RJX"
});

const messaging = firebase.messaging();