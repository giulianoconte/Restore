# [Restore](https://giulianoconte.github.io/Restore/)

Game Entry for [Ludum Dare 38](https://ldjam.com/), by Giuliano Conte.

Theme: "A Small World"

### **Play it at <https://giulianoconte.github.io/Restore/>.**

![alt text](https://github.com/giulianoconte/Restore/blob/master/res/publish_image.png "Restore")

-----

### Resources for this project

 + [p5.js](https://p5js.org/)
 + [p5.play](http://p5play.molleindustria.org/)
 + [Daniel Shiffman](https://youtu.be/8j0UDiN7my4?list=PLRqwX-V7Uu6Zy51Q-x9tMWIv9cueOFTFA)
 
### Technologies used

 + JavaScript
 + [p5.js](https://p5js.org/)
 + [p5.play](http://p5play.molleindustria.org/)
 + [GIMP 2](https://www.gimp.org/downloads/)
 
## Tutorial on how to create and host your own JavaScript game

1. **Create a GitHub repository.**
1. **Create skeleton index.html file.**
1. **Setup clone of your repository on your machine.** [(Simple guide)](http://rogerdudler.github.io/git-guide/) [(Thorough guide)](https://www.atlassian.com/git/tutorials/setting-up-a-repository)
1. [**Create a GitHub Page for your repository.**](https://pages.github.com/) GitHub will host your project for free, with barely any setup required. Follow the tutorial on the link and choose "Project Site" and "Start from Scratch". 
1. **Choose an editor.** I am using [VSCode](https://code.visualstudio.com/).
1. [**Setup your index.html file and create your sketch.js file.**](https://p5js.org/get-started/) 
1. **Setup your libraries.** You may have already set this up if you followed the above tutorial. There are many ways to do this. I just downloaded the libraries and put them in my project directory. Look at my `index.html` structure and libraries folder for how to include them in your project. You can download the p5.js and p5.play libraries from this repository. 
1. **Create a local server to host and work on during development.** Install latest version of [Python 3](https://www.python.org/downloads/). Start the python server manually: in your command line go to the project directory and enter `python -m http.server` for [Python 3](https://www.python.org/download/releases/3.0/). You can access it by navigating to `localhost:8000` in your browser. If you get the error "`'python' is not recognized as an internal or external command, operable program or batch file`" you probably need to [make sure Python is added to the PATH vairable](https://www.pythoncentral.io/add-python-to-path-python-is-not-recognized-as-an-internal-or-external-command/). 
1. **Disable browser caching.** Browser caching can really mess with development if you're not custom handling it. [Disable caching for Chrome](http://stackoverflow.com/questions/5690269/disabling-chrome-cache-for-website-development) or load the page in incognito mode (ctrl+shift+n).
1. **Run the sketch.** While your local server is running, you run the p5 sketch at `http://localhost:8000/` in your browser. You don't need to restart the server if you update files. You can also run the latest pushed version at [`https://giulianoconte.github.io/Juke/`](https://giulianoconte.github.io/Juke/). 
1. **Run your sketch.** While your local server is running, you run the p5 sketch at `http://localhost:8000/` in your browser. You don't need to restart the server if you update files. You can also run the latest pushed version at `\<YourGitHubPageWebAddress\>` . 
1. **You're done!** The boiler plate code should be all setup and you should now be able to code your JavaScript game!
