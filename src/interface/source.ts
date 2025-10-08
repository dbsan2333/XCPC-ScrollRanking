export namespace Source {
  export interface Config {
    contest: {
      name: string;
      startTime: number;
      endTime: number;
    };
    problem: {
      quantity: number;
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
    photo: {
      [organization: string]: { suffix: string };
      team: { suffix: string };
    };
  }

  export interface Team {
    [teamID: string]: {
      name: string;
      organization: string;
      members: string[];
      coach: string;
      photoURL?: string;
    }
  }

  export interface Run {
    problemId: number;
    status: string;
    teamId: string;
    timestamp: number;
  }
}
