import * as THREE from 'three';

export class InputManager {
    constructor(domElement) {
        this.domElement = domElement;
        this.mouseDown = false;
        this.mousePos = new THREE.Vector2();
        
        this._initListeners();
    }

    _initListeners() {
        const updateMouse = (e) => {
            this.mousePos.x = (e.clientX / window.innerWidth) * 2 - 1;
            this.mousePos.y = -(e.clientY / window.innerHeight) * 2 + 1;
        };

        window.addEventListener('mousedown', (e) => {
            this.mouseDown = true;
            updateMouse(e);
        });
        window.addEventListener('mousemove', (e) => {
            updateMouse(e);
        });
        window.addEventListener('mouseup', () => this.mouseDown = false);
        
        const touchHandler = (e, state) => {
            const target = e.target;
            if (target === this.domElement || target.closest('#game-container')) {
                if (e.touches.length > 0) {
                    const touch = e.touches[0];
                    this.mousePos.x = (touch.clientX / window.innerWidth) * 2 - 1;
                    this.mousePos.y = -(touch.clientY / window.innerHeight) * 2 + 1;
                }
                if (state) e.preventDefault();
                this.mouseDown = state;
            }
        };

        window.addEventListener('touchstart', (e) => touchHandler(e, true), {passive: false});
        window.addEventListener('touchmove', (e) => touchHandler(e, true), {passive: false});
        window.addEventListener('touchend', (e) => touchHandler(e, false), {passive: false});
    }
}

