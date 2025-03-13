document.addEventListener('DOMContentLoaded', function() {
  // Initialize 3D rotation based on mouse movement
  initMouseRotation();
  
  // Initialize tab switching
  initTabs();
  
  // Initialize form validation and submission
  initForms();
  
  // Initialize matrix rain effect
  initMatrixRain();
  
  // Initialize 3D cube animation
  initCubeAnimation();
  
  // Add glitch effects randomly
  initGlitchEffects();
  
  // Initialize hover effects on inputs
  initInputEffects();
  
  // Create loading animation
  showLoadingAnimation();
});

// Show loading animation on page load
function showLoadingAnimation() {
  // Create loading element
  const loadingEl = document.createElement('div');
  loadingEl.className = 'cyber-loading';
  
  const loadingCircle = document.createElement('div');
  loadingCircle.className = 'loading-circle';
  
  loadingEl.appendChild(loadingCircle);
  document.body.appendChild(loadingEl);
  
  // Hide loading animation after 2 seconds
  setTimeout(() => {
    loadingEl.classList.add('hide');
    setTimeout(() => {
      loadingEl.remove();
    }, 500);
  }, 2000);
}

// Initialize 3D rotation based on mouse movement
function initMouseRotation() {
  const container = document.querySelector('.form-container');
  const cube = document.querySelector('.cyberpunk-cube');
  
  document.addEventListener('mousemove', (e) => {
    const x = e.clientX / window.innerWidth - 0.5;
    const y = e.clientY / window.innerHeight - 0.5;
    
    container.style.transform = `perspective(1000px) rotateX(${-y * 5}deg) rotateY(${x * 5}deg)`;
    cube.style.transform = `rotateX(${y * 20 + 180}deg) rotateY(${-x * 20 + 180}deg) rotateZ(0deg)`;
  });
  
  // Reset on mouse leave
  document.addEventListener('mouseleave', () => {
    container.style.transform = 'perspective(1000px) rotateX(2deg) rotateY(2deg)';
    cube.style.animation = 'rotate 20s infinite linear';
  });
}

// Initialize tab switching
function initTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const forms = document.querySelectorAll('.cyber-form');
  
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all buttons and forms
      tabBtns.forEach(b => b.classList.remove('active'));
      forms.forEach(f => f.classList.remove('active'));
      
      // Add active class to clicked button and corresponding form
      btn.classList.add('active');
      const formId = btn.getAttribute('data-tab') + '-form';
      document.getElementById(formId).classList.add('active');
      
      // Add glitch effect to form transition
      addTemporaryGlitch();
    });
  });
}

// Initialize form validation and submission
function initForms() {
  const forms = document.querySelectorAll('.cyber-form');
  
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Get all input fields
      const inputs = form.querySelectorAll('input');
      let isValid = true;
      
      // Validate each input
      inputs.forEach(input => {
        if (input.hasAttribute('required') && !input.value) {
          isValid = false;
          addInvalidEffect(input);
        }
      });
      
      // If valid, show success message
      if (isValid) {
        showSuccessMessage(form);
      }
    });
  });
  
  // Add invalid effect to input
  function addInvalidEffect(input) {
    input.style.borderColor = 'var(--accent)';
    input.style.animation = 'shake 0.5s ease';
    
    setTimeout(() => {
      input.style.borderColor = '';
      input.style.animation = '';
    }, 500);
  }
  
  // Show success message
  function showSuccessMessage(form) {
    // Create success overlay
    const overlay = document.createElement('div');
    overlay.style.position = 'absolute';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    overlay.style.display = 'flex';
    overlay.style.justifyContent = 'center';
    overlay.style.alignItems = 'center';
    overlay.style.zIndex = '100';
    overlay.style.borderRadius = '10px';
    overlay.style.animation = 'fadeIn 0.5s ease';
    
    // Create success message
    const message = document.createElement('div');
    message.textContent = form.id === 'signin-form' ? 'ACCESS GRANTED' : 'PROFILE INITIALIZED';
    message.style.color = 'var(--primary)';
    message.style.fontSize = '24px';
    message.style.fontWeight = 'bold';
    message.style.textShadow = '0 0 10px var(--primary)';
    message.style.letterSpacing = '3px';
    
    overlay.appendChild(message);
    form.appendChild(overlay);
    
    // Add glitch effect to form success
    addTemporaryGlitch();
    
    // Remove overlay after 2 seconds
    setTimeout(() => {
      overlay.style.animation = 'fadeOut 0.5s ease';
      setTimeout(() => {
        overlay.remove();
      }, 500);
    }, 2000);
  }
}

