// She Will Like Me - Connection Builder
// COMPLETELY CUSTOMIZED FOR YOU

// Wait for page to fully load
window.addEventListener('load', function() {
    console.log("Page loaded successfully!");
    
    // Initialize the app
    initApp();
});

function initApp() {
    // ⭐⭐⭐ YOUR PERSONAL DETAILS - CHANGE THESE! ⭐⭐⭐
    const yourDetails = {
        yourName: "YOUR NAME HERE",  // ⬅️ CHANGE TO YOUR REAL NAME
        sharedMemory: "had that amazing conversation at the cafe",  // ⬅️ CHANGE TO REAL MEMORY
        herQuality1: "your incredible smile",  // ⬅️ CHANGE TO HER QUALITY
        herQuality2: "how you light up a room",  // ⬅️ CHANGE TO HER QUALITY  
        sharedInterest: "our love for coffee shops",  // ⬅️ CHANGE TO SHARED INTEREST
        firstDateIdea: "trying that new coffee place downtown"  // ⬅️ CHANGE TO DATE IDEA
    };
    // ⭐⭐⭐ END OF PERSONAL DETAILS ⭐⭐⭐
    
    // Get DOM elements
    const revealBtn = document.getElementById('revealBtn');
    const mysteryOpener = document.getElementById('mysteryOpener');
    const mainExperience = document.getElementById('mainExperience');
    const progressFill = document.getElementById('progressFill');
    const stepIndicators = document.querySelectorAll('.step-indicator');
    const musicBtn = document.getElementById('musicBtn');
    const backgroundMusic = document.getElementById('backgroundMusic');
    
    // Step navigation buttons
    const nextStep1 = document.getElementById('nextStep1');
    const nextStep2 = document.getElementById('nextStep2');
    const nextStep3 = document.getElementById('nextStep3');
    
    // Response buttons
    const yesBtn = document.getElementById('yesBtn');
    const maybeBtn = document.getElementById('maybeBtn');
    const friendBtn = document.getElementById('friendBtn');
    
    // Action buttons
    const saveExperience = document.getElementById('saveExperience');
    const sendMessage = document.getElementById('sendMessage');
    
    // Other elements
    const clueReveal = document.getElementById('clueReveal');
    const revealClueBtn = document.getElementById('revealClueBtn');
    const revealCountdown = document.getElementById('revealCountdown');
    const bigReveal = document.getElementById('bigReveal');
    const aftermathMessage = document.getElementById('aftermathMessage');
    const celebrationAnimation = document.getElementById('celebrationAnimation');
    
    // State variables
    let currentStep = 1;
    let userResponse = '';
    
    // ⭐⭐⭐ PERSONALIZED CLUES - These will make her think of YOU ⭐⭐⭐
    const clues = [
        `They notice ${yourDetails.herQuality1} every time they see you`,
        `They remember everything about that time you ${yourDetails.sharedMemory}`,
        `They can't stop thinking about your laugh - it's their favorite sound`,
        `They always look forward to seeing you, more than anyone else`,
        `They admire how passionate you are about the things you care about`,
        `They've been wanting to tell you this for longer than you'd imagine`
    ];
    
    let clueIndex = 0;
    
    // Initialize music
    backgroundMusic.volume = 0.2;
    
    // Make sure the reveal button works
    if (revealBtn) {
        revealBtn.addEventListener('click', function() {
            console.log("Reveal button clicked!");
            
            // Add loading state
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Opening...';
            this.disabled = true;
            
            // Play sound
            playSound('reveal');
            
            // Animate opening
            setTimeout(() => {
                // Hide mystery opener
                mysteryOpener.style.opacity = '0';
                
                setTimeout(() => {
                    mysteryOpener.style.display = 'none';
                    
                    // Show main experience
                    mainExperience.style.display = 'block';
                    mainExperience.classList.remove('hidden');
                    
                    // Show first step
                    showStep(1);
                    
                    // Update qualities with personalized details
                    updateQualities(yourDetails);
                    
                    // Start music
                    backgroundMusic.play().catch(e => {
                        console.log("Music requires user interaction");
                    });
                    
                    console.log("Main experience revealed!");
                }, 500);
            }, 1000);
        });
    } else {
        console.error("Reveal button not found!");
    }
    
    // Step navigation
    if (nextStep1) nextStep1.addEventListener('click', () => navigateToStep(2));
    if (nextStep2) nextStep2.addEventListener('click', () => navigateToStep(3));
    if (nextStep3) nextStep3.addEventListener('click', startRevealCountdown);
    
    // Response buttons
    if (yesBtn) yesBtn.addEventListener('click', () => handleResponse('yes', yourDetails));
    if (maybeBtn) maybeBtn.addEventListener('click', () => handleResponse('maybe', yourDetails));
    if (friendBtn) friendBtn.addEventListener('click', () => handleResponse('friend', yourDetails));
    
    // Action buttons
    if (saveExperience) saveExperience.addEventListener('click', saveTheExperience);
    if (sendMessage) sendMessage.addEventListener('click', sendAMessage);
    
    // Clue reveal
    if (revealClueBtn) {
        revealClueBtn.addEventListener('click', () => revealNextClue(yourDetails));
    }
    
    // Music control
    if (musicBtn) {
        musicBtn.addEventListener('click', function() {
            if (backgroundMusic.paused) {
                backgroundMusic.play();
                this.innerHTML = '<i class="fas fa-music"></i><span>Music On</span>';
            } else {
                backgroundMusic.pause();
                this.innerHTML = '<i class="fas fa-volume-mute"></i><span>Music Off</span>';
            }
        });
    }
    
    // Step indicators click
    stepIndicators.forEach(indicator => {
        indicator.addEventListener('click', function() {
            const step = parseInt(this.dataset.step);
            if (step <= currentStep) {
                navigateToStep(step);
            }
        });
    });
    
    // Option cards selection
    document.querySelectorAll('.option-card').forEach(card => {
        card.addEventListener('click', function() {
            const option = this.dataset.option;
            
            // Remove selection from all cards
            document.querySelectorAll('.option-card').forEach(c => {
                c.style.background = 'rgba(255, 255, 255, 0.1)';
                c.style.borderColor = 'transparent';
            });
            
            // Select this card
            this.style.background = 'rgba(120, 119, 198, 0.2)';
            this.style.borderColor = '#7877c6';
            
            // Store selection
            userResponse = option;
        });
    });
    
    // Quality cards hover effects
    document.querySelectorAll('.quality-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            createSparkleEffect(this);
        });
    });
    
    // Initialize first clue
    if (clueReveal) {
        revealNextClue(yourDetails);
    }
    
    // Add floating hearts animation
    createFloatingEffects();
    
    console.log("App initialized successfully!");
}

