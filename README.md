# Plotting Locations on Canvas
### Requirements
1. A prototype of a web application to visualize physical locations
2. Read Data from JSON file (for now)
3. Display locations (points)
4. Display labels on locations (text)
5. There are 2 types of locations (Depots and Landmarks)
6. Display the physical coordinates and metadata

### How to Run?
1. Follow the [link][1] to get angular running 
2. Open your terminal and cd to the project folder
3. Run `npm install` to install the l dependencies
4. Run `npm start` to run the code
5. Open your browser to http://localhost:4200

[1]: https://www.lucidchart.com/techblog/2016/12/12/installing-angular-2-and-other-dependencies/

### Plotting Locations on Canvas and Features
Plotting locations on Canvas is a simple angular.io app that plots the given locations on a canvas, based on their cartesian coordinates.

Given a JSON file of 2 different types of locations (depots and landmarks), the web app converts the cartesian coordinates to isometric coordinates (coordinates system of HTML5 Canvas) through a set of steps of transformation functions and plots these coordinates on HTML5 canvas.

The web app uses separate classes to represent the landmarks and depots. This is visible to the end-use by the image used to represent each on the canvas.
The plotting handler/controller manages canvas manipulation and drawings.

The code is built on SOLID and Dry principles, so it is very easy to extend (e.g. add new types of locations or even represent the same type by different images..etc).

##### Currently, the web app works as follows:
1. Read the Locations from the JSON file in this format: [JSON data][2]. The file is in `/assets` directory of the project.
2. Initializes Depots and Landmarks
3. Initializes HTML5 Canvas
4. Calculates minimums and maximums required
5. Adjusts the Canvas Coordinates
6. Adjusts the Locations (`Depots` and `Landmarks`) coordinates
7. Plots the Locations on the Canvas.

[2]: https://gist.github.com/PiotrZakrzewski/a2e0ebd286313143a504d38bdc774874

##### The app is built over HTML5 Canvas so it is inheriting its features:
* Simplify 2D Drawing Operations
* Present Data More Effectively.
* Great at managing many objects.

It also inherits its disadvantage of having to manage every detail manually. E.g. hovering over different drawn items, what if they intersect..etc.

### Application Modules
* `Point` is the building block of `Location`s (x, y) coordinates. __(NOT IMPLEMENTED YET)__
* `Depot` is Location with `Point` attribute
* `Landmark` is a Location with `Point` attribute
* A `Route` is an object with a list of `Point` attributes to be connected, where the start and end of the list represent the to and from properties of the route. __(NOT IMPLEMENTED YET)__

### Why HTML5 Canvas:
1. The canvas allows objecting models on top of it.
2. Ability to draw and scale an image and different shapes
3. Interactivity: using the canvas, there is the flexibility to manipulate the objects drawn, zoom them, redraw them, get coordinates and move or delete them around..etc
4. Ability to export/import marked objects
5. Detailed event system can be built
6. Good performance for a big number of objects.
7. I opt for HTML5 Canvas and not JS Frameworks built on top of it because according to my search, these libraries are very customized to certain tasks, and not flexible to the app requirements (and future requirements) for example, Charts.js Framework.

### How to display routes on the Canvas
`Route`s will be introduced as a new object. If I am to plot routes, I would adopt having a list of points to be connected resulting in one route from `Depot1` to `Depot2`. For example, `Depot1` at `(5, 15)`, `Depot2` at `(15,2)`, and `Route` is defined as a `route` from `Depot1` to `Depot2` as follows:
![](/images/image.png)
### Future Work
* Adopt Point Class
* Adopt routes between different depots
* Implement hovering-over a drawn location (depots and landmarks), where hovering over shows the physical location as a tool-tip and also displays in a separate widget the meta-data of the location
* Add Zoom in/out functionality.
* Use Bootstrap CSS framework to implement responsive widgets.
* Add E2E test cases to test the app
* Add Unit Tests
* UML diagram(s) representing the different system components interactions.
* Code Refactoring. I commented on the code example that I can create a new object for canvas coordinates and split it from the location that I have read. 
* Loading page if the app is still processing 
* If I have a huge list of locations I can read asynchronously and draw them in batches.  
