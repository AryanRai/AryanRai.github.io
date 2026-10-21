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
        <p>I'm interested in how AI models work on real robots: machine learning, perception, computer vision, and the hardware underneath. My work includes imitation learning and robot integration; reinforcement learning (RL) is another direction I want to explore.</p>
        <p>I like being able to move between those layers - from an AI model or a simulation to embedded firmware, electronics, and space hardware.</p>
        <div className="skills">
          <div><h3>AI, learning & perception</h3><p>Machine learning (ML), imitation learning, vision-language-action models, PyTorch, computer vision, OpenCV, SLAM</p></div>
          <div><h3>Robotics & embedded systems</h3><p>ROS 2, motion planning, teleoperation, STM32, Teensy, Jetson, CAN, MAVLink, KiCad, SolidWorks</p></div>
          <div><h3>Code & simulate</h3><p>C/C++, Python, TypeScript, Isaac Sim, MuJoCo, Gazebo, Linux</p></div>
        </div>
        <a className="text-link" href="/resume.html">Experience summary ↗</a>
      </div>
    </section>
  )
}
