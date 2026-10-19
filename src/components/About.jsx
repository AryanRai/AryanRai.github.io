export default function About() {
  return (
    <section className="about wrap" id="about">
      <div className="about-image">
        <img src="/assets/work/aryan.webp" alt="Aryan outdoors by the water in Sydney" width="900" height="1195" loading="lazy" decoding="async" />
        <span className="image-label mono">ARYAN RAI / SYDNEY</span>
      </div>
      <div>
        <p className="eyebrow">04 / THE PERSON</p>
        <h2>It started<br /><em>with my dad.</em></h2>
        <p>We built quadcopters, RC cars, and an electric skateboard together. Somewhere between the wiring and getting things to move, electronics became a habit.</p>
        <p>That habit took me to mechatronics at the University of Sydney, space hardware at ANT61, robot learning at Imitation Machines, and co-founding Perception.</p>
        <p>I still like the whole process: design the board, write the firmware, build the interface, and keep going until it works.</p>
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
