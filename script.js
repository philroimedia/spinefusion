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
    
    // Clear any existing content
    spineModel.innerHTML = '';
    
    // Create SVG element
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    svg.setAttribute('viewBox', '0 0 300 600');
    svg.setAttribute('class', 'spine-svg');
    
    // Add gradient definitions
    const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
    
    // Vertebra gradient
    const vertebraGradient = document.createElementNS("http://www.w3.org/2000/svg", "linearGradient");
    vertebraGradient.setAttribute('id', 'vertebraGradient');
    vertebraGradient.setAttribute('x1', '0%');
    vertebraGradient.setAttribute('y1', '0%');
    vertebraGradient.setAttribute('x2', '100%');
    vertebraGradient.setAttribute('y2', '100%');
    
    const stop1 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
    stop1.setAttribute('offset', '0%');
    stop1.setAttribute('stop-color', '#e8e8e8');
    
    const stop2 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
    stop2.setAttribute('offset', '100%');
    stop2.setAttribute('stop-color', '#c0c0c0');
    
    vertebraGradient.appendChild(stop1);
    vertebraGradient.appendChild(stop2);
    
    // Disc gradient
    const discGradient = document.createElementNS("http://www.w3.org/2000/svg", "linearGradient");
    discGradient.setAttribute('id', 'discGradient');
    discGradient.setAttribute('x1', '0%');
    discGradient.setAttribute('y1', '0%');
    discGradient.setAttribute('x2', '100%');
    discGradient.setAttribute('y2', '100%');
    
    const discStop1 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
    discStop1.setAttribute('offset', '0%');
    discStop1.setAttribute('stop-color', '#d6eaff');
    
    const discStop2 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
    discStop2.setAttribute('offset', '100%');
    discStop2.setAttribute('stop-color', '#a1c4ff');
    
    discGradient.appendChild(discStop1);
    discGradient.appendChild(discStop2);
    
    // Problem area gradient
    const problemGradient = document.createElementNS("http://www.w3.org/2000/svg", "linearGradient");
    problemGradient.setAttribute('id', 'problemGradient');
    problemGradient.setAttribute('x1', '0%');
    problemGradient.setAttribute('y1', '0%');
    problemGradient.setAttribute('x2', '100%');
    problemGradient.setAttribute('y2', '100%');
    
    const problemStop1 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
    problemStop1.setAttribute('offset', '0%');
    problemStop1.setAttribute('stop-color', '#ffcccc');
    
    const problemStop2 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
    problemStop2.setAttribute('offset', '100%');
    problemStop2.setAttribute('stop-color', '#ff9999');
    
    problemGradient.appendChild(problemStop1);
    problemGradient.appendChild(problemStop2);
    
    // Problem disc gradient
    const problemDiscGradient = document.createElementNS("http://www.w3.org/2000/svg", "linearGradient");
    problemDiscGradient.setAttribute('id', 'problemDiscGradient');
    problemDiscGradient.setAttribute('x1', '0%');
    problemDiscGradient.setAttribute('y1', '0%');
    problemDiscGradient.setAttribute('x2', '100%');
    problemDiscGradient.setAttribute('y2', '100%');
    
    const problemDiscStop1 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
    problemDiscStop1.setAttribute('offset', '0%');
    problemDiscStop1.setAttribute('stop-color', '#ff8080');
    
    const problemDiscStop2 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
    problemDiscStop2.setAttribute('offset', '100%');
    problemDiscStop2.setAttribute('stop-color', '#ff5252');
    
    problemDiscGradient.appendChild(problemDiscStop1);
    problemDiscGradient.appendChild(problemDiscStop2);
    
    defs.appendChild(vertebraGradient);
    defs.appendChild(discGradient);
    defs.appendChild(problemGradient);
    defs.appendChild(problemDiscGradient);
    svg.appendChild(defs);
    
    // Create a group for the spine elements
    const spineGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
    spineGroup.setAttribute('id', 'spine-group');
    spineGroup.setAttribute('transform', 'translate(150, 50)');
    
    // Create groups for different regions of the spine
    const cervicalGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
    cervicalGroup.setAttribute('class', 'spine-region');
    cervicalGroup.setAttribute('id', 'cervical-region');
    
    const thoracicGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
    thoracicGroup.setAttribute('class', 'spine-region');
    thoracicGroup.setAttribute('id', 'thoracic-region');
    
    const lumbarGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
    lumbarGroup.setAttribute('class', 'spine-region');
    lumbarGroup.setAttribute('id', 'lumbar-region');
    
    // Add region labels
    const cervicalLabel = createSpineLabel(-120, 45, "Cervical Spine (C1-C7)", "region-label");
    const thoracicLabel = createSpineLabel(-120, 200, "Thoracic Spine (T1-T12)", "region-label");
    const lumbarLabel = createSpineLabel(-120, 420, "Lumbar Spine (L1-L5)", "region-label");
    
    cervicalGroup.appendChild(cervicalLabel);
    thoracicGroup.appendChild(thoracicLabel);
    lumbarGroup.appendChild(lumbarLabel);
    
    // Cervical vertebrae (C1-C7)
    for (let i = 0; i < 7; i++) {
        const vertebraHeight = 14;
        const vertebraWidth = i === 0 ? 32 : 38;  // C1 (Atlas) is different
        const y = i * 25;
        
        // Create different shapes for C1 and C2
        if (i === 0) {
            // C1 (Atlas) - more oval
            const atlas = createSpecialVertebra(0, y, vertebraWidth, vertebraHeight, 'url(#vertebraGradient)', 'C1 (Atlas)');
            cervicalGroup.appendChild(atlas);
        } else if (i === 1) {
            // C2 (Axis) - with dens
            const axis = createSpecialVertebra(0, y, vertebraWidth, vertebraHeight, 'url(#vertebraGradient)', 'C2 (Axis)');
            // Add the dens projection
            const dens = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
            dens.setAttribute('cx', 0);
            dens.setAttribute('cy', y - 8);
            dens.setAttribute('rx', 6);
            dens.setAttribute('ry', 4);
            dens.setAttribute('fill', 'url(#vertebraGradient)');
            dens.setAttribute('stroke', '#999');
            dens.setAttribute('stroke-width', '1');
            dens.setAttribute('class', 'vertebra-part');
            cervicalGroup.appendChild(dens);
            cervicalGroup.appendChild(axis);
        } else {
            // C3-C7
            const vertebra = createDetailedVertebra(0, y, vertebraWidth, vertebraHeight, 'url(#vertebraGradient)', `C${i+1}`);
            cervicalGroup.appendChild(vertebra);
        }
        
        // Add disc below except for last cervical
        if (i < 6) {
            const disc = createDetailedDisc(0, y + 16, 30, 7, 'url(#discGradient)', `C${i+1}-C${i+2} Disc`);
            cervicalGroup.appendChild(disc);
        }
    }
    
    // Thoracic vertebrae (T1-T12)
    for (let i = 0; i < 12; i++) {
        const vertebraHeight = 16;
        const vertebraWidth = 42;
        const y = i * 27 + 175;  // Start position after cervical
        
        const vertebra = createDetailedVertebra(0, y, vertebraWidth, vertebraHeight, 'url(#vertebraGradient)', `T${i+1}`);
        
        // Add transverse processes that are more pronounced for thoracic
        const leftProcess = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        leftProcess.setAttribute('x', -vertebraWidth/2 - 10);
        leftProcess.setAttribute('y', y - 3);
        leftProcess.setAttribute('width', 10);
        leftProcess.setAttribute('height', 6);
        leftProcess.setAttribute('rx', 2);
        leftProcess.setAttribute('ry', 2);
        leftProcess.setAttribute('fill', 'url(#vertebraGradient)');
        leftProcess.setAttribute('stroke', '#999');
        leftProcess.setAttribute('stroke-width', '1');
        leftProcess.setAttribute('class', 'vertebra-part');
        
        const rightProcess = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        rightProcess.setAttribute('x', vertebraWidth/2);
        rightProcess.setAttribute('y', y - 3);
        rightProcess.setAttribute('width', 10);
        rightProcess.setAttribute('height', 6);
        rightProcess.setAttribute('rx', 2);
        rightProcess.setAttribute('ry', 2);
        rightProcess.setAttribute('fill', 'url(#vertebraGradient)');
        rightProcess.setAttribute('stroke', '#999');
        rightProcess.setAttribute('stroke-width', '1');
        rightProcess.setAttribute('class', 'vertebra-part');
        
        thoracicGroup.appendChild(leftProcess);
        thoracicGroup.appendChild(rightProcess);
        thoracicGroup.appendChild(vertebra);
        
        // Add disc below except for last thoracic
        if (i < 11) {
            const disc = createDetailedDisc(0, y + 18, 34, 8, 'url(#discGradient)', `T${i+1}-T${i+2} Disc`);
            thoracicGroup.appendChild(disc);
        }
    }
    
    // Lumbar vertebrae (L1-L5)
    for (let i = 0; i < 5; i++) {
        const vertebraHeight = 22;
        const vertebraWidth = 52;
        const y = i * 34 + 520;  // Start position after thoracic
        
        // L4-L5 is the problem area
        const fillColor = i >= 3 ? 'url(#problemGradient)' : 'url(#vertebraGradient)';
        const strokeWidth = i >= 3 ? 2 : 1;
        const strokeColor = i >= 3 ? '#cc6666' : '#999';
        
        const vertebra = createDetailedVertebra(0, y, vertebraWidth, vertebraHeight, fillColor, `L${i+1}`);
        vertebra.setAttribute('stroke', strokeColor);
        vertebra.setAttribute('stroke-width', strokeWidth);
        
        // Add more pronounced transverse processes for lumbar
        const leftProcess = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        leftProcess.setAttribute('x', -vertebraWidth/2 - 15);
        leftProcess.setAttribute('y', y - 4);
        leftProcess.setAttribute('width', 15);
        leftProcess.setAttribute('height', 8);
        leftProcess.setAttribute('rx', 3);
        leftProcess.setAttribute('ry', 3);
        leftProcess.setAttribute('fill', fillColor);
        leftProcess.setAttribute('stroke', strokeColor);
        leftProcess.setAttribute('stroke-width', strokeWidth);
        leftProcess.setAttribute('class', 'vertebra-part');
        
        const rightProcess = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        rightProcess.setAttribute('x', vertebraWidth/2);
        rightProcess.setAttribute('y', y - 4);
        rightProcess.setAttribute('width', 15);
        rightProcess.setAttribute('height', 8);
        rightProcess.setAttribute('rx', 3);
        rightProcess.setAttribute('ry', 3);
        rightProcess.setAttribute('fill', fillColor);
        rightProcess.setAttribute('stroke', strokeColor);
        rightProcess.setAttribute('stroke-width', strokeWidth);
        rightProcess.setAttribute('class', 'vertebra-part');
        
        lumbarGroup.appendChild(leftProcess);
        lumbarGroup.appendChild(rightProcess);
        lumbarGroup.appendChild(vertebra);
        
        // Add disc below except for last lumbar
        if (i < 4) {
            const discFill = i >= 3 ? 'url(#problemDiscGradient)' : 'url(#discGradient)';
            const discStroke = i >= 3 ? '#cc6666' : '#999';
            const discStrokeWidth = i >= 3 ? 2 : 1;
            
            const disc = createDetailedDisc(0, y + 22, 42, 10, discFill, `L${i+1}-L${i+2} Disc`);
            disc.setAttribute('stroke', discStroke);
            disc.setAttribute('stroke-width', discStrokeWidth);
            
            // Add a highlight for the problematic disc (L4-L5)
            if (i === 3) {
                const problemIndicator = document.createElementNS("http://www.w3.org/2000/svg", "circle");
                problemIndicator.setAttribute('cx', 70);
                problemIndicator.setAttribute('cy', y + 22);
                problemIndicator.setAttribute('r', 15);
                problemIndicator.setAttribute('fill', 'none');
                problemIndicator.setAttribute('stroke', '#ff0000');
                problemIndicator.setAttribute('stroke-width', 2);
                problemIndicator.setAttribute('stroke-dasharray', '5,3');
                problemIndicator.setAttribute('class', 'problem-indicator hidden');
                
                const problemLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
                problemLine.setAttribute('x1', 42);
                problemLine.setAttribute('y1', y + 22);
                problemLine.setAttribute('x2', 60);
                problemLine.setAttribute('y2', y + 22);
                problemLine.setAttribute('stroke', '#ff0000');
                problemLine.setAttribute('stroke-width', 2);
                problemLine.setAttribute('class', 'problem-indicator hidden');
                
                // Add text label for problem area
                const problemText = document.createElementNS("http://www.w3.org/2000/svg", "text");
                problemText.setAttribute('x', 90);
                problemText.setAttribute('y', y + 22);
                problemText.setAttribute('text-anchor', 'start');
                problemText.setAttribute('dominant-baseline', 'middle');
                problemText.setAttribute('fill', '#ff0000');
                problemText.setAttribute('font-weight', 'bold');
                problemText.setAttribute('font-size', '14px');
                problemText.setAttribute('class', 'problem-indicator hidden');
                problemText.textContent = "Herniated Disc";
                
                lumbarGroup.appendChild(problemIndicator);
                lumbarGroup.appendChild(problemLine);
                lumbarGroup.appendChild(problemText);
            }
            
            lumbarGroup.appendChild(disc);
        }
    }
    
    // Add sacrum
    const sacrum = document.createElementNS("http://www.w3.org/2000/svg", "path");
    sacrum.setAttribute('d', 'M-26,690 C-26,665 26,665 26,690 L15,730 C15,735 -15,735 -15,730 Z');
    sacrum.setAttribute('fill', 'url(#vertebraGradient)');
    sacrum.setAttribute('stroke', '#999');
    sacrum.setAttribute('stroke-width', '1');
    
    const sacrumLabel = createSpineLabel(0, 710, "Sacrum", "vertebra-label");
    
    lumbarGroup.appendChild(sacrum);
    lumbarGroup.appendChild(sacrumLabel);
    
    // Add all regions to the spine group
    spineGroup.appendChild(cervicalGroup);
    spineGroup.appendChild(thoracicGroup);
    spineGroup.appendChild(lumbarGroup);
    
    // Add the spine group to the SVG
    svg.appendChild(spineGroup);
    
    // Add zoom controls
    const zoomControls = document.createElementNS("http://www.w3.org/2000/svg", "g");
    zoomControls.setAttribute('class', 'zoom-controls');
    zoomControls.setAttribute('transform', 'translate(270, 50)');
    
    const zoomIn = document.createElementNS("http://www.w3.org/2000/svg", "g");
    zoomIn.setAttribute('class', 'zoom-button');
    zoomIn.setAttribute('id', 'zoom-in');
    
    const zoomInCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    zoomInCircle.setAttribute('cx', 0);
    zoomInCircle.setAttribute('cy', 0);
    zoomInCircle.setAttribute('r', 15);
    zoomInCircle.setAttribute('fill', '#fff');
    zoomInCircle.setAttribute('stroke', '#0056b3');
    zoomInCircle.setAttribute('stroke-width', '1.5');
    
    const zoomInPlus = document.createElementNS("http://www.w3.org/2000/svg", "path");
    zoomInPlus.setAttribute('d', 'M-8,0 L8,0 M0,-8 L0,8');
    zoomInPlus.setAttribute('stroke', '#0056b3');
    zoomInPlus.setAttribute('stroke-width', '2');
    zoomInPlus.setAttribute('stroke-linecap', 'round');
    
    zoomIn.appendChild(zoomInCircle);
    zoomIn.appendChild(zoomInPlus);
    
    const zoomOut = document.createElementNS("http://www.w3.org/2000/svg", "g");
    zoomOut.setAttribute('class', 'zoom-button');
    zoomOut.setAttribute('id', 'zoom-out');
    zoomOut.setAttribute('transform', 'translate(0, 40)');
    
    const zoomOutCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    zoomOutCircle.setAttribute('cx', 0);
    zoomOutCircle.setAttribute('cy', 0);
    zoomOutCircle.setAttribute('r', 15);
    zoomOutCircle.setAttribute('fill', '#fff');
    zoomOutCircle.setAttribute('stroke', '#0056b3');
    zoomOutCircle.setAttribute('stroke-width', '1.5');
    
    const zoomOutMinus = document.createElementNS("http://www.w3.org/2000/svg", "path");
    zoomOutMinus.setAttribute('d', 'M-8,0 L8,0');
    zoomOutMinus.setAttribute('stroke', '#0056b3');
    zoomOutMinus.setAttribute('stroke-width', '2');
    zoomOutMinus.setAttribute('stroke-linecap', 'round');
    
    zoomOut.appendChild(zoomOutCircle);
    zoomOut.appendChild(zoomOutMinus);
    
    const resetZoom = document.createElementNS("http://www.w3.org/2000/svg", "g");
    resetZoom.setAttribute('class', 'reset-button');
    resetZoom.setAttribute('id', 'reset-zoom');
    resetZoom.setAttribute('transform', 'translate(0, 80)');
    
    const resetRect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    resetRect.setAttribute('x', -25);
    resetRect.setAttribute('y', -15);
    resetRect.setAttribute('width', 50);
    resetRect.setAttribute('height', 30);
    resetRect.setAttribute('rx', 5);
    resetRect.setAttribute('ry', 5);
    resetRect.setAttribute('fill', '#fff');
    resetRect.setAttribute('stroke', '#0056b3');
    resetRect.setAttribute('stroke-width', '1.5');
    
    const resetText = document.createElementNS("http://www.w3.org/2000/svg", "text");
    resetText.setAttribute('x', 0);
    resetText.setAttribute('y', 5);
    resetText.setAttribute('text-anchor', 'middle');
    resetText.setAttribute('font-size', '12px');
    resetText.setAttribute('fill', '#0056b3');
    resetText.textContent = "Reset";
    
    resetZoom.appendChild(resetRect);
    resetZoom.appendChild(resetText);
    
    zoomControls.appendChild(zoomIn);
    zoomControls.appendChild(zoomOut);
    zoomControls.appendChild(resetZoom);
    
    svg.appendChild(zoomControls);
    
    // Add the SVG to the spine model container
    spineModel.appendChild(svg);
    
    // Setup event listeners for zoom controls
    setupZoomControls();
}

