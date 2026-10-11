import type { ApiChangeScenario, WorkflowStep, ProductCapability, ArchitectureLayer, FaqItem } from '../types';

export const API_SCENARIOS: ApiChangeScenario[] = [
  {
    id: 'users-rename',
    serviceName: 'Users API',
    endpoint: '/users/u_123',
    method: 'GET',
    port: 8001,
    changeType: 'Field Renamed (Removed / Added Key)',
    severity: 'HIGH',
    confidence: 'Evidence-Backed Candidate',
    baselineResponse: {
      id: 'u_123',
      name: 'Alice Henderson',
      email: 'alice.henderson@example.com',
      role: 'staff_engineer'
    },
    observedResponse: {
      id: 'u_123',
      display_name: 'Alice Henderson',
      email: 'alice.henderson@example.com',
      role: 'staff_engineer'
    },
    removedFields: ['name'],
    addedFields: ['display_name'],
    explanation: 'The upstream provider removed property "name" and introduced "display_name" with identical scalar type and value in probe fixtures. Consuming application accessing user.name will encounter KeyError / undefined behavior.',
    affectedWorkflow: {
      id: 'user-profile',
      name: 'User Profile Page',
      sourceFile: 'demo-app/src/services/user_service.py',
      affectedLine: 42,
      codeSnippet: 'return UserProfile(\n    id=payload["id"],\n    name=payload["name"],  # <-- KeyError: "name"\n    email=payload["email"]\n)',
      testFile: 'demo-app/tests/test_user_profile.py'
    },
    proposedRepair: {
      strategy: 'Field Compatibility Adapter',
      adapterFile: 'demo-app/src/services/user_service.py',
      diff: `@@ -41,3 +41,4 @@
     id=payload["id"],
-    name=payload["name"],
+    # Compatibility adapter for upstream display_name migration
+    name=payload.get("display_name", payload.get("name", "")),
     email=payload["email"],`,
      assumptions: [
        'display_name contains equivalent human-readable name',
        'Payload remains a JSON object dictionary',
        'Fallback to legacy "name" preserved for backwards compatibility'
      ],
      canAutoRepair: true
    },
    validation: {
      command: 'pytest demo-app/tests/test_user_profile.py -q',
      exitCode: 0,
      durationMs: 142,
      output: '.... [100%]\n4 passed in 0.14s',
      testCount: 4,
      passCount: 4
    }
  },
  {
    id: 'search-pagination',
    serviceName: 'Search API',
    endpoint: '/search?page=1',
    method: 'GET',
    port: 8003,
    changeType: 'Pagination Contract Shift (Offset to Cursor)',
    severity: 'HIGH',
    confidence: 'Bounded Adapter Candidate',
    baselineResponse: {
      items: [{ id: 'u_123', title: 'Kubernetes Config' }],
      page: 1,
      next_page: 2,
      total_count: 58
    },
    observedResponse: {
      results: [{ id: 'u_123', title: 'Kubernetes Config' }],
      next_cursor: 'cursor_demo_eyJwYWdlIjoyfQ',
      has_more: true
    },
    removedFields: ['items', 'page', 'next_page', 'total_count'],
    addedFields: ['results', 'next_cursor', 'has_more'],
    explanation: 'Upstream migrated from numeric page offset pagination to opaque cursor-based pagination. Both array property key ("items" -> "results") and progression parameters changed.',
    affectedWorkflow: {
      id: 'user-search',
      name: 'User Search & Directory',
      sourceFile: 'demo-app/src/services/search_service.py',
      affectedLine: 88,
      codeSnippet: 'def fetch_page(page_num: int):\n    data = client.get(f"/search?page={page_num}")\n    return data["items"], data.get("next_page")',
      testFile: 'demo-app/tests/test_search.py'
    },
    proposedRepair: {
      strategy: 'Bounded Cursor Normalizer Adapter',
      adapterFile: 'demo-app/src/services/search_service.py',
      diff: `@@ -87,4 +87,6 @@
 def fetch_page(page_num: int, cursor: str | None = None):
-    data = client.get(f"/search?page={page_num}")
-    return data["items"], data.get("next_page")
+    url = f"/search?cursor={cursor}" if cursor else f"/search?page={page_num}"
+    data = client.get(url)
+    items = data.get("results", data.get("items", []))
+    return items, data.get("next_cursor")`,
      assumptions: [
        'Endpoint accepts cursor parameter',
        'Results collection contains identical record structures',
        'Client workflow updated to store opaque cursor state'
      ],
      canAutoRepair: true
    },
    validation: {
      command: 'pytest demo-app/tests/test_search.py -q',
      exitCode: 0,
      durationMs: 189,
      output: '...... [100%]\n6 passed in 0.19s',
      testCount: 6,
      passCount: 6
    }
  },
  {
    id: 'payments-semantic',
    serviceName: 'Payments API',
    endpoint: '/payments/p_123',
    method: 'GET',
    port: 8002,
    changeType: 'Semantic Shift (Value Meaning Ambiguity)',
    severity: 'UNCERTAIN',
    confidence: 'Unverified Semantic Equivalence',
    baselineResponse: {
      id: 'p_123',
      status: 'paid',
      amount_cents: 10000,
      currency: 'USD'
    },
    observedResponse: {
      id: 'p_123',
      status: 'settled_pending_verification',
      amount_cents: 10000,
      currency: 'USD'
    },
    removedFields: [],
    addedFields: [],
    changedFields: ['status: "paid" -> "settled_pending_verification"'],
    explanation: 'The JSON structure is intact, but the enum value of "status" altered to an unrecognized state. Automatic repair is intentionally BLOCKED to prevent premature order fulfillment or financial discrepancy.',
    affectedWorkflow: {
      id: 'payment-dashboard',
      name: 'Payment Reconciliation Dashboard',
      sourceFile: 'demo-app/src/services/payment_service.py',
      affectedLine: 63,
      codeSnippet: 'if record["status"] == "paid":\n    fulfill_order(record["id"])\nelse:\n    hold_order(record["id"])',
      testFile: 'demo-app/tests/test_payments.py'
    },
    proposedRepair: {
      strategy: 'SAFETY LOCK: Automatic Repair Prohibited',
      adapterFile: 'demo-app/src/services/payment_service.py',
      diff: '# Automatic repair withheld for safety\n# Semantic equivalence between "paid" and "settled_pending_verification"\n# cannot be proven automatically. Developer review is required.',
      assumptions: [
        'Requires financial domain sign-off',
        'Webhook or asynchronous capture may be mandated'
      ],
      canAutoRepair: false,
      blockReason: 'Semantic ambiguity: Automated adapters cannot guarantee financial or compliance correctness.'
    },
    validation: {
      command: 'pytest demo-app/tests/test_payments.py -q',
      exitCode: 1,
      durationMs: 110,
      output: 'F [100%]\nFAILURES:\nAssertionError: Status "settled_pending_verification" not recognized in paid fulfillment workflow.\n1 failed in 0.11s',
      testCount: 3,
      passCount: 2
    }
  }
];

