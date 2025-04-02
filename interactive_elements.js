// Additional interactive elements for the spine fusion visualization

document.addEventListener('DOMContentLoaded', function() {
    // Load SVG files into their respective containers
    loadSVGFiles();
    
    // Initialize stage content for all stages
    initializeAllStages();
    
    // Add interactive tooltips to timeline elements
    addTimelineTooltips();
    
    // Add zoom and pan functionality to spine models
    addZoomPanToSpineModels();
    
    // Add animation sequences for surgical procedure
    addSurgicalAnimations();
    
    // Add interactive recovery progress tracker
    addRecoveryTracker();
    
    // Add accessibility keyboard navigation
    addKeyboardNavigation();
});

// Load SVG files into their respective containers
function loadSVGFiles() {
    // Load spine anatomy SVG into stage 3
    fetch('spine_fusion_anatomy.svg')
        .then(response => response.text())
        .then(svgContent => {
            const stage3SpineModel = document.createElement('div');
            stage3SpineModel.className = 'spine-model';
            stage3SpineModel.id = 'spine-model-3';
            stage3SpineModel.innerHTML = svgContent;
            
            // Create a container for the spine model if it doesn't exist
            let spineVisualization = document.querySelector('#stage-3 .spine-visualization');
            if (!spineVisualization) {
                spineVisualization = document.createElement('div');
                spineVisualization.className = 'spine-visualization';
                document.querySelector('#stage-3').appendChild(spineVisualization);
            }
            
            spineVisualization.appendChild(stage3SpineModel);
        })
        .catch(error => console.error('Error loading spine anatomy SVG:', error));
    
    // Load patient journey timeline SVG
    fetch('patient_journey_timeline.svg')
        .then(response => response.text())
        .then(svgContent => {
            const timelineContainer = document.createElement('div');
            timelineContainer.className = 'journey-timeline-container';
            timelineContainer.innerHTML = svgContent;
            
            // Add to the main content area
            const mainContent = document.querySelector('.content-container');
            mainContent.insertBefore(timelineContainer, mainContent.firstChild);
            
            // Hide initially, will be shown when needed
            timelineContainer.style.display = 'none';
        })
        .catch(error => console.error('Error loading patient journey timeline SVG:', error));
    
    // Load recovery timeline SVG into stage 5
    fetch('recovery_timeline.svg')
        .then(response => response.text())
        .then(svgContent => {
            const recoveryTimeline = document.createElement('div');
            recoveryTimeline.className = 'recovery-timeline';
            recoveryTimeline.innerHTML = svgContent;
            
            // Add to stage 5
            const stage5 = document.querySelector('#stage-5');
            if (stage5) {
                stage5.appendChild(recoveryTimeline);
            }
        })
        .catch(error => console.error('Error loading recovery timeline SVG:', error));
}

// Initialize content for all stages
function initializeAllStages() {
    // Stage 2: Preoperative Preparation
    initializeStage2();
    
    // Stage 3: Surgical Procedure
    initializeStage3();
    
    // Stage 4: Hospital Recovery
    initializeStage4();
    
    // Stage 5: Early Home Recovery
    initializeStage5();
    
    // Stage 6: Intermediate Recovery
    initializeStage6();
    
    // Stage 7: Advanced Recovery
    initializeStage7();
    
    // Stage 8: Long-term Recovery and Maintenance
    initializeStage8();
}