// Update qualities with personalized details
function updateQualities(details) {
    const qualityCards = document.querySelectorAll('.quality-card');
    
    if (qualityCards.length >= 3) {
        // Update first quality card
        qualityCards[0].querySelector('h3').textContent = details.herQuality1.split(' ').slice(-2).join(' ') || "Your Smile";
        qualityCards[0].querySelector('p').textContent = `${details.herQuality1} doesn't go unnoticed`;
        
        // Update second quality card  
        qualityCards[1].querySelector('h3').textContent = "Your Presence";
        qualityCards[1].querySelector('p').textContent = `${details.herQuality2} makes every moment special`;
        
        // Update third quality card
        qualityCards[2].querySelector('h3').textContent = "Your Passion";
        qualityCards[2].querySelector('p').textContent = `The way you care about things inspires someone`;
    }
}

// Navigate to step
function navigateToStep(stepNumber) {
    console.log(`Navigating to step ${stepNumber}`);
    
    playSound('navigate');
    
    // Update current step
    currentStep = stepNumber;
    
    // Show the step
    showStep(stepNumber);
    
    // Update progress
    updateProgress();
    
    // Special animations for each step
    switch(stepNumber) {
        case 2:
            animateTimelineItems();
            break;
        case 3:
            // Already showing clues
            break;
    }
}

