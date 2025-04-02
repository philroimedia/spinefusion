// JavaScript for Spine Fusion Interactive Graphic

document.addEventListener('DOMContentLoaded', function() {
    // Initialize SVG for spine model in stage 1
    initializeSpineModel();
    
    // Set up event listeners for navigation
    setupNavigation();
    
    // Set up expandable sections
    setupExpandableSections();
    
    // Set up view controls for spine model
    setupViewControls();
    
    // Set up healthcare team interactions
    setupHealthcareTeam();

    // Add some animations for initial load
    animateInitialLoad();
});

// Initialize the spine model SVG
function initializeSpineModel() {
    const spineModel = document.getElementById('spine-model-1');
    
    // Create SVG element
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    svg.setAttribute('viewBox', '0 0 200 400');
    
    // Create a simplified spine model
    // Cervical vertebrae (C1-C7)
    for (let i = 0; i < 7; i++) {
        const vertebra = createVertebra(100, 30 + i * 20, 30, 10, '#e0e0e0');
        svg.appendChild(vertebra);
    }
    
    // Thoracic vertebrae (T1-T12)
    for (let i = 0; i < 12; i++) {
        const vertebra = createVertebra(100, 170 + i * 15, 35, 12, '#e0e0e0');
        svg.appendChild(vertebra);
    }
    
    // Lumbar vertebrae (L1-L5) - highlight L4-L5 as problem area
    for (let i = 0; i < 5; i++) {
        let color = '#e0e0e0';
        if (i >= 3) {
            color = '#ffcccc'; // Highlight L4-L5 as problem area
        }
        const vertebra = createVertebra(100, 350 + i * 20, 45, 15, color);
        svg.appendChild(vertebra);
    }
    
    // Add discs between vertebrae
    for (let i = 0; i < 23; i++) {
        let y = 0;
        let width = 0;
        
        if (i < 6) {
            // Cervical discs
            y = 40 + i * 20;
            width = 25;
        } else if (i < 18) {
            // Thoracic discs
            y = 180 + (i - 6) * 15;
            width = 30;
        } else {
            // Lumbar discs
            y = 360 + (i - 18) * 20;
            width = 40;
            
            // Highlight problematic disc
            if (i >= 21) {
                const disc = createDisc(100, y, width, 5, '#ff6666');
                svg.appendChild(disc);
                continue;
            }
        }
        
        const disc = createDisc(100, y, width, 5, '#b3d9ff');
        svg.appendChild(disc);
    }
    
    // Add the SVG to the spine model container
    spineModel.appendChild(svg);
}

// Create a vertebra shape
function createVertebra(x, y, width, height, fill) {
    const vertebra = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    vertebra.setAttribute('x', x - width / 2);
    vertebra.setAttribute('y', y - height / 2);
    vertebra.setAttribute('width', width);
    vertebra.setAttribute('height', height);
    vertebra.setAttribute('rx', 3);
    vertebra.setAttribute('ry', 3);
    vertebra.setAttribute('fill', fill);
    vertebra.setAttribute('stroke', '#999');
    vertebra.setAttribute('stroke-width', '1');
    return vertebra;
}

// Create a disc shape
function createDisc(x, y, width, height, fill) {
    const disc = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
    disc.setAttribute('cx', x);
    disc.setAttribute('cy', y);
    disc.setAttribute('rx', width / 2);
    disc.setAttribute('ry', height / 2);
    disc.setAttribute('fill', fill);
    disc.setAttribute('stroke', '#999');
    disc.setAttribute('stroke-width', '1');
    return disc;
}