// Create a detailed vertebra shape
function createDetailedVertebra(x, y, width, height, fill, label) {
    const vertebraGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
    vertebraGroup.setAttribute('class', 'vertebra');
    vertebraGroup.setAttribute('data-label', label);
    
    // Vertebral body
    const body = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    body.setAttribute('x', x - width / 2);
    body.setAttribute('y', y - height / 2);
    body.setAttribute('width', width);
    body.setAttribute('height', height);
    body.setAttribute('rx', 5);
    body.setAttribute('ry', 5);
    body.setAttribute('fill', fill);
    body.setAttribute('stroke', '#999');
    body.setAttribute('stroke-width', '1');
    body.setAttribute('class', 'vertebra-body');
    
    // Spinous process (pointing backward)
    const spinousProcess = document.createElementNS("http://www.w3.org/2000/svg", "path");
    spinousProcess.setAttribute('d', `M${x},${y-height/4} L${x+15},${y-height/4} L${x+15},${y+height/4} L${x},${y+height/4} Z`);
    spinousProcess.setAttribute('fill', fill);
    spinousProcess.setAttribute('stroke', '#999');
    spinousProcess.setAttribute('stroke-width', '1');
    spinousProcess.setAttribute('class', 'vertebra-process');
    
    // Add label
    const textLabel = createSpineLabel(x - width/2 - 25, y, label, "vertebra-label");
    
    vertebraGroup.appendChild(body);
    vertebraGroup.appendChild(spinousProcess);
    vertebraGroup.appendChild(textLabel);
    
    return vertebraGroup;
}

