---
title: Accelerometer project
layout: project_header

permalink: /accelerometer.html
---

This project was completed for a class, and our final project was delivered in the form of a GitHub repository tagged for release.

I've linked that here: [github.com/ENGN2912B-2018/EE-A](https://github.com/ENGN2912B-2018/EE-A). It has a complete readme detailing the scope of the project and all of the work that we did in different areas.

In this context, it makes sense to talk about what I did on the project, which revolved around communication between an ADXL345 accelerometer and a Raspberry Pi computer.

### Up and Running
The beginning stages of my work revolved around the ADXL345 [datasheet](https://www.analog.com/media/en/technical-documentation/data-sheets/ADXL345.pdf), a 40 page masterpiece covering all of the minute details involved in using this full-featured MEMS accelerometer from Analog Devices. We decided to use SPI over I<sup>2</sup>C for maximum transfer speed.

<figure>
  <img src="/assets/accelerometer/spitiming.png" style="width: 50vw"/>
  <figcaption><em>Register Map</em></figcaption>
</figure>

I tried to use the [WiringPi](https://projects.drogon.net/category/raspberry-pi/wiringpi-raspberry-pi/) library, but kept getting garbage data back from the device. A little digging revealed that there are multiple SPI modes, and WiringPi only has Mode 0 baked in. So, I switched to the BCM2835 library, which proved to be better.

After I confirmed I could read/write, I had to peruse the register map and figure out which bits I needed to set in order that the accelerometer would operate the way I wanted.

<figure>
  <img src="/assets/accelerometer/registermap.png" style="width: 50vw"/>
  <figcaption><em>Register Map</em></figcaption>
</figure>


### Refining Communications
I read in the top of the datasheet that the ADXL345 would return 10 bit integers split over two bytes, so I naively thought I could just bitshift the chars I received from the SPI read, cast to an integer, and then remap the int to a meaningful acceleration figure. If the accelerometer had a +-2*g* range, and 2<sup>10</sup> = 1024, then if I received 512 back on the x axis, I had 0*g* acceleration.

This wasn't working and I was getting very nervous that I had a deep implementation error, until a team member pointed me to one of the last pages of the datasheet, which showed exactly how the data was coming back.

<figure>
  <img src="/assets/accelerometer/dataformat.png" style="width: 50vw"/>
  <figcaption><em>Register Map</em></figcaption>
</figure>

### Wrapping SPI
When communication was working well, I needed to wrap everything in an easy-to-use class interface. My teammate had done the truly admirable work of getting a Kalman Filter implementation up and running, and we wanted to be able to filter the data as close to real-time as possible. In order to achieve this, I decided it would make sense if a separate thread would spin up, read SPI, and put everything in a queue for the Kalman filter to pull samples from.

Because we were in a single producer-single consumer situation, there were minimal race conditions, so I was able to use a lockless queue. I borrowed a wonderful circular FIFO instantiation from Kjell Hedstrom. The source is [here](https://bitbucket.org/KjellKod/lock-free-wait-free-circularfifo/src) and a great explanation of how it uses std::atomic variables is [here](https://www.codeproject.com/Articles/43510/Lock-Free-Single-Producer-Single-Consumer-Circular).

The std::thread library let me easily create a new thread (perks of being in C++), and I got the queue working.

### Conclusions

Our device worked much better than I thought it would, but it is not a surprise to anyone familiar with dead-reckoning techniques that our success was limited. The problem is gravity. The accelerometer works within the inertial frame of the earth, and thus there is a constant gravity vector pointing towards the core of the planet. Of course, with a perfectly aligned accelerometer, this offset could be calibrated. However, as soon as the device rotates the gravity vector projects onto our accelerometer x, y, and z vectors. We tried to solve this with a simple moving average, but ultimately we would have to implement some sort of rotation sensing and utilize euler angles to track and calibrate for the gravity vector. A great resource is [here](http://www.chrobotics.com/library/understanding-euler-angles).

The full conclusions and all the code are in the github repository linked at the top. If you are interested, I suggest you read that.
