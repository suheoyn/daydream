import React, { useState } from 'react';
import './App.css';
import cursorImage from './images/hand.png'; // 마우스 따라다닐 이미지
import image1 from './images/1.png'; // 첫 번째 이미지
import image2 from './images/2.png'; // 두 번째 이미지
import image3 from './images/3.png'; // 세 번째 이미지
import video1 from './images/c.mp4'; // 첫 번째 영상
import video2 from './images/2.mp4'; // 두 번째 영상
import video3 from './images/3.mp4'; // 세 번째 영상


export default function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  // 마우스 이동에 따른 위치 설정
  const handleMouseMove = (event) => {
    setPosition({ x: event.clientX, y: event.clientY });
  };

  // 클릭 시 해당하는 영상 재생
  const handleImageClick = (video) => {
    setCurrentVideo(video);
    setIsPlaying(true);
    setIsFadingOut(false);
  };
 
  
  // 영상 종료 후 페이드 아웃 처리
  const handleVideoEnd = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      setIsPlaying(false);
      setCurrentVideo(null);
    }, 1000); // 1초 후 영상 종료
  };

  // 영상 클릭 시 메인 화면으로 돌아가기
  const handleVideoClick = (event) => {
    event.stopPropagation(); // 영상 클릭 시 오버레이 닫히는 것 방지
  };


  // 마우스 이벤트 리스너 추가
  React.useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <main className="main">
      {/* 배경 이미지 */}
      <div className="background"></div>

      
      {/* 클릭할 수 있는 3개의 이미지 */}
      <div className="image-container">
        <img src={image1} alt="image1" className="clickable-image image1" onClick={() => handleImageClick(video1)} />
        <img src={image2} alt="image2" className="clickable-image image2" onClick={() => handleImageClick(video2)} />
        <img src={image3} alt="image3" className="clickable-image image3" onClick={() => handleImageClick(video3)} />
      </div>

      {/* 영상 */}
      {isPlaying && (
        <div className={`video-overlay ${isFadingOut ? 'fade-out' : 'fade-in'}`}>
          <video
            src={currentVideo}
            autoPlay
            onEnded={handleVideoEnd}
            onClick={handleVideoClick}
            className="video-player"
            playsInline
          />
        </div>
      )}

    {/* 마우스 커서 따라다니는 이미지 (isPlaying이 false일 때만 표시) */}
      {!isPlaying && (
        <img
          src={cursorImage}
          alt="cursor"
          className="cursor"
          style={{
            left: position.x,
            top: position.y,
          }}
        />
      )}
    </main>
  );
}
