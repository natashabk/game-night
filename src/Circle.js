import React from 'react'
import './circle.css'

const Circle = ( { children, size, fontSize, minutes, fill, bg, timeRunning } ) => {
  const sec = minutes * 60
  const pState = timeRunning ? 'running' : 'paused'
  const animations = {
    left: `${ sec * 0.5 }s linear 0s 1 normal both ${ pState } left`,
    right: `${ sec * 0.5 }s linear ${ sec * 0.5 }s 1 normal both ${ pState } right`,
    dot: `${ sec }s linear 0s 1 normal both ${ pState } dot`
  }
  const dotspan = { width: size * 0.1, height: size * 0.1, background: fill }
  const bar = { background: bg, clip: `rect(0px, ${ size }px, ${ size }px, ${ size * 0.5 }px)` }
  const progress = { background: fill, clip: `rect(0px, ${ size * 0.5 }px, ${ size }px, 0px)` }
  const dot = { marginTop: size * -0.05, height: size * 0.1, animation: animations.dot }
  const inner = {
    width: size * 0.8,
    height: size * 0.8,
    background: bg,
    margin: `${ size * -0.4 }px 0 0 ${ size * -0.4 }px`,
  }

  return (
    <div className='wrap' style={{ height: size, width: size }}>
      <div className='circle inner' style={inner} />
      <div className='circle' />
      <div className='time' style={{ fontSize: fontSize, color: fill }}>
        {children}
      </div>
      <div className='circle' style={{ zIndex: 1, boxShadow: 'none' }}>
        <div className='dot' style={dot}>
          <span style={dotspan}></span>
        </div>
        <div className='bar' style={bar}>
          <div className='progress' style={{ ...progress, animation: animations.left, zIndex: 1 }} />
        </div>
        <div className='bar right' style={bar}>
          <div className='progress' style={{ ...progress, animation: animations.right }} />
        </div>
      </div>
    </div>
  );
}

export default Circle;
