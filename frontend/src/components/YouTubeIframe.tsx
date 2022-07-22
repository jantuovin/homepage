interface YouTubeIframeProps {
  src: string;
  title: string;
}

const YouTubeIframe: React.FC<YouTubeIframeProps> = ({ src, title }) => {
  return (
    <div className="picture dead-picture">
      <iframe
        src={`${src}&autoplay=1&mute=1`}
        title={`Youtube player - ${title}`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default YouTubeIframe;
