import { useRef, useMemo } from "react";

import useAnimationFrame from "../hooks/useAnimationFrame";

export interface CreditsProps {
  name: string;
  email: string;
  experiences: {
    title: string;
    description: string;
    type: "education" | "employment";
  }[];
}

const Credits: React.FC<CreditsProps> = ({ name, email, experiences }) => {
  const creditsRef = useRef<HTMLDivElement>(null);

  const employmentHistory = useMemo(() => {
    return experiences.filter((e) => e.type === "employment");
  }, [experiences]);

  const education = useMemo(() => {
    return experiences.filter((e) => e.type === "education");
  }, [experiences]);

  const scrollCredits = () => {
    if (creditsRef.current) {
      creditsRef.current.scrollTop = creditsRef.current.scrollTop + 1;
    }
  };

  useAnimationFrame(() => scrollCredits());

  return (
    <article className="picture credits" ref={creditsRef}>
      <section>
        <h1>
          <span>Develop by</span>
          <br />
          {name}
        </h1>
      </section>

      <section>
        <h2>Employment history</h2>

        <dl>
          {employmentHistory.map((e, i) => {
            return (
              <div key={i}>
                <dt>{e.title}</dt>
                <dd>{e.description}</dd>
              </div>
            );
          })}
        </dl>
      </section>

      <section>
        <h2>Education</h2>

        <dl>
          {education.map((e, i) => {
            return (
              <div key={i}>
                <dt>{e.title}</dt>
                <dd>{e.description}</dd>
              </div>
            );
          })}
        </dl>
      </section>

      <section>
        <h2>Find me</h2>

        <dl>
          <div>
            <dt>email</dt>
            <dd>{email}</dd>
          </div>
        </dl>
      </section>
    </article>
  );
};

export default Credits;
