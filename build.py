"""Generate the static portfolio. Python standard library only: python build.py."""
from html import escape as e
from pathlib import Path
import json

ROOT = Path(__file__).parent
DIMENSIONS = json.loads((ROOT/'assets/work/dimensions.json').read_text(encoding='utf-8'))
CANVA = 'https://www.canva.com/design/DAGrMs5FilU/B8yaZq9XQcU6J3cw5SShiA/view'
GITHUB = 'https://github.com/AryanRai'
LINKEDIN = 'https://www.linkedin.com/in/aryan-rai-503a59201/'

def image(name, alt, eager=False):
    width, height = DIMENSIONS[name]
    return f'<img src="assets/work/{name}.webp" alt="{e(alt)}" width="{width}" height="{height}" loading="{"eager" if eager else "lazy"}" decoding="async">'

def link(url, label):
    return f'<a class="text-link" href="{url}" target="_blank" rel="noopener noreferrer">{label} <span aria-hidden="true">↗</span></a>'

projects = [
    ('orbit', 'Orbit / Perception', 'Robotics', 'Current work', 'Mission design to live fleet operations.', 'As co-founder at Perception, I work across hardware, robotics and embedded systems. Orbit brings mission planning, operator-supervised execution, telemetry and video into one workspace. Raven is our reference drone prototype; Orion is our mesh communications work in development.', 'ROS 2 · ArduPilot · MAVLink · GStreamer · KiCad', 'orbit', 'Orbit mission planner with a node editor and 3D map', 'https://prxptn.com', 'Visit Perception'),
    ('imitation', 'Imitation Machines', 'Robotics', 'Mar 2026 - present', 'Helping robots learn from human demonstration.', 'My robotics systems engineering internship spans physical robot integration, simulation, motion planning and teleoperation. I work with the UR10e, Inspire RH56 hand and Elephant Robotics M750, alongside demonstration-data workflows and ACT, Diffusion Policy and VLA models.', 'ROS 2 · Isaac Sim · MuJoCo · PyTorch · LeRobot', 'robot-arm', 'Elephant Robotics arm in the Imitation Machines workspace', '', ''),
    ('rover', 'Sydney Interplanetary Rover Initiative', 'Embedded', 'Mar 2024 - Mar 2026', 'A planetary rover, built together.', 'As Electrical Co-Lead, I led a 17-engineer electrical, embedded and controls team through the Australian Rover Challenge 2026. My work covered power distribution, PCB design, Teensy firmware, CAN motor control and integration of compute, sensing and radios. Rover hardware and photographs represent the collective work of the SIRI team.', 'KiCad · Teensy · C++ · CAN · Jetson', 'rover', 'The SIRI rover on display at a team event', '', ''),
    ('ant61', 'ANT61 / Beacon', 'Embedded', 'Jun - Jul 2025', 'Embedded software for space robotics.', 'During my embedded systems internship at ANT61, I worked on Beacon RevG firmware: GNSS acquisition, UART DMA and interrupt-driven data handling, and CubeSat Space Protocol communications. My focus was making data move reliably between satellite hardware and its companion device.', 'STM32 · C++ · GNSS · libcsp · KISS · CRC32', 'beacon', 'ANT61 Beacon hardware shown in my portfolio', 'https://www.ant61.com/beacon', 'About Beacon'),
    ('satmap', 'SatMap', 'Software', 'May 2025', 'Finding the next connection in orbit.', 'A satellite communications simulation for an ANT61 Beacon-equipped satellite and the Iridium constellation, with 2D and 3D visualisation. Our team won first place at the USRC x ANT61 Space Handshakes Hackathon. I led the technical stack, from the interface and simulation logic to system integration.', 'TypeScript · WebGL · Orbital simulation', 'satmap', 'SatMap visualising a satellite constellation around Earth', 'https://github.com/AryanRai/SatMap', 'Explore the code'),
    ('howyouseeme', 'HowYouSeeMe', 'Robotics', 'Ongoing', 'Giving robots a persistent view of the world.', 'A ROS 2 perception system combining RGB-D geometry, detection, segmentation and face identity into a persistent semantic world state. It connects Kinect v2, ORB-SLAM3, YOLO11, SAM2/FastSAM, InsightFace and TSDF, with Rerun visualisation and an MCP interface.', 'ROS 2 · RGB-D · SLAM · Python · Rerun', 'perception', 'Perception experiments with cameras, sensing and visualisation', 'https://github.com/AryanRai/HowYouSeeMe', 'Explore the code'),
    ('droidcore', 'DroidCore', 'Robotics', 'Ongoing', 'A modular platform for my robotics experiments.', 'A custom robotics platform that brings together mechanical design, electronics and software. The work explores modular mobile robotics, sensor fusion, SLAM and vision. Individual components and integration experiments are part of an ongoing build.', 'Python · Robotics · CAD · Sensor integration', 'droidcore', 'CAD render of the DroidCore mobile robot with an arm', 'https://github.com/AryanRai/DroidCore', 'Explore the code'),
    ('rocketry', 'Rocketry datalogger & test systems', 'Embedded', 'Feb 2024 - Jan 2025', 'From sensor readings to flight and test data.', 'At USYD Rocketry I designed schematics and firmware for an in-house STM32 datalogger, with pressure and temperature acquisition, storage and telemetry. I also built LabJack-based tank-test instrumentation and supporting software as part of the team.', 'STM32 · RS485 · LoRa · LabJack · DAQ', 'rocketry', 'Rocketry instrumentation and test rig on the workbench', '', ''),
    ('uav', 'Sydney UAV / Project FASTR', 'Robotics', 'Feb - Sep 2024', 'Autonomy has to work outside the simulator.', 'I built and calibrated a PX4/Pixhawk quadrotor with Raspberry Pi, ROS 2 and OpenCV, contributed to onboard navigation work and served as primary pilot for field testing with the Sydney UAV team.', 'PX4 · Pixhawk · ROS 2 · OpenCV', 'drone-flight', 'A drone flight test viewed from the team workspace', '', ''),
    ('bluelily', 'BlueLily', 'Embedded', 'Personal project', 'A configurable sensing and control platform.', 'A platform for real-time sensing, control and communications across robotics, rocketry, payloads and CubeSats. The prototype brings sensor interfaces and communication buses together with configurable logic.', 'C++ · RS485 · LoRa · CAN', 'bluelily', 'BlueLily breadboard prototype with connected sensor modules', 'https://github.com/AryanRai/BlueLily', 'Explore the code'),
    ('comms', 'Comms', 'Software', 'Personal project', 'A ground station that adapts to the hardware.', 'A modular communications dashboard for ground control, data acquisition and hardware interfaces. Custom backend and frontend modules support different devices and monitoring workflows.', 'DAQ · Ground control · Modular interfaces', 'comms', 'Comms dashboard and hardware interface modules', 'https://github.com/AryanRai/Comms', 'Explore the code'),
    ('cansat', 'CanSat / TU Berlin', 'Embedded', 'Jan 2026', 'A satellite engineering exercise in a can.', 'Hands-on satellite design at the Technische Universitat Berlin Winter School, combining compact hardware, sensing and embedded engineering in a CanSat build.', 'CanSat · Embedded systems · Integration', 'cansat', 'CanSat electronics and battery assembly', '', ''),
    ('rgbeatz', 'RGBeatz', 'Embedded', 'Personal project', 'Turning music into light.', 'Addressable RGB lighting with an ESP8266 and desktop interface. The project uses Spotify track analysis to drive lighting without a microphone, connecting software, wireless communication and physical output.', 'ESP8266 · Python · Spotify · Firebase', 'rgbeatz', 'RGBeatz software for music-reactive lighting', '', ''),
    ('smartlights', 'SmartLights', 'Embedded', 'Personal project', 'Home automation, room by room.', 'A Wi-Fi lighting system built with microcontrollers, relays, touch sensors and a web interface. An everyday use for the electronics and software I was learning.', 'ESP32 / ESP8266 · IoT · Web UI', 'smartlights', 'Custom smart lighting relay and wiring enclosure', '', ''),
    ('doorunlock', 'DoorUnlock', 'Embedded', 'Personal project', 'A small device with an everyday job.', 'An ESP8266-based door access project with a locally hosted web interface. It grew from experimenting with microcontrollers and home automation into a system used at home.', 'ESP8266 · Local web server · Electronics', 'doorunlock', 'DoorUnlock prototype and mobile interface', '', ''),
    ('carcan', 'CarCanCant', 'Embedded', 'Personal project', 'Listening to a vehicle through CAN.', 'An embedded hardware and software toolkit for automotive CAN logging and diagnostics, with code and PCB design work.', 'CAN · KiCad · Diagnostics', 'carcan', 'Automotive diagnostic data in the CAN project interface', '', ''),
    ('lte', 'LTE battery monitor', 'Embedded', 'Personal project', 'Keeping an eye on a battery from afar.', 'A remote battery-monitoring build using LTE connectivity, bringing together sensing, communications and a physical electronics enclosure.', 'LTE · Battery sensing · Telemetry', 'lte', 'Battery monitor prototype with wiring and electronics', '', ''),
    ('treasure', 'Treasure hunt & interactive electronics', 'Embedded', 'University projects', 'Learning by making the whole system work.', 'MTRX2700 work included a microcontroller treasure hunt and a magnet-detector interactive game. These projects combined embedded programming, physical interfaces and team integration.', 'Microcontrollers · Sensors · C · Teamwork', 'treasure', 'An interactive electronics game built for university', '', ''),
    ('warehouse', 'Autonomous warehouse robotics', 'Robotics', '2025', 'Mapping, inspection and delivery on TurtleBot.', 'MTRX3760 project work integrating ROS 2 navigation, LiDAR and camera sensing, SLAM and autonomous task execution in Gazebo and RViz.', 'ROS 2 · SLAM · Gazebo · RViz', '', '', '', ''),
    ('simplywise', 'SimplyWise', 'Software', 'Personal project', 'Practical software for local businesses.', 'An inventory-management prototype built with Python, JavaScript and Eel, exploring lightweight business workflows and desktop interfaces.', 'Python · JavaScript · Eel', 'simplywise', 'SimplyWise inventory management dashboard', '', ''),
    ('testing', 'Academic testing software', 'Software', 'Personal project', 'An online space for IELTS practice.', 'A web-based testing project with reading and writing exercises and assessment workflows, deployed using Firebase.', 'Web development · Firebase', 'testing', 'Academic testing interface with reading questions', '', ''),
    ('unity', 'Unity multiplayer', 'Software', 'Personal project', 'A detour into games and shared worlds.', 'A multiplayer PvP demo built with Unity and Firebase Realtime Database, exploring connected gameplay and day-night cycles.', 'Unity · C# · Firebase', 'unity', 'A multiplayer game running on a laptop', '', ''),
    ('early', 'Drones, RC cars & electric boards', 'Hardware', 'Early experiments', 'The projects that started everything.', 'Building with my father helped turn an interest in electronics into a habit. I assembled hobby quadcopters and RC cars, built an electric skateboard that later became a bike project, and experimented with small Arduino robots and servos.', 'Motors · ESCs · Batteries · Arduino · Making', 'skateboard', 'My electric skateboard build', '', ''),
    ('sequencer', 'Interactive light sequencer', 'Embedded', 'University project', 'Patterns, inputs and real hardware.', 'An MTRX1705 light-pattern sequencer, alongside early coursework in C-based air-traffic-control and PCB-quality-control systems.', 'C · Digital electronics · Microcontrollers', 'sequencer', 'Interactive light sequencer circuit prototype', '', ''),
    ('starsim', 'StarSim & software experiments', 'Software', 'Personal projects', 'Following an idea into code.', 'StarSim explores a C++ physics library for embedded and robotics applications. Other experiments include ShipMap for shipment tracking, HowDollarWorks for historical currency analysis, and chyappy for lightweight serial sensor communication.', 'C++ · Python · Physics · Data', '', '', '', ''),
    ('ally', 'Ally', 'Software', 'Current work', 'Another branch of the things I build.', 'Alongside robotics and embedded systems, I am also building Ally. Explore the project through its live site.', 'Software · Interfaces', '', '', 'https://ally-taupe.vercel.app/', 'Visit Ally'),
]

