import type { ReactElement } from 'react'
import ContentCut from '@mui/icons-material/ContentCut'
import { default as Beard } from 'assets/icons/beard.svg?component'
import { default as HaircutBeard } from 'assets/icons/haircut-beard.svg?component'
import { default as HairColor } from 'assets/icons/hair-color.svg?component'

export type Icons = 'haircut' | 'haircut-beard' | 'beard' | 'hair-color'

interface IconProperties {
  iconName: Icons
  variant?: 'primary' | 'secondary'
  className?: string
  onClick?: () => void
}

export default function Icon({
  iconName,
  variant,
  className,
  onClick,
}: IconProperties): ReactElement {
  function renderIcon(): ReactElement {
    const fillColor = variant === 'primary' ? '#f2c84b' : '#000'

    if (iconName === 'beard')
      return <Beard width={72} height={72} fill={fillColor} />

    if (iconName === 'haircut-beard')
      return <HaircutBeard width={94} height={94} fill={fillColor} />

    if (iconName === 'hair-color')
      return <HairColor width={72} height={72} fill={fillColor} />

    return (
      <ContentCut style={{ width: '72px', height: '72px', fill: fillColor }} />
    )
  }

  return (
    <div className={className} onClick={onClick}>
      {renderIcon()}
    </div>
  )
}

Icon.defaultProperties = {
  variant: undefined,
  className: undefined,
  onClick: undefined,
}
