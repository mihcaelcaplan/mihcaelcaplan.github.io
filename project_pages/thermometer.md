---
title: Thermometer Control
layout: project_header

permalink: /thermometer.html
---

The best class I took in college (there are some close runners up) was called, "Interfaces, Information and Automation."
It centered on practical uses of programming and taught a diverse range of topics, from communicating with lab equipment using Python over RS-232 cables, scripting and interconnecting web APIs, and using Google Apps Script to automate spreadsheet operations and custom email filters.

For my final project I designed a system to precisely control the temperature in my dorm room from my mobile phone. The idea was to use a digital thermometer and a motor to twist the thermostat control, and connect these to a service called [Twilio](https://www.twilio.com/) which would allow me to check and set the temperature in my room via my mobile phone.

### Construction

First, I connected the digital thermometer an Arduino, because I was much more comfortable with analog GPIO using Arduino at that time. Then, I connected the Arduino to a Raspberry Pi using the HC-05 bluetooth module. Today, I would just use I<sup>2</sup>C on the Raspberry Pi (although I wouldn't get to play with a bluetooth SOC). I also connected a MOSFET motor driver circuit to the Arduino. I stole a 30V MOSFET from an old drill, and then soldered some jumper wires to connect to the Arduino and a diode to prevent back EMF spikes from the motor breaking down the MOSFET junction.

<figure>
  <img src="/assets/thermometer/hardware.png" style="width: 50vw"/>
  <figcaption><em>Hardware Diagram</em></figcaption>
</figure>

The software was the real point of the project, as this was mostly what we had been learning about in class. This was my first real software project so it's been fun to look through the code and grimace at my lack of comments and muddy architecture.

The first stage was the Arduino code. Each loop, the Arduino checked if data from the Raspberry Pi had been received over the Bluetooth connection. If it had, it decoded that data, which represented a desired temperature in the room. Then, the current temperature from 2 different sensors in my dorm room was stored and sent over Bluetooth to the Raspberry Pi. This data was sent using string tags as a data format. This is pretty rudimentary, and vulnerable to a lot of errors. Essentially, I sent a string over bluetooth that looked like this: ``` 1: 65.2 2: 67.9 ```.
If the temperature in the room was greater, the Arduino tried to move the motor to decrease the temperature on the thermostat. If the current temperature was less than the desired temperature, the motor moved the opposite direction to increase the temperature on the thermostat. I basically implemented a proportional control system in ```if, then``` statements (no integral or derivative tuning, so the output would be prone to steady state error and persistent overshoot).

The second stage was the Python code that was running on the Raspberry Pi. The bluetooth chip was mounted as a serial device, so I was able to read from it using a library that returned a string. Then, the string was parsed with Regular Expressions to get the temperature from each sensor. The temperatures reported were posted to a Google Sheet using the Apps Script API. The script checked if there were any temperature setting requests stored in the Google Sheet database (presumably set by the user via SMS). If one existed, the script wrote it to the bluetooth terminal for the Arduino to use.

The third stage is the Google Apps Script, which deals with new data that it gets from the Raspberry Pi, making sure the format of the sheet is correct, and that the temperatures from the room, as well as the desired temperatures from Twilio are archived correctly.

The final stage is the Twilio Webhook, a snippet of javascript that can access the SMS that Twilio is receiving. This was configured to also have access to the Google Sheet. Thus, when a text message was sent or received, it could use temperature data from the appropriate areas of the Google Sheet to relay the current temperature to a user or accept desired temperature settings.

<figure>
  <img src="/assets/thermometer/software.png" style="width: 50vw"/>
  <figcaption><em>Software Diagram</em></figcaption>
</figure>


### Conclusions
This was a fun project,at the time it felt like the first time my hunger to build integrated systems had been somewhat satiated. I had Arduino experience earlier, but never the capability to connect as many components as I was able to with Python and Google Apps Script.

The motor was the weakest link in this project. Ultimately I never achieved thermostat control because I couldn't get enough torque to move the thermostat, and didn't have time to fabricate a coupling (this being much beyond the scope of the project).