export const WORKFLOW_STEPS: WorkflowStep[] = [
  {
    stepNumber: 1,
    title: 'Establish a Known-Good Baseline',
    subtitle: 'Explicit developer capture, preserved in SQLite',
    description: 'Probes execute bounded HTTP requests against configured endpoints. Responses are normalized, fingerprinted, and saved as versioned baselines. A scan never silently replaces your baseline.',
    technicalArtifact: {
      type: 'config',
      label: 'Probe Definition in dependency-guardian.yml',
      snippet: `dependencies:
  - id: users-api
    name: Users API
    base_url: "http://127.0.0.1:8001"
    probes:
      - id: user-profile
        method: GET
        path: "/users/u_123"
        expected_contract: user_profile`
    },
    statusBadge: 'Baseline v1 Stored',
    safetyNote: 'Baselines are only promoted by explicit developer action.'
  },
  {
    stepNumber: 2,
    title: 'Detect Structural & Behavioral Diffs',
    subtitle: 'Deterministic comparison rules, zero hallucinations',
    description: 'When services shift, Dependency Guardian compares the new response with the preserved baseline. It identifies dropped properties, altered types, contract mutations, or enum shifts.',
    technicalArtifact: {
      type: 'diff',
      label: 'Deterministic Engine Observation',
      snippet: `Observed Difference on GET /users/u_123:
- [REMOVED] field: "name" (string)
+ [ADDED]   field: "display_name" (string)
Match: Same scalar type, matching fixture value "Alice Henderson"
Classification: HIGH RISK (Breaking Contract Mutation)`
    },
    statusBadge: 'Difference Detected',
    safetyNote: 'Code-based deterministic rules are the sole source of truth.'
  },
  {
    stepNumber: 3,
    title: 'Map Impact to Configured Workflows',
    subtitle: 'Trace affected files and test suites instantly',
    description: 'Rather than performing opaque full-repo guesses, the engine references your declared workflows, connecting changed fields directly to consuming source files and relevant tests.',
    technicalArtifact: {
      type: 'mapping',
      label: 'Workflow Impact Trace',
      snippet: `Affected Workflow: "User Profile Page" (id: user-profile)
Source File: demo-app/src/services/user_service.py (line 42)
Declared Fields: ["name", "email"]
Associated Test: demo-app/tests/test_user_profile.py
Evidence: user_service.py reads payload["name"] which is absent in V2`
    },
    statusBadge: '1 Workflow Affected',
    safetyNote: 'Transparent evidence displays why code was mapped.'
  },
  {
    stepNumber: 4,
    title: 'Review a Proposed Compatibility Repair',
    subtitle: 'Diff preview with explicit assumptions, no silent writes',
    description: 'For supported patterns like field renames or pagination adaptations, the repair engine generates a focused compatibility adapter. You preview the patch and stated assumptions before anything touches disk.',
    technicalArtifact: {
      type: 'patch',
      label: 'Generated Adapter Patch Preview',
      snippet: `--- a/demo-app/src/services/user_service.py
+++ b/demo-app/src/services/user_service.py
@@ -41,3 +41,4 @@
     id=payload["id"],
-    name=payload["name"],
+    name=payload.get("display_name", payload.get("name", "")),
     email=payload["email"],`
    },
    statusBadge: 'Repair Preview Ready',
    safetyNote: 'Zero silent writes. Target file hashes verified before applying.'
  },
  {
    stepNumber: 5,
    title: 'Validate in Sandbox & Apply on Approval',
    subtitle: 'Automated test suite execution and reversible rollback',
    description: 'The engine executes your configured validation command (e.g. pytest -q) in a controlled sandbox. Only when tests pass and you click Approve is the patch applied. Full rollback is preserved.',
    technicalArtifact: {
      type: 'test',
      label: 'Pytest Validation Runner Output',
      snippet: `$ pytest demo-app/tests/test_user_profile.py -q
....                                                  [100%]
4 passed in 0.14s
Exit code: 0
Status: VALIDATION_PASSED -> Ready for Developer Approval`
    },
    statusBadge: 'Validation Passed (4/4)',
    safetyNote: 'Failed validation or ambiguous semantics strictly blocks application.'
  }
];