def project_rows():
    rows = []
    for p in projects:
        key, title, cat, when, subtitle, body, stack, img, alt, url, label = p
        media = f'<div class="project-media">{image(img,alt)}</div>' if img else ''
        rows.append(f'''<details class="project" id="project-{key}" data-category="{cat}">
          <summary><span class="project-name">{title}<small>{subtitle}</small></span><span class="project-category">{cat}</span><span class="expand" aria-hidden="true">+</span></summary>
          <div class="project-body {'text-only' if not img else ''}">{media}<div><p class="eyebrow">{when}</p><h3>{subtitle}</h3><p>{body}</p><p class="stack">{stack}</p>{link(url,label) if url else ''}</div></div>
        </details>''')
    return '\n'.join(rows)

def figure(name, alt, caption, cls=''):
    return f'<figure class="{cls}">{image(name,alt)}<figcaption>{caption}</figcaption></figure>'

def worklink(key, text='Explore the project'):
    return f'<a class="text-link project-jump" href="#project-{key}">{text} <span aria-hidden="true">↗</span></a>'

head = '''<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="theme-color" content="#f6f5f1"><meta name="color-scheme" content="light">
<title>Aryan Rai | A life of building things</title>
<meta name="description" content="The story and work of Aryan Rai, a Sydney-based robotics and embedded systems engineer. From early electronics to space systems, robot learning and Perception.">
<link rel="canonical" href="https://aryanrai.github.io/">
<meta property="og:title" content="Aryan Rai | A life of building things"><meta property="og:description" content="Robotics, embedded systems, and the curiosity that connects them."><meta property="og:type" content="website"><meta property="og:url" content="https://aryanrai.github.io/"><meta property="og:image" content="https://aryanrai.github.io/assets/work/rover.webp">
<link rel="icon" href="assets/favicon.svg" type="image/svg+xml"><link rel="stylesheet" href="portfolio.css"><script src="portfolio.js" defer></script>
</head>'''

