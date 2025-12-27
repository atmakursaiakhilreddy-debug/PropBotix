
export interface ServiceCard {
  title: string;
  description: string;
  icon: string;
}

export enum DemoTool {
  MVPArchitect = 'MVPArchitect',
  ConceptForge = 'ConceptForge',
  UniversalInsights = 'UniversalInsights',
  CoreAgent = 'CoreAgent'
}

export interface GroundingChunk {
  web?: {
    uri: string;
    title: string;
  };
  maps?: {
    uri: string;
    title: string;
  };
}
