export default function About() {
  return (
    <section className="about wrap" id="about">
      <div className="about-image">
        <img src="/assets/work/aryan.webp" alt="Aryan outdoors by the water in Sydney" width="900" height="1195" loading="lazy" decoding="async" />
        <span className="image-label mono">ARYAN RAI / SYDNEY</span>
      </div>
      <div>
        <p className="eyebrow">04 / THE PERSON</p>
        <h2>Hardware person.<br />Software person.<br /><em>Curious person.</em></h2>
        <p>Mechatronic engineering student at the University of Sydney, working at the intersection of electronics, embedded software and robotics.</p>
        <p>I enjoy the whole system: designing a board, writing the firmware, making sense of a sensor, and building an interface that makes the result useful.</p>
        <div className="skills">
          <div><h3>Sense & move</h3><p>ROS 2, SLAM, OpenCV, motion planning, teleoperation, robot learning</p></div>
          <div><h3>Build & connect</h3><p>STM32, Teensy, Jetson, CAN, MAVLink, KiCad, SolidWorks</p></div>
          <div><h3>Code & simulate</h3><p>C/C++, Python, TypeScript, Isaac Sim, MuJoCo, Gazebo, Linux</p></div>
        </div>
        <a className="text-link" href="/resume.html">Experience summary ↗</a>
      </div>
    </section>
  )
}
