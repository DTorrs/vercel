// Cursor personalizado
const cursor = document.getElementById('cursor');
const hoverElements = document.querySelectorAll('.hover-glow, .tech-item, .experience-item, .project-link');

document.addEventListener('mousemove', (e) => {
    requestAnimationFrame(() => {
        cursor.style.left = e.clientX - 20 + 'px';
        cursor.style.top = e.clientY - 13 + 'px';
    });
});

hoverElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursor.classList.add('hover');
    });
    
    element.addEventListener('mouseleave', () => {
        cursor.classList.remove('hover');
    });
});

// Generar Neural Network con código flotante
function createNeuralNetwork() {
    const neural = document.getElementById('neural');
    const codeKeywords = [
        'function', 'const', 'let', 'var', 'if', 'else', 'for', 'while', 'return', 
        'class', 'import', 'export', 'async', 'await', 'try', 'catch', 'React',
        'Node.js', 'JavaScript', 'TypeScript', 'Python', 'Flutter', 'MySQL',
        'API', 'JSON', 'HTML', 'CSS', 'JWT', 'HTTP', 'HTTPS', 'Git', 'npm',
        'express', 'mongoose', 'axios', 'redux', 'useState', 'useEffect',
        'component', 'props', 'state', 'render', 'map', 'filter', 'reduce'
    ];
    
    // Crear nodos neurales
    function createNodes() {
        const nodeCount = 15;
        const nodes = [];
        
        for (let i = 0; i < nodeCount; i++) {
            const node = document.createElement('div');
            node.className = 'neural-node';
            
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * window.innerHeight;
            
            node.style.left = x + 'px';
            node.style.top = y + 'px';
            
            // Variaciones de color
            const colors = ['#4a90e2', '#5ba0f2', '#7db3f0', '#2d7dd2'];
            const color = colors[Math.floor(Math.random() * colors.length)];
            node.style.background = color;
            node.style.boxShadow = `0 0 10px ${color}`;
            
            // Delay aleatorio para animación
            node.style.animationDelay = Math.random() * 2 + 's';
            
            neural.appendChild(node);
            nodes.push({element: node, x: x, y: y});
        }
        
        return nodes;
    }
    
    // Crear conexiones entre nodos
    function createConnections(nodes) {
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const distance = Math.sqrt(
                    Math.pow(nodes[i].x - nodes[j].x, 2) + 
                    Math.pow(nodes[i].y - nodes[j].y, 2)
                );
                
                // Solo conectar nodos cercanos
                if (distance < 200 && Math.random() < 0.6) {
                    const connection = document.createElement('div');
                    connection.className = 'neural-connection';
                    
                    const angle = Math.atan2(nodes[j].y - nodes[i].y, nodes[j].x - nodes[i].x);
                    
                    connection.style.left = nodes[i].x + 'px';
                    connection.style.top = nodes[i].y + 'px';
                    connection.style.width = distance + 'px';
                    connection.style.transform = `rotate(${angle}rad)`;
                    connection.style.animationDelay = Math.random() * 3 + 's';
                    
                    neural.appendChild(connection);
                }
            }
        }
    }
    
    // Crear código flotante
    function createFloatingCode() {
        const code = document.createElement('div');
        code.className = 'floating-code';
        
        // Posición vertical aleatoria
        code.style.top = Math.random() * window.innerHeight + 'px';
        
        // Keyword aleatorio
        const keyword = codeKeywords[Math.floor(Math.random() * codeKeywords.length)];
        code.textContent = keyword;
        
        // Duración aleatoria
        const duration = Math.random() * 4 + 6; // 6-10 segundos
        code.style.animationDuration = duration + 's';
        
        // Color aleatorio
        const colors = ['#4a90e2', '#5ba0f2', '#7db3f0', '#9fc5f8'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        code.style.color = color;
        code.style.textShadow = `0 0 5px ${color}`;
        
        neural.appendChild(code);
        
        // Eliminar después de la animación
        setTimeout(() => {
            if (code.parentNode) {
                code.parentNode.removeChild(code);
            }
        }, duration * 1000);
    }
    
    // Inicializar red neural
    const nodes = createNodes();
    createConnections(nodes);
    
    // Crear código flotante continuamente
    setInterval(() => {
        if (Math.random() < 0.8) { // 80% probabilidad
            createFloatingCode();
        }
    }, 1000);
    
    // Regenerar red neural periódicamente
    setInterval(() => {
        // Limpiar nodos y conexiones existentes
        const existingNodes = neural.querySelectorAll('.neural-node');
        const existingConnections = neural.querySelectorAll('.neural-connection');
        
        existingNodes.forEach(node => node.remove());
        existingConnections.forEach(connection => connection.remove());
        
        // Crear nueva red
        const newNodes = createNodes();
        createConnections(newNodes);
    }, 15000); // Cada 15 segundos
}

// Efectos de hover para secciones
const sections = document.querySelectorAll('.section');
sections.forEach((section, index) => {
    section.addEventListener('mouseenter', () => {
        section.style.transform = 'scale(1.02)';
        section.style.transition = 'all 0.3s ease';
    });
    
    section.addEventListener('mouseleave', () => {
        section.style.transform = 'scale(1)';
    });
});

// Animación de typing para el título
function typeWriter() {
    const title = document.querySelector('.title');
    // El título ya está centrado por defecto, solo necesita la animación
}

// Efecto parallax suave
document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    const moveX = (mouseX - 0.5) * 20;
    const moveY = (mouseY - 0.5) * 20;
    
    document.querySelectorAll('.floating').forEach(element => {
        element.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
});

