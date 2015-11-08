import React from 'react';
import ReactDOM from 'react-dom';

import HelloMessage from './hello.jsx';



document.addEventListener('DOMContentLoaded', () => {

console.log('hi');

const mount_node = document.createElement('div');
document.body.appendChild(mount_node);

ReactDOM.render(<HelloMessage> haha </HelloMessage>, mount_node);

});
