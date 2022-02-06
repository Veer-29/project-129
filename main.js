song1 = "";
song2 = "";

scoreLeft = 0;
scoreRight = 0;

song1_status = "";
song2_status = "";

leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;

function preload()
{
	song1 = loadSound("Despacito.mp3");
	song2 = loadSound("Believer.mp3");
}

function setup() {
    canvas = createCanvas(600,550);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded() {
    console.log('poseNet is Initialized');
}

function gotPoses(results)
{
  if(results.length > 0)
  {
	console.log(results);
	
	scoreLeft=results[0].pose.keypoints[9].score;
	scoreRight=results[0].pose.keypoints[10].score;
	console.log("scoreLeft = " + scoreLeft + " scoreRight = " + scoreRight);

	rightWristX = results[0].pose.rightWrist.x;
	rightWristY = results[0].pose.rightWrist.y;
	console.log("rightWristX = " + rightWristX +" rightWristY = "+ rightWristY);

	leftWristX = results[0].pose.leftWrist.x;
	leftWristY = results[0].pose.leftWrist.y;
	console.log("leftWristX = " + leftWristX +" leftWristY = "+ leftWristY);
  }
}


function draw() {
	image(video, 0, 0, 600, 550);
	
	song1_status = song1.isPlaying();
	song2_status = song2.isPlaying();

	fill("#FF0000");
	stroke("#FF0000");


	if(scoreLeft > 0.2)
	{
		circle( leftWristX, leftWristY,20);
		numberleftWristY=Number(leftWristY);
		remove_decimals=floor(NumberleftWristY);
		volume=remove_decimals/500;
		song1.setVolume(volume);
		document.getElementById("volume").innerHTML="volume ="+volume;
		song1.stop();
		if(song2_status == false)
		{
			song2.play();
			document.getElementById("song").innerHTML="Playing - Believer song"
		}
	}
}

function play() {
    song1.play();
    song.setVolume(1);
}

function stop() {
    song1.pause();
}