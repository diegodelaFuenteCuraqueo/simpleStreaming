const hls = new Hls()

const video       = document.getElementById('video')
const btnPlay     = document.getElementById('btnPlay')
const btn5secFor  = document.getElementById('btn5secFor')
const btn5secBack = document.getElementById('btn5secBack')
const rngVolume   = document.getElementById('rngVolume')
const rngSpeed    = document.getElementById('rngSpeed')
const rngTransport= document.getElementById('rngTransport')

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
rngTransport.addEventListener("click", () => video.currentTime = (rngTransport.value/1000) * video.duration)
setInterval(() => rngTransport.value = (video.currentTime/video.duration) * 1000, 1000)

if (Hls.isSupported()) {

  hls.attachMedia(video)
  hls.on(Hls.Events.MEDIA_ATTACHED, () => {

    hls.loadSource("https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8")

    hls.on(Hls.Events.MANIFEST_PARSED,  (event, data) => {
      console.log(event)
      console.log(data)
    })
    console.log(hls)
    console.log(Object.keys(hls))
  })
}