// Show specific step
function showStep(stepNumber) {
    // Hide all steps
    document.querySelectorAll('.step').forEach(step => {
        step.classList.remove('active');
    });
    
    // Show selected step
    const stepElement = document.getElementById(`step${stepNumber}`);
    if (stepElement) {
        stepElement.classList.add('active');
    }
    
    // Update step indicators
    document.querySelectorAll('.step-indicator').forEach((indicator, index) => {
        if (index + 1 <= stepNumber) {
            indicator.classList.add('active');
        } else {
            indicator.classList.remove('active');
        }
    });
}

// Update progress bar
function updateProgress() {
    const progressFill = document.getElementById('progressFill');
    if (progressFill) {
        const progress = ((currentStep - 1) / 4) * 100;
        progressFill.style.width = `${progress}%`;
    }
}

// Animate timeline items
function animateTimelineItems() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        setTimeout(() => {
            item.classList.add('visible');
        }, index * 300);
    });
}

// Reveal next clue
function revealNextClue(details) {
    const clueReveal = document.getElementById('clueReveal');
    if (!clueReveal) return;
    
    // Use the clues array that's now in parent scope
    const clues = [
        `They notice ${details.herQuality1} every time they see you`,
        `They remember everything about that time you ${details.sharedMemory}`,
        `They can't stop thinking about your laugh - it's their favorite sound`,
        `They always look forward to seeing you, more than anyone else`,
        `They admire how passionate you are about the things you care about`,
        `They've been wanting to tell you this for longer than you'd imagine`
    ];
    
    if (window.clueIndex < clues.length) {
        clueReveal.innerHTML = '';
        
        const clueElement = document.createElement('div');
        clueElement.className = 'clue-text';
        clueElement.textContent = clues[window.clueIndex];
        clueElement.style.animation = 'fadeIn 0.5s ease';
        
        clueReveal.appendChild(clueElement);
        
        window.clueIndex++;
        
        if (window.clueIndex >= clues.length) {
            document.getElementById('revealClueBtn').style.display = 'none';
            
            // Show final personalized clue
            setTimeout(() => {
                const finalClue = document.createElement('div');
                finalClue.className = 'final-clue';
                finalClue.innerHTML = `
                    <strong>The biggest clue:</strong><br>
                    It's someone who shares ${details.sharedInterest} with you
                `;
                finalClue.style.animation = 'fadeIn 1s ease';
                clueReveal.appendChild(finalClue);
            }, 1000);
        }
    }
}

// Start reveal countdown
function startRevealCountdown() {
    console.log("Starting reveal countdown...");
    
    playSound('countdown');
    
    const countdownNumbers = document.querySelector('.countdown-numbers');
    const countNumbers = countdownNumbers.querySelectorAll('.count-number');
    
    let count = 3;
    let currentIndex = 0;
    
    // Reset all numbers
    countNumbers.forEach(num => {
        num.style.display = 'none';
    });
    
    // Show first number
    countNumbers[currentIndex].style.display = 'block';
    
    const countdownInterval = setInterval(() => {
        // Hide current number
        countNumbers[currentIndex].style.display = 'none';
        
        // Move to next number
        currentIndex++;
        
        if (currentIndex < countNumbers.length) {
            // Show next number
            countNumbers[currentIndex].style.display = 'block';
            createCountdownEffect();
        } else {
            // Countdown complete
            clearInterval(countdownInterval);
            
            // Hide countdown
            document.getElementById('revealCountdown').style.display = 'none';
            
            // Show big reveal
            document.getElementById('bigReveal').classList.remove('hidden');
            
            // Update confession with personalized details
            updateConfession();
            
            // Play reveal sound and effects
            playSound('celebration');
            createRevealEffects();
            
            console.log("Reveal complete!");
        }
    }, 1000);
}

// Update confession with personalized details
function updateConfession() {
    const confessionPoints = document.querySelectorAll('.confession-point span');
    
    if (confessionPoints.length >= 4) {
        // Get details from the global scope or from the initialized details
        const details = {
            herQuality1: "your incredible smile",
            sharedMemory: "had that amazing conversation at the cafe",
            sharedInterest: "our love for coffee shops"
        };
        
        confessionPoints[0].textContent = `I notice ${details.herQuality1} every time I see you`;
        confessionPoints[1].textContent = `I haven't forgotten about that time we ${details.sharedMemory}`;
        confessionPoints[2].textContent = `I think you're someone truly special and unique`;
        confessionPoints[3].textContent = `I'd love to explore ${details.sharedInterest} together`;
    }
}

