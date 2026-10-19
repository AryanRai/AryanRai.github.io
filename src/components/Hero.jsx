export default function Hero() {
  return (
    <section className="hero wrap" id="home">
      <div className="hero-bar">
        <div className="hero-meta">
          <span className="hero-status">
            <span className="status-dot" />
            Mechatronic Engineer
          </span>
          <span className="hero-status mono">Sydney, AU · Open to work</span>
        </div>
        <p className="hero-desc">
          Building robots, embedded systems, and the software to operate them.
          Currently at Imitation Machines, co-founder of Perception.
        </p>
      </div>
      <h1 className="hero-name">Aryan<br />Rai</h1>
      <div className="hero-strip">
        <div className="hero-photo">
          <img src="/assets/work/skateboard.webp" alt="An early electric skateboard build" width="1500" height="1125" loading="eager" decoding="async" />
          <span>01 / THE FIRST EXPERIMENTS</span>
        </div>
        <div className="hero-photo">
          <img src="/assets/work/rover.webp" alt="The SIRI rover at an event" width="1500" height="1170" loading="eager" decoding="async" />
          <span>02 / BUILDING TOGETHER</span>
        </div>
        <div className="hero-photo">
          <img src="/assets/work/orbit.webp" alt="Orbit mission planning interface" width="1600" height="903" loading="eager" decoding="async" />
          <span>03 / WHAT COMES NEXT</span>
        </div>
      </div>
      <div className="hero-caption">
        <span>From a workbench at home to robots in the real world.</span>
        <span className="mono">2026</span>
      </div>
    </section>
  )
}
