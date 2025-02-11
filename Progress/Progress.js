function updateSteps(currentStep) {
    let stepContainers = document.querySelectorAll(".step-container");

    stepContainers.forEach((container, index) => {
        let step = container.querySelector(".step");

        // Reset all classes before applying new ones
        container.classList.remove("completed", "before-active");
        step.classList.remove("completed", "active");

        // Steps before the current step (completed) → Dark Blue
        if (index < currentStep - 1) {
            container.classList.add("completed");
            step.classList.add("completed");
        }

        // The line before the current step → Red
        if (index === currentStep - 1) {
            container.classList.add("before-active");
            step.classList.add("completed"); // Step remains blue
        }

        // The actual current step (should be red)
        if (index === currentStep - 1) {
            step.classList.add("active");
        }
    });
}
