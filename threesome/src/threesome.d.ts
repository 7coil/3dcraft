declare global {
  interface Window {
    myGlobalFunction: IThreesome
  }

  interface IThreesome {
    on: () => void,
    off: () => void,
    save: () => void,
  }
}
