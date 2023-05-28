import app from "./index.js";

app.listen(process.env.PORT || 8080, function () {
  console.log(
    `CORS-enabled web server listening on port ${process.env.PORT || 8080}`
  );
});