// Initialize Stage 2: Preoperative Preparation
function initializeStage2() {
    const stage2 = document.getElementById('stage-2');
    
    // Create grid layout
    const stageGrid = document.createElement('div');
    stageGrid.className = 'stage-grid';
    
    // Create preoperative checklist
    const checklistContainer = document.createElement('div');
    checklistContainer.className = 'info-panel';
    checklistContainer.innerHTML = `
        <h3>Preoperative Checklist</h3>
        <div class="checklist">
            <div class="checklist-item">
                <input type="checkbox" id="check-medical" class="interactive-checkbox">
                <label for="check-medical">Medical Evaluation</label>
                <div class="checklist-details">Complete physical examination and medical clearance for surgery</div>
            </div>
            <div class="checklist-item">
                <input type="checkbox" id="check-imaging" class="interactive-checkbox">
                <label for="check-imaging">Imaging Studies</label>
                <div class="checklist-details">X-rays, MRI, CT scans as needed for surgical planning</div>
            </div>
            <div class="checklist-item">
                <input type="checkbox" id="check-medications" class="interactive-checkbox">
                <label for="check-medications">Medication Review</label>
                <div class="checklist-details">Adjust medications as needed; stop blood thinners</div>
            </div>
            <div class="checklist-item">
                <input type="checkbox" id="check-nutrition" class="interactive-checkbox">
                <label for="check-nutrition">Nutritional Optimization</label>
                <div class="checklist-details">Protein-rich diet to support healing</div>
            </div>
            <div class="checklist-item">
                <input type="checkbox" id="check-smoking" class="interactive-checkbox">
                <label for="check-smoking">Smoking Cessation</label>
                <div class="checklist-details">Stop smoking at least 4 weeks before surgery</div>
            </div>
            <div class="checklist-item">
                <input type="checkbox" id="check-home" class="interactive-checkbox">
                <label for="check-home">Home Preparation</label>
                <div class="checklist-details">Arrange for help, prepare recovery space</div>
            </div>
        </div>
    `;
    
    // Create preparation timeline
    const timelineContainer = document.createElement('div');
    timelineContainer.className = 'preparation-timeline';
    timelineContainer.innerHTML = `
        <h3>Preparation Timeline</h3>
        <div class="timeline-wrapper">
            <div class="prep-timeline-item" data-weeks="4-6">
                <div class="timeline-marker"></div>
                <div class="timeline-content">
                    <h4>4-6 Weeks Before</h4>
                    <ul>
                        <li>Initial surgical consultation</li>
                        <li>Begin smoking cessation</li>
                        <li>Schedule preoperative testing</li>
                    </ul>
                </div>
            </div>
            <div class="prep-timeline-item" data-weeks="2-4">
                <div class="timeline-marker"></div>
                <div class="timeline-content">
                    <h4>2-4 Weeks Before</h4>
                    <ul>
                        <li>Complete medical clearance</li>
                        <li>Adjust medications</li>
                        <li>Begin nutritional optimization</li>
                    </ul>
                </div>
            </div>
            <div class="prep-timeline-item" data-weeks="1">
                <div class="timeline-marker"></div>
                <div class="timeline-content">
                    <h4>1 Week Before</h4>
                    <ul>
                        <li>Pre-admission testing</li>
                        <li>Final medication adjustments</li>
                        <li>Prepare home recovery space</li>
                    </ul>
                </div>
            </div>
            <div class="prep-timeline-item" data-weeks="0">
                <div class="timeline-marker"></div>
                <div class="timeline-content">
                    <h4>Day Before Surgery</h4>
                    <ul>
                        <li>Nothing to eat/drink after midnight</li>
                        <li>Shower with antibacterial soap</li>
                        <li>Pack hospital bag</li>
                    </ul>
                </div>
            </div>
        </div>
    `;
    
    // Create healthcare team section
    const healthcareTeam = document.createElement('div');
    healthcareTeam.className = 'healthcare-team';
    healthcareTeam.innerHTML = `
        <h3>Healthcare Team</h3>
        <div class="team-members">
            <div class="team-member" data-role="surgeon">
                <div class="member-icon">👨‍⚕️</div>
                <div class="member-title">Spine Surgeon</div>
            </div>
            <div class="team-member" data-role="anesthesiologist">
                <div class="member-icon">👩‍⚕️</div>
                <div class="member-title">Anesthesiologist</div>
            </div>
            <div class="team-member" data-role="nurse">
                <div class="member-icon">👨‍⚕️</div>
                <div class="member-title">Nurse</div>
            </div>
            <div class="team-member" data-role="coordinator">
                <div class="member-icon">👩‍⚕️</div>
                <div class="member-title">Surgical Coordinator</div>
            </div>
        </div>
    `;
    
    // Assemble the grid
    stageGrid.appendChild(checklistContainer);
    stageGrid.appendChild(timelineContainer);
    stageGrid.appendChild(healthcareTeam);
    
    // Add to stage
    stage2.appendChild(stageGrid);
    
    // Add interactivity to checklist items
    const checkboxes = stage2.querySelectorAll('.interactive-checkbox');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const item = this.closest('.checklist-item');
            if (this.checked) {
                item.classList.add('completed');
            } else {
                item.classList.remove('completed');
            }
        });
    });
}

