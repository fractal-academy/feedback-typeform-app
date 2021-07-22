import React from 'react'
import { ZiggeoRecorder } from 'react-ziggeo'

const API_KEY = 'r1aabb2782dec6629e9650b5c6197c92'

function VideoRecording(props) {
  const {
    onPlaying,
    onPaused,
    onAttached,
    onLoaded,
    onEnded,
    onSeek,
    onError,
    onManuallySubmitted,
    onUploaded,
    onUploadSelected,
    onRecording,
    onUploading,
    onRerecord,
    onCountdown,
    onProcessing,
    onProcessed,
    onRecordingProgress,
    onUploadProgress,
    onAccessForbidden,
    onAccessGranted,
    onCameraUnresponsive,
    onVerified,
    onNoCamera,
    onNoMicrophone
  } = props

  // const [recorder, setRecorder] = useState(null)
  //   const handleUploaded = (embedding) => {
  //     console.log('video uploaded:', embedding.video)
  //   }

  return (
    <ZiggeoRecorder
      locale="en"
      apiKey={API_KEY}
      height="-webkit-fill-available"
      width="-webkit-fill-available"
      theme="minimalist"
      onPlaying={onPlaying}
      onPaused={onPaused}
      onAttached={onAttached}
      onLoaded={onLoaded}
      onEnded={onEnded}
      onSeek={onSeek}
      onError={onError}
      onManuallySubmitted={onManuallySubmitted}
      onUploaded={onUploaded}
      onRecording={onRecording}
      onUploadSelected={onUploadSelected}
      onUploading={onUploading}
      onRerecord={onRerecord}
      onCountdown={onCountdown}
      onProcessing={onProcessing}
      onProcessed={onProcessed}
      onRecordingProgress={onRecordingProgress}
      onUploadProgress={onUploadProgress}
      onAccessForbidden={onAccessForbidden}
      onAccessGranted={onAccessGranted}
      onCameraUnresponsive={onCameraUnresponsive}
      onVerified={onVerified}
      onNoCamera={onNoCamera}
      onNoMicrophone={onNoMicrophone}
      // onRef={(ref) => setRecorder(ref)}
    />
  )
}

export default VideoRecording
