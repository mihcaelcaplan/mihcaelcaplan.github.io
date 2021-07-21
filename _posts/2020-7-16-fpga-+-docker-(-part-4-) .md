---
layout: blog_post
---

### Simulating the adc

Not exactly sure what day I'm at, but I wanted to quickly highlight some progress. 

I got the example testbench from Lattice simulated using open source tools.

I used iverilog to dump the outputs of the testbench and then I used GTKwave to view the outputs. 

<figure>
  <img src="/assets/blog/2020-7-16-fpga-+-docker-(-part-4-)/gtkwave.png"/>
  <figcaption><em> Plots the "analog" signal and the lower frequency quantized digital signal</em></figcaption>
</figure>

My Makefile looks like this: 

```
vvp: 
	iverilog -o adc.vvp adc_tf_rtl.v ../../adc_top.v ../../box_ave.v ../../sigmadelta_adc.v 

lxt2: 
	vvp adc.vvp -lxt2

waves: 
	gtkwave adc_test.lxt2
```