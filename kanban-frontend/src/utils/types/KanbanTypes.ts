import { vOnKeyStroke } from '@vueuse/components'

export interface iKanbanStory {
  id: number
  title: string
  body: string
  data?: JSON
}

export interface iKanbanStage {
  id: number
  title: string
  stories: iKanbanStory[]
}

export interface iKanbanBoard {
  id: number
  title: string
  owner: string
  columns: iKanbanStage[]
}

export interface iKanbanTemplate {
  id: number
  name: string
  body: string
}

export interface iKanbanBoardState {
  id: number
  title: string
  owner: string
}

export interface iKanbanStageState {
  id: number
  title: string
}

export type Result<T, E = Error> = { ok: true; value: T } | { ok: false; error: E }

export const Ok = <T>(data: T): Result<T, never> => {
  return { ok: true, value: data }
}

export const Err = <E>(error: E): Result<never, E> => {
  return { ok: false, error }
}