// Create special vertebra shapes for C1 and C2
function createSpecialVertebra(x, y, width, height, fill, label) {
    const vertebraGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
    vertebraGroup.setAttribute('class', 'vertebra');
    vertebraGroup.setAttribute('data-label', label);
    
    // Vertebral body with special shape
    const body = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
    body.setAttribute('cx', x);
    body.setAttribute('cy', y);
    body.setAttribute('rx', width / 2);
    body.setAttribute('ry', height / 2);
    body.setAttribute('fill', fill);
    body.setAttribute('stroke', '#999');
    body.setAttribute('stroke-width', '1');
    body.setAttribute('class', 'vertebra-body');
    
    // Add label
    const textLabel = createSpineLabel(x - width/2 - 25, y, label, "vertebra-label");
    
    vertebraGroup.appendChild(body);
    vertebraGroup.appendChild(textLabel);
    
    return vertebraGroup;
}

// Create a detailed disc shape
function createDetailedDisc(x, y, width, height, fill, label) {
    const discGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
    discGroup.setAttribute('class', 'disc');
    discGroup.setAttribute('data-label', label);
    
    // Disc body
    const disc = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
    disc.setAttribute('cx', x);
    disc.setAttribute('cy', y);
    disc.setAttribute('rx', width / 2);
    disc.setAttribute('ry', height / 2);
    disc.setAttribute('fill', fill);
    disc.setAttribute('stroke', '#999');
    disc.setAttribute('stroke-width', '1');
    disc.setAttribute('class', 'disc-body');
    
    discGroup.appendChild(disc);
    
    return discGroup;
}

