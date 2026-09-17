import {
  Project,
  ManpowerData,
  Equipment,
  ResourceItem,
  SafetyViolation,
  DelayPrediction,
  RiskAnalysis,
  AlertItem,
  SiteMapMarker,
  ChatMessage,
  SystemSettings
} from '../types';

export const mockProjects: Project[] = [
  {
    id: 'proj-1',
    name: 'Skyline Cyber Tower A',
    code: 'BV-SKYT-01',
    location: 'Metropolitan Tech District, Sector 4',
    status: 'On Schedule',
    progress: 68,
    budgetTotal: 45000000,
    budgetSpent: 29800000,
    startDate: '2025-03-15',
    expectedCompletion: '2026-11-30',
    safetyScore: 94,
    riskScore: 22,
    activeWorkers: 142,
    activeEquipment: 18,
    description: '42-story commercial high-rise with smart energy glass facade and structural carbon-neutral concrete.',
    imageUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'proj-2',
    name: 'Harbor Gateway Bridge & Flyover',
    code: 'BV-HRBR-02',
    location: 'Coastal Transport Corridor',
    status: 'At Risk',
    progress: 42,
    budgetTotal: 82000000,
    budgetSpent: 41200000,
    startDate: '2024-10-01',
    expectedCompletion: '2027-02-15',
    safetyScore: 82,
    riskScore: 68,
    activeWorkers: 210,
    activeEquipment: 34,
    description: 'Suspension bridge spanning 1.4km with smart traffic sensors and heavy concrete pillar reinforcements.',
    imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'proj-3',
    name: 'GreenValley Eco-Residences Phase II',
    code: 'BV-GVEL-03',
    location: 'North Suburbs Expansion',
    status: 'Delayed',
    progress: 31,
    budgetTotal: 28000000,
    budgetSpent: 16400000,
    startDate: '2025-01-10',
    expectedCompletion: '2026-08-20',
    safetyScore: 76,
    riskScore: 79,
    activeWorkers: 95,
    activeEquipment: 12,
    description: '240 luxury eco-friendly residential apartments featuring solar canopy rooftops and rainwater harvesting.',
    imageUrl: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'proj-4',
    name: 'Apex Industrial Logistics Hub',
    code: 'BV-APEX-04',
    location: 'Western Port Freight Zone',
    status: 'On Schedule',
    progress: 88,
    budgetTotal: 34000000,
    budgetSpent: 29100000,
    startDate: '2024-06-01',
    expectedCompletion: '2026-05-15',
    safetyScore: 98,
    riskScore: 14,
    activeWorkers: 118,
    activeEquipment: 22,
    description: 'Automated 500,000 sq ft distribution center with heavy-load slab foundations and high-speed loading docks.',
    imageUrl: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'proj-5',
    name: 'Central Metro Underground Station',
    code: 'BV-CMET-05',
    location: 'Downtown Core Line 3',
    status: 'At Risk',
    progress: 54,
    budgetTotal: 110000000,
    budgetSpent: 67500000,
    startDate: '2024-04-12',
    expectedCompletion: '2027-09-30',
    safetyScore: 88,
    riskScore: 61,
    activeWorkers: 305,
    activeEquipment: 45,
    description: 'Multi-level underground metro exchange station with tunnel boring operations and subterranean plaza.',
    imageUrl: 'https://images.unsplash.com/photo-1590486803833-1c5dc8ddd4c8?auto=format&fit=crop&w=800&q=80'
  }
];

export const mockManpower: ManpowerData[] = [
  { id: 'mp-1', projectId: 'proj-1', projectName: 'Skyline Cyber Tower A', role: 'Steel Fixers & Masons', count: 48, activeShift: 'Day', utilizationRate: 94, safetyCertified: true },
  { id: 'mp-2', projectId: 'proj-1', projectName: 'Skyline Cyber Tower A', role: 'Crane Operators', count: 6, activeShift: 'Day', utilizationRate: 98, safetyCertified: true },
  { id: 'mp-3', projectId: 'proj-1', projectName: 'Skyline Cyber Tower A', role: 'Electrical Engineers', count: 24, activeShift: 'Day', utilizationRate: 88, safetyCertified: true },
  { id: 'mp-4', projectId: 'proj-2', projectName: 'Harbor Gateway Bridge', role: 'Underwater Concrete Divers', count: 12, activeShift: 'Day', utilizationRate: 75, safetyCertified: true },
  { id: 'mp-5', projectId: 'proj-2', projectName: 'Harbor Gateway Bridge', role: 'Heavy Rigging Technicians', count: 65, activeShift: 'Day', utilizationRate: 82, safetyCertified: false },
  { id: 'mp-6', projectId: 'proj-3', projectName: 'GreenValley Eco-Residences', role: 'Carpenters & Framers', count: 32, activeShift: 'Night', utilizationRate: 64, safetyCertified: true },
  { id: 'mp-7', projectId: 'proj-4', projectName: 'Apex Industrial Hub', role: 'Slab Paving Technicians', count: 54, activeShift: 'Day', utilizationRate: 96, safetyCertified: true },
];

