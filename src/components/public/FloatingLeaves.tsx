'use client'

import { useEffect, useState } from 'react'

const LEAVES = [
  { left: '6%',  top: '25%', w: 22, drift: 'leaf-drift-1', delay: '0s',    dur: '9s'   },
  { left: '15%', top: '65%', w: 14, drift: 'leaf-drift-2', delay: '2.2s',  dur: '11s'  },
  { left: '82%', top: '18%', w: 18, drift: 'leaf-drift-3', delay: '0.6s',  dur: '8s'   },
  { left: '90%', top: '58%', w: 12, drift: 'leaf-drift-1', delay: '3.5s',  dur: '12s'  },
  { left: '48%', top: '78%', w: 16, drift: 'leaf-drift-2', delay: '1.4s',  dur: '10s'  },
  { left: '65%', top: '35%', w: 10, drift: 'leaf-drift-3', delay: '4.2s',  dur: '7s'   },
  { left: '28%', top: '45%', w: 20, drift: 'leaf-drift-1', delay: '5s',    dur: '9.5s' },
  { left: '73%', top: '80%', w: 13, drift: 'leaf-drift-2', delay: '1.8s',  dur: '11s'  },
  { left: '38%', top: '12%', w: 17, drift: 'leaf-drift-3', delay: '3s',    dur: '8.5s' },
  { left: '55%', top: '55%', w: 11, drift: 'leaf-drift-1', delay: '6s',    dur: '10s'  },
]

function Leaf({ w }: { w: number }) {
  const h = Math.round(w * 1.45)
  return (
    <svg width={w} height={h} viewBox="0 0 20 29" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M10 1 C17 1 20 7 20 14 C20 21 16 27 10 28 C4 27 0 21 0 14 C0 7 3 1 10 1Z"
        fill="#74C69D"
        opacity="0.55"
      />
      <line x1="10" y1="2"  x2="10" y2="27" stroke="#2D6A4F" strokeWidth="0.8" opacity="0.5" />
      <line x1="10" y1="10" x2="17" y2="6"  stroke="#2D6A4F" strokeWidth="0.6" opacity="0.4" />
      <line x1="10" y1="14" x2="4"  y2="11" stroke="#2D6A4F" strokeWidth="0.6" opacity="0.4" />
      <line x1="10" y1="18" x2="16" y2="15" stroke="#2D6A4F" strokeWidth="0.6" opacity="0.4" />
    </svg>
  )
}

export function FloatingLeaves() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {LEAVES.map((leaf, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            left: leaf.left,
            top: leaf.top,
            animation: `${leaf.drift} ${leaf.dur} ease-in-out ${leaf.delay} infinite`,
          }}
        >
          <Leaf w={leaf.w} />
        </div>
      ))}
    </div>
  )
}