// Initialize Stage 3: Surgical Procedure
function initializeStage3() {
    const stage3 = document.getElementById('stage-3');
    
    // Create grid layout
    const stageGrid = document.createElement('div');
    stageGrid.className = 'stage-grid';
    
    // Create surgical approaches section
    const approachesContainer = document.createElement('div');
    approachesContainer.className = 'info-panel';
    approachesContainer.innerHTML = `
        <h3>Surgical Approaches</h3>
        <div class="approach-selector">
            <button class="approach-btn active" data-approach="posterior">Posterior</button>
            <button class="approach-btn" data-approach="anterior">Anterior</button>
            <button class="approach-btn" data-approach="lateral">Lateral</button>
        </div>
        <div class="approach-description active" id="posterior-approach">
            <h4>Posterior Approach</h4>
            <p>The surgeon accesses the spine through an incision in the back, directly over the affected vertebrae. This is the most common approach for lumbar fusion.</p>
            <ul>
                <li>Provides direct access to the back of the spine</li>
                <li>Allows for decompression of nerve roots</li>
                <li>Suitable for most fusion procedures</li>
            </ul>
        </div>
        <div class="approach-description" id="anterior-approach">
            <h4>Anterior Approach</h4>
            <p>The surgeon accesses the spine through an incision in the abdomen, approaching the spine from the front.</p>
            <ul>
                <li>Provides direct access to the vertebral bodies and discs</li>
                <li>Avoids disruption of back muscles</li>
                <li>Often used for L5-S1 fusions</li>
            </ul>
        </div>
        <div class="approach-description" id="lateral-approach">
            <h4>Lateral Approach</h4>
            <p>The surgeon accesses the spine through an incision in the side of the body, approaching the spine from the side.</p>
            <ul>
                <li>Minimizes disruption of back muscles</li>
                <li>Provides good access to the disc space</li>
                <li>Not suitable for L5-S1 level due to pelvic anatomy</li>
            </ul>
        </div>
    `;
    
    // Create surgical steps section
    const stepsContainer = document.createElement('div');
    stepsContainer.className = 'surgical-steps';
    stepsContainer.innerHTML = `
        <h3>Surgical Procedure Steps</h3>
        <div class="step-navigation">
            <button class="step-nav-btn" data-step="1">1. Access</button>
            <button class="step-nav-btn" data-step="2">2. Decompression</button>
            <button class="step-nav-btn" data-step="3">3. Disc Removal</button>
            <button class="step-nav-btn" data-step="4">4. Bone Graft</button>
            <button class="step-nav-btn" data-step="5">5. Hardware</button>
            <button class="step-nav-btn" data-step="6">6. Closure</button>
        </div>
        <div class="step-content-container">
            <div class="step-content" data-step="1">
                <h4>Step 1: Surgical Access</h4>
                <p>The surgeon makes an incision and carefully moves muscles and tissues to expose the spine.</p>
            </div>
            <div class="step-content" data-step="2">
                <h4>Step 2: Decompression</h4>
                <p>Removal of bone spurs or portions of the vertebrae that are compressing nerves.</p>
            </div>
            <div class="step-content" data-step="3">
                <h4>Step 3: Disc Removal</h4>
                <p>The damaged disc between vertebrae is removed to prepare for fusion.</p>
            </div>
            <div class="step-content" data-step="4">
                <h4>Step 4: Bone Graft Placement</h4>
                <p>Bone graft material is placed between the vertebrae to promote fusion.</p>
            </div>
            <div class="step-content" data-step="5">
                <h4>Step 5: Hardware Installation</h4>
                <p>Screws, rods, and/or plates are attached to stabilize the spine while fusion occurs.</p>
            </div>
            <div class="step-content" data-step="6">
                <h4>Step 6: Closure</h4>
                <p>The incision is closed with sutures or staples, and a sterile dressing is applied.</p>
            </div>
        </div>
    `;
    
    // Create healthcare team section
    const healthcareTeam = document.createElement('div');
    healthcareTeam.className = 'healthcare-team';
    healthcareTeam.innerHTML = `
        <h3>Surgical Team</h3>
        <div class="team-members">
            <div class="team-member" data-role="surgeon">
                <div class="member-icon">👨‍⚕️</div>
                <div class="member-title">Spine Surgeon</div>
            </div>
            <div class="team-member" data-role="assistant-surgeon">
                <div class="member-icon">👩‍⚕️</div>
                <div class="member-title">Assistant Surgeon</div>
            </div>
            <div class="team-member" data-role="anesthesiologist">
                <div class="member-icon">👨‍⚕️</div>
                <div class="member-title">Anesthesiologist</div>
            </div>
            <div class="team-member" data-role="or-nurse">
                <div class="member-icon">👩‍⚕️</div>
                <div class="member-title">OR Nurse</div>
            </div>
        </div>
    `;
    
    // Assemble the grid
    stageGrid.appendChild(document.createElement('div')); // Placeholder for spine model
    stageGrid.appendChild(approachesContainer);
    stageGrid.appendChild(stepsContainer);
    stageGrid.appendChild(healthcareTeam);
    
    // Add to stage
    stage3.appendChild(stageGrid);
    
    // Add interactivity to approach buttons
    const approachBtns = stage3.querySelectorAll('.approach-btn');
    approachBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active button
            approachBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Update active description
            const approach = this.getAttribute('data-approach');
            const descriptions = stage3.querySelectorAll('.approach-description');
            descriptions.forEach(desc => desc.classList.remove('active'));
            document.getElementById(`${approach}-approach`).classList.add('active');
        });
    });
    
    // Add interactivity to step navigation
    const stepNavBtns = stage3.querySelectorAll('.step-nav-btn');
    const stepContents = stage3.querySelectorAll('.step-content');
    
    stepNavBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const step = this.getAttribute('data-step');
            
            // Update active button
            stepNavBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Update active content
            stepContents.forEach(content => {
                if (content.getAttribute('data-step') === step) {
                    content.style.display = 'block';
                } else {
                    content.style.display = 'none';
                }
            });
        });
    });
    
    // Set first step as active
    if (stepNavBtns.length > 0) {
        stepNavBtns[0].click();
    }
}

