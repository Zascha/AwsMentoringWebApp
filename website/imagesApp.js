const express = require("express");
const bodyParser = require('body-parser');
const upload = require('./upload');
const app = express();

const rdsRepository = require('./imagesRdsRepository');
const s3Repository = require('./imagesS3Repository');
const snsRepository = require('./imagesSnsRepository');
const sqsRepository = require('./imagesSqsRepository');
const lambdaRepository = require('./imagesLambdaRepository');

const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.listen(port, () => console.log(`Images App is listening on port ${port}`));

app.get('/', (req, res) => {
  res.send('Images App is working here.');
});

// Get all images metadata
app.get("/images", (req, res) => {
  const callback = (data) => res.json(data);
  rdsRepository.getAll(callback);
});

// Get image metadata
app.get("/image/:guid", (req, res) => {
  const guid = req.params.guid;
  const callback = (data) => res.json(data);
  rdsRepository.get(guid, callback);
});

// Upload image
app.post("/image", upload.single("image"), (req, res) => {
  const name = req.file.originalname.split('.')[0];
  const format = req.file.originalname.split('.')[1];
  const size = req.file.size;

  rdsRepository.upload(name, format, size, async (guid) => {
    await s3Repository.upload(req.file);
    var title = "A new image has been added.";
    var imageMetadata = {
      "name": name,
      "format": format,
      "size": size,
      "guid": guid
    };
    sqsRepository.send(title, JSON.stringify(imageMetadata));
    res.send(guid);
  });
});

// Download image
app.get("/image/download/:guid", (req, res) => {
  const guid = req.params.guid;

  rdsRepository.getName(guid, (result) => {
    const fileName = result[0].fileName;
    const imageStream = s3Repository.download(fileName);
    imageStream.pipe(res);
  });
});

// Delete image
app.delete("/image/:guid", (req, res) => {
  const guid = req.params.guid;
  const callback = (data) => res.send(`Image '${guid}' is deleted.`);
  rdsRepository.delete(guid, callback);
});

// Subscribe to notifications
app.post("/subscribe", (req, res) => {
  var email = req.body.Email;
  const callback = (data) => res.send(`'${email}' has been subscribed. Check the mailbox.`);
  snsRepository.subscribe(email, callback);
});

// Unsubscribe to notifications
app.post("/unsubscribe", (req, res) => {
  var email = req.body.Email;
  const callback = (data) => res.send(`'${email}' has been unsubscribed.`);
  snsRepository.unsubscribe(email, callback);
});

// Trigger UploadsNotifier Lambda
app.post("/trigger", async (req, res) => {
  await lambdaRepository.trigger();
  res.send("Lambda is triggered");
});