html = head + f'''<body>
<a class="skip-link" href="#main">Skip to content</a>
<header class="site-header"><a class="brand" href="#home" aria-label="Aryan Rai home"><span class="monogram">ar<span>.</span></span><span>Aryan Rai</span></a><nav aria-label="Main navigation"><a href="#journey">My journey</a><a href="#projects">Projects</a><a href="#about">About</a><a class="nav-contact" href="#contact">Say hello <span aria-hidden="true">↗</span></a></nav></header>
<main id="main">
<section class="hero wrap" id="home">
 <div class="hero-intro"><p class="eyebrow"><span class="status-dot"></span> Robotics & embedded systems <span class="hero-location">/ Sydney, Australia</span></p>
 <h1>A lifelong habit<br>of <em>building things.</em></h1>
 <div class="hero-bottom"><p>I'm Aryan. I build the electronics, software and systems that help machines sense, move and interact with the world.</p><a class="round-link" href="#journey"><span>Follow the journey</span><span class="circle" aria-hidden="true">↓</span></a></div></div>
 <div class="hero-strip"><div class="hero-photo">{image('skateboard','An early electric skateboard build',True)}<span>01 / THE FIRST EXPERIMENTS</span></div><div class="hero-photo">{image('rover','The SIRI rover at an event',True)}<span>02 / BUILDING TOGETHER</span></div><div class="hero-photo">{image('orbit','Orbit mission planning interface',True)}<span>03 / WHAT COMES NEXT</span></div></div>
 <div class="hero-caption"><span>From a workbench at home to robots in the real world.</span><span class="mono">A personal field notebook / 2026</span></div>
</section>

<section class="journey wrap" id="journey" aria-labelledby="journey-title">
 <div class="section-heading"><p class="eyebrow">01 / THE THREAD THAT CONNECTS IT ALL</p><h2 id="journey-title">One thing led<br>to <em>another.</em></h2><p>Different projects. The same curiosity.<br>A timeline of learning by building.</p></div>
 <nav class="chapter-nav" aria-label="Timeline chapters"><a href="#beginnings">The beginning</a><a href="#year-2023">2023</a><a href="#year-2024">2024</a><a href="#year-2025">2025</a><a href="#year-2026">2026</a><a href="#now">Now</a></nav>
 <div class="timeline">
 <article class="chapter" id="beginnings"><div class="chapter-date"><span class="timeline-dot"></span><span class="mono">CHAPTER 01</span><h3>The beginning</h3><p>Before university</p></div><div class="chapter-content">
 <p class="eyebrow">CURIOSITY STARTS AT HOME</p><h3 class="chapter-title">For as long as<br>I can remember.</h3>
 <blockquote>“I've been obsessed with computers, electronics, microcontrollers, robotics, IoT devices, and sensors.”</blockquote>
 <p>That interest grew through building with my father. Digital electronics, motors, batteries, small microcontrollers - and the code that made them do something.</p><p>Hobby quadcopters became RC cars, electric skateboards and a bike. Arduino robots sat alongside smart lights and a door-unlock system. I liked working on every part: the hardware, the firmware, and the interface someone would actually use.</p>
 <div class="image-pair">{figure('drone','An early hobby quadcopter','Hobby quadcopters / electronics, flight and a lot of learning')}{figure('skateboard','An electric skateboard assembled from parts','Electric skateboard / a build that later became a bike')}</div>
 {worklink('early','See the early builds')}</div></article>

 <article class="chapter" id="year-2023"><div class="chapter-date"><span class="timeline-dot"></span><span class="mono">CHAPTER 02</span><h3>2023</h3><p>A new place to build</p></div><div class="chapter-content">
 <p class="eyebrow">THE UNIVERSITY OF SYDNEY</p><h3 class="chapter-title">Putting foundations<br>under the curiosity.</h3>
 <p>I started a Bachelor of Engineering (Honours) in Mechatronic Engineering, specialising in Robotics & Intelligent Systems. University gave the things I loved building a deeper foundation in sensing, control, mechanics and software.</p>
 <div class="note"><span class="mono">2023 - 2027 / EDUCATION</span><p>Mechatronic Engineering (Honours)<br><span>Robotics & Intelligent Systems</span></p></div>
 <p>Coursework became another place to experiment: interactive electronics, C programming, microcontroller games, and later autonomous warehouse robotics.</p>{worklink('sequencer','Explore university projects')}
 </div></article>

 <article class="chapter" id="year-2024"><div class="chapter-date"><span class="timeline-dot"></span><span class="mono">CHAPTER 03</span><h3>2024</h3><p>From my bench<br>to a team effort</p></div><div class="chapter-content">
 <p class="eyebrow">ROVERS / ROCKETS / UAVS</p><h3 class="chapter-title">Bigger systems.<br>More people. Real tests.</h3>
 <p>Joining student engineering teams meant learning to build things that had to work together, and helping other people do the same.</p>
 {figure('rover','SIRI rover on display','Sydney Interplanetary Rover Initiative / collective work of the rover team','wide-photo')}
 <div class="role-heading"><h4>Electrical Co-Lead, SIRI</h4><span class="mono">MAR 2024 - MAR 2026</span></div>
 <p>I led a 17-engineer electrical, embedded and controls team through the Australian Rover Challenge 2026. Power distribution, custom PCBs, CAN motor control, onboard compute and radios all had to become one working rover.</p>{worklink('rover','Inside the rover work')}
 <div class="two-notes"><div><span class="mono">FEB 2024 - JAN 2025</span><h4>USYD Rocketry</h4><p>STM32 flight data acquisition, telemetry and tank-test instrumentation.</p>{worklink('rocketry','Rocketry work')}</div><div><span class="mono">FEB - SEP 2024</span><h4>Sydney UAV / FASTR</h4><p>PX4 hardware, ROS 2 integration and field testing as the team's primary pilot.</p>{worklink('uav','UAV work')}</div></div>
 </div></article>

 <article class="chapter" id="year-2025"><div class="chapter-date"><span class="timeline-dot"></span><span class="mono">CHAPTER 04</span><h3>2025</h3><p>A little closer<br>to space</p></div><div class="chapter-content">
 <p class="eyebrow">SATMAP / ANT61 / SPACE SYSTEMS</p><h3 class="chapter-title">From simulating a link<br>to building one.</h3>
 <p>Space robotics had been a long-running interest. In May, our team won the USRC x ANT61 Space Handshakes Hackathon with SatMap, a tool for exploring satellite communication opportunities.</p>
 {figure('satmap','SatMap satellite constellation visualisation','SatMap / satellite communication simulation','screen-photo')}
 <div class="award"><span aria-hidden="true">↗</span><div><strong>1st place / Space Handshakes Hackathon</strong><p>USRC x ANT61 · May 2025</p></div>{worklink('satmap','View project')}</div>
 <div class="story-split">{figure('ant61','Aryan holding ANT61 hardware','At ANT61 / embedded systems internship')}<div><p class="eyebrow">JUN - JUL 2025</p><h4>Embedded systems at ANT61</h4><p>I worked on Beacon RevG: GNSS acquisition, STM32 firmware and CubeSat Space Protocol communications. It was a chance to take the careful work of embedded engineering into space hardware.</p>{worklink('ant61','My contribution')}<p class="small-note">Later that year, I attended the International Astronautical Congress in Sydney with the SIRI rover display.</p></div></div>
 </div></article>

 <article class="chapter" id="year-2026"><div class="chapter-date"><span class="timeline-dot"></span><span class="mono">CHAPTER 05</span><h3>2026</h3><p>Machines that learn.<br>Systems that connect.</p></div><div class="chapter-content">
 <p class="eyebrow">ROBOT LEARNING / PERCEPTION</p><h3 class="chapter-title">Bringing the pieces<br>into the real world.</h3>
 <p>The year began with hands-on CanSat design at TU Berlin. Back in Sydney, my work grew in two connected directions: helping robots learn, and building the systems to operate them.</p>
 <div class="work-feature"><div>{image('robot-arm','Elephant Robotics M750 arm in the workspace')}</div><div><p class="eyebrow">MAR 2026 - PRESENT</p><h4>Imitation Machines</h4><p class="role-label">Robotics Systems Engineer Intern</p><p>Robot integration, motion planning, simulation and VR teleoperation. Working across ROS 2, Isaac Sim, MuJoCo and robot-learning workflows to connect demonstrations with physical behaviour.</p>{worklink('imitation','Explore the work')}</div></div>
 <div class="orbit-feature"><div class="orbit-heading"><div><p class="eyebrow">2026 - PRESENT / CO-FOUNDER</p><h4>Perception<span class="accent">.</span></h4></div>{link('https://prxptn.com','Visit Perception')}</div>{image('orbit','Orbit planner showing mission nodes alongside a 3D map')}<div class="orbit-copy"><h5>From a mission idea<br>to a working fleet.</h5><p>I work across hardware, robotics and embedded systems: Orbit for mission design and live operations, Raven for the reference vehicle, and Orion for mesh communications. Selected for the Antler AUS16 residency.</p></div>{worklink('orbit','Explore Orbit, Raven & Orion')}</div>
 </div></article>

 <article class="chapter" id="now"><div class="chapter-date"><span class="timeline-dot current"></span><span class="mono">STILL IN PROGRESS</span><h3>Now</h3><p>The next experiment</p></div><div class="chapter-content">
 <p class="eyebrow">BUILD / TEST / LEARN / ITERATE</p><h3 class="chapter-title">Still following<br>the curiosity.</h3><p>Alongside my work at Imitation Machines and Perception, I keep building personal projects. HowYouSeeMe explores a persistent semantic world state for robots. DroidCore is a modular robotics platform. Ally takes my interest in useful software in another direction.</p>
 <div class="now-links">{worklink('howyouseeme','HowYouSeeMe')}{worklink('droidcore','DroidCore')}{worklink('ally','Ally')}</div>
 <p class="closing-note">The scale has changed.<br><em>The urge to build hasn't.</em></p>
 </div></article></div>
</section>

<section class="archive-section" id="projects"><div class="wrap"><div class="section-heading"><p class="eyebrow">02 / THE WORKBENCH</p><h2>The work,<br><em>in detail.</em></h2><p>A closer look at the work along the way.<br>Open a project to see the story and the build.</p></div>
<div class="archive-tools" hidden><div class="filters" role="group" aria-label="Filter projects"><button type="button" data-filter="All" aria-pressed="true">All</button><button type="button" data-filter="Robotics" aria-pressed="false">Robotics</button><button type="button" data-filter="Embedded" aria-pressed="false">Embedded</button><button type="button" data-filter="Software" aria-pressed="false">Software</button><button type="button" data-filter="Hardware" aria-pressed="false">Hardware</button></div><label class="search-label"><span class="sr-only">Search projects</span><input type="search" id="project-search" placeholder="Find a project..."></label></div>
<p id="project-count" class="mono result-count" aria-live="polite">{len(projects)} projects</p><div class="project-list">{project_rows()}</div><p class="empty-state" hidden>No projects match. Try another word or choose All.</p>
<div class="archive-end"><p>More photos, prototypes and experiments in my visual portfolio.</p>{link(CANVA,'Open the Canva portfolio')}</div>
</div></section>

<section class="about wrap" id="about"><div class="about-image">{image('aryan','Aryan outdoors by the water in Sydney')}<span class="image-label mono">ARYAN RAI / SYDNEY</span></div><div><p class="eyebrow">03 / THE PERSON BEHIND THE PROJECTS</p><h2>Hardware person.<br>Software person.<br><em>Curious person.</em></h2><p>I'm a mechatronic engineering student at the University of Sydney, working at the intersection of electronics, embedded software and robotics.</p><p>I enjoy the whole system: designing a board, writing the firmware, making sense of a sensor, and building an interface that makes the result useful. I learn by making, testing, listening to people and trying again.</p><div class="skills"><div><h3>Sense & move</h3><p>ROS 2, SLAM, OpenCV, motion planning, teleoperation, robot learning</p></div><div><h3>Build & connect</h3><p>STM32, Teensy, Jetson, CAN, MAVLink, KiCad, SolidWorks</p></div><div><h3>Code & simulate</h3><p>C/C++, Python, TypeScript, Isaac Sim, MuJoCo, Gazebo, Linux</p></div></div><a class="text-link" href="resume.html">Read my experience summary <span aria-hidden="true">↗</span></a></div></section>

<section class="contact wrap" id="contact"><p class="eyebrow">04 / KEEP THE CONVERSATION GOING</p><h2>Have something<br>in <em>mind?</em><span class="contact-arrow" aria-hidden="true">↗</span></h2><div class="contact-bottom"><p>Robotics, embedded systems, interesting ideas.<br>I'd love to hear what you're building.</p><div>{link(LINKEDIN,'Connect on LinkedIn')}{link(GITHUB,'Explore my GitHub')}{link('https://twitter.com/AryanyanRai','Find me on X')}</div></div></section>
</main><footer class="site-footer wrap"><span>© 2026 Aryan Rai</span><span>Built with curiosity. Still in progress.</span><a href="#home">Back to top ↑</a></footer>
</body></html>'''

