'use strict';

const questions = [ 
  { 
    _id: '111111111111111111111101',
    img: 'https://classicalmel.files.wordpress.com/2015/10/glissando.jpg',
    name: 'Glissando', 
    description: 'a continuous slide upward or downward between two notes', 
    memoryStrength: 0,
    next: 1
  }, 
  { 
    _id: '111111111111111111111102', 
    img: 'https://www.thoughtco.com/thmb/8viKsaXj49Dk5s_fcwBhte3_DRo=/735x0/GL_fermata-music-56a72d325f9b58b7d0e79952.png', 
    name: 'Fermata', 
    description: 'a pause of unspecified length on a note or rest', 
    memoryStrength: 0,
    next: 2
  },
  { 
    _id: '111111111111111111111103',
    img: 'https://d4u3lqifjlxra.cloudfront.net/uploads/example/file/163/breathmark.jpg', 
    name: 'Breath Mark', 
    description: 'take a breath', 
    memoryStrength: 0,
    next: 3
  }, 
  { 
    _id: '111111111111111111111104',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Sfz.svg/1249px-Sfz.svg.png', 
    name: 'Sforzando', 
    description: '(especially as a direction) with sudden emphasis', 
    memoryStrength: 0, 
    next: 4
  }, 
  {
    _id: '111111111111111111111105', 
    img: 'https://upload.wikimedia.org/wikipedia/commons/e/e0/Lydian_augmented_scale_on_C.png', 
    name: 'Lydian', 
    description: 'the mode represented by the natural diatonic scale F–F (containing an augmented 4th)',
    memoryStrength: 0, 
    next: 5
  }, 
  { 
    _id: '111111111111111111111106', 
    img: 'https://www.cs.uky.edu/~raphael/shapes.png', 
    name: 'Shape Notes', 
    description: 'Shape notes are a variant system of Western musical notation whereby the note heads are printed in distinct shapes to indicate their scale degree and solmization syllable (fa, sol, la, etc.).', 
    memoryStrength: 0, 
    next: 6
  }, 
  { 
    _id: '111111111111111111111106', 
    img: 'https://www.thoughtco.com/thmb/V01b-ZIUXfPPjU7hLOde1k8rmRk=/640x528/filters:no_upscale()/Sustain-PIANO_MUSIC-56a72ea53df78cf7729318b2.png', 
    name: 'Sustain', 
    description: 'A sustain pedal or sustaining pedal is the most commonly used pedal in a modern piano. It is typically the rightmost of two or three pedals. When pressed, the sustain pedal "sustains" all the damped strings on the piano by moving all the dampers away from the strings and allowing them to vibrate freely.', 
    memoryStrength: 0, 
    next: 7
  }, 
  { 
    _id: '111111111111111111111107', 
    img: 'http://www.bassflute.co.uk/05-percussive-effects-and-articulation/images/flutter-tonguing.png', 
    name: 'Flutter Tongue', 
    description: 'Flutter-tonguing is a wind instrument tonguing technique in which performers flutter their tongue to make a characteristic "FrrrrFrrrrr" sound.', 
    memoryStrength: 0, 
    next: 8
  }, 
  { 
    _id: '111111111111111111111108', 
    img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAMAAACahl6sAAAAbFBMVEX///+ZmZkAAACgoKD4+Pjf398gICATExOGhoYZGRkHBweSkpIKCgpfX182Njbz8/NFRUUvLy9nZ2fFxcV8fHzb29t2dnbQ0NBEREQ6OjqwsLBYWFhvb28nJydRUVGrq6vo6OjBwcG4uLiAgIC5gPLSAAADCUlEQVR4nO3c61LiQBQEYGgIuRLDPSoIuu//jjujCJgQqtbJMOew/f1RKAtOVy6TdIGDARERkXCrVegJepIkoSfoSfkceoJ+RMAh9Ay9yIFR6Bl6UQNvoWfowwFAMQ49RQ9GJgg+Qk/RgzcbZB56CndPmQ2Shh7D3R7IYmATeg5nr+acNQWWoedwNS7MKmK2yiz0IK4+zJ71ZI+TKPQkjuZANRhUQB56EkfmOB9+XqVUoSdx847PK8bI7mChZ3GyBWr7cwbsQ8/iZHI8ONbANPQsLjY43ossgFjzheMSKL9+S4H3sLM42QHH+3WzuG/DzuJiZfasY4NiFvdJ2GFcJOdLE7u4671wLIE/379Xp71MH7MMnreCWdzVtkJm9t3pQQS9rVANrM+PZmpbIVufLM4Pl2pbodHPM+5CbSv01lgDU6WtkF05flyVTJW2QvtmCdR6QonX5gawm2jR8ceC2fqkcUhUKluhj/YdSK6yFZq37wnt4q6uFRrHwEvzyZnCVsguf63eZK2+FaL/0PBBMIg0dwiSzOtdGmco0vI19/Yuvg/Bp7zEhUJpkTJOYjTUGm8SN7tmDKgs5UfZlRwK+8bh1Rj6uuyX69tDXd+4KDpyXJSPGkSt05XSLVJ35tBVCb1052jfN0pWdedIVa2InUe6spv2Q3eOMvRs/yTqzBHrqoM6g2TK6viuIJm2z6N0BJmou168HmSm6/iwrgUpPN+Njn1YtXPUGy/vdOKnfEhQVJdXjdnz0sv7XPAVJB4O13X6tU+VU3/lyYnHIEa+3K4TL+/QMhj5kCP28ro3+DmDRJo/m3WJQaRhEGkYRBoGkYZBpGEQaRhEGgaRhkGkCRHES6Xx3aLcEYPcxCC/5+fA41lLGgaRhkGkYRBpGEQaBpGGQaRhEGkYRBoGceClCWCL8nsMchN7LWkYRBoGkYZBpGEQaRhEGgaRhkGkYRBpGMSBly8FrjDx8ro3PE754OVVkyL18ro3PM7/17r39wV9ufvJhYiIiIiIiIiIiIiIiIiIiIiIiEiEv0CPMCiBj6A4AAAAAElFTkSuQmCC', 
    name : 'Marcato', 
    description: '(especially as a direction) with emphasis.', 
    memoryStrength: 0, 
    next: 9
  }, 
  { 
    _id: '111111111111111111111109', 
    img: 'https://d1k5w7mbrh6vq5.cloudfront.net/images/cache/25/1b/74/251b742c671108f13558963adc56da8a.png', 
    name: 'Tenuto', 
    description: '(especially as a direction) with a note or chord held for its full time value or slightly more.', 
    memoryStrength: 0, 
    next: 10
  }, 
  { 
    _id: '111111111111111111111109', 
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Middle_C_pizz.png/220px-Middle_C_pizz.png', 
    name: 'Pizzicato', 
    description: 'used as a direction in music to indicate that notes should be played by plucking the strings of a violin, viola, cello, etc., with the fingers instead of by using a bow', 
    memoryStrength: 0, 
    next: null
  }

]; 

module.exports = questions; 

