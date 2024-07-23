import express from "express";
import { ApolloServer } from "apollo-server-express";
import multer from "multer";
import cors from "cors";
//Mongoose Connections
import {} from "./models/db.js";

import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";
import resolvers from "./graphql/resolvers/resolvers.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

const typeDefs = fs.readFileSync(
  path.join(__dirname, "graphql/schemas/schema.graphql"),
  "utf-8",
);

const server = new ApolloServer({ typeDefs, resolvers, });

server.start().then(function () {
  server.applyMiddleware({ app, path: "/graphql", cors: true });
});

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const port = process.env.PORT || 3002;
// Start listening
app.listen(port, () => {
  console.log(`Api-Server is ready to use at http://localhost:${port} `);
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = 'uploads/';
    fs.ensureDirSync(uploadPath);             
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const providedName = req.body.filename || req.params.name; 
    const fileExt = path.extname(file.originalname); // Get the file extension
    cb(null, providedName + fileExt); 
  }
}); 


// Initialize upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 10000000 }, // Set file size limit to 10MB
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  }
}).single('myfile'); // Ensure this matches the field name in the form-data

// Check file type
function checkFileType(file, cb) {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images Only!');
  }
}


app.post('/upload/:name?', (req, res) => {
  console.log(req.params.name);
  upload(req, res, (err) => {
    if (err) {
      res.status(400).send(err);
    } else {
      if (req.file == undefined) {
        res.status(400).send('Error: No File Selected!');
      } else {
        res.json({
          message: 'File uploaded successfully!',
          file: `uploads/${req.file.filename}`
        });
      }
    }
  });
});

app.get('/file/:name', (req, res) => {
  const fileName = req.params.name;
  const filePath = path.join(__dirname, 'uploads', fileName);

  fs.pathExists(filePath)
    .then(exists => {
      if (exists) {
        res.sendFile(filePath);
      } else {
        res.status(404).send('Error: File not found');
      }
    })
    .catch(err => {
      res.status(500).send('Error: Could not access the file');
    });
});