# File Share Server

Real time file sharing server for BlendWebMix '14

## Goals

* Samples for a "real time" (meaning downloads can start while upload is not finished) file sharing server
* Demo of `pending-streams` module

## Tags

* `01-naive-single` very naive implementation: one upload at a time, one download each
* `02-naive-multiple` allows multiple uploads (using uuid)
* `03-pending-streams` allows multiple downloads even after end of upload
* `04-error-handling` basic error handling, remember to listen for "error" event all the time!

## Instructions

```sh
npm install
node server
# now open http://localhost:8000
```
