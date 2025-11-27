import "./About.css"
export default function About() {
  return (
    <main className="cv-page">
      {/* Header */}
      <header className="cv-header">
        <div className="cv-title">
          <h1>AINUN JARIYA</h1>
          <div className="cv-role">Full Stack Engineer - Backend</div>
        </div>
        <div className="cv-meta">
          <div>Bandung, Indonesia</div>
          <div>
            Phone: <a href="tel:+6282316680947">(+62)823 1668 0947</a>
          </div>
          <div>
            Email:{" "}
            <a href="mailto:ainunjariya365@gmail.com">
              ainunjariya365@gmail.com
            </a>
          </div>
          <div>
            Github:{" "}
            <a href="https://github.com/ainun-jariya" target="_blank" rel="noreferrer">
              ainun-jariya
            </a>
          </div>
          <div>
            LinkedIn:{" "}
            <a href="https://www.linkedin.com/in/ainun-jariya" target="_blank" rel="noreferrer">
              ainun-jariya
            </a>
          </div>
          <div>
            Hackerrank:{" "}
            <a href="https://www.hackerrank.com/ainunjariva" target="_blank" rel="noreferrer">
              ainunjariya
            </a>
          </div>
        </div>
      </header>

      {/* Skills */}
      <section className="cv-card">
        <h2>Skills</h2>
        <div className="cv-icons">
          {/* skillicons.dev usage */}
          <img src="https://skillicons.dev/icons?i=laravel,postgres,ts,nodejs,kafka,react,docker,rails,github,git,mongodb,gcp" alt="skills" />
        </div>
      </section>

      {/* Strengths */}
      <section className="cv-card">
        <h2>Key Strengths</h2>
        <ul>
          <li>Very adaptable across tech stacks</li>
          <li>High ownership over tasks</li>
          <li>Comfortable with async communication and remote work</li>
          <li>Able to convert vague ideas into working systems</li>
          <li>Architecture-first thinker</li>
          <li>Uses AI heavily to enhance productivity</li>
        </ul>
      </section>

      {/* Additional Info */}
      <section className="cv-card">
        <h2>Additional Information</h2>
        <p>
          <strong>Languages:</strong> English (Professional), Indonesian (Native)
        </p>
        <p>
          <strong>Interests:</strong> Reverse engineer, Data extraction, UI/UX design, server stuff
        </p>
      </section>

      <footer className="cv-footer">
        Love the drama of tricky requirements. — Powered by cats purr
      </footer>
    </main>
  );
};

