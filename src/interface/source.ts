/**
 * 源数据结构
 */
export interface Source {
  config: SourceConfig,
  organization?: SourceOrganization,
  team: SourceTeam,
  run: SourceRun[]
}

export interface SourceConfig {
  contest: {
    name: string;
    startTime: number;
    endTime: number;
  };
  problem: {
    quantity?: number;
    tag: string[];
  };
  judge: {
    frozenTime: number;
    penaltyTime: number;
    stateString: {
      AC: string;
      CE?: string;
    };
  };
  group: {
    id: string;
    title: string;
    medal: {
      gold: number;
      silver: number;
      bronze: number;
    };
  }[];
  photo?: {
    organization?: { suffix: string };
    team?: { suffix: string };
  };
}

export interface SourceOrganization {
  [organizationName: string]: {
    logoURL?: string;
  }
}
export interface SourceTeam {
  [teamID: string]: {
    name: string;
    organization: string;
    members: string[];
    coach: string;
    group: string[];
    unofficial?: boolean;
    photoURL?: string;
  }
}

export interface SourceRun {
  problemId: number;
  status: string;
  teamId: string;
  timestamp: number;
}