export const mockEquipment: Equipment[] = [
  { id: 'eq-101', name: 'Liebherr Tower Crane TC-700', code: 'TC-01', type: 'Tower Crane', projectId: 'proj-1', projectName: 'Skyline Cyber Tower A', status: 'Operational', operatingHoursToday: 7.5, fuelLevelPercentage: 84, lastMaintenanceDate: '2026-02-28', nextServiceDue: '2026-03-28' },
  { id: 'eq-102', name: 'CAT 349 Hydraulic Excavator', code: 'EX-04', type: 'Excavator', projectId: 'proj-2', projectName: 'Harbor Gateway Bridge', status: 'In Maintenance', operatingHoursToday: 2.1, fuelLevelPercentage: 42, lastMaintenanceDate: '2026-03-08', nextServiceDue: '2026-03-15', telematicsAlert: 'Engine hydraulic pressure anomaly detected' },
  { id: 'eq-103', name: 'Komatsu D85 Bulldozer', code: 'BD-02', type: 'Bulldozer', projectId: 'proj-3', projectName: 'GreenValley Eco-Residences', status: 'Faulty', operatingHoursToday: 0, fuelLevelPercentage: 15, lastMaintenanceDate: '2026-02-10', nextServiceDue: '2026-03-01', telematicsAlert: 'Transmission slip error Code E-44' },
  { id: 'eq-104', name: 'Schwing Concrete Pump Truck 47M', code: 'CP-03', type: 'Concrete Pump', projectId: 'proj-1', projectName: 'Skyline Cyber Tower A', status: 'Operational', operatingHoursToday: 6.8, fuelLevelPercentage: 92, lastMaintenanceDate: '2026-03-01', nextServiceDue: '2026-04-01' },
  { id: 'eq-105', name: 'Volvo A40G Articulated Hauler', code: 'AH-09', type: 'Dump Truck', projectId: 'proj-5', projectName: 'Central Metro Station', status: 'Operational', operatingHoursToday: 8.2, fuelLevelPercentage: 76, lastMaintenanceDate: '2026-03-05', nextServiceDue: '2026-04-05' }
];

export const mockResources: ResourceItem[] = [
  { id: 'res-1', name: 'Portland Cement (Type I/II)', category: 'Cement', projectId: 'proj-1', projectName: 'Skyline Cyber Tower A', currentStock: 1450, unit: 'Bags (50kg)', reorderThreshold: 500, consumptionRateDaily: 120, status: 'Normal' },
  { id: 'res-2', name: 'Fe550 TMT Rebar (16mm)', category: 'Steel', projectId: 'proj-2', projectName: 'Harbor Gateway Bridge', currentStock: 28, unit: 'Tons', reorderThreshold: 50, consumptionRateDaily: 8.5, status: 'Critical' },
  { id: 'res-3', name: 'Crushed Granite Aggregate', category: 'Aggregates', projectId: 'proj-3', projectName: 'GreenValley Eco-Residences', currentStock: 210, unit: 'Cu. Meters', reorderThreshold: 200, consumptionRateDaily: 35, status: 'Low Stock' },
  { id: 'res-4', name: 'Ultra-Low Sulfur Diesel Fuel', category: 'Fuel', projectId: 'proj-5', projectName: 'Central Metro Station', currentStock: 8400, unit: 'Liters', reorderThreshold: 3000, consumptionRateDaily: 950, status: 'Normal' },
  { id: 'res-5', name: 'ANSI Approved Safety Helmets', category: 'Safety Gear', projectId: 'proj-1', projectName: 'Skyline Cyber Tower A', currentStock: 180, unit: 'Units', reorderThreshold: 50, consumptionRateDaily: 2, status: 'Normal' }
];

