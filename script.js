const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Particle {
    constructor(x, y, size, color, speedX, speedY) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
        this.speedX = speedX;
        this.speedY = speedY;
        this.opacity = 1.0;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.size -= 0.05;
        this.opacity -= 0.005;
    }

    isAlive() {
        return this.size > 0 && this.opacity > 0;
    }

    draw() {
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
    }
}

const particles = [];

function generateRandomColor() {
    const r = Math.floor(Math.random() * 200 + 55);
    const g = Math.floor(Math.random() * 200 + 55);
    const b = 225;
    return `rgb(${r}, ${g}, ${b})`;
}

function createParticles(x, y) {
    const particleCount = 5;
    const maxSize = 30;
    const minSize = 10;

    for (let i = 0; i < particleCount; i++) {
        const size = Math.random() * (maxSize - minSize) + minSize;
        const color = generateRandomColor();
        const speedX = Math.random() * 12 - 6;
        const speedY = Math.random() * 12 - 6;
        particles.push(new Particle(x, y, size, color, speedX, speedY));
    }
}

function animate() {
    // Añadir un rectángulo semitransparente para dejar un rastro
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        if (!particles[i].isAlive()) {
            particles.splice(i, 1);
            i--;
        }
    }

    requestAnimationFrame(animate);
}

document.addEventListener('mousemove', (event) => {
    const { clientX, clientY } = event;
    createParticles(clientX, clientY);
});

animate();