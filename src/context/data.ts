import { createContext } from "react"
import type { SourceConfig, SourceOrganization, SourceTeam } from "../interface/source"

// export const ConfigContext = createContext({})
// export const OrganizationContext = createContext({})
// export const TeamContext = createContext({})

interface AppConfig {
  style: {
    teamCardHeight: number,
  },
}

export const AppDataContext = createContext<{ config: SourceConfig, organization: SourceOrganization, team: SourceTeam, appConfig: AppConfig }>({
  config: {} as SourceConfig,
  organization: {} as SourceOrganization,
  team: {} as SourceTeam,
  appConfig: {} as AppConfig
})