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

   - `npm install --save mongo mongoose`
   - Run mongodb server via docker
     - `docker run --name mongodb --rm -d -p 27017:27017 -v meidish-mongo:/data/db mongo`
   - mongodb atlas

4. install utilities

   1. env-cmd
      `npm install --save-dev env-cmd`
   2. chalk
      `npm install --save chalk@^4`
   3. morgan
      - `npm install --save morgan`
      - `npm install --save-dev @types/morgan`
   4. bcryptjs
   5. jsonwebtoken
   6. validator

5. testing setup

6. Connect to AWS S3 for images
