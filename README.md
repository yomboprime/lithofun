# Lithofun

Web application to create 3D lithophanes from 2D images

With Lithofun you can load an image and create a [3D lithophane](https://en.wikipedia.org/wiki/Lithophane), suitable for 3D printing.

# Usage

You can open the application directly at the  [repository Github page](https://yomboprime.github.io/lithofun/lithofun.html). The code is [here](https://github.com/yomboprime/lithofun).

As it is a static HTML5 application, your images are not uploaded anywhere. They are loaded locally in your computer and after processing, a STL file is generated.

### Preparing the image

There are two things to do to improve the lithophane:

 - Scale the image between 1000 to 1500 pixels in the longest direction (greater if your lithophane is really big) Too much resolution (e.g. 4K) will create unnecessarily detailed geometry and could be unmanageable by the app.
 - Smooth your image in a (preferably open source) image editor program. The smoothing prevents the nozzle from hard movements originated from image noise and reduces print time. If you use the [Gimp](https://www.gimp.org/), the "Selective gaussian filter" works great, because it smoothes without blurring the sharp edges.

### Creating the lithophane

Just click on the "Load image" button, select the image stored in your computer and after a few seconds a preview will be shown.

You can change the parameters to change the shape and size of the lithophane and invert the image colors.

At the bottom right corner of the screen you will see info about image resolution, lithophane bounding box in mm and number of mesh triangles. Also a small preview of the image will be shown in the lower left corner of the screen.

You can activate the option "Realistic rendering", and the lithophane will be shown like it is lighted from the back.

When you're done, click the "Export STL" button and after a few seconds a STL file download will appear. Save it to your computer and prepare to print!

### The shape parameters

#### Lithophane width (mm)

This is the distance in mm from leftmost to rightmost part of the lithophane.

#### Min. thickness (mm) and Max. thickness (mm)

These are the minimum and maximum thickness of the lithophane. The minimum corresponds to the lighter parts of the image and the maximum to the darker ones.

#### XY angle

This angle controls the curvature along the XY plane. When its value is 0º, the lithophane is planar. When it is 180º, the lithophane is a closed cylinder. Values in-between gives you a lithophane shaped liked a curved roof tile.

#### Z top angle, Z bottom angle

These parameters controls the curvature along Z axis. When they are equal the lithophane is a vertical wall. When not, they are the bottom and top angles of the lithophane in a sphere, being 90º the top, 0º the middle and -90º the bottom of the sphere. Keep in mind that these parameters can generate lithophanes which are not 3d printable (they would fall off while printing), adjust them wisely. If the bottom angle is greater than the top angle, they are switched internally.

### 3D printing the lithophane

Recommended print settings:

 - Slow speed, about 45 mm/s
 - 0.2 mm layer height
 - 100% infill
 - 3 perimeters
 - No supports
 - 7 mm retraction at 30 mm/s speed
 - Big brim of 6 mm for good bed adhesion
 - Heating the bed is not needed
