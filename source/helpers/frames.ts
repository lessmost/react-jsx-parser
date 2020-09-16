
export interface Frame {
  bindings: Record<string, any>
}

export interface Frames {
  stack: Frame[]
}

export const initFrames = (): Frames => ({
  stack: [],
})

export const pushFrame = (frames: Frames, bindings: Record<string, any>): void => {
  frames.stack.push({
    bindings,
  })
}

export const popFrame = (frames: Frames): void => {
  if (frames.stack.length > 0) {
    frames.stack.pop()
  }
}

export const visitFrame = (frames: Frames, identifier: string): any => {
  for (let i = frames.stack.length - 1; i >= 0; i -= 1) {
    const current = frames.stack[i]
    if (Object.keys(current.bindings).indexOf(identifier) >= 0) {
      return current.bindings[identifier]
    }
  }

  return undefined
}