// Inicializar efectos
document.addEventListener('DOMContentLoaded', () => {
    createNeuralNetwork();
    typeWriter();
    
    // Animaciones escalonadas para las secciones
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.section').forEach(section => {
        observer.observe(section);
    });
});

// Efectos de sonido hover (opcional - requiere archivos de audio)
hoverElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        // Aquí podrías agregar efectos de sonido
        element.style.filter = 'brightness(1.2)';
    });
    
    element.addEventListener('mouseleave', () => {
        element.style.filter = 'brightness(1)';
    });
});

// Animación especial para los links de proyectos
document.querySelectorAll('.project-link').forEach(link => {
    link.addEventListener('click', (e) => {
        const ripple = document.createElement('span');
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255,255,255,0.5)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.6s linear';
        ripple.style.left = (e.offsetX - 10) + 'px';
        ripple.style.top = (e.offsetY - 10) + 'px';
        ripple.style.width = ripple.style.height = '20px';
        
        link.style.position = 'relative';
        link.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Language Toggle Functionality
let currentLanguage = 'es';

const translations = {
    es: {
        'Información Personal': 'Información Personal',
        'Stack Tecnológico': 'Stack Tecnológico',
        'Experiencia Laboral': 'Experiencia Laboral',
        'Desarrollador Full Stack • Madrid, España': 'Desarrollador Full Stack • Madrid, España',
        'Sistema web e-commerce completo con traductor automático, sistema multimoneda que detecta IP del usuario para mostrar precios en moneda local, módulo de administración para gestión de marcas, productos, categorías, usuarios y órdenes. Integración con servicio de correos Zoho, pasarela de pagos PayPal e implementación de chatbot con inteligencia artificial.': 'Sistema web e-commerce completo con traductor automático, sistema multimoneda que detecta IP del usuario para mostrar precios en moneda local, módulo de administración para gestión de marcas, productos, categorías, usuarios y órdenes. Integración con servicio de correos Zoho, pasarela de pagos PayPal e implementación de chatbot con inteligencia artificial.',
        'Sitio Web': 'Sitio Web',
        'Demo': 'Demo',
        'Desarrollador Full Stack • Medellín, Colombia': 'Desarrollador Full Stack • Medellín, Colombia',
        'Landing page corporativa con sistema de gestión de productos por categorías, carrito de compras, formulario de contacto con validaciones, integración con WhatsApp Business y optimización completa para dispositivos móviles.': 'Landing page corporativa con sistema de gestión de productos por categorías, carrito de compras, formulario de contacto con validaciones, integración con WhatsApp Business y optimización completa para dispositivos móviles.'
    },
    en: {
        'Información Personal': 'Personal Information',
        'Stack Tecnológico': 'Technology Stack',
        'Experiencia Laboral': 'Work Experience',
        'Desarrollador Full Stack • Madrid, España': 'Full Stack Developer • Madrid, Spain',
        'Sistema web e-commerce completo con traductor automático, sistema multimoneda que detecta IP del usuario para mostrar precios en moneda local, módulo de administración para gestión de marcas, productos, categorías, usuarios y órdenes. Integración con servicio de correos Zoho, pasarela de pagos PayPal e implementación de chatbot con inteligencia artificial.': 'Complete e-commerce web system with automatic translator, multi-currency system that detects user IP to show prices in local currency, administration module for managing brands, products, categories, users and orders. Integration with Zoho mail service, PayPal payment gateway and AI chatbot implementation.',
        'Sitio Web': 'Website',
        'Demo': 'Demo',
        'Desarrollador Full Stack • Medellín, Colombia': 'Full Stack Developer • Medellín, Colombia',
        'Landing page corporativa con sistema de gestión de productos por categorías, carrito de compras, formulario de contacto con validaciones, integración con WhatsApp Business y optimización completa para dispositivos móviles.': 'Corporate landing page with product management system by categories, shopping cart, contact form with validations, WhatsApp Business integration and complete optimization for mobile devices.'
    }
};

function toggleLanguage() {
    currentLanguage = currentLanguage === 'es' ? 'en' : 'es';
    
    // Update language indicator
    document.getElementById('currentLang').textContent = currentLanguage.toUpperCase();
    
    // Update elements with data attributes
    document.querySelectorAll('[data-es][data-en]').forEach(element => {
        // Special handling for phone and email fields
        if (element.querySelector('strong')) {
            const strongElement = element.querySelector('strong');
            if (currentLanguage === 'es') {
                strongElement.textContent = element.getAttribute('data-es');
            } else {
                strongElement.textContent = element.getAttribute('data-en');
            }
        } else {
            // Regular handling for other elements
            if (currentLanguage === 'es') {
                element.innerHTML = element.getAttribute('data-es');
            } else {
                element.innerHTML = element.getAttribute('data-en');
            }
        }
    });
    
    // Update other text elements
    Object.keys(translations[currentLanguage]).forEach(key => {
        document.querySelectorAll('*').forEach(element => {
            if (element.children.length === 0 && element.textContent.trim() === key) {
                element.textContent = translations[currentLanguage][key];
            }
        });
    });
    
    // Restart typewriter animation for title
    const titleElement = document.querySelector('.typewriter');
    if (titleElement) {
        titleElement.style.animation = 'none';
        titleElement.offsetHeight; // Trigger reflow
        titleElement.style.animation = 'typewriter 3s steps(30, end), blink-caret 0.75s step-end 6 3s, remove-caret 0s 7.5s forwards';
    }
}

// Add event listener to language toggle button
document.getElementById('languageToggle').addEventListener('click', toggleLanguage);