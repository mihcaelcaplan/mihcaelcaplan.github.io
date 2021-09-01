---
layout: blog_post
---

### Day 3 

I've identified a path forward towards the application that I'm interested in.

I need to digitize multiple input signals for closed-loop control. But i don't want to use an external ADC just yet. Especially to test out the ice40 capabilities. 

Luckily, Lattice has a cool reference design for a delta sigma ADC using the on-chip LVDS recieve buffers. Those buffers are designed to resolve a common mode signal that propagates over a matched pair of traces. The signal swings around a fixed (usually positive ~ 1v) common mode voltage, and provides an extremely high fidelity fast interface, without too much EM design trickery. 

Since the ice40 silicon is built to handle these interfaces, they can be repurposed to be a delta-sigma ADC. The ADC oversamples the fast 1 bit comparators in the LVDS buffers, and gives you a frequency decimated (by 2**output_bit_width) analog signal!

I forgot the like 1 lesson I had on delta-sigma ADC, so I don't know exactly how they do their trickery.  There seems to be a digital feedback path to the input measurement, which means it's likely my brain will hurt when I read up on it. 

### (Spongebob voice) a few hours later...

I read up on the delta-sigma concept, didn't fully understand it but have a little bit more. Basically the analog value is encoded in a pulse frequency. The pulses fire off when the integrator counts up to the comparator threshold. The feedback signal resets the integration (I think), and then lets the signal count up again. The frequency of the pulses is directly proportional to the amplitude of the analog signal. 

I hope to get some better resources, and it would be fun to write up a bit on what exactly is going on. 

Overall, I'm still fucked with fpga stuff. The ecosystem is so foreign. I feel like I'm back at the stage of C/C++ programming where you don't know what an #include or #define command does. I got the reference design for this ADC implemenation, and I will embed the file under here so you can take a look. 


<object style="width: 85vw; height: 85vh;" data="/assets/blog/2020-7-16-fpga-+-docker-(-part-3-)/lattice.pdf"></object>


### More hours later
These two blog posts are also good resources to motivate an intuitive understanding:
1. [ Delta Sigma Converters: modulation](https://www.cardinalpeak.com/blog/delta-sigma-converters-modulation)
2. [ Delta Sigma Converters: filtering, decimation and simulations](https://www.cardinalpeak.com/blog/delta-sigma-converters-filtering-decimation-and-simulations)

My old professor [Chris Rose](http://brown.edu/Departments/Engineering/Labs/Rose/) recommended the intro text of Simon Haykin, so I will download that and take a look. Hopefully I'll be able to do a more detailed post on delta-sigma later with some math from somewhere interesting 😃. 