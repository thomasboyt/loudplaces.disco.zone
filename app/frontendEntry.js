/*
 * Include frontend-specific imports executed for side effects, like CSS, here.
 */

require('../styles/index.css');

import Modal from 'react-modal';

const mountPoint = document.getElementById('mount-point');

Modal.setAppElement(mountPoint);
