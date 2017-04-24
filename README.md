# Restore

Game Entry for [Ludum Dare 38](https://ldjam.com/), by Giuliano Conte.

Theme: "A Small World"

**Play it at <https://giulianoconte.github.io/Restore/>.**

![alt text](https://github.com/giulianoconte/Restore/blob/master/res/publish_image.png "Restore")

-----

### Resources for this project

 + [p5.js](https://p5js.org/)
 + [p5.play](http://p5play.molleindustria.org/)
 + [Daniel Shiffman](https://youtu.be/8j0UDiN7my4?list=PLRqwX-V7Uu6Zy51Q-x9tMWIv9cueOFTFA)
 + [Mozilla Developer Network](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
 + [w3schools](https://www.w3schools.com/js/default.asp)
 + [tutorialspoint](https://www.tutorialspoint.com/javascript/index.htm)
 
### Technologies used

 + HTML
 + JavaScript
 + p5.js
 + p5.play
 
## Tutorial on how to create and host your own JavaScript game

1. **Create a GitHub repository.**
1. **Create skeleton index.html file.**
1. **Setup clone of your repository on your machine.** [(Simple guide)](http://rogerdudler.github.io/git-guide/) [(Thorough guide)](https://www.atlassian.com/git/tutorials/setting-up-a-repository)
1. [**Create a GitHub Page for your repository.**](https://pages.github.com/) GitHub will host your project for free, with barely any setup required. Follow the tutorial on the link and choose "Project Site" and "Start from Scratch". 
1. **Choose an editor.** I used [Atom](https://atom.io/) for this project. [Notepad++](https://notepad-plus-plus.org/) would be my second choice.
1. [**Setup your index.html file and create your sketch.js file.**](https://p5js.org/get-started/) 
1. **Setup your libraries.** You may have already set this up if you followed the above tutorial. There are many ways to do this. I just downloaded the libraries and put them in my project directory. Look at my `index.html` structure and libraries folder for how to include them in your project. You can download the p5.js and p5.play libraries from this repository. 
1. [**Create a local webserver to host and work on during development.**](https://github.com/processing/p5.js/wiki/Local-server) This is important. In your command line go to your project directory and enter `python -m http.server` for [Python 3](https://www.python.org/download/releases/3.0/) or `python -m SimpleHTTPServer` for Python 2.7. If your project uses textures, images, sounds, or any other resources, you will need to host them on a local or web server. Your resources will be hosted locally at your project directory so you can access them in your code with paths relative to your project directory. When pushed to your GitHub repository, your resources will be hosted at `\<YourGitHubPageWebAddress\>` , so you can access them with paths relative to *that* directory for when you deploy the project to the web. You can look at the `getResource(fileName)` function in my `GameObject.js` file for an example on how to do this.
1. **Disable browser caching.** Browser caching can really screw with development if you're not custom handling it. [Disable caching for Chrome](http://stackoverflow.com/questions/5690269/disabling-chrome-cache-for-website-development)
1. **Run your sketch.** While your local server is running, you run your p5 sketch at `http://localhost:8000/` in your browser. You can also run your latest pushed version at `\<YourGitHubPageWebAddress\>` . 
1. **You're done!** The boiler plate code should be all setup and you should now be able to code your JavaScript game!