// Handle user response
function handleResponse(responseType, details) {
    console.log(`User response: ${responseType}`);
    
    window.userResponse = responseType;
    
    // Play appropriate sound
    if (responseType === 'yes') {
        playSound('celebration');
        createYesEffects();
    } else {
        playSound('neutral');
    }
    
    // Navigate to aftermath step
    setTimeout(() => {
        navigateToStep(5);
        showAftermathMessage(responseType, details);
        
        // Create celebration animation for yes response
        if (responseType === 'yes') {
            createCelebrationAnimation();
        }
    }, 1500);
}

// Show aftermath message based on response
function showAftermathMessage(responseType, details) {
    const aftermathMessage = document.getElementById('aftermathMessage');
    if (!aftermathMessage) return;
    
    let message = '';
    
    switch(responseType) {
        case 'yes':
            message = `
                <h3 style="color: #4CAF50; margin-bottom: 1rem;">You made my day! 🌟</h3>
                <p style="margin-bottom: 1rem;">I've been wanting to tell you how I feel for a while now.</p>
                
                <div style="background: rgba(76, 175, 80, 0.1); padding: 1rem; border-radius: 10px; margin: 1rem 0; border-left: 4px solid #4CAF50;">
                    <p style="margin: 0;"><strong>Here's my promise to you:</strong></p>
                    <p style="margin: 0.5rem 0;">• I'll always be honest with you</p>
                    <p style="margin: 0.5rem 0;">• I'll respect your boundaries</p>
                    <p style="margin: 0.5rem 0;">• I'll make every moment count</p>
                </div>
                
                <p style="margin-bottom: 1rem;">I'll text you tomorrow about ${details.firstDateIdea} - sound good?</p>
                
                <p style="font-style: italic; color: #7877c6; margin-top: 1rem;">
                    Thank you for giving this a chance. You won't regret it. ❤️
                </p>
            `;
            break;
            
        case 'maybe':
            message = `
                <h3 style="color: #FF9800; margin-bottom: 1rem;">I respect that completely 🙏</h3>
                <p style="margin-bottom: 1rem;">Take all the time you need. There's no pressure at all.</p>
                
                <div style="background: rgba(255, 152, 0, 0.1); padding: 1rem; border-radius: 10px; margin: 1rem 0; border-left: 4px solid #FF9800;">
                    <p style="margin: 0;"><strong>Just so you know:</strong></p>
                    <p style="margin: 0.5rem 0;">• My feelings are genuine</p>
                    <p style="margin: 0.5rem 0;">• I'll wait for your answer patiently</p>
                    <p style="margin: 0.5rem 0;">• Nothing changes unless you want it to</p>
                </div>
                
                <p style="margin-bottom: 1rem;">Whenever you're ready, just let me know. Or don't - either way, I'm glad I told you.</p>
                
                <p style="font-style: italic; color: #7877c6;">
                    You're worth waiting for. 💫
                </p>
            `;
            break;
            
        case 'friend':
            message = `
                <h3 style="color: #2196F3; margin-bottom: 1rem;">Thank you for being honest 💙</h3>
                <p style="margin-bottom: 1rem;">I appreciate your clarity more than you know.</p>
                
                <div style="background: rgba(33, 150, 243, 0.1); padding: 1rem; border-radius: 10px; margin: 1rem 0; border-left: 4px solid #2196F3;">
                    <p style="margin: 0;"><strong>My promise to you:</strong></p>
                    <p style="margin: 0.5rem 0;">• I respect your decision completely</p>
                    <p style="margin: 0.5rem 0;">• Our friendship stays the same</p>
                    <p style="margin: 0.5rem 0;">• No awkwardness, just honesty</p>
                </div>
                
                <p style="margin-bottom: 1rem;">You're an amazing person and I'm lucky to have you in my life, in whatever way you're comfortable with.</p>
                
                <p style="font-style: italic; color: #7877c6;">
                    True friendship is priceless. Thank you for ours. ✨
                </p>
            `;
            break;
    }
    
    aftermathMessage.innerHTML = message;
}

