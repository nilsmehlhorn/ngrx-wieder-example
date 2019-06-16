export const id = () => Math.random().toString(36).substr(2, 9)

export interface Todo {
  id: string,
  text: string,
  checked: boolean
}