// Set up navigation between stages
function setupNavigation() {
    const stageButtons = document.querySelectorAll('.stage-btn');
    const timelineMarkers = document.querySelectorAll('.timeline-marker');
    const timeline = document.querySelector('.timeline');
    
    // Function to change active stage
    function changeStage(stageNum) {
        // Convert to number to ensure proper comparison
        const stage = parseInt(stageNum);
        
        // Update buttons
        stageButtons.forEach(btn => {
            btn.classList.remove('active');
            if (parseInt(btn.getAttribute('data-stage')) === stage) {
                btn.classList.add('active');
            }
        });
        
        // Update timeline markers
        timelineMarkers.forEach(marker => {
            marker.classList.remove('active');
            if (parseInt(marker.getAttribute('data-stage')) === stage) {
                marker.classList.add('active');
            }
        });
        
        // Update timeline progress
        updateTimelineProgress(stage);
        
        // Update content sections with fade transition
        const stageContents = document.querySelectorAll('.stage-content');
        
        // First hide all sections
        stageContents.forEach(content => {
            if (content.classList.contains('active')) {
                content.classList.remove('active');
            }
        });
        
        // Then show the selected one after a small delay for better transition
        setTimeout(() => {
            stageContents.forEach(content => {
                if (content.id === `stage-${stage}`) {
                    content.classList.add('active');
                }
            });
        }, 50);
        
        // Scroll to content if on mobile
        if (window.innerWidth < 768) {
            const contentContainer = document.querySelector('.content-container');
            contentContainer.scrollIntoView({ behavior: 'smooth' });
        }
    }
    
    function updateTimelineProgress(stage) {
        // Calculate progress percentage based on active stage
        const progressPercentage = ((stage - 1) / 7) * 100;
        const timelineBefore = timeline.querySelector(':before') || timeline;
        
        // Apply style directly to timeline element using CSS custom property
        timeline.style.setProperty('--progress-width', `${progressPercentage}%`);
    }
    
    // Add click event to stage buttons
    stageButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const stageNum = this.getAttribute('data-stage');
            changeStage(stageNum);
        });
    });
    
    // Add click event to timeline markers
    timelineMarkers.forEach(marker => {
        marker.addEventListener('click', function() {
            const stageNum = this.getAttribute('data-stage');
            changeStage(stageNum);
        });
    });
    
    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        const activeStage = document.querySelector('.stage-btn.active');
        let currentStage = parseInt(activeStage.getAttribute('data-stage'));
        
        if (e.key === 'ArrowRight' && currentStage < 8) {
            changeStage(currentStage + 1);
        } else if (e.key === 'ArrowLeft' && currentStage > 1) {
            changeStage(currentStage - 1);
        }
    });
    
    // Set first stage as active
    changeStage(1);
}

// Set up expandable sections
function setupExpandableSections() {
    const expandableHeaders = document.querySelectorAll('.expandable-header');
    
    expandableHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const section = this.parentElement;
            section.classList.toggle('open');
        });
    });
}

// Set up view controls for spine model
function setupViewControls() {
    const viewButtons = document.querySelectorAll('.view-btn');
    
    viewButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const view = this.getAttribute('data-view');
            
            // Remove active class from all buttons
            viewButtons.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Handle view change
            changeSpineView(view);
        });
    });
}

// Change the spine view based on button click
function changeSpineView(view) {
    const spineModel = document.getElementById('spine-model-1');
    const svg = spineModel.querySelector('svg');
    
    switch(view) {
        case 'front':
            svg.style.transform = 'rotateY(0deg)';
            break;
        case 'side':
            svg.style.transform = 'rotateY(90deg)';
            break;
        case 'problem':
            // Highlight problem area
            const vertebrae = svg.querySelectorAll('rect');
            const discs = svg.querySelectorAll('ellipse');
            
            // Reset all elements
            vertebrae.forEach(v => {
                v.setAttribute('fill', '#e0e0e0');
                v.setAttribute('stroke-width', '1');
            });
            
            discs.forEach(d => {
                d.setAttribute('fill', '#b3d9ff');
                d.setAttribute('stroke-width', '1');
            });
            
            // Highlight L4-L5 area
            vertebrae[vertebrae.length - 2].setAttribute('fill', '#ff9999');
            vertebrae[vertebrae.length - 1].setAttribute('fill', '#ff9999');
            vertebrae[vertebrae.length - 2].setAttribute('stroke-width', '2');
            vertebrae[vertebrae.length - 1].setAttribute('stroke-width', '2');
            
            discs[discs.length - 1].setAttribute('fill', '#ff6666');
            discs[discs.length - 1].setAttribute('stroke-width', '2');
            break;
    }
}

