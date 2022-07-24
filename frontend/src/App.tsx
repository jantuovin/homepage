import { useState, useEffect } from "react";

import DefaultPicture from "./components/DefaultPicture";
import Credits, { CreditsProps } from "./components/Credits";
import YouTubeIframe from "./components/YoutubeIframe";
import useFetch from "./hooks/useFetch";

interface PersonApiData extends CreditsProps {
  favouriteVideos: {
    title: string;
    src: string;
  }[];
}

export const App = () => {
  const MAX_CHANNELS = 8;
  const [channel, setChannel] = useState(0);

  const { doFetch: fetchPerson, data: personApiData } =
    useFetch<PersonApiData>("/api/person/1");

  useEffect(() => {
    fetchPerson();
  }, []);

  const handleChannelButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    const newChannel = channel + 1;
    const rotationDegrees = (360 / MAX_CHANNELS) * newChannel;
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
    if (channel === 0) {
      return <DefaultPicture className="dead-picture" />;
    } else if (personApiData && channel === 6) {
      const { name, github, linkedin, experiences } = personApiData;
      return (
        <Credits
          name={name}
          github={github}
          linkedin={linkedin}
          experiences={experiences}
        />
      );
    } else if (
      personApiData &&
      channel <= personApiData.favouriteVideos.length
    ) {
      const { src, title } = personApiData.favouriteVideos[channel - 1];
      return <YouTubeIframe src={src} title={title} />;
    } else {
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