// Create text label for spine elements
function createSpineLabel(x, y, text, className) {
    const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
    label.setAttribute('x', x);
    label.setAttribute('y', y);
    label.setAttribute('text-anchor', 'start');
    label.setAttribute('dominant-baseline', 'middle');
    label.setAttribute('font-size', '12px');
    label.setAttribute('fill', '#666');
    label.setAttribute('class', className);
    label.textContent = text;
    
    return label;
}

// Set up zoom controls
function setupZoomControls() {
    let currentScale = 1;
    const scaleStep = 0.2;
    const minScale = 0.6;
    const maxScale = 2.5;
    
    const spineGroup = document.getElementById('spine-group');
    const zoomIn = document.getElementById('zoom-in');
    const zoomOut = document.getElementById('zoom-out');
    const resetZoom = document.getElementById('reset-zoom');
    
    // Add event listeners for zoom buttons
    zoomIn.addEventListener('click', function() {
        if (currentScale < maxScale) {
            currentScale += scaleStep;
            updateScale();
        }
    });
    
    zoomOut.addEventListener('click', function() {
        if (currentScale > minScale) {
            currentScale -= scaleStep;
            updateScale();
        }
    });
    
    resetZoom.addEventListener('click', function() {
        currentScale = 1;
        spineGroup.style.transform = 'translate(150px, 50px) scale(1)';
    });
    
    function updateScale() {
        spineGroup.style.transform = `translate(150px, 50px) scale(${currentScale})`;
    }
}

