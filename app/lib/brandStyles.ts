import type { CSSProperties } from 'react'

/** Payment button — Mango dark teal radial (matches Mango/CA pattern). */
export const PAYMENT_BUTTON_STYLE: CSSProperties = {
  background:
    'radial-gradient(circle at 30% 30%, rgb(21, 124, 130) 0%, rgb(15, 118, 110) 40%, rgb(17, 19, 21) 100%)',
  boxShadow:
    '0 8px 20px rgba(21, 124, 130, 0.4), 0 4px 8px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
}

export const PAYMENT_BUTTON_HOVER_STYLE: CSSProperties = {
  background:
    'radial-gradient(circle at 30% 30%, rgb(25, 140, 145) 0%, rgb(20, 130, 120) 40%, rgb(20, 25, 30) 100%)',
  boxShadow:
    '0 12px 28px rgba(21, 124, 130, 0.5), 0 6px 12px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
}

/** Call Now button — Mango blue gradient (matches Mango/CA pattern). */
export const CALL_BUTTON_STYLE: CSSProperties = {
  background: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 50%, #1D4ED8 100%)',
  boxShadow:
    '0 8px 20px rgba(37, 99, 235, 0.4), 0 4px 8px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
}

export const CALL_BUTTON_HOVER_STYLE: CSSProperties = {
  background: 'linear-gradient(135deg, #4A90F4 0%, #2E7CE8 50%, #2563EB 100%)',
  boxShadow:
    '0 12px 28px rgba(37, 99, 235, 0.5), 0 6px 12px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
}

/** Hero front face — Mango cream gradient (yellow → white) with soft inner highlight. */
export const HERO_FRONT_STYLE: CSSProperties = {
  background:
    'linear-gradient(165deg, #FBEC89 0%, #FDF8E0 18%, #ffffff 45%, #FEFDF5 70%, #ffffff 100%)',
  border: '1px solid rgba(251, 236, 137, 0.45)',
  boxShadow:
    '0 22px 60px rgba(251, 236, 137, 0.16), 0 10px 28px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.92)',
  boxSizing: 'border-box',
  minHeight: '580px',
}
