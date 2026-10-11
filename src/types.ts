export type SeverityLevel = 'HIGH' | 'MEDIUM' | 'LOW' | 'UNCERTAIN';

export type RepairStatus = 
  | 'detected' 
  | 'proposed' 
  | 'previewed' 
  | 'validating' 
  | 'validation_passed' 
  | 'approved' 
  | 'applied' 
  | 'blocked_uncertain' 
  | 'validation_failed' 
  | 'rolled_back';

export interface ApiChangeScenario {
  id: string;
  serviceName: string;
  endpoint: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  port: number;
  changeType: string;
  severity: SeverityLevel;
  confidence: string;
  baselineResponse: Record<string, any>;
  observedResponse: Record<string, any>;
  removedFields: string[];
  addedFields: string[];
  changedFields?: string[];
  explanation: string;
  affectedWorkflow: {
    id: string;
    name: string;
    sourceFile: string;
    affectedLine: number;
    codeSnippet: string;
    testFile: string;
  };
  proposedRepair: {
    strategy: string;
    adapterFile: string;
    diff: string;
    assumptions: string[];
    canAutoRepair: boolean;
    blockReason?: string;
  };
  validation: {
    command: string;
    exitCode: number;
    durationMs: number;
    output: string;
    testCount: number;
    passCount: number;
  };
}

export interface WorkflowStep {
  stepNumber: number;
  title: string;
  subtitle: string;
  description: string;
  technicalArtifact: {
    type: 'config' | 'diff' | 'mapping' | 'patch' | 'test';
    label: string;
    snippet: string;
  };
  statusBadge: string;
  safetyNote: string;
}

export interface ProductCapability {
  id: string;
  title: string;
  category: string;
  description: string;
  iconName: string;
  badge: string;
  status: 'available' | 'verified_mvp' | 'planned';
  metricOrEvidence: string;
  previewCode?: string;
}

export interface ArchitectureLayer {
  id: string;
  name: string;
  badge: string;
  description: string;
  components: {
    title: string;
    tech: string;
    detail: string;
  }[];
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: 'core' | 'vs_code' | 'repairs' | 'security';
}