export const mockSafetyViolations: SafetyViolation[] = [
  {
    id: 'viol-801',
    timestamp: '2026-09-10 14:22:10',
    projectId: 'proj-2',
    projectName: 'Harbor Gateway Bridge',
    zone: 'Pier 4 Scaffolding Deck',
    violationType: 'No Helmet',
    severity: 'High',
    confidence: 96.4,
    status: 'Open',
    snapshotUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&q=80',
    bbox: [{ x: 35, y: 20, w: 25, h: 45, label: 'No Helmet detected (96%)' }]
  },
  {
    id: 'viol-802',
    timestamp: '2026-09-10 11:05:40',
    projectId: 'proj-3',
    projectName: 'GreenValley Eco-Residences',
    zone: 'Zone B Material Hoist',
    violationType: 'No Vest',
    severity: 'Medium',
    confidence: 91.2,
    status: 'Under Investigation',
    snapshotUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80',
    bbox: [{ x: 50, y: 30, w: 20, h: 50, label: 'Missing Hi-Vis Vest (91%)' }]
  },
  {
    id: 'viol-803',
    timestamp: '2026-09-09 16:45:19',
    projectId: 'proj-5',
    projectName: 'Central Metro Station',
    zone: 'TBM Excavation Shaft 2',
    violationType: 'Restricted Zone Breach',
    severity: 'Critical',
    confidence: 98.9,
    status: 'Resolved',
    snapshotUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=600&q=80'
  }
];

export const mockDelayPredictions: DelayPrediction[] = [
  {
    projectId: 'proj-2',
    projectName: 'Harbor Gateway Bridge & Flyover',
    delayProbability: 74,
    predictedDelayDays: 18,
    primaryRiskFactor: 'Steel Rebar Supply Deficit & Hydraulic Excavator Breakdown',
    contributingFactors: [
      { factor: 'Material Logistics Supply Chain', impactPercentage: 45 },
      { factor: 'Equipment Downtime (EX-04)', impactPercentage: 30 },
      { factor: 'Unfavorable High-Wind Weather Forecast', impactPercentage: 25 }
    ],
    recommendedActions: [
      'Trigger fast-track procurement for 30 Tons Fe550 Rebar from secondary regional warehouse',
      'Deploy back-up hydraulic excavator BD-09 from Project Apex to Pier 4',
      'Reschedule high-altitude crane lifting ops to morning hours (06:00 - 11:00 AM)'
    ],
    lastUpdated: '2026-09-10 08:00 AM'
  },
  {
    projectId: 'proj-3',
    projectName: 'GreenValley Eco-Residences Phase II',
    delayProbability: 82,
    predictedDelayDays: 25,
    primaryRiskFactor: 'Labor Shortage in Framing & Subcontractor Delays',
    contributingFactors: [
      { factor: 'Manpower Allocation Shortfall', impactPercentage: 55 },
      { factor: 'Equipment Faults (Bulldozer BD-02)', impactPercentage: 25 },
      { factor: 'Permit Inspection Delays', impactPercentage: 20 }
    ],
    recommendedActions: [
      'Reallocate 15 framing specialists from Apex Industrial Hub',
      'Approved overtime shift rate for weekend masonry works',
      'Escalate municipal inspection permit #8821 with fast-track desk'
    ],
    lastUpdated: '2026-09-10 09:30 AM'
  }
];

export const mockRiskAnalysis: RiskAnalysis = {
  projectId: 'proj-2',
  projectName: 'Harbor Gateway Bridge & Flyover',
  overallRiskScore: 68,
  components: {
    schedule: 78,
    resource: 85,
    manpower: 52,
    equipment: 64,
    safety: 42
  },
  explainabilityMatrix: [
    { metric: 'Steel Rebar Inventory', score: 88, weight: 'High (30%)', impact: 'Negative', description: 'Rebar stock at 28 Tons is 44% below safety threshold for Pier 4 foundation casting.' },
    { metric: 'Excavator EX-04 Outage', score: 75, weight: 'High (25%)', impact: 'Negative', description: 'Hydraulic pressure failure stopped ground excavation for 2 consecutive days.' },
    { metric: 'Worker Safety Compliance', score: 82, weight: 'Medium (20%)', impact: 'Neutral', description: 'Recent PPE violation rate on scaffolding deck deck 4 reached 4 incidents this week.' },
    { metric: 'Budget Burn Rate', score: 35, weight: 'Medium (15%)', impact: 'Positive', description: 'Financial expenditures are currently 4.2% below projected quarter baseline.' },
    { metric: 'Concrete Pumping Capacity', score: 20, weight: 'Low (10%)', impact: 'Positive', description: 'Twin pump trucks running at 94% efficiency without thermal overheating.' }
  ]
};

