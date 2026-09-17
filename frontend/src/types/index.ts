export type UserRole = 'Executive' | 'Project Manager' | 'Safety Inspector' | 'Site Engineer';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl: string;
}

export interface Project {
  id: string;
  name: string;
  code: string;
  location: string;
  status: 'On Schedule' | 'At Risk' | 'Delayed' | 'Completed';
  progress: number; // percentage 0-100
  budgetTotal: number;
  budgetSpent: number;
  startDate: string;
  expectedCompletion: string;
  safetyScore: number; // 0-100
  riskScore: number; // 0-100
  activeWorkers: number;
  activeEquipment: number;
  description: string;
  imageUrl?: string;
}

export interface ManpowerData {
  id: string;
  projectId: string;
  projectName: string;
  role: string;
  count: number;
  activeShift: 'Day' | 'Night' | 'Off';
  utilizationRate: number; // 0-100%
  safetyCertified: boolean;
  notes?: string;
}

export interface Equipment {
  id: string;
  name: string;
  code: string;
  type: string;
  projectId: string;
  projectName: string;
  status: 'Operational' | 'In Maintenance' | 'Idle' | 'Faulty';
  operatingHoursToday: number;
  fuelLevelPercentage: number;
  lastMaintenanceDate: string;
  nextServiceDue: string;
  telematicsAlert?: string;
}

export interface ResourceItem {
  id: string;
  name: string;
  category: 'Cement' | 'Steel' | 'Aggregates' | 'Bricks' | 'Fuel' | 'Safety Gear';
  projectId: string;
  projectName: string;
  currentStock: number;
  unit: string;
  reorderThreshold: number;
  consumptionRateDaily: number;
  status: 'Normal' | 'Low Stock' | 'Critical';
}

export interface SafetyViolation {
  id: string;
  timestamp: string;
  projectId: string;
  projectName: string;
  zone: string;
  violationType: 'No Helmet' | 'No Vest' | 'Restricted Zone Breach' | 'Scaffolding Hazard' | 'Heavy Machinery Proximity';
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  confidence: number; // percentage 0-100
  status: 'Open' | 'Under Investigation' | 'Resolved';
  snapshotUrl?: string;
  bbox?: { x: number; y: number; w: number; h: number; label: string }[];
}

export interface DelayPrediction {
  projectId: string;
  projectName: string;
  delayProbability: number; // 0-100%
  predictedDelayDays: number;
  primaryRiskFactor: string;
  contributingFactors: { factor: string; impactPercentage: number }[];
  recommendedActions: string[];
  lastUpdated: string;
}

export interface RiskAnalysis {
  projectId: string;
  projectName: string;
  overallRiskScore: number; // 0-100
  components: {
    schedule: number;
    resource: number;
    manpower: number;
    equipment: number;
    safety: number;
  };
  explainabilityMatrix: {
    metric: string;
    score: number;
    weight: string;
    impact: 'Negative' | 'Neutral' | 'Positive';
    description: string;
  }[];
}

export interface AlertItem {
  id: string;
  timestamp: string;
  title: string;
  message: string;
  priority: 'High' | 'Medium' | 'Low' | 'Critical';
  category: 'Safety' | 'Delay' | 'Equipment' | 'Resource' | 'Budget';
  read: boolean;
  resolved: boolean;
  projectId?: string;
  actionGuidance?: string;
}

export interface SiteMapMarker {
  id: string;
  title: string;
  type: 'Project Site' | 'Restricted Zone' | 'Equipment Pin' | 'Safety Alert';
  coordinates: { x: number; y: number }; // percentage position for demo map
  status: 'Normal' | 'Warning' | 'Critical';
  details: string;
  projectId?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  dataSummary?: Record<string, any>;
  suggestions?: string[];
}

export interface SystemSettings {
  apiEndpoint: string;
  iotGatewayStatus: 'Connected' | 'Disconnected';
  yoloModelVersion: string;
  autoAlertNotifications: boolean;
  voiceAssistantEnabled: boolean;
  refreshIntervalSeconds: number;
}
