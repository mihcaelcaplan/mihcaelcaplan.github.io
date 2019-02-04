---
title: Audio Google Docs
layout: project_header

permalink: /gdocaudio.html
---

### Voice over Google Docs

This year I had the chance to participate in the annual [hackathon](https://2019.hackatbrown.org) run at Brown University with my friend [Mckenna Cisler](http://www.mcisler.com/).

We are both members of the Brown Amateur Radio Club, so we were interested in doing something related to communication. We decided to build a VOIP client that piggybacked on Google Docs as a type of unconventional web socket. The github is [here](https://github.com/MckennaCisler/audio-text-tx), and usage is very simple if you want to try it out.


### The Build
We started off by sketching out the data flow:
<figure>
  <img src="/assets/gdocaudio/data.png" style="width: 75vw; border-radius: 35px"/>
  <figcaption><em>Data Flow </em></figcaption>
</figure>

Then, working in python, we stitched together a working application.

First, we used the [PyAudio](https://people.csail.mit.edu/hubert/pyaudio/) library to get data from the soundcard in the form of a byte array. Then, we use the base64 encoding to transform these bits into nice characters that can be represented in base ASCII. This gives us the text string that needs to be pushed to Google Docs.

All of the interaction with Google Docs was done through the [Selenium Python](https://selenium-python.readthedocs.io) bindings. This let us copy and paste strings from Python very quickly. In order to get the base64 strings into the system clipboard, we used a library called [Pyperclip](https://pypi.org/project/pyperclip/). Using this library allowed us to then simply automate the "Ctrl"+"V" keypress action to move the string into a Google Doc.

On the receive end, a listener function constantly polled the Google Doc for new chunks of audio data. When it received some, it decoded the base64 and and then wrote those bytes to the soundcard, playing the audio.

We implemented some simple compression using the built-in python libraries, but didn't notice any serious improvements.


### Results

We were very happy with the results, and were able to send close to real-time audio over an unconventional medium.

Our main problem seemed to be due to the rate limits on Google Doc copy and paste operations. When we were transferring text too fast, the document skipped packets on the receive end. Going too fast meant that Google Docs couldn't keep up. Ultimately, this meant that we had a close to 4 second lag on bidirectional communication, which made conversation very slow.