export const mockAlerts: AlertItem[] = [
  {
    id: 'alt-1',
    timestamp: '10 mins ago',
    title: 'CRITICAL: Rebar Stock Depletion Warning',
    message: 'Harbor Gateway Bridge has only 28 Tons of Fe550 Steel Rebar remaining (Threshold: 50 Tons). Project delayed by 18 days if not replenished within 48h.',
    priority: 'Critical',
    category: 'Resource',
    read: false,
    resolved: false,
    projectId: 'proj-2',
    actionGuidance: 'Click to auto-generate emergency purchase order to Supplier SteelCorp Global.'
  },
  {
    id: 'alt-2',
    timestamp: '45 mins ago',
    title: 'Safety Hazard Detected via YOLO Vision',
    message: 'Worker detected on Pier 4 Scaffolding Deck without required hard hat protection (Confidence 96.4%).',
    priority: 'High',
    category: 'Safety',
    read: false,
    resolved: false,
    projectId: 'proj-2',
    actionGuidance: 'Notify Site Supervisor Marcus Vance to halt overhead crane swings in Zone 4.'
  },
  {
    id: 'alt-3',
    timestamp: '2 hours ago',
    title: 'Equipment Fault Alert - Komatsu Bulldozer BD-02',
    message: 'Telematics engine report: Transmission slip error Code E-44 logged on GreenValley Eco-Residences.',
    priority: 'Medium',
    category: 'Equipment',
    read: true,
    resolved: false,
    projectId: 'proj-3',
    actionGuidance: 'Schedule field technician dispatch for transmission fluid flush.'
  },
  {
    id: 'alt-4',
    timestamp: '5 hours ago',
    title: 'Milestone Progress Deviation Detected',
    message: 'GreenValley Eco-Residences is trailing planned milestone schedule by -14.2% across Framing & Roofing phase.',
    priority: 'High',
    category: 'Delay',
    read: true,
    resolved: false,
    projectId: 'proj-3',
    actionGuidance: 'Review AI Manpower reallocation scenario under Predictions page.'
  }
];

export const mockSiteMapMarkers: SiteMapMarker[] = [
  { id: 'm-1', title: 'Skyline Cyber Tower Site', type: 'Project Site', coordinates: { x: 28, y: 35 }, status: 'Normal', details: 'Tower A Core 34th floor concrete pour active.', projectId: 'proj-1' },
  { id: 'm-2', title: 'Harbor Gateway Bridge Zone', type: 'Project Site', coordinates: { x: 62, y: 48 }, status: 'Warning', details: 'Steel rebar shortage & Pier 4 scaffolding alert active.', projectId: 'proj-2' },
  { id: 'm-3', title: 'Restricted Blasting Shaft #2', type: 'Restricted Zone', coordinates: { x: 74, y: 72 }, status: 'Critical', details: 'Unauthorized worker movement flagged by CCTV YOLO AI.', projectId: 'proj-5' },
  { id: 'm-4', title: 'Tower Crane TC-01', type: 'Equipment Pin', coordinates: { x: 31, y: 38 }, status: 'Normal', details: 'Operating at 7.5 hrs. Load efficiency 98%.', projectId: 'proj-1' },
  { id: 'm-5', title: 'GreenValley Residence Hub', type: 'Project Site', coordinates: { x: 45, y: 80 }, status: 'Warning', details: 'Delayed framing progress. Equipment BD-02 down.', projectId: 'proj-3' }
];

export const mockInitialChatMessages: ChatMessage[] = [
  {
    id: 'msg-1',
    sender: 'assistant',
    text: 'Hello! I am **BuildVision AI Assistant**. I can answer real-time queries regarding project progress, delay risks, safety compliance, equipment telematics, and resource stock levels. How can I help you today?',
    timestamp: 'Just now',
    suggestions: [
      'Which projects are currently at risk of schedule delay?',
      'Show me safety violations detected today across all sites.',
      'What is the stock level of Steel Rebar for Harbor Gateway Bridge?'
    ]
  }
];

export const mockSettings: SystemSettings = {
  apiEndpoint: 'http://localhost:8000/api/v1',
  iotGatewayStatus: 'Connected',
  yoloModelVersion: 'YOLOv8x-Construction-v4.2',
  autoAlertNotifications: true,
  voiceAssistantEnabled: true,
  refreshIntervalSeconds: 15
};