export const PRODUCT_CAPABILITIES: ProductCapability[] = [
  {
    id: 'diff-engine',
    title: 'Deterministic Change Detection',
    category: 'Detection',
    description: 'Compares active probe responses against known-good baselines. Identifies removed keys, renamed fields, altered primitive types, and contract shifts with zero false-confidence scoring.',
    iconName: 'Binary',
    badge: 'Core Engine',
    status: 'verified_mvp',
    metricOrEvidence: 'Sub-millisecond comparison across structured JSON payloads'
  },
  {
    id: 'risk-classification',
    title: 'Rule-Based Severity Classification',
    category: 'Analysis',
    description: 'Categorizes findings by operational impact: High Risk for dropped required fields or type mutations, Medium for pagination shifts, and Low for benign additive fields.',
    iconName: 'ShieldAlert',
    badge: 'Safety Rules',
    status: 'verified_mvp',
    metricOrEvidence: 'Transparent deterministic rules instead of opaque AI guesses'
  },
  {
    id: 'impact-mapping',
    title: 'Workflow & Test Impact Mapping',
    category: 'Context',
    description: 'Links external API changes directly to application workflows, specific source file paths, line numbers, and existing unit/integration test suites.',
    iconName: 'GitBranch',
    badge: 'Traceability',
    status: 'verified_mvp',
    metricOrEvidence: 'Know exactly which test to run before making changes'
  },
  {
    id: 'repair-planner',
    title: 'Assisted Compatibility Adapters',
    category: 'Repairs',
    description: 'Generates non-invasive compatibility adapters for common migration patterns such as field renames and cursor-to-page adaptations.',
    iconName: 'Wrench',
    badge: 'Assisted Repair',
    status: 'verified_mvp',
    metricOrEvidence: 'Generates unified diffs for developer review'
  },
  {
    id: 'sandbox-validation',
    title: 'Automated Validation Runner',
    category: 'Verification',
    description: 'Executes your test suite (e.g., Pytest) against proposed fixes with strict execution timeouts before permitting any disk writes.',
    iconName: 'CheckCircle2',
    badge: 'Pre-Flight Check',
    status: 'verified_mvp',
    metricOrEvidence: 'Strict gate: Passing validation is required for application'
  },
  {
    id: 'semantic-brake',
    title: 'Semantic Uncertainty Brake',
    category: 'Safety',
    description: 'When enum meanings or payment statuses shift without clear equivalence, the engine flags semantic uncertainty and deliberately locks automatic repair.',
    iconName: 'OctagonAlert',
    badge: 'Human Review',
    status: 'verified_mvp',
    metricOrEvidence: 'Prevents dangerous incorrect assumptions in business logic'
  },
  {
    id: 'vscode-native',
    title: 'VS Code Extension Integration',
    category: 'Workflow',
    description: 'Manage services, view incident trees, preview diffs, run validations, and apply or roll back patches directly inside the VS Code editor.',
    iconName: 'Layout',
    badge: 'Native Extension',
    status: 'verified_mvp',
    metricOrEvidence: 'Tree views, Webview details, and status bar indicators'
  },
  {
    id: 'audit-rollback',
    title: 'Audit Log & Reversible Rollback',
    category: 'Governance',
    description: 'Maintains an immutable SQLite audit trail of every baseline, probe, repair proposal, validation run, and approved patch with 1-click restoration.',
    iconName: 'History',
    badge: 'Reversible',
    status: 'verified_mvp',
    metricOrEvidence: 'Zero permanent writes without clean rollback data preserved'
  }
];

