/**
 * Modern Progress Indicator
 *
 * @param {number} currentStep - The current active step (1-based index)
 * @param {number} totalSteps - Total number of steps
 * @param {string[]} stepLabels - Array of labels for each step
 * @param {string[]} stepDescriptions - Optional array of descriptions for each step
 */
function initProgressIndicator(currentStep, totalSteps, stepLabels = [], stepDescriptions = []) {
    // Create container
    const container = document.createElement("div")
    container.className = "progress-indicator"
    container.setAttribute("role", "progressbar")
    container.setAttribute("aria-valuemin", "1")
    container.setAttribute("aria-valuemax", totalSteps.toString())
    container.setAttribute("aria-valuenow", currentStep.toString())
  
    // Create progress bar
    const progressBar = document.createElement("div")
    progressBar.className = "progress-bar"
    container.appendChild(progressBar)
  
    // Create step items
    for (let i = 1; i <= totalSteps; i++) {
      const stepItem = document.createElement("div")
      stepItem.className = "step-item"
      stepItem.setAttribute("aria-label", `Step ${i} ${stepLabels[i - 1] || ""}`)
  
      const stepCircle = document.createElement("div")
      stepCircle.className = "step-circle"
      stepCircle.textContent = i
      stepCircle.setAttribute("role", "progressbar")
      stepCircle.setAttribute("aria-valuenow", i)
      stepCircle.setAttribute("aria-valuemin", 1)
      stepCircle.setAttribute("aria-valuemax", totalSteps)
  
      const stepLabel = document.createElement("div")
      stepLabel.className = "step-label"
      stepLabel.textContent = stepLabels[i - 1] || `Step ${i}`
  
      // Add tooltip if description exists
      if (stepDescriptions && stepDescriptions[i - 1]) {
        const tooltip = document.createElement("div")
        tooltip.className = "step-tooltip"
        tooltip.textContent = stepDescriptions[i - 1]
        stepItem.appendChild(tooltip)
      }
  
      stepItem.appendChild(stepCircle)
      stepItem.appendChild(stepLabel)
      container.appendChild(stepItem)
  
      // Set completed and active states
      if (i < currentStep) {
        stepItem.classList.add("completed")
        stepItem.setAttribute("aria-label", `Completed: ${stepLabels[i - 1] || `Step ${i}`}`)
        stepCircle.setAttribute("aria-label", `Completed: ${stepLabels[i - 1] || `Step ${i}`}`)
      } else if (i === currentStep) {
        stepItem.classList.add("active")
        stepItem.setAttribute("aria-label", `Current step: ${stepLabels[i - 1] || `Step ${i}`}`)
        stepCircle.setAttribute("aria-label", `Current step: ${stepLabels[i - 1] || `Step ${i}`}`)
      } else {
        stepCircle.setAttribute("aria-label", `Upcoming: ${stepLabels[i - 1] || `Step ${i}`}`)
      }
    }
  
    // Calculate and set progress bar width with a slight delay for animation
    setTimeout(() => {
      const progressPercentage = ((currentStep - 1) / (totalSteps - 1)) * 100
      progressBar.style.width = `${progressPercentage}%`
    }, 100)
  
    return container
  }
  
  /**
   * Update the progress indicator to reflect the current step
   *
   * @param {number} currentStep - The current active step (1-based index)
   * @param {number} totalSteps - Total number of steps
   */
  function updateProgressIndicator(currentStep, totalSteps) {
    const progressIndicator = document.querySelector(".progress-indicator")
    if (!progressIndicator) return
  
    // Update ARIA attributes
    progressIndicator.setAttribute("aria-valuenow", currentStep.toString())
  
    const stepItems = progressIndicator.querySelectorAll(".step-item")
    const progressBar = progressIndicator.querySelector(".progress-bar")
    const stepLabels = Array.from(stepItems).map((item) => item.querySelector(".step-label").textContent)
  
    // Update step states
    stepItems.forEach((item, index) => {
      const stepNumber = index + 1
      const stepCircle = item.querySelector(".step-circle")
      const stepLabel = item.querySelector(".step-label").textContent
  
      // Reset classes
      item.classList.remove("completed", "active")
  
      // Set appropriate class
      if (stepNumber < currentStep) {
        item.classList.add("completed")
        item.setAttribute("aria-label", `Completed: ${stepLabel}`)
        stepCircle.setAttribute("aria-label", `Completed: ${stepLabels[index]}`)
      } else if (stepNumber === currentStep) {
        item.classList.add("active")
        item.setAttribute("aria-label", `Current step: ${stepLabel}`)
        stepCircle.setAttribute("aria-label", `Current step: ${stepLabels[index]}`)
      } else {
        item.setAttribute("aria-label", `Upcoming: ${stepLabel}`)
        stepCircle.setAttribute("aria-label", `Upcoming: ${stepLabels[index]}`)
      }
    })
  
    // Update progress bar with animation
    const progressPercentage = ((currentStep - 1) / (totalSteps - 1)) * 100
    progressBar.style.width = `${progressPercentage}%`
  }
  
  /**
   * Example usage:
   *
   * // Initialize the progress indicator
   * const progressContainer = document.getElementById('progress-container');
   * const stepLabels = ['Info', 'Services', 'Schedule', 'Payment', 'Confirmation'];
   * const stepDescriptions = ['Enter your information', 'Select services', 'Choose a date and time', 'Payment details', 'Review and confirm'];
   * const progressIndicator = initProgressIndicator(2, 5, stepLabels, stepDescriptions);
   * progressContainer.appendChild(progressIndicator);
   *
   * // Update the progress indicator when moving to the next step
   * function goToNextStep() {
   *   currentStep++;
   *   updateProgressIndicator(currentStep, 5);
   * }
   */
  