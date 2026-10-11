import type { ApiChangeScenario, WorkflowStep, ProductCapability, ArchitectureLayer, FaqItem } from '../types';

export const API_SCENARIOS: ApiChangeScenario[] = [
  {
    id: 'identity-rename',
    serviceName: 'Identity & Auth Provider (Auth0 / Okta API)',
    endpoint: '/api/v2/users/usr_98a72',
    method: 'GET',
    port: 8001,
    changeType: 'Field Renamed (Breaking Schema Deprecation)',
    severity: 'HIGH',
    confidence: 'Evidence-Backed Candidate',
    baselineResponse: {
      id: 'usr_98a72',
      name: 'Alice Henderson',
      email: 'alice.henderson@enterprise.com',
      role: 'staff_engineer'
    },
    observedResponse: {
      id: 'usr_98a72',
      display_name: 'Alice Henderson',
      email: 'alice.henderson@enterprise.com',
      role: 'staff_engineer'
    },
    removedFields: ['name'],
    addedFields: ['display_name'],
    explanation: 'Upstream identity provider migrated profile naming schema from "name" to "display_name". Production services accessing user["name"] encounter runtime KeyError, crashing user account and checkout sessions.',
    affectedWorkflow: {
      id: 'user-profile',
      name: 'Customer Account Profile',
      sourceFile: 'src/services/identity/user_service.py',
      affectedLine: 42,
      codeSnippet: 'return UserProfile(\n    id=payload["id"],\n    name=payload["name"],  # <-- KeyError: "name" in production\n    email=payload["email"]\n)',
      testFile: 'tests/integration/test_user_profile.py'
    },
    proposedRepair: {
      strategy: 'Non-Breaking Field Compatibility Adapter',
      adapterFile: 'src/services/identity/user_service.py',
      diff: `@@ -41,3 +41,4 @@
     id=payload["id"],
-    name=payload["name"],
+    # Compatibility adapter for upstream display_name schema migration
+    name=payload.get("display_name", payload.get("name", "")),
     email=payload["email"],`,
      assumptions: [
        'display_name contains equivalent user full name',
        'Payload remains a JSON object dictionary',
        'Preserves backward compatibility for existing consumers'
      ],
      canAutoRepair: true
    },
    validation: {
      command: 'pytest tests/integration/test_user_profile.py -q',
      exitCode: 0,
      durationMs: 142,
      output: '.... [100%]\n4 passed in 0.14s',
      testCount: 4,
      passCount: 4
    }
  },
  {
    id: 'search-pagination',
    serviceName: 'Catalog Search Engine (Algolia / Elasticsearch API)',
    endpoint: '/v1/catalog/search?query=production',
    method: 'GET',
    port: 8003,
    changeType: 'Pagination Protocol Shift (Numeric Offset to Opaque Cursor)',
    severity: 'HIGH',
    confidence: 'Bounded Adapter Candidate',
    baselineResponse: {
      items: [{ id: 'prod_901', title: 'Enterprise Cloud Instance' }],
      page: 1,
      next_page: 2,
      total_count: 58
    },
    observedResponse: {
      results: [{ id: 'prod_901', title: 'Enterprise Cloud Instance' }],
      next_cursor: 'cur_live_eyJsaW1pdCI6MjAsIm9mZnNldCI6MjB9',
      has_more: true
    },
    removedFields: ['items', 'page', 'next_page', 'total_count'],
    addedFields: ['results', 'next_cursor', 'has_more'],
    explanation: 'Upstream search provider migrated from numeric offset pagination to opaque cursor-based pagination. Array key ("items" -> "results") and progression parameters broke downstream product indexing loops.',
    affectedWorkflow: {
      id: 'product-catalog-search',
      name: 'Product Catalog Discovery',
      sourceFile: 'src/services/catalog/search_service.py',
      affectedLine: 88,
      codeSnippet: 'def fetch_page(page_num: int):\n    data = client.get(f"/catalog/search?page={page_num}")\n    return data["items"], data.get("next_page")',
      testFile: 'tests/integration/test_catalog_search.py'
    },
    proposedRepair: {
      strategy: 'Bounded Cursor Normalizer Adapter',
      adapterFile: 'src/services/catalog/search_service.py',
      diff: `@@ -87,4 +87,6 @@
 def fetch_page(page_num: int, cursor: str | None = None):
-    data = client.get(f"/catalog/search?page={page_num}")
-    return data["items"], data.get("next_page")
+    url = f"/catalog/search?cursor={cursor}" if cursor else f"/catalog/search?page={page_num}"
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
      command: 'pytest tests/integration/test_catalog_search.py -q',
      exitCode: 0,
      durationMs: 189,
      output: '...... [100%]\n6 passed in 0.19s',
      testCount: 6,
      passCount: 6
    }
  },
  {
    id: 'payments-semantic',
    serviceName: 'Payment Gateway (Stripe / Billing Webhook API)',
    endpoint: '/v1/charges/ch_live_3M7qK9',
    method: 'GET',
    port: 8002,
    changeType: 'Semantic Status Mutation ("paid" -> "settled_pending_verification")',
    severity: 'UNCERTAIN',
    confidence: 'Unverified Semantic Equivalence',
    baselineResponse: {
      id: 'ch_live_3M7qK9',
      status: 'paid',
      amount_cents: 10000,
      currency: 'USD'
    },
    observedResponse: {
      id: 'ch_live_3M7qK9',
      status: 'settled_pending_verification',
      amount_cents: 10000,
      currency: 'USD'
    },
    removedFields: [],
    addedFields: [],
    changedFields: ['status: "paid" -> "settled_pending_verification"'],
    explanation: 'The payload structure matches, but the business enum "status" changed to an unmapped value. An automated adapter could falsely fulfill unpaid orders or trigger billing chargebacks. Dependency Guardian activates an emergency Safety Brake, blocking automatic patch application and requiring engineering review.',
    affectedWorkflow: {
      id: 'billing-reconciliation',
      name: 'Order Fulfillment & Billing Reconciliation',
      sourceFile: 'src/services/billing/payment_service.py',
      affectedLine: 63,
      codeSnippet: 'if record["status"] == "paid":\n    fulfill_order(record["id"])\nelse:\n    hold_order(record["id"])',
      testFile: 'tests/integration/test_payments.py'
    },
    proposedRepair: {
      strategy: 'SAFETY LOCK: Automatic Repair Prohibited',
      adapterFile: 'src/services/billing/payment_service.py',
      diff: '# Automatic repair withheld for safety\n# Semantic equivalence between "paid" and "settled_pending_verification"\n# cannot be proven automatically. Developer review is required.',
      assumptions: [
        'Requires financial domain sign-off',
        'Webhook or asynchronous capture may be mandated'
      ],
      canAutoRepair: false,
      blockReason: 'Semantic ambiguity: Automated adapters cannot guarantee financial or compliance correctness.'
    },
    validation: {
      command: 'pytest tests/integration/test_payments.py -q',
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
      label: 'Production Probe Definition in dependency-guardian.yml',
      snippet: `dependencies:
  - id: identity-provider
    name: Customer Identity & Auth API
    base_url: "https://auth.enterprise-cloud.io"
    probes:
      - id: customer-profile
        method: GET
        path: "/api/v2/users/usr_98a72"
        expected_contract: customer_profile`
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
      label: 'Deterministic Engine Observation on Upstream Release',
      snippet: `Observed Difference on GET /api/v2/users/usr_98a72:
- [REMOVED] field: "name" (string)
+ [ADDED]   field: "display_name" (string)
Match: Same scalar type, matching fixture value "Alice Henderson"
Classification: HIGH RISK (Breaking Schema Contract Mutation)`
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
      label: 'Production Workflow Impact Trace',
      snippet: `Affected Workflow: "Customer Account Profile" (id: customer-profile)
Source File: src/services/identity/user_service.py (line 42)
Declared Fields: ["name", "email"]
Associated Test: tests/integration/test_user_profile.py
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
      snippet: `--- a/src/services/identity/user_service.py
+++ b/src/services/identity/user_service.py
@@ -41,3 +41,4 @@
     id=payload["id"],
-    name=payload["name"],
+    # Backward-compatible adapter for display_name schema migration
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
      snippet: `$ pytest tests/integration/test_user_profile.py -q
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
    id: 'baseline-store',
    title: 'Explicit Baseline Snapshots',
    category: 'Baselines',
    description: 'Explicit, developer-controlled baseline capture stored in local SQLite. Probes never overwrite your reference state silently.',
    iconName: 'Database',
    badge: 'Deterministic',
    status: 'verified_mvp',
    metricOrEvidence: 'Versioned SQLite records with exact SHA-256 payload hashes'
  },
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
export const CAPABILITIES = PRODUCT_CAPABILITIES;

export const ARCHITECTURE_LAYERS: ArchitectureLayer[] = [
  {
    id: 'layer-external',
    name: 'Monitored External Services & Third-Party APIs',
    badge: 'Target Layer',
    description: 'Configured cloud and third-party HTTP endpoints probed safely on demand or in CI with timeout and payload boundaries.',
    components: [
      {
        title: 'Customer Identity Provider',
        tech: 'Auth0 / Okta / REST API',
        detail: 'Monitors breaking user profile mutations, schema migrations (name -> display_name)'
      },
      {
        title: 'Payment Gateway',
        tech: 'Stripe / Billing Webhook API',
        detail: 'Monitors transaction states, triggers safety brake on semantic status ambiguities'
      },
      {
        title: 'Catalog Search Engine',
        tech: 'Algolia / Elasticsearch API',
        detail: 'Detects pagination contract breaks (offset page -> opaque cursor pagination)'
      },
      {
        title: 'Notification & Messaging Services',
        tech: 'Twilio / SendGrid / Webhook',
        detail: 'Verifies downstream message schemas and communication service contract changes'
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
    question: 'What is Dependency Guardian?',
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
    answer: 'In cases like real-world Stripe and payment gateway integrations where an enum value shifts from "paid" to "settled_pending_verification", structural diffs cannot prove semantic equivalence. Dependency Guardian explicitly flags this as "Semantic Uncertainty" and triggers a safety brake that prohibits automatic repair, directing the developer to perform manual business review.'
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
    question: 'How do I install and run Dependency Guardian?',
    answer: 'Dependency Guardian runs in your local development environment alongside your codebase. Start the local backend with "python -m uvicorn app.main:app --port 8765", configure your target API endpoints in "dependency-guardian.yml", and install the extension in VS Code via "code --install-extension dependency-guardian.vsix". Open your repository and trigger "Dependency Guardian: Create Baseline" from the Command Palette.'
  },
  {
    id: 'faq-security',
    category: 'security',
    question: 'Does my code or API response payload get sent to third-party AI services?',
    answer: 'No. The local backend binds to loopback (127.0.0.1) by default, and all detection, impact mapping, and validation run locally on your workstation. LLM explanations are completely optional, disabled by default in configuration, and never receive secrets, credentials, or production databases.'
  }
];

export const CONFIG_EXAMPLE_YAML = `# dependency-guardian.yml
# Production Service & Verification Contract
project:
  name: cloud-commerce-platform
  validation_command: "pytest tests/ -q"

settings:
  request_timeout_seconds: 3
  scan_timeout_seconds: 10
  max_response_bytes: 1000000
  allow_private_network_targets: true
  llm_explanations_enabled: false

# Registered External Service Dependencies & Probes
dependencies:
  - id: identity-provider
    name: Customer Identity & Auth API
    base_url: "https://auth.enterprise-cloud.io"
    probes:
      - id: customer-profile
        method: GET
        path: "/api/v2/users/usr_98a72"
        expected_contract: customer_profile

  - id: payment-gateway
    name: Payment Gateway (Stripe API)
    base_url: "https://api.stripe.com"
    probes:
      - id: payment-charges
        method: GET
        path: "/v1/charges/ch_live_3M7qK9"
        expected_contract: charge_record

  - id: catalog-search
    name: Catalog Search Engine (Algolia API)
    base_url: "https://search.catalog-cloud.io"
    probes:
      - id: catalog-query
        method: GET
        path: "/v1/catalog/search?query=production"
        expected_contract: search_results

# Explicit Workflow-to-Code & Test Mappings
workflows:
  - id: customer-profile
    name: Customer Account Profile
    dependencies: [identity-provider]
    source_files: ["src/services/identity/user_service.py"]
    fields: ["name", "email"]
    tests: ["tests/integration/test_user_profile.py"]

  - id: billing-reconciliation
    name: Order Fulfillment & Billing
    dependencies: [payment-gateway]
    source_files: ["src/services/billing/payment_service.py"]
    fields: ["status", "amount"]
    tests: ["tests/integration/test_payments.py"]

  - id: product-catalog-search
    name: Product Catalog Discovery
    dependencies: [catalog-search]
    source_files: ["src/services/catalog/search_service.py"]
    fields: ["items", "page", "next_page"]
    tests: ["tests/integration/test_catalog_search.py"]
`;