roles = [
('Mar 2026 - present','Imitation Machines','Robotics Systems Engineer Intern','Robot integration, simulation, motion planning and VR teleoperation with UR10e, Inspire RH56 and Elephant Robotics M750. ROS 2, Isaac Sim, MuJoCo, Gazebo, PyTorch and LeRobot workflows for robot learning.'),
('2026 - present','Perception','Co-Founder, Hardware, Robotics & Embedded','Orbit mission design and operator-supervised fleet operations; Raven drone hardware and Orion mesh communications. ArduPilot, MAVLink, edge compute, video and telemetry integration. Antler AUS16 residency.'),
('Mar 2024 - Mar 2026','Sydney Interplanetary Rover Initiative','Electrical Co-Lead','Led a 17-engineer team through AuRC 2026. Power distribution, custom PCBs, Teensy/C++ firmware, CAN FOC motor control, sensing, compute and radio integration.'),
('Jun - Jul 2025','ANT61','Embedded Systems Intern','STM32/C++ firmware for Beacon RevG, GNSS acquisition, UART DMA/interrupts and CubeSat Space Protocol communications using libcsp, KISS and CRC32.'),
('Feb 2024 - Jan 2025','USYD Rocketry','Embedded & Ground Control Engineer','In-house STM32 datalogger, RS485 and LoRa telemetry, LabJack tank-test instrumentation and custom test software.'),
('Feb - Sep 2024','Sydney UAV / FASTR','Drone Flight Engineer','PX4/Pixhawk quadrotor, Raspberry Pi, ROS 2 and OpenCV integration, and primary pilot for field testing.')]