// Initialize remaining stages with placeholder content
function initializeStage4() {
    // Hospital Recovery stage
    const stage4 = document.getElementById('stage-4');
    stage4.innerHTML += `
        <div class="stage-grid">
            <div class="info-panel">
                <h3>Hospital Recovery</h3>
                <p>The typical hospital stay after spine fusion surgery is 2-4 days. During this time, the focus is on pain management, early mobilization, and preparing for discharge.</p>
                <div class="expandable-section">
                    <h4 class="expandable-header">Pain Management</h4>
                    <div class="expandable-content">
                        <p>Pain management typically involves:</p>
                        <ul>
                            <li>IV pain medications initially</li>
                            <li>Transition to oral pain medications</li>
                            <li>Patient-controlled analgesia (PCA) in some cases</li>
                            <li>Multimodal approach combining different medication types</li>
                        </ul>
                    </div>
                </div>
                <div class="expandable-section">
                    <h4 class="expandable-header">Early Mobilization</h4>
                    <div class="expandable-content">
                        <p>Patients are typically helped out of bed within 24 hours after surgery. Physical therapists will assist with:</p>
                        <ul>
                            <li>Proper techniques for getting in and out of bed</li>
                            <li>Walking with assistance</li>
                            <li>Basic exercises to maintain circulation</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="healthcare-team">
                <h3>Hospital Care Team</h3>
                <div class="team-members">
                    <div class="team-member" data-role="surgeon">
                        <div class="member-icon">👨‍⚕️</div>
                        <div class="member-title">Surgeon</div>
                    </div>
                    <div class="team-member" data-role="nurse">
                        <div class="member-icon">👩‍⚕️</div>
                        <div class="member-title">Nurse</div>
                    </div>
                    <div class="team-member" data-role="physical-therapist">
                        <div class="member-icon">👨‍⚕️</div>
                        <div class="member-title">Physical Therapist</div>
                    </div>
                    <div class="team-member" data-role="case-manager">
                        <div class="member-icon">👩‍⚕️</div>
                        <div class="member-title">Case Manager</div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function initializeStage5() {
    // Early Home Recovery stage
    const stage5 = document.getElementById('stage-5');
    stage5.innerHTML += `
        <div class="stage-grid">
            <div class="info-panel">
                <h3>Early Home Recovery (Weeks 1-4)</h3>
                <p>The first month at home focuses on basic recovery, pain management, and gradually increasing activity within restrictions.</p>
                <div class="activity-restrictions">
                    <h4>Activity Restrictions</h4>
                    <ul class="restriction-list">
                        <li class="restricted">No bending at the waist</li>
                        <li class="restricted">No lifting over 5-10 pounds</li>
                        <li class="restricted">No twisting of the spine</li>
                        <li class="restricted">No driving (typically 2-4 weeks)</li>
                        <li class="allowed">Short walks multiple times daily</li>
                        <li class="allowed">Lying down to rest as needed</li>
                    </ul>
                </div>
            </div>
        </div>
    `;
}

function initializeStage6() {
    // Intermediate Recovery stage
    const stage6 = document.getElementById('stage-6');
    stage6.innerHTML += `
        <div class="stage-grid">
            <div class="info-panel">
                <h3>Intermediate Recovery (Weeks 5-9)</h3>
                <p>During this phase, physical therapy becomes more important and activity gradually increases.</p>
                <div class="pt-exercises">
                    <h4>Physical Therapy Exercises</h4>
                    <div class="exercise-list">
                        <div class="exercise-item">
                            <h5>Walking Program</h5>
                            <p>Gradually increasing distance and duration</p>
                        </div>
                        <div class="exercise-item">
                            <h5>Gentle Stretching</h5>
                            <p>For hamstrings, hip flexors, and shoulders</p>
                        </div>
                        <div class="exercise-item">
                            <h5>Core Stabilization</h5>
                            <p>Gentle exercises to strengthen abdominal muscles</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function initializeStage7() {
    // Advanced Recovery stage
    const stage7 = document.getElementById('stage-7');
    stage7.innerHTML += `
        <div class="stage-grid">
            <div class="info-panel">
                <h3>Advanced Recovery (Weeks 10-24)</h3>
                <p>This phase focuses on strengthening, increasing endurance, and returning to more normal activities.</p>
                <div class="milestone-tracker">
                    <h4>Recovery Milestones</h4>
                    <div class="milestone-list">
                        <div class="milestone-item">
                            <div class="milestone-checkbox"></div>
                            <div class="milestone-text">Return to work (sedentary job)</div>
                            <div class="milestone-timing">Weeks 4-6</div>
                        </div>
                        <div class="milestone-item">
                            <div class="milestone-checkbox"></div>
                            <div class="milestone-text">Return to driving</div>
                            <div class="milestone-timing">Weeks 2-6</div>
                        </div>
                        <div class="milestone-item">
                            <div class="milestone-checkbox"></div>
                            <div class="milestone-text">Begin more advanced exercises</div>
                            <div class="milestone-timing">Weeks 10-12</div>
                        </div>
                        <div class="milestone-item">
                            <div class="milestone-checkbox"></div>
                            <div class="milestone-text">Return to work (physical job)</div>
                            <div class="milestone-timing">Weeks 12-16</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function initializeStage8() {
    // Long-term Recovery stage
    const stage8 = document.getElementById('stage-8');
    stage8.innerHTML += `
        <div class="stage-grid">
            <div class="info-panel">
                <h3>Long-term Recovery and Maintenance (6+ Months)</h3>
                <p>By 6-12 months, most patients have reached their maximum recovery. The focus shifts to maintaining spine health and preventing future problems.</p>
                <div class="long-term-care">
                    <h4>Long-term Spine Health</h4>
                    <ul>
                        <li>Regular exercise program focusing on core strength</li>
                        <li>Maintaining proper body mechanics</li>
                        <li>Weight management</li>
                        <li>Regular follow-up appointments</li>
                        <li>Bone health maintenance (calcium, vitamin D)</li>
                    </ul>
                </div>
            </div>
        </div>
    `;
}

// Add interactive tooltips to timeline elements
function addTimelineTooltips() {
    // Will be implemented when timeline SVG is loaded
    document.addEventListener('svgLoaded', function(e) {
        const timelineSVG = e.detail.svg;
        if (!timelineSVG) return;
        
        // Add tooltips to timeline markers
        const markers = timelineSVG.querySelectorAll('circle');
        markers.forEach(marker => {
            marker.addEventListener('mouseover', function(e) {
                showTooltip(e, this.nextElementSibling.textContent);
            });
            
            marker.addEventListener('mouseout', function() {
                hideTooltip();
            });
        });
    });
}

// Show tooltip
function showTooltip(event, text) {
    let tooltip = document.getElementById('interactive-tooltip');
    if (!tooltip) {
        tooltip = document.createElement('div');
        tooltip.id = 'interactive-tooltip';
        document.body.appendChild(tooltip);
    }
    
    tooltip.textContent = text;
    tooltip.style.left = (event.pageX + 10) + 'px';
    tooltip.style.top = (event.pageY + 10) + 'px';
    tooltip.style.display = 'block';
}

// Hide tooltip
function hideTooltip() {
    const tooltip = document.getElementById('interactive-tooltip');
    if (tooltip) {
        tooltip.style.display = 'none';
    }
}

// Add zoom and pan functionality to spine models
function addZoomPanToSpineModels() {
    // Will be implemented when spine models are loaded
    const spineModels = document.querySelectorAll('.spine-model');
    
    spineModels.forEach(model => {
        if (!model.querySelector('svg')) return;
        
        // Add zoom controls
        const zoomControls = document.createElement('div');
        zoomControls.className = 'zoom-controls';
        zoomControls.innerHTML = `
            <button class="zoom-btn zoom-in">+</button>
            <button class="zoom-btn zoom-out">-</button>
            <button class="zoom-btn zoom-reset">Reset</button>
        `;
        
        model.appendChild(zoomControls);
        
        // Initialize zoom state
        const svg = model.querySelector('svg');
        let scale = 1;
        let translateX = 0;
        let translateY = 0;
        
        // Zoom in button
        zoomControls.querySelector('.zoom-in').addEventListener('click', function() {
            scale *= 1.2;
            updateTransform();
        });
        
        // Zoom out button
        zoomControls.querySelector('.zoom-out').addEventListener('click', function() {
            scale /= 1.2;
            if (scale < 0.5) scale = 0.5;
            updateTransform();
        });
        
        // Reset button
        zoomControls.querySelector('.zoom-reset').addEventListener('click', function() {
            scale = 1;
            translateX = 0;
            translateY = 0;
            updateTransform();
        });
        
        // Update transform
        function updateTransform() {
            svg.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
        }
        
        // Add pan functionality
        let isDragging = false;
        let startX, startY;
        
        svg.addEventListener('mousedown', function(e) {
            isDragging = true;
            startX = e.clientX - translateX;
            startY = e.clientY - translateY;
            svg.style.cursor = 'grabbing';
        });
        
        document.addEventListener('mousemove', function(e) {
            if (!isDragging) return;
            
            translateX = e.clientX - startX;
            translateY = e.clientY - startY;
            updateTransform();
        });
        
        document.addEventListener('mouseup', function() {
            isDragging = false;
            svg.style.cursor = 'grab';
        });
        
        // Initialize cursor
        svg.style.cursor = 'grab';
    });
}

// Add animation sequences for surgical procedure
function addSurgicalAnimations() {
    // Will be implemented when surgical procedure SVG is loaded
    document.addEventListener('svgLoaded', function(e) {
        if (e.detail.id !== 'spine-model-3') return;
        
        const svg = e.detail.svg;
        if (!svg) return;
        
        // Add animation controls
        const animationControls = document.createElement('div');
        animationControls.className = 'animation-controls';
        animationControls.innerHTML = `
            <button class="anim-btn" data-step="1">1. Access</button>
            <button class="anim-btn" data-step="2">2. Disc Removal</button>
            <button class="anim-btn" data-step="3">3. Bone Graft</button>
            <button class="anim-btn" data-step="4">4. Hardware</button>
            <button class="anim-btn" data-step="5">5. Complete</button>
        `;
        
        const container = document.querySelector('#spine-model-3');
        container.appendChild(animationControls);
        
        // Add animation event handlers
        const animButtons = animationControls.querySelectorAll('.anim-btn');
        animButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                const step = this.getAttribute('data-step');
                animateSurgicalStep(svg, step);
                
                // Update active button
                animButtons.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
            });
        });
    });
}

// Animate surgical step
function animateSurgicalStep(svg, step) {
    // Reset all elements
    resetSurgicalAnimation(svg);
    
    // Animate based on step
    switch(step) {
        case '1': // Access
            highlightElement(svg, 'L4', '#ffcccc');
            highlightElement(svg, 'L5', '#ffcccc');
            break;
            
        case '2': // Disc Removal
            highlightElement(svg, 'L4', '#ffcccc');
            highlightElement(svg, 'L5', '#ffcccc');
            // Hide the disc between L4-L5
            const discs = svg.querySelectorAll('ellipse');
            if (discs.length >= 2) {
                discs[discs.length - 2].style.opacity = '0.3';
            }
            break;
            
        case '3': // Bone Graft
            highlightElement(svg, 'L4', '#ffcccc');
            highlightElement(svg, 'L5', '#ffcccc');
            // Hide the disc and show bone graft
            const graftDiscs = svg.querySelectorAll('ellipse');
            if (graftDiscs.length >= 2) {
                graftDiscs[graftDiscs.length - 2].style.opacity = '0.3';
            }
            // Show interbody cage
            const cage = svg.querySelector('rect[x="85"][y="280"]');
            if (cage) {
                cage.style.fill = '#a0d6b4';
                cage.style.stroke = '#2ecc71';
                cage.style.strokeWidth = '2';
            }
            break;
            
        case '4': // Hardware
            highlightElement(svg, 'L4', '#ffcccc');
            highlightElement(svg, 'L5', '#ffcccc');
            // Show interbody cage
            const hardwareCage = svg.querySelector('rect[x="85"][y="280"]');
            if (hardwareCage) {
                hardwareCage.style.fill = '#a0d6b4';
                hardwareCage.style.stroke = '#2ecc71';
                hardwareCage.style.strokeWidth = '2';
            }
            // Show screws and rods
            const screws = svg.querySelectorAll('circle[cx="75"][cy="250"], circle[cx="125"][cy="250"], circle[cx="75"][cy="300"], circle[cx="125"][cy="300"]');
            screws.forEach(screw => {
                screw.style.fill = '#a0a0a0';
                screw.style.stroke = '#666';
                screw.style.strokeWidth = '2';
            });
            
            const rods = svg.querySelectorAll('line[x1="75"][y1="250"], line[x1="125"][y1="250"]');
            rods.forEach(rod => {
                rod.style.stroke = '#a0a0a0';
                rod.style.strokeWidth = '4';
            });
            break;
            
        case '5': // Complete
            highlightElement(svg, 'L4', '#ffcccc');
            highlightElement(svg, 'L5', '#ffcccc');
            // Show everything
            const completeCage = svg.querySelector('rect[x="85"][y="280"]');
            if (completeCage) {
                completeCage.style.fill = '#a0d6b4';
                completeCage.style.stroke = '#2ecc71';
                completeCage.style.strokeWidth = '2';
            }
            
            const completeScrews = svg.querySelectorAll('circle[cx="75"][cy="250"], circle[cx="125"][cy="250"], circle[cx="75"][cy="300"], circle[cx="125"][cy="300"]');
            completeScrews.forEach(screw => {
                screw.style.fill = '#a0a0a0';
                screw.style.stroke = '#666';
                screw.style.strokeWidth = '2';
            });
            
            const completeRods = svg.querySelectorAll('line[x1="75"][y1="250"], line[x1="125"][y1="250"]');
            completeRods.forEach(rod => {
                rod.style.stroke = '#a0a0a0';
                rod.style.strokeWidth = '4';
            });
            
            // Add fusion effect
            const fusedArea = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            fusedArea.setAttribute('x', '70');
            fusedArea.setAttribute('y', '250');
            fusedArea.setAttribute('width', '60');
            fusedArea.setAttribute('height', '70');
            fusedArea.setAttribute('fill', 'rgba(46, 204, 113, 0.2)');
            fusedArea.setAttribute('stroke', '#2ecc71');
            fusedArea.setAttribute('stroke-width', '1');
            fusedArea.setAttribute('stroke-dasharray', '5,3');
            svg.appendChild(fusedArea);
            break;
    }
}

// Reset surgical animation
function resetSurgicalAnimation(svg) {
    // Reset vertebrae
    const vertebrae = svg.querySelectorAll('rect[rx="3"]');
    vertebrae.forEach(v => {
        v.style.fill = '#e0e0e0';
        v.style.stroke = '#999';
        v.style.strokeWidth = '1';
    });
    
    // Reset discs
    const discs = svg.querySelectorAll('ellipse');
    discs.forEach(d => {
        d.style.fill = '#b3d9ff';
        d.style.stroke = '#999';
        d.style.strokeWidth = '1';
        d.style.opacity = '1';
    });
    
    // Reset hardware
    const screws = svg.querySelectorAll('circle[cx="75"][cy="250"], circle[cx="125"][cy="250"], circle[cx="75"][cy="300"], circle[cx="125"][cy="300"]');
    screws.forEach(screw => {
        screw.style.fill = '#c0c0c0';
        screw.style.stroke = '#666';
        screw.style.strokeWidth = '1';
    });
    
    const rods = svg.querySelectorAll('line[x1="75"][y1="250"], line[x1="125"][y1="250"]');
    rods.forEach(rod => {
        rod.style.stroke = '#c0c0c0';
        rod.style.strokeWidth = '3';
    });
    
    // Reset cage
    const cage = svg.querySelector('rect[x="85"][y="280"]');
    if (cage) {
        cage.style.fill = '#d9d9d9';
        cage.style.stroke = '#666';
        cage.style.strokeWidth = '1';
    }
    
    // Remove any added elements
    const fusedArea = svg.querySelector('rect[stroke-dasharray="5,3"]');
    if (fusedArea) {
        fusedArea.remove();
    }
}

// Highlight element
function highlightElement(svg, id, color) {
    const element = svg.getElementById(id);
    if (element) {
        const rect = element.querySelector('rect');
        if (rect) {
            rect.style.fill = color;
            rect.style.stroke = '#cc0000';
            rect.style.strokeWidth = '2';
        }
    }
}

// Add interactive recovery progress tracker
function addRecoveryTracker() {
    const recoveryContainer = document.createElement('div');
    recoveryContainer.className = 'recovery-tracker';
    recoveryContainer.innerHTML = `
        <h3>Recovery Progress Tracker</h3>
        <div class="tracker-container">
            <div class="tracker-timeline">
                <div class="tracker-marker" data-week="1">Week 1</div>
                <div class="tracker-marker" data-week="2">Week 2</div>
                <div class="tracker-marker" data-week="4">Week 4</div>
                <div class="tracker-marker" data-week="8">Week 8</div>
                <div class="tracker-marker" data-week="12">Week 12</div>
                <div class="tracker-marker" data-week="24">Week 24</div>
                <div class="tracker-marker" data-week="52">1 Year</div>
            </div>
            <div class="tracker-metrics">
                <div class="tracker-metric">
                    <div class="metric-label">Pain Level</div>
                    <div class="metric-scale">
                        <div class="scale-marker" data-value="10">10</div>
                        <div class="scale-marker" data-value="8">8</div>
                        <div class="scale-marker" data-value="6">6</div>
                        <div class="scale-marker" data-value="4">4</div>
                        <div class="scale-marker" data-value="2">2</div>
                        <div class="scale-marker" data-value="0">0</div>
                    </div>
                    <div class="metric-line" id="pain-line"></div>
                </div>
                <div class="tracker-metric">
                    <div class="metric-label">Activity Level</div>
                    <div class="metric-scale">
                        <div class="scale-marker" data-value="100">100%</div>
                        <div class="scale-marker" data-value="80">80%</div>
                        <div class="scale-marker" data-value="60">60%</div>
                        <div class="scale-marker" data-value="40">40%</div>
                        <div class="scale-marker" data-value="20">20%</div>
                        <div class="scale-marker" data-value="0">0%</div>
                    </div>
                    <div class="metric-line" id="activity-line"></div>
                </div>
            </div>
        </div>
    `;
    
    // Add to stage 5
    const stage5 = document.getElementById('stage-5');
    if (stage5) {
        stage5.appendChild(recoveryContainer);
    }
    
    // Initialize recovery tracker data
    const painData = [
        {week: 1, value: 8},
        {week: 2, value: 7},
        {week: 4, value: 5},
        {week: 8, value: 3},
        {week: 12, value: 2},
        {week: 24, value: 1},
        {week: 52, value: 0.5}
    ];
    
    const activityData = [
        {week: 1, value: 10},
        {week: 2, value: 20},
        {week: 4, value: 40},
        {week: 8, value: 60},
        {week: 12, value: 75},
        {week: 24, value: 90},
        {week: 52, value: 95}
    ];
    
    // Draw recovery tracker lines
    setTimeout(() => {
        drawMetricLine('pain-line', painData, 10);
        drawMetricLine('activity-line', activityData, 100);
    }, 500);
}

// Draw metric line
function drawMetricLine(id, data, maxValue) {
    const line = document.getElementById(id);
    if (!line) return;
    
    // Calculate points
    const points = data.map(point => {
        const x = calculateXPosition(point.week);
        const y = calculateYPosition(point.value, maxValue);
        return `${x},${y}`;
    }).join(' ');
    
    // Create SVG
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    
    // Create polyline
    const polyline = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
    polyline.setAttribute('points', points);
    polyline.setAttribute('fill', 'none');
    polyline.setAttribute('stroke', id === 'pain-line' ? '#e74c3c' : '#3498db');
    polyline.setAttribute('stroke-width', '2');
    
    // Create dots
    data.forEach(point => {
        const x = calculateXPosition(point.week);
        const y = calculateYPosition(point.value, maxValue);
        
        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute('cx', x);
        circle.setAttribute('cy', y);
        circle.setAttribute('r', '4');
        circle.setAttribute('fill', id === 'pain-line' ? '#e74c3c' : '#3498db');
        
        // Add tooltip
        circle.addEventListener('mouseover', function(e) {
            showTooltip(e, `Week ${point.week}: ${point.value}${id === 'pain-line' ? '/10 pain' : '% activity'}`);
        });
        
        circle.addEventListener('mouseout', function() {
            hideTooltip();
        });
        
        svg.appendChild(circle);
    });
    
    svg.appendChild(polyline);
    line.appendChild(svg);
}

// Calculate X position for metric line
function calculateXPosition(week) {
    // Map weeks to percentage across the width
    const weekPositions = {
        1: 0,
        2: 16.7,
        4: 33.3,
        8: 50,
        12: 66.7,
        24: 83.3,
        52: 100
    };
    
    return `${weekPositions[week]}%`;
}

// Calculate Y position for metric line
function calculateYPosition(value, maxValue) {
    // Invert the percentage (0 at top, 100 at bottom)
    const percentage = 100 - (value / maxValue * 100);
    return `${percentage}%`;
}

// Add keyboard navigation for accessibility
function addKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        // Navigation between stages
        if (e.key === 'ArrowRight') {
            navigateToNextStage();
        } else if (e.key === 'ArrowLeft') {
            navigateToPreviousStage();
        }
    });
}

// Navigate to next stage
function navigateToNextStage() {
    const activeStage = document.querySelector('.stage-btn.active');
    if (!activeStage) return;
    
    const currentStage = parseInt(activeStage.getAttribute('data-stage'));
    const nextStage = currentStage + 1;
    
    const nextButton = document.querySelector(`.stage-btn[data-stage="${nextStage}"]`);
    if (nextButton) {
        nextButton.click();
    }
}

// Navigate to previous stage
function navigateToPreviousStage() {
    const activeStage = document.querySelector('.stage-btn.active');
    if (!activeStage) return;
    
    const currentStage = parseInt(activeStage.getAttribute('data-stage'));
    const prevStage = currentStage - 1;
    
    const prevButton = document.querySelector(`.stage-btn[data-stage="${prevStage}"]`);
    if (prevButton) {
        prevButton.click();
    }
}

// Add CSS for new interactive elements
document.addEventListener('DOMContentLoaded', function() {
    const style = document.createElement('style');
    style.textContent = `
        /* Interactive Tooltips */
        #interactive-tooltip {
            position: absolute;
            background-color: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 5px 10px;
            border-radius: 4px;
            font-size: 12px;
            z-index: 1000;
            pointer-events: none;
            display: none;
        }
        
        /* Zoom Controls */
        .zoom-controls {
            position: absolute;
            bottom: 10px;
            right: 10px;
            display: flex;
            gap: 5px;
        }
        
        .zoom-btn {
            width: 30px;
            height: 30px;
            background-color: white;
            border: 1px solid #ddd;
            border-radius: 4px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
        }
        
        .zoom-btn:hover {
            background-color: #f0f7ff;
        }
        
        /* Animation Controls */
        .animation-controls {
            display: flex;
            gap: 5px;
            margin-top: 10px;
            flex-wrap: wrap;
            justify-content: center;
        }
        
        .anim-btn {
            padding: 5px 10px;
            background-color: #f0f7ff;
            border: 1px solid #bdc3c7;
            border-radius: 4px;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .anim-btn:hover {
            background-color: #e6f3ff;
            border-color: #3498db;
        }
        
        .anim-btn.active {
            background-color: #3498db;
            color: white;
            border-color: #2980b9;
        }
        
        /* Recovery Tracker */
        .recovery-tracker {
            margin-top: 2rem;
            padding: 1rem;
            background-color: #f8f9fa;
            border-radius: 8px;
        }
        
        .tracker-container {
            display: flex;
            flex-direction: column;
            height: 300px;
            margin-top: 1rem;
        }
        
        .tracker-timeline {
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;
        }
        
        .tracker-marker {
            font-size: 12px;
            color: #7f8c8d;
            text-align: center;
            width: 50px;
        }
        
        .tracker-metrics {
            display: flex;
            flex-direction: column;
            gap: 20px;
            flex-grow: 1;
        }
        
        .tracker-metric {
            display: flex;
            height: 120px;
            position: relative;
        }
        
        .metric-label {
            writing-mode: vertical-rl;
            transform: rotate(180deg);
            text-align: center;
            padding: 10px;
            font-weight: bold;
            color: #2c3e50;
        }
        
        .metric-scale {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            padding: 0 10px;
        }
        
        .scale-marker {
            font-size: 10px;
            color: #7f8c8d;
        }
        
        .metric-line {
            flex-grow: 1;
            position: relative;
        }
        
        /* Approach Selector */
        .approach-selector {
            display: flex;
            gap: 10px;
            margin-bottom: 15px;
        }
        
        .approach-btn {
            padding: 8px 15px;
            background-color: #f0f7ff;
            border: 1px solid #bdc3c7;
            border-radius: 4px;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .approach-btn:hover {
            background-color: #e6f3ff;
            border-color: #3498db;
        }
        
        .approach-btn.active {
            background-color: #3498db;
            color: white;
            border-color: #2980b9;
        }
        
        .approach-description {
            display: none;
            padding: 15px;
            background-color: white;
            border-radius: 4px;
            border: 1px solid #e0e0e0;
        }
        
        .approach-description.active {
            display: block;
        }
        
        /* Surgical Steps */
        .surgical-steps {
            margin-top: 20px;
        }
        
        .step-navigation {
            display: flex;
            flex-wrap: wrap;
            gap: 5px;
            margin-bottom: 15px;
        }
        
        .step-nav-btn {
            padding: 8px 12px;
            background-color: #f0f7ff;
            border: 1px solid #bdc3c7;
            border-radius: 4px;
            cursor: pointer;
            font-size: 12px;
            transition: all 0.3s ease;
        }
        
        .step-nav-btn:hover {
            background-color: #e6f3ff;
            border-color: #3498db;
        }
        
        .step-nav-btn.active {
            background-color: #3498db;
            color: white;
            border-color: #2980b9;
        }
        
        .step-content {
            display: none;
            padding: 15px;
            background-color: white;
            border-radius: 4px;
            border: 1px solid #e0e0e0;
        }
        
        /* Checklist */
        .checklist {
            display: flex;
            flex-direction: column;
            gap: 10px;
        }
        
        .checklist-item {
            padding: 10px;
            background-color: white;
            border-radius: 4px;
            border: 1px solid #e0e0e0;
        }
        
        .checklist-item.completed {
            background-color: #f0fff4;
            border-color: #2ecc71;
        }
        
        .checklist-item label {
            font-weight: bold;
            margin-left: 5px;
        }
        
        .checklist-details {
            margin-top: 5px;
            margin-left: 25px;
            font-size: 14px;
            color: #7f8c8d;
        }
        
        /* Preparation Timeline */
        .preparation-timeline {
            margin-top: 20px;
        }
        
        .timeline-wrapper {
            position: relative;
            padding-left: 30px;
        }
        
        .timeline-wrapper::before {
            content: '';
            position: absolute;
            left: 10px;
            top: 0;
            bottom: 0;
            width: 2px;
            background-color: #e0e0e0;
        }
        
        .prep-timeline-item {
            position: relative;
            margin-bottom: 20px;
        }
        
        .timeline-marker {
            position: absolute;
            left: -30px;
            top: 0;
            width: 20px;
            height: 20px;
            background-color: #3498db;
            border-radius: 50%;
        }
        
        .timeline-content {
            padding: 15px;
            background-color: white;
            border-radius: 4px;
            border: 1px solid #e0e0e0;
        }
        
        /* Activity Restrictions */
        .activity-restrictions {
            margin-top: 20px;
        }
        
        .restriction-list {
            list-style: none;
            padding: 0;
            margin: 0;
        }
        
        .restriction-list li {
            padding: 10px 15px;
            margin-bottom: 10px;
            border-radius: 4px;
            position: relative;
            padding-left: 30px;
        }
        
        .restriction-list li::before {
            content: '';
            position: absolute;
            left: 10px;
            top: 50%;
            transform: translateY(-50%);
            width: 16px;
            height: 16px;
            border-radius: 50%;
        }
        
        .restriction-list li.restricted {
            background-color: #ffebee;
            border: 1px solid #ffcdd2;
        }
        
        .restriction-list li.restricted::before {
            background-color: #e74c3c;
        }
        
        .restriction-list li.allowed {
            background-color: #e8f5e9;
            border: 1px solid #c8e6c9;
        }
        
        .restriction-list li.allowed::before {
            background-color: #2ecc71;
        }
        
        /* PT Exercises */
        .pt-exercises {
            margin-top: 20px;
        }
        
        .exercise-list {
            display: flex;
            flex-wrap: wrap;
            gap: 15px;
            margin-top: 10px;
        }
        
        .exercise-item {
            flex: 1 0 calc(50% - 15px);
            min-width: 200px;
            padding: 15px;
            background-color: white;
            border-radius: 4px;
            border: 1px solid #e0e0e0;
        }
        
        .exercise-item h5 {
            margin: 0 0 5px 0;
            color: #3498db;
        }
        
        /* Milestone Tracker */
        .milestone-tracker {
            margin-top: 20px;
        }
        
        .milestone-list {
            display: flex;
            flex-direction: column;
            gap: 10px;
            margin-top: 10px;
        }
        
        .milestone-item {
            display: flex;
            align-items: center;
            padding: 10px 15px;
            background-color: white;
            border-radius: 4px;
            border: 1px solid #e0e0e0;
        }
        
        .milestone-checkbox {
            width: 20px;
            height: 20px;
            border-radius: 50%;
            border: 2px solid #3498db;
            margin-right: 15px;
            cursor: pointer;
        }
        
        .milestone-checkbox.checked {
            background-color: #3498db;
            position: relative;
        }
        
        .milestone-checkbox.checked::after {
            content: '✓';
            position: absolute;
            color: white;
            font-size: 12px;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
        
        .milestone-text {
            flex-grow: 1;
        }
        
        .milestone-timing {
            color: #7f8c8d;
            font-size: 12px;
        }
        
        /* Journey Timeline Container */
        .journey-timeline-container {
            margin-bottom: 2rem;
            padding: 1rem;
            background-color: #fff;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            overflow-x: auto;
        }
        
        /* Interactive Checkbox */
        .interactive-checkbox {
            width: 18px;
            height: 18px;
            cursor: pointer;
        }
    `;
    
    document.head.appendChild(style);
});
