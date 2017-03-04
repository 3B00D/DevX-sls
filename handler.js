var AWS = require('aws-sdk')
var async = require('async')
var childProcess = require('child_process')

var S3 = new AWS.S3()
var outputBucket = process.env.OutputBucket

module.exports.extractInfo = (event, context, callback) => {
  // force lambda to be killed after calling the callback
  context.callbackWaitsForEmptyEventLoop = false
  // set the input file name, input bucket, and output file name.
  var s3File = event.Records[0].s3.object.key
  var s3Bucket = event.Records[0].s3.bucket.name
  var outputFileName = s3File + '.info.json'
  // Run a list of functions sequentially
  async.waterfall([
    // get object signed url to make it accessible via http/https requests.
    function (onEnd) {
      var params = {
        Key: s3File,
        Bucket: s3Bucket
      }
      S3.getSignedUrl('getObject', params, function (err, url) {
        if (err) {
          console.log('failed to get signed url.')
        } else {
          console.log('signed url is : ', url)
        }
        onEnd(err, url)
      })
    },
    // run ffmpeg to extract information about the video file in a json format.
    function (url, onEnd) {
      var cmd = 'bin/ffprobe -v quiet -print_format json -show_format -show_streams "' + url + '"'
      childProcess.exec(cmd, function (error, stdout, stderr) {
        if (error) {
          console.log('failed to get file information.')
        } else {
          console.log('extracted info is : ', stdout)
        }
        onEnd(error, stdout)
      })
    },
    // save the extracted info to S3.
    function (info, onEnd) {
      var param = {
        Bucket: outputBucket,
        Key: outputFileName,
        Body: info,
        ContentType: 'application/json'
      }
      S3.putObject(param, onEnd)
    }
  ], function (err) {
    console.log('info extraction finished, error was : ', err)
    callback(err)
  })
}