resume = head.replace('Aryan Rai | A life of building things','Aryan Rai | Experience summary').replace('href="https://aryanrai.github.io/"','href="https://aryanrai.github.io/resume.html"') + '<body><main class="resume wrap"><a class="text-link" href="index.html">← Back to the portfolio</a><p class="eyebrow">EXPERIENCE SUMMARY / UPDATED OCTOBER 2026</p><h1>Aryan Rai<span class="accent">.</span></h1><p class="resume-intro">Robotics & embedded systems · Sydney, Australia</p><p>I work across electronics, firmware, perception, simulation and deployment to bring robotic systems into the real world.</p><div class="resume-links">'+link(LINKEDIN,'LinkedIn')+link(GITHUB,'GitHub')+'</div><h2>Experience</h2>'
for date,org,role,body in roles:
    resume += f'<article class="resume-role"><p class="mono">{date}</p><h3>{org}</h3><h4>{role}</h4><p>{body}</p></article>'
resume += '<h2>Education</h2><h3>University of Sydney</h3><p>BE (Honours), Mechatronic Engineering - Robotics & Intelligent Systems<br>Feb 2023 - Nov 2027 (expected)</p><h3>TU Berlin Winter School</h3><p>CanSat, hands-on satellite design · Jan 2026</p><h2>Selected work & recognition</h2><p>SatMap - first place, USRC x ANT61 Space Handshakes Hackathon, May 2025.<br>Antler AUS16 - selected with Perception, 2026.<br>International Astronautical Congress - SIRI rover display, Sydney, September 2025.</p><p>Personal projects include HowYouSeeMe, DroidCore, BlueLily, Comms and StarSim.</p><p><a class="text-link" href="index.html#projects">Explore projects and technical details →</a></p></main></body></html>'

for name, content in [('index.html', html), ('resume.html', resume)]:
    content = content.replace('<br>', '<br> ')
    assert '\u2014' not in content and '\u2013' not in content
    (ROOT/name).write_text(content,encoding='utf-8')
print(f'Built index.html and resume.html with {len(projects)} project entries.')
