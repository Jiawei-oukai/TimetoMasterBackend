import app from "./src/app.js";

// const port = 9001;

// app.listen(port, () => console.log(`time to master app is running on ${port}`));


const port = process.env.PORT || 8080;


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
