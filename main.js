song1 = "";
song2 = "";
scoreLeftWrist = 0;
song1_status = "";
song2_status = "";

leftWristX = 0;
leftWristy = 0;

rightWristX = 0;
rightWristY = 0;

function preload()
{
    song1 = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
}

function setup()
{
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded()
{
    console.log("PoseNet is Initialized");
}

function gotPoses(results)
{
    if(results.length > 0)
    {
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        scoreLeftWrist = results[0].pose.keypoints[9].score;

        console.log("Left Wrist X = " + leftWristX + " Left Wrist Y = " + leftWristY);


        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;

        console.log("Right Wrist X = " + rightWristX + " Right Wrist Y = " + rightWristY);
    }
}


function draw()
{
    image(video, 0, 0, 600, 500);

    fill('green')
    stroke('red');

    song1_status = song1.isPlaying();
    song2_staus = song2.isPlaying();

    if(scoreLeftWrist > 0.2)
    {
        circle(leftWristX, leftWristY, 30);
        song1.stop();
        if(song2_status == false)
        {
            song2.play();
            document.getElementById("song_name").innerHTML = "Song = Peter Pan";
        }
    }
}

