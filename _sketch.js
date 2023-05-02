let images = [];
let numImages = 83;
let imgIndex = 0;
let poses = [];
let poseNet;

function preload() {
  for (let i = 1; i <= numImages; i++) {
    let imageName = "morph" + nf(i, 5) + ".png";
    images[i] = loadImage("images/" + imageName);
  }
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);

 // Create a new video capture object
 video = createCapture(VIDEO);
 video.hide();

 // Create a new poseNet object
 poseNet = ml5.poseNet(video, modelReady);
 poseNet.on("pose", gotPoses);
}

function draw() {

  let mouseXPercent = mouseX / width;
  let imgIndex = floor(mouseXPercent * numImages) + 1;
  imgIndex = constrain(imgIndex, 1, numImages);
  let img = images[imgIndex];
  image(img, 0, 0, width, height);
}

// function draw() {
//   // Draw the video to the canvas
//   image(video, 0, 0, width, height);

//   // Draw the images based on the nose position
//   if (poses.length > 0) {
//     let nose = poses[0].pose.keypoints[0];
//     if (nose) {
//       let y = nose.position.y;
//       let mappedY = map(y, 0, video.height, 0, height);
//       // use mappedY to move the images
//     }
//   }

//     for (let i = 0; i < images.length; i++) {
//       let imgX = map(i, 0, images.length - 1, 0, width);
//       let imgY = y;
//       let imgWidth = map(i, 0, images.length - 1, 50, 150);
//       let imgHeight = imgWidth * (images[i].height / images[i].width);
//       image(images[i], imgX, imgY, imgWidth, imgHeight);
//     }
//   }



function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function modelReady() {
  console.log("Model ready");
}

function gotPoses(results) {
  poses = results;
}