export const ARCHITECTURE_LAYERS: ArchitectureLayer[] = [
  {
    id: 'layer-external',
    name: 'External & Simulated Services',
    badge: 'Target Layer',
    description: 'Configured HTTP endpoints probed safely on demand over loopback (127.0.0.1) with timeout and payload size boundaries.',
    components: [
      {
        title: 'Users API (:8001)',
        tech: 'FastAPI REST Service',
        detail: 'Simulates v1/v2 user profiles, field renames (name -> display_name)'
      },
      {
        title: 'Payments API (:8002)',
        tech: 'FastAPI REST Service',
        detail: 'Simulates transaction status, tests semantic uncertainty detection'
      },
      {
        title: 'Search API (:8003)',
        tech: 'FastAPI REST Service',
        detail: 'Simulates pagination shifts (page offset -> opaque cursor)'
      },
      {
        title: 'Notification Tool (:8004)',
        tech: 'Local HTTP Endpoint',
        detail: 'Simulates tool notification contracts for downstream integrations'
      }
    ]
  },
  {
    id: 'layer-backend',
    name: 'Local Dependency Guardian Backend',
    badge: 'Engine Core (127.0.0.1:8765)',
    description: 'Lightweight local Python FastAPI service running on your machine. Zero cloud telemetry, no code leaves your workstation.',
    components: [
      {
        title: 'Config Validator',
        tech: 'Pydantic & YAML',
        detail: 'Validates dependency-guardian.yml IDs, endpoints, methods, and files'
      },
      {
        title: 'Probe Runner',
        tech: 'HTTPX Async Client',
        detail: 'Executes bounded requests with request_timeout_seconds & size limits'
      },
      {
        title: 'Baseline & Observation Store',
        tech: 'SQLite Database',
        detail: 'Stores versioned normalized fingerprints, observations, and audit events'
      },
      {
        title: 'Deterministic Diff Engine',
        tech: 'Structural Diffing',
        detail: 'Identifies added/removed/type-mutated fields and classifies severity'
      },
      {
        title: 'Workflow Impact Mapper',
        tech: 'Contract Mapper',
        detail: 'Correlates observed diffs with configured workflows, files, and tests'
      },
      {
        title: 'Validation & Repair Runner',
        tech: 'Pytest Subprocess',
        detail: 'Runs validation_command in sandboxed workdir; gates patch application'
      }
    ]
  },
  {
    id: 'layer-client',
    name: 'Developer Workflow (VS Code)',
    badge: 'User Interface',
    description: 'Clean developer extension providing tree views, interactive webview panels, diff visualizers, and quick commands.',
    components: [
      {
        title: 'Sidebar Tree Views',
        tech: 'VS Code Extension API',
        detail: 'Displays Services, Detected Changes, and Affected Workflows'
      },
      {
        title: 'Issue & Repair Webview',
        tech: 'Interactive Webview',
        detail: 'Rich side-by-side payload inspection, diff preview, and test logs'
      },
      {
        title: 'Command Palette Integration',
        tech: 'TypeScript Client',
        detail: 'Commands: Create Baseline, Scan Dependencies, Validate, Apply, Roll Back'
      }
    ]
  }
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-what',
    category: 'core',
    question: 'What is HACKWAVE Dependency Guardian?',
    answer: 'Dependency Guardian is a developer-focused compatibility monitoring and assisted repair tool for external APIs and services. It pairs a VS Code extension with a local Python backend to probe configured endpoints, detect breaking behavior or contract changes against preserved baselines, identify affected workflows in your application, and safely validate proposed repairs before you apply them.'
  },
  {
    id: 'faq-how-detect',
    category: 'core',
    question: 'How does it detect API changes without guessing?',
    answer: 'Dependency Guardian uses deterministic, code-based structural comparison against a saved known-good baseline. When a probe executes, the backend normalizes the JSON response, computes structural diffs (identifying added, removed, or type-changed keys), evaluates configured value assertions, and classifies the severity. Detection does not rely on opaque LLM guesses; deterministic comparison is the sole ground truth.'
  },
  {
    id: 'faq-auto-modify',
    category: 'repairs',
    question: 'Does Dependency Guardian automatically modify my source code?',
    answer: 'No. The product is strictly built around a safety principle: "Detect and explain automatically; propose repairs cautiously; apply changes only after validation and explicit developer approval." No file write is ever made silently. Proposed compatibility adapters must be previewed, validated against your test suite, and explicitly approved by you before a patch is applied.'
  },
  {
    id: 'faq-validation',
    category: 'repairs',
    question: 'How does repair validation work?',
    answer: 'When a repair proposal (such as a field-rename adapter) is generated, Dependency Guardian runs your configured validation command (e.g., "pytest -q") against the target files in a controlled working copy or temporary patch. The process enforces strict execution timeouts. If tests fail, application is strictly blocked. Furthermore, full file state is recorded prior to applying, enabling instant rollback.'
  },
  {
    id: 'faq-semantic-uncertainty',
    category: 'repairs',
    question: 'What happens when an API change has ambiguous business meaning?',
    answer: 'In cases like our simulated Payments API scenario where an enum value shifts from "paid" to "settled_pending_verification", structural diffs cannot prove semantic equivalence. Dependency Guardian explicitly flags this as "Semantic Uncertainty" and triggers a safety brake that prohibits automatic repair, directing the developer to perform manual business review.'
  },
  {
    id: 'faq-vscode',
    category: 'vs_code',
    question: 'How does it integrate with VS Code?',
    answer: 'The VS Code extension provides dedicated Tree Views in the Activity Bar for Services, Detected Changes, and Affected Workflows. Selecting an issue opens an interactive Webview with the payload diff, impact trace, and repair controls (Preview Fix, Run Validation, Apply, Roll Back). Native commands and status bar indicators keep you updated without leaving your editor.'
  },
  {
    id: 'faq-install',
    category: 'vs_code',
    question: 'How do I install and run the Dependency Guardian MVP?',
    answer: 'The MVP runs locally on your development workstation. Start the local Python backend with "python -m uvicorn app.main:app --port 8765", launch the simulated services, and install the extension in VS Code via "code --install-extension dependency-guardian.vsix". Open your repository containing "dependency-guardian.yml" and trigger "Dependency Guardian: Create Baseline" from the Command Palette.'
  },
  {
    id: 'faq-security',
    category: 'security',
    question: 'Does my code or API response payload get sent to third-party AI services?',
    answer: 'No. The local backend binds to loopback (127.0.0.1) by default, and all detection, impact mapping, and validation run locally on your workstation. LLM explanations are completely optional, disabled by default in configuration, and never receive secrets, credentials, or production databases.'
  }
];

