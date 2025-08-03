// This tells TypeScript that a 'p5' object exists globally, provided by the CDN script.
declare const p5: any;

// --- p5.js Sketch ---
const particleSketch = (p: any) => {
  let particles: any[] = [];

  class Particle {
    pos: any;
    vel: any;
    size: number;
    color: any;

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
      if (this.pos.x < 0 || this.pos.x > p.width) this.vel.x *= -1;
      if (this.pos.y < 0 || this.pos.y > p.height) this.vel.y *= -1;
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


const brainSketch = (p: any) => {
  let time = 0;

  p.setup = () => {
    const brainCanvas = p.createCanvas(50, 50);
    const brainParent = document.getElementById('brain-animation');
    if (brainParent) {
      brainCanvas.parent(brainParent);
    }
    p.frameRate(20);
  };

  const drawSulcus = (y_start: number, y_end: number, y_control: number) => {
    const x_start = p.width * 0.48;
    const x_end = p.width * 0.15 + p.noise(time + y_start) * p.width * 0.2;
    const x_control1 = p.width * 0.4;
    const y_control1 = y_start + (y_control - y_start) * 0.5;
    const x_control2 = x_end + (x_control1 - x_end) * 0.5;
    const y_control2 = y_control;

    p.bezier(x_start, y_start, x_control1, y_control1, x_control2, y_control2, x_end, y_end);
    // Mirror for the right hemisphere
    p.bezier(p.width - x_start, y_start, p.width - x_control1, y_control1, p.width - x_control2, y_control2, p.width - x_end, y_end);
  }

  p.draw = () => {
    p.clear();
    p.noFill();

    const style = getComputedStyle(document.documentElement);
    const fontColor = style.getPropertyValue('--font-color').trim();
    p.stroke(fontColor);
    p.strokeWeight(2);

    // Left Hemisphere Outline
    p.beginShape();
    p.curveVertex(p.width * 0.5, p.height * 0.95); // Bottom center
    p.curveVertex(p.width * 0.1, p.height * 0.6); // Left mid
    p.curveVertex(p.width * 0.2, p.height * 0.2); // Left top bump
    p.curveVertex(p.width * 0.4, p.height * 0.15); // Top center bump
    p.curveVertex(p.width * 0.5, p.height * 0.2); // Top center dip
    p.endShape();

    // Right Hemisphere Outline
    p.beginShape();
    p.curveVertex(p.width * 0.5, p.height * 0.95); // Bottom center
    p.curveVertex(p.width * 0.9, p.height * 0.6); // Right mid
    p.curveVertex(p.width * 0.8, p.height * 0.2); // Right top bump
    p.curveVertex(p.width * 0.6, p.height * 0.15); // Top center bump
    p.curveVertex(p.width * 0.5, p.height * 0.2); // Top center dip
    p.endShape();

    // Animated Sulci (grooves)
    p.strokeWeight(1);
    drawSulcus(p.height * 0.3, p.height * 0.35, p.height * 0.4);
    drawSulcus(p.height * 0.5, p.height * 0.6, p.height * 0.5);
    drawSulcus(p.height * 0.7, p.height * 0.8, p.height * 0.6);

    time += 0.03;
  };
};

// --- Main App Logic & Initialization ---
function initializeNavigation() {
  const navLinks = document.querySelectorAll<HTMLAnchorElement>('.nav-link');
  const sections = document.querySelectorAll<HTMLElement>('main section');

  function updateActiveLink(targetId: string): void {
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${targetId}`);
    });
  }

  function switchSection(targetId: string): void {
    const updatePage = () => {
      sections.forEach(section => {
        section.classList.toggle('hidden-section', section.id !== targetId);
        section.classList.toggle('active-section', section.id === targetId);
      });
      updateActiveLink(targetId);
    };

    // Using a type assertion because this is an experimental feature
    const documentWithTransition = document as any;
    if (documentWithTransition.startViewTransition) {
      const transition = documentWithTransition.startViewTransition(updatePage);
      transition.finished.then(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    } else {
      updatePage();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  navLinks.forEach(link => {
    link.addEventListener('click', (e: MouseEvent) => {
      e.preventDefault();
      const targetId = (e.currentTarget as HTMLAnchorElement).getAttribute('href')?.substring(1);
      if (targetId) {
        switchSection(targetId);
      }
    });
  });

  updateActiveLink('intro');
}

document.addEventListener('DOMContentLoaded', () => {
  initializeNavigation();
  new p5(particleSketch);
  new p5(brainSketch);
});