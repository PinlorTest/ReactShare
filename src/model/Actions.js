export const CHANGE_VALUE = "CHANGE_VALUE"

export function changeValueAC(value) {
  return {
    type: CHANGE_VALUE,
    value
  }
}
