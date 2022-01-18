# meidish-api

## Development Steps

1. init npm and typescript and setup tsconfig.ts

   ```json
   // tsconfig.json
   {
     "target": "ES2016",
     "module": "commonjs",
     "rootDir": "./src",
     /* "moduleResolution": "node", */
     "outDir": "./build"
   }
   ```

2. Install Expresst

   - `npm install --save express nodemon concurrently`
   - `npm install --save-dev @types/node @types/express`

3. Install Mongoose and set it up

   - mongodb atlas

4. install utilities

   1. chalk
   2. morgan
   3. bcryptjs=
   4. jsonwebtoken
   5. validator

5. Connect to AWS S3 for images
