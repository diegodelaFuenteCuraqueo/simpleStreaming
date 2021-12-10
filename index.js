const hls = new Hls()

const video       = document.getElementById('video')
const btnSource   = document.getElementById('btnSourceLink')
const btnPlay     = document.getElementById('btnPlay')
const btn5secFor  = document.getElementById('btn5secFor')
const btn5secBack = document.getElementById('btn5secBack')
const rngVolume   = document.getElementById('rngVolume')
const rngSpeed    = document.getElementById('rngSpeed')
const rngTransport= document.getElementById('rngTransport')

const currentLevel = document.getElementById("tdCurrentLevel")

let sourceLink = "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8"

btnSource.addEventListener('click', () => {
  sourceLink = document.getElementById('sourceLink').value
  configHLS()
})

btnPlay.addEventListener('click', () => {
  if(video.paused){
    btnPlay.innerText = "Pause"
    video.play()
  }else if(!video.paused){
    btnPlay.innerText = "Play"
  video.pause() 
  }
})

btn5secBack.addEventListener('click', () => video.currentTime -= 5)
btn5secFor.addEventListener('click', () => video.currentTime += 5)
rngVolume.addEventListener('change', () => video.volume = rngVolume.value*0.01)
rngSpeed.addEventListener('change', () => video.playbackRate = rngSpeed.value*0.01)
rngTransport.addEventListener('click', () => video.currentTime = (rngTransport.value/1000) * video.duration)
currentLevel.addEventListener('change', () => hls.currentLevel = currentLevel.value)

setInterval(() => {
  rngTransport.value = (video.currentTime/video.duration) * 1000
  document.getElementById("tdLevels").innerHTML = hls.levels.length
  currentLevel.value = hls.currentLevel
  currentLevel.max = hls.levels.length - 1

  level = hls.levels[hls.currentLevel]

  document.getElementById("tdVideoCodec").innerHTML = level.videoCodec
  document.getElementById("tdAudioCodec").innerHTML = level.audioCodec
  document.getElementById("tdDimensions").innerHTML = ` ${level.width} : ${level.height}`
  document.getElementById("tdDuration").innerHTML   = level.details.totalduration
  document.getElementById("tdFragments").innerHTML = level.details.fragments.length
  document.getElementById("tdLive").innerHTML       = level.details.live

}, 1000)

const configHLS = () => {
  if (Hls.isSupported()) {

    hls.attachMedia(video)
    hls.on(Hls.Events.MEDIA_ATTACHED, () => {

      hls.loadSource(sourceLink)

      hls.on(Hls.Events.MANIFEST_PARSED,  (event, data) => {
        
        //console.log(event)
        //console.log(data)
      })
      console.log( )

      //console.log(hls)
      //console.log(Object.keys(hls))
    })
  }

}

