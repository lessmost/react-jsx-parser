import { initFrames, pushFrame, popFrame, visitFrame } from './frames'

describe('helpers/frames', () => {
  it('initFrames', () => {
    const frames = initFrames()
    expect(frames.stack).toEqual([])
  })

  it('push/pop', () => {
    const frames = initFrames()
    const ba = { a: 1 }
    const bb = { b: 1 }

    pushFrame(frames, ba)

    expect(frames.stack).toHaveLength(1)
    expect(frames.stack[0].bindings).toEqual(ba)

    pushFrame(frames, bb)

    expect(frames.stack).toHaveLength(2)
    expect(frames.stack[0].bindings).toBe(ba)
    expect(frames.stack[1].bindings).toBe(bb)

    popFrame(frames)

    expect(frames.stack).toHaveLength(1)
    expect(frames.stack[0].bindings).toBe(ba)

    popFrame(frames)

    expect(frames.stack).toHaveLength(0)
    expect(frames.stack).toEqual([])

    popFrame(frames)

    expect(frames.stack).toHaveLength(0)
    expect(frames.stack).toEqual([])
  })

  it('visitFrame', () => {
    const frames = initFrames()
    pushFrame(frames, { a: 'a', b: 'b' })
    pushFrame(frames, { a: 'a2', c: 'c' })
    pushFrame(frames, { d: 'd' })

    expect(visitFrame(frames, 'a')).toBe('a2')
    expect(visitFrame(frames, 'b')).toBe('b')
    expect(visitFrame(frames, 'c')).toBe('c')
    expect(visitFrame(frames, 'd')).toBe('d')
    expect(visitFrame(frames, 'e')).toBe(undefined)

    popFrame(frames)

    expect(visitFrame(frames, 'a')).toBe('a2')
    expect(visitFrame(frames, 'b')).toBe('b')
    expect(visitFrame(frames, 'c')).toBe('c')
    expect(visitFrame(frames, 'd')).toBe(undefined)
    expect(visitFrame(frames, 'e')).toBe(undefined)

    popFrame(frames)

    expect(visitFrame(frames, 'a')).toBe('a')
    expect(visitFrame(frames, 'b')).toBe('b')
    expect(visitFrame(frames, 'c')).toBe(undefined)
    expect(visitFrame(frames, 'd')).toBe(undefined)
    expect(visitFrame(frames, 'e')).toBe(undefined)

    popFrame(frames)

    expect(visitFrame(frames, 'a')).toBe(undefined)
    expect(visitFrame(frames, 'b')).toBe(undefined)
    expect(visitFrame(frames, 'c')).toBe(undefined)
    expect(visitFrame(frames, 'd')).toBe(undefined)
    expect(visitFrame(frames, 'e')).toBe(undefined)
  })
})
