# E-Study GraphQL API


## Project Description
This is API for e-study companies. You can use most of function inside real study with this API.
You can become STUDENT or TEACHER. SO if you wish be teacher and publish own course (live-course) or
be student, join current course (live-course).


 ## Installation Instructions
 Install dependencies:
```sh
$ yarn install
``` 
or 

```sh
$ npm install
``` 

You will need MongoDB connection url and your e-mail config  for e-mail sender services.
After geting a MongoDB connection url  update `DATABASE_LINK` environment variable value in the `.env` file.
Also you must write e-mail adress and password according `EMAIL` and `EMAIL_PASSWORD` environment vairable value in the 
`.env` file.


## Get Started
Please run commands below. Then you can start editing the page by modifying `src/index.js`. 


Run for development 

```sh
$ npm run dev 
```

 Run for production 

```sh
$ npm start
```

Linting and Prettier  

```sh
$ npm run lint 
 #and
$ npm run prettier
```


## Info 

For any issies, contact me with e-mail muradaliyev2229@gmail.com

## License
MIT License - <http://www.opensource.org/licenses/mit-license.php>
