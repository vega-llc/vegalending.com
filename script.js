(() => {
  "use strict";
  const demo = document.querySelector(".router-demo");
  if (!demo) return;
  // Deliberately illustrative. These choices never call a model or send data.
  const scenarios = {
    notes: {
      route: "local", task: "Summarize notes", policy: "Policy: local only",
      local: "Selected", cloud: "Not requested", receiptRoute: "Local",
      reason: "Local-only policy", cloudRequest: "None",
      explanation: "This example keeps the task on the Mac because the user chose a local-only policy. No cloud request is made."
    },
    code: {
      route: "cloud", task: "Review code", policy: "Choice: cloud review",
      local: "Not selected", cloud: "Explicitly requested", receiptRoute: "Cloud",
      reason: "User requested cloud", cloudRequest: "Authorized in example",
      explanation: "Here, the user explicitly requests a cloud review. The illustration follows that choice and records the reason. No real code or request is sent."
    },
    report: {
      route: "blocked", task: "Draft a report", policy: "Cloud approval missing",
      local: "Not run", cloud: "Waiting for approval", receiptRoute: "Paused",
      reason: "Approval required", cloudRequest: "None",
      explanation: "This example requires cloud approval before it can continue. The request pauses instead of silently sending work out or spending money."
    }
  };
  const fields = {
    "demo-task": "task", "demo-policy": "policy", "local-status": "local",
    "cloud-status": "cloud", "receipt-route": "receiptRoute",
    "receipt-reason": "reason", "receipt-cloud": "cloudRequest",
    "demo-explanation": "explanation"
  };
  demo.querySelectorAll("[data-scenario]").forEach(button => {
    button.addEventListener("click", () => {
      const scenario = scenarios[button.dataset.scenario];
      if (!scenario) return;
      demo.dataset.route = scenario.route;
      demo.querySelectorAll("[data-scenario]").forEach(option =>
        option.setAttribute("aria-pressed", String(option === button))
      );
      Object.entries(fields).forEach(([id, field]) => {
        document.getElementById(id).textContent = scenario[field];
      });
    });
  });
})();