// Initialize matrix rain effect
function initMatrixRain() {
  const matrixContainer = document.createElement('div');
  matrixContainer.className = 'matrix-rain';
  document.body.appendChild(matrixContainer);
  
  const width = window.innerWidth;
  const numColumns = Math.floor(width / 20);
  
  for (let i = 0; i < numColumns; i++) {
    createRainColumn(matrixContainer, i * 20);
  }
  
  function createRainColumn(container, xPos) {
    const column = document.createElement('div');
    column.className = 'rain-column';
    column.style.left = `${xPos}px`;
    
    // Random characters
    const chars = "01";
    let text = '';
    const length = Math.floor(Math.random() * 20) + 5;
    
    for (let i = 0; i < length; i++) {
      text += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    
    column.textContent = text;
    
    // Random properties
    const speed = Math.random() * 3 + 1;
    const delay = Math.random() * 5;
    const opacity = Math.random() * 0.3 + 0.1;
    
    column.style.animation = `fallDown ${speed}s linear ${delay}s infinite`;
    column.style.opacity = opacity;
    
    container.appendChild(column);
  }
  
  // Add the keyframe animation dynamically
  const style = document.createElement('style');
  style.textContent = `
    @keyframes fallDown {
      0% {
        transform: translateY(-100%);
      }
      100% {
        transform: translateY(100vh);
      }
    }
  `;
  document.head.appendChild(style);
}

// Initialize cube animation with random speeds
function initCubeAnimation() {
  const cube = document.querySelector('.cyberpunk-cube');
  
  // Random rotation direction and speed
  const rotX = Math.random() * 360;
  const rotY = Math.random() * 360;
  const rotZ = Math.random() * 360;
  const duration = Math.random() * 10 + 15;
  
  cube.style.animation = `none`;
  
  setTimeout(() => {
    cube.style.animation = `rotate ${duration}s infinite linear`;
  }, 100);
}

// Add glitch effects randomly
function initGlitchEffects() {
  // Add temporary glitch effect
  setInterval(addTemporaryGlitch, 10000);
}

// Add temporary glitch effect to the form container
function addTemporaryGlitch() {
  const container = document.querySelector('.form-container');
  
  // Add glitch class
  container.style.animation = 'glitchEffect 0.5s ease';
  
  // Remove glitch class after animation
  setTimeout(() => {
    container.style.animation = '';
  }, 500);
  
  // Add the keyframe animation dynamically if it doesn't exist
  if (!document.querySelector('#glitchKeyframes')) {
    const style = document.createElement('style');
    style.id = 'glitchKeyframes';
    style.textContent = `
      @keyframes glitchEffect {
        0% {
          transform: translate(0);
        }
        20% {
          transform: translate(-5px, 5px);
        }
        40% {
          transform: translate(-5px, -5px);
        }
        60% {
          transform: translate(5px, 5px);
        }
        80% {
          transform: translate(5px, -5px);
        }
        100% {
          transform: translate(0);
        }
      }
      
      @keyframes shake {
        0%, 100% {
          transform: translateX(0);
        }
        20%, 60% {
          transform: translateX(-5px);
        }
        40%, 80% {
          transform: translateX(5px);
        }
      }
      
      @keyframes fadeOut {
        from {
          opacity: 1;
        }
        to {
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
  }
}

// Initialize input effects
function initInputEffects() {
  const inputs = document.querySelectorAll('input');
  
  inputs.forEach(input => {
    input.addEventListener('focus', () => {
      const line = input.nextElementSibling;
      if (line && line.classList.contains('cyber-line')) {
        line.style.width = '100%';
      }
    });
    
    input.addEventListener('blur', () => {
      const line = input.nextElementSibling;
      if (line && line.classList.contains('cyber-line')) {
        line.style.width = '0';
      }
    });
  });
}

// Add interactive social button effects
document.addEventListener('DOMContentLoaded', function() {
  const socialBtns = document.querySelectorAll('.social-btn');
  
  socialBtns.forEach(btn => {
    btn.addEventListener('mouseenter', () => {
      // Add pulse effect
      btn.style.animation = 'pulse 0.5s ease';
      
      // Add glow effect
      btn.style.boxShadow = '0 0 15px var(--primary)';
      
      // Add rotate effect
      const icon = btn.querySelector('i');
      if (icon) {
        icon.style.transform = 'rotate(360deg)';
        icon.style.transition = 'transform 0.5s ease';
      }
    });
    
    btn.addEventListener('mouseleave', () => {
      // Remove effects
      btn.style.animation = '';
      btn.style.boxShadow = '';
      
      const icon = btn.querySelector('i');
      if (icon) {
        icon.style.transform = '';
      }
    });
  });
  
  // Add the keyframe animation dynamically if it doesn't exist
  if (!document.querySelector('#pulseKeyframes')) {
    const style = document.createElement('style');
    style.id = 'pulseKeyframes';
    style.textContent = `
      @keyframes pulse {
        0% {
          transform: scale(1);
        }
        50% {
          transform: scale(1.1);
        }
        100% {
          transform: scale(1);
        }
      }
    `;
    document.head.appendChild(style);
  }
});

// Add interactive 3D depth effect on form fields
document.addEventListener('DOMContentLoaded', function() {
  const inputs = document.querySelectorAll('.cyber-form input');
  
  inputs.forEach(input => {
    input.addEventListener('focus', () => {
      input.style.transform = 'translateZ(10px)';
      input.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.3)';
      input.style.transition = 'all 0.3s ease';
    });
    
    input.addEventListener('blur', () => {
      input.style.transform = 'translateZ(0)';
      input.style.boxShadow = '';
    });
  });
});

// Create dynamic background particles
document.addEventListener('DOMContentLoaded', function() {
  createBackgroundParticles();
});

function createBackgroundParticles() {
  const container = document.createElement('div');
  container.className = 'particles-container';
  container.style.position = 'fixed';
  container.style.top = '0';
  container.style.left = '0';
  container.style.width = '100%';
  container.style.height = '100%';
  container.style.pointerEvents = 'none';
  container.style.zIndex = '0';
  
  document.body.appendChild(container);
  
  for (let i = 0; i < 50; i++) {
    createParticle(container);
  }
}

function createParticle(container) {
  const particle = document.createElement('div');
  
  // Random properties
  const size = Math.random() * 5 + 1;
  const x = Math.random() * 100;
  const y = Math.random() * 100;
  const duration = Math.random() * 20 + 10;
  const delay = Math.random() * 5;
  
  // Apply styles
  particle.style.position = 'absolute';
  particle.style.width = `${size}px`;
  particle.style.height = `${size}px`;
  particle.style.borderRadius = '50%';
  particle.style.backgroundColor = 'var(--primary)';
  particle.style.boxShadow = '0 0 5px var(--primary)';
  particle.style.opacity = '0.3';
  particle.style.left = `${x}%`;
  particle.style.top = `${y}%`;
  particle.style.animation = `float ${duration}s ease-in-out ${delay}s infinite`;
  
  container.appendChild(particle);
  
  // Add the keyframe animation dynamically if it doesn't exist
  if (!document.querySelector('#floatKeyframes')) {
    const style = document.createElement('style');
    style.id = 'floatKeyframes';
    style.textContent = `
      @keyframes float {
        0%, 100% {
          transform: translateY(0) translateX(0);
        }
        25% {
          transform: translateY(-20px) translateX(10px);
        }
        50% {
          transform: translateY(0) translateX(20px);
        }
        75% {
          transform: translateY(20px) translateX(10px);
        }
      }
    `;
    document.head.appendChild(style);
  }
}