// Save the experience
function saveTheExperience() {
    console.log("Saving experience...");
    
    playSound('save');
    
    // Create save notification
    const notification = document.createElement('div');
    notification.className = 'save-notification';
    notification.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>This special moment has been saved in our memories</span>
    `;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(76, 175, 80, 0.9);
        color: white;
        padding: 1rem 2rem;
        border-radius: 50px;
        display: flex;
        align-items: center;
        gap: 10px;
        z-index: 10000;
        animation: fadeInOut 3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Send a message
function sendAMessage() {
    console.log("Opening message composer...");
// Create copy modal
function createCopyModal() {
    const modal = document.createElement('div');
    modal.className = 'copy-modal';
    modal.innerHTML = `
        <div class="copy-modal-content">
            <div class="modal-header">
                <h3><i class="fas fa-share-alt"></i> Share This Experience</h3>
                <button class="close-modal">&times;</button>
            </div>
            
            <div class="modal-body">
                <div class="share-options">
                    <div class="option" data-type="link">
                        <i class="fas fa-link"></i>
                        <span>Copy Link</span>
                    </div>
                    <div class="option" data-type="message">
                        <i class="fas fa-comment"></i>
                        <span>Copy Message</span>
                    </div>
                    <div class="option" data-type="screenshot">
                        <i class="fas fa-camera"></i>
                        <span>Take Screenshot</span>
                    </div>
                </div>
                
                <div class="link-container hidden" id="linkContainer">
                    <p>Share this link with her:</p>
                    <div class="link-box">
                        <input type="text" id="shareLink" value="${window.location.href}" readonly>
                        <button id="copyLinkBtn">
                            <i class="fas fa-copy"></i> Copy
                        </button>
                    </div>
                </div>
                
                <div class="message-container hidden" id="messageContainer">
                    <p>Copy this message to send:</p>
                    <div class="message-box">
                        <textarea id="shareMessage" readonly>
Hey! Someone created something special for you. You should check it out when you have a moment:

${window.location.href}

It's a surprise! 😊
                        </textarea>
                        <button id="copyMessageBtn">
                            <i class="fas fa-copy"></i> Copy Text
                        </button>
                    </div>
                </div>
                
                <div class="screenshot-container hidden" id="screenshotContainer">
                    <p>Take a screenshot of this moment:</p>
                    <div class="screenshot-instructions">
                        <div class="step">
                            <i class="fas fa-1"></i>
                            <span>Make sure the screen looks perfect</span>
                        </div>
                        <div class="step">
                            <i class="fas fa-2"></i>
                            <span>Press Ctrl+Shift+S (Windows) or Cmd+Shift+4 (Mac)</span>
                        </div>
                        <div class="step">
                            <i class="fas fa-3"></i>
                            <span>Select the area and save</span>
                        </div>
                    </div>
                    <button id="screenshotBtn">
                        <i class="fas fa-camera"></i> I've Taken Screenshot
                    </button>
                </div>
            </div>
            
            <div class="modal-footer">
                <p class="hint"><i class="fas fa-lightbulb"></i> Tip: Send this right before you see her in person!</p>
            </div>
        </div>
    `;
    
    // Add to page
    document.body.appendChild(modal);
    
    // Add styles
    addModalStyles();
    
    // Add event listeners
    setupModalEvents();
    
    return modal;
}

// Add modal styles
function addModalStyles() {
    const styles = document.createElement('style');
    styles.textContent = `
        .copy-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            animation: fadeIn 0.3s ease;
        }
        
        .copy-modal-content {
            background: white;
            border-radius: 20px;
            width: 90%;
            max-width: 500px;
            overflow: hidden;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            animation: slideUp 0.3s ease;
        }
        
        .modal-header {
            background: linear-gradient(45deg, #7877c6, #ff77c6);
            color: white;
            padding: 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .modal-header h3 {
            margin: 0;
            font-size: 1.5rem;
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .close-modal {
            background: none;
            border: none;
            color: white;
            font-size: 2rem;
            cursor: pointer;
            padding: 0;
            width: 30px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .modal-body {
            padding: 30px;
        }
        
        .share-options {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 15px;
            margin-bottom: 30px;
        }
        
        .share-options .option {
            background: #f5f5f5;
            border: 2px solid #e0e0e0;
            border-radius: 15px;
            padding: 20px 10px;
            text-align: center;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .share-options .option:hover {
            background: #e8e8e8;
            border-color: #7877c6;
            transform: translateY(-5px);
        }
        
        .share-options .option.active {
            background: rgba(120, 119, 198, 0.1);
            border-color: #7877c6;
        }
        
        .share-options .option i {
            font-size: 2rem;
            color: #7877c6;
            margin-bottom: 10px;
            display: block;
        }
        
        .share-options .option span {
            font-weight: 600;
            color: #333;
        }
        
        .link-container,
        .message-container,
        .screenshot-container {
            margin-top: 20px;
        }
        
        .link-container p,
        .message-container p,
        .screenshot-container p {
            margin-bottom: 15px;
            color: #666;
            font-weight: 500;
        }
        
        .link-box {
            display: flex;
            gap: 10px;
        }
        
        #shareLink {
            flex: 1;
            padding: 15px;
            border: 2px solid #e0e0e0;
            border-radius: 10px;
            font-family: monospace;
            font-size: 0.9rem;
        }
        
        #copyLinkBtn {
            background: #7877c6;
            color: white;
            border: none;
            border-radius: 10px;
            padding: 0 20px;
            cursor: pointer;
            font-weight: 600;
            display: flex;
            align-items: center;
            gap: 8px;
            transition: background 0.3s ease;
        }
        
        #copyLinkBtn:hover {
            background: #6665b5;
        }
        
        .message-box {
            display: flex;
            flex-direction: column;
            gap: 10px;
        }
        
        #shareMessage {
            width: 100%;
            height: 120px;
            padding: 15px;
            border: 2px solid #e0e0e0;
            border-radius: 10px;
            font-family: 'Montserrat', sans-serif;
            font-size: 0.95rem;
            line-height: 1.5;
            resize: vertical;
        }
        
        #copyMessageBtn {
            background: #7877c6;
            color: white;
            border: none;
            border-radius: 10px;
            padding: 15px;
            cursor: pointer;
            font-weight: 600;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            transition: background 0.3s ease;
        }
        
        #copyMessageBtn:hover {
            background: #6665b5;
        }
        
        .screenshot-instructions {
            background: #f9f9f9;
            padding: 20px;
            border-radius: 10px;
            margin-bottom: 20px;
        }
        
        .screenshot-instructions .step {
            display: flex;
            align-items: center;
            gap: 15px;
            margin-bottom: 15px;
        }
        
        .screenshot-instructions .step:last-child {
            margin-bottom: 0;
        }
        
        .screenshot-instructions .step i {
            width: 30px;
            height: 30px;
            background: #7877c6;
            color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-style: normal;
            font-weight: bold;
        }
        
        .screenshot-instructions .step span {
            color: #333;
        }
        
        #screenshotBtn {
            background: #7877c6;
            color: white;
            border: none;
            border-radius: 10px;
            padding: 15px 30px;
            cursor: pointer;
            font-weight: 600;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            width: 100%;
            transition: background 0.3s ease;
        }
        
        #screenshotBtn:hover {
            background: #6665b5;
        }
        
        .modal-footer {
            background: #f9f9f9;
            padding: 15px 30px;
            text-align: center;
            border-top: 1px solid #e0e0e0;
        }
        
        .modal-footer .hint {
            margin: 0;
            color: #7877c6;
            font-size: 0.9rem;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
        }
        
        .hidden {
            display: none !important;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes slideUp {
            from {
                opacity: 0;
                transform: translateY(50px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @media (max-width: 600px) {
            .share-options {
                grid-template-columns: 1fr;
            }
            
            .modal-body {
                padding: 20px;
            }
        }
    `;
    document.head.appendChild(styles);
}

// Setup modal events
function setupModalEvents() {
    const modal = document.querySelector('.copy-modal');
    if (!modal) return;
    
    // Close modal
    modal.querySelector('.close-modal').addEventListener('click', () => {
        modal.remove();
    });
    
    // Close on background click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
    
    // Share option selection
    const options = modal.querySelectorAll('.share-options .option');
    const containers = {
        link: modal.querySelector('#linkContainer'),
        message: modal.querySelector('#messageContainer'),
        screenshot: modal.querySelector('#screenshotContainer')
    };
    
    options.forEach(option => {
        option.addEventListener('click', () => {
            const type = option.dataset.type;
            
            // Remove active class from all options
            options.forEach(opt => opt.classList.remove('active'));
            
            // Hide all containers
            Object.values(containers).forEach(container => {
                container.classList.add('hidden');
            });
            
            // Activate selected option and show container
            option.classList.add('active');
            if (containers[type]) {
                containers[type].classList.remove('hidden');
            }
        });
    });
    
    // Copy link
    const copyLinkBtn = modal.querySelector('#copyLinkBtn');
    if (copyLinkBtn) {
        copyLinkBtn.addEventListener('click', () => {
            const linkInput = modal.querySelector('#shareLink');
            linkInput.select();
            linkInput.setSelectionRange(0, 99999);
            
            try {
                navigator.clipboard.writeText(linkInput.value).then(() => {
                    const originalHTML = copyLinkBtn.innerHTML;
                    copyLinkBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
                    copyLinkBtn.style.background = '#4CAF50';
                    
                    setTimeout(() => {
                        copyLinkBtn.innerHTML = originalHTML;
                        copyLinkBtn.style.background = '';
                    }, 2000);
                });
            } catch (err) {
                // Fallback for older browsers
                document.execCommand('copy');
                const originalHTML = copyLinkBtn.innerHTML;
                copyLinkBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
                copyLinkBtn.style.background = '#4CAF50';
                
                setTimeout(() => {
                    copyLinkBtn.innerHTML = originalHTML;
                    copyLinkBtn.style.background = '';
                }, 2000);
            }
        });
    }
    
    // Copy message
    const copyMessageBtn = modal.querySelector('#copyMessageBtn');
    if (copyMessageBtn) {
        copyMessageBtn.addEventListener('click', () => {
            const messageTextarea = modal.querySelector('#shareMessage');
            messageTextarea.select();
            messageTextarea.setSelectionRange(0, 99999);
            
            try {
                navigator.clipboard.writeText(messageTextarea.value).then(() => {
                    const originalHTML = copyMessageBtn.innerHTML;
                    copyMessageBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
                    copyMessageBtn.style.background = '#4CAF50';
                    
                    setTimeout(() => {
                        copyMessageBtn.innerHTML = originalHTML;
                        copyMessageBtn.style.background = '';
                    }, 2000);
                });
            } catch (err) {
                // Fallback
                document.execCommand('copy');
                const originalHTML = copyMessageBtn.innerHTML;
                copyMessageBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
                copyMessageBtn.style.background = '#4CAF50';
                
                setTimeout(() => {
                    copyMessageBtn.innerHTML = originalHTML;
                    copyMessageBtn.style.background = '';
                }, 2000);
            }
        });
    }
    
    // Screenshot button
    const screenshotBtn = modal.querySelector('#screenshotBtn');
    if (screenshotBtn) {
        screenshotBtn.addEventListener('click', () => {
            const originalHTML = screenshotBtn.innerHTML;
            screenshotBtn.innerHTML = '<i class="fas fa-check"></i> Awesome! Now send it!';
            screenshotBtn.style.background = '#4CAF50';
            
            setTimeout(() => {
                modal.remove();
            }, 1500);
        });
    }
}

// Function to open the modal (call this when you want to show it)
function openCopyModal() {
    // Remove any existing modal first
    const existingModal = document.querySelector('.copy-modal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Create and show new modal
    createCopyModal();
}
