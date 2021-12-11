const hls = new Hls()

const video       = document.getElementById('video')
const btnSource   = document.getElementById('btnSourceLink')
const btnPlay     = document.getElementById('btnPlay')
const btn5secFor  = document.getElementById('btn5secFor')
const btn5secBack = document.getElementById('btn5secBack')
const rngVolume   = document.getElementById('rngVolume')
const rngSpeed    = document.getElementById('rngSpeed')
const rngTransport= document.getElementById('rngTransport')
const currentLevel= document.getElementById("tdCurrentLevel")
let sourceLink = "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8"

//Event Listeners
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

//Transport controls
btn5secBack.addEventListener('click', () => video.currentTime -= 5)
btn5secFor.addEventListener('click', () => video.currentTime += 5)
rngVolume.addEventListener('change', () => video.volume = rngVolume.value*0.01)
rngSpeed.addEventListener('change', () => video.playbackRate = rngSpeed.value*0.01)
rngTransport.addEventListener('click', () => video.currentTime = (rngTransport.value/1000) * video.duration)

currentLevel.addEventListener('change', () => {
  hls.currentLevel = currentLevel.value
  document.getElementById("tdLevels").innerHTML = hls.levels.length

  levelData = hls.levels[hls.currentLevel]
  setMediaPropertiesTable(levelData)
  setHLSpropiertiesTable(levelData.details)
})

//playbar
setInterval(() => {
  rngTransport.value = (video.currentTime/video.duration) * 1000
  document.getElementById("pTime").innerHTML = secondToMMss(video.currentTime * 1000)
}, 1000)

//Functions
const configHLS = () => {
  if (Hls.isSupported()) {

    hls.attachMedia(video)
    hls.on(Hls.Events.MEDIA_ATTACHED, () => {

      hls.loadSource(sourceLink)
      hls.on(Hls.Events.MANIFEST_PARSED,  (event, data) => {
        console.log(event)
        console.log(data)
        currentLevel.value = data.firstLevel
        currentLevel.max = data.levels.length
        document.getElementById("tdLevels").innerHTML =data.levels.length
        setMediaPropertiesTable( data.levels[currentLevel.value])
      })
    })
  }
}

//sets data for tables
const setMediaPropertiesTable = (levelData) => {
  document.getElementById("tdVideoCodec").innerHTML = levelData.videoCodec
  document.getElementById("tdAudioCodec").innerHTML = levelData.audioCodec
  document.getElementById("tdDimensions").innerHTML = `${levelData.width} : ${levelData.height}`
}

const setHLSpropiertiesTable = (levelData) => {
  document.getElementById("tdDuration").innerHTML   = levelData.totalduration
  document.getElementById("tdFragments").innerHTML  = levelData.fragments.length
  document.getElementById("tdLive").innerHTML       = levelData.live
}

const secondToMMss = seconds => new Date(seconds).toISOString().substr(11, 8)
