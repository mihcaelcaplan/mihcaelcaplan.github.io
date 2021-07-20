---
layout: blog_post
---

### Day 2.5

I still didn't verify `tinyprog` but I'm comfortable with the dual OS now, and I'm pretty confident that the board will connect, very unlikely that I burned the bootloader.

I found some good resources that mean my dockerized build flow is basically working on paper. ( for the insanely simple example code LOL). 

The toolchain is pretty complex for this shit, so I'm not surprised that FPGA is pretty inaccessible for most. 

 I'm currently using: 

- Yosys
- NextPNR
- Tinyprog

Shout the fuck out to Claire Wolf, without which none of this ecosystem would exist. She is a legend at the same level as Alexandra Elkabayan (spellcheck that later). 

Here's a great forum link that gave me the perfect commands to compile an example project for the TinyFPGA-BX: 
- [support nextpnr instead of deprecated arachne-pnr #23](https://github.com/tinyfpga/TinyFPGA-BX/issues/23)


The Yosys utilities: 
- Yosys
- Icepack
- Icetime
- and more
are perfect for the synthesis step. They are well maintained and easy to use. 

The TinyFPGA examples I found used apio, which used arachne-pnr. Arachne was deprecated in favor of NextPNR, so I can make that update while customizing my makefile. 

Someday I would love to do some posts about embedded toolchains using Docker. Being exposed to that in a R&D setting gave me so much more understanding about how embedded software actually works, compared to anything I learned in high school or college. And it's not that complicated, people just don't explain it well in a narrative format.

Heavy software people understand how computer work, so they don't think it's weird that you have to write your own 'recipes' that stitch together inputs and outputs of a diverse range of different people's tools. That's normal. 

But for someone just trying to understand what programming is, or even branching out and trying to understand WTF an FPGA is, the toolchain is insanely intimidating. That's why Arduino was such a breakthrough. They said: "don't worry about the underlying toolchain. We've standardized around a specific processor family and we load everything over serial. Use our simplified language, don't worry about where anything goes, and write something interesting."

Arduino is great, but it doesn't leave you with a good understanding of how shit is working. 
