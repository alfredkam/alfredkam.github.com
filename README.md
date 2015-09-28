[![wercker status](https://app.wercker.com/status/2a228fbab01a79181013b530621b11c6/s “wercker status”)](https://app.wercker.com/project/bykey/2a228fbab01a79181013b530621b11c6)

##Just a blog for my rants
Used to be in wordpress -> Jekyll -> Hugo -> docker w/ Hugo

##Usage
hugo server -w
webpack --watch

##Attach a random image for each post
This script will automatically scrape the image director and replace the line of ```img``` with a random image.
```bash`
node randomImage #for attaching a random image to each post
node buildJson #for search
```

##Deploy
git push <dokku> hugo:master