// Change the spine view based on button click
function changeSpineView(view) {
    const spineModel = document.getElementById('spine-model-1');
    const spineGroup = document.getElementById('spine-group');
    const viewButtons = document.querySelectorAll('.view-btn');
    const problemIndicators = document.querySelectorAll('.problem-indicator');
    
    // Remove active class from all buttons
    viewButtons.forEach(b => b.classList.remove('active'));
    
    // Add active class to clicked button
    document.querySelector(`.view-btn[data-view="${view}"]`).classList.add('active');
    
    switch(view) {
        case 'front':
            spineGroup.style.transform = `translate(150px, 50px) scale(${getCurrentScale()})`;
            
            // Hide problem indicators
            problemIndicators.forEach(i => i.classList.add('hidden'));
            
            // Reset any vertebrae or disc styling
            resetAllSpineElements();
            break;
            
        case 'side':
            // Instead of a full 90-degree rotation which would make the spine invisible,
            // let's create a proper lateral view by modifying the spine components
            
            // First reset to front view
            spineGroup.style.transform = `translate(150px, 50px) scale(${getCurrentScale()})`;
            
            // Hide problem indicators
            problemIndicators.forEach(i => i.classList.add('hidden'));
            
            // Apply side view transformations to each vertebra and disc
            createLateralView();
            break;
            
        case 'problem':
            // Reset to front view first
            spineGroup.style.transform = `translate(150px, 50px) scale(${getCurrentScale()})`;
            
            // Scroll to lumbar region
            spineGroup.style.transform = `translate(150px, -290px) scale(${getCurrentScale()})`;
            
            // Show problem indicators
            problemIndicators.forEach(i => i.classList.remove('hidden'));
            
            // Reset any vertebrae or disc styling from lateral view
            resetAllSpineElements();
            
            // Animate the problem indicators
            animateProblemArea();
            break;
    }
}

