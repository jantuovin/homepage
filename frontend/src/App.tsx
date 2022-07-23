import { useState, useEffect } from "react";

import DefaultPicture from "./components/DefaultPicture";
import Credits, { CreditsProps } from "./components/Credits";
import YouTubeIframe from "./components/YoutubeIframe";
import useFetch from "./hooks/useFetch";

export const App = () => {
  const [channel, setChannel] = useState(0);

  const { doFetch: fetchCredits, data: creditsData } =
    useFetch<CreditsProps>("/api/person/1");

  useEffect(() => {
    fetchCredits();
  }, []);

  const handleChannelButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    const newChannel = channel + 1;
    const rotationDegrees = 45 * newChannel;
    const channelButton: HTMLButtonElement = event.currentTarget;
    channelButton.style.setProperty(
      "--rotation-angle",
      `${rotationDegrees}deg`
    );

    if (rotationDegrees % 360 !== 0) {
      setChannel(newChannel);
    } else {
      setChannel(0);
    }
  };

  const getPicture = (channel: number) => {
    switch (channel) {
      case 0:
        return <DefaultPicture className="dead-picture" />;
      case 1:
        return (
          <YouTubeIframe
            src="https://www.youtube-nocookie.com/embed/VbEv8C9Cff0?start=63"
            title="Prince Purle Rain live show"
          />
        );
      case 2:
        return (
          <YouTubeIframe
            src="https://www.youtube-nocookie.com/embed/IZAj3cRF99E?start=408"
            title="Football world cup 1994 final Brazil versus Italy"
          />
        );
      case 3:
        return (
          <YouTubeIframe
            src="https://www.youtube-nocookie.com/embed/lc0UehYemQA?start=30"
            title="Jurassic park 1993 trailer"
          />
        );
      case 4:
        return (
          <YouTubeIframe
            src="https://www.youtube-nocookie.com/embed/CrATmeFoJPE?start=1"
            title="Super Mario Bros 3 trailer"
          />
        );
      case 5:
        return (
          <YouTubeIframe
            src="https://www.youtube-nocookie.com/embed/aPzS3QYb868?start=21"
            title="The Simpsons intro"
          />
        );
      case 6:
        return (
          <>
            {creditsData && (
              <Credits
                name={creditsData.name}
                github={creditsData.github}
                linkedin={creditsData.linkedin}
                experiences={creditsData.experiences}
              />
            )}
          </>
        );
      default:
        return <DefaultPicture className="test-picture" />;
    }
  };

  return (
    <main>
      <div className="tv-container">
        <div className="tv">
          <div className="bezel">
            <div
              id="monitor"
              className="monitor"
              role="region"
              aria-live="polite"
            >
              {getPicture(channel)}
            </div>
          </div>

          <div className="side-panel">
            <button
              className="channel-button"
              title="Change channel"
              onClick={handleChannelButtonClick}
              aria-controls="monitor"
            >
              <div className="channel-button-dial">
                <div className="channel-button-dial-pointer"></div>
              </div>
            </button>

            <div className="decoration-small"></div>
            <div className="decoration-small"></div>
            <div className="decoration-big"></div>
          </div>
        </div>

        <div className="stand"></div>
      </div>
    </main>
  );
};
