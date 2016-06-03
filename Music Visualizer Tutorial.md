## Addressable RGB LED Music &amp; Sound Visualizer Project Guide
<center>![front view](http://i.imgur.com/dWBpRcj.png)</center>

### Introduction
Let's face it: nowadays, most musical performances are complimented by some fancy light shows. Go to any concert, rave, club&mdash;they all have a corresponding visual. Why not add your own home to that list? Here's a simple yet effective project to make your very own [son et lumi&egrave;re!](https://en.wikipedia.org/wiki/Son_et_lumi%C3%A8re_(show))


This is a youtube video, click it &darr;

<img src ="..." />[![IMAGE ALT TEXT HERE](http://img.youtube.com/vi/Mv_pdyeIwR4/0.jpg)](http://www.youtube.com/watch?v=Mv_pdyeIwR4)

_All palettes work with every visualization, but not every combination is shown for timeliness._

What you'll need:

* [SparkFun RedBoard](https://www.sparkfun.com/products/12757) 
* [LED RGB Strip - Addressable, Bare (1m)](https://www.sparkfun.com/products/12025)
* [SparkFun Sound Detector](https://www.sparkfun.com/products/12642)
* [Breadboard - Self-Adhesive (White)](https://www.sparkfun.com/products/12002)
* (3x) [Momentary Pushbutton Switch - 12mm Square](https://www.sparkfun.com/products/9190)
* [Trimpot 10K with Knob](https://www.sparkfun.com/products/9806)
* [Resistor 330 Ohm 1/6th Watt PTH](https://www.sparkfun.com/products/8377)
* [Electrolytic Decoupling Capacitors - 1000uF/25V](https://www.sparkfun.com/products/8982)
* [Jumper Wires Standard 7" M/M Pack of 30](https://www.sparkfun.com/products/11026)

Any board with 3.3V and 5V pins will suffice to keep things simple, any potentiometer can be used as long as it has an analog output, and any resistor between 300&ndash;500 &Omega; can be used. The resistor and capacitor are not required, but they will help prevent damage to the LEDs. 

If you're compiling from the [Arduino IDE](https://www.arduino.cc/en/Main/Software) or similar, you'll want to snag the the [NeoPixel Library](https://github.com/adafruit/Adafruit_NeoPixel), since the code used is heavily based on it. If you're using [codebender](https://codebender.cc/), it will link the library for you.

Depending on your purposes, the trimpot and buttons may not be necessary. The trimpot is only used to adjust the brightness threshold, so if you want maximum brightness you don't have to worry about incorporating it. The 3 buttons cycle visualizations, color schemes, and shuffle mode respectively, so if you want to do without those features (and just use shuffle mode all the time) that's also a possibility.

I also suggest using an [Arduino & breadboard holder](https://www.sparkfun.com/products/11235) to simplify wiring and hold up the LED strip:

<center>![holder closeup](http://i.imgur.com/otYF1Yl.png)</center>

### Recommended Reading

If you're new to all this:

* [Arduino Sketch Tutorial](https://www.arduino.cc/en/Tutorial/Sketch)
* [Arduino Reference](https://www.arduino.cc/en/Reference/HomePage)
* [How to use a breadboard](https://learn.sparkfun.com/tutorials/how-to-use-a-breadboard)
* [RGB Color Model](https://en.wikipedia.org/wiki/RGB_color_model)

Since we're using the NeoPixel library, it may also be a good idea to get familiar with the [NeoPixel Documentation.](http://learn.adafruit.com/downloads/pdf/adafruit-neopixel-uberguide.pdf)

### Hookup
I'm sure some of you will be pleased to know that this project requires virtually no soldering! The few exceptions will probably be soldering some pins to the sound detector, and if you've cut a roll of addressable LEDs in the middle you'll have to solder some wires to the starting LED's pins.

As the saying goes, "a picture's worth a thousand words." With that, here's a few diagrams of how the circuit could look:

<center><b>Diagram with trimpot included:</b>
![with trimpot](http://i.imgur.com/SsjVT15.png)

<b>No trimpot:</b>
![no trimpot](http://i.imgur.com/gHu0lDg.png)</center>

Below is also a general chart for how the pin(s) on each component should be routed. But before you begin, here are some things to keep in mind:

* Be conscious of the orientation you think would allow the sound detector to take optimal readings for your intentions. Bending the pins to hold the sound detector perpendicular to the breadboard is a recommendable option.
* Electrolytic capacitors are polarity-sensitive, so how they are oriented is important. Make sure to place the side with a white stripe and a negative symbol into a negative current (ground) and the other into positive current.
* Resistors aren't polar, but it's good practice to be consistent with their orientation relative to the current.
* Trimpots are not polar either, however their middle pin is the analog output so don't power that directly.
* Pushbuttons are not polarity-sensitive and also do not need to be powered directly, just a ground connection will suffice.
* Try to avoid plugging your LEDs into a live circuit.

The pins used in the diagram and the code are in parentheses. If you use a different pin, don't forget to change it in the code as well:

<table class="table table-striped table-hover table-bordered">
<tr><th>Sound Detector</th><th>Addressable LED strip</th><th>Trimpot</th><th>Pushbutton</th><th>1&nbsp;mF (1000&nbsp;&micro;F) Capacitor</th><th>300&ndash;500 &Omega; Resistor</th></tr>
<tr><td><center>Envelope&nbsp;&rarr;&nbsp;Analog&nbsp;(A0)</center></td><td><center>Digital/Analog&nbsp;(A5) &rarr;&nbsp;Resistor&nbsp;&rarr;&nbsp;DIN</center></td><td><center>5V&nbsp;&rarr;&nbsp;left or right pin</center></td><td><center>GND&nbsp;&rarr;&nbsp;Either side<td></center><center>Between ground and 5V</td></center><td><center>Between Digital/Analog (A5) and DIN on LED strip</center></td></tr>
<tr><td><center>3.3V&nbsp;&rarr;&nbsp;VCC</td></center><td><center>5V&nbsp;&rarr;&nbsp;5V</td></center><td><center>Middle&nbsp;pin&nbsp;&rarr;&nbsp;Analog&nbsp;(A0)</center></td><td><center>Other&nbsp;side&nbsp;&rarr;&nbsp;Digital (4, 5, 6)</center><td></td><td></td></tr>
<tr><td><center>GND&nbsp;&rarr;&nbsp;GND</center></td><td><center>GND&nbsp;&rarr;&nbsp;GND</td></center><td><center>Remaining left or right pin&nbsp;&rarr;&nbsp;GND</center></td><td></td><td></td><td></td></tr>
</table>


**Sound Detector Notes:** The microphone used is not a sophisticated, logarithmic sound receiver like your ear; it is only measuring compressional waves in the air. Consequently, the microphone is more likely to detect and/or prioritize lower-frequency sounds since they require more energy to propagate, and therefore oscillate the air more intensely. Also, a resistor can be placed in the "GAIN" slots to modify the gain. Standard gain should be sufficient for our purposes, but for more info check [here.](https://learn.sparkfun.com/tutorials/sound-detector-hookup-guide#configuration)

### Programming

Below is a small sample program to test if everything is connected properly. It only contains one visualizer and one color palette to keep things concise, but if you'd like the program featured in the video check [this GitHub repository.](https://github.com/bartlettmic/SparkFun-RGB-LED-Music-Sound-Visualizer-Arduino-Code)

Things to remember before you compile:

* If you didn't use a potentiometer, don't forget to remove all references to the variable `knob` in the code. Ctrl+F may come in handy for that.
* If you didn't use buttons, change the initialization `bool shuffle = false;` to `bool shuffle = true;`, as well as remove all references to the `BUTTON` contants.

---

    //Libraries
    #include <Adafruit_NeoPixel.h>  //Library to simplify interacting with the LED strand
    #ifdef __AVR__
    #include <avr/power.h>   //Includes the library for power reduction registers if your chip supports them. 
    #endif   //More info: http://www.nongnu.org/avr-libc/user-manual/group__avr__power.htlm
    
    //Constants (change these as necessary)
    #define LED_PIN   A5  //Pin for the pixel strand. Does not have to be analog.
    #define LED_TOTAL 36  //Change this to the number of LEDs in your strand.
    #define LED_HALF  LED_TOTAL/2
    #define AUDIO_PIN A0  //Pin for the envelope of the sound detector
    #define KNOB_PIN  A1  //Pin for the trimpot 10K
    
    //////////<Globals>
    //  These values either need to be remembered from the last pass of loop() or 
    //  need to be accessed by several functions in one pass, so they need to be global.
    
    Adafruit_NeoPixel strand = Adafruit_NeoPixel(LED_TOTAL, LED_PIN, NEO_GRB + NEO_KHZ800);  //LED strand objetcs
    
    uint16_t gradient = 0; //Used to iterate and loop through each color palette gradually
    
    uint8_t volume = 0;//Holds the volume level read from the sound detector.
    uint8_t last = 0;  //Holds the value of volume from the previous loop() pass.
    
    float maxVol = 15; //Holds the largest volume recorded thus far to proportionally adjust the visual's responsiveness.
    float knob = 1023.0;   //Holds the percentage of how twisted the trimpot is. Used for adjusting the max brightness.
    float avgVol = 0;  //Holds the "average" volume-level to proportionally adjust the visual experience.
    float avgBump = 0; //Holds the "average" volume-change to trigger a "bump."
    
    bool bump = false; //Used to pass if there was a "bump" in volume
    
    //////////</Globals>
    
    
    //////////<Standard Functions>
    
    void setup() {//Like it's named, this gets ran before any other function.
    
      Serial.begin(9600); //Sets data rate for serial data transmission.
    
      strand.begin(); //Initialize the LED strand object.
      strand.show();  //Show a blank strand, just to get the LED's ready for use.  
    }
    
    
    void loop() {  //This is where the magic happens. This loop produces each frame of the visual.
      volume = analogRead(AUDIO_PIN);   //Record the volume level from the sound detector
      knob = analogRead(KNOB_PIN) / 1023.0; //Record how far the trimpot is twisted
      avgVol = (avgVol + volume) / 2.0; //Take our "average" of volumes.
    
      //Sets a threshold for volume.
      //  In practice I've found noise can get up to 15, so if it's lower, the visual thinks it's silent.
      //  Also if the volume is less than average volume / 2 (essentially an average with 0), it's considered silent.
      if (volume < avgVol / 2.0 || volume < 15) volume = 0;
    
      //If the current volume is larger than the loudest value recorded, overwrite
      if (volume > maxVol) maxVol = volume;
    
      //This is where "gradient" is reset to prevent overflow.
      if (gradient > 1529) {
    
    gradient %= 1530;
    
    //Everytime a palette gets completed is a good time to readjust "maxVol," just in case
    //  the song gets quieter; we also don't want to lose brightness intensity permanently 
    //  because of one stray loud sound.
    maxVol = (maxVol + volume) / 2.0;
      }
    
      //If there is a decent change in volume since the last pass, average it into "avgBump"
      if (volume - last > avgVol - last && avgVol - last > 0) avgBump = (avgBump + (volume - last)) / 2.0;
    
      //if there is a notable change in volume, trigger a "bump"
      bump = (volume - last) > avgBump;
    
      Pulse();   //Calls the visual to be displayed with the globals as they are.
    
      gradient++;//Increments gradient
    
      last = volume; //Records current volume for next pass
    
      delay(30);   //Paces visuals so they aren't too fast to be enjoyable
    }
    
    //////////</Standard Functions>
    
    //////////<Helper Functions>
    
    
    //PULSE
    //Pulse from center of the strand
    void Pulse() {
    
      fade(0.75);   //Listed below, this function simply dims the colors a little bit each pass of loop()
    
      //Advances the gradient to the next noticeable color if there is a "bump"
      if (bump) gradient += 64;
    
      //If it's silent, we want the fade effect to take over, hence this if-statement
      if (volume > 0) {
    uint32_t col = Rainbow(gradient); //Our retrieved 32-bit color
    
    //These variables determine where to start and end the pulse since it starts from the middle of the strand.
    //  The quantities are stored in variables so they only have to be computed once.
    int start = LED_HALF - (LED_HALF * (volume / maxVol));
    int finish = LED_HALF + (LED_HALF * (volume / maxVol)) + strand.numPixels() % 2;
    //Listed above, LED_HALF is simply half the number of LEDs on your strand. ↑ this part adjusts for an odd quantity.
    
    for (int i = start; i < finish; i++) {
    
      //"damp" creates the fade effect of being dimmer the farther the pixel is from the center of the strand.
      //  It returns a value between 0 and 1 that peaks at 1 at the center of the strand and 0 at the ends.
      float damp = float(
     ((finish - start) / 2.0) -
     abs((i - start) - ((finish - start) / 2.0))
       )
       / float((finish - start) / 2.0);
    
      //Sets the each pixel on the strand to the appropriate color and intensity
      //  strand.Color() takes 3 values between 0 & 255, and returns a 32-bit integer.
      //  Notice "knob" affecting the brightness, as in the rest of the visuals.
      //  Also notice split() being used to get the red, green, and blue values.
      strand.setPixelColor(i, strand.Color(
     split(col, 0) * pow(damp, 2.0) * knob,
     split(col, 1) * pow(damp, 2.0) * knob,
     split(col, 2) * pow(damp, 2.0) * knob
       ));
    }
    //Sets the max brightness of all LEDs. If it's loud, it's brighter.
    //  "knob" was not used here because it occasionally caused minor errors in color display.
    strand.setBrightness(255.0 * pow(volume / maxVol, 2));
      }
    
      //This command actually shows the lights. If you make a new visualization, don't forget this!
      strand.show();
    }
    
    
    
    //Fades lights by multiplying them by a value between 0 and 1 each pass of loop().
    void fade(float damper) {
      
      //"damper" must be between 0 and 1, or else you'll end up brightening the lights or doing nothing.
      if (damper >= 1) damper = 0.99;
    
      for (int i = 0; i < strand.numPixels(); i++) {
    
    //Retrieve the color at the current position.
    uint32_t col = (strand.getPixelColor(i)) ? strand.getPixelColor(i) : strand.Color(0, 0, 0);
    
    //If it's black, you can't fade that any further.
    if (col == 0) continue;
    
    float colors[3]; //Array of the three RGB values
    
    //Multiply each value by "damper"
    for (int j = 0; j < 3; j++) colors[j] = split(col, j) * damper;
    
    //Set the dampened colors back to their spot.
    strand.setPixelColor(i, strand.Color(colors[0] , colors[1], colors[2]));
      }
    }
    
    
    uint8_t split(uint32_t color, uint8_t i ) {
    
      //0 = Red, 1 = Green, 2 = Blue
    
      if (i == 0) return color >> 16;
      if (i == 1) return color >> 8;
      if (i == 2) return color >> 0;
      return -1;
    }
    
    
    //This function simply take a value and returns a gradient color
    //  in the form of an unsigned 32-bit integer
    
    //The gradient returns a different, changing color for each multiple of 255
    //  This is because the max value of any of the 3 LEDs is 255, so it's
    //  an intuitive cutoff for the next color to start appearing.
    //  Gradients should also loop back to their starting color so there's no jumps in color.
    
    uint32_t Rainbow(unsigned int i) {
      if (i > 1529) return Rainbow(i % 1530);
      if (i > 1274) return strand.Color(255, 0, 255 - (i % 255));   //violet -> red
      if (i > 1019) return strand.Color((i % 255), 0, 255); //blue -> violet
      if (i > 764) return strand.Color(0, 255 - (i % 255), 255);//aqua -> blue
      if (i > 509) return strand.Color(0, 255, (i % 255));  //green -> aqua
      if (i > 255) return strand.Color(255 - (i % 255), 255, 0);//yellow -> green
      return strand.Color(255, i, 0);   //red -> yellow
    }
    
    //////////</Helper Functions>
    

### Going Further

* If you want to get really crazy, [hackaday](http://hackaday.com/) demonstrates how to [power 1000 NeoPixels with the Arduino's limited RAM.](http://hackaday.com/2014/05/19/driving-1000-neopixels-with-1k-of-arduino-ram/)
* Why not bring your visualizer along with you to a music venue? [Mark Easley](https://www.hackster.io/measley2) over at [hackster](https://www.hackster.io/) shows us how to [integrate some LEDs into your clothes.](https://www.hackster.io/measley2/led-hat-with-msp430-and-neopixels-d1f51b)
* Of course if you're going to wear it, you may want to consider some portable sources of power, so check out the [Sunny Buddy Hookup Guide](https://learn.sparkfun.com/tutorials/sunny-buddy-solar-charger-v13-hookup-guide-) to efficiently charge a battery with solar power.
