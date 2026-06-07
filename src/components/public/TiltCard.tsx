'use client'

import { useRef } from 'react'

interface Props {
  children: React.ReactNode
  className?: string
  intensity?: number
}

export function TiltCard({ children, className = '', intensity = 10 }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    el.style.transform = `perspective(600px) rotateX(${-y * intensity}deg) rotateY(${x * intensity}deg) translateZ(6px)`
  }

  const onMouseLeave = () => {
    if (ref.current) {
      ref.current.style.transform = 'perspective(600px) rotateX(0deg) rotateY(0deg) translateZ(0px)'
    }
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={className}
      style={{ transition: 'transform 0.15s ease-out', willChange: 'transform' }}
    >
      {children}
    </div>
  )
}
