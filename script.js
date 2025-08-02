"use strict";
// --- p5.js Sketch ---
const sketch = (p) => {
    let particles = [];
    class Particle {
        pos;
        vel;
        size;
        color;
        constructor() {
            this.pos = p.createVector(p.random(p.width), p.random(p.height));
            this.vel = p.createVector(p.random(-0.5, 0.5), p.random(-0.5, 0.5));
            this.size = p.random(2, 5);
            this.color = p.color(233, 69, 96, 150);
        }
        update() {
            this.pos.add(this.vel);
            this.edges();
        }
        show() {
            p.noStroke();
            p.fill(this.color);
            p.circle(this.pos.x, this.pos.y, this.size);
        }
        edges() {
            if (this.pos.x < 0 || this.pos.x > p.width)
                this.vel.x *= -1;
            if (this.pos.y < 0 || this.pos.y > p.height)
                this.vel.y *= -1;
        }
    }
    p.setup = () => {
        const canvas = p.createCanvas(p.windowWidth, p.windowHeight);
        const canvasParent = document.getElementById('particle-background');
        if (canvasParent) {
            canvas.parent(canvasParent);
        }
        for (let i = 0; i < 100; i++) {
            particles.push(new Particle());
        }
    };
    p.draw = () => {
        p.clear();
        for (const particle of particles) {
            particle.update();
            particle.show();
        }
    };
    p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
    };
};
// --- Main App Logic & Initialization ---
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('main section');
    function updateActiveLink(targetId) {
        navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${targetId}`);
        });
    }
    function switchSection(targetId) {
        const updatePage = () => {
            sections.forEach(section => {
                section.classList.toggle('hidden-section', section.id !== targetId);
                section.classList.toggle('active-section', section.id === targetId);
            });
            updateActiveLink(targetId);
        };
        // Using a type assertion because this is an experimental feature
        const documentWithTransition = document;
        if (documentWithTransition.startViewTransition) {
            const transition = documentWithTransition.startViewTransition(updatePage);
            transition.finished.then(() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }
        else {
            updatePage();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = e.currentTarget.getAttribute('href')?.substring(1);
            if (targetId) {
                switchSection(targetId);
            }
        });
    });
    updateActiveLink('intro');
}
document.addEventListener('DOMContentLoaded', () => {
    initializeNavigation();
    new p5(sketch);
});