// Create a lateral (side) view of the spine
function createLateralView() {
    // Get all vertebra bodies and processes
    const vertebraBodies = document.querySelectorAll('.vertebra-body');
    const vertebraProcesses = document.querySelectorAll('.vertebra-process');
    const discs = document.querySelectorAll('.disc-body');
    const labels = document.querySelectorAll('.vertebra-label');
    
    // Hide labels as they'd be in the way in lateral view
    labels.forEach(label => {
        label.style.opacity = '0.2';
    });
    
    // For each vertebral body, adjust width to simulate side view
    vertebraBodies.forEach(body => {
        if (body.tagName === 'rect') {
            // Store original width for reset
            if (!body.hasAttribute('data-original-width')) {
                body.setAttribute('data-original-width', body.getAttribute('width'));
                body.setAttribute('data-original-x', body.getAttribute('x'));
            }
            
            // Get the current dimensions
            const height = parseFloat(body.getAttribute('height'));
            const originalWidth = parseFloat(body.getAttribute('data-original-width'));
            const originalX = parseFloat(body.getAttribute('data-original-x'));
            
            // Set a narrower width for side view (about 40% of original)
            const newWidth = originalWidth * 0.4;
            // Adjust x position to maintain center alignment
            const newX = originalX + (originalWidth - newWidth) / 2;
            
            // Apply the side view transformations
            body.setAttribute('width', newWidth);
            body.setAttribute('x', newX);
            
            // Add a slight gradient to simulate lighting from the side
            body.setAttribute('fill', 'url(#vertebraGradient)');
            body.style.filter = 'brightness(0.9)';
        }
        else if (body.tagName === 'ellipse') {
            // For elliptical vertebrae (C1, C2)
            if (!body.hasAttribute('data-original-rx')) {
                body.setAttribute('data-original-rx', body.getAttribute('rx'));
            }
            
            const originalRx = parseFloat(body.getAttribute('data-original-rx'));
            body.setAttribute('rx', originalRx * 0.4);
            body.style.filter = 'brightness(0.9)';
        }
    });
    
    // Adjust the spinous processes to be more visible from the side
    vertebraProcesses.forEach(process => {
        if (!process.hasAttribute('data-original-d')) {
            process.setAttribute('data-original-d', process.getAttribute('d'));
        }
        
        // Make spinous processes more prominent in side view
        // Take the original path and extend it
        const pathData = process.getAttribute('data-original-d');
        const newPathData = pathData.replace(/L(\d+),(\d+)/, (match, x, y) => {
            return `L${parseInt(x) + 10},${y}`;
        });
        
        process.setAttribute('d', newPathData);
        process.style.filter = 'brightness(0.85)';
    });
    
    // Adjust discs to appear narrower from the side
    discs.forEach(disc => {
        if (!disc.hasAttribute('data-original-rx')) {
            disc.setAttribute('data-original-rx', disc.getAttribute('rx'));
        }
        
        const originalRx = parseFloat(disc.getAttribute('data-original-rx'));
        disc.setAttribute('rx', originalRx * 0.4);
        disc.style.filter = 'brightness(0.9)';
    });
    
    // Add a slight perspective tilt to further enhance the side view illusion
    const spineGroup = document.getElementById('spine-group');
    spineGroup.style.transform = `translate(150px, 50px) rotateY(15deg) scale(${getCurrentScale()})`;
}

