// used link : https://betterprogramming.pub/inject-html-in-react-using-iframe-ea3c85bdeec0
import React from 'react';
const Iframe = (props) => {
   let iframe_ref = null;
   const writeHTML = (frame) => {
   if (!frame) {
     return;
   }
   iframe_ref = frame;
   let doc = frame.contentDocument;
   doc.open();
   doc.write(props.content);
   doc.close();
   frame.style.width = '100%';
   frame.style.height = '600px';
 };
 return (
  <iframe src="about:blank" scrolling="yes" frameBorder="0" ref={writeHTML} 
  />
 );
};
export default Iframe;