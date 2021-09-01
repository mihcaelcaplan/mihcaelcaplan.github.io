---
layout: blog_post
---
<!-- <figure>
  <img src="/assets/blog/2020-12-31-spinning up!/spinning.gif"/>
  <figcaption><em> yessir</em></figcaption>
</figure> -->

Starting off here on 

#### July 16. 

Yesterday I frantically searched through my different github accounts trying to find the work I had done to dockerize a FPGA build system for my little [TinyFPGA BX board](https://tinyfpga.com/bx/guide.html). 

Eventually I did find the files, but in my google drive. The last time I touched them was over 8 months ago. Oops. 

I got the container built, and eventually remembered how to pass X windows to my mac, so that I can open the GUIs of containerized apps, which sometimes I need to do. 

Unfortunately, the intro flow from that TinyFPGA user guide is trash. It uses a project called "Apio" to simplify everything. But the project hasn't been maintained or built out well enough, and it locks you into a really limiting environment. 

Also, why tf am I using a GUI in a docker? Just because I can does **not** mean I should. 

I need to script everything using the tools that Apio uses under the hood, or other (better) alternatives. 

So the next step is to script a flow that synthesizes, place-and-routes, and then uploads the file to the bootloader on the tinyFPGA BX board. 

Except, that's a whole nother can of something. 

The bootloader comes with a tool called `tinyprog` which allows you to upload the "program" to the FPGA via Serial interface. That's wonderful, except I need to verify it works. 

Yesterday, I forgot something stupid, which is that Mac can't pass a physical device through the virtualization layer to a docker container with a Linux image. If you want to do that you have to spawn the container on a Linux host. So I gotta go to my other OS. 

There, I'll verify that the `tinyprog` tool can even see the bootloader. That might take a little bit of a virtualenv because I got an error yesterday with the Python 3.9 version on my Mac. 

Then, I'll try to pass that through the docker layer and run (in docker ofc) an example of an iCestorm project, from the TinyFPGA [github](https://github.com/tinyfpga/TinyFPGA-BX).


