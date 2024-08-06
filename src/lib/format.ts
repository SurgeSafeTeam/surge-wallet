export const truncateStr = (str: string, charsPerSide = 4) => {
  if (str.length < charsPerSide * 4) {
    return str
  }
  return `${str.slice(0, charsPerSide)}...${str.slice(-charsPerSide)}`
}