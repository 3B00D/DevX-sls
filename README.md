# DevX-sls


## Before you start 
Make sure that you have installed and configured aws cli... here is a useful link to follow if this is the first time you are doing it : 
1- Installing AWS cli:
  
  ```
  http://docs.aws.amazon.com/cli/latest/userguide/installing.html
  ```
2- Configuring AWS cli:

  ```
  http://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-started.html
  ```

## Installation 
- Clone the repo:

  ```
  git clone git@github.com:3B00D/DevX-sls.git
  ```
- Change working directory to the project folder:
  
  ```
  cd DevX-sls
  ```
- Install serverless framework *( skip if you already did it before )*:

  ```
  npm install -g serverless
  ```
- Install required packages:
  
  ```
  npm install
  ```
- Update the config:

  ```
  custom:
    dev:
      InputBucket: {INSERT YOUR BUCKET NAME HERE}
      OutputBucket: {INSERT YOUR BUCKET NAME HERE}
    staging:
      InputBucket: {INSERT YOUR BUCKET NAME HERE}
      OutputBucket: {INSERT YOUR BUCKET NAME HERE}
  ```
- Deploy your function to your AWS account:

  ```
  sls deploy -s dev
  ```
  
*And now you are ready to drop mp4 video files and see the results in your output bucket!*