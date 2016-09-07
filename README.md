# Angular Slice
[ngSlice.io](http://nglsice.io) -> The Visual Angular 2 Boostrapping Tool.
Feel free to ask & open issues. We're hardly trying to improve the work of the community.

## Gettings started

 - Run `npm i`
 - Run `typings i`
 - Run `npm start`
 - Open your browser at `localhost:3001`
 - Upload your images - for now PNG and JPG formats are supported.
 - Slice the components
 - Export the code in ZIP format
 
## Change the source
 Feel free to fork the project and customize for your special needs.
 
 At the moment we support just component generation. 
 To change the default templating simply edit `src/app/shared/templates`
 
 
## Plans
### Feature
 - Support more entity types - pipes, services, etc.
 - Support more dialects - pug, less, etc.
 - Inline editor
 - Reverse engineering - to open already existing projects
 - **Do you have something in mind? Let us know!**

### OSS plans
 - Detailed documentation
 - Public roadmap
 - Open discussions

## Branching

  Follow the recommended [git flow](http://nvie.com/posts/a-successful-git-branching-model/) branching model!
  
## Changelog
  
### 2016-09-03, Angular 2 RC.6
  Had to manually rewrite a line in node_modules/@angular2-material/core/gestures/MdGEstureConfig.d.ts ->
  Switch HammerManager to any.
