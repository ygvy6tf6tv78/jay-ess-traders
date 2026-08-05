import type { CSSProperties } from 'react'

/** Payment button — New Vision's deep teal radial CTA. */
export const PAYMENT_BUTTON_STYLE: CSSProperties = {
  background:
    'radial-gradient(circle at 30% 30%, rgb(25, 140, 145) 0%, rgb(20, 130, 120) 40%, rgb(20, 25, 30) 100%)',
  boxShadow:
    '0 12px 28px rgba(21, 124, 130, 0.5), 0 6px 12px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
}

export const PAYMENT_BUTTON_HOVER_STYLE: CSSProperties = {
  background:
    'radial-gradient(circle at 30% 30%, rgb(30, 151, 156) 0%, rgb(22, 139, 129) 40%, rgb(20, 25, 30) 100%)',
  boxShadow:
    '0 14px 30px rgba(21, 124, 130, 0.58), 0 7px 14px rgba(0, 0, 0, 0.27), inset 0 1px 0 rgba(255, 255, 255, 0.24)',
}

/** Call Now button — exact New Vision blue CTA palette and depth. */
export const CALL_BUTTON_STYLE: CSSProperties = {
  background: 'linear-gradient(135deg, #075A9C 0%, #0A8FC7 100%)',
  boxShadow:
    '0 10px 24px rgba(7, 90, 156, 0.36), 0 4px 9px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.22)',
}

export const CALL_BUTTON_HOVER_STYLE: CSSProperties = {
  background: 'linear-gradient(135deg, #045AA0 0%, #0A8FC7 100%)',
  boxShadow:
    '0 12px 28px rgba(7, 90, 156, 0.44), 0 6px 12px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.26)',
}

/** Hero front face — Mango cream gradient (yellow → white) with soft inner highlight. */
export const HERO_FRONT_STYLE: CSSProperties = {
  background:
    'linear-gradient(180deg, rgba(255,255,255,0.98) 0%, #ffffff 54%, #f3fffc 100%)',
  border: '1px solid rgba(19, 170, 167, 0.22)',
  boxShadow:
    '0 26px 60px rgba(0, 0, 0, 0.28), 0 10px 26px rgba(15, 23, 42, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.96)',
  boxSizing: 'border-box',
  minHeight: '660px',
}
