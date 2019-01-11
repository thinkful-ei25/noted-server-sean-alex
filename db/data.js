'use strict';

const questions = [ 
  { 
    _id: '111111111111111111111101',
    img: 'https://classicalmel.files.wordpress.com/2015/10/glissando.jpg',
    name: 'Glissando', 
    description: 'a continuous slide upward or downward between two notes', 
    memoryStrength: 1,
    next: 1
  }, 
  { 
    _id: '111111111111111111111102', 
    img: 'https://i.imgur.com/SKa1IlN.png', 
    name: 'Fermata', 
    description: 'a pause of unspecified length on a note or rest', 
    memoryStrength: 1,
    next: 2
  },
  { 
    _id: '111111111111111111111103',
    img: 'https://d4u3lqifjlxra.cloudfront.net/uploads/example/file/163/breathmark.jpg', 
    name: 'Breath Mark', 
    description: 'take a breath', 
    memoryStrength: 1,
    next: 3
  }, 
  { 
    _id: '111111111111111111111104',
    img: 'https://i.imgur.com/FtbWwOL.jpg', 
    name: 'Sforzando', 
    description: '(especially as a direction) with sudden emphasis', 
    memoryStrength: 1, 
    next: 4
  }, 
  {
    _id: '111111111111111111111105', 
    img: 'https://upload.wikimedia.org/wikipedia/commons/e/e0/Lydian_augmented_scale_on_C.png', 
    name: 'Lydian', 
    description: 'the mode represented by the natural diatonic scale F–F (containing an augmented 4th)',
    memoryStrength: 1, 
    next: 5
  }, 
  { 
    _id: '111111111111111111111106', 
    img: 'https://www.uml.edu/Images/notes_tcm18-38391.jpg', 
    name: 'Shape Notes', 
    description: 'Shape notes are a variant system of Western musical notation whereby the note heads are printed in distinct shapes to indicate their scale degree and solmization syllable (fa, sol, la, etc.).', 
    memoryStrength: 1, 
    next: 6
  }, 
  { 
    _id: '111111111111111111111107', 
    img: 'https://i.imgur.com/w0lbNjg.jpg', 
    name: 'Sustain', 
    description: 'A sustain pedal or sustaining pedal is the most commonly used pedal in a modern piano. It is typically the rightmost of two or three pedals. When pressed, the sustain pedal "sustains" all the damped strings on the piano by moving all the dampers away from the strings and allowing them to vibrate freely.', 
    memoryStrength: 1, 
    next: 7
  }, 
  { 
    _id: '111111111111111111111107', 
    img: 'https://i.imgur.com/mcwSiYv.jpg', 
    name: 'Flutter Tongue', 
    description: 'Flutter-tonguing is a wind instrument tonguing technique in which performers flutter their tongue to make a characteristic "FrrrrFrrrrr" sound.', 
    memoryStrength: 1, 
    next: 8
  }, 
  { 
    _id: '111111111111111111111108', 
    img: 'https://i.imgur.com/40ulGGB.png', 
    name : 'Marcato', 
    description: '(especially as a direction) with emphasis.', 
    memoryStrength: 1, 
    next: 9
  }, 
  { 
    _id: '111111111111111111111109', 
    img: 'https://i.imgur.com/7xUz2OP.jpg', 
    name: 'Tenuto', 
    description: '(especially as a direction) with a note or chord held for its full time value or slightly more.', 
    memoryStrength: 1, 
    next: 10
  }, 
  { 
    _id: '111111111111111111111110', 
    img: 'https://i.imgur.com/nJ7kL94.png', 
    name: 'Pizzicato', 
    description: 'used as a direction in music to indicate that notes should be played by plucking the strings of a violin, viola, cello, etc., with the fingers instead of by using a bow', 
    memoryStrength: 1, 
    next: null
  }

];  

module.exports = questions; 

