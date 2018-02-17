# Codex
Front End Capstone NSS Cohort 22. Application for helping organize movie collection by format

# To Deploy Codex

1. Use Git to  Clone the repo to the desired location on your local drive
1. You will need to change into the codex directory and create a folder called lib
1. change into the lib folder you just created
1. type "npm install" to install all needed dependancies

# Configuring Codex Firebase / TMDB Api keys
1. Codex uses Firebase to hold all of its data, and makes api requests to TMBD.ORG for movie information.
1. You will need to setup an account with firebase and request an API key from TMDB.ORG to use this app.
1. Open the app.config.example file and observe the top section of the file

```
   app.constant("FIREBASE_CONFIG", {
    apiKey: "<Your Firebase Api key here>",
    authDomain: "<Your Firebase Config here>",
    databaseURL: "Your Firebase Config here>",
    projectId: "<Your Firebase Config here>",
    storageBucket: "<Your Firebase Config here>",
    messagingSenderId: "545121410789"
})
app.constant("TMDB_KEY", "<Your TMBD API Key here>")
angular.module("codex").run(function (FIREBASE_CONFIG) {
    firebase.initializeApp(FIREBASE_CONFIG)
})
```
1. You will need to replace all information in the <  >'s with the appropriate information
1. Once configured, save the file as app.config.js and save it to the /Codex/App folder

# Opening Codex
1. Navigate to the /Codex folder
1. start the HTTP Server of your choice
1. Open your browser and navigate to the local host specified by your HTTP Server, you should be greeted with the login/registration screen

# Using Codex

to use codex, you can try out the deployed app at www.mycodexapp.com

1. If you have never been, you will be presented with a login screen.
1. please enter your email address and a password (must be at least 6 characters long)
1. click the register button.

# User Dashboard
1. If you have no media in your collection, the app will direct you to add movies using the "Add Movie" button
1. Clicking on the "View Collection" button will return you to the dashboard from any screen.
1. Clicking on the "Reports" button will show you a breakdown of all the various formats in your collection.

# Adding Movies to the collection
1. Click the "Add Movie" button, you will be brought to the add movie screen
1. Click in the search bar to move the cursor there.
1. Type your search terms in the box and press enter
1. The returned results will be displayed below the search
1. To add a movie to your collection, press the green "Add Movie" button
1. Press "View Collection" to see the movies added to your collection

#Viewing Movie Detalis
1. From the main dashboard view, to view a movies details click on the Blue "Details" button on the movie card
1. You will be brought to the movie details view which will allow you to add/change a movie format, or delete a movie.

# Adding movie format
1. Navigate to the movie details view.
1. Select the desired format from the dropdown in the lower left corner of the app.
1. Click the teal "Add Format" button
1. The added format will be show on the movie detail page and on the movie card in the dashboard

# Removing movie format
1. Navigate to the movie details view.
1. Select the format you wish to remove from the dropdown in the lower left corner of the app.
1. Click the yellow "Remove Format" button
1. The selected format will be removed from the detail view and the movie card in the dashboard.
1. If you remove all formats, the default of "None" will be displayed

# Deleting a movie from your collection
1. Navigate to the movie details view.
1. Select the Red "Delete Movie" button
1. The movie will be removed from your collection

# Using the format filter bar
1. Below the main dashboard you will see a grey filter bar.
1. pressing any of the four buttons will filter only the selected format, to return to all click on "View Collection"

# Using the search bar
1. Clicking on any of the light grey space surrounding the filter buttons will cause a search bar to fade in.
1. Click on the search field to place the cursor in the field
1. As you type any matches will be shown below.
1. The search bar can be used on any screen in the dashboard

