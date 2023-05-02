let images = [];
let numImages = 83;
let imgIndex = 0;

let video;
let pose;

let poses = [];
let poseNet;

let smoothedNoseX = 0;
let smoothingFactor = 1;

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
 video.size(width, height);
 video.hide();

 // Create a new poseNet object
 poseNet = ml5.poseNet(video, modelReady);
 poseNet.on("pose", gotPoses);
}

function draw() {

  // Mirror the image to be more friendly for the viewer
  translate(width, 0);
  scale(-1, 1);

  if (pose) {
    let pointPercent = smoothedNoseX / width;
    let imgIndex = floor(pointPercent * numImages) + 1;
    //adding constrain as if we go over the width of the canvas the program stops
    imgIndex = constrain(imgIndex, 1, numImages);
    let img = images[imgIndex];
    image(img, 0, 0, width, height);
  }
  

  if (pose) {
    fill(150,0,0);
    ellipse(smoothedNoseX, pose.nose.y, 2);
  }
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function modelReady() {
  console.log("Model is working");
}

function gotPoses(poses) {
  console.log(poses);
  // poses = results;
  if (poses.length > 0) {
    pose = poses[0].pose;
    let newNoseX = pose.nose.x;
    smoothedNoseX = lerp(smoothedNoseX, newNoseX, smoothingFactor);
  }
}