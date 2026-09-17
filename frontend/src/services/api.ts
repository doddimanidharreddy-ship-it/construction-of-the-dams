import axios from 'axios';
import {
  mockProjects,
  mockManpower,
  mockEquipment,
  mockResources,
  mockSafetyViolations,
  mockDelayPredictions,
  mockRiskAnalysis,
  mockAlerts,
  mockSiteMapMarkers,
  mockSettings
} from './mockData';
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
  SystemSettings
} from '../types';

const API_BASE_URL = 'http://localhost:8000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 3000, // 3 sec timeout for quick fallback
  headers: {
    'Content-Type': 'application/json',
  },
});

export const api = {
  // Projects
  async getProjects(): Promise<Project[]> {
    try {
      const res = await apiClient.get('/projects');
      return res.data;
    } catch {
      console.warn('API disconnected or endpoint unavailable. Falling back to simulated project dataset.');
      return mockProjects;
    }
  },

  async getProjectById(id: string): Promise<Project | undefined> {
    try {
      const res = await apiClient.get(`/projects/${id}`);
      return res.data;
    } catch {
      return mockProjects.find((p) => p.id === id) || mockProjects[0];
    }
  },

  async createProject(project: Partial<Project>): Promise<Project> {
    try {
      const res = await apiClient.post('/projects', project);
      return res.data;
    } catch {
      const newProj: Project = {
        id: `proj-${Date.now()}`,
        name: project.name || 'New AI Construction Site',
        code: project.code || `BV-NEW-${Math.floor(Math.random() * 90 + 10)}`,
        location: project.location || 'Site Alpha District',
        status: project.status || 'On Schedule',
        progress: project.progress || 10,
        budgetTotal: project.budgetTotal || 25000000,
        budgetSpent: project.budgetSpent || 2500000,
        startDate: project.startDate || new Date().toISOString().split('T')[0],
        expectedCompletion: project.expectedCompletion || '2027-12-31',
        safetyScore: project.safetyScore || 95,
        riskScore: project.riskScore || 20,
        activeWorkers: project.activeWorkers || 50,
        activeEquipment: project.activeEquipment || 8,
        description: project.description || 'Newly registered construction site project.',
        imageUrl: project.imageUrl || 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=800&q=80'
      };
      mockProjects.unshift(newProj);
      return newProj;
    }
  },

  // Manpower
  async getManpower(): Promise<ManpowerData[]> {
    try {
      const res = await apiClient.get('/manpower');
      return res.data;
    } catch {
      return mockManpower;
    }
  },

  // Equipment
  async getEquipment(): Promise<Equipment[]> {
    try {
      const res = await apiClient.get('/equipment');
      return res.data;
    } catch {
      return mockEquipment;
    }
  },

  // Resources
  async getResources(): Promise<ResourceItem[]> {
    try {
      const res = await apiClient.get('/resources');
      return res.data;
    } catch {
      return mockResources;
    }
  },

  // Safety & YOLO
  async getSafetyViolations(): Promise<SafetyViolation[]> {
    try {
      const res = await apiClient.get('/safety/violations');
      return res.data;
    } catch {
      return mockSafetyViolations;
    }
  },

  async analyzeSafetyImage(file: File): Promise<SafetyViolation> {
    try {
      const formData = new FormData();
      formData.append('image', file);
      const res = await apiClient.post('/safety/analyze', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      return res.data;
    } catch {
      // Simulate YOLO AI processing latency & result
      await new Promise((r) => setTimeout(r, 1200));
      const simulated: SafetyViolation = {
        id: `viol-${Date.now()}`,
        timestamp: new Date().toLocaleString(),
        projectId: 'proj-1',
        projectName: 'Skyline Cyber Tower A',
        zone: 'Uploaded Inspection Frame',
        violationType: 'No Helmet',
        severity: 'High',
        confidence: 95.8,
        status: 'Open',
        snapshotUrl: URL.createObjectURL(file),
        bbox: [
          { x: 30, y: 15, w: 30, h: 40, label: 'Missing Hard Hat (95.8%)' },
          { x: 65, y: 35, w: 20, h: 45, label: 'Standard Vest (98.2%)' }
        ]
      };
      mockSafetyViolations.unshift(simulated);
      return simulated;
    }
  },

  // Predictions
  async getDelayPredictions(): Promise<DelayPrediction[]> {
    try {
      const res = await apiClient.get('/predictions/delays');
      return res.data;
    } catch {
      return mockDelayPredictions;
    }
  },

  // Risk Analysis
  async getRiskAnalysis(projectId?: string): Promise<RiskAnalysis> {
    try {
      const res = await apiClient.get('/risk-analysis', { params: { projectId } });
      return res.data;
    } catch {
      return mockRiskAnalysis;
    }
  },

  // Alerts
  async getAlerts(): Promise<AlertItem[]> {
    try {
      const res = await apiClient.get('/alerts');
      return res.data;
    } catch {
      return mockAlerts;
    }
  },

  // Site Map Markers
  async getSiteMapMarkers(): Promise<SiteMapMarker[]> {
    try {
      const res = await apiClient.get('/sitemap/markers');
      return res.data;
    } catch {
      return mockSiteMapMarkers;
    }
  },

  // Settings
  async getSettings(): Promise<SystemSettings> {
    try {
      const res = await apiClient.get('/settings');
      return res.data;
    } catch {
      return mockSettings;
    }
  }
};