// Set up healthcare team interactions
function setupHealthcareTeam() {
    const teamMembers = document.querySelectorAll('.team-member');
    
    teamMembers.forEach(member => {
        member.addEventListener('click', function() {
            const role = this.getAttribute('data-role');
            showRoleDescription(role, this);
        });
    });
}

// Show role description for healthcare team member
function showRoleDescription(role, element) {
    // Remove any existing description
    const existingDesc = document.querySelector('.role-description');
    if (existingDesc) {
        existingDesc.remove();
    }
    
    // Create description element
    const description = document.createElement('div');
    description.className = 'role-description';
    description.style.position = 'absolute';
    description.style.backgroundColor = 'white';
    description.style.border = '1px solid #ddd';
    description.style.borderRadius = '4px';
    description.style.padding = '10px';
    description.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    description.style.zIndex = '100';
    description.style.maxWidth = '250px';
    
    // Set description content based on role
    switch(role) {
        case 'primary-care':
            description.innerHTML = '<strong>Primary Care Physician</strong><p>Provides initial assessment, referrals to specialists, and coordinates overall care throughout the patient journey.</p>';
            break;
        case 'neurologist':
            description.innerHTML = '<strong>Neurologist</strong><p>Specializes in diagnosing and treating conditions of the nervous system, including spinal cord and nerve-related issues.</p>';
            break;
        case 'spine-surgeon':
            description.innerHTML = '<strong>Spine Surgeon</strong><p>Orthopedic surgeon or neurosurgeon who specializes in spine surgery and performs the fusion procedure.</p>';
            break;
        case 'radiologist':
            description.innerHTML = '<strong>Radiologist</strong><p>Interprets diagnostic imaging studies such as X-rays, MRIs, and CT scans to help diagnose spinal conditions.</p>';
            break;
    }
    
    // Add close button
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '×';
    closeBtn.style.position = 'absolute';
    closeBtn.style.top = '5px';
    closeBtn.style.right = '5px';
    closeBtn.style.border = 'none';
    closeBtn.style.background = 'none';
    closeBtn.style.fontSize = '16px';
    closeBtn.style.cursor = 'pointer';
    closeBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        description.remove();
    });
    description.appendChild(closeBtn);
    
    // Position the description near the clicked element
    const rect = element.getBoundingClientRect();
    description.style.top = (rect.bottom + window.scrollY + 10) + 'px';
    description.style.left = (rect.left + window.scrollX) + 'px';
    
    // Add to document
    document.body.appendChild(description);
    
    // Close when clicking outside
    document.addEventListener('click', function closeDesc(e) {
        if (!description.contains(e.target) && e.target !== element) {
            description.remove();
            document.removeEventListener('click', closeDesc);
        }
    });
}

// Function to animate elements on initial page load
function animateInitialLoad() {
    const header = document.querySelector('header');
    const navigationBar = document.querySelector('.journey-nav');
    const timelineContainer = document.querySelector('.timeline-container');
    const contentContainer = document.querySelector('.content-container');
    
    // Add fade-in and slide-up animations with sequential timing
    setTimeout(() => {
        header.style.opacity = '1';
        header.style.transform = 'translateY(0)';
    }, 100);
    
    setTimeout(() => {
        navigationBar.style.opacity = '1';
        navigationBar.style.transform = 'translateY(0)';
    }, 300);
    
    setTimeout(() => {
        timelineContainer.style.opacity = '1';
        timelineContainer.style.transform = 'translateY(0)';
    }, 500);
    
    setTimeout(() => {
        contentContainer.style.opacity = '1';
        contentContainer.style.transform = 'translateY(0)';
    }, 700);
}