// Reset spine elements to their original state
function resetAllSpineElements() {
    // Reset vertebra bodies
    const vertebraBodies = document.querySelectorAll('.vertebra-body');
    vertebraBodies.forEach(body => {
        if (body.tagName === 'rect' && body.hasAttribute('data-original-width')) {
            body.setAttribute('width', body.getAttribute('data-original-width'));
            body.setAttribute('x', body.getAttribute('data-original-x'));
            body.style.filter = '';
        }
        else if (body.tagName === 'ellipse' && body.hasAttribute('data-original-rx')) {
            body.setAttribute('rx', body.getAttribute('data-original-rx'));
            body.style.filter = '';
        }
    });
    
    // Reset spinous processes
    const vertebraProcesses = document.querySelectorAll('.vertebra-process');
    vertebraProcesses.forEach(process => {
        if (process.hasAttribute('data-original-d')) {
            process.setAttribute('d', process.getAttribute('data-original-d'));
            process.style.filter = '';
        }
    });
    
    // Reset discs
    const discs = document.querySelectorAll('.disc-body');
    discs.forEach(disc => {
        if (disc.hasAttribute('data-original-rx')) {
            disc.setAttribute('rx', disc.getAttribute('data-original-rx'));
            disc.style.filter = '';
        }
    });
    
    // Reset labels
    const labels = document.querySelectorAll('.vertebra-label');
    labels.forEach(label => {
        label.style.opacity = '0.9';
    });
}

