1) This will install project into dist folder: 'npm install'
2) To automatically recompile sources during development run: 'gulp' -- starting server and watch

Gulp tasks available:

name		description

styles		Compile Sass
js		Compile all JS
js:app		Concat and minify all application scripts
js:libs		Concat and minify 3rd parties scripts
copy:images	Copy images into /dist/images
build		Run all tasks above
clean		Removes /dist folder
server		Started localserver
watch		Watch all sources