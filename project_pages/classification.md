---
title: Checkout Classifier
layout: project_header

permalink: /classification.html
---


For a graduate seminar on machine learning for laboratory methods, I created a convolutional neural net designed to classify checkout items.


### Data Collection
I collected two image datasets. In the first, the collection was in a standardized setting. I wrote a script for the Raspberry Pi Camera that took images when the frame changed significantly. Then, I slowly pushed the items along the checkout line so that the camera could easily and accurate capture them. This collection mimicked a real world setting, but achieved greater clarity and allowed the items to be photographed in similar orientations. The technique also allowed me to preselect the classes of items to be photographed, and made the labelling task easier.

The second dataset was collected during the business hours of the Ivy Room. I used the
same collection apparatus, but all the images were of real customers. This dataset was much less standardized, and there were many complicated images with multiple classes of items and other objects. This dataset was much larger.


The results of this can be seen in this timelapse, a result of stitching all collected images together from the real-world dataset:

<video style="width: 50vw" autoplay controls>
  <source src="/assets/checkout/checkout_lapse.mp4" type="video/mp4">
</video>

### Classification
I used the Keras framework to implement neural networks quickly and scalably in Python. I chose this framework because it is simple to implement less-complex networks, but also allows more complex architectures. The optimization methods and loss functions were all packaged, so I didn’t have to write any of the low-level network implementation.


In order to classify multiple targets, the class labels had to be one-hot encoded into binary class vectors. For a four class problem, a label signifying the third class looks like this:  [0, 0, 1, 0]. For the loss function in each network, I used categorical cross entropy. The cross entropy function nicely avoids saturation and learning slowdown inherent in simpler cost functions like mean squared error. I also chose to use the Adadelta optimizer. I originally started with RMSprop optimizer, which was developed around the same time. They both originated out of a desire to fix the Adagrad optimization function which worked well, but suffered from learning rates that diminished to become infinitesimally small - effectively stopping learning. The Adadelta optimizer resulted in smoother convergence and more responsive learning in early epochs.

 To select the final versions of each network architecture to compare, I went through an iterative improvement process. Selecting hyperparameters and smaller structural details of networks is not a science, and most of the literature I read told me to use general common standards. This motivated me to use zero-padding layers after the convolutional layers, in order to preserve network size. I also used the canonical pooling kernel size of 2x2, with a stride length of 2.

 The architecture ended up looking like this:
 <figure>
   <img src="/assets/checkout/architecture.png"/>
   <figcaption><em>Basic Net Architecture </em></figcaption>
 </figure>

 I labelled the data with 14 targets, common items that are catalogued here:
 <figure>
   <img src="/assets/checkout/targets.png"/>
   <figcaption><em>Clasification Targets </em></figcaption>
 </figure>


### Conclusions

Ultimately, my network performed at a sub-par accuracy of only about 80% on real-world data. I was very pleased that it reached that level of accuracy, but the standard accuracy for classification tasks is in the mid 90% range for state of the art neural nets.

<figure>
  <img src="/assets/checkout/chart.png" />
  <figcaption><em>Training/Test accuracy over multiple epochs </em></figcaption>
</figure>

I believe that this was mostly because of the data that I collected. As seen in the above timelapse, many of the items were in boxes, so the visual diversity was not especially rich. I did not attempt to classify the internal items of the boxes (impossible?), but instead trained on pre-packaged items that were visually identifiable. It is quite possible that my labelled training data was not adequate to categorize some items because of visual similarities between classes that were not due to the actual target of labelling. For example, if some items were bought only with other items, the network will encode this regularity as relevant to classification, when of course it is not.

I learned a ton, and it was my first real exposure to building neural networks. The following summer I learned TensorFlow and played around with some recurrent nets, only because of this exposure.