export const CONFIG_EXAMPLE_YAML = `# dependency-guardian.yml
# Project & Validation Configuration
project:
  name: demo-shop
  validation_command: "pytest -q"

settings:
  request_timeout_seconds: 3
  scan_timeout_seconds: 10
  max_response_bytes: 1000000
  allow_private_network_targets: true
  llm_explanations_enabled: false

# Registered External Service Dependencies & Probes
dependencies:
  - id: users-api
    name: Users API
    base_url: "http://127.0.0.1:8001"
    probes:
      - id: user-profile
        method: GET
        path: "/users/u_123"
        expected_contract: user_profile

  - id: payments-api
    name: Payments API
    base_url: "http://127.0.0.1:8002"
    probes:
      - id: payment-detail
        method: GET
        path: "/payments/p_123"
        expected_contract: payment

  - id: search-api
    name: Search API
    base_url: "http://127.0.0.1:8003"
    probes:
      - id: search-page-one
        method: GET
        path: "/search?page=1"
        expected_contract: search_results

# Explicit Workflow-to-Code & Test Mappings
workflows:
  - id: user-profile
    name: User Profile Page
    dependencies: [users-api]
    source_files: ["demo-app/src/services/user_service.py"]
    fields: ["name", "email"]
    tests: ["demo-app/tests/test_user_profile.py"]

  - id: payment-dashboard
    name: Payment Dashboard
    dependencies: [payments-api]
    source_files: ["demo-app/src/services/payment_service.py"]
    fields: ["status", "amount"]
    tests: ["demo-app/tests/test_payments.py"]

  - id: user-search
    name: User Search
    dependencies: [search-api]
    source_files: ["demo-app/src/services/search_service.py"]
    fields: ["items", "page", "next_page"]
    tests: ["demo-app/tests/test_search.py"]
`;