// Get current scale from transform
function getCurrentScale() {
    const spineGroup = document.getElementById('spine-group');
    const transform = spineGroup.style.transform;
    const scaleMatch = transform.match(/scale\(([^)]+)\)/);
    
    if (scaleMatch && scaleMatch[1]) {
        return scaleMatch[1];
    }
    
    return 1;
}

// Animate the problem area highlight
function animateProblemArea() {
    const problemIndicators = document.querySelectorAll('.problem-indicator');
    
    // Fade in
    problemIndicators.forEach(i => {
        i.style.opacity = 0;
        let opacity = 0;
        const fadeIn = setInterval(() => {
            opacity += 0.1;
            i.style.opacity = opacity;
            
            if (opacity >= 1) {
                clearInterval(fadeIn);
                
                // Pulse animation
                let scale = 1;
                let increasing = false;
                const pulse = setInterval(() => {
                    if (increasing) {
                        scale += 0.01;
                        if (scale >= 1.1) increasing = false;
                    } else {
                        scale -= 0.01;
                        if (scale <= 0.9) increasing = true;
                    }
                    
                    if (i.tagName === 'circle') {
                        i.style.transform = `scale(${scale})`;
                    }
                }, 50);
                
                // Stop after a few seconds
                setTimeout(() => {
                    clearInterval(pulse);
                    if (i.tagName === 'circle') {
                        i.style.transform = 'scale(1)';
                    }
                }, 5000);
            }
        }, 50);
    });
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
